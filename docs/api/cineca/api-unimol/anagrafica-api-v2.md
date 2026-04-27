---
title: Anagrafica API V2 | OhMyUniversity!
description: REST API documentation for the Anagrafica service (anagrafica-service-v2) - access to registry data in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Anagrafica API V2 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Anagrafica service (anagrafica-service-v2) - access to registry data in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/anagrafica-api-v2
  - - meta
    - name: keywords
      content: anagrafica api, registry api, esse3 rest api, cineca api, ohmyuniversity api, persone, studenti, docenti, carriere, anagrafiche esse3
  - - meta
    - name: twitter:title
      content: Anagrafica API V2 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Anagrafica service (anagrafica-service-v2) - access to registry data in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Anagrafica API V2

**ENG:** `Registry`

**Version:** `1.3.0` · **Base URL:** `/anagrafica-service-v2`

REST API for accessing registry data in ESSE3, including personal records, student careers, teaching staff, external subjects, institutions, and attachment management.

---

## Changelog

| Version | ESSE3 Release             | Changes                                                                              |
| ------- | ------------------------- | ------------------------------------------------------------------------------------ |
| 1.1.0   | 19.04.01.00               | Added `/docenti`, `/docenti/{docenteId}`                                             |
| 1.1.0   | 20.05.02.00               | Added `/tipiIstituto`, `/atenei`, `/ateneiStranieri`, `/rangeVotiMaturita`           |
| 1.1.0   | 20.05.04.00               | Added `/tipiTitoliScuolaSup`, `/tipiTitoliStranieri`, `/istituti`, `/atenei/corsi`   |
| 1.2.0   | 20.06.00.00               | Added `/persone/{persId}/misure-compensative`                                        |
| 1.2.0   | 20.07.03.00               | Added `/soggettiEsterni`, `/ruoliDocente`                                            |
| 1.2.1   | 20.09.01.00               | Added `/carriere/aggiornaAttesaLaurea`                                               |
| 1.2.2   | 20.10.02.00               | Added `/carriere/{stuId}/iscrizioni`                                                 |
| 1.2.3   | 20.10.03.00               | Added `/carriere/{stuId}/iscrizioni/aggiornaFasciaMensa`                             |
| 1.2.4   | 20.11.00.00               | Added `/persone/{persId}/dismettiEmail`, `/persone/{emailAte}/dismetti`              |
| 1.2.5   | 20.11.03.00               | Added `/utenti/{userId}/trattiCarriera`                                              |
| 1.2.6   | 21.02.03.00 – 21.07.04.00 | Added multiple `/allegati/` and `/docenti/{docenteId}/` endpoints                    |
| 1.3.0   | 21.08.01.00               | Added `/utenti/datiFirma`, `/utenti/datiFirma/csv`                                   |
| 1.3.1   | 22.11.02.00               | Added `PRENOTAZIONE` context to compensatory measures                                |
| 1.3.1   | 23.05.02.00               | **Deprecated** `/docenti*` - use `docenti-service-v1`                                |
| 1.3.1   | 23.05.02.00               | **Deprecated** `/utenti*` - use `utenti-service-v1`                                  |
| 1.3.1   | 23.06.00.00               | **Deprecated** `/nazioni`, `/province`, `/comuni`, `/cap` - use `nazioni-service-v1` |
| 1.3.1   | 23.11.02.00               | **Deprecated** all endpoints under `carriere` tag - use `carriere-service-v1`        |

::: warning Deprecated Endpoints
Several endpoint groups have been deprecated and moved to dedicated services. Always check the changelog above before integrating new endpoints.
:::

---

## Endpoints - Dream Apply (Dream Apply)

### `PUT /activation-url/{applicationId}` - Refresh Dream Apply token and get activation URL

```java
/**
 * Refreshes the expiration date of a Dream Apply token and returns the
 * activation URL, optionally updating the application status to A.
 * Dream Apply is an external platform for managing international student
 * admissions - this endpoint handles token synchronization between
 * ESSE3 and Dream Apply.
 *
 * @param applicationId string (path, required) - external career ID for Dream Apply
 * @return activation URL and token expiration date on success,
 *         DettaglioErrore on failure
 */
PUT /activation-url/{applicationId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Return codes

| Code | Description                |
| ---- | -------------------------- |
| `-1` | Generic error              |
| `0`  | Career cannot be activated |
| `1`  | Execution successful       |

#### Response

**`200 OK`**

```json
{
  "activationUrl": "www.SomeUrl.org", // Activation URL with updated token
  "expiration": "02/02/2020" // Token expiration date DD/MM/YYYY
}
```

**`404 Not Found`** - Invalid `applicationId`.

**`422 Unprocessable Entity`** - Update failed.

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

## Endpoints - Attachments (Allegati)

### `GET /allegati/autorizzati/{autorizzatoId}/allegatiAutorizzato` - Get authorized person attachment metadata

```java
/**
 * Returns the metadata of attachments linked to a specific authorized person.
 * To download the binary content, use the allegatoId and tipoAssAllegato
 * returned by this endpoint with the Allegati API blob download endpoint.
 *
 * @param autorizzatoId    long (path, required)    - authorized person ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg        int (query, optional)    - filter by validation status
 *                                                    (0=not validated, 1=validated)
 * @param webVisFlg        int (query, optional)    - filter by web visibility
 *                                                    (0=not visible, 1=visible)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/autorizzati/{autorizzatoId}/allegatiAutorizzato
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilVisWeb": 0, // Web visibility enabled (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0 // Print enabled (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/autorizzati/{autorizzatoId}/allegatiAutorizzato` - Insert authorized person attachment metadata

```java
/**
 * Inserts the metadata for a new attachment linked to a specific authorized
 * person. This is step 1 of the upload flow - no binary data is saved at
 * this stage. On success, the response includes a Location header with the
 * URL to use for the blob upload (step 2).
 *
 * @param autorizzatoId     long (path, required)   - authorized person ID
 * @param filename          string (body, required) - original filename
 * @param autore            string (body, optional) - author
 * @param titolo            string (body, optional) - title
 * @param descrizione       string (body, optional) - free description
 * @param tipologiaAllegato string (body, optional) - attachment category code
 * @param validoFlg         int (body, optional)    - validation flag (0=not validated,
 *                                                    1=validated)
 * @param abilVisWeb        int (body, optional)    - web visibility flag (0=hidden,
 *                                                    1=visible)
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/autorizzati/{autorizzatoId}/allegatiAutorizzato
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 0, // Validation flag (0=not validated, 1=validated)
  "abilVisWeb": 0 // Web visibility flag (0=hidden, 1=visible)
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

### `GET /allegati/autorizzati/{autorizzatoId}/allegatiDocPers` - Get authorized person identity document attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the identity documents of a
 * specific authorized person. To download the binary content, use the
 * allegatoId and tipoAssAllegato returned by this endpoint with the
 * Allegati API blob download endpoint.
 *
 * @param autorizzatoId     long (path, required)    - authorized person ID
 * @param docIdentTipoCod   string (query, required) - identity document type code,
 *                                                     max length 10;
 *                                                     CI=Identity Card,
 *                                                     PAT=Driving Licence,
 *                                                     PAS=Passport
 * @param autDocPersId      long (query, optional)   - authorized person identity
 *                                                     document ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @param webVisFlg         int (query, optional)    - filter by web visibility
 *                                                     (0=not visible, 1=visible)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/autorizzati/{autorizzatoId}/allegatiDocPers
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilVisWeb": 0, // Web visibility enabled (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0 // Print enabled (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/autorizzati/{autorizzatoId}/allegatiDocPers` - Insert authorized person identity document attachment metadata

```java
/**
 * Inserts the metadata for a new attachment linked to an identity document
 * of a specific authorized person. This is step 1 of the upload flow -
 * no binary data is saved at this stage. On success, the response includes
 * a Location header with the URL to use for the blob upload (step 2).
 *
 * @param autorizzatoId     long (path, required)   - authorized person ID
 * @param filename          string (body, required) - original filename
 * @param autore            string (body, optional) - author
 * @param titolo            string (body, optional) - title
 * @param descrizione       string (body, optional) - free description
 * @param tipologiaAllegato string (body, optional) - attachment category code
 * @param validoFlg         int (body, optional)    - validation flag (0=not validated,
 *                                                    1=validated)
 * @param docIdentTipoCod   string (body, optional) - identity document type code;
 *                                                    CI=Identity Card,
 *                                                    PAT=Driving Licence,
 *                                                    PAS=Passport
 * @param autDocPersId      long (body, optional)   - authorized person identity
 *                                                    document ID
 * @param abilVisWeb        int (body, optional)    - web visibility flag (0=hidden,
 *                                                    1=visible)
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/autorizzati/{autorizzatoId}/allegatiDocPers
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 0, // Validation flag (0=not validated, 1=validated)
  "docIdentTipoCod": "CI", // Identity document type: CI, PAT, PAS
  "autDocPersId": 938, // Authorized person identity document ID
  "abilVisWeb": 0 // Web visibility flag (0=hidden, 1=visible)
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

### `DELETE /allegati/carriere/{matId}` - Delete career segment attachment

```java
/**
 * Deletes an attachment linked to a specific student career segment.
 * Returns the deleted attachment metadata on success.
 *
 * @param matId             long (path, required)    - student career segment ID
 * @param allegatoId        long (query, required)   - attachment ID to delete
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @return AllegatoMetadata the deleted attachment metadata on success,
 *         DettaglioErrore on failure
 */
