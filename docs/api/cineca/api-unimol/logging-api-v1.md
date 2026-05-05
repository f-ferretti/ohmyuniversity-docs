---
title: Logging API V1 | OhMyUniversity!
description: REST API documentation for the Logging service (logging-service-v1) - CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Logging API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Logging service (logging-service-v1) - CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/logging-api-v1
  - - meta
    - name: keywords
      content: logging v1 api, esse3 rest api, cineca api, ohmyuniversity api, logging-service-v1
  - - meta
    - name: twitter:title
      content: Logging API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Logging service (logging-service-v1) - CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Logging API V1

**ENG:** `Logging`

**Version:** `1.0.0` · **Base URL:** `/logging-service-v1`

ESSE3 REST API for procedure logging.

---

## Endpoints - Tlog (Tlog)

### `GET /tlog/sessions` - Retrieve overridden sessions

```java
/**
 * Retrieves overridden sessions
 *
 * @return List<TlogSession> on success,
 *         DettaglioErrore on failure
 */
GET /tlog/sessions
```

**Auth:** `AUTENTICATO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "sessionid": "k8Cb2oXslTbleR9FR4iL", // Session ID
    "llevel": 20, // Log level ID
    "lcode": "WARN", // Log level code
    "ldesc": "WARNING", // Log level description
    "addTransactionInfo": 1, // Enable transaction insertion. 0 -> disabled; 1 -> enabled
    "llevelMinutesTimeout": "1,5", // Override level timeout
    "usrInsId": "Administrator", // Inserting user
    "dataIns": "12/11/2025" // Insertion date
  }
]
```

**`422 Unprocessable Entity` - Error**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /tlog/sessions/{sessionId}` - Add a new override session or modify it if it already exists

```java
/**
 * Adds a new override session or modifies it if it already exists
 *
 * @param sessionId            string (path, required)             - Session ID
 * @param body                 TlogSessionBody (body, required)    - Object containing the data to be inserted into tlog_session
 * @return TlogSession on success,
 *         DettaglioErrore on failure
 */
PUT /tlog/sessions/{sessionId}
```

**Auth:** `AUTENTICATO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "llevel": 30, // Log level ID (required)
  "addTransactionInfo": 0, // Enable transaction insertion. 0 -> disabled; 1 -> enabled (required)
  "llevelMinutesTimeout": 15.0 // Override level timeout (required)
}
```

#### Response

**`200 OK`**

```json
{
  "sessionid": "k8Cb2oXslTbleR9FR4iL", // Session ID
  "llevel": 20, // Log level ID
  "lcode": "WARN", // Log level code
  "ldesc": "WARNING", // Log level description
  "addTransactionInfo": 1, // Enable transaction insertion. 0 -> disabled; 1 -> enabled
  "llevelMinutesTimeout": "1,5", // Override level timeout
  "usrInsId": "Administrator", // Inserting user
  "dataIns": "12/11/2025" // Insertion date
}
```

**`422 Unprocessable Entity` - Error**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /tlog/text` - Retrieve procedure logs

```java
/**
 * Retrieves procedure logs
 *
 * @param sessionId            string (query, optional)            - Session ID
 * @param ctxParamsId          integer (query, optional)           - Context ID
 * @param transactionId        string (query, optional)            - Transaction ID
 * @param dataInizio           string (query, optional)            - Log start date
 * @param dataFine             string (query, optional)            - Log end date
 * @return string on success,
 *         DettaglioErrore on failure
 */
GET /tlog/text
```

**Auth:** `AUTENTICATO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
"string"
```

**`422 Unprocessable Entity` - Error**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /tlog/transactions` - Retrieve Tlog transactions

```java
/**
 * Retrieves Tlog transactions
 *
 * @param sessionId            string (query, optional)            - Session ID
 * @param ctxParamsId          integer (query, optional)           - Context ID
 * @param transactionId        string (query, optional)            - Transaction ID
 * @return List<VTlogParams> on success,
 *         DettaglioErrore on failure
 */
GET /tlog/transactions
```

**Auth:** `AUTENTICATO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "ctxParamsId": 123, // Ctx param ID
    "transactionId": "56.1.940813", // Transaction ID
    "sessionid": "k8Cb2oXslTbleR9FR4iL", // Session ID
    "des": "LOG_TEST.P_TEST_SESSION.p_test_session", // Description
    "dataIns": "12/11/2025", // Insertion date
    "usrInsId": "Administrator", // Inserting user
    "vTlogParamsDett": [
      {
        "parName": "elab_id", // Parameter name
        "parValue": "2" // Parameter value
      }
    ] // VTlogParamsDett
  }
]
```

**`422 Unprocessable Entity` - Error**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

---

## References

- **Swagger UI:** [Logging Api V1 - ESSE3 REST Docs](https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Logging%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Flogging-service-v1))
- **Spec YAML:** [frk-loggingApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Logging%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Flogging-service-v1))
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)