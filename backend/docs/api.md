# Page Pulse Backend API Documentation

## Endpoints

### 1. Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Response**: `200 OK`
```json
{
  "status": "ok",
  "service": "Page Pulse API",
  "timestamp": "2026-07-26T14:50:00.000Z"
}
```

### 2. Website Audit
- **URL**: `/api/audit`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Payload
```json
{
  "url": "https://example.com"
}
```

#### Successful Response (`200 OK`)
```json
{
  "status": 200,
  "responseTime": 142,
  "title": "Example Domain",
  "metaDescription": "This domain is for use in illustrative examples in documents.",
  "h1Count": 1,
  "imagesWithoutAlt": 0,
  "wordCount": 38
}
```

#### Error Handling Codes
- `400 INVALID_URL`: Input payload URL string is invalid or missing protocol.
- `400 DNS_LOOKUP_FAILED`: Target URL domain name cannot be resolved.
- `422 NON_HTML_RESPONSE`: Target URL returned binary or non-HTML content-type.
- `502 CONNECTION_REFUSED`: Target server actively refused TCP connection.
- `504 GATEWAY_TIMEOUT`: Request to target URL timed out exceeding timeout setting.