DELETE /allegati/carriere/{matId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`204 No Content`** - Attachment successfully deleted. Returns the deleted attachment metadata.

```json
{
  "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type
  "allegatoId": 42, // Attachment ID
  "dimensione": 123456, // File size in bytes
  "titolo": "tesi di laurea", // Title
  "des": "string", // Free description
  "filename": "readme.txt", // Original filename
  "estensione": "txt", // File extension
  "autore": "Mario Rossi", // Author
  "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
  "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
  "tipoAllegatoCod": "DOM_IMM" // Attachment type code
}
```

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

### `DELETE /allegati/docPers/{docPersId}` - Delete identity document attachment

```java
/**
 * Deletes an attachment linked to a specific identity document.
 * Returns the deleted attachment metadata on success.
 *
 * @param docPersId         long (path, required)    - identity document ID
 * @param allegatoId        long (query, required)   - attachment ID to delete
 * @param persId            long (query, optional)   - person ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @return AllegatoMetadata the deleted attachment metadata on success,
 *         DettaglioErrore on failure
 */
DELETE /allegati/docPers/{docPersId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`204 No Content`** - Attachment successfully deleted. Returns the deleted attachment metadata.

```json
{
  "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type
  "allegatoId": 42, // Attachment ID
  "dimensione": 123456, // File size in bytes
  "titolo": "tesi di laurea", // Title
  "des": "string", // Free description
  "filename": "readme.txt", // Original filename
  "estensione": "txt", // File extension
  "autore": "Mario Rossi", // Author
  "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
  "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
  "tipoAllegatoCod": "DOM_IMM" // Attachment type code
}
```

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

### `GET /allegati/{persId}/allegatiDicHand` - Get disability declaration attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the disability declarations
 * of a specific person. To download the binary content, use the allegatoId
 * and tipoAssAllegato returned by this endpoint with the Allegati API
 * blob download endpoint.
 *
 * @param persId            long (path, required)    - person ID
 * @param tipoHandicap      string (query, required) - disability type code,
 *                                                     max length 1
 * @param dataDichiar       string (query, optional) - declaration date DD/MM/YYYY
 * @param dataIni           string (query, optional) - disability start date DD/MM/YYYY
 * @param dataFine          string (query, optional) - disability end date DD/MM/YYYY
 * @param dicHandId         long (query, optional)   - disability declaration ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @param webVisFlg         int (query, optional)    - filter by web visibility
 *                                                     (0=not visible, 1=visible)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{persId}/allegatiDicHand
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilVisWeb": 0, // Web visibility enabled (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0 // Print enabled (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/{persId}/allegatiDicHand` - Insert disability declaration attachment metadata

```java
/**
 * Inserts the metadata for a new attachment linked to a disability declaration
 * of a specific person. This is step 1 of the upload flow - no binary data
 * is saved at this stage. On success, the response includes a Location header
 * with the URL to use for the blob upload (step 2).
 *
 * @param persId            long (path, required)   - person ID
 * @param filename          string (body, required) - original filename
 * @param autore            string (body, optional) - author
 * @param titolo            string (body, optional) - title
 * @param descrizione       string (body, optional) - free description
 * @param tipologiaAllegato string (body, optional) - attachment category code
 * @param validoFlg         int (body, optional)    - validation flag (0=not validated,
 *                                                    1=validated)
 * @param tipoHandicap      string (body, optional) - disability type code,
 *                                                    max length 1
 * @param dataDichiar       string (body, optional) - declaration date DD/MM/YYYY
 * @param dataIni           string (body, optional) - disability start date DD/MM/YYYY
 * @param dataFine          string (body, optional) - disability end date DD/MM/YYYY
 * @param dicHandId         long (body, optional)   - disability declaration ID
 * @param abilVisWeb        int (body, optional)    - web visibility flag (0=hidden,
 *                                                    1=visible)
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/{persId}/allegatiDicHand
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 0, // Validation flag (0=not validated, 1=validated)
  "tipoHandicap": "I", // Disability type code, max length 1
  "dataDichiar": "22/05/2021", // Declaration date DD/MM/YYYY
  "dataIni": "27/06/2020", // Disability start date DD/MM/YYYY
  "dataFine": "14/09/2022", // Disability end date DD/MM/YYYY
  "dicHandId": 456, // Disability declaration ID
  "abilVisWeb": 0 // Web visibility flag (0=hidden, 1=visible)
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

### `GET /allegati/{persId}/allegatiDocIdent` - Get identity document attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the identity document of a
 * specific person. To download the binary content, use the allegatoId and
 * tipoAssAllegato returned by this endpoint with the Allegati API blob
 * download endpoint.
 *
 * @param persId            long (path, required)    - person ID
 * @param docIdentTipoCod   string (query, required) - identity document type code,
 *                                                     max length 10;
 *                                                     CI=Identity Card,
 *                                                     PAT=Driving Licence,
 *                                                     PAS=Passport
 * @param docPersId         long (query, optional)   - identity document ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @param webVisFlg         int (query, optional)    - filter by web visibility
 *                                                     (0=not visible, 1=visible)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{persId}/allegatiDocIdent
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilVisWeb": 0, // Web visibility enabled (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0, // Print enabled (0=no, 1=yes)
    "docPersId": 938 // Identity document ID
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `GET /allegati/{persId}/allegatiDocIdent` - Get identity document attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the identity document of a
 * specific person. To download the binary content, use the allegatoId and
 * tipoAssAllegato returned by this endpoint with the Allegati API blob
 * download endpoint.
 *
 * @param persId            long (path, required)    - person ID
 * @param docIdentTipoCod   string (query, required) - identity document type code,
 *                                                     max length 10;
 *                                                     CI=Identity Card,
 *                                                     PAT=Driving Licence,
 *                                                     PAS=Passport
 * @param docPersId         long (query, optional)   - identity document ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @param webVisFlg         int (query, optional)    - filter by web visibility
 *                                                     (0=not visible, 1=visible)
 * @return List list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{persId}/allegatiDocIdent
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilVisWeb": 0, // Web visibility enabled (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0, // Print enabled (0=no, 1=yes)
    "docPersId": 938 // Identity document ID
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/{persId}/allegatiFotoPersona` - Insert person photo attachment metadata

```java
/**
 * Inserts the metadata for a new photo attachment linked to a specific person.
 * This is step 1 of the upload flow - no binary data is saved at this stage.
 * On success, the response includes a Location header with the URL to use
 * for the blob upload (step 2).
 *
 * @param persId       long (path, required)   - person ID
 * @param filename     string (body, required) - original filename
 * @param fotoValidata int (body, optional)    - photo validation flag
 *                                              (0=not validated, 1=validated)
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/{persId}/allegatiFotoPersona
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "foto.jpg", // Original filename
  "fotoValidata": 0 // Photo validation flag (0=not validated, 1=validated)
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

### `GET /allegati/{persId}/allegatiMatur` - Get high school diploma attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the high school diploma
 * records of a specific person. To download the binary content, use the
 * allegatoId and tipoAssAllegato returned by this endpoint with the
 * Allegati API blob download endpoint.
 *
 * @param persId            long (path, required)    - person ID
 * @param annoMaturita      int (query, required)    - diploma year (solar year of
 *                                                     the diploma date; e.g. for
 *                                                     academic year 2019/2020,
 *                                                     the diploma year is 2020)
 * @param idDiplomaMiur     long (query, optional)   - MIUR diploma ID
 * @param dataMaturita      string (query, optional) - diploma date DD/MM/YYYY
 * @param maturId           long (query, optional)   - diploma record ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{persId}/allegatiMatur
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0 // Print enabled (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/{persId}/allegatiMatur` - Insert high school diploma attachment metadata

```java
/**
 * Inserts the metadata for a new attachment linked to a high school diploma
 * record of a specific person. This is step 1 of the upload flow - no binary
 * data is saved at this stage. On success, the response includes a Location
 * header with the URL to use for the blob upload (step 2).
 *
 * @param persId            long (path, required)   - person ID
 * @param filename          string (body, required) - original filename
 * @param autore            string (body, optional) - author
 * @param titolo            string (body, optional) - title
 * @param descrizione       string (body, optional) - free description
 * @param tipologiaAllegato string (body, optional) - attachment category code
 * @param validoFlg         int (body, optional)    - validation flag (0=not validated,
 *                                                    1=validated)
 * @param annoMaturita      int (body, optional)    - diploma year (solar year of
 *                                                    the diploma date; e.g. for
 *                                                    academic year 2019/2020,
 *                                                    the diploma year is 2020)
 * @param idDiplomaMiur     long (body, optional)   - MIUR diploma ID
 * @param dataMaturita      string (body, optional) - diploma date DD/MM/YYYY
 * @param maturId           long (body, optional)   - diploma record ID
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/{persId}/allegatiMatur
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 0, // Validation flag (0=not validated, 1=validated)
  "annoMaturita": 2020, // Diploma year (solar year, e.g. 2020 for 2019/2020)
  "idDiplomaMiur": 16, // MIUR diploma ID
  "dataMaturita": "27/06/2020", // Diploma date DD/MM/YYYY
  "maturId": 56 // Diploma record ID
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

### `GET /allegati/{persId}/allegatiTitIt` - Get Italian university degree attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the Italian university degree
 * records of a specific person. To download the binary content, use the
 * allegatoId and tipoAssAllegato returned by this endpoint with the
 * Allegati API blob download endpoint.
 *
 * @param persId            long (path, required)    - person ID
 * @param tipoTititCod      string (query, required) - Italian degree type code,
 *                                                     max length 10
 * @param aaConsegTit       int (query, optional)    - academic year of degree
 *                                                     completion
 * @param titItId           long (query, optional)   - degree record ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{persId}/allegatiTitIt
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0 // Print enabled (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/{persId}/allegatiTitIt` - Insert Italian university degree attachment metadata

```java
/**
 * Inserts the metadata for a new attachment linked to an Italian university
 * degree record of a specific person. This is step 1 of the upload flow -
 * no binary data is saved at this stage. On success, the response includes
 * a Location header with the URL to use for the blob upload (step 2).
 *
 * @param persId            long (path, required)   - person ID
 * @param filename          string (body, required) - original filename
 * @param autore            string (body, optional) - author
 * @param titolo            string (body, optional) - title
 * @param descrizione       string (body, optional) - free description
 * @param tipologiaAllegato string (body, optional) - attachment category code
 * @param validoFlg         int (body, optional)    - validation flag (0=not validated,
 *                                                    1=validated)
 * @param aaConsegTit       int (body, optional)    - academic year of degree
 *                                                    completion
 * @param tipoTititCod      string (body, optional) - Italian degree type code
 * @param titItId           long (body, optional)   - degree record ID
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/{persId}/allegatiTitIt
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 0, // Validation flag (0=not validated, 1=validated)
  "aaConsegTit": 2020, // Academic year of degree completion
  "tipoTititCod": "LS", // Italian degree type code
  "titItId": 122 // Degree record ID
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

### `GET /allegati/{persId}/allegatiTitStra` - Get foreign university degree attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the foreign university degree
 * records of a specific person. To download the binary content, use the
 * allegatoId and tipoAssAllegato returned by this endpoint with the
 * Allegati API blob download endpoint.
 *
 * @param persId            long (path, required)    - person ID
 * @param aaConsegTit       int (query, required)    - academic year of degree
 *                                                     completion
 * @param tipoTitstCod      string (query, optional) - foreign degree type code,
 *                                                     max length 10
 * @param titStraId         long (query, optional)   - foreign degree record ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{persId}/allegatiTitStra
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0 // Print enabled (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/{persId}/allegatiTitStra` - Insert foreign university degree attachment metadata

```java
/**
 * Inserts the metadata for a new attachment linked to a foreign university
 * degree record of a specific person. This is step 1 of the upload flow -
 * no binary data is saved at this stage. On success, the response includes
 * a Location header with the URL to use for the blob upload (step 2).
 *
 * @param persId            long (path, required)   - person ID
 * @param filename          string (body, required) - original filename
 * @param autore            string (body, optional) - author
 * @param titolo            string (body, optional) - title
 * @param descrizione       string (body, optional) - free description
 * @param tipologiaAllegato string (body, optional) - attachment category code
 * @param validoFlg         int (body, optional)    - validation flag (0=not validated,
 *                                                    1=validated)
 * @param aaConsegTit       int (body, optional)    - academic year of degree
 *                                                    completion
 * @param tipoTitstCod      string (body, optional) - foreign degree type code
 * @param titStraId         long (body, optional)   - foreign degree record ID
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/{persId}/allegatiTitStra
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 0, // Validation flag (0=not validated, 1=validated)
  "aaConsegTit": 2020, // Academic year of degree completion
  "tipoTitstCod": "BA", // Foreign degree type code
  "titStraId": 333 // Foreign degree record ID
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

### `GET /allegati/{stuId}/allegatiMatricola` - Get student registration attachment metadata

```java
/**
 * Returns the metadata of attachments linked to the student registration
 * (matricola) of a specific career. To download the binary content, use the
 * allegatoId and tipoAssAllegato returned by this endpoint with the
 * Allegati API blob download endpoint.
 *
 * @param stuId             long (path, required)    - career ID
 * @param tipologiaAllegato string (query, optional) - attachment type filter,
 *                                                     max length 10,
 *                                                     references p17_tipologia_allegati
 * @param validoFlg         int (query, optional)    - filter by validation status
 *                                                     (0=not validated, 1=validated)
 * @param webVisFlg         int (query, optional)    - filter by web visibility
 *                                                     (0=not visible, 1=visible)
 * @return List<AllegatoMetadata> list of attachment metadata on success,
 *         DettaglioErrore on failure
 */
GET /allegati/{stuId}/allegatiMatricola
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoAssAllegato": "MATRICOLA_REST", // Attachment association type (use for blob download)
    "allegatoId": 42, // Attachment ID (use for blob download)
    "dimensione": 123456, // File size in bytes
    "titolo": "tesi di laurea", // Title
    "des": "string", // Free description
    "filename": "readme.txt", // Original filename
    "estensione": "txt", // File extension
    "autore": "Mario Rossi", // Author
    "dataIns": "01/01/2021", // Insert date DD/MM/YYYY
    "dataMod": "20/04/2021", // Last modified date DD/MM/YYYY
    "tipoAllegatoCod": "DOM_IMM", // Attachment type code
    "validoFlg": 0, // Validated flag (0=no, 1=yes)
    "abilVisWeb": 0, // Web visibility enabled (0=no, 1=yes)
    "abilStampaAllegatiFlg": 0 // Print enabled (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /allegati/{stuId}/allegatiMatricola` - Insert student registration attachment metadata

```java
/**
 * Inserts the metadata for a new attachment linked to the student registration
 * (matricola) of a specific career. This is step 1 of the upload flow -
 * no binary data is saved at this stage. On success, the response includes
 * a Location header with the URL to use for the blob upload (step 2).
 *
 * @param stuId             long (path, required)   - career ID
 * @param filename          string (body, required) - original filename
 * @param autore            string (body, optional) - author
 * @param titolo            string (body, optional) - title
 * @param descrizione       string (body, optional) - free description
 * @param tipologiaAllegato string (body, optional) - attachment category code
 * @param validoFlg         int (body, optional)    - validation flag (0=not validated,
 *                                                    1=validated)
 * @param abilVisWeb        int (body, optional)    - web visibility flag (0=hidden,
 *                                                    1=visible)
 * @return 201 Created + Location header on success, DettaglioErrore on failure
 */
POST /allegati/{stuId}/allegatiMatricola
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint only saves metadata. The upload is NOT COMPLETE until the blob is submitted via `PUT /upload/{uploadId}/blob` using the URL from the `Location` response header.
:::

#### Request body

```json
{
  "filename": "readme.txt", // Original filename
  "autore": "mario rossi", // Author
  "titolo": "tesi di laurea", // Title
  "descrizione": "string", // Free description
  "tipologiaAllegato": "ACC_RIS", // Attachment category code
  "validoFlg": 0, // Validation flag (0=not validated, 1=validated)
  "abilVisWeb": 0 // Web visibility flag (0=hidden, 1=visible)
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

## Endpoints - Registry (Anagrafica)

<br>

---

<br>

## Registry

### `GET /atenei` - Get universities

```java
/**
 * Returns the list of universities configured in ESSE3,
 * with their registry data, contact info, and institutional codes.
 * Supports filtering by ISTAT code, university ID, and MIUR code,
 * as well as field selection, ordering, and pagination.
 *
 * @param istatCod string (query, optional) - university ISTAT code, max length 10
 * @param ateneoId long (query, optional)   - unique university ID
 * @param codeUn   string (query, optional) - MIUR university code, max length 3
 * @param fields   string (query, optional) - comma-separated list of optional
 *                                            fields to include; use ALL for all;
 *                                            supports Ant Glob Patterns
 *                                            (e.g. obj.*, obj.**)
 * @param order    string (query, optional) - sort order; prefix field with + (ASC)
 *                                            or - (DESC); multiple fields
 *                                            comma-separated (e.g. +istatCod,-des)
 * @param start    int (query, optional)    - index of the first record to load,
 *                                            defaults to 0
 * @param limit    int (query, optional)    - number of records to retrieve
 *                                            starting from start, defaults to 50,
 *                                            allowed range: 0–100
 * @return List<Ateneo> paginated list of universities
 */
GET /atenei
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "ateneoId": 78, // Unique university ID
    "istatCod": "0", // ISTAT code
    "des": "string", // University name
    "via": "Via Magnanelli", // Street address
    "cap": "40033", // Postal code
    "citta": "string", // City
    "prov": "BO", // Province code
    "cf": "1234567890", // Tax code
    "piva": "1234567890", // VAT number
    "desMav1": "MAV1", // MAV description 1
    "desMav2": "MAV2", // MAV description 2
    "desMav3": "MAV3", // MAV description 3
    "desMav4": "MAV4", // MAV description 4
    "almaPref": "YY", // Alma mater prefix
    "desBd1": "Segreterie studenti", // Administrative office description
    "codeUn": "999", // MIUR university code
    "comuneId": 1379, // Municipality ID
    "comuneDes": "string", // Municipality name
    "comuneCod": "B880", // Municipality code
    "comuneSigla": "BO", // Municipality abbreviation
    "comuneCodIstat": "15881", // Municipality ISTAT code
    "comuneCap": "40033", // Municipality postal code
    "csaUltElab": "15/10/2015", // Last CSA processing date DD/MM/YYYY
    "urlGuidaWeb": "string", // Web guide URL
    "erasmusCod": "KION001", // Erasmus code
    "prodotto": "ESSE3", // Product name
    "webFlg": 0, // Web flag (0=no, 1=yes)
    "sysFlg": 1, // System flag (0=no, 1=yes)
    "tipoUnivCod": "ATE", // University type code
    "tipiUnivDes": "Ateneo", // University type description
    "tipiUnivNote": null, // University type notes
    "note": null, // Notes
    "icNumber": null, // IC number
    "siglaUniv": "unikion", // University abbreviation
    "telefono": "1234567890", // Phone number
    "fax": "1234567890", // Fax number
    "nazioneId": 1, // Country ID
    "nazioneCod": "200", // Country code
    "nazioneDes": "ITALIA", // Country name
    "nazioneCodFisc": "Z123", // Country tax code
    "nazioneNazioneCod": "IT", // ISO country code
    "desCert": null, // Certificate description
    "desCertGenit": null, // Parent certificate description
    "desCertLocat": null, // Location certificate description
    "desCertVocat": null, // Vocational certificate description
    "email": "email@ateneo.it", // University email
    "cvIdIntermediario": null, // CV intermediary ID
    "cvEmail": "string", // CV intermediary email
    "ipaCod": null, // IPA code
    "aooCod": null, // AOO code
    "bestrCod": null, // BESTR code
    "emailCertificata": "string" // Certified email (PEC)
  }
]
```

<br>

---

<br>

### `GET /atenei/corsi` - Get university degree courses

```java
/**
 * Returns the list of degree courses from other universities configured
 * in ESSE3. Optionally includes the associated degree classes via the
 * optionalFields parameter.
 *
 * @param erasmusCod   string (query, optional) - university Erasmus code,
 *                                                max length 20
 * @param ateneoId     long (query, optional)   - unique university ID
 * @param istatCod     string (query, optional) - university ISTAT code,
 *                                                max length 10
 * @param codeUn       string (query, optional) - MIUR university code,
 *                                                max length 3
 * @param tipoCorsoCod string (query, optional) - degree course type code,
 *                                                max length 10
 * @param fields       string (query, optional) - comma-separated list of optional
 *                                                fields to include; use ALL for all;
 *                                                supports Ant Glob Patterns
 *                                                (e.g. obj.*, obj.**)
 * @param optionalFields string (query, optional) - alias for fields, same behavior;
 *                                                  use classe or classe.* to include
 *                                                  degree class data (optional field)
 * @param order        string (query, optional) - sort order; prefix field with +
 *                                                (ASC) or - (DESC); multiple fields
 *                                                comma-separated (e.g. +des,-cod)
 * @param start        int (query, optional)    - index of the first record to load,
 *                                                defaults to 0
 * @param limit        int (query, optional)    - number of records to retrieve
 *                                                starting from start, defaults to 50,
 *                                                allowed range: 0–100
 * @return List<CorsoDiStudio> paginated list of degree courses
 */
GET /atenei/corsi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "cdsAteId": "1337", // Degree course ID (primary key)
    "ateneoId": 78, // University ID
    "ateneiIstatCod": "0", // University ISTAT code
    "ateneiDes": "string", // University name
    "ateneiCodeUn": "999", // University MIUR code
    "ateneiErasmusCod": "KION001", // University Erasmus code
    "tipoCorsoCod": "L2", // Degree course type code
    "istatCod": "54321", // Degree course ISTAT code
    "des": "INFORMATICA", // Degree course name
    "aaDisattivazione": null, // Deactivation academic year
    "durataAnni": 4, // Duration in years
    "riformaFlg": 1, // Reform flag (0=no, 1=yes)
    "cod": "512", // Degree course code
    "settFlg": 0, // Sector flag (0=no, 1=yes)
    "genericoFlg": 0, // Generic flag (0=no, 1=yes)
    "codicione": "00XAE0A12", // Extended code
    "normId": 1, // Regulation ID
    "normativaCod": "AR", // Regulation code
    "normativaDes": "Ante Riforma", // Regulation description
    "normativaNote": "string", // Regulation notes
    "sysFlg": 0, // System flag (0=no, 1=yes)
    "note": "string", // Notes
    "classe": [
      // Degree classes (optional - use fields=classe.*)
      {
        "cdsAteId": "1337", // Degree course ID
        "cod": "1", // Class code
        "des": "string", // Class description
        "claAreaId": 2, // Class area ID
        "iscedF1": "5", // ISCED field level 1
        "iscedF2": "41", // ISCED field level 2
        "iscedF3": "330" // ISCED field level 3
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /ateneiStranieri` - Get foreign universities

```java
/**
 * Returns the list of foreign universities configured in ESSE3,
 * with their registry data, contact info, and institutional codes.
 * Supports filtering by Erasmus code, university ID, and country codes,
 * as well as field selection, ordering, and pagination.
 *
 * @param erasmusCod         string (query, optional) - university Erasmus code,
 *                                                      max length 20
 * @param ateneoStranieroId  long (query, optional)   - unique foreign university ID
 * @param nazioneCodFisc     string (query, optional) - country tax code
 * @param nazioneOrdCodFisc  string (query, optional) - ordering country tax code,
 *                                                      max length 4
 * @param fields             string (query, optional) - comma-separated list of
 *                                                      optional fields to include;
 *                                                      use ALL for all; supports
 *                                                      Ant Glob Patterns
 *                                                      (e.g. obj.*, obj.**)
 * @param order              string (query, optional) - sort order; prefix field
 *                                                      with + (ASC) or - (DESC);
 *                                                      multiple fields
 *                                                      comma-separated
 * @param start              int (query, optional)    - index of the first record
 *                                                      to load, defaults to 0
 * @param limit              int (query, optional)    - number of records to retrieve
 *                                                      starting from start, defaults
 *                                                      to 50, allowed range: 0–100
 * @return List<AteneoStraniero> paginated list of foreign universities
 */
GET /ateneiStranieri
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "ateneoStranieroId": 42, // Foreign university ID
    "nazioneId": 154, // Country ID
    "nazioneCod": "509", // Country code
    "nazioneDes": "CANADA", // Country name
    "nazioneCodFisc": "Z401", // Country tax code
    "nazioneMiurCod": "CA", // Country MIUR code
    "des": "University of Montreal", // University name
    "citStra": "Montreal", // Foreign city
    "comuneId": 1379, // Municipality ID
    "comuneDes": "string", // Municipality name
    "comuneCod": "B880", // Municipality code
    "comuneSigla": "BO", // Municipality abbreviation
    "comuneCodIstat": "15881", // Municipality ISTAT code
    "comuneCap": "40033", // Municipality postal code
    "rettoreId": 42, // Rector ID
    "rettoreCognome": "Rossi", // Rector last name
    "rettoreNome": "Mario", // Rector first name
    "rettoreSesso": "M", // Rector gender
    "rettoreCodFis": "string", // Rector tax code
    "rettoreDataNascita": "15/10/1970", // Rector date of birth DD/MM/YYYY
    "rettoreTel": "1234567890", // Rector phone number
    "rettoreCellulare": "1234567890", // Rector mobile number
    "rettoreEmail": "string", // Rector email
    "homePage": "string", // University website URL
    "erasmusCod": "CANMONTREA16", // Erasmus code
    "via": "Via Magnanelli", // Street address
    "tel": "1234567890", // Phone number
    "prefixInternaz": "39", // International dialling prefix
    "fax": "1234567890", // Fax number
    "email": "string", // University email
    "nazioneOrdId": 154, // Ordering country ID
    "nazioneOrdCod": "509", // Ordering country code
    "nazioneOrdDes": "CANADA", // Ordering country name
    "nazioneOrdCodFisc": "Z401", // Ordering country tax code
    "nazioneOrdMiurCod": "CA", // Ordering country MIUR code
    "codiceAteneo": "CANADA 016", // University code
    "codicePic": "1234567980", // PIC code
    "codAteStra": "AB1234", // Foreign university code
    "codiceSchac": "ABC123", // SCHAC code
    "dtIniVal": "01/10/1990", // Validity start date DD/MM/YYYY
    "dtFinVal": "15/07/1995", // Validity end date DD/MM/YYYY
    "iataCod": "YTO" // IATA airport code
  }
]
```

<br>

---

<br>

### `GET /istituti` - Get schools and institutes

```java
/**
 * Returns the list of schools and institutes configured in ESSE3,
 * with their registry data, contact info, and institutional codes.
 * Supports filtering by school type, MIUR code, and ID,
 * as well as field selection, ordering, and pagination.
 *
 * @param tipologiaScuolaCod string (query, optional) - school type code,
 *                                                      max length 10
 * @param scuolaMiurCod      string (query, optional) - MIUR school code
 *                                                      (codice meccanografico),
 *                                                      max length 10
 * @param scuolaSupId        long (query, optional)   - school ID
 * @param scuolaMiurId       long (query, optional)   - MIUR school ID
 * @param fields             string (query, optional) - comma-separated list of
 *                                                      optional fields to include;
 *                                                      use ALL for all; supports
 *                                                      Ant Glob Patterns
 *                                                      (e.g. obj.*, obj.**)
 * @param order              string (query, optional) - sort order; prefix field
 *                                                      with + (ASC) or - (DESC);
 *                                                      multiple fields
 *                                                      comma-separated
 * @param start              int (query, optional)    - index of the first record
 *                                                      to load, defaults to 0
 * @param limit              int (query, optional)    - number of records to retrieve
 *                                                      starting from start, defaults
 *                                                      to 50, allowed range: 0–100
 * @return List<Istituto> paginated list of schools and institutes
 */
GET /istituti
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "scuolaSupId": 1337, // School ID
    "des": "Tesla", // School name
    "tipologiaCod": "TF", // School type code
    "tipologiaDes": "string", // School type description
    "via": "Via Magnanelli", // Street address
    "numeroCivico": "16", // Street number
    "cap": "40033", // Postal code
    "telefono": "1234567890", // Phone number
    "fax": "1234567890", // Fax number
    "localita": "string", // Locality
    "codMiur": "MOTD00102A", // MIUR code (codice meccanografico)
    "comuneId": 1379, // Municipality ID
    "comuneDes": "string", // Municipality name
    "comuneCod": "B880", // Municipality code
    "comuneSigla": "BO", // Municipality abbreviation
    "comuneCodIstat": "15881", // Municipality ISTAT code
    "comuneCap": "40033", // Municipality postal code
    "email": "string", // School email
    "codAteneo": "42", // University code
    "emailMinist": "string", // Ministry email
    "codUniverso": "1337", // Universe code
    "istRifId": 512, // Reference institute ID
    "nuovoIstId": 1024, // New institute ID (after merge)
    "tipiIstId": 1, // Institute type ID
    "tipiIstDes": "CORSO SERALE", // Institute type description
    "scuolaNonStatFlg": 0, // Non-state school flag (0=state, 1=non-state)
    "distretto": "34", // District code
    "aaIniVal": 2000, // Validity start academic year
    "aaFineVal": 2010, // Validity end academic year
    "idScuolaMiur": 12345, // MIUR school ID
    "webFlg": 1, // Web flag (0=no, 1=yes)
    "noAggiornaFlg": 0, // No update flag (0=updatable, 1=locked)
    "note": "string", // Notes
    "noteCronologia": "string", // Chronology notes (e.g. merge history)
    "sysFlg": 1, // System flag (0=no, 1=yes)
    "codScuola": "MOTD0872B", // School code
    "stataleFlg": 1, // State school flag (0=no, 1=yes)
    "codiceScuolaRiferimento": "string" // Reference school code
  }
]
```

<br>

---

<br>

### `GET /normativeHandicap` - Get disability regulations

```java
/**
 * Returns the list of regulations associated with disability declarations
 * configured in ESSE3.
 *
 * @param none
 * @return List<NormativaHandicap> list of disability regulations on success,
 *         DettaglioErrore on failure
 */
GET /normativeHandicap
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "handNormativaCod": "118/71", // Regulation code
    "des": "string", // Regulation description
    "webFlg": 1 // Web visibility flag (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

### `GET /rangeVotiMaturita` - Get high school diploma grade ranges

```java
/**
 * Returns the list of high school diploma grade ranges configured in ESSE3,
 * including minimum and maximum grades and honours flag per year range.
 *
 * @param none
 * @return List<RangeVotiMaturita> list of diploma grade ranges
 */
GET /rangeVotiMaturita
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "annoDa": 1999, // Valid from year
    "annoA": 2006, // Valid to year
    "votoMin": 60, // Minimum grade
    "votoMax": 100, // Maximum grade
    "lodeFlg": 0 // Honours flag (0=no, 1=yes)
  }
]
```

<br>

---

<br>

### `PUT /soggettiEsterni/{soggEstId}/consensi` - Update external subject consents

```java
/**
 * Updates the consent records of a specific external subject for a given
 * web process. Returns the full list of updated consents.
 *
 * @param soggEstId      int (path, required)    - external subject ID
 * @param procWebCod     string (query, required) - web process code
 * @param iso6392Cod     string (query, optional) - ISO 639-2 language code
 * @param body           array (body, required)   - list of consents to update,
 *                                                  each containing:
 *                                                  tipoConsensoCod (consent type),
 *                                                  consensoFlg (0=denied, 1=granted),
 *                                                  dataIni (effective date)
 * @return List<Consenso> list of all updated consents on success,
 *         DettaglioErrore on failure
 */
PUT /soggettiEsterni/{soggEstId}/consensi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Request body

```json
[
  {
    "tipoConsensoCod": "ESA_STREAMING", // Consent type code
    "consensoFlg": 1, // Consent flag (0=denied, 1=granted)
    "dataIni": "25-05-20" // Effective date
  }
]
```

#### Response

**`200 OK`** - Returns the full list of updated consents.

```json
[
  {
    "soggEstId": 11238, // External subject ID
    "tipiConsensoTipoConsensoCod": "INPS", // Consent type code
    "consensoFlg": 1, // Consent flag (0=denied, 1=granted)
    "des": "string", // Consent description
    "dataIni": "02-DIC-20", // Effective date
    "procAmmCod": "WREGAZI", // Administrative process code
    "visWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "vincFlg": 1, // Binding flag (0=no, 1=yes)
    "abilVisDocFlg": 1, // Document visibility enabled (0=no, 1=yes)
    "nota": "string", // Notes
    "etichetta": "string", // Label
    "p01SoggEstConsensiTipoConsensoCod": "INFO_679" // Internal consent type reference
  }
]
```

