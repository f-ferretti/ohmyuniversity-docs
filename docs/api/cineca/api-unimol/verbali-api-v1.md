---
title: Verbali API V1 | OhMyUniversity!
description: REST API documentation for the Verbali service (verbali-service-v1) - visualization and external import of exam records in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Verbali API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Verbali service (verbali-service-v1) - visualization and external import of exam records in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/verbali-api-v1
  - - meta
    - name: keywords
      content: verbali api, exam records api, esse3 rest api, cineca api, ohmyuniversity api, verbale, lotto, batch, import verbali, verbalizzazione
  - - meta
    - name: twitter:title
      content: Verbali API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Verbali service (verbali-service-v1) - visualization and external import of exam records in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Verbali API V1

**ENG:** `Exam Records`

**Version:** `1.0.0` · **Base URL:** `/verbali-service-v1`

REST API for visualizing exam records and importing them from external systems into ESSE3.

---

## Nomenclature

| Term      | Description                                                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `VERBALE` | The individual exam record containing the outcome for a single student                                                                    |
| `LOTTO`   | A grouping of records by generation moment - e.g. all records for students enrolled in a given exam session                               |
| `BATCH`   | A grouping of records by acquisition moment from an external system - e.g. a lotto can be imported in multiple batches at different times |

---

## Import modes

Two approaches are available when importing records:

- **Update (`AGG`)** - Records already exist in the system (generated via the ESSE3 _Stampa verbali_ function). They can be linked to a specific student booking (nominal record) or include student details directly (anonymous record). The record number must be provided. Once updated, the same record number cannot be updated again.
- **Insert (`INS`)** - Records do not yet exist in the system. Each call with the same data creates a new record with a different number. Student data and exam outcome details must be provided.

---

## Import workflow

The import process is split into two steps - the first is mandatory, the second is optional.

1. **Upload record metadata** - Call `PUT /batches` with a JSON body containing batch info and an array of record metadata. Each record can optionally request a blob upload (the image of the physical record) by specifying the filename. The response includes an `uploadUrl` for each record that requires a blob. Records with a pending blob have `stato_warn = 1` (warning pending unlock) and `warn_num = 1` (missing record image). Acquisition is blocked until either step 2 is completed or the warning is manually unlocked from ESSE3's _Acquisizione verbali_.
2. **Upload record blobs** - Use the `uploadUrl` from step 1 and call `PUT /batches/upload/{uploadId}/blob` to upload the binary file. Once the blob is successfully uploaded, the acquisition lock is released and the upload URL is invalidated.
   ::: warning
   Skipping the blob upload does NOT block the import entirely - acquisition can also be unblocked manually from ESSE3. However, records will remain in a warning state until one of the two paths is completed.
   :::

---

## Changelog

| Version | ESSE3 Release | Changes       |
| ------- | ------------- | ------------- |
| 1.0.0   | 20.01.00.00   | First release |

---

## Endpoints - Batch (Batch)

### `GET /batches` - Get import batch list

