package nic.khkatian_services.service;
import org.springframework.stereotype.Service;
import nic.khkatian_services.entity.KhatianDocument;
import nic.khkatian_services.repository.KhatianDocumentRepository;
import nic.khkatian_services.dto.KhatianResponse;
import java.util.Base64;
@Service
public class KhatianService {
    private final KhatianDocumentRepository repository;

    public KhatianService(KhatianDocumentRepository repository) {
        this.repository = repository;
    }

    public KhatianDocument save(KhatianDocument document) {
        return repository.save(document);
    }
    public KhatianResponse getKhatianDocument(
            String khatianNo,
            String villageCode,
            String districtCode
    ) {

        KhatianDocument document =
                repository
                        .findByKhatianNoAndVillageCodeAndDistrictCode(
                                khatianNo,
                                villageCode,
                                districtCode
                        )
                        .orElseThrow(() ->
                                new RuntimeException("Document not found"));

        String base64 =
                Base64.getEncoder()
                        .encodeToString(
                                document.getDocumentContent());

        KhatianResponse response =
                new KhatianResponse();

        response.setDocumentId(
                document.getId().toString());

        response.setFileName(
                document.getFileName());

        response.setBase64Document(base64);

        return response;
    }
}
