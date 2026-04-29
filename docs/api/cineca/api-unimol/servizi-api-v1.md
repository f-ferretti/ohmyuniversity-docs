---
title: Servizi API V1 | OhMyUniversity!
description: REST API documentation for the Servizi service (servizi-service-v1) - general services in CINECA ESSE3, including alias management, reference years, configuration parameters, user info, and list exports.
head:
  - - meta
    - property: og:title
      content: Servizi API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Servizi service (servizi-service-v1) - general services in CINECA ESSE3, including alias management, reference years, configuration parameters, user info, and list exports.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/servizi-api-v1
  - - meta
    - name: keywords
      content: servizi api, general services api, esse3 rest api, cineca api, ohmyuniversity api, alias, anno di riferimento, parametri configurazione, utente info, elenchi
  - - meta
    - name: twitter:title
      content: Servizi API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Servizi service (servizi-service-v1) - general services in CINECA ESSE3, including alias management, reference years, configuration parameters, user info, and list exports.
---

# OhMyUniversity! - Unimol: Servizi API V1

**ENG:** `General Services`

**Version:** `1.1.0` · **Base URL:** `/servizi-service-v1`

REST API for general ESSE3 services, including user alias management, academic reference year lookup, configuration parameters, code-to-ID translation, user info retrieval, and list exports.

---

## Changelog

| Version | ESSE3 Release | Changes                       |
| ------- | ------------- | ----------------------------- |
| 1.1.0   | 19.09.02.00   | Added `/elenchi/{tstId}`      |
| 1.1.0   | 19.09.02.00   | Added `/utente-info/{userId}` |

---

## Endpoints - Services (Servizi)

### `GET /alias/{userId}` - Get user alias

```java
/**
 * Returns the alias information associated with a specific user account.
 *
 * @param userId string (path, required) - unique user ID from the P18_USER table
 * @return Alias the alias data for the user, or 422 if parameters are invalid
 */
GET /alias/{userId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "userId": "string", // User ID
  "alias": "string", // Alias value
  "dataScadenza": "string" // Alias expiry date (dd/MM/yyyy)
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

### `GET /annoRif/{tipoDataRifCod}` - Get reference academic year

```java
/**
 * Returns the reference academic year for a given reference date type,
 * optionally filtered by course type and reference date.
 *
 * @param tipoDataRifCod string (path, required)  - reference date type code
 *                                                   (e.g. DR_OFF, DR_SUA, DR_ISCR)
 * @param tipoCorsoCod   string (query, optional) - course type code
 *                                                   (e.g. L1, L2, LS, LM)
 * @param dataRif        string (query, optional) - reference date (dd/MM/yyyy)
 * @return AnnoDiRiferimento the reference academic year data,
 *         or 422 if parameters are invalid
 */
GET /annoRif/{tipoDataRifCod}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "tipoDataRifCod": "string", // Reference date type code (primary key)
  "tipoCorsoCod": "string", // Course type code
  "aaId": 2019, // Reference academic year ID
  "dataRif": "string" // Reference date (dd/MM/yyyy)
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

### `GET /elenchi/{tstId}` - Get list by ID

```java
/**
 * Returns the entries of a specific list identified by its header ID,
 * extracting data from the P04_ELENCO_TST and P04_ELENCO_DETT tables.
 *
 * @param tstId long   (path, required)  - unique list header ID
 * @param start int    (query, optional) - index of the first record to load,
 *                                         defaults to 0
 * @param limit int    (query, optional) - number of records to retrieve
 *                                         starting from start, defaults
 *                                         to 50, allowed range: 0–100
 * @param order string (query, optional) - sort order; prefix + (ASC) or -
 *                                         (DESC) followed by field name;
 *                                         multiple fields comma-separated
 *                                         (e.g. +aaId,-stuId)
 * @return List<ElencoDettaglio> paginated list entries,
 *         or an empty array if none are found
 */
GET /elenchi/{tstId}
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "codice": "string", // Entry code
    "des": "string", // Entry description
    "aaId": 2019, // Academic year ID
    "tipoElencoCod": "string", // List type code
    "dataGeneraz": "string", // Generation date (dd/MM/yyyy)
    "statoElenco": "C", // List status code
    "stuId": 78901, // Student career ID
    "persId": "string", // Person ID
    "elimFlg": 0, // Deleted from list flag (1=yes, 0=no)
    "stampaFlg": 0 // Document printed flag (1=yes, 0=no)
  }
]
```