```java
/**
 * Returns the list of import batches, optionally filtered by teaching
 * activity, degree course, and verbalization date range.
 *
 * @param adCod   string  (query, optional) - teaching activity code of the batch
 * @param cdsCod  string  (query, optional) - degree course code of the batch
 * @param daData  string  (query, optional) - lower bound for verbalization date
 * @param aData   string  (query, optional) - upper bound for verbalization date
 * @param start   int     (query, optional) - index of the first record to load,
 *                                            defaults to 0
 * @param limit   int     (query, optional) - number of records to retrieve
 *                                            starting from start, defaults to 50,
 *                                            allowed range: 0–100
 * @param order   string  (query, optional) - sort order; prefix + (ASC) or -
 *                                            (DESC) followed by field name;
 *                                            multiple fields comma-separated
 *                                            (e.g. +dataAcq,-adCod)
 * @return List<BatchVerb> paginated list of import batches,
 *         or an empty array if none match the filters
 */
GET /batches
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "batchId": 22, // Batch ID (primary key)
    "batchNum": 22, // Batch number
    "des": "string", // Batch description
    "adId": 123, // Teaching activity ID
    "adCod": "AD1_COD", // Teaching activity code
    "adDes": "string", // Teaching activity description
    "cdsId": 123, // Degree course ID
    "cdsCod": "AD1_COD", // Degree course code
    "cdsDes": "string", // Degree course description
    "dataAcq": "string", // Acquisition date (dd/MM/yyyy)
    "dataApp": "string" // Exam session date (dd/MM/yyyy)
  }
]
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

<br>

---

<br>

### `POST /batches` - Import exam records

```java
/**
 * Imports exam record metadata into ESSE3. The body must specify the import
 * type and populate the corresponding record list accordingly.
 * Each call in INS mode always creates new records, even with identical data.
 * In AGG mode, records must already exist and can only be updated once.
 *
 * @param body object (body, required) - import payload containing:
 *               - tipo          string              - import type: INS (insert)
 *                                                     or AGG (update)
 *               - nomeFileBatch string (optional)   - batch file name
 *               - batchNum      int    (optional)   - batch number
 *               - verbaliInserimento  array (INS)   - records to insert;
 *                                                     required fields: matricola,
 *                                                     dataEsa, dataApp, voto,
 *                                                     causale, adStuCod, cdsStuCod;
 *                                                     optional: blobFileName,
 *                                                     correzioni, campiAggiuntivi
 *               - verbaliAggiornamento array (AGG)  - records to update;
 *                                                     required: lottoId, verbId
 *                                                     or verbNum; optional: all
 *                                                     other fields
 * @return RisultatoImportVerbali import result with corrected batches,
 *         failed records, and elaboration log
 */
POST /batches
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

### Exam outcome values

| Outcome               | `voto`   | `causale` |
| --------------------- | -------- | --------- |
| Numeric grade         | `<voto>` | `null`    |
| `IDONEO`              | `999`    | `null`    |
| `NON IDONEO`          | `-1`     | `null`    |
| `INSUFFICIENTE`       | `994`    | `null`    |
| `SUFFICIENTE`         | `998`    | `null`    |
| `DISCRETO`            | `997`    | `null`    |
| `BUONO`               | `996`    | `null`    |
| `OTTIMO`              | `995`    | `null`    |
| `ASSENTE`             | `0`      | `2`       |
| `RITIRATO / RESPINTO` | `0`      | `1`       |

> Full list available in the ESSE3 `tipi_Giudizio` table - fields `verbale_decode_voto` and `verbale_decode_causale`.

### Correction fields (`correzioni[].campo`)

| `campo`    | Description                   |
| ---------- | ----------------------------- |
| `NOME`     | Student first name            |
| `COGNOME`  | Student last name             |
| `MAT`      | Student ID number             |
| `VOTO`     | Exam grade                    |
| `CAUSALE`  | Non-verbalization reason      |
| `NUMERO`   | Record number                 |
| `AD_COD`   | Teaching activity code        |
| `AD_DES`   | Teaching activity description |
| `DATA_APP` | Exam session date             |
| `DATA_ESA` | Exam date                     |

> Full list of correctable fields available in the ESSE3 `TIPI_VERB_CAMPO_LOG` table.

#### Request body

```json
{
  "nomeFileBatch": "batch", // Batch file name (optional)
  "batchNum": 111, // Batch number (optional)
  "tipo": "INS", // Import type: INS or AGG
  "verbaliInserimento": [
    // Populate for INS mode
    {
      "matricola": "10-MAT", // Student ID (required)
      "dataEsa": "10/10/2018", // Exam date dd/MM/yyyy (required)
      "dataApp": "10/10/2018", // Session date dd/MM/yyyy (required)
      "voto": 10, // Grade (required, see outcome table)
      "causale": 10, // Outcome reason (required, see outcome table)
      "blobFileName": "img.tif", // Record image filename (optional)
      "correzioni": [
        // External system corrections (optional)
        {
          "campo": "dataEsa", // Corrected field (see correction fields)
          "valoreVecchio": "string", // Previous value
          "valoreNuovo": "string", // New value
          "dataModifica": "10/10/2018", // Correction date dd/MM/yyyy
          "utente": "m.rossi" // Operator who made the correction
        }
      ],
      "campiAggiuntivi": [
        // Additional fields as key-value pairs (optional)
        {
          "nome": "key",
          "valore": "value"
        }
      ],
      "adStuCod": "AD_STU_COD", // Student teaching activity code (required)
      "cdsStuCod": "CDS_STU_COD" // Student degree course code (required)
    }
  ],
  "verbaliAggiornamento": [
    // Populate for AGG mode
    {
      "matricola": "10-MAT", // Student ID
      "dataEsa": "10/10/2018", // Exam date dd/MM/yyyy
      "dataApp": "10/10/2018", // Session date dd/MM/yyyy
      "voto": 10, // Grade (see outcome table)
      "causale": 10, // Outcome reason (see outcome table)
      "blobFileName": "img.tif", // Record image filename (optional)
      "correzioni": [], // External system corrections (optional)
      "campiAggiuntivi": [], // Additional fields as key-value pairs (optional)
      "lottoId": 123, // Batch lot ID (primary key)
      "verbId": 1, // Record ID (primary key)
      "verbNum": "00000123 0001 3", // Record number (alternative to lottoId+verbId)
      "cognome": "rossi", // Student last name
      "nome": "mario", // Student first name
      "adCod": "AD_COD", // Teaching activity code
      "cdsCod": "CDS_COD", // Degree course code
      "adDes": "AD_DES", // Teaching activity description
      "cdsDes": "CDS_DES" // Degree course description
    }
  ]
}
```