**`422 Unprocessable Entity`** - Update failed.

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

### `GET /tipiCotutela` - Get co-supervision types

```java
/**
 * Returns the list of co-supervision (cotutela) types configured in ESSE3.
 * Cotutela is a joint doctoral supervision agreement between two universities.
 * Supports RSQL filtering applied after data retrieval.
 *
 * @param filter string (query, optional) - RSQL filter expression applied
 *                                          post-retrieval on the result set;
 *                                          see ESSE3 REST docs for supported
 *                                          operators
 * @return List<TipoCotutela> list of co-supervision types on success,
 *         DettaglioErrore on failure
 */
GET /tipiCotutela
```

**Auth:** `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` · `DOCENTE` · `SOGG_EST` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoCotutelaCod": "I", // Co-supervision type code
    "des": "Ingresso", // Description
    "sysFlg": 1 // System flag (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

### `GET /tipiIstituto` - Get high school types

```java
/**
 * Returns the list of high school and upper secondary institute types
 * configured in ESSE3.
 *
 * @param none
 * @return List<TipoIstituto> list of institute types
 */
GET /tipiIstituto
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipologiaCod": "TF", // Institute type code
    "des": "string", // Institute type description
    "sysFlg": 1, // System flag (0=no, 1=yes)
    "almaCod": 7, // AlmaOrientati code
    "tipoScuolaMiurCod": "TF" // MIUR school type code
  }
]
```

<br>

---

<br>

### `GET /tipiTitoliScuolaSup` - Get high school diploma types

```java
/**
 * Returns the list of high school diploma types configured in ESSE3,
 * including MIUR codes, AlmaOrientati codes, and classification data.
 * Supports filtering by type code, field selection, ordering, and pagination.
 *
 * @param tipologiaTitoloCod string (query, optional) - diploma type category code,
 *                                                      max length 10
 * @param tipoTitoloCod      string (query, optional) - MIUR diploma type code,
 *                                                      max length 10
 * @param fields             string (query, optional) - comma-separated list of
 *                                                      optional fields to include;
 *                                                      use ALL for all; supports
 *                                                      Ant Glob Patterns
 *                                                      (e.g. obj.*, obj.**)
 * @param order              string (query, optional) - sort order; prefix field
 *                                                      with + (ASC) or - (DESC);
 *                                                      multiple fields
 *                                                      comma-separated
 * @param start              int (query, optional)    - index of the first record
 *                                                      to load, defaults to 0
 * @param limit              int (query, optional)    - number of records to retrieve
 *                                                      starting from start, defaults
 *                                                      to 50, allowed range: 0–100
 * @return List<TipoTitoloScuolaSup> paginated list of high school diploma types
 */
GET /tipiTitoliScuolaSup
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoTitoloCod": "34", // MIUR diploma type code
    "tipologiaCod": "TF", // Diploma type category code
    "des": "string", // Description
    "sysFlg": 1, // System flag (0=no, 1=yes)
    "idDiploma": 319, // Diploma ID
    "almaCod": 7, // AlmaOrientati code
    "annoIntFlg": 0, // International year flag (0=no, 1=yes)
    "abilVisFlg": 1, // Visibility enabled flag (0=no, 1=yes)
    "miurDes": "string", // MIUR description
    "tipoScuolaCod": "99", // School type code
    "idTipoIst": 13, // Institute type ID
    "descTipo": "string", // Institute type description
    "idMacroTipo": 5, // Macro type ID
    "descMacroTipo": "string", // Macro type description
    "desEng": "string" // English description
  }
]
```

<br>

---

<br>

### `GET /tipiTitoliStranieri` - Get foreign degree types

```java
/**
 * Returns the list of foreign degree types configured in ESSE3,
 * filterable by education level (university or high school).
 * Supports field selection, ordering, and pagination.
 *
 * @param livelloCod string (query, optional) - education level filter,
 *                                              max length 10;
 *                                              U=university level,
 *                                              S=high school level
 * @param fields     string (query, optional) - comma-separated list of
 *                                              optional fields to include;
 *                                              use ALL for all; supports
 *                                              Ant Glob Patterns
 *                                              (e.g. obj.*, obj.**)
 * @param order      string (query, optional) - sort order; prefix field
 *                                              with + (ASC) or - (DESC);
 *                                              multiple fields
 *                                              comma-separated
 * @param start      int (query, optional)    - index of the first record
 *                                              to load, defaults to 0
 * @param limit      int (query, optional)    - number of records to retrieve
 *                                              starting from start, defaults
 *                                              to 50, allowed range: 0–100
 * @return List<TipoTitoloStraniero> paginated list of foreign degree types
 */
GET /tipiTitoliStranieri
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoTitst_cod": "BSC", // Foreign degree type code
    "des": "Bachelor of Science", // Description
    "livelloCod": "U", // Level: U=university, S=high school
    "sysFlg": 1, // System flag (0=no, 1=yes)
    "visTrovacvFlg": 1, // TrovaCV visibility flag (0=no, 1=yes)
    "extCod": "BA" // External code
  }
]
```

<br>

---

<br>

### `GET /tipologieDichiarazioneValoreTitoloStraniero` - Get foreign degree value declaration types

```java
/**
 * Returns the list of declaration types for foreign degree value assessment
 * configured in ESSE3 (e.g. CIMEA attestations, equivalence declarations).
 * Supports field selection, ordering, and pagination.
 *
 * @param fields string (query, optional) - comma-separated list of optional
 *                                          fields to include; use ALL for all;
 *                                          supports Ant Glob Patterns
 *                                          (e.g. obj.*, obj.**)
 * @param order  string (query, optional) - sort order; prefix field with +
 *                                          (ASC) or - (DESC); multiple fields
 *                                          comma-separated
 * @param start  int (query, optional)    - index of the first record to load,
 *                                          defaults to 0
 * @param limit  int (query, optional)    - number of records to retrieve
 *                                          starting from start, defaults to 50,
 *                                          allowed range: 0–100
 * @return List<TipologiaDichiarazioneValoreTitoloStraniero> paginated list of
 *         foreign degree value declaration types
 */
GET /tipologieDichiarazioneValoreTitoloStraniero
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoDicValCod": "CIMEA", // Declaration type code
    "des": "Attestato CIMEA" // Description
  }
]
```

<br>

---

<br>

### `GET /tipologieHandicap` - Get disability types

```java
/**
 * Returns the list of disability types configured in ESSE3.
 * When called with DOCENTE auth, the docenteId parameter is required
 * to scope the response to that specific teaching staff member.
 *
 * @param docenteId long (query, optional) - unique teaching staff account ID;
 *                                           required when authenticating as DOCENTE
 * @return List<TipologiaHandicap> list of disability types on success,
 *         DettaglioErrore on failure
 */
GET /tipologieHandicap
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoHandicap": "H", // Disability type code
    "des": "Handicap", // Description
    "disabilPercFlg": 1, // Disability percentage required flag (0=no, 1=yes)
    "disabilitaFlg": 0, // Disability flag (0=no, 1=yes)
    "flg104": 0, // Law 104/92 flag (0=no, 1=yes)
    "ordWeb": 2 // Web display order
  }
]
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

### `GET /tipologieHandicapDaValutare` - Get disability types with pending declarations

```java
/**
 * Returns the list of disability types for which there are declarations
 * pending evaluation in ESSE3. Subset of /tipologieHandicap filtered to
 * types with at least one declaration awaiting review.
 * When called with DOCENTE auth, the docenteId parameter is required
 * to scope the response to that specific teaching staff member.
 *
 * @param docenteId long (query, optional) - unique teaching staff account ID;
 *                                           required when authenticating as DOCENTE
 * @return List<TipologiaHandicap> list of disability types with pending
 *         declarations on success, DettaglioErrore on failure
 */
GET /tipologieHandicapDaValutare
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoHandicap": "H", // Disability type code
    "des": "Handicap", // Description
    "disabilPercFlg": 1, // Disability percentage required flag (0=no, 1=yes)
    "disabilitaFlg": 0, // Disability flag (0=no, 1=yes)
    "flg104": 0, // Law 104/92 flag (0=no, 1=yes)
    "ordWeb": 2 // Web display order
  }
]
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

### `GET /tipologieParentele` - Get kinship types

```java
/**
 * Returns the list of kinship types configured in ESSE3,
 * used to classify family relationships in student registry records
 * (e.g. for income declarations and ISEE calculations).
 *
 * @param none
 * @return List<TipologiaParentela> list of kinship types on success,
 *         DettaglioErrore on failure
 */
GET /tipologieParentele
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoParCod": "M", // Kinship type code
    "des": "Madre", // Description
    "sysFlg": 0, // System flag (0=no, 1=yes)
    "percPesoReddito": 100, // Income weight percentage
    "visWebFlg": 0 // Web visibility flag (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

## Endpoints - Banking Details (Dati Bancari)

### `GET /datiBancari/{persId}` - Get banking details

```java
/**
 * Returns the paginated list of banking details for a specific person,
 * including account info, IBAN, SWIFT, and payment/reimbursement types.
 *
 * @param persId long (path, required)    - person ID
 * @param start  int (query, optional)    - index of the first record to load,
 *                                          defaults to 0
 * @param limit  int (query, optional)    - number of records to retrieve
 *                                          starting from start, defaults to 50,
 *                                          allowed range: 0–100
 * @param order  string (query, optional) - sort order; prefix field with +
 *                                          (ASC) or - (DESC); multiple fields
 *                                          comma-separated
 * @return List<DatiBancari> paginated list of banking details on success,
 *         DettaglioErrore on failure
 */
GET /datiBancari/{persId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Person ID
    "tipoDatiBancaCod": "RIMB", // Banking data type code
    "tipiDatiBancaDes": "Rimborso", // Banking data type description
    "tipoRimbPagCod": "MAV", // Reimbursement/payment type code
    "tipiRimbPagDes": "Posta diretto", // Reimbursement/payment type description
    "bancaDes": "credito agricolo", // Bank name
    "ccIntestatario": "42798", // Account holder name
    "ccIntestatarioCf": "string", // Account holder tax code
    "ibanCod": "IT60X0542111101000000123456", // IBAN code
    "numConto": "42798", // Account number
    "nazioneId": 1, // Country ID
    "naziCod": "200", // Country code
    "naziDes": "ITALIA", // Country name
    "naziCodFis": "Z123", // Country tax code
    "swiftCod": "BLOPIT22" // SWIFT/BIC code
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

## Endpoints - Teaching Staff (Docenti)

::: danger DEPRECATED
All endpoints in this group are deprecated since ESSE3 `23.05.02.00` and will be **removed on 30/06/2026**.
Use the equivalent endpoints on **`/docenti-service-v1`** instead.
:::

### ~~`GET /docenti/{docenteId}` - Get teaching staff member by ID~~

```java
/**
 * @deprecated Since 23.05.02.00. Use GET /docenti/{docenteId} on docenti-service-v1.
 *             Will be removed on 30/06/2026.
 *
 * Returns the registry data of a specific teaching staff member, including
 * optional fields for office hours, appointments, notes, contacts, aliases
 * and profiles.
 *
 * @param docenteId      long (path, required)    - teaching staff member ID
 * @param fields         string (query, optional) - comma-separated list of optional
 *                                                  fields to include; use ALL for all;
 *                                                  supports Ant Glob Patterns
 *                                                  (e.g. obj.*, obj.**)
 *                                                  optional: orario, cariche,
 *                                                  docentiNote, docentiRecapiti,
 *                                                  docentiAlias, docentiProfili
 * @param optionalFields string (query, optional) - alias for fields, same behavior
 * @return DocentiNew the teaching staff member data
 */
GET /docenti/{docenteId}
```

**Auth:** `UserTecnicoMassivo` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "docenteId": 1, // Teaching staff member ID (primary key)
    "docenteMatricola": "MAT1234", // Staff registration number
    "docenteCognome": "ROSSI", // Last name
    "docenteNome": "PAOLO", // First name
    "userId": "userID", // User ID
    "settCod": "MAT/01", // Academic sector code (SSD)
    "badge": "B90887", // Badge number
    "eMail": "string", // Personal email
    "emailAte": "string", // University email
    "emailDocenteLa": "string", // LA university email
    "facId": 1, // Faculty ID
    "facCod": "facCod", // Faculty code
    "facDes": "facDes", // Faculty description
    "ruoloDocCod": "ORD", // Teaching role code
    "codFis": "string", // Tax code
    "cellulare": "string", // Mobile number
    "hyperlink": "string", // Personal website URL
    "dataIniAtt": "15/10/2015", // Activity start date DD/MM/YYYY
    "dataFinAtt": "15/10/2015", // Activity end date DD/MM/YYYY
    "sesso": "F,M", // Gender
    "dataNascita": "15/10/1970", // Date of birth DD/MM/YYYY
    "p01NaziCodFisc": "Z112", // Birth country tax code
    "p01NaziDes": "Francia", // Birth country name
    "p01NaziNazioneCod": "FR", // Birth country ISO code
    "p01NaziCod": "215", // Birth country code
    "p01ComuComuneId": 1, // Birth municipality ID
    "p01ComuCodIstat": "698", // Birth municipality ISTAT code
    "p01ComuComuneCod": "L219", // Birth municipality code
    "comuNascDes": "Milano", // Birth municipality name
    "citstraNasc": "Paris", // Foreign birth city
    "comuNascSigla": "BO", // Birth municipality abbreviation
    "p01ProvDes": "Bologna", // Birth province description
    "notePubblicazioni": "string", // Publications notes
    "noteBiografiche": "string", // Biographical notes
    "noteCurriculum": "string", // Curriculum notes
    "noteDocente": "string", // Staff notes
    "idAb": 1, // AB ID
    "dataModDoc": "15/10/1970", // Document modification date DD/MM/YYYY
    "dataMod": "15/10/1970", // Last modified date DD/MM/YYYY
    "dataIns": "15/10/1970", // Insert date DD/MM/YYYY
    "settDes": "string", // Academic sector description
    "dipId": 123, // Department ID
    "dipCod": "A234", // Department code
    "dipDes": "string", // Department description
    "ruoloDocDes": "Ricercatore", // Teaching role description
    "profilo": "0", // Profile
    "docenteAppellativo": "Professor", // Title/appellative
    "dataIniRuolo": "15/10/1970", // Role start date DD/MM/YYYY
    "orario": [
      /* ... */
    ], // Office hours (optional - use fields=orario)
    "cariche": [
      /* ... */
    ], // Appointments (optional - use fields=cariche)
    "docentiNote": [
      /* ... */
    ], // Notes (optional - use fields=docentiNote)
    "docentiRecapiti": [
      /* ... */
    ], // Contacts (optional - use fields=docentiRecapiti)
    "docentiAlias": [
      /* ... */
    ], // Aliases (optional - use fields=docentiAlias)
    "docentiProfili": [
      /* ... */
    ] // Profiles (optional - use fields=docentiProfili)
  }
]
```

<br>

---

<br>

## Endpoints - Compensatory Measures (Misure Compensative)

### `GET /misureCompensative` - Get compensatory measures

```java
/**
 * Returns the list of compensatory measures configured in ESSE3.
 * Compensatory measures are support tools granted to students with
 * disabilities or learning disorders (e.g. extra time, assistive
 * technologies, alternative formats).
 * This is a public endpoint - no authentication required.
 *
 * @param tipoHandicap string (query, optional) - disability type code,
 *                                                max length 1
 * @return List<MisuraCompensativa> list of compensatory measures on success,
 *         DettaglioErrore on failure
 */
GET /misureCompensative
```

**Auth:** `ALL` - public endpoint, no authentication required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "misuraCompensativaCod": "1", // Compensatory measure code
    "des": "Trasporto", // Description
    "nota": "string", // Notes
    "visWebFlg": 0, // Web visibility flag (0=no, 1=yes)
    "desLiberaFlg": 1 // Free description allowed flag (0=no, 1=yes)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

## Endpoints - Persons (Persone)

### `GET /persone` - Get persons

```java
/**
 * Returns the paginated list of person registry records. Supports filtering
 * by last name, first name, tax code, person ID, modification date, and
 * U-Gov ID. Optional nested objects (consents, addresses, banking details,
 * identity documents, disability declarations, residence permits, etc.)
 * can be requested via the optionalFields parameter.
 *
 * @param cognome        string (query, optional) - last name filter; use * for
 *                                                  LIKE search (e.g. Ros*)
 * @param nome           string (query, optional) - first name filter; use * for
 *                                                  LIKE search
 * @param codFis         string (query, optional) - tax code filter
 * @param daDataMod      string (query, optional) - last modified date filter;
 *                                                  returns records modified after
 *                                                  this date
 * @param daOraMod       string (query, optional) - last modified time filter
 *                                                  HH:MI:SS, used with daDataMod;
 *                                                  seconds default to 00 if omitted
 * @param persId         long (query, optional)   - person ID filter
 * @param identificativoUGov string (query, optional) - U-Gov ID for retrieving
 *                                                      responsible person data
 * @param optionalFields string (query, optional) - comma-separated list of optional
 *                                                  nested objects to include;
 *                                                  use ALL for all; supports
 *                                                  Ant Glob Patterns (e.g. obj.*);
 *                                                  available: anaperCodExt,
 *                                                  anaperStorico, anaperConsensi,
 *                                                  anaperContatti, datiBancari,
 *                                                  docPers, dicHand, permSog,
 *                                                  indirizzi, autorizzati,
 *                                                  autorizzazioni, tutori,
 *                                                  matur, titIt, titStra,
 *                                                  profiliEsterni, aliasAnagrafica
 * @param start          int (query, optional)    - index of the first record to
 *                                                  load, defaults to 0
 * @param limit          int (query, optional)    - number of records to retrieve
 *                                                  starting from start, defaults
 *                                                  to 50, allowed range: 0–100
 * @param order          string (query, optional) - sort order; prefix field with
 *                                                  + (ASC) or - (DESC); multiple
 *                                                  fields comma-separated
 * @return List<PersonaAnagComuni> paginated list of person registry records
 *         on success, DettaglioErrore on failure
 */