<br>

---

<br>

### `GET /grp-utenti` - Get user groups

```java
/**
 * Returns the list of user groups managed in ESSE3 REST.
 *
 * @param none
 * @return List<GruppoUtente> list of user groups
 */
GET /grp-utenti
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "grpId": 6, // Group ID
    "name": "studenti", // Group name
    "utenteTecnicoFlg": false, // Technical user flag
    "tabAna": "p01_anaper", // Registry table name
    "fieldAna": "pers_id", // Registry table key field
    "httpSessionTimeout": 60, // HTTP session timeout (seconds)
    "requestWindowLimit": 60, // Request window limit
    "maxRequestWindow": 60 // Maximum request window size
  }
]
```

<br>

---

<br>

### `GET /grp-utenti/{grpId}` - Get user group by ID

```java
/**
 * Returns the details of a specific user group identified by its ID.
 *
 * @param grpId int (path, required) - unique group ID
 * @return GruppoUtente the user group details, or 404 if not found
 */
GET /grp-utenti/{grpId}
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as a single entry in [`GET /grp-utenti`](#get-grp-utenti-get-user-groups), returned as a single object rather than an array.

```json
{
  "grpId": 6, // Group ID
  "name": "studenti", // Group name
  "utenteTecnicoFlg": false, // Technical user flag
  "tabAna": "p01_anaper", // Registry table name
  "fieldAna": "pers_id", // Registry table key field
  "httpSessionTimeout": 60, // HTTP session timeout (seconds)
  "requestWindowLimit": 60, // Request window limit
  "maxRequestWindow": 60 // Maximum request window size
}
```

<br>

---

<br>

### `GET /par-conf` - Get configuration parameters

```java
/**
 * Returns the list of configuration parameters, optionally filtered by
 * module, product, description, and note.
 *
 * @param modulo  string (query, optional) - module the parameter belongs to
 * @param prodotto string (query, optional) - product the parameter belongs to
 * @param des     string (query, optional) - parameter description;
 *                                           supports wildcard * for LIKE search
 * @param nota    string (query, optional) - parameter note;
 *                                           supports wildcard * for LIKE search
 * @param start   int    (query, optional) - index of the first record to load,
 *                                           defaults to 0
 * @param limit   int    (query, optional) - number of records to retrieve
 *                                           starting from start, defaults
 *                                           to 50, allowed range: 0–100
 * @param order   string (query, optional) - sort order; prefix + (ASC) or -
 *                                           (DESC) followed by field name;
 *                                           multiple fields comma-separated
 *                                           (e.g. +parCod,-modulo)
 * @return List<ParametroDiConfigurazione> paginated list of configuration
 *         parameters, or an empty array if none match
 */
GET /par-conf
```

**Auth:** `UserTecnicoMassivo` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` · `SOGG_EST` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "parCod": "BI_SYLLABUS", // Parameter code (primary key)
    "modulo": "string", // Module
    "prodotto": "ESSE3", // Product
    "descrizione": "string", // Description
    "nota": "string", // Note
    "valNum": 1, // Numeric value
    "valAlfa": "CDS" // Alphanumeric value
  }
]
```

<br>

---

<br>

### `GET /par-conf/{parCod}` - Get configuration parameter by code

```java
/**
 * Returns the details of a specific configuration parameter identified
 * by its code.
 *
 * @param parCod string (path, required) - unique parameter code
 * @return ParametroDiConfigurazione the parameter details,
 *         or 404 if not found
 */
