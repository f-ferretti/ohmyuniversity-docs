---
title: Concorsi API V1 | OhMyUniversity!
description: REST API documentation for the Concorsi service (concorsi-service-v2) - CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Concorsi API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Concorsi service (concorsi-service-v2) - CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/concorsi-api-v2
  - - meta
    - name: keywords
      content: concorsi v2 api, esse3 rest api, cineca api, ohmyuniversity api, concorsi-service-v2
  - - meta
    - name: twitter:title
      content: Concorsi API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Concorsi service (concorsi-service-v2) - CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Concorsi API V1

**ENG:** `Competitions`

**Version:** `1.0.0` · **Base URL:** `/concorsi-service-v2`

ESSE3 REST API to access competition structures. The services allow retrieving competition configurations, retrieving enrollments, rankings, classifications, and performing their insertions.
Documentation is available at https://wiki.u-gov.it/confluence/display/ESSE3/WS+ESSE3+Area+Concorsi
## ChangeLog
  
Version        | ESSE3 Release Version         | Interventions 
-              | -                             | -
    1.0.0      | 21.10.00.00                   | added API to retrieve competition configuration data

---

## Endpoints - Competitions (Concorsi)

### `GET /concorsi` - Competitions Configuration

```java
/**
 * Retrieves the list of Competition objects.
 *
 * @param aaId                 integer (query, optional)           - Competition year
 * @param filter               string (query, optional)            - Parameter allows applying filters to the model class using RSQL language...
 * @return List<Concorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 2017, // Competition year
    "testId": 1, // Competition identifier
    "tipoTestCod": "A", // Competition type: A = admission test to a study course E = State exam S = competition to access an SSIS V = candidate knowledge evaluation test
    "modTest": "U", // Indicates the competition modality: - E: seat exhaustion (enrollment application presentation order) - U: based on passing a single test - M: based on passing multiple tests - D: based on the order of presentation of the admission application.
    "numPrefMin": 1, // Minimum preferences number
    "numPrefMax": 1, // Maximum preferences number
    "numPrefLingueMin": 1, // Minimum language preferences number
    "numPrefLingue": 1, // Maximum language preferences number
    "numPrefBorseMin": 1, // Minimum scholarships number
    "numPrefBorse": 1, // Maximum scholarships number
    "tipoTestDes": "di Ammissione", // Competition type description
    "concorsoDes": "Ammissione alle lauree triennali", // Competition description.
    "concorsoDesEng": "Admission test", // Competition description in English.
    "dataIniAmmWeb": "18/12/2017", // Start date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "dataFinAmmWeb": "18/12/2017", // End date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "nota": "Attenzione", // Note associated with the competition
    "concorsoNotaEng": "Attention", // Note associated with the competition.
    "tipoCorsoCod": "L2", // Type of study course associated with the competition, evaluation test, state exam. For state exams, assumes null values.
    "tipoCorsoDes": "Corso di Laurea", // Description of the study course type associated with the competition
    "tipoCorsoDesEng": "Bachelor Degree", // Description in English of the study course type associated with the competition
    "linkBando": "https://www.cineca.it/bando" // Link to the competition notice.
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /concorsi/{aaId}/{testId}` - Competition Configuration

```java
/**
 * Retrieves the configuration of a single ConcorsoConDettagli.
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<ConcorsoConDettagli> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/{aaId}/{testId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {}
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /concorsi/{aaId}/{testId}/proveConcorso` - Competition Tests

