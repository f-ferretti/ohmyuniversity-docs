---
title: Carriere API V1 | OhMyUniversity!
description: REST API documentation for the Carriere service (carriere-service-v1) - student career management in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Carriere API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Carriere service (carriere-service-v1) - student career management in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/carriere-api-v1
  - - meta
    - name: keywords
      content: carriere api, careers api, student careers api, esse3 rest api, cineca api, ohmyuniversity api, carriere-service-v1, enrollment, student management
  - - meta
    - name: twitter:title
      content: Carriere API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Carriere service (carriere-service-v1) - student career management in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Carriere API V1

**ENG:** `Careers`

**Version:** `1.0.0` · **Base URL:** `/carriere-service-v1`

ESSE3 REST API that provides access to student career information, including enrollments, annual subscriptions, career notes, and graduation data.

---

## Endpoints - Careers (Carriere)

### `GET /carriere` - Get student careers

```java
/**
 * Retrieves the list of 'Carriera' objects. The optional parameters start and
 * limit allow paginating results. Careers can be filtered using course,
 * ordering, and student segment parameters. If the aaIdDa parameter is set,
 * the aaId parameter will be ignored.
 *
 * @param userId               string (query, optional)            - unique ID to identify the user account
 * @param cognome              string (query, optional)            - user surname (use * wildcard for LIKE matching)
 * @param nome                 string (query, optional)            - user first name (use * wildcard for LIKE matching)
 * @param codFis               string (query, optional)            - user tax code
 * @param staStuCod            string (query, optional)            - career status code
 * @param aaId                 string (query, optional)            - enrollment academic year
 * @param identificativo U-Gov string (query, optional)            - U-Gov identifier to retrieve responsible person info
 * @param matricolaStudente    string (query, optional)            - student ID number
 * @param Codice esterno carriera string (query, optional)         - external career code
 * @param soloImmatricolati    integer (query, optional)           - if 1, retrieve enrolled students only; if 0, include non-enrolled
 * @param daOraMod             string (query, optional)            - last modification time (HH:MI:SS); retrieves all records modified after this time
 * @param cdsId                integer (query, optional)           - degree course ID
 * @param cdsCod               string (query, optional)            - degree course code
 * @param tipoCorsoCod         string (query, optional)            - degree course type code
 * @param aaIdDa               integer (query, optional)           - starting enrollment year; retrieves careers with aaId >= this value
 * @param daDataMod            string (query, optional)            - last modification date; retrieves all records modified after this date
 * @param start                integer (query, optional)           - used with `limit` for record pagination
 * @param limit                integer (query, optional)           - used with `start` for pagination; indicates the number of records to return
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @param aaIscrId             integer (query, optional)           - latest annual enrollment year
 * @param soloAttivi           integer (query, optional)           - if set, retrieve only active, hypothetical, or suspended careers (excludes outgoing transfers)
 * @param codiceEsi            string (query, optional)            - ESI code - European Student Identifier
 * @return List<Carriera> on success,
 *         DettaglioErrore on failure
 */
GET /carriere
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Unique ID identifying the person
    "cognome": "Rossi", // Person surname
    "nome": "Mario", // Person first name
    "dataNascita": "10/10/2007", // Date of birth
    "sesso": "F", // Person gender
    "userId": "auserid", // Unique ID identifying the user account
    "codFis": "GGGTTT81XA944H", // Person tax code
    "email": "mario.rossi@gmail.com", // Student personal email
    "emailAte": "m.rossi@ate.studio.it", // University-assigned email address
    "staStuCod": "X", // Career status code
    "motStastuCod": "TIT", // Career status reason code
    "aaId": 2016, // Enrollment academic year
    "dataImm": "10/10/2016", // Enrollment date
    "statiStuDes": "Cessata", // Career status description
    "motStastuDes": "Titolo", // Career status reason description
    "numProtocollo": "AT134B07", // Protocol number
    "dataIns": "10/10/2016", // Insertion date (DD/MM/YYYY HH24:MI:SS)
    "dataMod": "10/10/2016", // Modification date (DD/MM/YYYY HH24:MI:SS)
    "domCtStato": "CHI", // Degree application status
    "statiDomCtDes": "Chiusa", // Degree application status description
    "aaDes": "2016/2017", // Academic year description
    "aaIscrId": 2016, // Enrollment year
    "matricola": "754657", // Student ID number
    "sedeId": 244, // Campus ID
    "sediDes": "Milano", // Campus description
    "annoCorso": 3, // Current year of study
    "lingue": "Inglese", // Language description
    "dataIscr": "10/10/2016", // Enrollment date
    "settCod": "L3A5", // Sector code
    "settDes": "Storia dell'Italia", // Sector description
    "areaCod": "A5", // Area code
    "areaDes": "Scienze Sociologiche", // Area description
    "areaCodStatMiur": "1304", // MIUR statistics code
    "sdrCod": "300", // Teaching structure code
    "sdrDes": "Università di Modena e Reggio Emilia", // Teaching structure description
    "sdrCsaCod": 393, // Responsible teaching structure ID
    "facCod": "D66", // Faculty code
    "facDes": "facoltà di fisica", // Faculty description
    "facCsaCod": "c10293", // Faculty CSA code
    "idAb": 123123, // U-Gov address book ID
    "extStuCod": "sonoEsterno789", // External career code
    "responsabile": {
      "respNome": "Gabriele", // Responsible person first name
      "respCognome": "D'Annunzio", // Responsible person surname
      "respCodFis": "DNNGRL70A01G482H", // Responsible person tax code
      "respDataNascita": "01/01/1970", // Responsible person date of birth
      "respLuogoNascita": "Pescara", // Responsible person place of birth
      "respMatricola": "12356", // Responsible person ID number
      "respIdAb": "14456", // Responsible person U-Gov ID
      "respDesCarica": "che carica metto a sto responsabile" // Responsible person role description
    }, // Responsible person
    "tutor": {
      "cognomeTutor": "Verdi", // Tutor surname
      "nomeTutor": "Luigi", // Tutor first name
      "docenteIdTutor": 4821, // Tutor ID
      "soggEstIdTutor": 1864, // Tutor ID if external subject
      "idAbTutor": 65255, // Tutor address book ID
      "matricolaTutor": "5823" // Tutor ID number
    }, // Tutor
    "attlauFlg": 1, // Flag indicating student is enrolled in graduation waiting status
    "dataAttlau": "20/04/2020", // Graduation waiting date
    "tipoCatAmmId": 994, // Administrative category type ID
    "tipoCatAmmDes": "Cadetti", // Administrative category type description
    "profstuCod": "DD", // Student profile code
    "profstuDes": "Double Degree", // Student profile description
    "tipoCorsoCod": "L2", // Degree course type code
    "tipoCorsoDes": "Corso di Laurea", // Degree course type description
    "staMatCod": "S", // Student ID status code. System values: A = Active, S = Suspended, I = Hypothetical
    "motStamatCod": "TRI", // Student ID status reason code
    "tipoIscrCod": "IC", // Enrollment type for the specified year: IC = In Progress, FC = Out of Course, RI = Repeating
    "ptFlg": 0, // Flag indicating part-time (1) or full-time (0) enrollment
    "sospFlg": 1, // Flag indicating if the student was suspended in the enrollment year (fictitious enrollment)
    "p06CdsCod": "LSG04", // Degree course mnemonic code
    "p06CdsDes": "Scienze Gastronomiche", // Degree course description
    "matId": 12345, // Career ID
    "aaOrdId": 2016, // Curriculum academic year
    "pdsId": 3, // Study plan ID
    "iscrId": 1, // Student enrollment ID
    "cdsId": 12345, // Degree course ID
    "stuId": 1, // Unique ID identifying the career
    "dataChiusura": "15/01/2025", // Career closure date
    "aaImm1": 2016, // Career start academic year
    "aaRegId": 2018, // Cohort academic year
    "emailCertificata": "email@certificata.it", // Certified email address (PEC)
    "dataFineCarriera": "15/01/2025", // Career end date
    "dataFineCarrieraCalcolata": "15/01/2025", // Calculated career end date
    "archNum": 1234, // Archive number (numeric part)
    "archStr": "a1b2c3", // Archive code (alphanumeric part)
    "codiceEsi": "urn:schac:personalUniqueCode:int:esi:unife.it:191275" // ESI code - European Student Identifier
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere-gdpr/datiMin` - Get minimum student career data (GDPR)

