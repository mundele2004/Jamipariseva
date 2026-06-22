CREATE TABLE khatian_documents (
    id UUID PRIMARY KEY,
    khatian_no VARCHAR(50),
    village_code VARCHAR(50),
    district_code VARCHAR(50),
    file_name VARCHAR(255),
    document_content BYTEA,
    created_at TIMESTAMP
);