#### Response

**`201 Created`**

```json
{
  "esito": true, // Overall import outcome
  "batchCorretti": [
    // Successfully imported batches
    {
      "batchId": 22, // Batch ID (primary key)
      "batchNum": 22, // Batch number
      "des": "string", // Batch description
      "adId": 123, // Teaching activity ID
      "adCod": "AD1_COD", // Teaching activity code
      "adDes": "string", // Teaching activity description
      "cdsId": 123, // Degree course ID
      "cdsCod": "AD1_COD", // Degree course code
      "cdsDes": "string", // Degree course description
      "dataAcq": "string", // Acquisition date dd/MM/yyyy
      "dataApp": "string", // Session date dd/MM/yyyy
      "verbali": [
        {
          "lottoId": 123, // Lot ID (primary key)
          "verbId": 1, // Record ID (primary key)
          "batchId": 1, // Batch ID
          "stuId": 2, // Student ID
          "matId": 3, // Enrollment ID
          "appId": 4, // Exam session ID
          "appLogId": 4, // Exam session log ID
          "verbNum": "string", // Record number
          "statoVerbale": 4, // Record status
          "errNum": 17, // Error code
          "statoWarn": 2, // Warning status (1 = pending unlock)
          "warnNum": 1, // Warning code (1 = missing blob)
          "tipoVerbCod": "string", // Record type code
          "lottoCollId": 0, // Linked lot ID
          "verbCollId": 0, // Linked record ID
          "matricola": "MAT-123", // Student ID number
          "nome": "ROSSI", // Student first name
          "cognome": "MARIO", // Student last name
          "adId": 123, // Teaching activity ID
          "adCod": "AD1_COD", // Teaching activity code
          "adDes": "string", // Teaching activity description
          "cdsId": 123, // Degree course ID
          "cdsCod": "CDS1_COD", // Degree course code
          "cdsDes": "string", // Degree course description
          "adStuId": 123, // Student teaching activity ID
          "adStuCod": "string", // Student teaching activity code
          "adStuDes": "string", // Student teaching activity description
          "cdsStuId": 123, // Student degree course ID
          "cdsStuCod": "string", // Student degree course code
          "cdsStuDes": "string", // Student degree course description
          "voto": 18, // Grade
          "causale": 1, // Outcome reason
          "dataEsa": "string", // Exam date dd/MM/yyyy
          "dataApp": "string", // Session date dd/MM/yyyy
          "livelloUscitaLinguaCod": "B1", // Language exit level code
          "tipoSvolgimentoEsameCod": "P", // Exam mode code
          "imgId": 0, // Image ID
          "uploadUrl": "string" // Blob upload URL (present if blob pending)
        }
      ]
    }
  ],
  "verbaliErrati": [
    // Records that failed import
    {
      "risultatoImport": false, // Import outcome for this record
      "risultatoImportErrMsg": "string" // Import error message
      // ... same fields as verbali above
    }
  ],
  "logElaborazione": ["string"] // Elaboration log lines
}
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

<br>

---

<br>

### `PUT /batches/upload/{uploadId}/blob` - Upload exam record image

```java
/**
 * Uploads the binary image of an exam record. The upload URL is provided
 * in the uploadUrl field of the POST /batches response for records that
 * requested a blob upload.
 *
 * Once the upload completes successfully, the system automatically:
 * 1. Updates the blob on the record
 * 2. Releases the blob warning lock (warnNum = 1)
 * 3. Triggers the record acquisition
 *
 * @param uploadId   long (path, required)     - upload ID returned in uploadUrl
 *                                               from POST /batches response
 * @param uploadFile file (formData, optional) - binary image of the exam record
 * @return string confirmation message, or 422 if parameters are invalid
 */