GET /persone
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent` - low-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Person ID (primary key)
    "idAb": 1, // AB ID
    "persCod": "ABC123", // Person code
    "cognome": "Rossi", // Last name
    "nome": "Mario", // First name
    "patronimico": "Luigi", // Patronymic
    "dataNascita": "10/10/2007", // Date of birth DD/MM/YYYY
    "comuNascId": 1, // Birth municipality ID
    "comuNascCod": "A123", // Birth municipality code
    "comuNascCodCatastale": "A944", // Birth municipality cadastral code
    "comuNascCodIstatMiur": "B456", // Birth municipality ISTAT/MIUR code
    "comuNascDes": "string", // Birth municipality name
    "naziNascId": 1, // Birth country ID
    "naziNascCod": "Z115", // Birth country code
    "citstraNasc": "New York", // Foreign birth city
    "comuNascSigla": "BO", // Birth municipality abbreviation
    "provNascDes": "Bologna", // Birth province description
    "naziNascNazioneCod": "IT", // Birth country ISO code
    "naziNascDes": "ITALIA", // Birth country name
    "naziNascCodInt": "200", // Birth country international code
    "codFis": "string", // Tax code
    "contrCfCod": 1, // Tax code check code
    "sesso": "F", // Gender (F/M)
    "userId": "auserid", // User ID
    "fotoId": 1, // Photo attachment ID
    "naziResCod": "z999", // Residence country code
    "naziResDes": "Italia", // Residence country name
    "comuResCod": "084001", // Residence municipality code
    "comuResDes": "Bologna", // Residence municipality name
    "comuResSigla": "BO", // Residence municipality abbreviation
    "viaRes": "via Marconi", // Residence street
    "numCivRes": "33b", // Residence street number
    "capRes": "40133", // Residence postal code
    "telRes": "1792804", // Residence phone number
    "naziDomCod": "z999", // Domicile country code
    "naziDomDes": "Italia", // Domicile country name
    "comuDomCod": "084001", // Domicile municipality code
    "comuDomDes": "Bologna", // Domicile municipality name
    "comuDomSigla": "BO", // Domicile municipality abbreviation
    "viaDom": "via Marconi", // Domicile street
    "numCivDom": "33b", // Domicile street number
    "capDom": "40133", // Domicile postal code
    "telDom": "1792804", // Domicile phone number
    "email": "string", // Personal email
    "emailAte": "string", // University email
    "dataIns": "10/10/2016", // Insert date DD/MM/YYYY
    "dataMod": "10/10/2016", // Last modified date DD/MM/YYYY
    "codCittadinanza": "string", // Citizenship code
    "desCittadinanza": "string", // Citizenship description
    "cellulare": "string", // Mobile number
    "permsogScadutoFlg": 1, // Expired residence permit flag (0=no, 1=yes)
    "presenzaPermSogFlg": 1, // Has residence permit flag (0=no, 1=yes)
    "permsogDataScad": "10/10/2016", // Residence permit expiry date DD/MM/YYYY
    "certificatoFlg": 0, // Certified flag (0=no, 1=yes)
    "cfCertificatoFlg": 0, // Certified tax code flag (0=no, 1=yes)
    "naziResId": 100, // Residence country ID
    "naziResNazioneCod": "ITA", // Residence country ISO code
    "naziResCodInt": "200", // Residence country international code
    "comuResId": 123, // Residence municipality ID
    "comuResCodCatastale": "H501", // Residence municipality cadastral code
    "comuResCodIstatMiur": "058091", // Residence municipality ISTAT/MIUR code
    "provResDes": "Roma", // Residence province description
    "citstraRes": "Parigi", // Foreign residence city
    "frazRes": "Fiumicino", // Residence hamlet/fraction
    "prefixInternazRes": "123", // Residence international dialling prefix
    "dataIniValRes": "01/01/2000", // Residence validity start date DD/MM/YYYY
    "domComeResFlg": 1, // Domicile same as residence (0=no, 1=yes)
    "naziDomId": 100, // Domicile country ID
    "naziDomNazioneCod": "ITA", // Domicile country ISO code
    "naziDomCodInt": "200", // Domicile country international code
    "comuDomId": 300, // Domicile municipality ID
    "comuDomCodCatastale": "A001", // Domicile municipality cadastral code
    "comuDomCodIstatMiur": "513", // Domicile municipality ISTAT/MIUR code
    "citstraDom": "Parigi", // Foreign domicile city
    "frazDom": "Zona 1", // Domicile hamlet/fraction
    "prefixInternazDom": "123", // Domicile international dialling prefix
    "cO": "Presso 1", // Care of
    "dataIniValDom": "15/10/2000", // Domicile validity start date DD/MM/YYYY
    "tipoIndirizCod": "Domicilio", // Address type code
    "recapitoTasse": "R", // Tax contact preference
    "recapitoBadge": "R", // Badge contact preference
    "fax": "1760109", // Fax number
    "emailCertificata": "string", // Certified email (PEC)
    "citt1NazioneCod": "ITA", // Primary citizenship ISO code
    "citt1Dataini": "15/10/2000", // Primary citizenship start date DD/MM/YYYY
    "citt1Datafin": "15/10/2020", // Primary citizenship end date DD/MM/YYYY
    "citt2Cod": "DEU", // Secondary citizenship code
    "citt2Des": "Tedesca", // Secondary citizenship description
    "citt2NazioneCod": "DEU", // Secondary citizenship ISO code
    "citt2Dataini": "15/10/2020", // Secondary citizenship start date DD/MM/YYYY
    "citt2Datafin": "15/10/2025", // Secondary citizenship end date DD/MM/YYYY
    "citt3Cod": "FRA", // Tertiary citizenship code
    "citt3Des": "Francese", // Tertiary citizenship description
    "citt3NazioneCod": "FRA", // Tertiary citizenship ISO code
    "citt3Dataini": "15/10/2015", // Tertiary citizenship start date DD/MM/YYYY
    "citt3Datafin": "15/10/2024", // Tertiary citizenship end date DD/MM/YYYY
    "naziCittadCodInt": "39", // Citizenship country international code
    "naziCittadDes": "ITALIA", // Citizenship country name
    "prefixCell": "39", // Mobile international dialling prefix
    "consDpFlg": 1, // Data protection consent (0=no, 1=yes)
    "consDiffDpFlg": 1, // DP diffusion consent (0=no, 1=yes)
    "consSmsFlg": 1, // SMS consent (0=no, 1=yes)
    "consComunicDpFlg": 1, // DP communication consent (0=no, 1=yes)
    "consComunicErFlg": 1, // ER communication consent (0=no, 1=yes)
    "religiosoFlg": 1, // Religious flag (0=no, 1=yes)
    "decedutoFlg": 0, // Deceased flag (0=no, 1=yes)
    "extPersCod": "EXT12345", // External person code
    "notaPers": "string", // Person notes
    "professione": "Ingegnere", // Profession
    "statoCivileCod": "S", // Civil status code
    "statoCivileDes": "Separato", // Civil status description
    "emergNome": "Giovanni", // Emergency contact first name
    "emergCognome": "Bianchi", // Emergency contact last name
    "emergTel": "3331234567", // Emergency contact phone
    "emergPrefixInternaz": "39", // Emergency contact dialling prefix
    "emergEmail": "string", // Emergency contact email
    "emergRapporto": "Coniuge", // Emergency contact relationship

    // Optional nested objects - request via optionalFields parameter
    "anaperCodExt": [
      /* ... */
    ], // External codes (optionalFields=anaperCodExt)
    "anaperStorico": [
      /* ... */
    ], // Registry history (optionalFields=anaperStorico)
    "anaperConsensi": [
      /* ... */
    ], // Consents (optionalFields=anaperConsensi)
    "anaperContatti": [
      /* ... */
    ], // Contacts (optionalFields=anaperContatti)
    "datiBancari": [
      /* ... */
    ], // Banking details (optionalFields=datiBancari)
    "docPers": [
      /* ... */
    ], // Identity documents (optionalFields=docPers)
    "dicHand": [
      /* ... */
    ], // Disability declarations (optionalFields=dicHand)
    "permSog": [
      /* ... */
    ], // Residence permits (optionalFields=permSog)
    "indirizzi": [
      /* ... */
    ], // Addresses (optionalFields=indirizzi)
    "autorizzati": [
      /* ... */
    ], // Authorized persons (optionalFields=autorizzati)
    "autorizzazioni": [
      /* ... */
    ], // Authorizations (optionalFields=autorizzazioni)
    "tutori": [
      /* ... */
    ], // Guardians (optionalFields=tutori)
    "matur": [
      /* ... */
    ], // Diploma records (optionalFields=matur)
    "titIt": [
      /* ... */
    ], // Italian degrees (optionalFields=titIt)
    "titStra": [
      /* ... */
    ], // Foreign degrees (optionalFields=titStra)
    "profiliEsterni": [
      /* ... */
    ], // External profiles (optionalFields=profiliEsterni)
    "aliasAnagrafica": [
      /* ... */
    ] // Registry aliases (optionalFields=aliasAnagrafica)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `GET /persone-gdpr` - Get persons with GDPR-sensitive data

```java
/**
 * Returns the paginated list of person registry records including
 * confidential/sensitive personal data (PersonaGdpr model).
 * Technical users must be explicitly enabled by the university
 * administration to access this endpoint.
 * Unlike GET /persone, this endpoint does not support optional nested
 * objects - all available fields are returned in a flat structure.
 *
 * @param cognome    string (query, optional) - last name filter; use * for
 *                                              LIKE search (e.g. Ros*)
 * @param nome       string (query, optional) - first name filter; use * for
 *                                              LIKE search
 * @param codFis     string (query, optional) - tax code filter
 * @param daDataMod  string (query, optional) - last modified date filter;
 *                                              returns records modified after
 *                                              this date
 * @param daOraMod   string (query, optional) - last modified time filter
 *                                              HH:MI:SS, used with daDataMod;
 *                                              seconds default to 00 if omitted
 * @param start      int (query, optional)    - index of the first record to
 *                                              load, defaults to 0
 * @param limit      int (query, optional)    - number of records to retrieve
 *                                              starting from start, defaults
 *                                              to 50, allowed range: 0–100
 * @param order      string (query, optional) - sort order; prefix field with
 *                                              + (ASC) or - (DESC); multiple
 *                                              fields comma-separated
 * @return List<PersonaGdpr> paginated list of person records including
 *         sensitive data on success, DettaglioErrore on failure
 */
GET /persone-gdpr
```

**Auth:** `UTENTE_TECNICO` (must be enabled by university administration) · `STUDENTE` · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent` - low-frequency resource, HTTP cache enabled, server cache disabled

::: warning GDPR
This endpoint returns sensitive personal data. `UTENTE_TECNICO` access must be explicitly granted by the university administration. Handle all returned data in compliance with GDPR regulations.
:::

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Person ID (primary key)
    "idAb": 1, // AB ID
    "persCod": "ABC123", // Person code
    "cognome": "Rossi", // Last name
    "nome": "Mario", // First name
    "patronimico": "Luigi", // Patronymic
    "nomeAlias": "nome", // Alias name (GDPR field)
    "dataNascita": "10/10/2007", // Date of birth DD/MM/YYYY
    "comuNascId": 1, // Birth municipality ID
    "comuNascCod": "A123", // Birth municipality code
    "comuNascCodCatastale": "A944", // Birth municipality cadastral code
    "comuNascCodIstatMiur": "B456", // Birth municipality ISTAT/MIUR code
    "comuNascDes": "string", // Birth municipality name
    "naziNascId": 1, // Birth country ID
    "naziNascCod": "Z115", // Birth country code
    "citstraNasc": "New York", // Foreign birth city
    "comuNascSigla": "BO", // Birth municipality abbreviation
    "provNascDes": "Bologna", // Birth province description
    "naziNascNazioneCod": "IT", // Birth country ISO code
    "naziNascDes": "ITALIA", // Birth country name
    "naziNascCodInt": "200", // Birth country international code
    "codFis": "string", // Tax code
    "contrCfCod": 1, // Tax code check code
    "sesso": "F", // Gender (F/M)
    "userId": "auserid", // User ID
    "fotoId": 1, // Photo attachment ID
    "naziResCod": "z999", // Residence country code
    "naziResDes": "Italia", // Residence country name
    "comuResCod": "084001", // Residence municipality code
    "comuResDes": "Bologna", // Residence municipality name
    "comuResSigla": "BO", // Residence municipality abbreviation
    "viaRes": "via Marconi", // Residence street
    "numCivRes": "33b", // Residence street number
    "capRes": "40133", // Residence postal code
    "telRes": "1792804", // Residence phone number
    "naziDomCod": "z999", // Domicile country code
    "naziDomDes": "Italia", // Domicile country name
    "comuDomCod": "084001", // Domicile municipality code
    "comuDomDes": "Bologna", // Domicile municipality name
    "comuDomSigla": "BO", // Domicile municipality abbreviation
    "viaDom": "via Marconi", // Domicile street
    "numCivDom": "33b", // Domicile street number
    "capDom": "40133", // Domicile postal code
    "telDom": "1792804", // Domicile phone number
    "email": "string", // Personal email
    "emailAte": "string", // University email
    "dataIns": "10/10/2016", // Insert date DD/MM/YYYY
    "dataMod": "10/10/2016", // Last modified date DD/MM/YYYY
    "codCittadinanza": "string", // Citizenship code
    "desCittadinanza": "string", // Citizenship description
    "cellulare": "string", // Mobile number
    "permsogScadutoFlg": 1, // Expired residence permit flag (0=no, 1=yes)
    "presenzaPermSogFlg": 1, // Has residence permit flag (0=no, 1=yes)
    "permsogDataScad": "10/10/2016", // Residence permit expiry date DD/MM/YYYY
    "certificatoFlg": 0, // Certified flag (0=no, 1=yes)
    "cfCertificatoFlg": 0, // Certified tax code flag (0=no, 1=yes)
    "naziResId": 100, // Residence country ID
    "naziResNazioneCod": "ITA", // Residence country ISO code
    "naziResCodInt": "200", // Residence country international code
    "comuResId": 123, // Residence municipality ID
    "comuResCodCatastale": "H501", // Residence municipality cadastral code
    "comuResCodIstatMiur": "058091", // Residence municipality ISTAT/MIUR code
    "provResDes": "Roma", // Residence province description
    "citstraRes": "Parigi", // Foreign residence city
    "frazRes": "Fiumicino", // Residence hamlet/fraction
    "prefixInternazRes": "123", // Residence international dialling prefix
    "dataIniValRes": "01/01/2000", // Residence validity start date DD/MM/YYYY
    "domComeResFlg": 1, // Domicile same as residence (0=no, 1=yes)
    "naziDomId": 100, // Domicile country ID
    "naziDomNazioneCod": "ITA", // Domicile country ISO code
    "naziDomCodInt": "200", // Domicile country international code
    "comuDomId": 300, // Domicile municipality ID
    "comuDomCodCatastale": "A001", // Domicile municipality cadastral code
    "comuDomCodIstatMiur": "513", // Domicile municipality ISTAT/MIUR code
    "citstraDom": "Parigi", // Foreign domicile city
    "frazDom": "Zona 1", // Domicile hamlet/fraction
    "prefixInternazDom": "123", // Domicile international dialling prefix
    "cO": "Presso 1", // Care of
    "dataIniValDom": "15/10/2000", // Domicile validity start date DD/MM/YYYY
    "tipoIndirizCod": "Domicilio", // Address type code
    "recapitoTasse": "R", // Tax contact preference
    "recapitoBadge": "R", // Badge contact preference
    "fax": "1760109", // Fax number
    "emailCertificata": "string", // Certified email (PEC)
    "citt1NazioneCod": "ITA", // Primary citizenship ISO code
    "citt1Dataini": "15/10/2000", // Primary citizenship start date DD/MM/YYYY
    "citt1Datafin": "15/10/2020", // Primary citizenship end date DD/MM/YYYY
    "citt2Cod": "DEU", // Secondary citizenship code
    "citt2Des": "Tedesca", // Secondary citizenship description
    "citt2NazioneCod": "DEU", // Secondary citizenship ISO code
    "citt2Dataini": "15/10/2020", // Secondary citizenship start date DD/MM/YYYY
    "citt2Datafin": "15/10/2025", // Secondary citizenship end date DD/MM/YYYY
    "citt3Cod": "FRA", // Tertiary citizenship code
    "citt3Des": "Francese", // Tertiary citizenship description
    "citt3NazioneCod": "FRA", // Tertiary citizenship ISO code
    "citt3Dataini": "15/10/2015", // Tertiary citizenship start date DD/MM/YYYY
    "citt3Datafin": "15/10/2024", // Tertiary citizenship end date DD/MM/YYYY
    "naziCittadCodInt": "39", // Citizenship country international code
    "naziCittadDes": "ITALIA", // Citizenship country name
    "prefixCell": "39", // Mobile international dialling prefix
    "consDpFlg": 1, // Data protection consent (0=no, 1=yes)
    "consDiffDpFlg": 1, // DP diffusion consent (0=no, 1=yes)
    "consSmsFlg": 1, // SMS consent (0=no, 1=yes)
    "consComunicDpFlg": 1, // DP communication consent (0=no, 1=yes)
    "consComunicErFlg": 1, // ER communication consent (0=no, 1=yes)
    "religiosoFlg": 1, // Religious flag (0=no, 1=yes)
    "decedutoFlg": 0, // Deceased flag (0=no, 1=yes)
    "extPersCod": "EXT12345", // External person code
    "notaPers": "string", // Person notes
    "professione": "Ingegnere", // Profession
    "statoCivileCod": "S", // Civil status code
    "statoCivileDes": "Separato", // Civil status description
    "emergNome": "Giovanni", // Emergency contact first name
    "emergCognome": "Bianchi", // Emergency contact last name
    "emergTel": "3331234567", // Emergency contact phone
    "emergPrefixInternaz": "39", // Emergency contact dialling prefix
    "emergEmail": "string", // Emergency contact email
    "emergRapporto": "Coniuge" // Emergency contact relationship
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `GET /persone-gdpr/{persId}` - Get single person with GDPR-sensitive data

```java
/**
 * Returns the full registry record of a specific person including
 * confidential/sensitive personal data (PersonaGdpr model).
 * Technical users must be explicitly enabled by the university
 * administration to access this endpoint.
 * When called with STUDENTE auth, only the student's own record
 * is accessible.
 *
 * @param persId long (path, required) - person ID
 * @return PersonaGdpr the person record including sensitive data
 */
GET /persone-gdpr/{persId}
```

**Auth:** `UTENTE_TECNICO` (must be enabled by university administration) · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning GDPR
This endpoint returns sensitive personal data. `UTENTE_TECNICO` access must be explicitly granted by the university administration. Handle all returned data in compliance with GDPR regulations.
:::

#### Response

**`200 OK`** - Returns a single `PersonaGdpr` object. The response structure is identical to `GET /persone-gdpr` but returns a single object instead of an array, with the addition of `nomeAlias`.

```json
{
  "persId": 1, // Person ID (primary key)
  "nomeAlias": "nome" // Alias name (GDPR field)
  // ... same fields as GET /persone-gdpr
}
```