```java
/**
 * Retrieves the detail of the tests of a competition via aaId and testId
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<ProveConcorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/{aaId}/{testId}/proveConcorso
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 1, // Competition year (required)
    "testId": 1, // Position identifier (required)
    "proveConcId": 3, // Test identifier
    "provaDes": "PROVA SCRITTA", // Test description
    "provaDesEng": "32/12 - LINGUE E LETTERATURE MODERNE EUROAMERICANE", // Competition detail
    "dataProva": "22/08/2020", // English language detail
    "orario": "600", // Graduation session time (HH24:MI)
    "dataIniEsiti": "22/08/2020", // English language detail
    "dataFinEsiti": "22/08/2020", // English language detail
    "ordVis": "null", // Detail identifier
    "materie": [
      {
        "aaId": 1, // Competition year
        "testId": 1, // Competition identifier
        "materiaId": 1, // Test identifier
        "provaDes": "PROVA SCRITTA", // Test description
        "provaDesEng": "32/12 - LINGUE E LETTERATURE MODERNE EUROAMERICANE", // Competition detail
        "dataProva": "22/08/2020", // English language detail
        "orario": "600", // Graduation session time (HH24:MI)
        "dataIniEsiti": "22/08/2020", // English language detail
        "dataFinEsiti": "22/08/2020", // English language detail
        "ordVis": 1, // Detail identifier
        "proveConcId": 1 // Parent test identifier
      }
    ] // Materie
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Rankings (Graduatorie)

### `GET /concorsi/graduatoria/{aaId}/{testId}` - Competition Ranking

```java
/**
 * Retrieves the ranking of a competition via aaId and testId
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param persId               integer (query, optional)           - Person identifier
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<GraduatoriaConcorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/graduatoria/{aaId}/{testId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 1, // Competition year
    "testId": 1, // Position identifier
    "dettTestId": 1, // Test detail identifier
    "righeGradId": 1, // Detail identifier of the competition ranking.
    "persId": 1, // Identifier of the enrolled person
    "posId": 1, // Position identifier
    "statoCod": "IM", // Candidate status code
    "statoGradDes": "immatricolato", // Candidate status description
    "statoGradDesEng": "immatricolato", // Candidate status description in English
    "posiz": 1, // Position identifier
    "punti": 90.0, // Position identifier
    "maxPunti": 100.0, // Maximum number of points
    "giudizio": "Buono", // Judgment
    "giudizioEng": "Buono", // Judgment in English
    "presDomRipescaggio": 0, // Indicates if the repechage application is present
    "dataDomRipescaggio": "22/08/2020", // Repechage application date
    "dataScadPosAm": "22/08/2020", // Admitted position expiration date
    "dataScadPosPi": "22/08/2020" // Pre-enrolled position expiration date
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /concorsi/graduatoria/{aaId}/{testId}/{dettTestId}` - Competition Detail Ranking

```java
/**
 * Retrieves the detail of a ranking of a competition via aaId, testId and dettTestId
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param dettTestId           integer (path, required)            - Competition detail identifier
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<GraduatoriaConcorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/graduatoria/{aaId}/{testId}/{dettTestId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 1, // Competition year
    "testId": 1, // Position identifier
    "dettTestId": 1, // Test detail identifier
    "righeGradId": 1, // Detail identifier of the competition ranking.
    "persId": 1, // Identifier of the enrolled person
    "posId": 1, // Position identifier
    "statoCod": "IM", // Candidate status code
    "statoGradDes": "immatricolato", // Candidate status description
    "statoGradDesEng": "immatricolato", // Candidate status description in English
    "posiz": 1, // Position identifier
    "punti": 90.0, // Position identifier
    "maxPunti": 100.0, // Maximum number of points
    "giudizio": "Buono", // Judgment
    "giudizioEng": "Buono", // Judgment in English
    "presDomRipescaggio": 0, // Indicates if the repechage application is present
    "dataDomRipescaggio": "22/08/2020", // Repechage application date
    "dataScadPosAm": "22/08/2020", // Admitted position expiration date
    "dataScadPosPi": "22/08/2020" // Pre-enrolled position expiration date
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /concorsi/graduatoria/{persId}/{posId}/persona` - Person Ranking

```java
/**
 * Retrieves the ranking of a person starting from persId and posId
 *
 * @param persId               integer (path, required)            - Person identifier
 * @param posId                integer (path, required)            - Position identifier
 * @return List<GraduatoriaConcorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/graduatoria/{persId}/{posId}/persona
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 1, // Competition year
    "testId": 1, // Position identifier
    "dettTestId": 1, // Test detail identifier
    "righeGradId": 1, // Detail identifier of the competition ranking.
    "persId": 1, // Identifier of the enrolled person
    "posId": 1, // Position identifier
    "statoCod": "IM", // Candidate status code
    "statoGradDes": "immatricolato", // Candidate status description
    "statoGradDesEng": "immatricolato", // Candidate status description in English
    "posiz": 1, // Position identifier
    "punti": 90.0, // Position identifier
    "maxPunti": 100.0, // Maximum number of points
    "giudizio": "Buono", // Judgment
    "giudizioEng": "Buono", // Judgment in English
    "presDomRipescaggio": 0, // Indicates if the repechage application is present
    "dataDomRipescaggio": "22/08/2020", // Repechage application date
    "dataScadPosAm": "22/08/2020", // Admitted position expiration date
    "dataScadPosPi": "22/08/2020" // Pre-enrolled position expiration date
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /concorsi/{aaId}/{testId}/graduatorie/file` - Import competition rankings via txt or csv file

```java
/**
 * Import operation of the rankings of a competition via txt or csv file.
 * The input file must respect the following track
 * https://wiki.u-gov.it/confluence/pages/viewpage.action?pageId=81332397#Tracciatidiimportazione/esportazioneConcorsi-IMPORTAZIONEGRADUATORIE
 *
 * @param aaId                 integer (path, required)            - Year identifier
 * @param testId               integer (path, required)            - Competition identifier
 * @param uploadFile           file (formData, optional)           - Attachment to insert
 * @return List<ImportResponse> on success,
 *         DettaglioErrore on failure
 */
