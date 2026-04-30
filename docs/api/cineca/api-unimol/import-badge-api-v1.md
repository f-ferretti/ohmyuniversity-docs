---
title: Importbadge API V1 | OhMyUniversity!
description: REST API documentation for the Importbadge service (importbadge-service-v1) - CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Importbadge API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Importbadge service (importbadge-service-v1) - CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/importbadge-api-v1
  - - meta
    - name: keywords
      content: importbadge v1 api, esse3 rest api, cineca api, ohmyuniversity api, importbadge-service-v1
  - - meta
    - name: twitter:title
      content: Importbadge API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Importbadge service (importbadge-service-v1) - CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Importbadge API V1

**ENG:** `Import Badge`

**Version:** `1.1.0` · **Base URL:** `/importbadge-service-v1`

ESSE3 REST API for importing data relating to Open Badges issued on external platforms.

---

## Endpoints - Importaward (Importaward)

### `POST /importAward` - Allows importing one or more badges (Award)

```java
/**
 * Imports the data of one or more badges (Award): in Esse3 they are inserted as
 * University qualifications, detailed by level (Badge Class)
 *
 * @param body                 object (body, required)             - Object containing the JSON with the data to insert
 * @return RitornoAward on success,
 *         DettaglioErrore on failure
 */
POST /importAward
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
[
  {
    "awardedUser": 1, // Internal numeric ID of the user to whom the award was given
    "earnedBadge": 1, // Internal numeric ID of the Badge referenced (required)
    "awardedEmail": "m.rossi@amail.com", // Email of the user to whom the badge was issued (required)
    "createdAt": "10/10/2007", // Creation date of the award (required)
    "customData": [
      {
        "externalKey": "codice", // External attribute code (required)
        "externalValue": "identificativo" // External attribute identifier (required)
      }
    ] // CustomData
  }
]
```

#### Response

**`201 Created` - Returns processing header ID if import is successful**

```json
{
  "tstId": 1, // Numeric identifier of the header (required)
  "dataCreazione": "10/10/2007", // Creation date of the header
  "statoCod": "published", // Status of the list
  "nota": "una nota", // Note
  "idBadgeClass": 1, // Numeric identifier
  "identificativoBadge": "http://bk.bestr.it/public/systems/bestr/issuers/Fondazione-Golinelli/badges/99795abac91", // Badge class code
  "awardInfo": [
    {
      "id": 1, // Identifier (required)
      "statoCod": "E", // Status code
      "awardedUser": 1, // Internal numeric ID of the user to whom the award was given
      "earnedBadge": 1, // Internal numeric ID of the Badge referenced (required)
      "awardedEmail": "m.rossi@amail.com", // Email of the user to whom the badge was issued (required)
      "createdAt": "10/10/2007", // Creation date (required)
      "nota": "una nota", // Note
      "persId": 1, // Person identifier
      "aaConsegTitolo": 2017, // Qualification attainment year
      "dataConseguimentoTitolo": "10/10/2007", // Qualification attainment date
      "tipoTititCod": "TSS", // Qualification type
      "tititCod": "2.0E24", // Qualification detail code
      "tipoDepositoCod": "AUT", // Indicates in which form the original qualification was deposited, photocopy, self-certification.
      "stessoAteneoFlg": 0, // Flag indicating if the qualification was obtained in the same university.
      "staTitItCod": "C", // Qualification status
      "dataScadenza": "10/10/2007" // Expiration date
    }
  ], // AwardInfo
  "awardErrorDett": [
    {
      "id": 1, // Detail identifier (required)
      "statoCod": "E", // Status code (required)
      "awardedUser": 1, // Internal numeric ID of the user to whom the award was given
      "earnedBadge": 1, // Internal numeric ID of the Badge referenced
      "awardedEmail": "m.rossi@amail.com", // Email of the user to whom the badge was issued (required)
      "createdAt": "10/10/2007", // Creation date (required)
      "nota": "una nota", // Note
      "usrInsId": "Administrator", // Inserting user.
      "dataIns": "01/07/2022", // Insertion date.
      "usrModId": "Administrator", // Last modifying user.
      "dataMod": "01/07/2022" // Last modification date.
    }
  ] // AwardErrorDett
}
```

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

## Endpoints - Importbadgeclass (Importbadgeclass)

### `POST /importBadgeClass` - Allows importing one or more badge types (Badge Class)

```java
/**
 * Imports the data of one or more badge types (Badge Class): in Esse3 they are
 * inserted within the University Qualification Types
 *
 * @param body                 object (body, required)             - Object containing the JSON with the data to insert
 * @return RitornoBadgeClass on success,
 *         DettaglioErrore on failure
 */
POST /importBadgeClass
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
[
  {
    "id": 1, // Numeric identifier (required)
    "identificativo": "identificativo91", // Identifier field
    "status": "published", // Status (required)
    "obiname": "Entrepreneurship Basic", // Badge class name (required)
    "obidescription": "Giardino delle imprese - High School", // Description (required)
    "createdAt": "10/10/2007", // Creation date (required)
    "updatedAt": "10/10/2007", // Last modification date
    "imageUrl": "https://bestr.it/filemanager/show/a88182aa-0dba-4306-84a0-edc7d7245be7.png", // Badge visual
    "alignment": "Open badge", // Additional attribute to the badge class is retrieved only in get ignored in post
    "issuer": {
      "idIssuer": "http://bk.bestr.it/public/systems/bestr/issuers/Fondazione-Golinelli", // Alphanumeric ID of the issuer (required)
      "miurCode": "XXXX", // MIUR code of the issuer
      "url": "http://www.sitoistituzionale.it", // Institutional or organizational website
      "email": "info@dominioissuer.com", // Email of the issuer
      "name": "Nomeissuer", // Name of the issuer
      "imageUrl": "https://bestr.it/filemanager/show/abc.png", // Visual of the issuer
      "slug": "bestr" // Slug of the issuer
    }, // Issuer (required)
    "customData": [
      {
        "externalKey": "codice", // External attribute code (required)
        "externalValue": "identificativo" // External attribute identifier (required)
      }
    ] // CustomData
  }
]
```