> See [`GET /persone-gdpr`](#get-persone-gdpr----get-persons-with-gdpr-sensitive-data) for the full field list and descriptions.

<br>

---

<br>

### `PATCH /persone/{emailAte}/dismetti` - Deactivate institutional email address

```java
/**
 * Deactivates an institutional email address by resolving the associated
 * person ID from the email address, then internally invoking
 * PATCH /persone/{persId}/dismettiEmail.
 * Returns the updated person record on success.
 *
 * @param emailAte string (path, required) - institutional email address to deactivate
 * @return Persona the updated person record on success,
 *         DettaglioErrore on failure
 */
PATCH /persone/{emailAte}/dismetti
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Error                |
| `1`  | Execution successful |

#### Response

**`200 OK`** - Email deactivated. Returns the updated person record.

```json
{
  "persId": 1, // Person ID (primary key)
  "emailAte": null // Institutional email - now deactivated (set to null)
  // ... same fields as GET /persone
}
```

> See [`GET /persone`](#get-persone----get-persons) for the full field list and descriptions.

**`422 Unprocessable Entity`** - Deactivation failed.

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

### `GET /persone/{persId}` - Get single person

```java
/**
 * Returns the full registry record of a specific person identified by persId.
 * Does not include optional nested objects - use GET /persone with optionalFields
 * to retrieve consents, addresses, documents, and other nested data.
 * When called with STUDENTE auth, only the student's own record is accessible.
 *
 * @param persId long (path, required) - person ID
 * @return Persona the person registry record
 */
GET /persone/{persId}
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`** - Returns a single `Persona` object. The response structure is identical to `GET /persone` but returns a single object instead of an array, without optional nested objects.

```json
{
  "persId": 1 // Person ID (primary key)
  // ... same fields as GET /persone (flat fields only, no optional nested objects)
}
```

> See [`GET /persone`](#get-persone----get-persons) for the full field list and descriptions. Optional nested objects (`anaperConsensi`, `indirizzi`, `dicHand`, etc.) are not available on this endpoint - use `GET /persone` with `optionalFields` instead.

<br>

---

<br>

### `GET /persone/{persId}/autorizzati` - Get authorized persons linked to a registry record

```java
/**
 * Returns the list of authorized persons linked to a specific registry record
 * (e.g. parents, guardians, or other authorized contacts). Optionally includes
 * identity documents for each authorized person via the optionalFields parameter.
 *
 * @param persId         long (path, required)    - person ID
 * @param autorizzatoId  long (query, optional)   - filter by specific authorized
 *                                                  person ID
 * @param optionalFields string (query, optional) - optional fields to include;
 *                                                  use ALL or documentiIdentita
 *                                                  to include identity documents;
 *                                                  supports Ant Glob Patterns
 *                                                  (e.g. documentiIdentita.*)
 * @return List<Autorizzato> list of authorized persons on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/autorizzati
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 681309, // Person ID
    "autorizzatoId": 1, // Authorized person ID (primary key)
    "nome": "CARMEN", // First name
    "cognome": "ROSSI", // Last name
    "codFis": "string", // Tax code
    "sesso": "F", // Gender (F/M)
    "dataNascita": "01/01/1980", // Date of birth DD/MM/YYYY
    "comuneId": 1374, // Birth municipality ID
    "comuneDes": "Bologna", // Birth municipality name
    "tipoParCod": "M", // Kinship type code
    "tipoParDes": "Madre", // Kinship type description
    "contrCfCod": -1, // Tax code check code
    "certificatoFlg": 1, // Certified flag (0=no, 1=yes)
    "nazioneId": 1, // Country ID
    "nazioneDes": "ITALIA", // Country name
    "citstraNasc": "Madrid", // Foreign birth city
    "email": "string", // Email
    "emailCertificata": "string", // Certified email (PEC)
    "cellulare": "string", // Mobile number
    "autExtCod": "12345", // External authorized person code

    // Optional - request via optionalFields=documentiIdentita
    "documentiIdentita": [
      {
        "autDocPersId": 1, // Identity document ID (primary key)
        "autorizzatoId": 3, // Authorized person ID
        "docIdentTipoCod": "CI", // Document type: CI, PAT, PAS
        "docIdentTipoDes": "Carta Identità", // Document type description
        "num": "AX12345", // Document number
        "dataRilascio": "01/01/2000", // Issue date DD/MM/YYYY
        "dataScadenza": "01/07/2022", // Expiry date DD/MM/YYYY
        "enteRilascio": "Comune", // Issuing authority
        "statoDocPers": "P", // Document status code
        "nazioneEmissioneId": 43, // Issuing country ID
        "nazioneEmissioneCodFis": "Z132", // Issuing country tax code
        "nazioneEmissioneDes": "SVEZIA", // Issuing country name
        "comuneEmissioneId": 1, // Issuing municipality ID
        "comuneEmissioneCodFis": "A089", // Issuing municipality tax code
        "comuneEmissioneDes": "Agrigento", // Issuing municipality name
        "citstraEmissione": "Stoccolma" // Foreign issuing city
      }
    ]
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `GET /persone/{persId}/carriere/{stuId}` - Get student career

```java
/**
 * Returns the career record of a specific student, identified by both the
 * person ID and the career ID. Includes enrollment data, degree course info,
 * academic status, responsible person, tutor, and graduation waiting status.
 * When called with STUDENTE auth, only the student's own career is accessible.
 *
 * @param persId long (path, required) - person ID
 * @param stuId  long (path, required) - career ID (primary key)
 * @return Carriera the student career record
 */
GET /persone/{persId}/carriere/{stuId}
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own career only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "persId": 1, // Person ID
  "cognome": "Rossi", // Last name
  "nome": "Mario", // First name
  "dataNascita": "10/10/2007", // Date of birth DD/MM/YYYY
  "sesso": "F", // Gender (F/M)
  "userId": "auserid", // User ID
  "codFis": "string", // Tax code
  "email": "string", // Personal email
  "emailAte": "string", // University email
  "emailCertificata": "string", // Certified email (PEC)
  "staStuCod": "X", // Student status code
  "statiStuDes": "Cessata", // Student status description
  "motStastuCod": "TIT", // Student status reason code
  "motStastuDes": "Titolo", // Student status reason description
  "aaId": 2016, // Academic year ID
  "aaDes": "2016/2017", // Academic year description
  "aaIscrId": 2016, // Enrollment academic year ID
  "aaOrdId": 2016, // Curriculum academic year ID (primary key)
  "aaRegId": 2018, // Cohort academic year ID
  "aaImm1": 2016, // First enrollment academic year
  "dataImm": "10/10/2016", // Enrollment date DD/MM/YYYY
  "dataIscr": "10/10/2016", // Registration date DD/MM/YYYY
  "dataIns": "10/10/2016", // Insert date DD/MM/YYYY
  "dataMod": "10/10/2016", // Last modified date DD/MM/YYYY
  "dataChiusura": "15/01/2025", // Career closure date DD/MM/YYYY
  "dataFineCarriera": "15/01/2025", // Career end date DD/MM/YYYY
  "dataFineCarrieraCalcolata": "15/01/2025", // Calculated career end date DD/MM/YYYY
  "numProtocollo": "AT134B07", // Protocol number
  "matricola": "754657", // Student registration number
  "stuId": 1, // Career ID (primary key)
  "matId": 12345, // Career segment ID
  "iscrId": 1, // Enrollment ID (primary key)
  "cdsId": 12345, // Degree course ID (primary key)
  "pdsId": 3, // Study plan ID (primary key)
  "annoCorso": 3, // Current year of study
  "sedeId": 244, // Campus ID
  "sediDes": "Milano", // Campus description
  "facCod": "D66", // Faculty code
  "facDes": "string", // Faculty description
  "facCsaCod": "c10293", // Faculty CSA code
  "p06CdsCod": "LSG04", // Degree course code
  "p06CdsDes": "string", // Degree course description
  "tipoCorsoCod": "L2", // Course type code
  "tipoCorsoDes": "string", // Course type description
  "settCod": "L3A5", // Academic sector code (SSD)
  "settDes": "string", // Academic sector description
  "areaCod": "A5", // Area code
  "areaDes": "string", // Area description
  "areaCodStatMiur": "1304", // Area MIUR statistical code
  "sdrCod": "300", // SDR code
  "sdrDes": "string", // SDR description
  "sdrCsaCod": 393, // SDR CSA code
  "lingue": "Inglese", // Languages
  "domCtStato": "CHI", // CT application status code
  "statiDomCtDes": "Chiusa", // CT application status description
  "staMatCod": "S", // Registration status code
  "motStamatCod": "TRI", // Registration status reason code
  "tipoIscrCod": "IC", // Enrollment type code
  "ptFlg": 0, // Part-time flag (0=no, 1=yes)
  "sospFlg": 1, // Suspended flag (0=no, 1=yes)
  "attlauFlg": 1, // Graduation waiting flag (0=no, 1=yes)
  "dataAttlau": "20/04/2020", // Graduation waiting date DD/MM/YYYY
  "tipoCatAmmId": 994, // Admission category ID
  "tipoCatAmmDes": "Cadetti", // Admission category description
  "profstuCod": "DD", // Student profile code
  "profstuDes": "Double Degree", // Student profile description
  "idAb": 123123, // AB ID
  "extStuCod": "string", // External student code
  "archNum": 1234, // Archive number
  "archStr": "a1b2c3", // Archive string
  "codiceEsi": "string", // ESI code (European Student Identifier)
  "responsabile": {
    "respNome": "Gabriele", // Responsible person first name
    "respCognome": "D'Annunzio", // Responsible person last name
    "respCodFis": "string", // Responsible person tax code
    "respDataNascita": "01/01/1970", // Responsible person date of birth DD/MM/YYYY
    "respLuogoNascita": "Pescara", // Responsible person place of birth
    "respMatricola": "12356", // Responsible person registration number
    "respIdAb": "14456", // Responsible person AB ID
    "respDesCarica": "string" // Responsible person role description
  },
  "tutor": {
    "cognomeTutor": "Verdi", // Tutor last name
    "nomeTutor": "Luigi", // Tutor first name
    "docenteIdTutor": 4821, // Tutor teaching staff ID
    "soggEstIdTutor": 1864, // Tutor external subject ID
    "idAbTutor": 65255, // Tutor AB ID
    "matricolaTutor": "5823" // Tutor registration number
  }
}
```

<br>

---

<br>

### `PUT /persone/{persId}/cellulare` - Update mobile number

```java
/**
 * Updates the mobile phone number of a specific person.
 * When called with STUDENTE auth, only the student's own record
 * is accessible.
 *
 * @param persId    long (path, required)   - person ID
 * @param cellulare string (body, required) - new mobile number
 *                                            (include international prefix,
 *                                            e.g. +39 3207618212)
 * @return updated cellulare value on success, DettaglioErrore on failure
 */
PUT /persone/{persId}/cellulare
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Request body

```json
{
  "cellulare": "+39 3207618212" // New mobile number (include international prefix)
}
```

#### Response

**`200 OK`**

```json
{
  "cellulare": "+39 3207618212" // Updated mobile number
}
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `GET /persone/{persId}/consensi` - Get student consents

```java
/**
 * Returns the list of consents for a specific student, scoped to a given
 * web process. Optionally filterable by career ID and academic year.
 *
 * @param persId     long (path, required)    - person ID
 * @param procWebCod string (query, required) - web process code
 * @param iso6392Cod string (query, optional) - ISO 639-2 language code
 *                                              for descriptions
 * @param stuId      long (query, optional)   - career ID filter
 * @param aaId       long (query, optional)   - academic year ID filter
 * @return List<Consenso> list of consent records on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/consensi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 144065, // Person ID
    "tipiConsensoTipoConsensoCod": "ESA_STREAMING", // Consent type code
    "consensoFlg": 1, // Consent flag (0=denied, 1=granted)
    "des": "Esami in streaming", // Consent description
    "dataIni": "25-MAG-20", // Consent effective date
    "procAmmCod": "WCANDTIRO", // Administrative process code
    "visWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "vincFlg": 0, // Binding flag (0=no, 1=yes)
    "abilVisDocFlg": 1, // Document visibility enabled (0=no, 1=yes)
    "nota": "string", // Notes
    "etichetta": "string", // Label
    "p01AnaperConsensiTipoConsensoCod": "ESA_STREAMING" // Internal consent type reference
  }
]
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

### `PUT /persone/{persId}/consensi` - Update student consents

```java
/**
 * Updates the consent records of a specific student for a given web process.
 * Returns the full list of updated consents.
 *
 * @param persId     long (path, required)    - person ID
 * @param procWebCod string (query, required) - web process code
 * @param iso6392Cod string (query, optional) - ISO 639-2 language code
 *                                              for descriptions
 * @param stuId      long (query, optional)   - career ID filter
 * @param aaId       long (query, optional)   - academic year ID filter
 * @param body       array (body, required)   - list of consents to update,
 *                                              each containing:
 *                                              tipoConsensoCod (consent type),
 *                                              consensoFlg (0=denied, 1=granted),
 *                                              dataIni (effective date)
 * @return List<Consenso> list of all updated consents on success,
 *         DettaglioErrore on failure
 */
PUT /persone/{persId}/consensi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Request body

```json
[
  {
    "tipoConsensoCod": "ESA_STREAMING", // Consent type code
    "consensoFlg": 1, // Consent flag (0=denied, 1=granted)
    "dataIni": "25-05-20" // Effective date
  }
]
```

#### Response

**`200 OK`** - Returns the full list of updated consents.

```json
[
  {
    "persId": 144065, // Person ID
    "tipiConsensoTipoConsensoCod": "ESA_STREAMING", // Consent type code
    "consensoFlg": 1, // Consent flag (0=denied, 1=granted)
    "des": "Esami in streaming", // Consent description
    "dataIni": "25-MAG-20", // Consent effective date
    "procAmmCod": "WCANDTIRO", // Administrative process code
    "visWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "vincFlg": 0, // Binding flag (0=no, 1=yes)
    "abilVisDocFlg": 1, // Document visibility enabled (0=no, 1=yes)
    "nota": "string", // Notes
    "etichetta": "string", // Label
    "p01AnaperConsensiTipoConsensoCod": "ESA_STREAMING" // Internal consent type reference
  }
]
```

**`422 Unprocessable Entity`** - Update failed.

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

### `POST /persone/{persId}/dic-hand/{dicHandId}/misure-compensative-dicHand` - Insert compensatory measure for disability declaration

```java
/**
 * Inserts a new compensatory measure linked to a specific disability
 * declaration of a person. Returns the full updated compensatory measure
 * object on success.
 *
 * @param persId               long (path, required)    - person ID
 * @param dicHandId            long (path, required)    - disability declaration ID
 * @param tipoHandicap         string (query, optional) - disability type code,
 *                                                        max length 1
 * @param statoMisuraComp      string (body, required)  - compensatory measure
 *                                                        status code
 * @param misuraDataIni        string (body, required)  - measure start date
 *                                                        DD/MM/YYYY
 * @param misuraDataFine       string (body, optional)  - measure end date
 *                                                        DD/MM/YYYY
 * @param misuraCompensativaCod string (body, required) - compensatory measure code
 * @param desLiberaMisura      string (body, optional)  - free description of the
 *                                                        measure (required if
 *                                                        desLiberaFlg=1 for the
 *                                                        selected measure type)
 * @return 201 Created with updated measure data on success,
 *         DettaglioErrore on failure
 */
POST /persone/{persId}/dic-hand/{dicHandId}/misure-compensative-dicHand
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (linked to person) · `SOGG_EST` (linked to person) · Supported: `Basic`, `JWT`

**Cache:** none

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Request body

```json
{
  "statoMisuraComp": "X", // Compensatory measure status code
  "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
  "misuraDataFine": "10/10/2020", // Measure end date DD/MM/YYYY
  "misuraCompensativaCod": "1", // Compensatory measure code
  "desLiberaMisura": "string" // Free description (required if measure type allows it)
}
```

#### Response

**`201 Created`** - Compensatory measure successfully inserted.

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

### `PATCH /persone/{persId}/dismettiEmail` - Deactivate institutional email by person ID

```java
/**
 * Deactivates the institutional email address of a specific person.
 * If emailAte is provided, it is validated against the person's current
 * email - deactivation proceeds only if they match.
 * Unlike PATCH /persone/{emailAte}/dismetti, this endpoint targets the
 * person directly by ID rather than resolving them from the email address.
 *
 * @param persId   long (path, required)    - person ID
 * @param emailAte string (query, optional) - institutional email address to
 *                                            deactivate; if provided, must match
 *                                            the person's current email
 * @return Persona the updated person record on success,
 *         DettaglioErrore on failure
 */
PATCH /persone/{persId}/dismettiEmail
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Error                |
| `1`  | Execution successful |

#### Response

**`200 OK`** - Email deactivated. Returns the updated person record.

```json
{
  "persId": 1, // Person ID (primary key)
  "emailAte": null // Institutional email - now deactivated (set to null)
  // ... same fields as GET /persone
}
```

