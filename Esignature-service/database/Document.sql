CREATE TABLE documents (
    document_id UUID PRIMARY KEY,
    file_name VARCHAR(255),
    mime_type VARCHAR(100),
    base64_content TEXT,
    signature VARCHAR(255),
    uploaded_at TIMESTAMP
);