PUT /batches/upload/{uploadId}/blob
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
"string" // Confirmation message
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /batches/{batchId}` - Get import batch by ID

```java
/**
 * Returns the details of a specific import batch, including the full
 * list of associated exam records.
 *
 * @param batchId long (path, required) - ID of the batch to retrieve
 * @return BatchVerb the batch with its associated records,
 *         or 404 if not found
 */
GET /batches/{batchId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "batchId": 22, // Batch ID (primary key)
  "batchNum": 22, // Batch number
  "des": "string", // Batch description
  "adId": 123, // Teaching activity ID
  "adCod": "AD1_COD", // Teaching activity code
  "adDes": "string", // Teaching activity description
  "cdsId": 123, // Degree course ID
  "cdsCod": "AD1_COD", // Degree course code
  "cdsDes": "string", // Degree course description
  "dataAcq": "string", // Acquisition date (dd/MM/yyyy)
  "dataApp": "string", // Session date (dd/MM/yyyy)
  "verbali": [
    {
      "lottoId": 123, // Lot ID (primary key)
      "verbId": 1, // Record ID (primary key)
      "batchId": 1, // Batch ID
      "stuId": 2, // Student ID
      "matId": 3, // Enrollment ID
      "appId": 4, // Exam session ID
      "appLogId": 4, // Exam session log ID
      "verbNum": "string", // Record number
      "statoVerbale": 4, // Record status
      "errNum": 17, // Error code
      "statoWarn": 2, // Warning status (1 = pending unlock)
      "warnNum": 1, // Warning code (1 = missing blob)
      "tipoVerbCod": "string", // Record type code
      "lottoCollId": 0, // Linked lot ID
      "verbCollId": 0, // Linked record ID
      "matricola": "MAT-123", // Student ID number
      "nome": "ROSSI", // Student first name
      "cognome": "MARIO", // Student last name
      "adId": 123, // Teaching activity ID
      "adCod": "AD1_COD", // Teaching activity code
      "adDes": "string", // Teaching activity description
      "cdsId": 123, // Degree course ID
      "cdsCod": "CDS1_COD", // Degree course code
      "cdsDes": "string", // Degree course description
      "adStuId": 123, // Student teaching activity ID
      "adStuCod": "string", // Student teaching activity code
      "adStuDes": "string", // Student teaching activity description
      "cdsStuId": 123, // Student degree course ID
      "cdsStuCod": "string", // Student degree course code
      "cdsStuDes": "string", // Student degree course description
      "voto": 18, // Grade
      "causale": 1, // Outcome reason
      "dataEsa": "string", // Exam date (dd/MM/yyyy)
      "dataApp": "string", // Session date (dd/MM/yyyy)
      "livelloUscitaLinguaCod": "B1", // Language exit level code
      "tipoSvolgimentoEsameCod": "P", // Exam mode code
      "imgId": 0, // Image ID
      "uploadUrl": "string" // Blob upload URL (present if blob pending)
    }
  ]
}
```

<br>

---

<br>

## Endpoints - Record Lot (Lotto)

### `GET /lotti` - Get exam record lots

```java
/**
 * Returns the list of lots present in the system, optionally filtered
 * by student, teacher, verbalization type, status, teaching activity,
 * degree course, and date range.
 *
 * @param matricolaStu   string (query, optional) - student ID number
 * @param codFisStu      string (query, optional) - student fiscal code
 * @param matricolaDoc   string (query, optional) - teacher ID number
 * @param codFisDoc      string (query, optional) - teacher fiscal code
 * @param tipoGestAppCod string (query, optional) - verbalization type code
 *                                                   assigned to the lot
 * @param statoLotto     string (query, optional) - lot status
 * @param adCod          string (query, optional) - teaching activity code
 * @param cdsCod         string (query, optional) - degree course code
 * @param daData         string (query, optional) - lower bound for verbalization date
 * @param aData          string (query, optional) - upper bound for verbalization date
 * @param start          int    (query, optional) - index of the first record to load,
 *                                                   defaults to 0
 * @param limit          int    (query, optional) - number of records to retrieve
 *                                                   starting from start, defaults
 *                                                   to 50, allowed range: 0–100
 * @param fields         string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns for nested objects
 *                                                   (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @param order          string (query, optional) - sort order; prefix + (ASC) or -
 *                                                   (DESC) followed by field name;
 *                                                   multiple fields comma-separated
 *                                                   (e.g. +dataApp,-adCod)
 * @return List<Lotto> paginated list of lots, or an empty array if none match
 */