#### Response

**`201 Created` - Returns processing header ID if import is successful**

```json
{
  "tstId": 1, // Numeric identifier of the header (required)
  "dataCreazione": "10/10/2007", // Creation date of the header
  "statoCod": "published", // Status of the list
  "nota": "una nota", // Note
  "badgeClassesInfo": [
    {
      "id": 1, // Identifier (required)
      "idNumerico": 1, // Numeric identifier
      "statoCod": "E", // Status code
      "identificativo": "http://bk.bestr.it/public/systems/bestr/issuers/Fondazione-Golinelli/badges/99795abac91", // Identifier field
      "status": "published", // Status (required)
      "name": "Entrepreneurship Basic", // Badge class name
      "description": "Giardino delle imprese - High School", // Description
      "createdAt": "10/10/2007", // Creation date (required)
      "updatedAt": "10/10/2007", // Last modification date
      "imageUrl": "https://bestr.it/filemanager/show/a88182aa-0dba-4306-84a0-edc7d7245be7.png", // Badge visual
      "idIssuer": "http://bk.bestr.it/public/systems/bestr/issuers/Fondazione-Golinelli", // Alphanumeric ID of the issuer
      "codMiurIssuer": "XXXX", // MIUR code of the issuer
      "urlIssuer": "http://www.sitoistituzionale.it", // Institutional or organizational website
      "emailIssuer": "info@dominioissuer.com", // Email of the issuer
      "nomeIssuer": "Nomeissuer", // Name of the issuer
      "imageUrlIssuer": "https://bestr.it/filemanager/show/abc.png", // Visual of the issuer
      "nota": "una nota", // Note
      "slugIssuer": "bestr", // Slug of the issuer
      "tipoTititCod": "TSS", // Qualification type
      "tipoTititDes": "TSS", // Description of the qualification type high school diploma
      "livelloCod": "ECDLFULL", // Qualification level code
      "livelloDes": "ECDL Full" // Description of the qualification level
    }
  ], // BadgeClassesInfo
  "badgeClassesErrorDett": [
    {
      "id": 1, // Identifier (required)
      "idNumerico": 1, // Numeric identifier
      "statoCod": "E", // Status code
      "identificativo": "http://bk.bestr.it/public/systems/bestr/issuers/Fondazione-Golinelli/badges/99795abac91", // Identifier field
      "status": "published", // Status
      "name": "Entrepreneurship Basic", // Badge class name
      "description": "Giardino delle imprese - High School", // Description
      "createdAt": "10/10/2007", // Creation date
      "updatedAt": "10/10/2007", // Last modification date
      "imageUrl": "https://bestr.it/filemanager/show/a88182aa-0dba-4306-84a0-edc7d7245be7.png", // Badge visual
      "idIssuer": "http://bk.bestr.it/public/systems/bestr/issuers/Fondazione-Golinelli", // Alphanumeric ID of the issuer
      "codMiurIssuer": "XXXX", // MIUR code of the issuer
      "urlIssuer": "http://www.sitoistituzionale.it", // Institutional or organizational website
      "emailIssuer": "info@dominioissuer.com", // Email of the issuer
      "nomeIssuer": "Nomeissuer", // Name of the issuer
      "imageUrlIssuer": "https://bestr.it/filemanager/show/abc.png", // Visual of the issuer
      "nota": "una nota", // Note
      "slugIssuer": "bestr" // Slug of the issuer
    }
  ] // BadgeClassesErrorDett
}
```

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

## Endpoints - Importbadgeissuing (Importbadgeissuing)

### `PUT /importBadgeIssuing` - Allows importing the issuance data of a badge

```java
/**
 * Allows acquiring information regarding the successful issuance (or
 * cancellation) of a badge on an external platform, following an event
 * previously notified by Esse3.
 *
 * @param body                 NotificaEmissioneBadge (body, required) - Object containing the issuance/cancellation data of a badge
 * @return string on success,
 *         DettaglioErrore on failure
 */
PUT /importBadgeIssuing
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "evento": "SUPERAMENTO", // Event type, occurred in Esse3, that led to the badge issuance or cancellation request (SUPERAMENTO=exam passed, ANNULLAMENTO=exam cancelled, CONSEG_TITOLO=qualification obtained) (required)
  "refId": 12345, // Unique ID of the data to which the event refers (in case of passed exam it is the ID of the student booklet row with the passed AD) (required)
  "badgeId": "erahTTUSd-ABQd-zxcAA1321-5", // Unique ID of the badge issued on the external system
  "email": "user@gmail.com", // Email of the student for whom the badge issuance occurred on the external system
  "dataEmissione": "11/10/2021 14:24:00", // Date/time of badge issuance on the external system
  "causale": "emesso badge per superamento esame" // Reason for the badge issuance/cancellation on the external system
}
```

#### Response

**`200 OK`**

```json
"string"
```

**`422 Unprocessable Entity` - Operation failed**

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

- **Swagger UI:** [Importbadge Api V1 - ESSE3 REST Docs](https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Import%20Badge%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fimportbadge-service-v1))
- **Spec YAML:** [frk-importbadgeApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Import%20Badge%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fimportbadge-service-v1))
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
```

<br>

---

<br>