> See [`GET /persone`](#get-persone----get-persons) for the full field list and descriptions.

**`422 Unprocessable Entity`** - Deactivation failed.

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

### `PUT /persone/{persId}/email` - Update student personal email

```java
/**
 * Updates the personal email address of a specific student.
 * The email can also be set to null to clear it.
 *
 * @param persId long (path, required)    - person ID
 * @param email  string (query, optional) - new personal email address;
 *                                          omit or pass null to clear
 * @return Persona the updated person record on success,
 *         DettaglioErrore on failure
 */
PUT /persone/{persId}/email
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Response

**`200 OK`** - Email updated. Returns the updated person record.

```json
{
  "persId": 1, // Person ID (primary key)
  "email": "string" // Updated personal email (null if cleared)
  // ... same fields as GET /persone
}
```

> See [`GET /persone`](#get-persone----get-persons) for the full field list and descriptions.

**`422 Unprocessable Entity`** - Update failed.

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

### `PUT /persone/{persId}/emailAte` - Update student institutional email

```java
/**
 * Updates the institutional email address of a specific student.
 * Cannot be set to null - use PATCH /persone/{persId}/dismettiEmail
 * to deactivate the institutional email instead.
 *
 * @param persId   long (path, required)    - person ID
 * @param emailAte string (query, required) - new institutional email address;
 *                                            cannot be null or empty
 * @return Persona the updated person record on success,
 *         DettaglioErrore on failure
 */
PUT /persone/{persId}/emailAte
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

::: warning
This endpoint cannot set `emailAte` to null. To deactivate an institutional email use [`PATCH /persone/{persId}/dismettiEmail`](#patch-personepersiddismettiemail----deactivate-institutional-email-by-person-id) instead.
:::

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Response

**`200 OK`** - Institutional email updated. Returns the updated person record.

```json
{
  "persId": 1, // Person ID (primary key)
  "emailAte": "string" // Updated institutional email
  // ... same fields as GET /persone
}
```

> See [`GET /persone`](#get-persone----get-persons) for the full field list and descriptions.

**`422 Unprocessable Entity`** - Update failed.

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

### `GET /persone/{persId}/foto` - Get person photo

```java
/**
 * Returns the photo of a specific person as a binary octet-stream.
 * When called with STUDENTE auth, only the student's own photo
 * is accessible.
 *
 * @param persId long (path, required) - person ID
 * @return byte[] raw photo content as application/octet-stream on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/foto
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own photo only) · Supported: `Basic`, `JWT`

**Cache:** none

**Response Content-Type:** `application/octet-stream`

#### Response

**`200 OK`** - Returns the raw binary photo content.

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `POST /persone/{persId}/ins-dicHandMisComp` - Insert compensatory measure for disability declaration (alternative)

```java
/**
 * Inserts a new compensatory measure linked to a specific disability
 * declaration of a person. Returns the full updated compensatory measure
 * object on success.
 * Alternative to POST /persone/{persId}/dic-hand/{dicHandId}/misure-compensative-dicHand
 * - functionally equivalent but passes dicHandId as a query parameter
 * instead of a path parameter.
 *
 * @param persId               long (path, required)    - person ID
 * @param dicHandId            long (query, required)   - disability declaration ID
 * @param tipoHandicap         string (query, optional) - disability type code,
 *                                                        max length 1
 * @param statoMisuraComp      string (body, required)  - compensatory measure
 *                                                        status code
 * @param misuraDataIni        string (body, required)  - measure start date
 *                                                        DD/MM/YYYY
 * @param misuraDataFine       string (body, optional)  - measure end date
 *                                                        DD/MM/YYYY
 * @param misuraCompensativaCod string (body, required) - compensatory measure code
 * @param desLiberaMisura      string (body, optional)  - free description of the
 *                                                        measure (required if
 *                                                        desLiberaFlg=1 for the
 *                                                        selected measure type)
 * @return 201 Created with updated measure data on success,
 *         DettaglioErrore on failure
 */
POST /persone/{persId}/ins-dicHandMisComp
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Request body

```json
{
  "statoMisuraComp": "X", // Compensatory measure status code
  "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
  "misuraDataFine": "10/10/2020", // Measure end date DD/MM/YYYY
  "misuraCompensativaCod": "1", // Compensatory measure code
  "desLiberaMisura": "string" // Free description (required if measure type allows it)
}
```

#### Response

**`201 Created`** - Compensatory measure successfully inserted.

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

### `GET /persone/{persId}/misure-compensative` - Get person compensatory measures

```java
/**
 * Returns the list of compensatory measures (special needs support) for a
 * specific person. Each measure has a validity period and a status.
 * Use q=PRENOTAZIONE to filter only measures valid for a specific exam session,
 * combined with dataInizioApp to specify the session start date.
 * When called with STUDENTE auth, only the student's own measures are accessible.
 *
 * @param persId       long (path, required)    - person ID
 * @param dataInizioApp string (query, optional) - exam session start date DD/MM/YYYY;
 *                                                 used with q=PRENOTAZIONE
 * @param q            string (query, optional) - predefined filter;
 *                                                PRENOTAZIONE = return only measures
 *                                                valid for the specified exam session
 * @param fields       string (query, optional) - comma-separated list of optional
 *                                                fields to include; use ALL for all;
 *                                                supports Ant Glob Patterns
 *                                                (e.g. obj.*, obj.**)
 * @param order        string (query, optional) - sort order; prefix field with +
 *                                                (ASC) or - (DESC); multiple fields
 *                                                comma-separated
 * @return List<MisuraCompensativa> list of compensatory measures on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/misure-compensative
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own measures only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "dicHandMisureId": 1, // Compensatory measure record ID
    "persId": 1, // Person ID
    "tipoHandicap": "H", // Disability type code
    "percHand": 10, // Disability percentage
    "dataDicharaz": "10/10/2020", // Declaration date DD/MM/YYYY
    "statoDicHandValidoFlg": 1, // Disability declaration valid flag (0=no, 1=yes)
    "statoDicHand": "ATT", // Disability declaration status code
    "misuraCompensativaCod": "1", // Compensatory measure code
    "misuraCompensativaDes": "string", // Compensatory measure description
    "misuraDesLiberaFlg": 1, // Free description allowed flag (0=no, 1=yes)
    "misuraVisWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "statoMisuraComp": "A", // Measure status code
    "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
    "misuraDataFine": "10/10/2020", // Measure end date DD/MM/YYYY
    "dichHandDataIni": "10/10/2020", // Disability declaration start date DD/MM/YYYY
    "dichHandDataFine": "10/10/2020" // Disability declaration end date DD/MM/YYYY
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `PUT /persone/{persId}/telefono-domicilio` - Update domicile phone number

```java
/**
 * Updates the domicile phone number of a specific person.
 * Note: despite the endpoint name referencing domicilio (domicile),
 * the YAML description refers to residenza (residence) - both terms
 * appear in the original documentation.
 * When called with STUDENTE auth, only the student's own record
 * is accessible.
 *
 * @param persId      long (path, required)   - person ID
 * @param numTelefono string (body, required) - new phone number
 * @param prefix      string (body, optional) - international dialling prefix
 *                                              (e.g. 39 for Italy)
 * @return updated phone number and prefix on success,
 *         DettaglioErrore on failure
 */
PUT /persone/{persId}/telefono-domicilio
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Request body

```json
{
  "numTelefono": "34954624093", // Phone number
  "prefix": "39" // International dialling prefix
}
```

#### Response

**`200 OK`**

```json
{
  "numTelefono": "34954624093", // Updated phone number
  "prefix": "39" // Updated international dialling prefix
}
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `PUT /persone/{persId}/telefono-residenza` - Update residence phone number

```java
/**
 * Updates the residence phone number of a specific person.
 * When called with STUDENTE auth, only the student's own record
 * is accessible.
 *
 * @param persId      long (path, required)   - person ID
 * @param numTelefono string (body, required) - new phone number
 * @param prefix      string (body, optional) - international dialling prefix
 *                                              (e.g. 39 for Italy)
 * @return updated phone number and prefix on success,
 *         DettaglioErrore on failure
 */
PUT /persone/{persId}/telefono-residenza
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Request body

```json
{
  "numTelefono": "34954624093", // Phone number
  "prefix": "39" // International dialling prefix
}
```

#### Response

**`200 OK`**

```json
{
  "numTelefono": "34954624093", // Updated phone number
  "prefix": "39" // Updated international dialling prefix
}
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `GET /persone/{persId}/tutori` - Get guardians linked to a registry record

```java
/**
 * Returns the list of guardians linked to a specific person's registry record.
 * By default, only active guardians with today's date within their validity
 * period are returned. Set filtroTutori=1 to include all guardians regardless
 * of their status or validity period.
 *
 * @param persId       long (path, required)   - person ID
 * @param filtroTutori int (query, optional)   - guardian filter;
 *                                               0 or null = active and valid only
 *                                               (default);
 *                                               1 = return all guardians
 * @return List<Tutore> list of guardians on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/tutori
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 681429, // Person ID
    "autorizzatoId": 69, // Authorized person ID
    "nome": "MARCO", // First name
    "cognome": "ROSSI", // Last name
    "codFis": "string", // Tax code
    "sesso": "M", // Gender (F/M)
    "dataNascita": "01/01/2000", // Date of birth DD/MM/YYYY
    "comuneId": 1374, // Birth municipality ID
    "comuneDes": "Bologna", // Birth municipality name
    "tipoParCod": "P", // Kinship type code
    "tipoParDes": "Padre", // Kinship type description
    "contrCfCod": "string", // Tax code check code
    "certificatoFlg": 1, // Certified flag (0=no, 1=yes)
    "nazioneId": 1, // Country ID
    "nazioneDes": "ITALIA", // Country name
    "citstraNasc": "Barcellona", // Foreign birth city
    "email": "string", // Email
    "emailCertificata": "string", // Certified email (PEC)
    "usrInsId": "Administrator", // Insert user ID
    "dataIns": "01/07/2022", // Insert date DD/MM/YYYY
    "usrModId": "Administrator", // Last modified user ID
    "dataMod": "01/07/2022", // Last modified date DD/MM/YYYY
    "cellulare": "string", // Mobile number
    "autExtCod": "string", // External authorized person code
    "regTutoriTstCod": "PLURIGEN", // Guardian regulation type code
    "regTutoriTstDes": "string", // Guardian regulation type description
    "regTutoriDettCod": "PADRE", // Guardian regulation detail code
    "regTutoriDettDes": "Padre", // Guardian regulation detail description
    "dataIniVal": "01/07/2022", // Validity start date DD/MM/YYYY
    "dataFineVal": "30/07/2022", // Validity end date DD/MM/YYYY
    "stato": "A" // Status code (A=active)
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `GET /persone/{persId}/validaFoto` - Get person photo validation status

```java
/**
 * Returns the validation flag of the photo associated with a specific person.
 * When called with STUDENTE auth, only the student's own photo status
 * is accessible.
 *
 * @param persId long (path, required) - person ID
 * @return validaFlg flag indicating whether the photo has been validated,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/validaFoto
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "validaFlg": 1 // Photo validation flag (0=not validated, 1=validated)
}
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

## Titoli

### `POST /titoli/import` - Import or update academic qualifications

```java
/**
 * Inserts or updates academic qualifications (high school diploma, Italian
 * university degrees, and foreign degrees) for a specific person, identified
 * by tax code, registration number, user ID, or person ID.
 * Returns the elaboration header ID on success, along with any partial errors.
 *
 * @param codFis    string (body, optional) - person tax code
 * @param matricola string (body, optional) - student registration number
 * @param userId    string (body, optional) - user ID
 * @param persId    long (body, optional)   - person ID
 * @param matur     array (body, optional)  - list of high school diploma records
 *                                            to insert or update
 * @param titIt     array (body, optional)  - list of Italian university degree
 *                                            records to insert or update
 * @param titStra   array (body, optional)  - list of foreign degree records
 *                                            to insert or update
 * @return elaboration header ID and any partial errors on success,
 *         DettaglioErrore on failure
 */
POST /titoli/import
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Request body

```json
{
  "codFis": "string", // Person tax code (use to identify the person)
  "matricola": "A7866778", // Student registration number (alternative identifier)
  "userId": "utente1", // User ID (alternative identifier)
  "persId": 0, // Person ID (alternative identifier)

  "matur": [
    // High school diploma records
    {
      "annoMaturita": 1999, // Diploma year
      "dataMaturita": "10/10/2007", // Diploma date DD/MM/YYYY
      "idDiploma": 1, // Diploma ID
      "tipoDepositoCodSup": "O", // Deposit type code (upper secondary)
      "dataDepositoTitolo": "10/10/2007", // Deposit date DD/MM/YYYY
      "indirizzo": "string", // Study track
      "voto": 90, // Grade
      "votoAlfa": "ottimo", // Alphanumeric grade
      "anniScolarita": 5, // Years of schooling
      "votoMin": 60, // Minimum grade
      "votoMax": 100, // Maximum grade
      "dichiarazValoreFlg": 0, // Value declaration flag (0=no, 1=yes)
      "identificativoGed": "117/18", // GED identifier
      "tipoDepositoCodAnnoInt": "O", // Integration year deposit type code
      "annoIntegrazione": 1999, // Integration year
      "restituitoFlg": 0, // Returned flag (0=no, 1=yes)
      "dataRestituzione": "10/10/2007", // Return date DD/MM/YYYY
      "consolatoId": 10, // Consulate ID
      "richiestaRestitFlg": 0, // Return requested flag (0=no, 1=yes)
      "annoIntFlg": 0, // Integration year flag (0=no, 1=yes)
      "tipoTitstCod": "BA", // Foreign degree type code
      "naziConsCodFis": "Z999", // Consulate country tax code
      "naziOrdCodfis": "Z999", // Ordering country tax code
      "miurScuoleCodScuola": "string", // MIUR school code
      "lingua1": 1, // Language 1 ID
      "lingua2": 1, // Language 2 ID
      "lingua3": 1, // Language 3 ID
      "tipoTitstDes": "Bachelor", // Foreign degree type description
      "anniIntegrativi": 1, // Integrative years
      "staTitItCod": "C", // Italian degree status code
      "lodeFlg": 0, // Honours flag (0=no, 1=yes)
      "desScuola": "string", // School description
      "istStDes": "string", // Institute state description
      "codExt": "string", // External system degree code
      "citstraConseg": "Lisbona" // Foreign city of award
    }
  ],

  "titIt": [
    // Italian university degree records
    {
      "dataConsegTitolo": "10/10/2007", // Degree award date DD/MM/YYYY
      "tipoDepositoCod": "O", // Deposit type code
      "cdsAteId": 1, // Degree course university ID
      "percorsoDiStudio": "string", // Study track
      "voto": 90, // Grade
      "baseVoto": 110, // Grade base
      "lode": 0, // Honours flag (0=no, 1=yes)
      "stessoAteneoFlg": 0, // Same university flag (0=no, 1=yes)
      "ateneiIstatCod": "70003", // University ISTAT code
      "ateneiCodUn": "3", // University MIUR code
      "idTipoLaurea": "LT", // Degree type ID
      "sessione": "seconda", // Graduation session
      "iscrAlboFlg": 0, // Professional register flag (0=no, 1=yes)
      "cdsAteneiItaIstatCod": "73051", // Degree course ISTAT code
      "appellativoF": "Dottoressa", // Female title
      "appellativoM": "Dottore", // Male title
      "aaConsegTitolo": 1999, // Degree award academic year
      "abilFlg": 0, // Qualification flag (0=no, 1=yes)
      "staTitItCod": "C", // Degree status code
      "ordine": 0, // Order
      "nota": "string", // Free notes
      "titoloTesi": "string", // Thesis title
      "domRicoStraFlg": 0, // Foreign recognition request flag (0=no, 1=yes)
      "ricoTitStraFlg": 0, // Foreign degree recognition flag (0=no, 1=yes)
      "dataIniTiro": "10/10/2007", // Internship start date DD/MM/YYYY
      "dataFinTiro": "10/10/2007", // Internship end date DD/MM/YYYY
      "dataIscrOrdProf": "10/10/2007", // Professional register registration date DD/MM/YYYY
      "desSede": "string", // Campus description
      "lauEntroDnFlg": 0, // Graduated within DN flag (0=no, 1=yes)
      "cfu": 10, // Credit hours (CFU)
      "giudizioFinDes": "string", // Final judgement description
      "tirocinioFlg": 0, // Internship flag (0=no, 1=yes)
      "desCds": "Informatica", // Degree course description
      "sdrConsegDes": "string", // Awarding SDR description
      "sdrConsegNazioneFisCod": "Z999", // Awarding SDR country tax code
      "sdrConsegCitstra": "Parigi", // Awarding SDR foreign city
      "sdrConsegComuneCod": "A944", // Awarding SDR municipality code
      "sdrConsegVia": "via Roma", // Awarding SDR street
      "sdrConsegNumCiv": "45", // Awarding SDR street number
      "sdrConsegCap": "92100", // Awarding SDR postal code
      "tititCod": "L-12", // Degree class code
      "dataScadenza": "10/10/2007" // Expiry date DD/MM/YYYY
    }
  ],

  "titStra": [
    // Foreign degree records
    {
      "dataConsegTitolo": "10/10/2007", // Degree award date DD/MM/YYYY
      "tipoTitstCod": "BA", // Foreign degree type code
      "ateneoStranieroErasmusCod": "WIEN47", // Foreign university Erasmus code
      "cdsStraniero": "string", // Foreign degree course name
      "durataAnni": 5, // Duration in years
      "voto": 90, // Grade
      "votoBase": 100, // Grade base
      "lode": 0, // Honours flag (0=no, 1=yes)
      "votoAlfanumerico": "Ottimo", // Alphanumeric grade
      "dichiarazValoreFlg": 0, // Value declaration flag (0=no, 1=yes)
      "tipoDepositoCod": "O", // Deposit type code
      "appellativoF": "Dottoressa", // Female title
      "appellativoM": "Dottore", // Male title
      "desTitolo": "string", // Degree title description
      "staTitStraCod": "C", // Foreign degree status code
      "naziCodFis": "Z999", // Country tax code
      "aaConsegId": 1999, // Degree award academic year
      "citstraConseg": "Lisbona", // Foreign city of award
      "votoMin": 60, // Minimum grade
      "votoConvertito": 90, // Converted grade
      "votoMinConvertito": 60, // Converted minimum grade
      "votoBaseConvertito": 100, // Converted grade base
      "tipoDicValCod": "CIMEA", // Declaration type code
      "naziOrdCodFis": "Z999", // Ordering country tax code
      "nota": "string", // Free notes
      "desAteneo": "string" // Foreign university description
    }
  ]
}
```

#### Response

**`201 Created`** - Import successful. Returns the elaboration header ID and any partial errors.

```json
{
  "codiceRitorno": 1, // Return code (1=success, -1=error)
  "idElenco": 1, // Elaboration header ID
  "errori": [
    // Partial errors (may be non-empty even on success)
    {
      "statusCode": 200,
      "retCode": -1,
      "retErrMsg": "string",
      "errDetails": [
        {
          "errorType": "string",
          "value": "string",
          "rawValue": "string"
        }
      ]
    }
  ]
}
```

**`422 Unprocessable Entity`** - Import failed.

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

### `GET /titoli/{persId}` - Get person academic qualifications

```java
/**
 * Returns all academic qualifications for a specific person, including
 * high school diploma (SUP), foreign degrees (TITSTRA), and Italian
 * university degrees (TITIT). Optional groups are excluded by default
 * and must be requested via optionalFields.
 *
 * @param persId         long (path, required)    - person ID (primary key)
 * @param stuId          long (query, optional)   - student career ID filter
 * @param optionalFields string (query, optional) - optional field groups to
 *                                                  include; use ALL for all;
 *                                                  available: SUP, TITSTRA, TITIT;
 *                                                  supports Ant Glob Patterns
 *                                                  (e.g. SUP.*, TITIT.**)
 * @return TitoliPersona the person's academic qualifications on success,
 *         DettaglioErrore on failure
 */
GET /titoli/{persId}
```

**Auth:** `ALL` (own record via PERSONA check) · `UTENTE_TECNICO` · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "persId": "64901", // Person ID (primary key)

  "SUP": [
    // High school diploma records (optional - use optionalFields=SUP)
    {
      "persId": "64901",
      "id": 5383, // Diploma record ID
      "annoMaturita": 2001, // Diploma year
      "dataMaturita": "01/01/1980", // Diploma date DD/MM/YYYY
      "dataDepositoTitolo": "01/01/1980", // Deposit date DD/MM/YYYY
      "dataRestituzione": "01/01/1980", // Return date DD/MM/YYYY
      "tipoTitoloCod": "2", // Diploma type code
      "tipoDepositoCod": "AUT", // Deposit type code
      "tipiDepDes": "Autocertificazione", // Deposit type description
      "tipiTitoloSupDes": "string", // Diploma type description
      "staTitItCod": "C", // Status code
      "statiTitItDes": "Conseguito", // Status description
      "voto": 88, // Grade
      "votoMin": 60, // Minimum grade
      "votoMax": 100, // Maximum grade
      "votoAlfa": "string", // Alphanumeric grade
      "lodeFlg": 0, // Honours flag (0=no, 1=yes)
      "indirizzo": "string", // Study track
      "anniScolarita": 0, // Years of schooling
      "anniIntegrativi": 0, // Integrative years
      "annoIntegrazione": 1998, // Integration year
      "annoIntFlg": 0, // Integration year flag (0=no, 1=yes)
      "scuolaDes": "string", // School name
      "scuolaCodMiur": "TNPM01000X", // School MIUR code
      "codScuola": "TNPM015003", // School code
      "scuolaComuCod": "G888", // School municipality code
      "scuolaComuDes": "Pordenone", // School municipality name
      "scuolaComuSigla": "PN", // School municipality abbreviation
      "naziConsegCod": "200", // Award country code
      "naziConsegDes": "ITALIA", // Award country name
      "naziOrdCod": "200", // Ordering country code
      "naziOrdDes": "ITALIA", // Ordering country name
      "citstraConseg": "string", // Foreign award city
      "dichiarazValoreFlg": 0, // Value declaration flag (0=no, 1=yes)
      "restituitoFlg": 0, // Returned flag (0=no, 1=yes)
      "richiestaRestitFlg": 0, // Return requested flag (0=no, 1=yes)
      "valutatoFlg": 0, // Evaluated flag (0=no, 1=yes)
      "titAccAmm": 0, // Admission qualification flag
      "titAccMat": 0, // Enrollment qualification flag
      "titAccMatStu": 0 // Student enrollment qualification flag
    }
  ],

  "TITSTRA": [
    // Foreign degree records (optional - use optionalFields=TITSTRA)
    {
      "persId": "64901",
      "titStraId": "string", // Foreign degree ID
      "tipoTitstCod": "LIC", // Foreign degree type code
      "tipiTitstDes": "string", // Foreign degree type description
      "tipoTitstraDes": "string", // Foreign degree title description
      "dataConsegTitolo": "string", // Award date
      "aaConsegId": "string", // Award academic year
      "cdsStraniero": "string", // Foreign degree course name
      "desAteneo": "string", // Foreign university name
      "desTitolo": "string", // Degree title description
      "tipoDepositoCod": "LAUESA", // Deposit type code
      "staTitStraCod": "C", // Status code
      "statiTitItDes": "string", // Status description
      "voto": 6, // Grade
      "votoBase": 7, // Grade base
      "votoAlfanumerico": "10", // Alphanumeric grade
      "lode": 0, // Honours flag (0=no, 1=yes)
      "durataAnni": 0, // Duration in years
      "dichiarazValoreFlg": 0, // Value declaration flag (0=no, 1=yes)
      "titoloEquipFlg": 1, // Equivalence flag (0=no, 1=yes)
      "lauEntroDnFlg": 0, // Graduated within DN flag (0=no, 1=yes)
      "valutatoFlg": 0, // Evaluated flag (0=no, 1=yes)
      "titAccAmm": 0, // Admission qualification flag
      "titAccMat": 0, // Enrollment qualification flag
      "titAccMatStu": 0 // Student enrollment qualification flag
    }
  ],

  "TITIT": [
    // Italian university degree records (optional - use optionalFields=TITIT)
    {
      "persId": "64901",
      "titItId": 114625, // Italian degree ID
      "tipoTititCod": "SDFS", // Degree type code
      "tipiTitItDes": "string", // Degree type description
      "tititCod": "string", // Degree class code
      "desCds": "Tecnico in Logopedia", // Degree course description
      "p06AaDes": "1975/1976", // Academic year description
      "p06AteneiDes": "string", // University name
      "p06AteneiIstatCod": "70019", // University ISTAT code
      "aaConsegTitolo": 1975, // Award academic year
      "dataConsegTitolo": "string", // Award date
      "tipoDepositoCod": "AUT", // Deposit type code
      "tipiDepositoDes": "string", // Deposit type description
      "staTitItCod": "C", // Status code
      "statiTitItDes": "Conseguito", // Status description
      "voto": 50, // Grade
      "baseVoto": 50, // Grade base
      "lode": 0, // Honours flag (0=no, 1=yes)
      "cfu": 0, // Credit hours (CFU)
      "sessione": "string", // Graduation session
      "titoloTesi": "string", // Thesis title
      "percorsoDiStudio": "string", // Study track
      "stessoAteneoFlg": 0, // Same university flag (0=no, 1=yes)
      "abilFlg": 0, // Qualification flag (0=no, 1=yes)
      "iscrAlboFlg": 0, // Professional register flag (0=no, 1=yes)
      "tirocinioFlg": 0, // Internship flag (0=no, 1=yes)
      "ricoTitStraFlg": 0, // Foreign degree recognition flag (0=no, 1=yes)
      "valutatoFlg": 0, // Evaluated flag (0=no, 1=yes)
      "titAccAmm": 0, // Admission qualification flag
      "titAccMat": 0, // Enrollment qualification flag
      "titAccMatStu": 0 // Student enrollment qualification flag
    }
  ]
}
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

### `GET /titoliPersona` - Get person academic qualifications (alternative)

```java
/**
 * Returns all academic qualifications for a specific person, including
 * high school diploma (SUP), foreign degrees (TITSTRA), and Italian
 * university degrees (TITIT). Optional groups are excluded by default
 * and must be requested via optionalFields.
 * Alternative to GET /titoli/{persId} - functionally equivalent but
 * accepts persId as a query parameter and additionally supports
 * identification by tax code (codFis).
 *
 * @param persId         long (query, optional)   - person ID
 * @param stuId          long (query, optional)   - student career ID filter
 * @param codFis         string (query, optional) - person tax code
 *                                                  (alternative identifier)
 * @param optionalFields string (query, optional) - optional field groups to
 *                                                  include; use ALL for all;
 *                                                  available: SUP, TITSTRA, TITIT;
 *                                                  supports Ant Glob Patterns
 *                                                  (e.g. SUP.*, TITIT.**)
 * @return TitoliPersona the person's academic qualifications on success,
 *         DettaglioErrore on failure
 */
GET /titoliPersona
```

**Auth:** `ALL` (own record via PERSONA check) · `UTENTE_TECNICO` · `STUDENTE` (own record only) · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`** - Response structure is identical to [`GET /titoli/{persId}`](#get-titolipersid----get-person-academic-qualifications).

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

## Endpoints - Disability Declarations (Dichiarazioni Invalidità)

### `PUT /persone/{persId}/agg-dicHandMisComp` - Update compensatory measure for disability declaration

```java
/**
 * Updates the details of a compensatory measure associated with a disability
 * declaration of a specific person. Returns the full list of updated
 * compensatory measures on success.
 *
 * @param persId               long (path, required)    - person ID
 * @param dicHandId            long (query, required)   - disability declaration ID
 * @param dicHandMisureId      long (query, optional)   - disability declaration
 *                                                        and measure association ID
 * @param tipoHandicap         string (query, optional) - disability type code,
 *                                                        max length 1
 * @param misuraCompensativaCod string (query, optional) - compensatory measure code,
 *                                                         max length 20
 * @param statoMisuraComp      string (body, required)  - compensatory measure
 *                                                        status code
 * @param misuraDataIni        string (body, required)  - measure start date
 *                                                        DD/MM/YYYY
 * @param misuraDataFine       string (body, optional)  - measure end date
 *                                                        DD/MM/YYYY
 * @return List<MisuraCompensativa> list of updated compensatory measures
 *         on success, DettaglioErrore on failure
 */
PUT /persone/{persId}/agg-dicHandMisComp
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Request body

```json
{
  "statoMisuraComp": "A", // Compensatory measure status code
  "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
  "misuraDataFine": "10/10/2020" // Measure end date DD/MM/YYYY
}
```

#### Response

**`200 OK`** - Returns the full list of updated compensatory measures.

```json
[
  {
    "dicHandMisureId": 1, // Compensatory measure record ID
    "persId": 1, // Person ID
    "tipoHandicap": "H", // Disability type code
    "percHand": 10, // Disability percentage
    "dataDicharaz": "10/10/2020", // Declaration date DD/MM/YYYY
    "statoDicHandValidoFlg": 1, // Disability declaration valid flag (0=no, 1=yes)
    "statoDicHand": "ATT", // Disability declaration status code
    "misuraCompensativaCod": "1", // Compensatory measure code
    "misuraCompensativaDes": "string", // Compensatory measure description
    "misuraDesLiberaFlg": 1, // Free description allowed flag (0=no, 1=yes)
    "misuraVisWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "statoMisuraComp": "A", // Measure status code
    "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
    "misuraDataFine": "10/10/2020", // Measure end date DD/MM/YYYY
    "dichHandDataIni": "10/10/2020", // Disability declaration start date DD/MM/YYYY
    "dichHandDataFine": "10/10/2020" // Disability declaration end date DD/MM/YYYY
  }
]
```

**`422 Unprocessable Entity`** - Update failed.

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

### `PUT /persone/{persId}/dic-hand/{dicHandId}/misure-compensative-dicHand/{dicHandMisureId}` - Update specific compensatory measure for disability declaration

```java
/**
 * Updates the details of a specific compensatory measure associated with a
 * disability declaration of a person, identified by all three path parameters.
 * Alternative to PUT /persone/{persId}/agg-dicHandMisComp - functionally
 * equivalent but uses path parameters for all IDs instead of query parameters,
 * and supports additional auth roles (DOCENTE, SOGG_EST).
 *
 * @param persId               long (path, required)    - person ID
 * @param dicHandId            long (path, required)    - disability declaration ID
 * @param dicHandMisureId      long (path, required)    - disability declaration
 *                                                        and measure association ID
 * @param tipoHandicap         string (query, optional) - disability type code,
 *                                                        max length 1
 * @param misuraCompensativaCod string (query, optional) - compensatory measure code,
 *                                                         max length 20
 * @param statoMisuraComp      string (body, required)  - compensatory measure
 *                                                        status code
 * @param misuraDataIni        string (body, required)  - measure start date
 *                                                        DD/MM/YYYY
 * @param misuraDataFine       string (body, optional)  - measure end date
 *                                                        DD/MM/YYYY
 * @return List<MisuraCompensativa> list of updated compensatory measures
 *         on success, DettaglioErrore on failure
 */
PUT /persone/{persId}/dic-hand/{dicHandId}/misure-compensative-dicHand/{dicHandMisureId}
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (linked to person) · `SOGG_EST` (linked to person) · Supported: `Basic`, `JWT`

**Cache:** none

#### Return codes

| Code | Description          |
| ---- | -------------------- |
| `-1` | Generic error        |
| `1`  | Execution successful |

#### Request body

```json
{
  "statoMisuraComp": "X", // Compensatory measure status code
  "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
  "misuraDataFine": "10/10/2020" // Measure end date DD/MM/YYYY
}
```

#### Response

**`200 OK`** - Returns the full list of updated compensatory measures.

```json
[
  {
    "dicHandMisureId": 1, // Compensatory measure record ID
    "persId": 1, // Person ID
    "tipoHandicap": "H", // Disability type code
    "percHand": 10, // Disability percentage
    "dataDicharaz": "10/10/2020", // Declaration date DD/MM/YYYY
    "statoDicHandValidoFlg": 1, // Disability declaration valid flag (0=no, 1=yes)
    "statoDicHand": "ATT", // Disability declaration status code
    "misuraCompensativaCod": "1", // Compensatory measure code
    "misuraCompensativaDes": "string", // Compensatory measure description
    "misuraDesLiberaFlg": 1, // Free description allowed flag (0=no, 1=yes)
    "misuraVisWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "statoMisuraComp": "A", // Measure status code
    "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
    "misuraDataFine": "10/10/2020", // Measure end date DD/MM/YYYY
    "dichHandDataIni": "10/10/2020", // Disability declaration start date DD/MM/YYYY
    "dichHandDataFine": "10/10/2020" // Disability declaration end date DD/MM/YYYY
  }
]
```

**`422 Unprocessable Entity`** - Update failed.

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

### `GET /persone/{persId}/dicHand` - Get disability declarations for a person

```java
/**
 * Returns all disability declarations linked to a specific person's registry
 * record, or a single declaration when filtered by dicHandId.
 *
 * @param persId    long (path, required)   - person ID
 * @param dicHandId long (query, optional)  - disability declaration ID filter;
 *                                            if provided, returns only the
 *                                            matching declaration
 * @return List<DichiarazioneHandicap> list of disability declarations on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/dicHand
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent` - medium-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1234, // Person ID
    "dichiarId": 11, // Declaration ID
    "dicHandId": 120, // Disability declaration ID
    "tipoHandicap": "H", // Disability type code
    "tipiHandicapDes": "string", // Disability type description
    "percHand": 100, // Disability percentage
    "dataDichiar": "18/11/2020", // Declaration date DD/MM/YYYY
    "statoDicHand": "C", // Declaration status code
    "statiDicHandDes": "Confermata", // Declaration status description
    "dataIniStato": "18/12/2022", // Status start date DD/MM/YYYY
    "tutoratoFlg": 1, // Tutoring flag (0=no, 1=yes)
    "autTutorFlg": 0, // Authorized tutor flag (0=no, 1=yes)
    "dataIni": "18/11/2021", // Validity start date DD/MM/YYYY
    "dataFine": "25/12/2022", // Validity end date DD/MM/YYYY
    "aaIdCompIni": 2022, // Start academic year ID
    "aaIdCompFine": 2022, // End academic year ID
    "nota": "string", // Notes
    "consDsFlg": 1, // DS consent flag (0=no, 1=yes)
    "handNormativaCod": "118/71", // Disability regulation code
    "p01HandNormativaDes": "string", // Disability regulation description
    "besCheckFlg": 0, // BES check flag (0=no, 1=yes)
    "misureComp": 120 // Number of linked compensatory measures
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `PUT /persone/{persId}/dicHand` - Update disability declaration

```java
/**
 * Updates a disability declaration for a specific person. The target
 * declaration is resolved with the following priority:
 * - if dicHandId is provided: updates that specific declaration
 * - if only tipoHandicap is provided: updates the most recent
 *   non-cancelled declaration of that disability type
 * - if both are null: updates the most recent non-cancelled declaration
 *
 * @param persId       long (path, required)   - person ID
 * @param dicHandId    long (query, optional)  - disability declaration ID;
 *                                               if provided, takes priority
 *                                               over tipoHandicap
 * @param tipoHandicap string (query, optional) - disability type code,
 *                                               max length 1; used to resolve
 *                                               the target declaration if
 *                                               dicHandId is not provided
 * @param statoDicHand string (body, required) - declaration status code
 * @param percHand     int (body, optional)    - disability percentage
 * @param dataIni      string (body, optional) - validity start date DD/MM/YYYY
 * @param dataFine     string (body, optional) - validity end date DD/MM/YYYY
 * @return List<DichiarazioneHandicap> list of updated declarations on success,
 *         DettaglioErrore on failure
 */
PUT /persone/{persId}/dicHand
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Request body

```json
{
  "statoDicHand": "C", // Declaration status code
  "percHand": 100, // Disability percentage
  "dataIni": "10/10/2016", // Validity start date DD/MM/YYYY
  "dataFine": "10/10/2017" // Validity end date DD/MM/YYYY
}
```

#### Response

**`200 OK`** - Returns the full list of updated declarations.

```json
[
  {
    "persId": 1234, // Person ID
    "dichiarId": 11, // Declaration ID
    "dicHandId": 120, // Disability declaration ID
    "tipoHandicap": "H", // Disability type code
    "tipiHandicapDes": "string", // Disability type description
    "percHand": 100, // Disability percentage
    "dataDichiar": "18/11/2020", // Declaration date DD/MM/YYYY
    "statoDicHand": "C", // Declaration status code
    "statiDicHandDes": "Confermata", // Declaration status description
    "dataIniStato": "18/12/2022", // Status start date DD/MM/YYYY
    "tutoratoFlg": 1, // Tutoring flag (0=no, 1=yes)
    "autTutorFlg": 0, // Authorized tutor flag (0=no, 1=yes)
    "dataIni": "18/11/2021", // Validity start date DD/MM/YYYY
    "dataFine": "25/12/2022", // Validity end date DD/MM/YYYY
    "aaIdCompIni": 2022, // Start academic year ID
    "aaIdCompFine": 2022, // End academic year ID
    "nota": "string", // Notes
    "consDsFlg": 1, // DS consent flag (0=no, 1=yes)
    "handNormativaCod": "118/71", // Disability regulation code
    "p01HandNormativaDes": "string", // Disability regulation description
    "besCheckFlg": 0, // BES check flag (0=no, 1=yes)
    "misureComp": 120 // Number of linked compensatory measures
  }
]
```

**`422 Unprocessable Entity`** - Update failed.

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

### `GET /persone/{persId}/dicHand/{dicHandId}` - Get single disability declaration

```java
/**
 * Returns a specific disability declaration linked to a person, identified
 * by both the person ID and the declaration ID.
 * Unlike GET /persone/{persId}/dicHand, this endpoint targets a single
 * declaration directly via path parameters and supports additional auth
 * roles (DOCENTE, SOGG_EST).
 *
 * @param persId    long (path, required) - person ID
 * @param dicHandId long (path, required) - disability declaration ID
 * @return DichiarazioneHandicap the disability declaration on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/dicHand/{dicHandId}
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (linked to person) · `SOGG_EST` (linked to person) · Supported: `Basic`, `JWT`

**Cache:** `highRefreshRateUserDependent` - high-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`** - Returns a single `DichiarazioneHandicap` object.

```json
{
  "persId": 1234, // Person ID
  "dichiarId": 11, // Declaration ID
  "dicHandId": 120, // Disability declaration ID
  "tipoHandicap": "H", // Disability type code
  "tipiHandicapDes": "string", // Disability type description
  "percHand": 100, // Disability percentage
  "dataDichiar": "18/11/2020", // Declaration date DD/MM/YYYY
  "statoDicHand": "C", // Declaration status code
  "statiDicHandDes": "Confermata", // Declaration status description
  "dataIniStato": "18/12/2022", // Status start date DD/MM/YYYY
  "tutoratoFlg": 1, // Tutoring flag (0=no, 1=yes)
  "autTutorFlg": 0, // Authorized tutor flag (0=no, 1=yes)
  "dataIni": "18/11/2021", // Validity start date DD/MM/YYYY
  "dataFine": "25/12/2022", // Validity end date DD/MM/YYYY
  "aaIdCompIni": 2022, // Start academic year ID
  "aaIdCompFine": 2022, // End academic year ID
  "nota": "string", // Notes
  "consDsFlg": 1, // DS consent flag (0=no, 1=yes)
  "handNormativaCod": "118/71", // Disability regulation code
  "p01HandNormativaDes": "string", // Disability regulation description
  "besCheckFlg": 0, // BES check flag (0=no, 1=yes)
  "misureComp": 120 // Number of linked compensatory measures
}
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

### `PUT /persone/{persId}/dicHand/{dicHandId}` - Update specific disability declaration

```java
/**
 * Updates a specific disability declaration identified by both the person ID
 * and the declaration ID. Unlike PUT /persone/{persId}/dicHand, this endpoint
 * targets the declaration directly via path parameters with no ambiguity,
 * and supports additional auth roles (DOCENTE, SOGG_EST).
 *
 * @param persId       long (path, required)   - person ID
 * @param dicHandId    long (path, required)   - disability declaration ID
 * @param statoDicHand string (body, required) - declaration status code
 * @param percHand     int (body, optional)    - disability percentage
 * @param dataIni      string (body, optional) - validity start date DD/MM/YYYY
 * @param dataFine     string (body, optional) - validity end date DD/MM/YYYY
 * @return DichiarazioneHandicap the updated declaration on success,
 *         DettaglioErrore on failure
 */
PUT /persone/{persId}/dicHand/{dicHandId}
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (linked to person) · `SOGG_EST` (linked to person) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Request body

```json
{
  "statoDicHand": "C", // Declaration status code
  "percHand": 100, // Disability percentage
  "dataIni": "10/10/2016", // Validity start date DD/MM/YYYY
  "dataFine": "10/10/2017" // Validity end date DD/MM/YYYY
}
```

#### Response

**`200 OK`** - Returns the updated declaration as a single object.

```json
{
  "persId": 1234, // Person ID
  "dichiarId": 11, // Declaration ID
  "dicHandId": 120, // Disability declaration ID
  "tipoHandicap": "H", // Disability type code
  "tipiHandicapDes": "string", // Disability type description
  "percHand": 100, // Disability percentage
  "dataDichiar": "18/11/2020", // Declaration date DD/MM/YYYY
  "statoDicHand": "C", // Declaration status code
  "statiDicHandDes": "Confermata", // Declaration status description
  "dataIniStato": "18/12/2022", // Status start date DD/MM/YYYY
  "tutoratoFlg": 1, // Tutoring flag (0=no, 1=yes)
  "autTutorFlg": 0, // Authorized tutor flag (0=no, 1=yes)
  "dataIni": "18/11/2021", // Validity start date DD/MM/YYYY
  "dataFine": "25/12/2022", // Validity end date DD/MM/YYYY
  "aaIdCompIni": 2022, // Start academic year ID
  "aaIdCompFine": 2022, // End academic year ID
  "nota": "string", // Notes
  "consDsFlg": 1, // DS consent flag (0=no, 1=yes)
  "handNormativaCod": "118/71", // Disability regulation code
  "p01HandNormativaDes": "string", // Disability regulation description
  "besCheckFlg": 0, // BES check flag (0=no, 1=yes)
  "misureComp": 120 // Number of linked compensatory measures
}
```

**`422 Unprocessable Entity`** - Update failed.

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

### `GET /persone/{persId}/dicHand/{dicHandId}/allegatiDicHand/{allegatoId}/blob` - Download disability declaration attachment binary

```java
/**
 * Returns the binary content (blob) of a specific attachment linked to a
 * disability declaration. Use GET /allegati/{persId}/allegatiDicHand to
 * retrieve the allegatoId and tipoAssAllegato before calling this endpoint.
 * Supports additional auth roles (DOCENTE, SOGG_EST) when linked to the person.
 *
 * @param persId    long (path, required)    - person ID
 * @param dicHandId long (path, required)    - disability declaration ID
 * @param allegatoId long (path, required)   - attachment ID
 * @param userId    string (query, optional) - user ID
 * @return byte[] raw file content as application/octet-stream on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/dicHand/{dicHandId}/allegatiDicHand/{allegatoId}/blob
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (linked to person) · `SOGG_EST` (linked to person) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent` - low-frequency resource, HTTP cache enabled, server cache disabled

**Response Content-Type:** `application/octet-stream`

#### Response

**`200 OK`** - Returns the raw binary file content.

**`404 Not Found`** - Attachment not found.

**`422 Unprocessable Entity`** - Error.

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

### `GET /persone/{persId}/misure-compensative-dicHand` - Get compensatory measures by disability declaration

```java
/**
 * Returns the list of compensatory measures for a specific person, optionally
 * filtered by disability declaration ID and/or disability type.
 * Unlike GET /persone/{persId}/misure-compensative, this endpoint is scoped
 * to disability declarations specifically and does not support the
 * q=PRENOTAZIONE filter or exam session date filtering.
 *
 * @param persId       long (path, required)    - person ID
 * @param dicHandId    long (query, optional)   - disability declaration ID filter
 * @param tipoHandicap string (query, optional) - disability type code filter,
 *                                                max length 1
 * @return List<MisuraCompensativa> list of compensatory measures on success,
 *         DettaglioErrore on failure
 */
GET /persone/{persId}/misure-compensative-dicHand
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "dicHandMisureId": 1, // Compensatory measure record ID
    "persId": 1, // Person ID
    "tipoHandicap": "H", // Disability type code
    "percHand": 10, // Disability percentage
    "dataDicharaz": "10/10/2020", // Declaration date DD/MM/YYYY
    "statoDicHandValidoFlg": 1, // Disability declaration valid flag (0=no, 1=yes)
    "statoDicHand": "ATT", // Disability declaration status code
    "misuraCompensativaCod": "1", // Compensatory measure code
    "misuraCompensativaDes": "string", // Compensatory measure description
    "misuraDesLiberaFlg": 1, // Free description allowed flag (0=no, 1=yes)
    "misuraVisWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "statoMisuraComp": "A", // Measure status code
    "misuraDataIni": "10/10/2020", // Measure start date DD/MM/YYYY
    "misuraDataFine": "10/10/2020", // Measure end date DD/MM/YYYY
    "dichHandDataIni": "10/10/2020", // Disability declaration start date DD/MM/YYYY
    "dichHandDataFine": "10/10/2020" // Disability declaration end date DD/MM/YYYY
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

## Endpoints - External Subjects (Soggetti Esterni)

### `GET /soggettiEsterni` - Get external subjects

```java
/**
 * Returns the paginated list of external subjects configured in ESSE3
 * (e.g. external supervisors, lecturers, collaborators). Supports filtering
 * by name, department, type, U-Gov ID, tax code, and modification date.
 * Optional nested objects (aliases, profiles) can be requested via
 * fields or optionalFields.
 *
 * @param cognome        string (query, optional) - last name filter; use * for
 *                                                  LIKE search
 * @param nome           string (query, optional) - first name filter; use * for
 *                                                  LIKE search
 * @param dipId          long (query, optional)   - department ID filter
 * @param tipoSoggEstCod string (query, optional) - external subject type code
 * @param idAb           long (query, optional)   - U-Gov address book ID
 * @param codFis         string (query, optional) - tax code filter
 * @param soggEstId      array[int] (query, optional) - list of external subject IDs
 * @param daDataMod      string (query, optional) - last modified date DD/MM/YYYY;
 *                                                  returns records modified after
 *                                                  this date
 * @param daOraMod       string (query, optional) - last modified time HH:MI:SS,
 *                                                  used with daDataMod; seconds
 *                                                  default to 00 if omitted
 * @param fields         string (query, optional) - comma-separated optional fields;
 *                                                  use ALL for all; supports
 *                                                  Ant Glob Patterns;
 *                                                  available: soggEstAlias,
 *                                                  soggEstProfili
 * @param optionalFields string (query, optional) - alias for fields, same behavior
 * @param order          string (query, optional) - sort order; prefix field with +
 *                                                  (ASC) or - (DESC); multiple
 *                                                  fields comma-separated
 * @param start          int (query, optional)    - index of the first record to
 *                                                  load, defaults to 0
 * @param limit          int (query, optional)    - number of records to retrieve
 *                                                  starting from start, defaults
 *                                                  to 50, allowed range: 0–100
 * @return List<SoggettoEsterno> paginated list of external subjects
 */
GET /soggettiEsterni
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "soggEstId": 1, // External subject ID (primary key)
    "idAb": 123123, // U-Gov address book ID
    "cognome": "Rossi", // Last name
    "nome": "Mario", // First name
    "codFis": "string", // Tax code
    "sesso": "M", // Gender (F/M)
    "dataNascita": "01/01/1980", // Date of birth DD/MM/YYYY
    "tipoSoggEstCod": "D", // External subject type code
    "tipoSoggEstDes": "Docente", // External subject type description
    "dataIniAtt": "01/01/2020", // Activity start date DD/MM/YYYY
    "dataFinAtt": "02/02/2020", // Activity end date DD/MM/YYYY
    "appellativo": "dott.", // Title/appellative
    "email": "string", // Email
    "strutturaDidattResp": "string", // Responsible teaching structure
    "dipartimento": "string", // Department
    "userId": "1234", // User ID

    // Optional - request via fields=soggEstAlias
    "soggEstAlias": [
      {
        "alias": "alias1234", // Alias value
        "aliasId": 1234, // Alias ID
        "dataScadenza": "10/12/2022", // Expiry date DD/MM/YYYY
        "usrInsId": "user1234", // Insert user ID
        "dataIns": "10/12/2022", // Insert date DD/MM/YYYY
        "usrModId": "user1243", // Last modified user ID
        "dataMod": "10/12/2022", // Last modified date DD/MM/YYYY
        "tipologia": "string" // Alias type
      }
    ],

    // Optional - request via fields=soggEstProfili
    "soggEstProfili": [
      {
        "codiceFiscale": "string", // Tax code
        "soggEstId": 1, // External subject ID (primary key)
        "userId": "user1234", // User ID
        "grpName": "Administrator", // Group name
        "profiloExtCod": "string", // External profile code
        "profiloExtDes": "string", // External profile description
        "profiloCodExt": "string" // Profile external code
      }
    ]
  }
]
```

<br>

---

<br>

### `PUT /soggettiEsterni` - Insert or update external subject

```java
/**
 * Inserts or updates an external subject in ESSE3. The target record is
 * resolved with the following priority:
 * - if soggEstId, codFis, or idAb is provided: updates the matching record
 * - if all three are null: creates a new external subject
 *
 * @param optionalFields  string (query, optional)  - optional fields to include
 *                                                    in the response; use ALL
 *                                                    for all; available:
 *                                                    soggEstAlias, soggEstProfili
 * @param soggEstId       long (body, optional)     - external subject ID;
 *                                                    if provided, identifies
 *                                                    the record to update
 * @param cognome         string (body, required)   - last name
 * @param nome            string (body, required)   - first name
 * @param codFis          string (body, optional)   - tax code; used as
 *                                                    alternative identifier
 * @param sesso           string (body, optional)   - gender (F/M)
 * @param dataNascita     string (body, optional)   - date of birth DD/MM/YYYY
 * @param tipoSoggEstCod  string (body, optional)   - external subject type code
 * @param sdrId           long (body, optional)     - SDR ID
 * @param naziNascId      long (body, optional)     - birth country ID
 * @param comNascId       long (body, optional)     - birth municipality ID
 * @param citstraNasc     string (body, optional)   - foreign birth city
 * @param cittCod         string (body, optional)   - citizenship code
 * @param tel             string (body, optional)   - phone number
 * @param prefixInternaz  string (body, optional)   - international dialling prefix
 * @param fax             string (body, optional)   - fax number
 * @param cellulare       string (body, optional)   - mobile number
 * @param email           string (body, optional)   - email address
 * @param appellativo     string (body, optional)   - title/appellative
 * @param firmaId         long (body, optional)     - signature ID
 * @param dipId           long (body, optional)     - department ID
 * @param nominativoAlt   string (body, optional)   - alternative name
 * @param idAb            long (body, optional)     - U-Gov address book ID;
 *                                                    used as alternative identifier
 * @param operCellulare   int (body, optional)      - mobile operator
 * @param consSmsFlg      int (body, optional)      - SMS consent flag (0=no, 1=yes)
 * @param ateIdAccreditamento long (body, optional) - accreditation university ID
 * @param dataIniAtt      string (body, optional)   - activity start date DD/MM/YYYY
 * @param dataFinAtt      string (body, optional)   - activity end date DD/MM/YYYY
 * @return List<SoggettoEsterno> list with the inserted or updated record on success,
 *         DettaglioErrore on failure
 */