GET /lotti
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent` - low-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "lottoId": 123, // Lot ID (primary key)
    "adId": 123, // Teaching activity ID
    "adCod": "AD1_COD", // Teaching activity code
    "adDes": "string", // Teaching activity description
    "cdsId": 123, // Degree course ID
    "cdsCod": "AD1_COD", // Degree course code
    "cdsDes": "string", // Degree course description
    "tipoGestAppCod": "STD", // Verbalization type code
    "statoLotto": "P", // Lot status code
    "statoLottoDes": "Preview", // Lot status description
    "dataApp": "string", // Session date (dd/MM/yyyy)
    "docenteId": 123, // Teacher ID
    "docenteNome": "Mario", // Teacher first name
    "docenteCognome": "Rossi", // Teacher last name
    "docenteCodFis": "string", // Teacher fiscal code
    "linguaId": 123, // Language ID
    "linguaCod": "eng", // ISO 639-2 language code
    "motivoRifirma": "string", // Re-signing reason
    "progRifirma": 1 // Re-signing progress number
  }
]
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /lotti/{lottoId}` - Get lot by ID

```java
/**
 * Returns the full details of a specific lot, including its commission
 * members and optionally its state transition history.
 *
 * @param lottoId        long   (path, required)  - lot ID to retrieve
 * @param fields         string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns for nested objects
 *                                                   (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @param optionalFields string (query, optional) - same as fields; alternative
 *                                                   parameter for optional field
 *                                                   selection
 * @return LottoConDettagli lot details with commission and state transitions,
 *         or 404 if not found
 */
GET /lotti/{lottoId}
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent` - low-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "lottoId": 123, // Lot ID (primary key)
    "adId": 123, // Teaching activity ID
    "adCod": "AD1_COD", // Teaching activity code
    "adDes": "string", // Teaching activity description
    "cdsId": 123, // Degree course ID
    "cdsCod": "AD1_COD", // Degree course code
    "cdsDes": "string", // Degree course description
    "tipoGestAppCod": "STD", // Verbalization type code
    "statoLotto": "P", // Lot status code
    "statoLottoDes": "Preview", // Lot status description
    "dataApp": "string", // Session date (dd/MM/yyyy)
    "docenteId": 123, // Teacher ID
    "docenteNome": "Mario", // Teacher first name
    "docenteCognome": "Rossi", // Teacher last name
    "docenteCodFis": "string", // Teacher fiscal code
    "linguaId": 123, // Language ID
    "linguaCod": "eng", // ISO 639-2 language code
    "motivoRifirma": "string", // Re-signing reason
    "progRifirma": 1, // Re-signing progress number
    "commissione": [
      {
        "lottoId": 123, // Lot ID (primary key)
        "docenteId": 11, // Commission member teacher ID (primary key)
        "nome": "Mario", // Member first name
        "cognome": "Rossi", // Member last name
        "codFis": "string", // Member fiscal code
        "ruoloCod": "P", // Role code
        "ruoloDes": "Presidente", // Role description
        "ordineVisNum": "P" // Display order number
      }
    ],
    "transizioniStato": [
      // State transition history (optional field)
      {
        "lottoTransStatoId": 11, // Transition ID (primary key)
        "lottoId": 123, // Lot ID
        "statoLottoOld": "G", // Previous status code
        "statoLottoNew": "S", // New status code
        "statoLottoOldDes": "string", // Previous status description
        "statoLottoNewDes": "string", // New status description
        "dataIns": "string" // Transition timestamp
      }
    ]
  }
]
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /lotti/{lottoId}/verbali` - Get records by lot

```java
/**
 * Returns the list of exam records belonging to a specific lot,
 * including student, grade, and status details. Modification history
 * is available as an optional field.
 *
 * @param lottoId        long   (path, required)  - lot ID to retrieve records for
 * @param filter         string (query, optional) - RSQL filter expression applied
 *                                                   after data retrieval
 * @param fields         string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns for nested objects
 *                                                   (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @param optionalFields string (query, optional) - same as fields; alternative
 *                                                   parameter for optional field
 *                                                   selection
 * @return List<VerbaleConDettagli> list of exam records for the lot,
 *         or an empty array if none are found
 */
