package esignapi.esiggn.dto;

public class SignResponse {
    private String status;

    private String signature;

    private String message;

    public SignResponse() {
    }

    public SignResponse(
            String status,
            String signature,
            String message) {

        this.status = status;
        this.signature = signature;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