PUT /soggettiEsterni
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Request body

```json
{
  "soggEstId": 42, // External subject ID (omit to create new)
  "cognome": "Rossi", // Last name
  "nome": "Mario", // First name
  "codFis": "string", // Tax code (alternative identifier)
  "sesso": "M", // Gender (F/M)
  "dataNascita": "01/01/2000", // Date of birth DD/MM/YYYY
  "tipoSoggEstCod": "D", // External subject type code
  "sdrId": 53, // SDR ID
  "naziNascId": 1, // Birth country ID
  "comNascId": 1379, // Birth municipality ID
  "citstraNasc": "Tokyo", // Foreign birth city
  "cittCod": "200", // Citizenship code
  "tel": "0039123456789", // Phone number
  "prefixInternaz": "+39", // International dialling prefix
  "fax": "0039123456789", // Fax number
  "cellulare": "0039123456789", // Mobile number
  "email": "string", // Email address
  "appellativo": "dott.", // Title/appellative
  "firmaId": 123, // Signature ID
  "dipId": 321, // Department ID
  "nominativoAlt": "mrossi", // Alternative name
  "idAb": 321, // U-Gov address book ID (alternative identifier)
  "operCellulare": 3, // Mobile operator
  "consSmsFlg": 0, // SMS consent flag (0=no, 1=yes)
  "ateIdAccreditamento": 78, // Accreditation university ID
  "dataIniAtt": "01/01/2010", // Activity start date DD/MM/YYYY
  "dataFinAtt": "01/01/2020" // Activity end date DD/MM/YYYY
}
```

