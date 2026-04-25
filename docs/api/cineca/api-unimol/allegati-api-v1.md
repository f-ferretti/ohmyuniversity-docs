---
title: Allegati API V1 | OhMyUniversity!
description: REST API documentation for the Allegati service (allegati-service-v1) - upload and download of attachments in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Allegati API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Allegati service (allegati-service-v1) - upload and download of attachments in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/allegati-api-v1
  - - meta
    - name: keywords
      content: allegati api, attachments api, esse3 rest api, cineca api, ohmyuniversity api, file upload, file download, dom tiro, tirocinio allegati
  - - meta
    - name: twitter:title
      content: Allegati API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Allegati service (allegati-service-v1) - upload and download of attachments in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Allegati API V1

**ENG:** `Attachments`

**Version:** `1.0.0` · **Base URL:** `/allegati-service-v1`

Service for uploading and downloading attachments linked to application entities.

---

## Supported attachment types

| Type       | Description                             | Link key    | Upload | Download |
| ---------- | --------------------------------------- | ----------- | ------ | -------- |
| `DOM_TIRO` | Attachments for internship applications | `domTiroId` | Yes    | Yes      |

> All available types can be retrieved via `GET /allegati`.

---

## Upload flow

The upload process is split into two steps:

1. **Upload metadata** - POST the attachment metadata via a service-specific endpoint or via the generic `POST /allegati/{tipoAllegato}`. The response includes a `Location` header with the URL for the blob upload.
2. **Upload blob** - PUT the binary file to `/upload/{uploadId}/blob` using the URL from the previous step.

```
WARNING!

Inserting metadata alone does NOT persist any data to the application tables. The upload is only complete after the blob is successfully submitted in step 2.
```

---

## Download flow

Metadata and binary content are retrieved separately:

- **Metadata** - `GET /allegati/{tipoAllegato}/{allegatoId}`
- **Blob** - `GET /allegati/{tipoAllegato}/{allegatoId}/blob`

---

## Endpoints - Attachments (Allegati)

### `GET /allegati` - Get supported attachment types

```java
/**
 * Returns the list of attachment types enabled for REST operations.
 * For each type, indicates whether upload and/or download is supported.
 *
 * @param none
 * @return List<TipologiaAllegato> list of enabled attachment types
 */
GET /allegati
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "typeId": 1, // Attachment type ID
    "typeCod": "P", // Attachment type code
    "downloadSupported": 1, // Download enabled (1=yes, 0=no)
    "uploadSupported": 1 // Upload enabled (1=yes, 0=no)
  }
]
```

<br>

---

<br>

### `GET /allegati/codiceTipologiaAllegato` - Get attachment type codes

```java
/**
 * Returns the list of attachment types and their associated codes managed
 * by ESSE3, including descriptions in the requested language, file size
 * limits, and visibility settings.
 *
 * @param sessionLinguaCod string (query, optional) - ISO 639-2 language code
 *                                                    for descriptions; defaults
 *                                                    to system language if not
 *                                                    provided or unavailable
 * @param start            int (query, optional)    - index of the first record
 *                                                    to load, defaults to 0
 * @param limit            int (query, optional)    - number of records to retrieve
 *                                                    starting from start, defaults
 *                                                    to 50, allowed range: 0–100
 * @return List<CodiceTipologiaAllegato> paginated list of attachment type codes
 */
GET /allegati/codiceTipologiaAllegato
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` · `SOGG_EST` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "linguaId": 5, // Language ID
    "linguaCod": "ita", // ISO 639-2 language code
    "tipoAllegatoCod": "ISEE", // Attachment type code
    "des": "Attestazione ISEE", // Attachment type description
    "maxUploadFileSize": 5, // Maximum upload file size (MB)
    "abilVisNoReg": 0, // Visibility for unregistered users (0=no, 1=yes)
    "abilStampaAllegatiFlg": 1 // Print enabled (0=no, 1=yes)
  }
]
```

<br>

---

<br>

### `GET /allegati/estensioneAllegato` - Get allowed attachment extensions

```java
/**
 * Returns the list of file extensions allowed for attachments,
 * along with their codes and descriptions managed by ESSE3.
 *
 * @param start int (query, optional) - index of the first record
 *                                      to load, defaults to 0
 * @param limit int (query, optional) - number of records to retrieve
 *                                      starting from start, defaults
 *                                      to 50, allowed range: 0–100
 * @return List<EstensioneAllegato> paginated list of allowed file extensions
 */
GET /allegati/estensioneAllegato
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` · `SOGG_EST` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "estensioneId": 1, // Extension ID
    "estensione": "pdf", // File extension
    "estensioneDes": "PDF" // Extension description
  }
]
```

<br>

---

<br>

### `GET /allegati/{tipoAllegato}` - Get attachments by type