```java
/**
 * Retrieves the list of 'Carriera' objects. The optional parameters start and
 * limit allow paginating results. Careers can be filtered using course,
 * ordering, and student segment parameters. If the aaIdDa parameter is set,
 * the aaId parameter will be ignored.
 *
 * @param userId               string (query, optional)            - unique ID to identify the user account
 * @param cognome              string (query, optional)            - user surname (use * wildcard for LIKE matching)
 * @param nome                 string (query, optional)            - user first name (use * wildcard for LIKE matching)
 * @param codFis               string (query, optional)            - user tax code
 * @param staStuCod            string (query, optional)            - career status code
 * @param aaId                 string (query, optional)            - enrollment academic year
 * @param identificativo U-Gov string (query, optional)            - U-Gov identifier to retrieve responsible person info
 * @param matricolaStudente    string (query, optional)            - student ID number
 * @param Codice esterno carriera string (query, optional)         - external career code
 * @param soloImmatricolati    integer (query, optional)           - if 1, retrieve enrolled students only; if 0, include non-enrolled
 * @param daOraMod             string (query, optional)            - last modification time (HH:MI:SS); retrieves all records modified after this time
 * @param cdsId                integer (query, optional)           - degree course ID
 * @param cdsCod               string (query, optional)            - degree course code
 * @param tipoCorsoCod         string (query, optional)            - degree course type code
 * @param aaIdDa               integer (query, optional)           - starting enrollment year; retrieves careers with aaId >= this value
 * @param daDataMod            string (query, optional)            - last modification date; retrieves all records modified after this date
 * @param start                integer (query, optional)           - used with `limit` for record pagination
 * @param limit                integer (query, optional)           - used with `start` for pagination; indicates the number of records to return
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @param aaIscrId             integer (query, optional)           - latest annual enrollment year
 * @param soloAttivi           integer (query, optional)           - if set, retrieve only active, hypothetical, or suspended careers (excludes outgoing transfers)
 * @return List<CarrieraDatiMinGDPR> on success,
 *         DettaglioErrore on failure
 */
GET /carriere-gdpr/datiMin
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Unique ID identifying the person
    "cognome": "Rossi", // Person surname
    "nome": "Mario", // Person first name
    "nomeAlias": "M. Rossi", // Person alias name
    "dataNascita": "10/10/2007", // Date of birth
    "sesso": "F", // Person gender
    "userId": "auserid", // Unique ID identifying the user account
    "codFis": "GGGTTT81XA944H", // Person tax code
    "email": "mario.rossi@gmail.com", // Student personal email
    "emailAte": "m.rossi@ate.studio.it", // University-assigned email address
    "stuId": 1, // Unique ID identifying the career
    "staStuCod": "X", // Career status code
    "motStastuCod": "TIT", // Career status reason code
    "aaId": 2016, // Enrollment academic year
    "aaDes": "2016/2017", // Academic year description
    "dataImm": "10/10/2016", // Enrollment date
    "statiStuDes": "Cessata", // Career status description
    "motStastuDes": "Titolo", // Career status reason description
    "numProtocollo": "AT134B07", // Protocol number
    "dataIns": "10/10/2016", // Insertion date (DD/MM/YYYY HH24:MI:SS)
    "dataMod": "10/10/2016", // Modification date (DD/MM/YYYY HH24:MI:SS)
    "extStuCod": "sonoEsterno789", // External career code
    "aaIscrId": 2016, // Enrollment year
    "dataIscr": "10/10/2016", // Enrollment date
    "matricola": "754657", // Student ID number
    "staMatCod": "S", // Student ID status code. System values: A = Active, S = Suspended, I = Hypothetical
    "motStamatCod": "TRI", // Student ID status reason code
    "tipoIscrCod": "IC", // Enrollment type for the specified year: IC = In Progress, FC = Out of Course, RI = Repeating
    "ptFlg": 0, // Flag indicating part-time (1) or full-time (0) enrollment
    "sospFlg": 1, // Flag indicating if the student was suspended in the enrollment year (fictitious enrollment)
    "p06CdsCod": "LSG04", // Degree course mnemonic code
    "p06CdsDes": "Scienze Gastronomiche", // Degree course description
    "sedeId": 244, // Campus ID
    "sediDes": "Milano", // Campus description
    "annoCorso": 3, // Current year of study
    "facCod": "D66", // Faculty code
    "facDes": "facoltà di fisica", // Faculty description
    "facCsaCod": "c10293", // Faculty CSA code
    "cdsId": 12345, // Degree course ID
    "tipoCatAmmId": 994, // Administrative category type ID
    "tipoCatAmmDes": "Cadetti", // Administrative category type description
    "profstuCod": "DD", // Student profile code
    "profstuDes": "Double Degree", // Student profile description
    "tipoCorsoCod": "L2", // Degree course type code
    "dataChiusura": "15/01/2025", // Career closure date
    "matId": 11111 // Student ID number ID
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere-gdpr/{stuId}` - Get student career (GDPR)

```java
/**
 * Retrieves the 'CarrieraGdpr' object containing career data including
 * restricted information. Technical users must be enabled by the institution
 * to use this operation.
 *
 * @param stuId                integer (path, required)            - career ID
 * @param optionalFields       string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @return List<CarrieraGdpr> on success
 */
GET /carriere-gdpr/{stuId}
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {}
]
```

<br>

---

<br>

### `PUT /carriere/aggiornaAttesaLaurea` - Update graduation waiting data for a student