#### Response

**`200 OK`** - Returns the inserted or updated external subject record. Response structure is identical to [`GET /soggettiEsterni`](#get-soggettiesterni----get-external-subjects).

**`422 Unprocessable Entity`** - Insert or update failed.

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

### `DELETE /soggettiEsterni/{soggEstId}` - Delete external subject

```java
/**
 * Deletes a specific external subject from ESSE3 identified by soggEstId.
 * Returns the full record of the deleted subject on success, including
 * any aliases and profiles that were associated with it.
 *
 * @param soggEstId int (path, required) - external subject ID to delete
 * @return SoggettoEsterno the deleted external subject record on success,
 *         DettaglioErrore on failure
 */
DELETE /soggettiEsterni/{soggEstId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`204 No Content`** - External subject successfully deleted. Returns the deleted record.

```json
{
  "soggEstId": 1, // External subject ID (primary key)
  "idAb": 123123, // U-Gov address book ID
  "cognome": "Rossi", // Last name
  "nome": "Mario", // First name
  "codFis": "string", // Tax code
  "sesso": "M", // Gender (F/M)
  "dataNascita": "01/01/1980", // Date of birth DD/MM/YYYY
  "tipoSoggEstCod": "D", // External subject type code
  "tipoSoggEstDes": "Docente", // External subject type description
  "dataIniAtt": "01/01/2020", // Activity start date DD/MM/YYYY
  "dataFinAtt": "02/02/2020", // Activity end date DD/MM/YYYY
  "appellativo": "dott.", // Title/appellative
  "email": "string", // Email
  "strutturaDidattResp": "string", // Responsible teaching structure
  "dipartimento": "string", // Department
  "userId": "1234", // User ID
  "soggEstAlias": [
    {
      "alias": "alias1234", // Alias value
      "aliasId": 1234, // Alias ID
      "dataScadenza": "10/12/2022", // Expiry date DD/MM/YYYY
      "usrInsId": "user1234", // Insert user ID
      "dataIns": "10/12/2022", // Insert date DD/MM/YYYY
      "usrModId": "user1243", // Last modified user ID
      "dataMod": "10/12/2022", // Last modified date DD/MM/YYYY
      "tipologia": "string" // Alias type
    }
  ],
  "soggEstProfili": [
    {
      "codiceFiscale": "string", // Tax code
      "soggEstId": 1, // External subject ID (primary key)
      "userId": "user1234", // User ID
      "grpName": "Administrator", // Group name
      "profiloExtCod": "string", // External profile code
      "profiloExtDes": "string", // External profile description
      "profiloCodExt": "string" // Profile external code
    }
  ]
}
```

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

### `GET /soggettiEsterni/{soggEstId}/consensi` - Get external subject consents

```java
/**
 * Returns the list of consents for a specific external subject, scoped
 * to a given web process.
 *
 * @param soggEstId  int (path, required)    - external subject ID
 * @param procWebCod string (query, required) - web process code
 * @param iso6392Cod string (query, optional) - ISO 639-2 language code
 *                                              for descriptions
 * @return List<Consenso> list of consent records on success,
 *         DettaglioErrore on failure
 */
GET /soggettiEsterni/{soggEstId}/consensi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "soggEstId": 11238, // External subject ID
    "tipiConsensoTipoConsensoCod": "INPS", // Consent type code
    "consensoFlg": 1, // Consent flag (0=denied, 1=granted)
    "des": "string", // Consent description
    "dataIni": "02-DIC-20", // Consent effective date
    "procAmmCod": "WREGAZI", // Administrative process code
    "visWebFlg": 1, // Web visibility flag (0=no, 1=yes)
    "vincFlg": 1, // Binding flag (0=no, 1=yes)
    "abilVisDocFlg": 1, // Document visibility enabled (0=no, 1=yes)
    "nota": "string", // Notes
    "etichetta": "string", // Label
    "p01SoggEstConsensiTipoConsensoCod": "INFO_679" // Internal consent type reference
  }
]
```

**`422 Unprocessable Entity`** - Invalid or inconsistent search parameters.

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

### `GET /soggettiEsterniReplica` - Get external subjects (replica model)

```java
/**
 * Returns the paginated list of external subjects in the replica model,
 * which includes extended data such as consents, linked entities with their
 * branches, aliases, and profiles. Supports the same filters as
 * GET /soggettiEsterni with the addition of soggEstId as a direct filter.
 *
 * @param soggEstId      long (query, optional)   - external subject ID filter
 * @param cognome        string (query, optional) - last name filter; use * for
 *                                                  LIKE search
 * @param nome           string (query, optional) - first name filter; use * for
 *                                                  LIKE search
 * @param dipId          long (query, optional)   - department ID filter
 * @param tipoSoggEstCod string (query, optional) - external subject type code
 * @param idAb           long (query, optional)   - U-Gov address book ID
 * @param codFis         string (query, optional) - tax code filter
 * @param daDataMod      string (query, optional) - last modified date DD/MM/YYYY;
 *                                                  returns records modified after
 *                                                  this date
 * @param daOraMod       string (query, optional) - last modified time HH:MI:SS,
 *                                                  used with daDataMod; seconds
 *                                                  default to 00 if omitted
 * @param fields         string (query, optional) - comma-separated optional fields;
 *                                                  use ALL for all; supports
 *                                                  Ant Glob Patterns; available:
 *                                                  consensiSoggEsterni,
 *                                                  entiSoggEsterni,
 *                                                  entiSoggEsterni.sedi,
 *                                                  soggEstAlias, soggEstProfili
 * @param optionalFields string (query, optional) - alias for fields, same behavior
 * @param order          string (query, optional) - sort order; prefix field with +
 *                                                  (ASC) or - (DESC); multiple
 *                                                  fields comma-separated
 * @param start          int (query, optional)    - index of the first record to
 *                                                  load, defaults to 0
 * @param limit          int (query, optional)    - number of records to retrieve
 *                                                  starting from start, defaults
 *                                                  to 50, allowed range: 0–100
 * @return List<ReplicaSoggettoEsterno> paginated list of external subjects
 *         in the replica model
 */
GET /soggettiEsterniReplica
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "soggEstId": 1, // External subject ID (primary key)
    "dipId": 123123, // Department ID
    "dipDes": "string", // Department description
    "cognome": "Rossi", // Last name
    "nome": "Mario", // First name
    "appellativo": "string", // Title/appellative
    "codFis": "string", // Tax code
    "sesso": "M", // Gender (F/M)
    "dataNascita": "01/01/1980", // Date of birth DD/MM/YYYY
    "tipoSoggEstCod": "D", // External subject type code
    "tipiSoggEstDes": "string", // External subject type description
    "dataIniAtt": "01/01/2020", // Activity start date DD/MM/YYYY
    "dataFinAtt": "02/02/2020", // Activity end date DD/MM/YYYY
    "sdrId": 123123, // SDR ID
    "strutSdrCod": "70017", // SDR structure code
    "strutSdrDes": "string", // SDR structure description
    "strutSdrTip": "ATE", // SDR structure type
    "tipiSdrDes": "Ateneo", // SDR type description
    "email": "string", // Email
    "naziNascId": 1, // Birth country ID
    "naziNascCod": "Z313", // Birth country code
    "naziNascDes": "SPAGNA", // Birth country name
    "naziNascCodInt": "221", // Birth country international code
    "comuNascId": 1374, // Birth municipality ID
    "comuNascCod": "string", // Birth municipality code
    "comuNascCodCatastale": "A944", // Birth municipality cadastral code
    "comuNascCodIstatMiur": "string", // Birth municipality ISTAT/MIUR code
    "comuNascDes": "Bologna", // Birth municipality name
    "comuNascSigla": "BO", // Birth municipality abbreviation
    "provNascDes": "Bologna", // Birth province description
    "cistraNasc": "Chicago", // Foreign birth city
    "cittCod": "200", // Citizenship code
    "cittadDes": "italia", // Citizenship description
    "tel": "051557788", // Phone number
    "prefixInternaz": "33", // International dialling prefix
    "fax": "051557788", // Fax number
    "cellulare": "string", // Mobile number
    "operCellulare": 3, // Mobile operator code
    "operCellulareDes": "VODAFONE", // Mobile operator description
    "usrInsId": "mrossi", // Insert user ID
    "dataIns": "01/01/2020", // Insert date DD/MM/YYYY
    "usrModId": "mrossi", // Last modified user ID
    "dataMod": "01/01/2020", // Last modified date DD/MM/YYYY
    "modInsDati": 3, // Data entry mode
    "persAteFlg": 1, // University person flag (0=no, 1=yes)
    "firmaId": 123, // Signature ID
    "nominativoAlt": "string", // Alternative name
    "idAb": 123, // U-Gov address book ID
    "consSmsFlg": 0, // SMS consent flag (0=no, 1=yes)
    "ateIdAccreditamento": 123, // Accreditation university ID
    "istatCod": "70033", // ISTAT code
    "ateneoDes": "string", // University description
    "userId": "1234", // User ID

    // Optional - request via fields=consensiSoggEsterni
    "consensiSoggEsterni": [
      {
        "soggEstId": 11238, // External subject ID (primary key)
        "tipoConsensoCod": "INPS", // Consent type code
        "tipoConsensoDes": "string", // Consent type description
        "tipiConsensoEtichetta": "string", // Consent label
        "consensoFlg": 1, // Consent flag (0=denied, 1=granted)
        "dataIni": "02-DIC-20", // Effective date
        "procAmmCod": "WREGAZI", // Administrative process code
        "procAmmDes": "string", // Administrative process description
        "usrInsId": "mrossi", // Insert user ID
        "dataIns": "01/01/2020", // Insert date DD/MM/YYYY
        "usrModId": "mrossi", // Last modified user ID
        "dataMod": "01/01/2020" // Last modified date DD/MM/YYYY
      }
    ],

    // Optional - request via fields=entiSoggEsterni
    "entiSoggEsterni": [
      {
        "soggEstId": 11238, // External subject ID (primary key)
        "enteId": 11238, // Entity ID (primary key)
        "des": "string", // Entity description
        "cod": "INPS", // Entity code
        "direttore": "string", // Director name
        "tipoEnteCod": "IS", // Entity type code
        "tipoEnteDes": "string", // Entity type description
        "settEnteCod": "SA", // Entity sector code
        "settEnteDes": "Sanitario", // Entity sector description
        "privatoFlg": 1, // Private entity flag (0=no, 1=yes)
        "link": "string", // Website URL
        "sdrId": 11238, // SDR ID
        "strutSdrCod": "70017", // SDR structure code
        "strutSdrDes": "string", // SDR structure description
        "strutSdrTip": "ATE", // SDR structure type
        "tipiSdrDes": "Ateneo", // SDR type description
        "statoEnteCod": "A", // Entity status code
        "statoEnteDes": "Accreditato", // Entity status description
        "fasciaDipCod": "0-5", // Employee range code
        "fasciaDipDes": "string", // Employee range description
        "desAtestra": "string", // Foreign university description
        "autPrivacyFlg": 1, // Privacy authorization flag (0=no, 1=yes)
        "usrInsId": "mrossi", // Insert user ID
        "dataIns": "01/01/2020", // Insert date DD/MM/YYYY
        "usrModId": "mrossi", // Last modified user ID
        "dataMod": "01/01/2020", // Last modified date DD/MM/YYYY
        "gruppoAppart": "string", // Belonging group
        "codiceAssociativo": "string", // Associative code
        "fatturato": "string", // Revenue
        "settAtecoId": 11238, // ATECO sector ID
        "settAtecoCod": "86", // ATECO sector code
        "settAtecoDes": "string", // ATECO sector description
        "profiloAziId": 1, // Company profile ID
        "profiloAziDes": "base", // Company profile description
        "codAtecoId": 1, // ATECO code ID
        "codAtecoDes": "string", // ATECO code description
        "duns": "ab1234567", // DUNS number
        "genOppEvidFlg": 1, // General opportunity highlight flag
        "crmCod": "86", // CRM code
        "associazioneInprenditoriale": "string", // Entrepreneurial association
        "crmSyncFlg": 1, // CRM sync flag (0=no, 1=yes)
        "regAziId": 1, // Company register ID
        "nota": "string", // Notes
        "prodotti": "string", // Products
        "lingueLavoro": "string", // Working languages
        "lingueLavoroGruppo": "string", // Group working languages
        "notaAzi": "string", // Company notes
        "responsabileProtdatiEmail": "string", // Data protection officer email

        // Optional - request via fields=entiSoggEsterni.sedi
        "sedi": [
          {
            "soggEstId": 11238, // External subject ID (primary key)
            "sediEntiEstId": 11238, // Entity branch ID
            "enteId": 11238, // Entity ID (primary key)
            "tipoSedeCod": "LEG", // Branch type code
            "tipoSedeDes": "Sede Legale", // Branch type description
            "des": "string", // Branch description
            "via": "via roma n 5", // Street address
            "cap": "40130", // Postal code
            "cF": "string", // Tax code
            "piva": "string", // VAT number
            "citstra": "Berlin", // Foreign city
            "comuneId": 4745, // Municipality ID
            "comuneCod": "string", // Municipality code
            "comuneCodCatastale": "F205", // Municipality cadastral code
            "comuneCodIstatMiur": "6758", // Municipality ISTAT/MIUR code
            "comuneDes": "Milano", // Municipality name
            "comuneSigla": "MI", // Municipality abbreviation
            "provDes": "Milano", // Province description
            "nazioneId": 1, // Country ID
            "nazieNascCod": "Z110.", // Country code
            "naziNascNazioneCod": "FR", // Country ISO code
            "naziNascCodInt": "215", // Country international code
            "numTel": "10935725", // Phone number
            "prefixInternaz": "39", // International dialling prefix
            "fax": "10935725", // Fax number
            "codSede": "erg", // Branch code
            "email": "string", // Email
            "emailVisWeb": 1, // Email web visibility (0=no, 1=yes)
            "iataCod": "BLQ", // IATA airport code
            "disattivaFlg": 1, // Deactivated flag (0=no, 1=yes)
            "pivaGruppo": "string", // Group VAT number
            "codiceSdi": "string", // SDI code
            "fraz": "string", // Hamlet/fraction
            "emailCertigficata": "string", // Certified email (PEC)
            "cig": "string", // CIG code
            "cup": "string", // CUP code
            "ipa": "string", // IPA code
            "splitpayementFlg": 1 // Split payment flag (0=no, 1=yes)
          }
        ]
      }
    ],

    // Optional - request via fields=soggEstAlias
    "soggEstAlias": [
      {
        "alias": "alias1234", // Alias value
        "aliasId": 1234, // Alias ID
        "dataScadenza": "10/12/2022", // Expiry date DD/MM/YYYY
        "usrInsId": "user1234", // Insert user ID
        "dataIns": "10/12/2022", // Insert date DD/MM/YYYY
        "usrModId": "user1243", // Last modified user ID
        "dataMod": "10/12/2022", // Last modified date DD/MM/YYYY
        "tipologia": "string" // Alias type
      }
    ],

    // Optional - request via fields=soggEstProfili
    "soggEstProfili": [
      {
        "codiceFiscale": "string", // Tax code
        "soggEstId": 1, // External subject ID (primary key)
        "userId": "user1234", // User ID
        "grpName": "Administrator", // Group name
        "profiloExtCod": "string", // External profile code
        "profiloExtDes": "string", // External profile description
        "profiloCodExt": "string" // Profile external code
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /soggettiEsterniReplica/{soggEstId}` - Get single external subject (replica model)

```java
/**
 * Returns the full replica model record of a specific external subject,
 * identified by soggEstId. Optional nested objects can be requested via
 * optionalFields. Returns a single object instead of an array.
 *
 * @param soggEstId      int (path, required)     - external subject ID
 * @param optionalFields string (query, optional) - optional field groups to
 *                                                  include; use ALL for all;
 *                                                  available: consensiSoggEsterni,
 *                                                  entiSoggEsterni,
 *                                                  entiSoggEsterni.sedi,
 *                                                  soggEstAlias, soggEstProfili;
 *                                                  supports Ant Glob Patterns
 * @return ReplicaSoggettoEsterno the external subject replica record
 */
GET /soggettiEsterniReplica/{soggEstId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`** - Returns a single `ReplicaSoggettoEsterno` object. The response structure is identical to [`GET /soggettiEsterniReplica`](#get-soggettiesternareplica----get-external-subjects-replica-model) but returns a single object instead of an array.

```json
{
  "soggEstId": 1 // External subject ID (primary key)
  // ... same fields as GET /soggettiEsterniReplica
}
```

> See [`GET /soggettiEsterniReplica`](#get-soggettiesternareplica----get-external-subjects-replica-model) for the full field list, optional nested objects, and their descriptions.

<br>

---

<br>

## Endpoints - Authorized (Autorizzati)

### `GET /tutori/regoleRichiesta` - Get guardian request rules

```java
/**
 * Returns the list of guardian request rules configured in ESSE3,
 * including rule details such as kinship types, minimum and maximum
 * number of guardians per rule, and web visibility settings.
 *
 * @param none
 * @return List<TestataRegoleTutori> list of guardian request rules on success,
 *         DettaglioErrore on failure
 */
GET /tutori/regoleRichiesta
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "regTutoriTstId": 1, // Guardian rule header ID (primary key)
    "cod": "MONOGEN", // Rule code
    "des": "Monogentioriale", // Rule description
    "etichetta": "string", // Rule label
    "nota": "string", // Notes
    "visWebFlg": 0, // Web visibility flag (0=no, 1=yes)
    "usrInsId": "Administrator", // Insert user ID
    "usrModId": "Administrator", // Last modified user ID
    "dataIns": "01/07/2022", // Insert date DD/MM/YYYY
    "dataMod": "01/07/2022", // Last modified date DD/MM/YYYY
    "dettaglio": [
      {
        "regTutoriDettId": 1, // Rule detail ID
        "regTutoriTstId": 1, // Guardian rule header ID
        "cod": "GEN", // Detail code
        "des": "Genitore", // Detail description
        "etichetta": "string", // Detail label
        "nota": "string", // Notes
        "tipoParCod": "P", // Kinship type code
        "tipoParDes": "Padre", // Kinship type description
        "nMin": 0, // Minimum number of guardians of this type
        "nMax": 9, // Maximum number of guardians of this type
        "visWebFlg": 0, // Web visibility flag (0=no, 1=yes)
        "usrInsId": "Administrator", // Insert user ID
        "usrModId": "Administrator", // Last modified user ID
        "dataIns": "01/07/2022", // Insert date DD/MM/YYYY
        "dataMod": "01/07/2022" // Last modified date DD/MM/YYYY
      }
    ]
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

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

- **Swagger UI:** [Anagrafica Api V2 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Anagrafica%20Api%20V2%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fanagrafica-service-v2)>)
- **Spec YAML:** [p01-anagraficaApiV2.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p01-anagraficaApiV2.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