GET /par-conf/{parCod}
```

**Auth:** `UserTecnicoMassivo` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` · `DOCENTE` · `SOGG_EST` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as a single entry in [`GET /par-conf`](#get-par-conf-get-configuration-parameters), returned as a single object rather than an array.

```json
{
  "parCod": "BI_SYLLABUS", // Parameter code (primary key)
  "modulo": "string", // Module
  "prodotto": "ESSE3", // Product
  "descrizione": "string", // Description
  "nota": "string", // Note
  "valNum": 1, // Numeric value
  "valAlfa": "CDS" // Alphanumeric value
}
```

<br>

---

<br>

### `GET /utente-info/{userId}` - Get user info

```java
/**
 * Returns the account data for a specific user identified by userId,
 * optionally also searching among valid aliases.
 *
 * @param userId           string (path, required)  - unique user ID from
 *                                                     the P18_USER table
 * @param abilRecuperoAlias int   (query, optional) - whether to also search
 *                                                     among valid aliases;
 *                                                     0=user only (default),
 *                                                     1=user and aliases;
 *                                                     allowed range: 0–1
 * @return UtenteInfo the user account data, or 404 if not found
 */
GET /utente-info/{userId}
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "userId": "string", // User ID
  "alias": "string", // User alias
  "grpName": "Studenti", // User group name
  "disableFlg": 0, // Disabled flag (1=yes, 0=no)
  "userName": "string" // Display name
}
```

<br>

---

<br>

## Endpoints - Alias (Alias)

### `POST /alias/{userId}` - Insert or update user alias

```java
/**
 * Inserts a new alias for a user or updates the expiry date if the alias
 * already exists. The user can be identified via userId - the corresponding
 * person can be determined from the fiscal code using the users retrieval
 * service.
 *
 * @param userId       string (path, required)  - unique user ID from
 *                                                 the P18_USER table
 * @param alias        string (query, required) - alias to assign
 * @param dataScadenza string (query, optional) - alias expiry date (dd/MM/yyyy)
 * @return Alias the inserted or updated alias data,
 *         or 422 if the operation failed
 */
POST /alias/{userId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`201 Created`**

```json
{
  "userId": "string", // User ID
  "alias": "string", // Alias value
  "dataScadenza": "string" // Alias expiry date (dd/MM/yyyy)
}
```

**`422 Unprocessable Entity`** - update failed

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

### `DELETE /alias/{userId}` - Delete user alias

```java
/**
 * Deletes the alias associated with a specific user account.
 *
 * @param userId string (path, required)  - unique user ID from
 *                                          the P18_USER table
 * @param alias  string (query, required) - alias to delete
 * @return RitornoAlias return code confirming deletion,
 *         or 422 if parameters are invalid
 */
DELETE /alias/{userId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`204 No Content`**

```json
{
  "codiceRitorno": 1 // Return code (1=success)
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

## Endpoints - Structural Data (Dati Strutturali)

### `GET /dati-strutturali/lingue` - Get languages

```java
/**
 * Returns the list of languages managed in ESSE3.
 *
 * @param none
 * @return List<Lingua> list of languages
 */
GET /dati-strutturali/lingue
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "linguaId": 1, // Language ID
    "des": "Inglese", // Language description
    "iso6392Codice": "eng", // ISO 639-2 language code
    "iso6391Codice": "en", // ISO 639-1 language code
    "mobildes": "string", // Mobile description
    "dsFlg": 1, // DS flag (1=yes, 0=no)
    "sysFlg": 1, // System language flag (1=yes, 0=no)
    "mobilFlg": 1, // Mobile enabled flag (1=yes, 0=no)
    "webMlFlg": 1, // Web multilingual flag (1=yes, 0=no)
    "madrelinguaFlg": 1, // Native language flag (1=yes, 0=no)
    "certFlg": 1 // Certification flag (1=yes, 0=no)
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

## Endpoints - Groups (grp)

### `GET /grp-utenti/{grpId}/args` - Get group arguments

```java
/**
 * Returns the arguments associated with a specific user group,
 * used to define the group's access scope.
 *
 * @param grpId int (path, required) - unique group ID
 * @return List<GruppoArgomento> list of arguments for the group,
 *         or an empty array if none are found
 */
GET /grp-utenti/{grpId}/args
```

**Auth:** `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "grpId": 100, // Group ID
    "argType": "cdsId", // Argument type (e.g. CDS_ID, FacId, TipoCorsoCod, SedeId)
    "argValue": "string" // Argument value
  }
]
```

<br>

---

<br>

### `GET /grp-utenti/{grpId}/args/{argType}/{argValue}` - Get group argument by type and value

```java
/**
 * Returns a specific argument associated with a user group, identified
 * by group ID, argument type, and argument value.
 *
 * @param grpId    int    (path, required) - unique group ID
 * @param argType  string (path, required) - argument type;
 *                                           allowed values: CDS_ID, FacId,
 *                                           TipoCorsoCod, SedeId
 * @param argValue string (path, required) - argument value
 * @return GruppoArgomento the group argument, or 404 if not found
 */
GET /grp-utenti/{grpId}/args/{argType}/{argValue}
```

**Auth:** `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "grpId": 100, // Group ID
  "argType": "cdsId", // Argument type (CDS_ID/FacId/TipoCorsoCod/SedeId)
  "argValue": "string" // Argument value
}
```

<br>

---

<br>

### `PUT /grp-utenti/{grpId}/args/{argType}/{argValue}` - Update group argument

```java
/**
 * Creates or updates a specific argument associated with a user group,
 * identified by group ID, argument type, and argument value.
 *
 * @param grpId    int    (path, required) - unique group ID
 * @param argType  string (path, required) - argument type;
 *                                           allowed values: CDS_ID, FacId,
 *                                           TipoCorsoCod, SedeId
 * @param argValue string (path, required) - argument value
 * @return GruppoArgomento the updated group argument,
 *         or 422 if the operation failed
 */
PUT /grp-utenti/{grpId}/args/{argType}/{argValue}
```

**Auth:** `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "grpId": 100, // Group ID
  "argType": "cdsId", // Argument type (CDS_ID/FacId/TipoCorsoCod/SedeId)
  "argValue": "string" // Argument value
}
```

**`422 Unprocessable Entity`** - operation failed

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

### `DELETE /grp-utenti/{grpId}/args/{argType}/{argValue}` - Delete group argument

```java
/**
 * Deletes a specific argument associated with a user group, identified
 * by group ID, argument type, and argument value.
 *
 * @param grpId    int    (path, required) - unique group ID
 * @param argType  string (path, required) - argument type;
 *                                           allowed values: CDS_ID, FacId,
 *                                           TipoCorsoCod, SedeId
 * @param argValue string (path, required) - argument value
 * @return 204 if deletion succeeded, 422 if the operation failed
 */
DELETE /grp-utenti/{grpId}/args/{argType}/{argValue}
```

**Auth:** `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`204 No Content`** - deletion succeeded, no body returned

**`422 Unprocessable Entity`** - deletion failed

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

## Endpoints - Types (Tipologie)

### `GET /tipologie/docIdent` - Get identity document types

```java
/**
 * Returns the list of identity document types with descriptions in the
 * requested language. Defaults to Italian (ita) if no language is specified.
 *
 * @param iso6392Cod string (query, optional) - ISO 639-2 language code
 *                                              for descriptions; defaults
 *                                              to 'ita' if not provided
 * @return List<TipoDocIdentita> list of identity document types
 */
GET /tipologie/docIdent
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "docIdentTipoCod": "PAT", // Document type code
    "des": "Patente" // Document type description
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

### `GET /tipologie/indirizzi` - Get address types

```java
/**
 * Returns the list of address types managed in ESSE3.
 *
 * @param none
 * @return List<TipoIndirizzo> list of address types
 */
GET /tipologie/indirizzi
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoIndirizCod": "N", // Address type code
    "des": "Nascita" // Address type description
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

### `GET /tipologie/riconoscimento-ad` - Get teaching activity recognition types

```java
/**
 * Returns the list of recognition types for teaching activities managed
 * in ESSE3.
 *
 * @param none
 * @return List<TipoRiconoscimento> list of teaching activity recognition types
 */
GET /tipologie/riconoscimento-ad
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoRicCod": "T", // Recognition type code
    "des": "string", // Recognition type description
    "sysFlg": 0, // System type flag (1=yes, 0=no)
    "straFlg": 0, // Foreign recognition flag (1=yes, 0=no)
    "abbrFlg": 0, // Abbreviation flag (1=yes, 0=no)
    "ingrFlg": 1, // Entry recognition flag (1=yes, 0=no)
    "ansTipoRicCod": "string", // ANS recognition type code
    "nota": "string", // Note
    "notaCertFlg": 1, // Certified note flag (1=yes, 0=no)
    "bonusLaurea": 1, // Degree bonus flag (1=yes, 0=no)
    "dsTipoRicCod": "AA", // DS recognition type code
    "interateFlg": 0 // Inter-institution flag (1=yes, 0=no)
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

### `GET /tipologie/rimborsi` - Get payment refund types

```java
/**
 * Returns the list of payment refund types with descriptions in the
 * requested language. Defaults to Italian (ita) if no language is specified.
 *
 * @param iso6392Cod string (query, optional) - ISO 639-2 language code
 *                                              for descriptions; defaults
 *                                              to 'ita' if not provided
 * @return List<TipoRimborsoPagamento> list of payment refund types
 */
GET /tipologie/rimborsi
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoRimbPagCod": "PF", // Payment/refund type code
    "des": "string", // Description
    "tipoRimbPagCodAte": "AT", // Institution payment type code
    "rimbPag": 2, // Type: 1=payment, 2=refund
    "sysFlg": 1, // System type flag (1=yes, 0=no)
    "visEmissFlg": 0, // Visible in emission flag (1=yes, 0=no)
    "visAcqPagFlg": 1, // Visible in payment acquisition flag (1=yes, 0=no)
    "stampabileFlg": 0, // Printable flag (1=yes, 0=no)
    "stampabileDaWebFlg": 1, // Web-printable flag (1=yes, 0=no)
    "numBollModifFlg": 1, // Bulletin number editable flag (1=yes, 0=no)
    "elabEmissFlg": 1, // Emission processing flag (1=yes, 0=no)
    "baseNumeroLottoMav": "111", // MAV lot base number
    "maxProgrLottoMav": 1234, // MAV lot max progressive number
    "webFlg": 1, // Web enabled flag (1=yes, 0=no)
    "abilInsDettBancaWeb": 0, // Web bank details entry enabled (1=yes, 0=no)
    "abilInsDettBanca": 0, // Bank details entry enabled (1=yes, 0=no)
    "tipologiaLottoMav": "N", // MAV lot type
    "ugovCdModPag": "CT", // U-Gov payment method code
    "defElabFlgPagMan": 1, // Default manual payment processing flag (1=yes, 0=no)
    "pagNodoFlg": 0, // PagoPA node payment flag (1=yes, 0=no)
    "pagEnteEstFlg": 1, // External entity payment flag (1=yes, 0=no)
    "cartaDocFlg": 0, // Document card flag (1=yes, 0=no)
    "esclEntratelFlg": 0, // Entratel exclusion flag (1=yes, 0=no)
    "codServizio": "123", // Service code
    "codSottoservizio": "456", // Sub-service code
    "paCcId": 10, // PA bank account ID
    "abilPagRest": 0 // REST payment enabled flag (1=yes, 0=no)
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

### `GET /tipologie/statiCivili` - Get marital status types

```java
/**
 * Returns the list of marital status types with descriptions in the
 * requested language. Defaults to Italian (ita) if no language is specified.
 *
 * @param iso6392Cod string (query, optional) - ISO 639-2 language code
 *                                              for descriptions; defaults
 *                                              to 'ita' if not provided
 * @return List<TipoStatoCivile> list of marital status types
 */
GET /tipologie/statiCivili
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "statoCivileCod": "N", // Marital status code
    "des": "Nubile" // Marital status description
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

## Endpoints - Translator (Translator)

### `PUT /translator/cod-to-id` - Translate codes to IDs

```java
/**
 * Translates a list of codes to their corresponding database IDs.
 * Supports the following data types:
 *
 * - AD       : p09_ad_gen.cod → p09_ad_gen.ad_id (simple key)
 * - CDS      : p06_cds.cod → p06_cds.cds_id (simple key)
 * - PDS      : p06_pdsord.cod → p06_pdsord.pds_id (composite key:
 *              requires cds_cod + aa_ord_id + pds_id)
 * - PDSORD   : p06_pdsord.cod → p06_pdsord.pdsord_id (simple key;
 *              composite also available via cds_cod + aa_ord_id + pds_id)
 *
 * For composite keys, additional codes must be provided via the cods array
 * and the response will populate the chiaveComposta array with the
 * corresponding IDs.
 *
 * @param body object (body, required) - list of translation requests,
 *                                        each with a type, primary code,
 *                                        and optional additional codes
 * @return List<CodToIdTranslatorResponseObject> translation results with
 *         resolved IDs and any error messages for unresolved codes
 */
PUT /translator/cod-to-id
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "objs": [
    {
      "type": "AD", // Data type to translate (AD/CDS/PDS/PDSORD)
      "cod": "AD_COD", // Primary code to translate
      "cods": ["string"] // Additional codes for composite keys (optional)
    }
  ]
}
```

#### Response

**`200 OK`**

```json
[
  {
    "type": "AD", // Data type
    "cod": "AD_COD", // Input primary code
    "cods": ["string"], // Input additional codes
    "id": 100, // Resolved primary ID
    "chiaveComposta": [
      // Resolved composite key IDs (populated for PDS/PDSORD)
      {
        "id": 1, // Resolved ID value
        "name": "cds_id" // Field name
      }
    ],
    "err": "string" // Error message if translation failed (null if ok)
  }
]
```

<br>

---

<br>

## Endpoints - Admin (Admin)

### `GET /version-info` - Get system version info

```java
/**
 * Returns system and build information for the ESSE3 REST application.
 *
 * @param none
 * @return VersionInfo system details including build version, environment,
 *         institution, and runtime info
 */
GET /version-info
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "remoteAddress": "string", // Client IP address
  "encoding": "UTF-8", // Server encoding
  "univName": "CINECA", // Institution name
  "ambienteType": "LOCAL", // Environment type (LOCAL/TEST/PROD)
  "buildId": "string", // Build ID and timestamp
  "buildTag": "string", // Full CI build tag
  "buildVersion": "string", // ESSE3 build version
  "versione": "string", // ESSE3 version
  "ate": 1, // Institution ID
  "servletcontainerInfo": "string", // Servlet container info
  "webappStartTime": "string", // Web application start time (dd/MM/yyyy HH:mm:ss)
  "jmvStartTime": "string" // JVM start time (dd/MM/yyyy HH:mm:ss)
}
```

**`401 Unauthorized`** - login failed

<br>

---

<br>

---

## References

- **Swagger UI:** [Servizi Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Servizi%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fservizi-service-v1)#/>)
- **Spec YAML:** [p18-serviziApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p18-serviziApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