```java
/**
 * Updates the graduation waiting flag and date for a student.
 *
 * @param body                 ParametriAttesaLaurea (body, required) - Object with graduation waiting parameters.
 *                                                                       To identify the student, pass at least one of:
 *                                                                       stuId, matricola, aaIscrId
 * @return Carriera on success,
 *         DettaglioErrore on failure
 */
PUT /carriere/aggiornaAttesaLaurea
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "stuId": 12345, // Unique ID identifying the career
  "matricola": "754657", // Student ID number
  "aaIscrId": 2016, // Enrollment year
  "attlauFlg": 1, // Graduation waiting flag (required)
  "dataAttlau": "20/04/2020" // Graduation waiting date
}
```

#### Response

**`200 OK`**

```json
{
  "persId": 1, // Unique ID identifying the person
  "cognome": "Rossi", // Person surname
  "nome": "Mario", // Person first name
  "dataNascita": "10/10/2007", // Date of birth
  "sesso": "F", // Person gender
  "userId": "auserid", // Unique ID identifying the user account
  "codFis": "GGGTTT81XA944H", // Person tax code
  "email": "mario.rossi@gmail.com", // Student personal email
  "emailAte": "m.rossi@ate.studio.it", // University-assigned email address
  "staStuCod": "X", // Career status code
  "motStastuCod": "TIT", // Career status reason code
  "aaId": 2016, // Enrollment academic year
  "dataImm": "10/10/2016", // Enrollment date
  "statiStuDes": "Cessata", // Career status description
  "motStastuDes": "Titolo", // Career status reason description
  "numProtocollo": "AT134B07", // Protocol number
  "dataIns": "10/10/2016", // Insertion date (DD/MM/YYYY HH24:MI:SS)
  "dataMod": "10/10/2016", // Modification date (DD/MM/YYYY HH24:MI:SS)
  "domCtStato": "CHI", // Degree application status
  "statiDomCtDes": "Chiusa", // Degree application status description
  "aaDes": "2016/2017", // Academic year description
  "aaIscrId": 2016, // Enrollment year
  "matricola": "754657", // Student ID number
  "sedeId": 244, // Campus ID
  "sediDes": "Milano", // Campus description
  "annoCorso": 3, // Current year of study
  "lingue": "Inglese", // Language description
  "dataIscr": "10/10/2016", // Enrollment date
  "settCod": "L3A5", // Sector code
  "settDes": "Storia dell'Italia", // Sector description
  "areaCod": "A5", // Area code
  "areaDes": "Scienze Sociologiche", // Area description
  "areaCodStatMiur": "1304", // MIUR statistics code
  "sdrCod": "300", // Teaching structure code
  "sdrDes": "Università di Modena e Reggio Emilia", // Teaching structure description
  "sdrCsaCod": 393, // Responsible teaching structure ID
  "facCod": "D66", // Faculty code
  "facDes": "facoltà di fisica", // Faculty description
  "facCsaCod": "c10293", // Faculty CSA code
  "idAb": 123123, // U-Gov address book ID
  "extStuCod": "sonoEsterno789", // External career code
  "responsabile": {
    "respNome": "Gabriele", // Responsible person first name
    "respCognome": "D'Annunzio", // Responsible person surname
    "respCodFis": "DNNGRL70A01G482H", // Responsible person tax code
    "respDataNascita": "01/01/1970", // Responsible person date of birth
    "respLuogoNascita": "Pescara", // Responsible person place of birth
    "respMatricola": "12356", // Responsible person ID number
    "respIdAb": "14456", // Responsible person U-Gov ID
    "respDesCarica": "che carica metto a sto responsabile" // Responsible person role description
  }, // Responsible person
  "tutor": {
    "cognomeTutor": "Verdi", // Tutor surname
    "nomeTutor": "Luigi", // Tutor first name
    "docenteIdTutor": 4821, // Tutor ID
    "soggEstIdTutor": 1864, // Tutor ID if external subject
    "idAbTutor": 65255, // Tutor address book ID
    "matricolaTutor": "5823" // Tutor ID number
  }, // Tutor
  "attlauFlg": 1, // Flag indicating student is enrolled in graduation waiting status
  "dataAttlau": "20/04/2020", // Graduation waiting date
  "tipoCatAmmId": 994, // Administrative category type ID
  "tipoCatAmmDes": "Cadetti", // Administrative category type description
  "profstuCod": "DD", // Student profile code
  "profstuDes": "Double Degree", // Student profile description
  "tipoCorsoCod": "L2", // Degree course type code
  "tipoCorsoDes": "Corso di Laurea", // Degree course type description
  "staMatCod": "S", // Student ID status code. System values: A = Active, S = Suspended, I = Hypothetical
  "motStamatCod": "TRI", // Student ID status reason code
  "tipoIscrCod": "IC", // Enrollment type for the specified year: IC = In Progress, FC = Out of Course, RI = Repeating
  "ptFlg": 0, // Flag indicating part-time (1) or full-time (0) enrollment
  "sospFlg": 1, // Flag indicating if the student was suspended in the enrollment year (fictitious enrollment)
  "p06CdsCod": "LSG04", // Degree course mnemonic code
  "p06CdsDes": "Scienze Gastronomiche", // Degree course description
  "matId": 12345, // Career ID
  "aaOrdId": 2016, // Curriculum academic year
  "pdsId": 3, // Study plan ID
  "iscrId": 1, // Student enrollment ID
  "cdsId": 12345, // Degree course ID
  "stuId": 1, // Unique ID identifying the career
  "dataChiusura": "15/01/2025", // Career closure date
  "aaImm1": 2016, // Career start academic year
  "aaRegId": 2018, // Cohort academic year
  "emailCertificata": "email@certificata.it", // Certified email address (PEC)
  "dataFineCarriera": "15/01/2025", // Career end date
  "dataFineCarrieraCalcolata": "15/01/2025", // Calculated career end date
  "archNum": 1234, // Archive number (numeric part)
  "archStr": "a1b2c3", // Archive code (alphanumeric part)
  "codiceEsi": "urn:schac:personalUniqueCode:int:esi:unife.it:191275" // ESI code - European Student Identifier
}
```

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/datiDottorato` - Get student careers (PhD data)

```java
/**
 * Retrieves the list of 'Carriera' objects with student career details including:
 * - periods of study abroad
 * - extensions
 * - suspension periods
 * The optional parameters start and limit allow paginating results. Careers can
 * be filtered using course, ordering, and student segment parameters. If the
 * aaIdDa parameter is set, the aaId parameter will be ignored.
 *
 * @param userId               string (query, optional)            - unique ID to identify the user account
 * @param identificativo U-Gov string (query, optional)            - U-Gov identifier to retrieve responsible person info
 * @param stuId                integer (query, optional)           - student ID
 * @param matricolaStudente    string (query, optional)            - student ID number
 * @param Codice esterno carriera string (query, optional)         - external career code
 * @param cognome              string (query, optional)            - user surname (use * wildcard for LIKE matching)
 * @param nome                 string (query, optional)            - user first name (use * wildcard for LIKE matching)
 * @param codFis               string (query, optional)            - user tax code
 * @param staStuCod            string (query, optional)            - career status code
 * @param aaId                 string (query, optional)            - enrollment academic year
 * @param aaIdDa               integer (query, optional)           - starting enrollment year; retrieves careers with aaId >= this value
 * @param daDataMod            string (query, optional)            - last modification date; retrieves all records modified after this date
 * @param daOraMod             string (query, optional)            - last modification time (HH:MI:SS); retrieves all records modified after this time
 * @param soloImmatricolati    integer (query, optional)           - if 1, retrieve enrolled students only; if 0, include non-enrolled
 * @param cdsId                integer (query, optional)           - degree course ID
 * @param cdsCod               string (query, optional)            - degree course code
 * @param tipoCorsoCod         string (query, optional)            - degree course type code
 * @param aaIscrId             integer (query, optional)           - latest annual enrollment year
 * @param start                integer (query, optional)           - used with `limit` for record pagination
 * @param limit                integer (query, optional)           - used with `start` for pagination; indicates the number of records to return
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @param optionalFields       string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @param soloAttivi           integer (query, optional)           - if set, retrieve only active, hypothetical, or suspended careers (excludes outgoing transfers)
 * @return List<CarrieraDottorato> on success,
 *         DettaglioErrore on failure
 */