```java
/**
 * Returns the paginated list of attachment metadata for a specific
 * attachment type. Only types enabled for REST services are accessible.
 *
 * @param tipoAllegato string (path, required)  - code of the attachment type
 *                                                to retrieve
 * @param start        int (query, optional)    - index of the first record
 *                                                to load, defaults to 0
 * @param limit        int (query, optional)    - number of records to retrieve
 *                                                starting from start, defaults
 *                                                to 50, allowed range: 0–100
 * @return List<AllegatoMetadata> paginated list of attachment metadata
 */
GET /allegati/{tipoAllegato}
```

**Auth:** `UTENTE_TECNICO` required · Attachment type must be enabled for REST · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "allegatoId": 1111, // Attachment ID (primary key)
    "tipoAllegato": "string", // Attachment type code
    "filename": "readme.txt", // Original filename
    "autore": "mario rossi", // Author
    "titolo": "tesi di laurea", // Title
    "descrizione": "string", // Free description
    "tipologiaAllegato": "ACC_RIS", // Attachment category code
    "validoFlg": 1 // Valid flag (1=valid, 0=invalid)
  }
]
```

<br>

---

<br>

### `POST /allegati/{tipoAllegato}` - Insert attachment metadata

```java
/**
 * Inserts the metadata for a new attachment of the specified type.
 * This is step 1 of the upload flow - no binary data is saved at this stage.
 * On success, the response includes a Location header with the URL
 * to use for the blob upload (step 2).
 *
 * @param tipoAllegato       string (path, required)   - code of the attachment
 *                                                       type to upload
 * @param filename           string (body, required)   - original filename
 * @param autore             string (body, optional)   - author
 * @param titolo             string (body, optional)   - title
 * @param descrizione        string (body, optional)   - free description
 * @param tipologiaAllegato  string (body, optional)   - attachment category code
 * @param validoFlg          int (body, optional)      - valid flag (1=valid, 0=invalid)
 * @param chiaviCollegamento array (body, optional)    - list of link keys connecting
 *                                                       the attachment to other
 *                                                       ESSE3 entities (e.g. domTiroId)
 * @param proprietaAggiuntive array (body, optional)   - list of additional custom
 *                                                       properties (string, numeric,
 *                                                       or date values)
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/{tipoAllegato}
```

**Auth:** `UTENTE_TECNICO` required · Attachment type must be enabled for REST · Supported: `Basic`, `JWT`

**Cache:** none

```
WARNING!

This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
```

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 1, // Valid flag (1=valid, 0=invalid)
  "chiaviCollegamento": [
    {
      "nome": "domTiroId", // Link key name (connects to ESSE3 entity)
      "valore": 123 // Entity ID value
    }
  ],
  "proprietaAggiuntive": [
    {
      "nome": "nome", // Property name
      "valAlfa": "val_alfa", // String value
      "valNum": 1, // Numeric value
      "valDate": "30/10/2097 24:09:00" // Date value DD/MM/YYYY HH:mm:ss
    }
  ]
}
```

#### Response

**`201 Created`** - Metadata saved. Check the `Location` response header for the blob upload URL.

**`422 Unprocessable Entity`** - Insert failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /allegati/{tipoAllegato}/{allegatoId}` - Get attachment metadata by ID

```java
/**
 * Returns the metadata of a specific attachment identified by its type
 * and ID. Does not return the binary content - use the /blob endpoint
 * to retrieve the file itself.
 *
 * @param tipoAllegato string (path, required) - code of the attachment type
 * @param allegatoId   long (path, required)   - attachment ID
 * @return AllegatoMetadata the attachment metadata
 */
GET /allegati/{tipoAllegato}/{allegatoId}
```

**Auth:** `UTENTE_TECNICO` required · Attachment type must be enabled for REST · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "allegatoId": 1111, // Attachment ID (primary key)
  "tipoAllegato": "string", // Attachment type code
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 1 // Valid flag (1=valid, 0=invalid)
}
```

<br>

---

<br>

### `PATCH /allegati/{tipoAllegato}/{allegatoId}` - Update attachment metadata

```java
/**
 * Partially updates the metadata of a specific attachment.
 * Currently supports setting the validoFlg field only.
 * Returns 422 if the requested operation is not permitted
 * (e.g. attempting to validate an attachment that cannot be validated).
 *
 * @param tipoAllegato string (path, required)  - code of the attachment type
 * @param allegatoId   long (path, required)    - attachment ID
 * @param validoFlg    int (body, optional)     - validation flag; set to 1 to
 *                                                validate the attachment
 * @return AllegatoMetadata the updated attachment metadata on success,
 *         DettaglioErrore on failure
 */
PATCH /allegati/{tipoAllegato}/{allegatoId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "validoFlg": 1 // Validation flag - only value 1 (validate) is supported
}
```

#### Response

**`200 OK`** - Metadata updated. Returns the full updated attachment metadata.

```json
{
  "allegatoId": 1111, // Attachment ID (primary key)
  "tipoAllegato": "string", // Attachment type code
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 1 // Valid flag (1=valid, 0=invalid)
}
```

