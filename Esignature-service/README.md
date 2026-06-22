# eSign Services

## Overview

This repository contains three Spring Boot services that work together to retrieve a Khatian document, generate a digital signature, and store the signature.

## Services

### API1 - eSignature Service

**Port:** 8080

**Endpoint:**

POST /api/documents/sign-khatian

**Responsibilities:**

* Receive Khatian details
* Call API3 to fetch the document
* Receive Base64 document
* Call API2 for signature generation
* Store generated signature
* Return signing response

---

### API2 - Signature Service

**Port:** 8081

**Endpoint:**

POST /api/esign/sign

**Responsibilities:**

* Receive Base64 document
* Generate SHA-256 signature
* Return signature response

---

### API3 - Khatian Service

**Port:** 8082

**Endpoints:**

POST /khatian/upload

POST /khatian/frskhatian

**Responsibilities:**

* Store Khatian PDF documents
* Search documents using:

  * Khatian Number
  * Village Code
  * District Code
* Convert PDF to Base64
* Return document details

---

## End-to-End Flow

API1
↓
API3
↓
Retrieve PDF from Database
↓
Convert PDF to Base64
↓
API1
↓
API2
↓
Generate SHA-256 Signature
↓
API1 stores Signature
↓
Return Success Response

---

## Sample Request

### API1

POST /api/documents/sign-khatian

Request Body:

{
"khatianNo": "121",
"villageCode": "922855",
"districtCode": "272"
}

Sample Response:

{
"message": "Document signed successfully",
"signature": "<generated-signature>",
"status": "SUCCESS"
}

---

## Database Scripts

Database schema scripts are available in:

database/
├── documents.sql
└── khatian_documents.sql

---

## Startup Order

1. Start API3 (Khatian Service)
2. Start API2 (Signature Service)
3. Start API1 (eSignature Service)

---

## Technology Stack

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Maven

---

## Notes

* Signature generation uses SHA-256 hashing.
* API3 stores PDF documents as BYTEA in PostgreSQL.
* API1 stores generated signatures for future reference.