PUT /concorsi/{aaId}/{testId}/graduatorie/file
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

**Content-Type:** `multipart/form-data`

#### Request body

**Content-Type:** `application/x-www-form-urlencoded`

- `uploadFile` (optional) — allegato da inserire

#### Response

**`201 Created` - Upload Succeeded**

```json
[
  {
    "numeroRecordElaborati": 1, // Number of correctly processed records
    "numeroErrori": 1, // Number of records that went into error
    "elencoErrori": [
      {
        "descrizioneErrore": "descrizioneErrore" // Error description
      }
    ] // ElencoErrori
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /concorsi/{aaId}/{testId}/graduatorie/{dettTestId}` - Import competition classification via JSON

```java
/**
 * Import operation of the classification of a competition via JSON file. The
 * input file must respect the following track
 * https://wiki.u-gov.it/confluence/pages/viewpage.action?pageId=81332397#Tracciatidiimportazione/esportazioneConcorsi-IMPORTAZIONEGRADUATORIE
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param dettTestId           integer (path, required)            - Competition detail identifier
 * @param body                 object (body, required)             - Object containing the row to insert
 * @return List<ImportResponse> on success,
 *         DettaglioErrore on failure
 */
PUT /concorsi/{aaId}/{testId}/graduatorie/{dettTestId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

#### Request body

```json
[
  {
    "prematr": 1, // Identifies the prematriculation
    "codFis": "Buono", // Judgment in English
    "cognome": "Buono", // Judgment in English
    "nome": "Buono", // Judgment in English
    "posiz": 1, // Posiz
    "puntiTot": 60.5, // PointsTot
    "maxPunti": 60.5, // MaxPunti
    "stato": "Buono" // Ranking result
  }
]
```

#### Response

**`201 Created` - Upload Succeeded**

```json
[
  {
    "numeroRecordElaborati": 1, // Number of correctly processed records
    "numeroErrori": 1, // Number of records that went into error
    "elencoErrori": [
      {
        "descrizioneErrore": "descrizioneErrore" // Error description
      }
    ] // ElencoErrori
  }
]
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /concorsi/{aaId}/{testId}/graduatorie/{dettTestId}/file` - Import single ranking via txt or csv file

```java
/**
 * Import operation of the rankings of a competition via txt or csv file.
 * The input file must respect the following track
 * https://wiki.u-gov.it/confluence/pages/viewpage.action?pageId=81332397#Tracciatidiimportazione/esportazioneConcorsi-IMPORTAZIONEGRADUATORIE
 *
 * @param aaId                 integer (path, required)            - Year identifier
 * @param testId               integer (path, required)            - Competition identifier
 * @param dettTestId           integer (path, required)            - Competition detail identifier
 * @param uploadFile           file (formData, optional)           - Attachment to insert
 * @return List<ImportResponse> on success,
 *         DettaglioErrore on failure
 */
