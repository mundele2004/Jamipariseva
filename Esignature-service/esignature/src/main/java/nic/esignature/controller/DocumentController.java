package nic.esignature.controller;

import nic.esignature.dto.SignRequest;
import nic.esignature.dto.SignResponse;
import nic.esignature.entity.Document;
import nic.esignature.repository.DocumentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import nic.esignature.dto.KhatianRequest;
import nic.esignature.dto.KhatianResponse;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private RestTemplate restTemplate;

    private final DocumentRepository repository;

    public DocumentController(DocumentRepository repository) {
        this.repository = repository;
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public SignResponse uploadPdf(
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        // Validation
        if (file.isEmpty()) {
            throw new RuntimeException("No file uploaded");
        }

        if (!"application/pdf".equals(file.getContentType())) {
            throw new RuntimeException("Only PDF files are allowed");
        }

        // Create document metadata
        Document document = new Document();

        document.setDocumentId(UUID.randomUUID());
        document.setFileName(file.getOriginalFilename());
        document.setMimeType(file.getContentType());
        document.setUploadedAt(LocalDateTime.now());

        // Convert PDF to Base64
        String base64 =
                Base64.getEncoder()
                        .encodeToString(file.getBytes());

        // Optional:
        // Keep this only if your table still has base64_content
        document.setBase64Content(base64);

        // Save document
        repository.save(document);

        // Prepare request for API2
        SignRequest request = new SignRequest();

        request.setDocumentId(
                document.getDocumentId().toString());

        request.setBase64Document(base64);

        // Call API2
        SignResponse signResponse =
                restTemplate.postForObject(
                        "http://localhost:8081/api/esign/sign",
                        request,
                        SignResponse.class
                );

        document.setSignature(
                signResponse.getSignature());
        repository.save(document);
        return signResponse;
    }
    @PostMapping("/sign-khatian")
    public SignResponse signKhatian(
            @RequestBody KhatianRequest khatianRequest
    ) {

        KhatianResponse khatianResponse =
                restTemplate.postForObject(
                        "http://localhost:8082/khatian/frskhatian",
                        khatianRequest,
                        KhatianResponse.class
                );

        Document document = new Document();

        document.setDocumentId(UUID.randomUUID());
        document.setFileName(khatianResponse.getFileName());
        document.setMimeType("application/pdf");
        document.setUploadedAt(LocalDateTime.now());

        repository.save(document);

        SignRequest signRequest =
                new SignRequest();

        signRequest.setDocumentId(
                document.getDocumentId().toString());

        signRequest.setBase64Document(
                khatianResponse.getBase64Document());

        SignResponse signResponse =
                restTemplate.postForObject(
                        "http://localhost:8081/api/esign/sign",
                        signRequest,
                        SignResponse.class
                );

        document.setSignature(
                signResponse.getSignature());

        repository.save(document);

        return signResponse;
    }
}