package esignapi.esiggn.controller;
import esignapi.esiggn.dto.SignRequest;
import esignapi.esiggn.dto.SignResponse;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.util.Base64;
import java.util.HexFormat;

@RestController
@RequestMapping("/api/esign")

public class EsignController {
    @PostMapping("/sign")
    public SignResponse signDocument(
            @RequestBody SignRequest request)
            throws Exception {

        byte[] pdfBytes =
                Base64.getDecoder()
                        .decode(request.getBase64Document());

        MessageDigest digest =
                MessageDigest.getInstance("SHA-256");

        byte[] hash =
                digest.digest(pdfBytes);

        String signature =
                HexFormat.of()
                        .formatHex(hash);

        return new SignResponse(
                "SUCCESS",
                signature,
                "Document signed successfully"
        );
    }
}