PUT /concorsi/{aaId}/{testId}/graduatorie/{dettTestId}/file
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

**Content-Type:** `multipart/form-data`

#### Request body

**Content-Type:** `application/x-www-form-urlencoded`

- `uploadFile` (optional) — allegato da inserire

#### Response

**`201 Created` - Upload Succeeded**

```json
[
  {
    "numeroRecordElaborati": 1, // Number of correctly processed records
    "numeroErrori": 1, // Number of records that went into error
    "elencoErrori": [
      {
        "descrizioneErrore": "descrizioneErrore" // Error description
      }
    ] // ElencoErrori
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Classifications (Classifiche)

### `PUT /concorsi/{aaId}/{testId}/classifica/{proveConcId}` - Import competition classification via JSON

```java
/**
 * Import operation of the classification of a competition via JSON file. The
 * input file must respect the following track
 * https://wiki.u-gov.it/confluence/pages/viewpage.action?pageId=81332397#Tracciatidiimportazione/esportazioneConcorsi-IMPORTAZIONECLASSIFICASTANDARDESSE3
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param proveConcId          integer (path, required)            - Competition test identifier
 * @param tipologiaFile        string (query, required)            - Type of classification import file
 * @param body                 object (body, required)             - Object containing the row to insert
 * @return List<ImportResponse> on success,
 *         DettaglioErrore on failure
 */
