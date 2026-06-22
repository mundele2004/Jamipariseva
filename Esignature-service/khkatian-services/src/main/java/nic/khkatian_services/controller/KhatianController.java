package nic.khkatian_services.controller;
import nic.khkatian_services.entity.KhatianDocument;
import nic.khkatian_services.service.KhatianService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import nic.khkatian_services.dto.KhatianRequest;
import nic.khkatian_services.dto.KhatianResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/khatian")
public class KhatianController {
    private final KhatianService service;

    public KhatianController(KhatianService service) {
        this.service = service;
    }
    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Map<String,Object> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("khatianNo") String khatianNo,
            @RequestParam("villageCode") String villageCode,
            @RequestParam("districtCode") String districtCode
    ) throws Exception {

        KhatianDocument document =
                new KhatianDocument();

        document.setKhatianNo(khatianNo);
        document.setVillageCode(villageCode);
        document.setDistrictCode(districtCode);
        document.setFileName(file.getOriginalFilename());
        document.setDocumentContent(file.getBytes());
        document.setCreatedAt(LocalDateTime.now());

        service.save(document);

        Map<String,Object> response =
                new HashMap<>();

        response.put("message",
                "PDF stored successfully");

        response.put("fileName",
                document.getFileName());

        return response;
    }
    @PostMapping("/frskhatian")
    public KhatianResponse getKhatianDocument(
            @RequestBody KhatianRequest request
    ) {

        return service.getKhatianDocument(
                request.getKhatianNo(),
                request.getVillageCode(),
                request.getDistrictCode()
        );
    }
}
