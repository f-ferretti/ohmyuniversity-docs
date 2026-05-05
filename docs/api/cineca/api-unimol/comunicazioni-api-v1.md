---
title: Comunicazioni API V1 | OhMyUniversity!
description: REST API documentation for the Comunicazioni service (comunicazioni-service-v1) - CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Comunicazioni API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Comunicazioni service (comunicazioni-service-v1) - CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/comunicazioni-api-v1
  - - meta
    - name: keywords
      content: comunicazioni v1 api, esse3 rest api, cineca api, ohmyuniversity api, comunicazioni-service-v1
  - - meta
    - name: twitter:title
      content: Comunicazioni API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Comunicazioni service (comunicazioni-service-v1) - CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Comunicazioni API V1

**ENG:** `Communications`

**Version:** `1.1.0` · **Base URL:** `/comunicazioni-service-v1`

ESSE3 REST API for communications management.

---

## Endpoints - Communication (Comunicazione)

### `POST /comunicazioni` - Insert a new communication

```java
/**
 * Allows inserting a new communication to be sent to a list of recipients.
 * If the insertion is successful, the endpoint of the created communication
 * is returned in the location header (for potential subsequent querying).
 *
 * @param body                 InserimentoComunicazione (body, required) - Object containing the communication data and its recipients
 * @return 201 Insert successful,
 *         DettaglioErrore on failure
 */
POST /comunicazioni
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Request body

```json
{
  "tipoComCod": "INFO", // Communication type code
  "deviceCod": "E-MAIL", // Communication device code (required)
  "mittente": "Segreteria Studenti", // Sender description
  "da": "info@ateneo.it", // Sender contact (email address or mobile number)
  "titolo": "Presentazione Tesi", // Title (required)
  "testo": "Comunicazione relativa alla presentazione della tesi", // Text (required)
  "htmlFlg": 0, // Indicates if the text is in HTML format (0=no, 1=yes)
  "bachecaFlg": 0, // Indicates if the communication is to be published on the student's private noticeboard (0=no, 1=yes)
  "notifPushFlg": 0, // Indicates if the communication is also to be sent as a push notification on the Mobile App (0=no, 1=yes)
  "dataValIni": "01/07/2021", // Validity start date
  "dataValFin": "31/08/2021", // Validity end date
  "destinatari": [
    {
      "origineDato": "PERSONE", // Recipient type (PERSONE=student/registered, DOCENTI=teaching staff, SOGG_EST=external subject, EXTERNAL=email/mobile contact) (required)
      "idAnagrafica": 12345, // Unique master data ID, for the recipient type (if origineDato is PERSONE, DOCENTI or SOGG_EST)
      "recapito": "user@gmail.com", // Email address or mobile number of the recipient
      "ccFlg": 0, // Indicates if the recipient is in CC (carbon copy) (0=no, 1=yes)
      "ccnFlg": 0 // Indicates if the recipient is in BCC (blind carbon copy) (0=no, 1=yes)
    }
  ] // Recipients (required)
}
```

#### Response

**`201 Created` - Insert successful**

**`422 Unprocessable Entity` - Insert failed**

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

### `GET /comunicazioni/{comId}` - Retrieve data of a specific communication

```java
/**
 * Retrieves the data of a communication, given its unique ID, including
 * the recipients and the possible outcome of the dispatch.
 *
 * @param comId                integer (path, required)            - Unique ID of the communication
 * @param fields               string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @return ComunicazioneConDestinatari on success,
 *         DettaglioErrore on failure
 */
GET /comunicazioni/{comId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{}
```

**`422 Unprocessable Entity` - Invalid Parameters**

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

### `GET /comunicazioni/{comId}/destinatari` - Retrieve recipient data of a specific communication

```java
/**
 * Retrieves the recipient data of a communication, given its unique ID,
 * including the possible outcome of the dispatch. It is possible to filter
 * the recipients by origineDato, idAnagrafica, recapito, and esitoCod.
 * The optional start and limit parameters allow pagination of the results.
 *
 * @param comId                integer (path, required)            - Unique ID of the communication
 * @param origineDato          string (query, optional)            - Recipient type (PERSONE=student/registered, DOCENTI=teaching staff, SOGG_EST=external subject, EXTERNAL=email/mobile contact)
 * @param idAnagrafica         integer (query, optional)           - Unique master data ID, for the recipient type (if origineDato is PERSONE, DOCENTI or SOGG_EST)
 * @param recapito             string (query, optional)            - Email address or mobile number of the recipient
 * @param esitoCod             string (query, optional)            - Dispatch outcome for the recipient (SENT=sent, FAIL=dispatch error, CANC=dispatch cancelled, DRAFT=communication still in draft, ACTIVE=to be sent, WAIT=dispatch in progress)
 * @param fields               string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param start                integer (query, optional)           - Used together with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used together with `start` for record pagination, `limit` indicates the number of records to retrieve
 * @return List<Destinatario> on success,
 *         DettaglioErrore on failure
 */
GET /comunicazioni/{comId}/destinatari
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "comDestId": 12345, // Unique ID of the communication recipient
    "comId": 12345, // Unique ID of the communication (optional)
    "destId": 12345, // Unique master data ID of the recipients (optional)
    "origineDato": "PERSONE", // Recipient type (PERSONE=student/registered, DOCENTI=teaching staff, SOGG_EST=external subject, EXTERNAL=email/mobile contact)
    "idAnagrafica": 12345, // Unique master data ID, for the recipient type (if origineDato is PERSONE, DOCENTI or SOGG_EST)
    "recapito": "user@gmail.com", // Email address or mobile number of the recipient
    "ccFlg": 0, // Indicates if the recipient is in CC (carbon copy) (0=no, 1=yes)
    "ccnFlg": 0, // Indicates if the recipient is in BCC (blind carbon copy) (0=no, 1=yes)
    "nominativo": "Mario Rossi", // Name of the recipient
    "idUser": 12345, // Unique ID of the user, if populated as a recipient (optional)
    "spedFlg": 1, // Indicates if the communication has been sent to the recipient (0=no, 1=yes, -1=error, -2=dispatch cancelled)
    "dataSped": "11/10/2021 14:24:00", // Date/time when the communication was sent to the recipient
    "esitoCod": "SENT", // Dispatch outcome for the recipient (SENT=sent, FAIL=dispatch error, CANC=dispatch cancelled, DRAFT=communication still in draft, ACTIVE=to be sent, WAIT=dispatch in progress)
    "esitoDes": "Nessun Errore" // Description of the dispatch outcome for the recipient
  }
]
```

**`422 Unprocessable Entity` - Invalid Parameters**

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

- **Swagger UI:** [Comunicazioni Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Comunicazioni%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fcomunicazioni-service-v1)>)
- **Spec YAML:** [p02-comunicazioniApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p02-comunicazioniApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)