PUT /concorsi/{aaId}/{testId}/classifica/{proveConcId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

#### Request body

```json
[
  {
    "prematr": 1, // Identifies the prematriculation
    "numCompito": "Buono", // Judgment in English
    "codFis": "Buono", // Judgment in English
    "nome": "Buono", // Judgment in English
    "cognome": "Buono", // Judgment in English
    "puntiTot": 60.5, // PointsTot
    "maxPunti": 60.5, // MaxPunti
    "esitoCod": 1, // Identifies the prematriculation
    "puntiMaterie": [
      {
        "puntiMateria": 1 // Error description
      }
    ] // PointsMaterie
  }
]
```

#### Response

**`201 Created` - Upload Succeeded**

```json
[
  {
    "numeroRecordElaborati": 1, // Number of correctly processed records
    "numeroErrori": 1, // Number of records that went into error
    "elencoErrori": [
      {
        "descrizioneErrore": "descrizioneErrore" // Error description
      }
    ] // ElencoErrori
  }
]
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /concorsi/{aaId}/{testId}/classifica/{proveConcId}/file` - Import competition classification via txt or csv file

```java
/**
 * Import operation of the classification of a competition via txt or csv file.
 * The input file must respect the following track
 * https://wiki.u-gov.it/confluence/pages/viewpage.action?pageId=81332397#Tracciatidiimportazione/esportazioneConcorsi-IMPORTAZIONECLASSIFICASTANDARDESSE3
 *
 * @param aaId                 integer (path, required)            - Year identifier
 * @param testId               integer (path, required)            - Competition identifier
 * @param proveConcId          integer (path, required)            - Test identifier
 * @param tipologiaFile        string (query, required)            - Type of classification import file
 * @param uploadFile           file (formData, optional)           - Attachment to insert
 * @return List<ImportResponse> on success,
 *         DettaglioErrore on failure
 */
PUT /concorsi/{aaId}/{testId}/classifica/{proveConcId}/file
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

**Content-Type:** `multipart/form-data`

#### Request body

**Content-Type:** `application/x-www-form-urlencoded`

- `uploadFile` (optional) — allegato da inserire

#### Response

**`201 Created` - Upload Succeeded**

```json
[
  {
    "numeroRecordElaborati": 1, // Number of correctly processed records
    "numeroErrori": 1, // Number of records that went into error
    "elencoErrori": [
      {
        "descrizioneErrore": "descrizioneErrore" // Error description
      }
    ] // ElencoErrori
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /concorsi/{aaId}/{testId}/classificaConcorso` - Classification of competition tests

```java
/**
 * Retrieves the classification of a competition via aaId and testId
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param persId               integer (query, optional)           - Person identifier
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<ClassificaConcorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/{aaId}/{testId}/classificaConcorso
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "classifDettId": 1, // Classification identifier
    "proveConcId": 3, // Test identifier
    "turniConcId": 3, // Shift identifier
    "persId": 1, // Identifier of the enrolled person
    "posId": 1, // Position identifier
    "provaDestId": 1, // Parent test identifier
    "aaId": 1, // Competition year (required)
    "testId": 1, // Competition identifier (required)
    "esitoCod": "PROVA SCRITTA", // Test description
    "esitoDes": "PROVA SCRITTA", // Test description
    "punti": 60.5, // Points
    "maxPunti": 100.0, // MaxPunti
    "giudizio": "BUONO", // Judgment
    "giudizioEng": "BUONO", // Judgment in English
    "materiaFlg": 1, // Indicates if the test is a subject or not
    "esitiProvaOrigine": [
      {
        "classifDettId": 1, // Classification identifier
        "classificaMateriaId": 3, // Test identifier
        "turniConcId": 3, // Shift identifier
        "persId": 1, // Identifier of the enrolled person
        "posId": 1, // Position identifier
        "proveConcId": 1, // Parent test identifier
        "aaId": 1, // Competition year
        "testId": 1, // Competition identifier
        "esitoCod": "PROVA SCRITTA", // Test description
        "esitoDes": "PROVA SCRITTA", // Test description
        "punti": 60.5, // Points
        "maxPunti": 100.0, // MaxPunti
        "giudizio": "BUONO", // Judgment
        "giudizioEng": "BUONO", // Judgment in English
        "materiaFlg": 1 // Indicates if the test is a subject or not
      }
    ] // EsitiProvaOrigine
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /concorsi/{persId}/{posId}/classifica` - Classification of a person's tests

```java
/**
 * Retrieves the classification of a person via aaId and testId
 *
 * @param persId               integer (path, required)            - Person identifier
 * @param posId                integer (path, required)            - Position identifier
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @return List<ClassificaPersona> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/{persId}/{posId}/classifica
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "classifDettId": 1, // Classification identifier
    "proveConcId": 3, // Test identifier
    "turniConcId": 3, // Shift identifier
    "persId": 1, // Identifier of the enrolled person (required)
    "posId": 1, // Position identifier (required)
    "provaDestId": 1, // Parent test identifier
    "aaId": 1, // Competition year
    "testId": 1, // Competition identifier
    "esitoCod": "PROVA SCRITTA", // Test description
    "esitoDes": "PROVA SCRITTA", // Test description
    "punti": 60.5, // Points
    "maxPunti": 100.0, // MaxPunti
    "giudizio": "BUONO", // Judgment
    "giudizioEng": "BUONO", // Judgment in English
    "materiaFlg": 1, // Indicates if the test is a subject or not
    "esitoProvaOrigine": [
      {
        "classifDettId": 1, // Classification identifier
        "classificaMateriaId": 3, // Test identifier
        "turniConcId": 3, // Shift identifier
        "persId": 1, // Identifier of the enrolled person
        "posId": 1, // Position identifier
        "proveConcId": 1, // Parent test identifier
        "aaId": 1, // Competition year
        "testId": 1, // Competition identifier
        "esitoCod": "PROVA SCRITTA", // Test description
        "esitoDes": "PROVA SCRITTA", // Test description
        "punti": 60.5, // Points
        "maxPunti": 100.0, // MaxPunti
        "giudizio": "BUONO", // Judgment
        "giudizioEng": "BUONO", // Judgment in English
        "materiaFlg": 1 // Indicates if the test is a subject or not
      }
    ] // EsitoProvaOrigine
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Competition Enrollments (Iscrizione Concorsi)

### `GET /concorsi/{aaId}/{testId}/iscrizioni` - Competition Enrollments

```java
/**
 * Retrieves the list of people enrolled in a competition.
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param persId               integer (query, optional)           - Person identifier
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<IscrittiConcorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/{aaId}/{testId}/iscrizioni
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 2017, // Competition year (required)
    "testId": 1, // Competition identifier (required)
    "persId": 1, // Identificativo persona iscritta
    "posId": 3, // Position identifier
    "tipoTestCod": "A", // Competition type: A = admission test to a study course E = State exam S = competition to access an SSIS V = candidate knowledge evaluation test
    "modTest": "U", // Indicates the competition modality: - E: seat exhaustion (enrollment application presentation order) - U: based on passing a single test - M: based on passing multiple tests - D: based on the order of presentation of the admission application.
    "tipoTestDes": "di Ammissione", // Competition type description
    "tipoTestDesEng": "Admission", // Description in English of the competition type
    "concorsoDes": "Ammissione alle lauree triennali", // Competition description.
    "concorsoDesEng": "Admission test", // Competition description in English.
    "dataIniAmmWeb": "18/12/2017", // Start date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "dataFinAmmWeb": "18/12/2017", // End date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "dataIniDomRipescaggio": "22/08/2017", // Start date of the period valid for repechage to the competition.
    "dataFinDomRipescaggio": "17/09/2017", // End date of the period valid for repechage to the competition.
    "concNazionale": 1, // Flag indicating if the competition is national or not
    "nota": "Attenzione", // Note associated with the competition
    "concorsoNotaEng": "Attention", // Note associated with the competition.
    "tipoCorsoCod": "L2", // Type of study course associated with the competition, evaluation test, state exam. For state exams, assumes null values.
    "tipoCorsoDes": "Corso di Laurea", // Description of the study course type associated with the competition
    "tipoCorsoDesEng": "Bachelor Degree", // Description in English of the study course type associated with the competition
    "taxPagFlg": 1 // Indicates if the candidate has paid the competition enrollment fee or not
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /concorsi/{aaId}/{testId}/iscrizioni/{persId}` - Enroll a candidate in a competition

```java
/**
 * Allows external systems to enroll a candidate in the competition. The keys
 * required in the body are retrievable from GET /concorsi/{aaId}/{testId}.
 * Return Codes | Description
 * -1 | Error
 * -2 | Incorrect preferences
 * -3 | Mandatory parameters not valued
 * 1 | Enrollment successful
 * 2 | Admission to the entrance test was made but the person was not included in the ranking because they did not pay the admission fee
 * 3 | Person already admitted to the test
 * 4 | Admission not feasible: the student does not satisfy the eligibility conditions
 * 5 | Error loading person ranking from WS
 *
 * @param aaId                 integer (path, required)            - Competition year
 * @param testId               integer (path, required)            - Competition test id
 * @param persId               integer (path, required)            - Person identifier
 * @param body                 InserimentoAmmConc (body, required) - Object containing the row to insert
 * @return List<DettaglioIscrittoConcorso> on success,
 *         DettaglioErrore on failure
 */
PUT /concorsi/{aaId}/{testId}/iscrizioni/{persId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

#### Request body

```json
{
  "tipoTititCod": "1", // Chosen Italian title type
  "tipoCatAmmId": 999, // Administrative category.
  "tipoCorsoCod": "1", // Chosen study course type.
  "trattHandFlg": 0, // Indicates if the candidate requested special treatment during the competition tests due to handicap.
  "tipoHandicap": "D", // Handicap type code.
  "noteHand": "1", // Student annotations regarding their handicap position.
  "percHand": 60.25, // Number between 0 and 100 indicating the handicap percentage declared by the candidate.
  "nota": "1", // Descriptive note.
  "prefLingue": [
    {
      "concLingueId": 101, // Unique identifier of preference language (required)
      "prefOrd": 1 // Preference order (required)
    }
  ], // PrefLingue
  "prefBorse": [
    {
      "concBorseId": 101, // Unique identifier of preference scholarship (required)
      "prefOrd": 1 // Preference order (required)
    }
  ], // PrefBorse
  "prefDett": [
    {
      "dettTestId": 101, // Unique identifier of preference detail (required)
      "prefOrd": 1 // Preference order (required)
    }
  ] // PrefDett
}
```

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 2017, // Competition year
    "testId": 1, // Competition identifier
    "persId": 1, // Identificativo persona iscritta (required)
    "posId": 3, // Position identifier (required)
    "tipoTestCod": "A", // Competition type: A = admission test to a study course E = State exam S = competition to access an SSIS V = candidate knowledge evaluation test
    "modTest": "U", // Indicates the competition modality: - E: seat exhaustion (enrollment application presentation order) - U: based on passing a single test - M: based on passing multiple tests - D: based on the order of presentation of the admission application.
    "tipoTestDes": "di Ammissione", // Competition type description
    "tipoTestDesEng": "Admission", // Description in English of the competition type
    "concorsoDes": "Ammissione alle lauree triennali", // Competition description.
    "concorsoDesEng": "Admission test", // Competition description in English.
    "dataIniAmmWeb": "18/12/2017", // Start date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "dataFinAmmWeb": "18/12/2017", // End date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "dataIniDomRipescaggio": "22/08/2017", // Start date of the period valid for repechage to the competition.
    "dataFinDomRipescaggio": "17/09/2017", // End date of the period valid for repechage to the competition.
    "concNazionale": 1, // Flag indicating if the competition is national or not
    "nota": "Attenzione", // Note associated with the competition
    "concorsoNotaEng": "Attention", // Note associated with the competition.
    "tipoCorsoCod": "L2", // Type of study course associated with the competition, evaluation test, state exam. For state exams, assumes null values.
    "tipoCorsoDes": "Corso di Laurea", // Description of the study course type associated with the competition
    "tipoCorsoDesEng": "Bachelor Degree", // Description in English of the study course type associated with the competition
    "taxPagFlg": 1, // Indicates if the candidate has paid the competition enrollment fee or not
    "linguaConcorso": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "concLingueId": 2017, // Competition year
        "prefOrd": 1, // Preference order
        "des": "descrizone lingua", // Language description
        "linguaId": 1 // Competition language identifier
      }
    ], // LinguaConcorso
    "dettaglioSede": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "dettTestId": 1, // Competition year
        "sedeId": 2017, // Competition year
        "prefOrd": 1, // Preference order
        "des": "descrizone lingua" // Language description
      }
    ], // DettaglioSede
    "dettaglioPds": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "dettTestId": 2017, // Competition year
        "cdsId": 1, // Study course identifier
        "aaOrdId": 2020, // Study course sorting year
        "pdsId": 2017, // Study path identifier
        "cod": "PDS", // Study path code
        "des": "descrizone lingua" // Description of the study path
      }
    ], // DettaglioPds
    "borse": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "concBorseId": 1, // Competition year
        "tipoBorsaCod": "2017", // Competition year
        "des": "descrizone" // Scholarship description
      }
    ], // Borse
    "dettaglioTest": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "dettTestId": 3, // Detail identifier
        "prefOrd": 1, // Preference order
        "dettaglio": "32/12 - LINGUE E LETTERATURE MODERNE EUROAMERICANE", // Competition detail
        "dettaglioEng": "32/12 - MODERN EUROAMERICAN LANGUAGES AND LITERATURES" // English language detail
      }
    ] // DettaglioTest
  }
]
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /concorsi/{persId}/{posId}/dettaglioIscritto` - Detail of a person enrolled in a competition

```java
/**
 * Retrieves the detail of a person enrolled in a competition via persId and posId
 *
 * @param persId               integer (path, required)            - Person identifier
 * @param posId                integer (path, required)            - Position identifier
 * @return List<DettaglioIscrittoConcorso> on success,
 *         DettaglioErrore on failure
 */