GET /lotti/{lottoId}/verbali
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "lottoId": 123, // Lot ID (primary key)
    "verbId": 1, // Record ID (primary key)
    "batchId": 1, // Batch ID
    "stuId": 2, // Student ID
    "matId": 3, // Enrollment ID
    "appId": 4, // Exam session ID
    "appLogId": 4, // Exam session log ID
    "verbNum": "string", // Record number
    "statoVerbale": 4, // Record status
    "errNum": 17, // Error code
    "statoWarn": 2, // Warning status (1 = pending unlock)
    "warnNum": 1, // Warning code (1 = missing blob)
    "tipoVerbCod": "string", // Record type code
    "tipoVerbDes": "string", // Record type description
    "lottoCollId": 0, // Linked lot ID
    "verbCollId": 0, // Linked record ID
    "matricola": "MAT-123", // Student ID number
    "nome": "ROSSI", // Student first name
    "cognome": "MARIO", // Student last name
    "codFis": "string", // Student fiscal code
    "adId": 123, // Teaching activity ID
    "adCod": "AD1_COD", // Teaching activity code
    "adDes": "string", // Teaching activity description
    "cdsId": 123, // Degree course ID
    "cdsCod": "CDS1_COD", // Degree course code
    "cdsDes": "string", // Degree course description
    "adStuId": 123, // Student teaching activity ID
    "adStuCod": "string", // Student teaching activity code
    "adStuDes": "string", // Student teaching activity description
    "cdsStuId": 123, // Student degree course ID
    "cdsStuCod": "string", // Student degree course code
    "cdsStuDes": "string", // Student degree course description
    "voto": 18, // Grade
    "causale": 1, // Outcome reason
    "esito": "30 e lode", // Outcome description
    "dataEsa": "string", // Exam date (dd/MM/yyyy)
    "dataApp": "string", // Session date (dd/MM/yyyy)
    "livelloUscitaLinguaCod": "B1", // Language exit level code
    "tipoSvolgimentoEsameCod": "P", // Exam mode code
    "imgId": 0, // Image ID
    "applistaId": 44, // Exam booking ID
    "adsceId": 4, // Student curriculum activity ID
    "adregId": 4, // Regulated activity ID
    "cfu": 10, // Credits
    "domandeEsame": "string", // Exam questions
    "errDes": "string", // Error description
    "warnDes": "string", // Warning description
    "docenteMatricola": "MAT-123", // Teacher ID number
    "docenteCodFis": "string", // Teacher fiscal code
    "docenteNome": "ROSSI", // Teacher first name
    "docenteCognome": "MARIO", // Teacher last name
    "modifiche": [
      // Modification history (optional field)
      {
        "lottoId": 123, // Lot ID (primary key)
        "verbId": 1, // Record ID (primary key)
        "verbOrigLogId": 2, // Modification origin log ID
        "verbOrigLogDes": "string", // Modification origin description
        "origineLogCod": "STATO", // Modification origin code
        "valoreVecchio": "3", // Previous value
        "valoreNuovo": "4", // New value
        "dataIns": "string", // Modification date (dd/MM/yyyy)
        "usrInsId": "m.rossi" // User who made the modification
      }
    ]
  }
]
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /lotti/{lottoId}/verbali/{verbId}` - Get record by ID

```java
/**
 * Returns the full details of a specific exam record within a lot.
 * Modification history is available as an optional field.
 *
 * @param lottoId        long   (path, required)  - lot ID the record belongs to
 * @param verbId         long   (path, required)  - record ID to retrieve
 * @param fields         string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns for nested objects
 *                                                   (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @param optionalFields string (query, optional) - same as fields; alternative
 *                                                   parameter for optional field
 *                                                   selection
 * @return VerbaleConDettagli the exam record with its details,
 *         or 404 if not found
 */