GET /carriere/datiDottorato
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {}
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/datiMin` - Get minimum student career data

```java
/**
 * Retrieves the list of 'Carriera' objects. The optional parameters start and
 * limit allow paginating results. Careers can be filtered using course,
 * ordering, and student segment parameters. If the aaIdDa parameter is set,
 * the aaId parameter will be ignored.
 *
 * @param userId               string (query, optional)            - unique ID to identify the user account
 * @param cognome              string (query, optional)            - user surname (use * wildcard for LIKE matching)
 * @param nome                 string (query, optional)            - user first name (use * wildcard for LIKE matching)
 * @param codFis               string (query, optional)            - user tax code
 * @param staStuCod            string (query, optional)            - career status code
 * @param aaId                 string (query, optional)            - enrollment academic year
 * @param identificativo U-Gov string (query, optional)            - U-Gov identifier to retrieve responsible person info
 * @param matricolaStudente    string (query, optional)            - student ID number
 * @param Codice esterno carriera string (query, optional)         - external career code
 * @param soloImmatricolati    integer (query, optional)           - if 1, retrieve enrolled students only; if 0, include non-enrolled
 * @param daOraMod             string (query, optional)            - last modification time (HH:MI:SS); retrieves all records modified after this time
 * @param cdsId                integer (query, optional)           - degree course ID
 * @param cdsCod               string (query, optional)            - degree course code
 * @param tipoCorsoCod         string (query, optional)            - degree course type code
 * @param aaIdDa               integer (query, optional)           - starting enrollment year; retrieves careers with aaId >= this value
 * @param daDataMod            string (query, optional)            - last modification date; retrieves all records modified after this date
 * @param start                integer (query, optional)           - used with `limit` for record pagination
 * @param limit                integer (query, optional)           - used with `start` for pagination; indicates the number of records to return
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @param aaIscrId             integer (query, optional)           - latest annual enrollment year
 * @param soloAttivi           integer (query, optional)           - if set, retrieve only active, hypothetical, or suspended careers (excludes outgoing transfers)
 * @return List<CarrieraDatiMin> on success,
 *         DettaglioErrore on failure
 */
GET /carriere/datiMin
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Unique ID identifying the person
    "cognome": "Rossi", // Person surname
    "nome": "Mario", // Person first name
    "dataNascita": "10/10/2007", // Date of birth
    "sesso": "F", // Person gender
    "userId": "auserid", // Unique ID identifying the user account
    "codFis": "GGGTTT81XA944H", // Person tax code
    "email": "mario.rossi@gmail.com", // Student personal email
    "emailAte": "m.rossi@ate.studio.it", // University-assigned email address
    "stuId": 1, // Unique ID identifying the career
    "staStuCod": "X", // Career status code
    "motStastuCod": "TIT", // Career status reason code
    "aaId": 2016, // Enrollment academic year
    "aaDes": "2016/2017", // Academic year description
    "dataImm": "10/10/2016", // Enrollment date
    "statiStuDes": "Cessata", // Career status description
    "motStastuDes": "Titolo", // Career status reason description
    "numProtocollo": "AT134B07", // Protocol number
    "dataIns": "10/10/2016", // Insertion date (DD/MM/YYYY HH24:MI:SS)
    "dataMod": "10/10/2016", // Modification date (DD/MM/YYYY HH24:MI:SS)
    "extStuCod": "sonoEsterno789", // External career code
    "aaIscrId": 2016, // Enrollment year
    "dataIscr": "10/10/2016", // Enrollment date
    "matricola": "754657", // Student ID number
    "staMatCod": "S", // Student ID status code. System values: A = Active, S = Suspended, I = Hypothetical
    "motStamatCod": "TRI", // Student ID status reason code
    "tipoIscrCod": "IC", // Enrollment type for the specified year: IC = In Progress, FC = Out of Course, RI = Repeating
    "ptFlg": 0, // Flag indicating part-time (1) or full-time (0) enrollment
    "sospFlg": 1, // Flag indicating if the student was suspended in the enrollment year (fictitious enrollment)
    "p06CdsCod": "LSG04", // Degree course mnemonic code
    "p06CdsDes": "Scienze Gastronomiche", // Degree course description
    "sedeId": 244, // Campus ID
    "sediDes": "Milano", // Campus description
    "annoCorso": 3, // Current year of study
    "facCod": "D66", // Faculty code
    "facDes": "facoltà di fisica", // Faculty description
    "facCsaCod": "c10293", // Faculty CSA code
    "cdsId": 12345, // Degree course ID
    "tipoCatAmmId": 994, // Administrative category type ID
    "tipoCatAmmDes": "Cadetti", // Administrative category type description
    "profstuCod": "DD", // Student profile code
    "profstuDes": "Double Degree", // Student profile description
    "tipoCorsoCod": "L2", // Degree course type code
    "dataChiusura": "15/01/2025", // Career closure date
    "matId": 11111 // Student ID number ID
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/verifica-annullabilita-iscrizioni` - Verify cancellability of enrollments subsequent to the given academic year

```java
/**
 * Verifies that any enrollments subsequent to the input academic year
 * (e.g. the year of the degree application) can be cancelled. If they
 * cannot be cancelled, the service also returns the reason why proceeding
 * with the cancellation is not possible.
 * Possible return values: 1 = processing completed successfully, -1 = error.
 *
 * @param stuId                integer (query, optional)           - student ID
 * @param aaId                 integer (query, optional)           - academic year of the last enrollment to keep valid
 * @param skipCheckEsa         integer (query, optional)           - force skip of passed exams check
 * @param elimAddebiti         integer (query, optional)           - force removal of cancellable charges
 * @param annullaPiano         integer (query, optional)           - force study plan cancellation
 * @param checkPag             integer (query, optional)           - check for existing payments
 * @param stornaAddebiti       integer (query, optional)           - indicate reversal eligibility of charges
 * @return string on success,
 *         DettaglioErrore on failure
 */