GET /concorsi/{persId}/{posId}/dettaglioIscritto
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "aaId": 2017, // Competition year
    "testId": 1, // Competition identifier
    "persId": 1, // Identificativo persona iscritta (required)
    "posId": 3, // Position identifier (required)
    "tipoTestCod": "A", // Competition type: A = admission test to a study course E = State exam S = competition to access an SSIS V = candidate knowledge evaluation test
    "modTest": "U", // Indicates the competition modality: - E: seat exhaustion (enrollment application presentation order) - U: based on passing a single test - M: based on passing multiple tests - D: based on the order of presentation of the admission application.
    "tipoTestDes": "di Ammissione", // Competition type description
    "tipoTestDesEng": "Admission", // Description in English of the competition type
    "concorsoDes": "Ammissione alle lauree triennali", // Competition description.
    "concorsoDesEng": "Admission test", // Competition description in English.
    "dataIniAmmWeb": "18/12/2017", // Start date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "dataFinAmmWeb": "18/12/2017", // End date of the period valid for compiling admission applications for the competition, evaluation test, state exam from the web.
    "dataIniDomRipescaggio": "22/08/2017", // Start date of the period valid for repechage to the competition.
    "dataFinDomRipescaggio": "17/09/2017", // End date of the period valid for repechage to the competition.
    "concNazionale": 1, // Flag indicating if the competition is national or not
    "nota": "Attenzione", // Note associated with the competition
    "concorsoNotaEng": "Attention", // Note associated with the competition.
    "tipoCorsoCod": "L2", // Type of study course associated with the competition, evaluation test, state exam. For state exams, assumes null values.
    "tipoCorsoDes": "Corso di Laurea", // Description of the study course type associated with the competition
    "tipoCorsoDesEng": "Bachelor Degree", // Description in English of the study course type associated with the competition
    "taxPagFlg": 1, // Indicates if the candidate has paid the competition enrollment fee or not
    "linguaConcorso": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "concLingueId": 2017, // Competition year
        "prefOrd": 1, // Preference order
        "des": "descrizone lingua", // Language description
        "linguaId": 1 // Competition language identifier
      }
    ], // LinguaConcorso
    "dettaglioSede": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "dettTestId": 1, // Competition year
        "sedeId": 2017, // Competition year
        "prefOrd": 1, // Preference order
        "des": "descrizone lingua" // Language description
      }
    ], // DettaglioSede
    "dettaglioPds": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "dettTestId": 2017, // Competition year
        "cdsId": 1, // Study course identifier
        "aaOrdId": 2020, // Study course sorting year
        "pdsId": 2017, // Study path identifier
        "cod": "PDS", // Study path code
        "des": "descrizone lingua" // Description of the study path
      }
    ], // DettaglioPds
    "borse": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "concBorseId": 1, // Competition year
        "tipoBorsaCod": "2017", // Competition year
        "des": "descrizone" // Scholarship description
      }
    ], // Borse
    "dettaglioTest": [
      {
        "persId": 1, // Identifier of the enrolled person (required)
        "posId": 1, // Position identifier (required)
        "dettTestId": 3, // Detail identifier
        "prefOrd": 1, // Preference order
        "dettaglio": "32/12 - LINGUE E LETTERATURE MODERNE EUROAMERICANE", // Competition detail
        "dettaglioEng": "32/12 - MODERN EUROAMERICAN LANGUAGES AND LITERATURES" // English language detail
      }
    ] // DettaglioTest
  }
]
```

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Descrizione del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

---

## References

- **Swagger UI:** [Concorsi Api V2 - ESSE3 REST Docs](https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Concorsi%20Api%20V2%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fconcorsi-service-v2)>)
- **Spec YAML:** [concorsiApiV2.yaml](https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Concorsi%20Api%20V2%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fconcorsi-service-v2))
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
