---
title: Utenti API V1 | OhMyUniversity!
description: REST API documentation for the Utenti service (utenti-service-v1) - retrieval and management of user data in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Utenti API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Utenti service (utenti-service-v1) - retrieval and management of user data in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/utenti-api-v1
  - - meta
    - name: keywords
      content: utenti api, users api, esse3 rest api, cineca api, ohmyuniversity api, dati firma, alias utente, tratticarriera, user management
  - - meta
    - name: twitter:title
      content: Utenti API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Utenti service (utenti-service-v1) - retrieval and management of user data in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Utenti API V1

**ENG:** `Users`

**Version:** `1.0.0` · **Base URL:** `/utenti-service-v1`

REST API for retrieving user information and performing operations on them.

---

## Endpoints - Users (Utenti)

### `GET /utenti` - Get enabled users

```java
/**
 * Returns the paginated list of enabled users present in the system.
 * Results can be filtered by name, fiscal code, group, email, userId,
 * and granted functions.
 *
 * @param nome          string (query, optional) - user first name; supports
 *                                                  wildcard * for LIKE search
 * @param cognome       string (query, optional) - user last name; supports
 *                                                  wildcard * for LIKE search
 * @param codFis        string (query, optional) - user fiscal code
 * @param grpId         long   (query, optional) - user group ID
 * @param email         string (query, optional) - personal or institutional
 *                                                  email address
 * @param userId        string (query, optional) - user ID
 * @param grants        string (query, optional) - comma-separated list of
 *                                                  function names
 * @param optionalFields string (query, optional) - comma-separated list of
 *                                                  optional fields to include;
 *                                                  use ALL for all fields;
 *                                                  supports Ant Glob Patterns
 *                                                  (e.g. childObj.prop1,
 *                                                  childObj.*, childObj.**)
 * @param start         int    (query, optional) - index of the first record
 *                                                  to load, defaults to 0
 * @param limit         int    (query, optional) - number of records to retrieve
 *                                                  starting from start, defaults
 *                                                  to 50, allowed range: 0–100
 * @param order         string (query, optional) - sort order; prefix + (ASC) or
 *                                                  - (DESC) followed by field name;
 *                                                  multiple fields comma-separated
 *                                                  (e.g. +cognome,-userId)
 * @return List<Utente> paginated list of users, or an empty array if none match
 */
GET /utenti
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent` - low-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "userId": "1", // User ID (primary key)
    "persId": 1, // Person ID
    "docenteId": 1, // Teacher ID
    "soggEstId": 1, // External subject ID
    "codFis": "string", // Fiscal code
    "nome": "Paolo", // First name
    "cognome": "Rossi", // Last name
    "docenteDataFinAtt": "string", // Teacher end of activity date (dd/MM/yyyy)
    "grpId": 3, // User group ID
    "grpName": "Administrator", // User group name
    "dataModPwd": "string", // Last password change date (dd/MM/yyyy)
    "cambiaPwdFlg": 1, // Force password change flag (1=yes, 0=no)
    "pwdExpireStart": "string", // Password expiry start date (dd/MM/yyyy)
    "externalId": "12345", // External system ID
    "flgExternal": 1, // External user flag (1=yes, 0=no)
    "tipoFirmaId": 12345, // Signature type ID
    "cod": "AUTOGRAFA", // Signature type code
    "des": "Firma Autografa", // Signature type description
    "profilo": "STUDENTE", // User profile
    "email": "string", // Personal email
    "emailAte": "string", // Institutional email
    "alias": "12345", // User alias
    "grants": [
      // Granted functions (optional field)
      {
        "funName": "string", // Function name (primary key)
        "funId": 1526, // Function ID
        "funDescr": "string" // Function description (optional field)
      }
    ],
    "aliasUtente": [
      // User alias list (optional field)
      {
        "alias": "alias", // Alias value
        "dataScadenza": "string", // Alias expiry date (dd/MM/yyyy)
        "tipologia": "SPID_CODE" // Alias type (e.g. SPID_CODE)
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

### `GET /utenti/{userId}` - Get user by ID

```java
/**
 * Returns the details of a single enabled user identified by userId.
 *
 * @param userId           string (path, required)  - unique user account ID
 * @param caseSensitive    int    (query, optional) - whether userId matching is
 *                                                    case sensitive; 1=sensitive
 *                                                    (default), 0=ignore case;
 *                                                    allowed range: 0–1
 * @param grants           string (query, optional) - comma-separated list of
 *                                                    function names to filter by
 * @param abilRecuperoAlias int   (query, optional) - whether to also search among
 *                                                    valid aliases; 0=user only
 *                                                    (default), 1=user and aliases;
 *                                                    allowed range: 0–1
 * @param optionalFields   string (query, optional) - comma-separated list of
 *                                                    optional fields to include;
 *                                                    use ALL for all fields;
 *                                                    supports Ant Glob Patterns
 *                                                    (e.g. childObj.prop1,
 *                                                    childObj.*, childObj.**)
 * @return Utente the matching user, or 404 if not found
 */
GET /utenti/{userId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "userId": "1", // User ID (primary key)
    "persId": 1, // Person ID
    "docenteId": 1, // Teacher ID
    "soggEstId": 1, // External subject ID
    "codFis": "string", // Fiscal code
    "nome": "Paolo", // First name
    "cognome": "Rossi", // Last name
    "docenteDataFinAtt": "string", // Teacher end of activity date (dd/MM/yyyy)
    "grpId": 3, // User group ID
    "grpName": "Administrator", // User group name
    "dataModPwd": "string", // Last password change date (dd/MM/yyyy)
    "cambiaPwdFlg": 1, // Force password change flag (1=yes, 0=no)
    "pwdExpireStart": "string", // Password expiry start date (dd/MM/yyyy)
    "externalId": "12345", // External system ID
    "flgExternal": 1, // External user flag (1=yes, 0=no)
    "tipoFirmaId": 12345, // Signature type ID
    "cod": "AUTOGRAFA", // Signature type code
    "des": "Firma Autografa", // Signature type description
    "profilo": "STUDENTE", // User profile
    "email": "string", // Personal email
    "emailAte": "string", // Institutional email
    "alias": "12345", // User alias
    "grants": [
      // Granted functions (optional field)
      {
        "funName": "string", // Function name (primary key)
        "funId": 1526, // Function ID
        "funDescr": "string" // Function description (optional field)
      }
    ],
    "aliasUtente": [
      // User alias list (optional field)
      {
        "alias": "alias", // Alias value
        "dataScadenza": "string", // Alias expiry date (dd/MM/yyyy)
        "tipologia": "SPID_CODE" // Alias type (e.g. SPID_CODE)
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

## Endpoints - Signature (Firma)

### `POST /utenti/datiFirma` - Update user signature data

```java
/**
 * Updates the signature data of users identified by fiscal code.
 * Accepts the same format as the CSV endpoint but as JSON.
 * On completion, returns the result for each entry including any
 * error messages for users not found or not updatable.
 *
 * @param body object (body, required) - import payload containing:
 *               - datiFirma array - list of signature data entries,
 *                                   each identified by codFis
 * @return List<DatiFirmaResponse> result per entry with outcome code
 *         and error message if applicable
 */
POST /utenti/datiFirma
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "datiFirma": [
    {
      "codFis": "string", // User fiscal code (required)
      "tipoFirmaId": 3, // Signature type ID
      "hsmPrefix": "CINECA", // HSM prefix
      "tipoFirmaFaId": 8, // FA signature type ID
      "faPrefix": "CINECA_AAH04" // FA prefix
    }
  ]
}
```

#### Response

**`201 Created`**

```json
[
  {
    "codFis": "string", // User fiscal code
    "tipoFirmaId": 3, // Signature type ID
    "hsmPrefix": "CINECA", // HSM prefix
    "tipoFirmaFaId": 8, // FA signature type ID
    "faPrefix": "CINECA_AAH04", // FA prefix
    "retCod": 1, // Return code (1=error, 0=success)
    "errMsg": "string" // Error message if update failed
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

### `POST /utenti/datiFirma/csv` - Update user signature data via CSV

```java
/**
 * Updates the signature data of users identified by fiscal code,
 * accepting a CSV file as input. Equivalent to POST /utenti/datiFirma
 * but with CSV format instead of JSON.
 *
 * The CSV must contain the following columns in order:
 * codFis, tipoFirmaId, hsmPrefix, tipoFirmaFaId, faPrefix, cod_fis
 *
 * - tipoFirmaId  : signature type from ESSE3 tipi_firma table
 *                  (e.g. 1=Autografa, 2=Smart_card, 3=INFOCERT) - used for REMOTE signing
 * - tipoFirmaFaId: same table, used for AUTOMATIC signing
 * - hsmPrefix / faPrefix: provider-specific prefix, same value as in the ESSE3 client
 * - null fields must be passed as the string "null"
 *
 * @param body      string (body, required)  - CSV file content
 * @param delimiter string (query, optional) - CSV column delimiter,
 *                                             defaults to ","
 * @return string CSV response with the outcome per row
 */
POST /utenti/datiFirma/csv
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`201 Created`** - `text/csv`

```
string // CSV output with update results per row
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

## Endpoints - Digital Identity (Identità Digitale)

### `PUT /utenti/{userId}/cie` - Associate CIE credentials to user

```java
/**
 * Associates a CIE code to a user account, only if the association
 * does not already exist. If cieCode is not provided, it defaults to
 * the fiscal code of the associated registry entry. On success,
 * returns the updated user identity data.
 *
 * @param userId  string (path, required)  - unique user account ID
 * @param cieCode string (query, optional) - CIE credential identifier;
 *                                           defaults to the user's fiscal
 *                                           code if not provided
 * @return UtenteIdentitaDigitale updated user identity data,
 *         or 422 if the association already exists or parameters are invalid
 */
PUT /utenti/{userId}/cie
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "userId": "1", // User ID
  "spidCode": "string", // Associated SPID credential identifier
  "cieCode": "string" // Associated CIE credential identifier
}
```

**`422 Unprocessable Entity`** - invalid parameters or association already exists

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

### `GET /utenti/{userId}/identitaDigitale` - Get digital identity

```java
/**
 * Returns the SPID code and CIE code associated with a user account.
 *
 * @param userId string (path, required) - unique user account ID
 * @return UtenteIdentitaDigitale the digital identity data for the user,
 *         or 404 if not found
 */
GET /utenti/{userId}/identitaDigitale
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "userId": "1", // User ID
  "spidCode": "string", // Associated SPID credential identifier
  "cieCode": "string" // Associated CIE credential identifier
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

### `PUT /utenti/{userId}/spid` - Associate SPID credentials to user

```java
/**
 * Associates a SPID code to a user account, only if the association
 * does not already exist. If spidCode is not provided, it defaults to
 * the fiscal code of the associated registry entry. On success,
 * returns the updated user identity data.
 *
 * @param userId   string (path, required)  - unique user account ID
 * @param spidCode string (query, optional) - SPID credential identifier;
 *                                            defaults to the user's fiscal
 *                                            code if not provided
 * @return UtenteIdentitaDigitale updated user identity data,
 *         or 422 if the association already exists or parameters are invalid
 */
PUT /utenti/{userId}/spid
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "userId": "1", // User ID
  "spidCode": "string", // Associated SPID credential identifier
  "cieCode": "string" // Associated CIE credential identifier
}
```

**`422 Unprocessable Entity`** - invalid parameters or association already exists

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

## Endpoints - Careers (Carriere)

### `GET /utenti/{userId}/trattiAttivi` - Get student active careers

```java
/**
 * Returns the list of active student career tracks associated with a user,
 * optionally filtered by career status, fiscal code, student ID, and more.
 *
 * @param userId               string (path, required)  - unique user account ID
 * @param staStuCod            string (query, optional) - career status code
 * @param motStastuCod         string (query, optional) - career status reason code
 * @param codFis               string (query, optional) - user fiscal code
 * @param identificativoUGov   string (query, optional) - U-Gov identifier for
 *                                                         retrieving responsible info
 * @param matricolaStudente    string (query, optional) - student ID number
 * @param codiceEsternoCarriera string (query, optional) - external career code
 * @param order                string (query, optional) - sort order; prefix + (ASC)
 *                                                         or - (DESC) followed by
 *                                                         field name; multiple fields
 *                                                         comma-separated
 *                                                         (e.g. +aaId,-cdsCod)
 * @return List<TrattoCacrieraEsteso> list of active career tracks for the user,
 *         or an empty array if none are found
 */
GET /utenti/{userId}/trattiAttivi
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Person ID
    "stuId": 1, // Student ID
    "cdsId": 123, // Degree course ID
    "aaOrdId": 2016, // Curriculum academic year ID
    "pdsId": 10001, // Study plan ID
    "matId": 1, // Enrollment ID
    "matricola": "123456", // Student ID number
    "userId": "1", // User ID
    "linguaId": 1, // Language ID
    "iso6392Cod": "ita", // ISO 639-2 language code
    "staStuCod": "X", // Career status code
    "staStuDes": "Cessato", // Career status description
    "motStastuCod": "TIT", // Career status reason code
    "motStastuDes": "string", // Career status reason description
    "tipoCorsoCod": "L2", // Course type code
    "tipoCorsoDes": "string", // Course type description
    "tipoTititCod": "L2", // Degree type code
    "tipoTititDes": "string", // Degree type description
    "cdsCod": "CDS_1", // Degree course code
    "cdsDes": "string", // Degree course description
    "ordCod": "ORD_1", // Curriculum code
    "ordDes": "string", // Curriculum description
    "ordNumCiclo": 31, // Curriculum cycle number
    "pdsCod": "PDS_1", // Study plan code
    "pdsDes": "string", // Study plan description
    "aaId": 2011, // Academic year ID
    "aaImm1": 2016, // First enrollment academic year
    "aaImmSu": 2016, // Latest enrollment academic year
    "dataImm": "string", // Enrollment date (dd/MM/yyyy)
    "dataImm1": "string", // First enrollment date (dd/MM/yyyy)
    "dataImmSu": "string", // Latest enrollment date (dd/MM/yyyy)
    "dataChiusura": "string", // Career closure date (dd/MM/yyyy)
    "aaRegId": 2016, // Cohort academic year ID
    "codiceLettore": "7000", // Reader code
    "titoloStudio": 3, // Degree title type
    "tipoLettore": "SM", // Reader type code
    "autDatiPersonali": "S", // Personal data authorization
    "statoTasse": 1, // Tax payment status
    "aaIscrId": 2016, // Last enrollment academic year ID
    "dataIscr": "string", // Last enrollment date (dd/MM/yyyy)
    "ssd": "S123", // Academic disciplinary sector
    "ssdArea": "SA123", // Academic disciplinary sector area
    "sdrDott": "string", // Doctoral research area
    "struttResponsabileCds": {
      "cod": "string", // Responsible structure code
      "des": "string", // Responsible structure description
      "csaCod": "string" // CSA code
    },
    "tutor": {
      "cognomeTutor": "Verdi", // Tutor last name
      "nomeTutor": "Luigi", // Tutor first name
      "docenteIdTutor": 4821, // Tutor teacher ID
      "soggEstIdTutor": 1864, // Tutor external subject ID
      "idAbTutor": 65255, // Tutor U-Gov ID
      "matricolaTutor": "5823" // Tutor ID number
    },
    "tipoCatAmmId": 994, // Administrative category type ID
    "tipoCatAmmDes": "string", // Administrative category type description
    "settCod": "L15A", // Subject area code
    "settDes": "string", // Subject area description
    "idAb": 423, // U-Gov ID
    "codFis": "string", // Fiscal code
    "extStuCod": "string", // External career code
    "areaCod": "2", // Area code
    "areaDes": "string" // Area description
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

### `GET /utenti/{userId}/trattiCarriera` - Get student career tracks

```java
/**
 * Returns all career tracks associated with a student user,
 * optionally filtered by career status, fiscal code, student ID, and more.
 * Unlike /trattiAttivi, this endpoint returns all tracks regardless of status.
 *
 * @param userId                string (path, required)  - unique user account ID
 * @param staStuCod             string (query, optional) - career status code
 * @param motStastuCod          string (query, optional) - career status reason code
 * @param codFis                string (query, optional) - user fiscal code
 * @param identificativoUGov    string (query, optional) - U-Gov identifier for
 *                                                          retrieving responsible info
 * @param matricolaStudente     string (query, optional) - student ID number
 * @param codiceEsternoCarriera string (query, optional) - external career code
 * @param order                 string (query, optional) - sort order; prefix + (ASC)
 *                                                          or - (DESC) followed by
 *                                                          field name; multiple fields
 *                                                          comma-separated
 *                                                          (e.g. +aaId,-cdsCod)
 * @return List<TrattoCarriera> list of all career tracks for the user,
 *         or an empty array if none are found
 */
GET /utenti/{userId}/trattiCarriera
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent` - low-frequency resource, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Person ID
    "stuId": 1, // Student ID
    "cdsId": 123, // Degree course ID
    "aaOrdId": 2016, // Curriculum academic year ID
    "pdsId": 10001, // Study plan ID
    "matId": 1, // Enrollment ID
    "matricola": "123456", // Student ID number
    "userId": "1", // User ID
    "linguaId": 1, // Language ID
    "iso6392Cod": "ita", // ISO 639-2 language code
    "staStuCod": "X", // Career status code
    "staStuDes": "Cessato", // Career status description
    "motStastuCod": "TIT", // Career status reason code
    "motStastuDes": "string", // Career status reason description
    "tipoCorsoCod": "L2", // Course type code
    "tipoCorsoDes": "string", // Course type description
    "tipoTititCod": "L2", // Degree type code
    "tipoTititDes": "string", // Degree type description
    "cdsCod": "CDS_1", // Degree course code
    "cdsDes": "string", // Degree course description
    "ordCod": "ORD_1", // Curriculum code
    "ordDes": "string", // Curriculum description
    "pdsCod": "PDS_1", // Study plan code
    "pdsDes": "string", // Study plan description
    "aaId": 2011, // Academic year ID
    "aaImm1": 2016, // First enrollment academic year
    "aaImmSu": 2016, // Latest enrollment academic year
    "dataImm": "string", // Enrollment date (dd/MM/yyyy)
    "dataImm1": "string", // First enrollment date (dd/MM/yyyy)
    "dataImmSu": "string", // Latest enrollment date (dd/MM/yyyy)
    "dataChiusura": "string", // Career closure date (dd/MM/yyyy)
    "aaRegId": 2016, // Cohort academic year ID
    "staMatCod": "S", // Enrollment status code
    "motStamatCod": "P", // Enrollment status reason code
    "umPesoDes": "Crediti", // Weight unit description
    "codiceLettore": "7000", // Reader code
    "titoloStudio": 3, // Degree title type
    "tipoLettore": "SM", // Reader type code
    "autDatiPersonali": "S", // Personal data authorization
    "statoTasse": 1, // Tax payment status
    "aaIscrId": 2016, // Last enrollment academic year ID
    "dataIscr": "string", // Last enrollment date (dd/MM/yyyy)
    "tipoCatAmmId": 994, // Administrative category type ID
    "tipoCatAmmDes": "string", // Administrative category type description
    "idAb": 423, // U-Gov ID
    "codFis": "string", // Fiscal code
    "extStuCod": "string" // External career code
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

- **Swagger UI:** [Utenti Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Utenti%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Futenti-service-v1)#/>)
- **Spec YAML:** [p18-utentiApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p18-utentiApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