GET /carriere/verifica-annullabilita-iscrizioni
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
"string"
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/verifica-iscrizione` - Verify if a student has an active enrollment

```java
/**
 * Verifies whether a student has an active enrollment at the institution at
 * the time of the call. Can be filtered by tax code or student ID number.
 * The ggDopoLaurea parameter indicates the maximum number of days elapsed
 * since graduation for the enrollment to still be considered active.
 * Possible return values: 1 = person/ID with active enrollment,
 * 0 = person/ID without active enrollment, -1 = person/ID not found.
 *
 * @param codFis               string (query, optional)            - user tax code
 * @param matricolaStudente    string (query, optional)            - student ID number
 * @param ggDopoLaurea         integer (query, optional)           - maximum number of days since graduation
 * @return integer on success,
 *         DettaglioErrore on failure
 */
GET /carriere/verifica-iscrizione
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
0
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `PUT /carriere/{matricola}/iscrizioni/aggiornaDataIscrAndTipoEsoneroByMat` - Update enrollment date and exemption type by student ID number

```java
/**
 * Updates the enrollment date and exemption type for a given academic year
 * of a student, retrieved by student ID number, if:
 * - the enrollment is not cancelled
 * - the provided exemption type exists in the student type codification or is null
 *
 * @param matricola            string (path, required)             - student ID number
 * @param annoAccademico       integer (query, required)           - academic year of the enrollment to retrieve
 * @param body                 ParametriTipologiaEsonero (body, required) - object with enrollment date and exemption type parameters
 * @return IscrizioneAnnuale on success,
 *         DettaglioErrore on failure
 */
PUT /carriere/{matricola}/iscrizioni/aggiornaDataIscrAndTipoEsoneroByMat
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "tipoEsoCod": "N", // Exemption type code
  "dataIscr": "26/10/2021" // Enrollment date
}
```

#### Response

**`200 OK`**

```json
{
  "persId": 420, // Person ID
  "stuId": 115, // Student ID
  "cdsId": 2646, // Degree course ID
  "aaOrdId": 2017, // Curriculum academic year ID
  "pdsId": 10001, // Study plan ID
  "iscrId": 2, // Enrollment ID
  "matId": 462656, // Career ID
  "matricola": "AB1234", // Student ID number
  "staMatCod": "A", // Student ID status code
  "aaRegId": 2016, // Regulation academic year ID
  "aaIscrId": 2010, // Enrollment academic year ID
  "dataIscr": "01/01/2020", // Enrollment date
  "facCod": "142", // Faculty code
  "facDes": "Dipartimento di FISICA", // Faculty description
  "cdsCod": "10-1", // Degree course code
  "cdsDes": "FISICA", // Degree course description
  "tipoCorsoCod": "L1", // Course type code
  "tipoCorsoDes": "Corso di Laurea", // Course type description
  "pdsCod": "10-1", // Study path code
  "indirizzoDes": "comune", // Study path description
  "ordinamentoCod": "10-1", // Curriculum code
  "ordinamentoDes": "FISICA", // Curriculum description
  "durataCorso": 4, // Course duration in years
  "valoreMin": "180", // Minimum credits or annual units required to obtain the degree
  "annoCorso": 3, // Current year of study
  "anniFc": 0, // Out-of-course years
  "tipoIscrCod": "IC", // Enrollment type code
  "tipoIscrDes": "In corso", // Enrollment type description
  "staIscrCod": "S", // Annual enrollment status code: A = ACTIVE, X = CANCELLED, S = SUSPENDED
  "motStaiscrCod": "T", // Enrollment status reason
  "condFlg": 0, // Flag indicating conditional enrollment (e.g. pending a threshold exam)
  "ricFlg": 0, // Flag indicating if the enrollment was PERFORMED (0) or RECONSTRUCTED retroactively (1)
  "attlauFlg": 0, // Flag indicating graduation waiting status enrollment
  "ateneoCod": "12345", // Institution code
  "ateneoDes": "Università degli studi", // Institution description
  "ateneoSiglaUniv": "UNIKION", // Institution abbreviation
  "sedeId": 42, // Campus ID
  "sedeDes": "Casalecchi di Renop", // Campus description
  "linguaDid": "null", // Teaching language code
  "normCod": "DM270", // Regulation code
  "dataIns": "01/01/2015", // Insertion date
  "dataMod": "01/01/2020", // Modification date
  "aaUltimaIscr": 2020, // Last enrollment year
  "orientCod": "cod", // Orientation code
  "orientDes": "des", // Orientation description
  "claMurstCod": "L-8", // MURST class code
  "claMurstDes": "Classe delle lauree in Ingegneria dell'informazione", // MURST class description
  "claAteneoCod": "L-8", // Institution class code
  "claAteneoDes": "Ingegneria dell'informazione", // Institution class description
  "ptFlg": 0, // Flag indicating part-time (1) or full-time (0) enrollment
  "ptCfu": 60, // Number of CFU chosen for part-time at enrollment
  "aptId": 9, // Part-time alternative ID chosen by the student
  "ptCfuExtra": 0, // Extra CFU chosen during the academic year
  "ptBloccatoFlg": 0, // Flag preventing further part-time modifications for this annual enrollment
  "ptSlotId": 6, // Part-time alternative slot
  "fasciaId": 4, // Income bracket assigned to the student
  "sospFlg": 1, // Flag indicating if the student was suspended in the enrollment year (fictitious enrollment)
  "motSospCod": "MAT", // Suspension reason code
  "tipoGruppoId": 5, // Installment group (equals number of installments)
  "fasMeritoId": 3, // Merit bracket ID
  "regFasId": 5, // Merit bracket rule ID used for merit bracket calculation
  "dtCalcMerito": "01/01/2020", // Date the merit bracket was calculated
  "notaMerito": "nota", // Notes from merit calculation
  "notaIscr": "nota", // Comments on the student's annual enrollment
  "povFlg": 0, // Flag indicating if the student's country of origin belongs to the Particularly Poor Countries group
  "ueFlg": 1, // Flag indicating if the student's country of origin belongs to the European Union
  "nazioneProvId": 1, // Country of origin ID
  "fasciaMensaId": 4, // Meal plan bracket ID
  "codTipoHandicap": "T", // Disability type code
  "desTipoHandicap": "Altro", // Disability type description
  "percHandicap": 50.5, // Disability percentage
  "tipoPostoRisCod": "OSB", // Reserved seat type code for PhD students: OSB = Ordinary without grant, OCB = Ordinary with grant, SOP = Supernumerary
  "tipoPostoRiservato": "Ordinario senza borsa", // Reserved seat type description for PhD students
  "codiceClasseIscrizione": "L-8", // Enrollment class code
  "tipoDidCod": "1", // Teaching type code
  "tipoDidDes": "Presenza", // Teaching type description
  "tipoEsoCod": "N", // Exemption type code
  "tipoEsoDes": "Nessun esonero richiesto", // Exemption type description
  "dataIniContratto": "01/01/2018", // Specialization contract start date
  "orientId": 8, // Study path orientation ID
  "fasciaDichiarId": 45, // Income bracket declared by the student
  "poloId": 23, // Campus hub ID
  "rifPolFlg": 0, // Indicates if the student is a political refugee
  "dataAttlau": "01/01/2020", // Graduation waiting date
  "tipoStuCod": "cod", // Student type code
  "tipoStuDes": "cod", // Student type description
  "certificatoFlg": 0 // Used for retroactive enrollment insertion; indicates if data is certified by a registrar operator. 0 = entered by student, 1 = certified by registrar
}
```

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/{stuId}` - Get student career

```java
/**
 * Retrieves the 'Carriera' object.
 *
 * @param stuId                integer (path, required)            - career ID
 * @return Carriera on success
 */