**`422 Unprocessable Entity`** - Update failed or operation not permitted.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /allegati/{tipoAllegato}/{allegatoId}/blob` - Download attachment binary

```java
/**
 * Downloads the binary content (blob) of a specific attachment.
 * Returns the raw file as an octet-stream - use the metadata endpoint
 * to retrieve filename and content type before downloading.
 *
 * @param tipoAllegato string (path, required) - code of the attachment type
 * @param allegatoId   long (path, required)   - attachment ID
 * @return byte[] raw file content as application/octet-stream on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{tipoAllegato}/{allegatoId}/blob
```

**Auth:** `UTENTE_TECNICO` required · Attachment type must be enabled for REST · Supported: `Basic`, `JWT`

**Cache:** none

**Response Content-Type:** `application/octet-stream`

#### Response

**`200 OK`** - Returns the raw binary file content.

**`422 Unprocessable Entity`** - Download failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

## Endpoints - Uploads (Upload)

### `GET /upload/{uploadId}` - Get upload metadata

```java
/**
 * Returns the metadata of a specific upload session, including its current
 * status, linked attachment info, and any additional properties.
 * Returns 102 Processing if the upload is still in progress.
 *
 * @param uploadId long (path, required) - upload session ID released by the
 *                                         metadata insertion endpoint
 * @return UploadMetadata the upload session metadata on success
 */
GET /upload/{uploadId}
```

**Auth:** `ALL` (users who requested the upload) · `UTENTE_TECNICO` · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`102 Processing`** - Upload still in progress.

**`200 OK`**

```json
{
  "uploadId": 1111, // Upload session ID (primary key)
  "allegatoId": 1111, // Linked attachment ID
  "tipoAllegato": "DOM_TIRO", // Attachment type code
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 1, // Valid flag (1=valid, 0=invalid)
  "statoUpload": "WAITING", // Upload status
  "proprietaAggiuntive": [
    {
      "nome": "nome", // Property name
      "valAlfa": "val_alfa", // String value
      "valNum": 1, // Numeric value
      "valDate": "06/12/1915 01:58:29", // Date value DD/MM/YYYY HH:mm:ss
      "uploadId": 1111, // Upload session ID (primary key)
      "dettId": 1111 // Additional property detail ID (primary key)
    }
  ],
  "chiaviCollegamento": [
    {
      "nome": "domTiroId", // Link key name (connects to ESSE3 entity)
      "valore": 123 // Entity ID value
    }
  ]
}
```

<br>

---

<br>

### `DELETE /upload/{uploadId}` - Delete upload metadata

```java
/**
 * Deletes the metadata of an upload session. Can be used either to clean up
 * after a successful upload or to abort an upload that is no longer needed.
 *
 * @param uploadId long (path, required) - upload session ID to delete
 * @return 204 No Content on success, DettaglioErrore on failure
 */
DELETE /upload/{uploadId}
```

**Auth:** `ALL` (users who requested the upload) · `UTENTE_TECNICO` · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`204 No Content`** - Upload metadata successfully deleted.

**`422 Unprocessable Entity`** - Delete failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /upload/{uploadId}/blob` - Monitor upload status

```java
/**
 * Monitors the status of a blob upload session.
 * Returns 200 if the upload completed successfully,
 * or 102 if it is still in progress or ended abnormally.
 * Poll this endpoint after PUT /upload/{uploadId}/blob to verify completion.
 *
 * @param uploadId long (path, required) - upload session ID to monitor
 * @return 200 OK if upload completed, 102 Processing if still in progress
 *         or ended abnormally
 */
GET /upload/{uploadId}/blob
```

**Auth:** `ALL` (users who requested the upload) · `UTENTE_TECNICO` · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`102 Processing`** - Upload still in progress or ended abnormally.

**`200 OK`** - Upload completed successfully.

<br>

---

<br>

### `PUT /upload/{uploadId}/blob` - Upload attachment binary

```java
/**
 * Uploads the binary content (blob) of an attachment. This is step 2 of
 * the upload flow and must be called using the URL received in the Location
 * header from the metadata insertion endpoint.
 * The upload process is complete only after this step succeeds.
 *
 * @param uploadId   long (path, required)     - upload session ID released by
 *                                               the metadata insertion endpoint
 * @param uploadFile file (formData, optional) - the binary file to upload
 * @return 200 OK on success, DettaglioErrore on failure
 */
PUT /upload/{uploadId}/blob
```

**Auth:** `ALL` (users who requested the upload) · `UTENTE_TECNICO` · Supported: `Basic`, `JWT`

**Cache:** none

**Content-Type:** `multipart/form-data`

```
WARNING!

This is step 2 of the upload flow. The `uploadId` must be obtained from the `Location` header returned by `POST /allegati/{tipoAllegato}`. The upload is not complete until this endpoint returns `200 OK`.
```

#### Response

**`200 OK`** - Blob uploaded successfully. Upload flow complete.

**`422 Unprocessable Entity`** - Upload failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

---

## References

- **Swagger UI:** [Allegati Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Allegati%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fallegati-service-v1)>)
- **Spec YAML:** [frk-allegatiApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/frk-allegatiApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