GET /lotti/{lottoId}/verbali/{verbId}
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "lottoId": 123, // Lot ID (primary key)
  "verbId": 1, // Record ID (primary key)
  "batchId": 1, // Batch ID
  "stuId": 2, // Student ID
  "matId": 3, // Enrollment ID
  "appId": 4, // Exam session ID
  "appLogId": 4, // Exam session log ID
  "verbNum": "string", // Record number
  "statoVerbale": 4, // Record status
  "errNum": 17, // Error code
  "statoWarn": 2, // Warning status (1 = pending unlock)
  "warnNum": 1, // Warning code (1 = missing blob)
  "tipoVerbCod": "string", // Record type code
  "tipoVerbDes": "string", // Record type description
  "lottoCollId": 0, // Linked lot ID
  "verbCollId": 0, // Linked record ID
  "matricola": "MAT-123", // Student ID number
  "nome": "ROSSI", // Student first name
  "cognome": "MARIO", // Student last name
  "codFis": "string", // Student fiscal code
  "adId": 123, // Teaching activity ID
  "adCod": "AD1_COD", // Teaching activity code
  "adDes": "string", // Teaching activity description
  "cdsId": 123, // Degree course ID
  "cdsCod": "CDS1_COD", // Degree course code
  "cdsDes": "string", // Degree course description
  "adStuId": 123, // Student teaching activity ID
  "adStuCod": "string", // Student teaching activity code
  "adStuDes": "string", // Student teaching activity description
  "cdsStuId": 123, // Student degree course ID
  "cdsStuCod": "string", // Student degree course code
  "cdsStuDes": "string", // Student degree course description
  "voto": 18, // Grade
  "causale": 1, // Outcome reason
  "esito": "30 e lode", // Outcome description
  "dataEsa": "string", // Exam date (dd/MM/yyyy)
  "dataApp": "string", // Session date (dd/MM/yyyy)
  "livelloUscitaLinguaCod": "B1", // Language exit level code
  "tipoSvolgimentoEsameCod": "P", // Exam mode code
  "imgId": 0, // Image ID
  "applistaId": 44, // Exam booking ID
  "adsceId": 4, // Student curriculum activity ID
  "adregId": 4, // Regulated activity ID
  "cfu": 10, // Credits
  "domandeEsame": "string", // Exam questions
  "errDes": "string", // Error description
  "warnDes": "string", // Warning description
  "docenteMatricola": "MAT-123", // Teacher ID number
  "docenteCodFis": "string", // Teacher fiscal code
  "docenteNome": "ROSSI", // Teacher first name
  "docenteCognome": "MARIO", // Teacher last name
  "modifiche": [
    // Modification history (optional field)
    {
      "lottoId": 123, // Lot ID (primary key)
      "verbId": 1, // Record ID (primary key)
      "verbOrigLogId": 2, // Modification origin log ID
      "verbOrigLogDes": "string", // Modification origin description
      "origineLogCod": "STATO", // Modification origin code
      "valoreVecchio": "3", // Previous value
      "valoreNuovo": "4", // New value
      "dataIns": "string", // Modification date (dd/MM/yyyy)
      "usrInsId": "m.rossi" // User who made the modification
    }
  ]
}
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

<br>

---

<br>

## Endpoints - Exam Records (Verbale)

::: info Already documented endpoints
The following endpoints are also accessible under the `lotto` tag and are already documented in that section:

- [`GET /lotti/{lottoId}/verbali`](#get-lotti-lottoid-verbali-get-records-by-lot)
- [`GET /lotti/{lottoId}/verbali/{verbId}`](#get-lotti-lottoid-verbali-verbid-get-record-by-id)
  :::

### `GET /verbali` - Get exam records

```java
/**
 * Returns the list of exam records for a specific student.
 * Either matricolaStu or codFisStu is required; all other filters
 * are optional.
 *
 * @param matricolaStu string (query, required*) - student ID number
 * @param codFisStu    string (query, required*) - student fiscal code
 * @param matricolaDoc string (query, optional) - teacher ID number
 * @param codFisDoc    string (query, optional) - teacher fiscal code
 * @param statoVerbale string (query, optional) - record status
 * @param adCod        string (query, optional) - teaching activity code
 * @param cdsCod       string (query, optional) - degree course code
 * @param adStuCod     string (query, optional) - student teaching activity code
 * @param cdsStuCod    string (query, optional) - student degree course code
 * @param daData       string (query, optional) - lower bound for verbalization date
 * @param aData        string (query, optional) - upper bound for verbalization date
 * @param start        int    (query, optional) - index of the first record to load,
 *                                                defaults to 0
 * @param limit        int    (query, optional) - number of records to retrieve
 *                                                starting from start, defaults
 *                                                to 50, allowed range: 0–100
 * @param order        string (query, optional) - sort order; prefix + (ASC) or -
 *                                                (DESC) followed by field name;
 *                                                multiple fields comma-separated
 *                                                (e.g. +dataEsa,-adCod)
 * @return List<VerbaleRoot> paginated list of exam records,
 *         or an empty array if none match the filters
 */
GET /verbali
```

> \* At least one of `matricolaStu` or `codFisStu` is required.

**Auth:** `UTENTE_TECNICO` · `DOCENTE` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent` - low-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "lottoId": 123, // Lot ID (primary key)
    "verbId": 1, // Record ID (primary key)
    "batchId": 1, // Batch ID
    "stuId": 2, // Student ID
    "matId": 3, // Enrollment ID
    "appId": 4, // Exam session ID
    "appLogId": 4, // Exam session log ID
    "verbNum": "string", // Record number
    "statoVerbale": 4, // Record status
    "errNum": 17, // Error code
    "statoWarn": 2, // Warning status (1 = pending unlock)
    "warnNum": 1, // Warning code (1 = missing blob)
    "tipoVerbCod": "string", // Record type code
    "tipoVerbDes": "string", // Record type description
    "lottoCollId": 0, // Linked lot ID
    "verbCollId": 0, // Linked record ID
    "matricola": "MAT-123", // Student ID number
    "nome": "ROSSI", // Student first name
    "cognome": "MARIO", // Student last name
    "codFis": "string", // Student fiscal code
    "adId": 123, // Teaching activity ID
    "adCod": "AD1_COD", // Teaching activity code
    "adDes": "string", // Teaching activity description
    "cdsId": 123, // Degree course ID
    "cdsCod": "CDS1_COD", // Degree course code
    "cdsDes": "string", // Degree course description
    "adStuId": 123, // Student teaching activity ID
    "adStuCod": "string", // Student teaching activity code
    "adStuDes": "string", // Student teaching activity description
    "cdsStuId": 123, // Student degree course ID
    "cdsStuCod": "string", // Student degree course code
    "cdsStuDes": "string", // Student degree course description
    "voto": 18, // Grade
    "causale": 1, // Outcome reason
    "esito": "30 e lode", // Outcome description
    "dataEsa": "string", // Exam date (dd/MM/yyyy)
    "dataApp": "string", // Session date (dd/MM/yyyy)
    "livelloUscitaLinguaCod": "B1", // Language exit level code
    "tipoSvolgimentoEsameCod": "P", // Exam mode code
    "imgId": 0, // Image ID
    "applistaId": 44, // Exam booking ID
    "adsceId": 4, // Student curriculum activity ID
    "adregId": 4, // Regulated activity ID
    "cfu": 10, // Credits
    "domandeEsame": "string", // Exam questions
    "errDes": "string", // Error description
    "warnDes": "string", // Warning description
    "docenteMatricola": "MAT-123", // Teacher ID number
    "docenteCodFis": "string", // Teacher fiscal code
    "docenteNome": "ROSSI", // Teacher first name
    "docenteCognome": "MARIO" // Teacher last name
  }
]
```

**`422 Unprocessable Entity`** - invalid parameters

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace", // Error type
      "value": "string", // Error message
      "rawValue": "string" // Raw error (JSON)
    }
  ]
}
```

---

## References

- **Swagger UI:** [Verbali Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Verbali%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fverbali-service-v1)#/>)
- **Spec YAML:** [p11-verbaliApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p11-verbaliApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