GET /carriere/{stuId}
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "persId": 1, // Unique ID identifying the person
  "cognome": "Rossi", // Person surname
  "nome": "Mario", // Person first name
  "dataNascita": "10/10/2007", // Date of birth
  "sesso": "F", // Person gender
  "userId": "auserid", // Unique ID identifying the user account
  "codFis": "GGGTTT81XA944H", // Person tax code
  "email": "mario.rossi@gmail.com", // Student personal email
  "emailAte": "m.rossi@ate.studio.it", // University-assigned email address
  "staStuCod": "X", // Career status code
  "motStastuCod": "TIT", // Career status reason code
  "aaId": 2016, // Enrollment academic year
  "dataImm": "10/10/2016", // Enrollment date
  "statiStuDes": "Cessata", // Career status description
  "motStastuDes": "Titolo", // Career status reason description
  "numProtocollo": "AT134B07", // Protocol number
  "dataIns": "10/10/2016", // Insertion date (DD/MM/YYYY HH24:MI:SS)
  "dataMod": "10/10/2016", // Modification date (DD/MM/YYYY HH24:MI:SS)
  "domCtStato": "CHI", // Degree application status
  "statiDomCtDes": "Chiusa", // Degree application status description
  "aaDes": "2016/2017", // Academic year description
  "aaIscrId": 2016, // Enrollment year
  "matricola": "754657", // Student ID number
  "sedeId": 244, // Campus ID
  "sediDes": "Milano", // Campus description
  "annoCorso": 3, // Current year of study
  "lingue": "Inglese", // Language description
  "dataIscr": "10/10/2016", // Enrollment date
  "settCod": "L3A5", // Sector code
  "settDes": "Storia dell'Italia", // Sector description
  "areaCod": "A5", // Area code
  "areaDes": "Scienze Sociologiche", // Area description
  "areaCodStatMiur": "1304", // MIUR statistics code
  "sdrCod": "300", // Teaching structure code
  "sdrDes": "Università di Modena e Reggio Emilia", // Teaching structure description
  "sdrCsaCod": 393, // Responsible teaching structure ID
  "facCod": "D66", // Faculty code
  "facDes": "facoltà di fisica", // Faculty description
  "facCsaCod": "c10293", // Faculty CSA code
  "idAb": 123123, // U-Gov address book ID
  "extStuCod": "sonoEsterno789", // External career code
  "responsabile": {
    "respNome": "Gabriele", // Responsible person first name
    "respCognome": "D'Annunzio", // Responsible person surname
    "respCodFis": "DNNGRL70A01G482H", // Responsible person tax code
    "respDataNascita": "01/01/1970", // Responsible person date of birth
    "respLuogoNascita": "Pescara", // Responsible person place of birth
    "respMatricola": "12356", // Responsible person ID number
    "respIdAb": "14456", // Responsible person U-Gov ID
    "respDesCarica": "che carica metto a sto responsabile" // Responsible person role description
  }, // Responsible person
  "tutor": {
    "cognomeTutor": "Verdi", // Tutor surname
    "nomeTutor": "Luigi", // Tutor first name
    "docenteIdTutor": 4821, // Tutor ID
    "soggEstIdTutor": 1864, // Tutor ID if external subject
    "idAbTutor": 65255, // Tutor address book ID
    "matricolaTutor": "5823" // Tutor ID number
  }, // Tutor
  "attlauFlg": 1, // Flag indicating student is enrolled in graduation waiting status
  "dataAttlau": "20/04/2020", // Graduation waiting date
  "tipoCatAmmId": 994, // Administrative category type ID
  "tipoCatAmmDes": "Cadetti", // Administrative category type description
  "profstuCod": "DD", // Student profile code
  "profstuDes": "Double Degree", // Student profile description
  "tipoCorsoCod": "L2", // Degree course type code
  "tipoCorsoDes": "Corso di Laurea", // Degree course type description
  "staMatCod": "S", // Student ID status code. System values: A = Active, S = Suspended, I = Hypothetical
  "motStamatCod": "TRI", // Student ID status reason code
  "tipoIscrCod": "IC", // Enrollment type for the specified year: IC = In Progress, FC = Out of Course, RI = Repeating
  "ptFlg": 0, // Flag indicating part-time (1) or full-time (0) enrollment
  "sospFlg": 1, // Flag indicating if the student was suspended in the enrollment year (fictitious enrollment)
  "p06CdsCod": "LSG04", // Degree course mnemonic code
  "p06CdsDes": "Scienze Gastronomiche", // Degree course description
  "matId": 12345, // Career ID
  "aaOrdId": 2016, // Curriculum academic year
  "pdsId": 3, // Study plan ID
  "iscrId": 1, // Student enrollment ID
  "cdsId": 12345, // Degree course ID
  "stuId": 1, // Unique ID identifying the career
  "dataChiusura": "15/01/2025", // Career closure date
  "aaImm1": 2016, // Career start academic year
  "aaRegId": 2018, // Cohort academic year
  "emailCertificata": "email@certificata.it", // Certified email address (PEC)
  "dataFineCarriera": "15/01/2025", // Career end date
  "dataFineCarrieraCalcolata": "15/01/2025", // Calculated career end date
  "archNum": 1234, // Archive number (numeric part)
  "archStr": "a1b2c3", // Archive code (alphanumeric part)
  "codiceEsi": "urn:schac:personalUniqueCode:int:esi:unife.it:191275" // ESI code - European Student Identifier
}
```

<br>

---

<br>

### `PUT /carriere/{stuId}` - Update student protocol number

```java
/**
 * Updates the protocol number for a given student.
 *
 * @param stuId                integer (path, required)            - career ID
 * @param body                 ParametriCarriera (body, required)  - object with fields to modify
 * @return Carriera on success,
 *         DettaglioErrore on failure
 */
PUT /carriere/{stuId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "numProtocollo": "AT134B07" // Protocol number (required)
}
```

#### Response

**`200 OK`** - See [`GET /carriere/{stuId}`](#get-carriere-stuid----get-student-career) for the full response field list and descriptions.

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `PUT /carriere/{stuId}/chiudiCarriera` - Close career for a given student

```java
/**
 * Closes the career for a given student. A valid closure reason code and
 * a career closure date must be provided in the request body.
 *
 * @param stuId                integer (path, required)            - career ID
 * @param body                 ParametriChiusuraCarriera (body, required) - object with career closure parameters
 * @return Carriera on success,
 *         DettaglioErrore on failure
 */
PUT /carriere/{stuId}/chiudiCarriera
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "motStastuCod": "RIN", // Student status reason code (required)
  "dataChiusura": "10/10/2017" // Career closure date (required)
}
```

#### Response

**`200 OK`** - See [`GET /carriere/{stuId}`](#get-carriere-stuid----get-student-career) for the full response field list and descriptions.

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/{stuId}/giorni-freq` - Get number of attendance days to recover

```java
/**
 * Retrieves the number of attendance days to recover when the degree course
 * has mandatory attendance. The stuId parameter is required.
 *
 * @param stuId                integer (path, required)            - career ID
 * @return GiorniFrequenza on success,
 *         DettaglioErrore on failure
 */
GET /carriere/{stuId}/giorni-freq
```

**Auth:** `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
{
  "cdsFreqObbl": 1, // Flag indicating the degree course has mandatory attendance
  "nGiorniDaRec": 15 // Number of attendance days to recover
}
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/{stuId}/iscrizioni` - Get student enrollments

```java
/**
 * Retrieves the enrollments for a student, optionally filtering by academic
 * year or last enrollment only.
 *
 * @param stuId                integer (path, required)            - career ID
 * @param annoAccademico       integer (query, optional)           - academic year of the enrollment to retrieve
 * @param ultimaIscrizioneFlg  integer (query, optional)           - 1 to retrieve ONLY the last enrollment, 0 otherwise
 * @param start                integer (query, optional)           - used with `limit` for record pagination
 * @param limit                integer (query, optional)           - used with `start` for pagination; indicates the number of records to return
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @return List<IscrizioneAnnuale> on success,
 *         DettaglioErrore on failure
 */
GET /carriere/{stuId}/iscrizioni
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`** - See [`PUT /carriere/{matricola}/iscrizioni/aggiornaDataIscrAndTipoEsoneroByMat`](#put-carriere-matricola-iscrizioni-aggiornaddataiscrAndtipoEsonerobymat----update-enrollment-date-and-exemption-type-by-student-id-number) for the full `IscrizioneAnnuale` response field list and descriptions.

```json
[
  {
    "persId": 420,
    "stuId": 115,
    "cdsId": 2646,
    "aaOrdId": 2017,
    "pdsId": 10001,
    "iscrId": 2,
    "matId": 462656
    // ... see IscrizioneAnnuale reference above
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `PUT /carriere/{stuId}/iscrizioni/aggiornaDataIscrAndTipoEsonero` - Update enrollment date and exemption type

```java
/**
 * Updates the enrollment date and exemption type for a given academic year
 * of a student if:
 * - the enrollment is not cancelled
 * - the provided exemption type exists in the student type codification or is null
 *
 * @param stuId                integer (path, required)            - career ID
 * @param annoAccademico       integer (query, required)           - academic year of the enrollment to retrieve
 * @param body                 ParametriTipologiaEsonero (body, required) - object with enrollment date and exemption type parameters
 * @return IscrizioneAnnuale on success,
 *         DettaglioErrore on failure
 */
PUT /carriere/{stuId}/iscrizioni/aggiornaDataIscrAndTipoEsonero
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "tipoEsoCod": "N", // Exemption type code
  "dataIscr": "26/10/2021" // Enrollment date
}
```

#### Response

**`200 OK`** - See [`PUT /carriere/{matricola}/iscrizioni/aggiornaDataIscrAndTipoEsoneroByMat`](#put-carriere-matricola-iscrizioni-aggiornaddataiscrAndtipoEsonerobymat----update-enrollment-date-and-exemption-type-by-student-id-number) for the full `IscrizioneAnnuale` response field list and descriptions.

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `PUT /carriere/{stuId}/iscrizioni/aggiornaFasciaMensa` - Update student meal plan bracket

```java
/**
 * Updates the meal plan bracket for a given academic year of a student if:
 * - the enrollment is not cancelled
 * - the provided meal plan bracket exists in the meal plan bracket codification
 * - any 'FASCIA_MENSA' context rules, if present, are assignable
 *
 * @param stuId                integer (path, required)            - career ID
 * @param annoAccademico       integer (query, required)           - academic year of the enrollment to retrieve
 * @param body                 ParametriFasciaMensa (body, required) - object with meal plan bracket parameters
 * @return IscrizioneAnnuale on success,
 *         DettaglioErrore on failure
 */
PUT /carriere/{stuId}/iscrizioni/aggiornaFasciaMensa
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "fasciaMensaId": 42 // Meal plan bracket ID
}
```

#### Response

**`200 OK`** - See [`PUT /carriere/{matricola}/iscrizioni/aggiornaDataIscrAndTipoEsoneroByMat`](#put-carriere-matricola-iscrizioni-aggiornaddataiscrAndtipoEsonerobymat----update-enrollment-date-and-exemption-type-by-student-id-number) for the full `IscrizioneAnnuale` response field list and descriptions.

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `PUT /carriere/{stuId}/iscrizioni/aggiornaTipoStuCod` - Update student type code

```java
/**
 * Updates the student type code for a given academic year of a student if:
 * - the enrollment is not cancelled
 * - the provided code exists in the student type codification or is null
 *
 * @param stuId                integer (path, required)            - career ID
 * @param annoAccademico       integer (query, required)           - academic year of the enrollment to retrieve
 * @param body                 ParametriTipologiaStudente (body, required) - object with student type parameters
 * @return IscrizioneAnnuale on success,
 *         DettaglioErrore on failure
 */
PUT /carriere/{stuId}/iscrizioni/aggiornaTipoStuCod
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "tipoStuCod": "COD" // Student type code
}
```

#### Response

**`200 OK`** - See [`PUT /carriere/{matricola}/iscrizioni/aggiornaDataIscrAndTipoEsoneroByMat`](#put-carriere-matricola-iscrizioni-aggiornaddataiscrAndtipoEsonerobymat----update-enrollment-date-and-exemption-type-by-student-id-number) for the full `IscrizioneAnnuale` response field list and descriptions.

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/{stuId}/iscrizioni/{aaIscrId}/classi` - Get enrollment class data filtered by student and academic year

```java
/**
 * Retrieves the list of 'ClassiIscrizione' objects. The optional parameters
 * start and limit allow paginating results. Enrollment classes can be filtered
 * using the student ID and academic year.
 *
 * @param aaIscrId             integer (path, required)            - academic year ID of the enrollments to retrieve
 * @param stuId                integer (path, required)            - career ID
 * @param start                integer (query, optional)           - used with `limit` for record pagination
 * @param limit                integer (query, optional)           - used with `start` for pagination; indicates the number of records to return
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @return List<ClassiIscrizione> on success,
 *         DettaglioErrore on failure
 */
GET /carriere/{stuId}/iscrizioni/{aaIscrId}/classi
```

**Auth:** `UTENTE_TECNICO`, `IMMATRICOLATI_IN_IPOTESI`, `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "stuId": 1, // Unique ID identifying the student career
    "aaIscrId": 2016, // Last enrollment academic year
    "lingueIso6391Cod": "it", // ISO 639-1 language code
    "lingueDes": "ITALIANO", // Language description
    "domPartCod": "LZ", // Student partition domain code
    "fatPartCod": "MATR", // Student partition factor code
    "domPartDes": "Laboratorio C", // Partition domain description (e.g. surname initials A-K, odd ID numbers, etc.)
    "partEffCod": "Q1", // Effective teaching delivery period
    "partEffDes": "Primo Quadrimestre", // Academic year partition description
    "tipoDidCod": "T", // Teaching type code
    "tipoDidDes": "Teledidattica" // Teaching type description
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /carriere/{stuId}/noteCarriera` - Get student career notes

```java
/**
 * Retrieves the 'NoteCarriera' object containing career note data.
 * Technical users must be enabled by the institution to use this operation.
 *
 * @param stuId                integer (path, required)            - career ID
 * @param dataVerifica         string (query, optional)            - insertion date filter
 * @param notaBloccante        integer (query, optional)           - retrieve only blocking control type notes
 * @param notaAa               integer (query, optional)           - retrieve only notes in the Administrative Area scope
 * @param notaCs               integer (query, optional)           - retrieve only notes in the Career Area scope
 * @param notaCert             integer (query, optional)           - retrieve only notes in the Certificates Area scope
 * @param notaTax              integer (query, optional)           - retrieve only notes in the Fees Area scope
 * @param notaWeb              integer (query, optional)           - retrieve only notes in the WEB Area scope
 * @param tipoContrNotaCod     string (query, optional)            - student note block type code
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @return List<NoteCarriera> on success,
 *         DettaglioErrore on failure
 */
GET /carriere/{stuId}/noteCarriera
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "stuId": 11238, // Student ID
    "notaId": 11238, // Note ID
    "data": "15/10/2015", // Note date. Format: DD/MM/YYYY
    "tipo": "N", // Note type
    "usrInsId": "Administrator", // Insertion user
    "dataIns": "01/07/2022", // Insertion date
    "usrModId": "Administrator", // Last modification user
    "dataMod": "01/07/2022", // Last modification date
    "tipoContrNotaId": 11238, // Unique ID of the student note block type
    "dataFineVal": "10/10/2007", // Validity end date
    "dataIniVal": "10/10/2007", // Validity start date
    "templateNotaId": 11238, // Note template ID
    "testoNota": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // Note text
    "cod": "BLOCCO_GEN", // Student note block type code
    "des": "Blocco su tutte le operazioni legate allo studente", // Block type code description
    "blocoFlg": 1, // Indicates if the control associated with the note is blocking
    "amminFlg": 1, // Indicates if the control applies to administrative area functions
    "carrFlg": 1, // Indicates if the control applies to career area functions
    "certFlg": 1, // Indicates if the control applies to certificate issuance
    "taxFlg": 1, // Indicates if the control applies to fees area functions
    "webFlg": 1, // Indicates if the control applies to web login
    "webVisNotaFlg": 1, // Indicates the default visibility of the note in online processes
    "abilReplicheFlg": 1, // Indicates that inserting or modifying a note of this type triggers an administrative replication
    "abilNoteMassFlg": 1 // Indicates that the note type associated with this control is enabled for automatic mass note assignment
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

## Endpoints - Enrollments (Immatricolazioni)

### `GET /immatricolazioni/informazioni` - Get enrollment status for a given Department or study course group

```java
/**
 * Retrieves the enrollment status for a given Department or group of study courses.
 *
 * @param codLingua            string (query, optional)            - ISO language code
 * @param gruppoTcCod          string (query, optional)            - study course type grouping code
 * @param tipoCorsoCod         string (query, optional)            - degree course type code
 * @param facCod               string (query, optional)            - Faculty / Department code
 * @param facId                integer (query, optional)           - Faculty / Department ID
 * @param cdsCod               string (query, optional)            - degree course code
 * @param cdsId                integer (query, optional)           - degree course ID
 * @return string on success,
 *         DettaglioErrore on failure
 */
GET /immatricolazioni/informazioni
```

**Auth:** `UTENTE_PTA`, `UTENTE_PTA_ADMIN`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
"string"
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /immatricolazioni/informazioni/dettaglio` - Get detailed enrollment status for a given Department or study course group

```java
/**
 * Retrieves the enrollment status for a given Department or group of study courses.
 * Also includes information about the degree courses retrieved according to the
 * input parameters.
 *
 * @param codLingua            string (query, optional)            - ISO language code
 * @param gruppoTcCod          string (query, optional)            - study course type grouping code
 * @param tipoCorsoCod         string (query, optional)            - degree course type code
 * @param facCod               string (query, optional)            - Faculty / Department code
 * @param facId                integer (query, optional)           - Faculty / Department ID
 * @param cdsCod               string (query, optional)            - degree course code
 * @param cdsId                integer (query, optional)           - degree course ID
 * @return string on success,
 *         DettaglioErrore on failure
 */
GET /immatricolazioni/informazioni/dettaglio
```

**Auth:** `UTENTE_PTA`, `UTENTE_PTA_ADMIN`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
"string"
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

## Endpoints - Annual Subscriptions (Iscrizioni)

### `GET /iscrizioni/{aaIscrId}` - Get student careers by academic year

```java
/**
 * Retrieves the list of 'Carriera' objects. The optional parameters start and
 * limit allow paginating results. Careers can be filtered using course,
 * ordering, and student segment parameters.
 *
 * @param aaIscrId             string (path, required)             - academic year ID of the enrollments to retrieve
 * @param inclSXH              integer (query, required)           - include enrollments suspended by hypothetical status
 * @param inclCond             integer (query, required)           - include conditional enrollments
 * @param cdsId                integer (query, optional)           - degree course ID
 * @param cdsCod               string (query, optional)            - degree course code
 * @param tipoCorsoCod         string (query, optional)            - degree course type code
 * @param tipoIscrCod          string (query, optional)            - enrollment type code
 * @param annoCorso            integer (query, optional)           - year of study
 * @param staIscCod            string (query, optional)            - annual enrollment status code
 * @param start                integer (query, optional)           - used with `limit` for record pagination
 * @param limit                integer (query, optional)           - used with `start` for pagination; indicates the number of records to return
 * @param order                string (query, optional)            - specifies record ordering. Syntax: +/- field_name
 * @param fields               string (query, optional)            - specifies optional fields to include (not retrieved by default)
 * @return List<IscrizioneAnnuale> on success,
 *         DettaglioErrore on failure
 */
GET /iscrizioni/{aaIscrId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`** - See [`PUT /carriere/{matricola}/iscrizioni/aggiornaDataIscrAndTipoEsoneroByMat`](#put-carriere-matricola-iscrizioni-aggiornaddataiscrAndtipoEsonerobymat----update-enrollment-date-and-exemption-type-by-student-id-number) for the full `IscrizioneAnnuale` response field list and descriptions.

```json
[
  {
    "persId": 420,
    "stuId": 115,
    "cdsId": 2646,
    "aaOrdId": 2017,
    "pdsId": 10001,
    "iscrId": 2,
    "matId": 462656
    // ... see IscrizioneAnnuale reference above
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error detail
      "rawValue": "SocketTimeoutException...." // Raw error detail (JSON)
    }
  ]
}
```

---

## References

- **Swagger UI:** [Carriere Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Carriere%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fcarriere-service-v1)>)
- **Spec YAML:** [p01-carriereApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p01-carriereApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)