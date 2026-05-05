---
title: Libretto API V2 | OhMyUniversity!
description: REST API documentation for the Libretto service (libretto-service-v2) - CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Libretto API V2 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Libretto service (libretto-service-v2) - CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/libretto-api-v2
  - - meta
    - name: keywords
      content: libretto v2 api, esse3 rest api, cineca api, ohmyuniversity api, libretto-service-v2
  - - meta
    - name: twitter:title
      content: Libretto API V2 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Libretto service (libretto-service-v2) - CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Libretto API V2

**Version:** `2.7.0` · **Base URL:** `/libretto-service-v2`

ESSE3 REST APIs for accessing the student booklet, the services allow operating on students' booklets retrieving the following entities

---

## Endpoints - Matricola

### `GET /libretti` - Career segments containing the booklets

```java
/**
 * Retrieves the list of TrattoCarriera objects. The optional start and limit parameters allow paginating the results. It is possible to filter the booklets to search by using the regulation course and path parameters of the student's career segments.
 *
 * @param matricola            string (query, optional)            - Student matriculation code
 * @param cdsStuId             integer (query, optional)           - ID of the student's study course
 * @param cdsStuCod            string (query, optional)            - Code of the student's study course
 * @param aaOrdStuId           integer (query, optional)           - Code of the student's regulation
 * @param pdsStuId             integer (query, optional)           - ID of the student's study path
 * @param pdsStuCod            string (query, optional)            - Code of the student's study path
 * @param codFis               string (query, optional)            - Student's fiscal code
 * @param staStuCod            string (query, optional)            - Career state code
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param start                integer (query, optional)           - utilizzato insieme a `limit` per indicare la paginazione sui record
 * @param limit                integer (query, optional)           - utilizzato insieme a `start` per indicare la paginazione sui record, `limit` indica il numero di ...
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<TrattoCarriera> on success,
 *         DettaglioErrore on failure
 */
GET /libretti
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Unique ID identifying the person
    "stuId": 1, // Unique ID identifying the student's career
    "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
    "cognome": "Mario", // Student's surname
    "nome": "Mario", // Student's name
    "codiceFiscale": "AGVVTR78A62H501F", // Student's fiscal code
    "matricola": "123456", // Student's matriculation, the number assigned by secretariats to identify the student in the system, a matriculation might not uniquely identify a booklet linked to a career segment (required)
    "cdsId": 1, // Key of the study course providing the educational activity (required)
    "cdsCod": "CDS_1", // Code of the student's enrolled study course
    "cdsDes": "Esempio di CDS", // Description of the student's enrolled course
    "aaOrdId": 2016, // Regulation year of the student's enrolled course (required)
    "pdsId": 1, // Key of the study path providing the educational activity (required)
    "pdsCod": "PDS_1", // Code of the student's enrolled path
    "pdsDes": "esempio di pds", // Description of the student's enrolled path
    "aaRegId": 2016, // Student's cohort year
    "staStuCod": "A", // Code of the career state to which the booklet refers
    "staStuDes": "Attivo", // Description of the career state to which the booklet refers
    "staMatCod": "A", // Code of the career segment state to which the booklet refers
    "staMatDes": "Attivo", // Description of the career segment state to which the booklet refers
    "umPesoCod": "C", // Study course unit of measurement code
    "umPesoDes": "Crediti", // Study course unit of measurement description
    "codiceLettore": "7000", // University ISTAT code
    "titoloStudio": 3, // Numerical representation of the study title type
    "tipoLettore": "SM", // Title type acronym (sd, PE, SP, SM, SF)
    "autDatiPersonali": "S", // Personal data authorization (always yes, otherwise personal data cannot be retained)
    "statoTasse": 1, // Numerical representation of the tax payment state
    "aaImm1": 2021, // Career enrollment year (optional)
    "tipoCorsoCod": "LM", // Course type code (optional)
    "tipoCorsoDes": "Laurea Magistrale", // Course type description (optional)
    "drCarr": 2023 // Current year for career operations (optional)
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

### `GET /libretti/{matId}` - Career segment containing the booklet

```java
/**
 * Career segment containing the booklet
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @return TrattoCarriera on success
 */
GET /libretti/{matId}
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "persId": 1, // Unique ID identifying the person
  "stuId": 1, // Unique ID identifying the student's career
  "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
  "cognome": "Mario", // Student's surname
  "nome": "Mario", // Student's name
  "codiceFiscale": "AGVVTR78A62H501F", // Student's fiscal code
  "matricola": "123456", // Student's matriculation, the number assigned by secretariats to identify the student in the system, a matriculation might not uniquely identify a booklet linked to a career segment (required)
  "cdsId": 1, // Key of the study course providing the educational activity (required)
  "cdsCod": "CDS_1", // Code of the student's enrolled study course
  "cdsDes": "Esempio di CDS", // Description of the student's enrolled course
  "aaOrdId": 2016, // Regulation year of the student's enrolled course (required)
  "pdsId": 1, // Key of the study path providing the educational activity (required)
  "pdsCod": "PDS_1", // Code of the student's enrolled path
  "pdsDes": "esempio di pds", // Description of the student's enrolled path
  "aaRegId": 2016, // Student's cohort year
  "staStuCod": "A", // Code of the career state to which the booklet refers
  "staStuDes": "Attivo", // Description of the career state to which the booklet refers
  "staMatCod": "A", // Code of the career segment state to which the booklet refers
  "staMatDes": "Attivo", // Description of the career segment state to which the booklet refers
  "umPesoCod": "C", // Study course unit of measurement code
  "umPesoDes": "Crediti", // Study course unit of measurement description
  "codiceLettore": "7000", // University ISTAT code
  "titoloStudio": 3, // Numerical representation of the study title type
  "tipoLettore": "SM", // Title type acronym (sd, PE, SP, SM, SF)
  "autDatiPersonali": "S", // Personal data authorization (always yes, otherwise personal data cannot be retained)
  "statoTasse": 1, // Numerical representation of the tax payment state
  "aaImm1": 2021, // Career enrollment year (optional)
  "tipoCorsoCod": "LM", // Course type code (optional)
  "tipoCorsoDes": "Laurea Magistrale", // Course type description (optional)
  "drCarr": 2023 // Current year for career operations (optional)
}
```

<br>

---

<br>

## Endpoints - Massive

### `GET /libretti/classe-studenti` - Retrieves students connected to an offered Activity

```java
/**
 * WARNING this method could retrieve part of a wider logistics
 * sharing since only one offered AD among those comprising the partition is selected.
 * If the partition is composed of a single AD, then the two methods coincide.
 * Otherwise, the restrictions described in the endpoint '/libretti/classe-studenti/{adLogId}' apply.
 *
 * @param logAaOffId           integer (query, required)           - ID of the offering year of the logistics sharing
 * @param logAdCod             string (query, required)            - Educational activity code of the logistics sharing
 * @param logCdsCod            string (query, required)            - Code of the course providing the educational activity in the logistics sharing
 * @param logAaOrdId           integer (query, required)           - ID of the regulation year of the course providing the logistics sharing
 * @param logPdsCod            string (query, required)            - Code of the path providing the educational activity in the logistics sharing
 * @param libUdCod             string (query, optional)            - Code of the teaching unit (UD) present in the student's booklet
 * @param staStuCod            string (query, optional)            - Career state code
 * @param staMatCod            string (query, optional)            - Matriculation state code
 * @param supFlg               boolean (query, optional)           - If 1 indicates passed activities, otherwise not passed ones
 * @param domPartCod           string (query, optional)            - Student's class
 * @param allAdLog             boolean (query, optional)           - Allows retrieving the entire logistics sharing; if not specified, it's false
 * @param stuId                integer (query, optional)           - Unique identifier of the student
 * @param start                integer (query, optional)           - utilizzato insieme a `limit` per indicare la paginazione sui record
 * @param limit                integer (query, optional)           - utilizzato insieme a `start` per indicare la paginazione sui record, `limit` indica il numero di ...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<RigaLibrettoPerAdLog> on success
 */
GET /libretti/classe-studenti
```

**Auth:** `DOCENTE_ADLOG`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Unique ID of the person
    "codFis": "MRRSSSS55D12F2323G", // Fiscal code of the person
    "userId": "m.rossi", // User code
    "cognome": "rossi", // Student's surname
    "nome": "mario", // Student's name
    "email": "m.rossi@gmail.com", // Student's personal email (optional)
    "emailAte": "m.rossi@cineca.it", // Student's university email (optional)
    "stuId": 1, // Unique identifier of the Student
    "matId": 1, // Unique ID identifying the student's career segment and its linked booklet
    "matricola": "AK12343", // Student matriculation
    "adsceId": 1, // Unique ID of the booklet row linked to the logistics sharing
    "adPartId": 1, // Unique ID of the booklet partition linked to the logistics sharing
    "adLogId": 1, // Unique ID of the logistics sharing
    "logPartCod": "S1", // Semester code linked to the logistics sharing
    "logFatPartCod": "ALF", // Expected partitioning type for the logistics sharing
    "logDomPartCod": "A-K", // Partition domain of the single partition
    "logAaOffId": 2019, // Offering year of the logistics sharing
    "annoCorso": 1, // Course year of the booklet activity
    "staSceCod": "S", // State of the educational activity (code)
    "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation)
    "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals
    "durata": 50.0, // Duration in hours of the educational activity
    "oreMinFreq": 50.0, // Minimum attendance hours required to acquire attendance for the educational activity
    "freqFlg": 1, // Flag indicating whether the activity has mandatory attendance
    "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
    "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
    "chiaveAdContestualizzata": {
      "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
      "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
      "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
      "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
      "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
      "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
      "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
      "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
      "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
      "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
      "adId": 1, // Chiave dell'attività didattica (required)
      "adCod": "PDS_AD_1", // Codice dell''attività didattica
      "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
      "afId": 1 // Id della afId proveniente da U-Gov Didattica
    }, // ChiaveAdContestualizzata
    "esito": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // Esito
    "segmenti": [
      {}
    ] // Segmenti (optional)
  }
]
```

<br>

---

<br>

### `GET /libretti/classe-studenti/{adLogId}` - Retrieves the class of students connected to a logistics sharing

```java
/**
 * Retrieves students who have, within their booklet's partition, one of the offered activities (Contextualized AD) present in the selected logistics sharing. In the case of partitioning type ALF and MATR, even if this is not present for various reasons, the system automatically calculates on the fly the correct contextualization for the offered activity linked to the booklet key. To summarize, this service retrieves students who satisfy all indicated points: are ATTENDING (those whose offered educational activity key in the booklet matches one of the ADs of the logistics sharing) have a valid calculated partition (Active state) or students who do not have a valid partition but for whom the expected partitioning is FAT_PART.TIPO_FATT in (ALF,MATR).
 *
 * @param adLogId              integer (path, required)            - Unique ID of the logistics sharing
 * @param adCod                string (query, optional)            - Activity code of the booklet row to search
 * @param cdsStuCod            string (query, optional)            - Code of the student's study course
 * @param staStuCod            string (query, optional)            - Career state code
 * @param staMatCod            string (query, optional)            - Matriculation state code
 * @param supFlg               boolean (query, optional)           - If 1 indicates passed activities, otherwise not passed ones
 * @param domPartCod           string (query, optional)            - Student's class
 * @param stuId                integer (query, optional)           - Unique identifier of the student
 * @param start                integer (query, optional)           - utilizzato insieme a `limit` per indicare la paginazione sui record
 * @param limit                integer (query, optional)           - utilizzato insieme a `start` per indicare la paginazione sui record, `limit` indica il numero di ...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<RigaLibrettoPerAdLog> on success
 */
GET /libretti/classe-studenti/{adLogId}
```

**Auth:** `DOCENTE_ADLOG`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Unique ID of the person
    "codFis": "MRRSSSS55D12F2323G", // Fiscal code of the person
    "userId": "m.rossi", // User code
    "cognome": "rossi", // Student's surname
    "nome": "mario", // Student's name
    "email": "m.rossi@gmail.com", // Student's personal email (optional)
    "emailAte": "m.rossi@cineca.it", // Student's university email (optional)
    "stuId": 1, // Unique identifier of the Student
    "matId": 1, // Unique ID identifying the student's career segment and its linked booklet
    "matricola": "AK12343", // Student matriculation
    "adsceId": 1, // Unique ID of the booklet row linked to the logistics sharing
    "adPartId": 1, // Unique ID of the booklet partition linked to the logistics sharing
    "adLogId": 1, // Unique ID of the logistics sharing
    "logPartCod": "S1", // Semester code linked to the logistics sharing
    "logFatPartCod": "ALF", // Expected partitioning type for the logistics sharing
    "logDomPartCod": "A-K", // Partition domain of the single partition
    "logAaOffId": 2019, // Offering year of the logistics sharing
    "annoCorso": 1, // Course year of the booklet activity
    "staSceCod": "S", // State of the educational activity (code)
    "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation)
    "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals
    "durata": 50.0, // Duration in hours of the educational activity
    "oreMinFreq": 50.0, // Minimum attendance hours required to acquire attendance for the educational activity
    "freqFlg": 1, // Flag indicating whether the activity has mandatory attendance
    "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
    "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
    "chiaveAdContestualizzata": {
      "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
      "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
      "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
      "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
      "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
      "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
      "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
      "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
      "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
      "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
      "adId": 1, // Chiave dell'attività didattica (required)
      "adCod": "PDS_AD_1", // Codice dell''attività didattica
      "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
      "afId": 1 // Id della afId proveniente da U-Gov Didattica
    }, // ChiaveAdContestualizzata
    "esito": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // Esito
    "segmenti": [
      {}
    ] // Segmenti (optional)
  }
]
```

<br>

---

<br>

### `PUT /libretti/freq` - Sets or removes attendance for a list of students

```java
/**
 * Allows massively assigning attendance to multiple students. It is possible to also indicate the detail of lesson detections. If passed, the detection details overwrite (by detection year) the present detections.
 *
 * @param body                 ParametriFreqMassiva (body, required) - Object containing the students to assign attendance to
 * @return ResultFreqMassiva on success,
 *         DettaglioErrore on failure
 */
PUT /libretti/freq
```

**Auth:** `DOCENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Request body

```json
{
  "codFisDocenteRilevazione": "MRRRSS70G55H4444T", // Fiscal code of the teacher who carried out the detection
  "codFisDocenteControllo": "MRRRSS70G55H4444T", // Fiscal code of the teacher for whom to check consistency between activities and assigned ownership (AD code only). To skip the check, pass an empty string
  "aaRilevazioneId": 2020, // Year of attendance detection; if not valued, DR_CARR is taken
  "adCod": "AD01", // Educational activity code where to assign attendance (required)
  "cdsCod": "CDS01", // Study course code where to assign attendance; if not passed, any study course is considered valid
  "aaOrdId": 2018, // Regulation year of the study course where to assign attendance; if not passed, any regulation year is considered valid
  "pdsCod": "CDS01", // Study path code where to assign attendance; if not passed, any study path is considered valid
  "aaOffId": 2020, // Offering year of the activity for which to assign attendance; if not passed, any offering year is considered valid
  "fatPartCod": "AK-LZ", // Partition factor of the logistics partition; if not passed, any logistics sharing is considered valid
  "domPartCod": "AK", // Partition domain of the logistics partition; if not passed, any logistics sharing is considered valid
  "partCod": "S1", // Semester of the logistics partition; if not passed, any logistics sharing is considered valid
  "adLogId": 12444, // ID of the logistics sharing; if not passed, any logistics sharing is considered valid
  "totaleRilevazioni": 1, // Total detections
  "totaleOreRilevazioni": 1, // Total hours of detections
  "studenti": [
    {}
  ] // Studenti
}
```

#### Response

**`200 OK`**

```json
{
  "retCode": 1, // Return code of the massive attendance loading function
  "errMsg": "alcune rilevazioni non sono state caricate", // Error message in case errors occurred
  "scarti": [
    {}
  ] // Discards
}
```

**`422 Unprocessable Entity` - Insertion failed**

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

### `PUT /libretti/rilevazioni-freq/` - Management of attendance detections

```java
/**
 * Allows managing attendance detections. It is also possible to pass attendance detections on the massive attendance assignment method libretti/freq or the punctual one /libretti/{matId}/righe/{adsceId}/freq. Those methods assign attendance and also save the detection detail information.
 *
 * @param body                 ParametriRilPresMassiva (body, required) - Object containing the students to assign attendance to
 * @return ResultFreqMassiva on success,
 *         DettaglioErrore on failure
 */
PUT /libretti/rilevazioni-freq/
```

**Auth:** `DOCENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Request body

```json
{
  "operazione": "CALCOLA_STATS_E_ALLINEA_FREQ", // Type of operation to perform (required)
  "codFisDocenteRilevazione": "MRRRSS70G55H4444T", // Fiscal code of the teacher who carried out the detection (required)
  "codFisDocenteControllo": "MRRRSS70G55H4444T", // Fiscal code of the teacher for whom to check consistency between activities and assigned ownership (AD code only). To skip the check, pass an empty string (required)
  "aaRilevazioneId": 2020, // Year of attendance detection; if not valued, DR_CARR is taken
  "adCod": "AD01", // Educational activity code where to assign attendance (required)
  "cdsCod": "CDS01", // Study course code where to assign attendance; if not passed, any study course is considered valid (required)
  "aaOrdId": 2018, // Regulation year of the study course where to assign attendance; if not passed, any regulation year is considered valid (required)
  "pdsCod": "CDS01", // Study path code where to assign attendance; if not passed, any study path is considered valid (required)
  "aaOffId": 2020, // Offering year of the activity for which to assign attendance; if not passed, any offering year is considered valid (required)
  "fatPartCod": "AK-LZ", // Partition factor of the logistics partition; if not passed, any logistics sharing is considered valid (required)
  "domPartCod": "AK", // Partition domain of the logistics partition; if not passed, any logistics sharing is considered valid (required)
  "partCod": "S1", // Semester of the logistics partition; if not passed, any logistics sharing is considered valid (required)
  "adLogId": 12444, // ID of the logistics sharing; if not passed, any logistics sharing is considered valid
  "percMinOre": 50, // Minimum percentage of hours for attendance assignment
  "percMinORil": 50, // Minimum percentage of detections for attendance assignment
  "assegnaDataFreq": 1, // Flag for assigning the attendance date
  "studenti": [
    {
      "matricola": "AD01", // Student matriculation code, retrieves the active segment of the active student career; in case of ambiguity, the matId field can be used
      "matId": 1111, // ID of the career segment where to assign attendance; if valued, consistency with the matriculation field is checked
      "adsceId": 1111, // ID of the booklet row, used if the indicated activity is repeatable
      "aaFreqId": 2020, // Attendance year to assign to the student; if null, it is calculated with the current year
      "dataFreq": "10/10/2020", // Date of assignment of student attendance, valid only if aaFreqId is valued
      "rilevazioni": [
        {
          "idRilevazione": "1234", // Unique ID of the detection (required)
          "dataLezione": "10/10/2020 10:00:00", // Date of the lesson
          "durata": 1, // Duration in hours of the lesson
          "codFisDocente": "MRRRSS55HG22G5555K", // Fiscal code of the teacher if different from the logged-in user
          "statoPresenza": "P", // Student presence state (P present, A absent)
          "minutiAssenza": 25 // Minutes of absence at a lesson; the data is valid only if the detection state is P - presence
        }
      ] // Rilevazioni
    }
  ] // Studenti
}
```

#### Response

**`200 OK`**

```json
{
  "retCode": 1, // Return code of the massive attendance loading function
  "errMsg": "alcune rilevazioni non sono state caricate", // Error message in case errors occurred
  "scarti": [
    {}
  ] // Discards
}
```

**`422 Unprocessable Entity` - Insertion failed**

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

## Endpoints - Appello

### `GET /libretti/{matId}/appelli` - List of appeals connected to the booklet

```java
/**
 * The attoreCod query string filter is used in association with the optional config field to retrieve the appeal configuration. Currently, only values required by specific applications are retrieved. For the list of all values, the ConfCalesa API can be used.
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param attoreCod            string (query, optional)            - Type of actor required for data extraction (STU,DOC,SEG), used to filter the configuration...
 * @param q                    string (query, optional)            - The parameter allows filtering fields with specific predefined conditions, consult...
 * @param filter               string (query, optional)            - il parametro consente di applicare dei filtri alla classe di modello utilizzando il linguaggio RS...
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @return List<AppelloLibretto> on success
 */
GET /libretti/{matId}/appelli
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

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

### `GET /libretti/{matId}/prenotazioni` - Retrieves information on reservations connected by a career segment

```java
/**
 * Retrieves information on reservations connected by a career segment
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param attoreCod            string (query, optional)            - Type of actor required for data extraction (STU,DOC,SEG), used to filter the configuration...
 * @param dataMinPren          string (query, optional)            - Minimum reservation date
 * @param q                    string (query, optional)            - The parameter allows filtering fields with specific predefined conditions, consult...
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param filter               string (query, optional)            - il parametro consente di applicare dei filtri alla classe di modello utilizzando il linguaggio RS...
 * @return List<IscrizioneAppello> on success,
 *         DettaglioErrore on failure
 */
GET /libretti/{matId}/prenotazioni
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** highRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "applistaId": 102220, // Unique identifier of the reservation
    "cdsId": 102344, // ID of the study course providing the appeal
    "adId": 1022, // ID of the educational activity providing the appeal
    "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id)
    "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id)
    "stuId": 12, // ID of the career of the student who made the reservation
    "adregId": 112, // ID of the exam linked to the reservation
    "adsceId": 112, // ID of the booklet row linked to the reservation
    "matId": 112, // ID of the matriculation linked to the reservation (optional)
    "adStuCod": "AD1", // Code of the activity reserved by the student
    "adStuDes": "Attività di esempio", // Description of the activity reserved by the student (optional)
    "cdsAdStuCod": "CDS1", // Code of the study course reserved by the student
    "cdsAdStuDes": "Corso di studio di esempio", // Description of the study course reserved by the student (optional)
    "cdsAdIdStu": 102344, // ID of the study course reserved by the student (optional)
    "desAppello": "descrizione appello", // Description of the appeal (optional)
    "desTurno": "descrizione turno", // Description of the turn to which the student is enrolled (optional)
    "aulaCod": "codice aula", // Code of the classroom to which the student is enrolled (optional)
    "aulaDes": "descizione aula", // Description of the classroom to which the student is enrolled (optional)
    "edificioCod": "codice edificio", // Code of the building to which the student is enrolled (optional)
    "edificioDes": "descizione edificio", // Description of the building to which the student is enrolled (optional)
    "sedeId": 123, // ID of the location of the appeal (optional)
    "sedeDes": "descizione sede", // Description of the location of the appeal (optional)
    "dataOraTurno": "10/10/2016 12:00:00", // Date/time of the turn to which the student is enrolled (optional)
    "aaFreqId": 2020, // Attendance year of the activity (optional)
    "statoAdsce": "S", // Stato dell'attività didattica (codice)
    "pesoAd": 10.0, // Weight of the educational activity, the weight includes two optional decimals
    "userId": "m.rossi", // Active UserId of the student
    "matricola": "124AA-12", // Student matriculation code
    "nomeStudente": "Mario", // Student's name
    "nomeAlias": "Giulia", // Student alias name
    "cognomeStudente": "Rossi", // Student's surname
    "codFisStudente": "XXXYYY99A12K123H", // Student's fiscal code
    "dataNascitaStudente": "10/10/1985", // Student birth date (DD/MM/YYYY)
    "sessoStudente": "M", // Student gender (optional)
    "comuNascCodIstat": "M200", // ISTAT code of the student's birth municipality (optional)
    "cittStraNasc": "ENG", // Foreign citizenship code at birth of the student (optional)
    "cittCod": "ENG", // Student's citizenship code (optional)
    "cdsStuCod": "CDS1", // Codice corso di studio di iscrizione dello studente
    "cdsStuDes": "Corso di studio di esempio", // Description of the student's enrolled study course (optional)
    "cdsIdStu": 102344, // ID of the student's enrolled study course (optional)
    "aaOrdStuId": 2010, // Regulation year of the student's enrollment (optional)
    "pdsStuCod": "PDS1", // Code of the student's enrolled study path (optional)
    "pdsStuDes": "Percorso di studio di esempio", // Description of the student's enrolled study path (optional)
    "pdsIdStu": 9999, // ID of the student's enrolled study path (optional)
    "pubblId": 11234, // ID of the outcome publication
    "presaVisione": "N", // State of acknowledgment of the outcome
    "userIdPresaVisione": "m.rossi", // User who performed the last state change of the acknowledgment (optional)
    "userGrpPresaVisione": 7, // Group of the user who performed the last state change of the acknowledgment (optional)
    "dataRifEsito": "10/12/2017", // Date of last refusal applied to the teacher (DD/MM/YYYY) (optional)
    "dataRifEsitoStu": "10/12/2017", // Date of last refusal applied to the student (DD/MM/YYYY)
    "notaPubbl": "nota di pubblicazione", // Note inserted by the teacher during publication
    "gruppoVotoCod": "30L", // Code of the grading scale of the student's booklet
    "gruppoVotoMaxPunti": 30, // Maximum grade available for the grading scale
    "esito": {
      "modValCod": "V", // Evaluation mode of the exam, must correspond to the entered outcome type. Absent and withdrawn flags are mutually exclusive with the grade
      "superatoFlg": 1, // Indicates whether the grade/judgment is positive
      "votoEsa": 22, // Numerical grade of the exam
      "tipoGiudCod": "IDO", // Judgment grade of the exam
      "tipoGiudizioDes": "Idoneo", // Description of the judgment grade of the exam
      "assenteFlg": 1, // Flag indicating absence from the exam
      "ritiratoFlg": 1 // Flag indicating withdrawal from the exam
    }, // Esito
    "manualeFlg": 1, // Flag indicating who made the reservation (e.g., actors SEG, DOC manuale_flg=1; actor STU manuale_flg=0)
    "dataEsa": "10/10/2016", // Date of taking the exam (DD/MM/YYYY); if not valued, the turn date applies
    "domandeEsame": "prima domanda esame; seconda domanda esame", // Exam questions asked during the test
    "notaStudente": "vecchio ordinamento; Studente Lavoratore; Studente fuoricorso etc.", // Note inserted by the student during appeal reservation
    "tipoSvolgimentoEsameCod": "P", // Code of the exam execution type for the student
    "tipoSvolgimentoEsameDes": "Presenza", // Description of the exam execution type for the student
    "tipoSvolgimentoEsameRichiestaFlg": "1", // Indicates whether the exam execution type is a user request, meaning it must be converted into a definitive value (optional)
    "tagCod": "GRP1", // Tag selected by the student during reservation (optional)
    "autoTagCod": "99", // Reservation class associated with the student during reservation (optional)
    "livUscitaCod": "B1", // Language output level if the appeal includes languages, to be valued along with linguaUscitaCod (optional)
    "linguaUscitaCod": "eng", // ISO6392 code of the language to which the output level refers, to be valued along with livUscitaCod (optional)
    "dataIns": "10/10/2016", // Reservation date (DD/MM/YYYY HH24:MI:SS)
    "tipoDefAppCod": "STD", // Code identifying the tipoDefApp of the appeal linked to the reservation (optional)
    "tipoGestPrenCod": "STD", // Code identifying the tipoGestPren of the appeal linked to the reservation (optional)
    "tipoGestAppCod": "STD", // Code identifying the tipoGestApp of the appeal linked to the reservation (optional)
    "tipoAppCod": "PP", // Appeal type (PF=Final Exam, PP=Partial Exam) (optional)
    "posiz": 12, // Reservation progressive number within the enrolled list (optional)
    "posizApp": 12, // Reservation progressive number within the enrolled list ordered by data_ins
    "dataInizioIscr": "10/10/2016", // Enrollment start date (DD/MM/YYYY) (optional)
    "dataFineIscr": "16/10/2016", // Enrollment end date (DD/MM/YYYY) (optional)
    "tipoIscrCod": "S", // Enrollment mode defined in the appeal; possible values are (Written=S, Oral=O, Written and Oral=SO) (optional)
    "tipoEsaCod": "S", // Enrollment mode defined in the appeal; possible values are (Written=S, Oral=O, Written and Oral Separated=SOS, Written and Oral Conjoined=SOC) (optional)
    "aaCalId": 2020, // Calendar year of the appeal (optional)
    "aaSesId": 2020, // Year of the session (optional)
    "sesDes": "Sessione Invernale", // Description of the session (optional)
    "misureCompensative": [
      {
        "applistaId": 102220, // Unique identifier of the reservation
        "cdsId": 102344, // ID of the study course providing the appeal (optional)
        "adId": 1022, // ID of the educational activity providing the appeal (optional)
        "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id) (optional)
        "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id) (optional)
        "stuId": 12, // ID of the career of the student who made the reservation (optional)
        "misuraCompensativaCod": "TASSE_W", // Code of the compensatory measure
        "desLiberaFlg": 1, // Indicates whether the compensatory measure has a free description
        "visWebFlg": 1, // Indicates whether the compensatory measure is visible from the web
        "des": "Necessario più tempo", // Description of the compensatory measure
        "statoMisComp": "A, X, V", // State of the compensatory measure
        "statoMisCompDes": "CONFERMATA, VERIFICATA, ANNULLATA" // Description of the state of the compensatory measure
      }
    ], // MisureCompensative (optional)
    "warnings": [
      {
        "applistaId": 102220, // Unique identifier of the reservation
        "cdsId": 102344, // ID of the study course providing the appeal (optional)
        "adId": 1022, // ID of the educational activity providing the appeal (optional)
        "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id) (optional)
        "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id) (optional)
        "stuId": 12, // ID of the career of the student who made the reservation (optional)
        "tipoErrore": "TASSE_W", // Error type
        "des": "Studente non in regola con le tasse" // Error description
      }
    ] // Warnings (optional)
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

### `GET /libretti/{matId}/righe/{adsceId}/appelli` - List of appeals connected to the booklet row

```java
/**
 * The attoreCod query string filter is used in association with the optional config field to retrieve the appeal configuration. Currently, only values required by specific applications are retrieved. For the list of all values, the ConfCalesa API can be used.
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param attoreCod            string (query, optional)            - Type of actor required for data extraction (STU,DOC,SEG), used to filter the configuration...
 * @param q                    string (query, optional)            - The parameter allows filtering fields with specific predefined conditions, consult...
 * @param filter               string (query, optional)            - il parametro consente di applicare dei filtri alla classe di modello utilizzando il linguaggio RS...
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @return List<AppelloLibretto> on success
 */
GET /libretti/{matId}/righe/{adsceId}/appelli
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

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

### `GET /libretti/{matId}/righe/{adsceId}/prenotazioni` - Retrieves information on reservations connected by a career segment

```java
/**
 * Retrieves information on reservations connected by a career segment
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param attoreCod            string (query, optional)            - Type of actor required for data extraction (STU,DOC,SEG), used to filter the configuration...
 * @param q                    string (query, optional)            - The parameter allows filtering fields with specific predefined conditions, consult...
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param filter               string (query, optional)            - il parametro consente di applicare dei filtri alla classe di modello utilizzando il linguaggio RS...
 * @return List<IscrizioneAppello> on success,
 *         DettaglioErrore on failure
 */
GET /libretti/{matId}/righe/{adsceId}/prenotazioni
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** highRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "applistaId": 102220, // Unique identifier of the reservation
    "cdsId": 102344, // ID of the study course providing the appeal
    "adId": 1022, // ID of the educational activity providing the appeal
    "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id)
    "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id)
    "stuId": 12, // ID of the career of the student who made the reservation
    "adregId": 112, // ID of the exam linked to the reservation
    "adsceId": 112, // ID of the booklet row linked to the reservation
    "matId": 112, // ID of the matriculation linked to the reservation (optional)
    "adStuCod": "AD1", // Code of the activity reserved by the student
    "adStuDes": "Attività di esempio", // Description of the activity reserved by the student (optional)
    "cdsAdStuCod": "CDS1", // Code of the study course reserved by the student
    "cdsAdStuDes": "Corso di studio di esempio", // Description of the study course reserved by the student (optional)
    "cdsAdIdStu": 102344, // ID of the study course reserved by the student (optional)
    "desAppello": "descrizione appello", // Description of the appeal (optional)
    "desTurno": "descrizione turno", // Description of the turn to which the student is enrolled (optional)
    "aulaCod": "codice aula", // Code of the classroom to which the student is enrolled (optional)
    "aulaDes": "descizione aula", // Description of the classroom to which the student is enrolled (optional)
    "edificioCod": "codice edificio", // Code of the building to which the student is enrolled (optional)
    "edificioDes": "descizione edificio", // Description of the building to which the student is enrolled (optional)
    "sedeId": 123, // ID of the location of the appeal (optional)
    "sedeDes": "descizione sede", // Description of the location of the appeal (optional)
    "dataOraTurno": "10/10/2016 12:00:00", // Date/time of the turn to which the student is enrolled (optional)
    "aaFreqId": 2020, // Attendance year of the activity (optional)
    "statoAdsce": "S", // Stato dell'attività didattica (codice)
    "pesoAd": 10.0, // Weight of the educational activity, the weight includes two optional decimals
    "userId": "m.rossi", // Active UserId of the student
    "matricola": "124AA-12", // Student matriculation code
    "nomeStudente": "Mario", // Student's name
    "nomeAlias": "Giulia", // Student alias name
    "cognomeStudente": "Rossi", // Student's surname
    "codFisStudente": "XXXYYY99A12K123H", // Student's fiscal code
    "dataNascitaStudente": "10/10/1985", // Student birth date (DD/MM/YYYY)
    "sessoStudente": "M", // Student gender (optional)
    "comuNascCodIstat": "M200", // ISTAT code of the student's birth municipality (optional)
    "cittStraNasc": "ENG", // Foreign citizenship code at birth of the student (optional)
    "cittCod": "ENG", // Student's citizenship code (optional)
    "cdsStuCod": "CDS1", // Codice corso di studio di iscrizione dello studente
    "cdsStuDes": "Corso di studio di esempio", // Description of the student's enrolled study course (optional)
    "cdsIdStu": 102344, // ID of the student's enrolled study course (optional)
    "aaOrdStuId": 2010, // Regulation year of the student's enrollment (optional)
    "pdsStuCod": "PDS1", // Code of the student's enrolled study path (optional)
    "pdsStuDes": "Percorso di studio di esempio", // Description of the student's enrolled study path (optional)
    "pdsIdStu": 9999, // ID of the student's enrolled study path (optional)
    "pubblId": 11234, // ID of the outcome publication
    "presaVisione": "N", // State of acknowledgment of the outcome
    "userIdPresaVisione": "m.rossi", // User who performed the last state change of the acknowledgment (optional)
    "userGrpPresaVisione": 7, // Group of the user who performed the last state change of the acknowledgment (optional)
    "dataRifEsito": "10/12/2017", // Date of last refusal applied to the teacher (DD/MM/YYYY) (optional)
    "dataRifEsitoStu": "10/12/2017", // Date of last refusal applied to the student (DD/MM/YYYY)
    "notaPubbl": "nota di pubblicazione", // Note inserted by the teacher during publication
    "gruppoVotoCod": "30L", // Code of the grading scale of the student's booklet
    "gruppoVotoMaxPunti": 30, // Maximum grade available for the grading scale
    "esito": {
      "modValCod": "V", // Evaluation mode of the exam, must correspond to the entered outcome type. Absent and withdrawn flags are mutually exclusive with the grade
      "superatoFlg": 1, // Indicates whether the grade/judgment is positive
      "votoEsa": 22, // Numerical grade of the exam
      "tipoGiudCod": "IDO", // Judgment grade of the exam
      "tipoGiudizioDes": "Idoneo", // Description of the judgment grade of the exam
      "assenteFlg": 1, // Flag indicating absence from the exam
      "ritiratoFlg": 1 // Flag indicating withdrawal from the exam
    }, // Esito
    "manualeFlg": 1, // Flag indicating who made the reservation (e.g., actors SEG, DOC manuale_flg=1; actor STU manuale_flg=0)
    "dataEsa": "10/10/2016", // Date of taking the exam (DD/MM/YYYY); if not valued, the turn date applies
    "domandeEsame": "prima domanda esame; seconda domanda esame", // Exam questions asked during the test
    "notaStudente": "vecchio ordinamento; Studente Lavoratore; Studente fuoricorso etc.", // Note inserted by the student during appeal reservation
    "tipoSvolgimentoEsameCod": "P", // Code of the exam execution type for the student
    "tipoSvolgimentoEsameDes": "Presenza", // Description of the exam execution type for the student
    "tipoSvolgimentoEsameRichiestaFlg": "1", // Indicates whether the exam execution type is a user request, meaning it must be converted into a definitive value (optional)
    "tagCod": "GRP1", // Tag selected by the student during reservation (optional)
    "autoTagCod": "99", // Reservation class associated with the student during reservation (optional)
    "livUscitaCod": "B1", // Language output level if the appeal includes languages, to be valued along with linguaUscitaCod (optional)
    "linguaUscitaCod": "eng", // ISO6392 code of the language to which the output level refers, to be valued along with livUscitaCod (optional)
    "dataIns": "10/10/2016", // Reservation date (DD/MM/YYYY HH24:MI:SS)
    "tipoDefAppCod": "STD", // Code identifying the tipoDefApp of the appeal linked to the reservation (optional)
    "tipoGestPrenCod": "STD", // Code identifying the tipoGestPren of the appeal linked to the reservation (optional)
    "tipoGestAppCod": "STD", // Code identifying the tipoGestApp of the appeal linked to the reservation (optional)
    "tipoAppCod": "PP", // Appeal type (PF=Final Exam, PP=Partial Exam) (optional)
    "posiz": 12, // Reservation progressive number within the enrolled list (optional)
    "posizApp": 12, // Reservation progressive number within the enrolled list ordered by data_ins
    "dataInizioIscr": "10/10/2016", // Enrollment start date (DD/MM/YYYY) (optional)
    "dataFineIscr": "16/10/2016", // Enrollment end date (DD/MM/YYYY) (optional)
    "tipoIscrCod": "S", // Enrollment mode defined in the appeal; possible values are (Written=S, Oral=O, Written and Oral=SO) (optional)
    "tipoEsaCod": "S", // Enrollment mode defined in the appeal; possible values are (Written=S, Oral=O, Written and Oral Separated=SOS, Written and Oral Conjoined=SOC) (optional)
    "aaCalId": 2020, // Calendar year of the appeal (optional)
    "aaSesId": 2020, // Year of the session (optional)
    "sesDes": "Sessione Invernale", // Description of the session (optional)
    "misureCompensative": [
      {
        "applistaId": 102220, // Unique identifier of the reservation
        "cdsId": 102344, // ID of the study course providing the appeal (optional)
        "adId": 1022, // ID of the educational activity providing the appeal (optional)
        "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id) (optional)
        "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id) (optional)
        "stuId": 12, // ID of the career of the student who made the reservation (optional)
        "misuraCompensativaCod": "TASSE_W", // Code of the compensatory measure
        "desLiberaFlg": 1, // Indicates whether the compensatory measure has a free description
        "visWebFlg": 1, // Indicates whether the compensatory measure is visible from the web
        "des": "Necessario più tempo", // Description of the compensatory measure
        "statoMisComp": "A, X, V", // State of the compensatory measure
        "statoMisCompDes": "CONFERMATA, VERIFICATA, ANNULLATA" // Description of the state of the compensatory measure
      }
    ], // MisureCompensative (optional)
    "warnings": [
      {
        "applistaId": 102220, // Unique identifier of the reservation
        "cdsId": 102344, // ID of the study course providing the appeal (optional)
        "adId": 1022, // ID of the educational activity providing the appeal (optional)
        "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id) (optional)
        "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id) (optional)
        "stuId": 12, // ID of the career of the student who made the reservation (optional)
        "tipoErrore": "TASSE_W", // Error type
        "des": "Studente non in regola con le tasse" // Error description
      }
    ] // Warnings (optional)
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

### `GET /libretti/{matId}/righe/{adsceId}/prenotazioni/{applistaId}` - Retrieves information on reservations connected by a career segment

```java
/**
 * Retrieves information on reservations connected by a career segment
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param applistaId           integer (path, required)            - Unique ID of a student's reservation
 * @param attoreCod            string (query, optional)            - Type of actor required for data extraction (STU,DOC,SEG), used to filter the configuration...
 * @param q                    string (query, optional)            - The parameter allows filtering fields with specific predefined conditions, consult...
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param filter               string (query, optional)            - il parametro consente di applicare dei filtri alla classe di modello utilizzando il linguaggio RS...
 * @return IscrizioneAppello on success,
 *         DettaglioErrore on failure
 */
GET /libretti/{matId}/righe/{adsceId}/prenotazioni/{applistaId}
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** highRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "applistaId": 102220, // Unique identifier of the reservation
  "cdsId": 102344, // ID of the study course providing the appeal
  "adId": 1022, // ID of the educational activity providing the appeal
  "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id)
  "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id)
  "stuId": 12, // ID of the career of the student who made the reservation
  "adregId": 112, // ID of the exam linked to the reservation
  "adsceId": 112, // ID of the booklet row linked to the reservation
  "matId": 112, // ID of the matriculation linked to the reservation (optional)
  "adStuCod": "AD1", // Code of the activity reserved by the student
  "adStuDes": "Attività di esempio", // Description of the activity reserved by the student (optional)
  "cdsAdStuCod": "CDS1", // Code of the study course reserved by the student
  "cdsAdStuDes": "Corso di studio di esempio", // Description of the study course reserved by the student (optional)
  "cdsAdIdStu": 102344, // ID of the study course reserved by the student (optional)
  "desAppello": "descrizione appello", // Description of the appeal (optional)
  "desTurno": "descrizione turno", // Description of the turn to which the student is enrolled (optional)
  "aulaCod": "codice aula", // Code of the classroom to which the student is enrolled (optional)
  "aulaDes": "descizione aula", // Description of the classroom to which the student is enrolled (optional)
  "edificioCod": "codice edificio", // Code of the building to which the student is enrolled (optional)
  "edificioDes": "descizione edificio", // Description of the building to which the student is enrolled (optional)
  "sedeId": 123, // ID of the location of the appeal (optional)
  "sedeDes": "descizione sede", // Description of the location of the appeal (optional)
  "dataOraTurno": "10/10/2016 12:00:00", // Date/time of the turn to which the student is enrolled (optional)
  "aaFreqId": 2020, // Attendance year of the activity (optional)
  "statoAdsce": "S", // Stato dell'attività didattica (codice)
  "pesoAd": 10.0, // Weight of the educational activity, the weight includes two optional decimals
  "userId": "m.rossi", // Active UserId of the student
  "matricola": "124AA-12", // Student matriculation code
  "nomeStudente": "Mario", // Student's name
  "nomeAlias": "Giulia", // Student alias name
  "cognomeStudente": "Rossi", // Student's surname
  "codFisStudente": "XXXYYY99A12K123H", // Student's fiscal code
  "dataNascitaStudente": "10/10/1985", // Student birth date (DD/MM/YYYY)
  "sessoStudente": "M", // Student gender (optional)
  "comuNascCodIstat": "M200", // ISTAT code of the student's birth municipality (optional)
  "cittStraNasc": "ENG", // Foreign citizenship code at birth of the student (optional)
  "cittCod": "ENG", // Student's citizenship code (optional)
  "cdsStuCod": "CDS1", // Codice corso di studio di iscrizione dello studente
  "cdsStuDes": "Corso di studio di esempio", // Description of the student's enrolled study course (optional)
  "cdsIdStu": 102344, // ID of the student's enrolled study course (optional)
  "aaOrdStuId": 2010, // Regulation year of the student's enrollment (optional)
  "pdsStuCod": "PDS1", // Code of the student's enrolled study path (optional)
  "pdsStuDes": "Percorso di studio di esempio", // Description of the student's enrolled study path (optional)
  "pdsIdStu": 9999, // ID of the student's enrolled study path (optional)
  "pubblId": 11234, // ID of the outcome publication
  "presaVisione": "N", // State of acknowledgment of the outcome
  "userIdPresaVisione": "m.rossi", // User who performed the last state change of the acknowledgment (optional)
  "userGrpPresaVisione": 7, // Group of the user who performed the last state change of the acknowledgment (optional)
  "dataRifEsito": "10/12/2017", // Date of last refusal applied to the teacher (DD/MM/YYYY) (optional)
  "dataRifEsitoStu": "10/12/2017", // Date of last refusal applied to the student (DD/MM/YYYY)
  "notaPubbl": "nota di pubblicazione", // Note inserted by the teacher during publication
  "gruppoVotoCod": "30L", // Code of the grading scale of the student's booklet
  "gruppoVotoMaxPunti": 30, // Maximum grade available for the grading scale
  "esito": {
    "modValCod": "V", // Evaluation mode of the exam, must correspond to the entered outcome type. Absent and withdrawn flags are mutually exclusive with the grade
    "superatoFlg": 1, // Indicates whether the grade/judgment is positive
    "votoEsa": 22, // Numerical grade of the exam
    "tipoGiudCod": "IDO", // Judgment grade of the exam
    "tipoGiudizioDes": "Idoneo", // Description of the judgment grade of the exam
    "assenteFlg": 1, // Flag indicating absence from the exam
    "ritiratoFlg": 1 // Flag indicating withdrawal from the exam
  }, // Esito
  "manualeFlg": 1, // Flag indicating who made the reservation (e.g., actors SEG, DOC manuale_flg=1; actor STU manuale_flg=0)
  "dataEsa": "10/10/2016", // Date of taking the exam (DD/MM/YYYY); if not valued, the turn date applies
  "domandeEsame": "prima domanda esame; seconda domanda esame", // Exam questions asked during the test
  "notaStudente": "vecchio ordinamento; Studente Lavoratore; Studente fuoricorso etc.", // Note inserted by the student during appeal reservation
  "tipoSvolgimentoEsameCod": "P", // Code of the exam execution type for the student
  "tipoSvolgimentoEsameDes": "Presenza", // Description of the exam execution type for the student
  "tipoSvolgimentoEsameRichiestaFlg": "1", // Indicates whether the exam execution type is a user request, meaning it must be converted into a definitive value (optional)
  "tagCod": "GRP1", // Tag selected by the student during reservation (optional)
  "autoTagCod": "99", // Reservation class associated with the student during reservation (optional)
  "livUscitaCod": "B1", // Language output level if the appeal includes languages, to be valued along with linguaUscitaCod (optional)
  "linguaUscitaCod": "eng", // ISO6392 code of the language to which the output level refers, to be valued along with livUscitaCod (optional)
  "dataIns": "10/10/2016", // Reservation date (DD/MM/YYYY HH24:MI:SS)
  "tipoDefAppCod": "STD", // Code identifying the tipoDefApp of the appeal linked to the reservation (optional)
  "tipoGestPrenCod": "STD", // Code identifying the tipoGestPren of the appeal linked to the reservation (optional)
  "tipoGestAppCod": "STD", // Code identifying the tipoGestApp of the appeal linked to the reservation (optional)
  "tipoAppCod": "PP", // Appeal type (PF=Final Exam, PP=Partial Exam) (optional)
  "posiz": 12, // Reservation progressive number within the enrolled list (optional)
  "posizApp": 12, // Reservation progressive number within the enrolled list ordered by data_ins
  "dataInizioIscr": "10/10/2016", // Enrollment start date (DD/MM/YYYY) (optional)
  "dataFineIscr": "16/10/2016", // Enrollment end date (DD/MM/YYYY) (optional)
  "tipoIscrCod": "S", // Enrollment mode defined in the appeal; possible values are (Written=S, Oral=O, Written and Oral=SO) (optional)
  "tipoEsaCod": "S", // Enrollment mode defined in the appeal; possible values are (Written=S, Oral=O, Written and Oral Separated=SOS, Written and Oral Conjoined=SOC) (optional)
  "aaCalId": 2020, // Calendar year of the appeal (optional)
  "aaSesId": 2020, // Year of the session (optional)
  "sesDes": "Sessione Invernale", // Description of the session (optional)
  "misureCompensative": [
    {
      "applistaId": 102220, // Unique identifier of the reservation
      "cdsId": 102344, // ID of the study course providing the appeal (optional)
      "adId": 1022, // ID of the educational activity providing the appeal (optional)
      "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id) (optional)
      "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id) (optional)
      "stuId": 12, // ID of the career of the student who made the reservation (optional)
      "misuraCompensativaCod": "TASSE_W", // Code of the compensatory measure
      "desLiberaFlg": 1, // Indicates whether the compensatory measure has a free description
      "visWebFlg": 1, // Indicates whether the compensatory measure is visible from the web
      "des": "Necessario più tempo", // Description of the compensatory measure
      "statoMisComp": "A, X, V", // State of the compensatory measure
      "statoMisCompDes": "CONFERMATA, VERIFICATA, ANNULLATA" // Description of the state of the compensatory measure
    }
  ], // MisureCompensative (optional)
  "warnings": [
    {
      "applistaId": 102220, // Unique identifier of the reservation
      "cdsId": 102344, // ID of the study course providing the appeal (optional)
      "adId": 1022, // ID of the educational activity providing the appeal (optional)
      "appId": 1, // Progressive ID of the appeal with respect to the pair (cds_id, ad_id) (optional)
      "appLogId": 1, // Progressive ID of the turn with respect to the triad (cds_id, ad_id, app_id) (optional)
      "stuId": 12, // ID of the career of the student who made the reservation (optional)
      "tipoErrore": "TASSE_W", // Error type
      "des": "Studente non in regola con le tasse" // Error description
    }
  ] // Warnings (optional)
}
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

### `GET /libretti/{matId}/righe/{adsceId}/prenotazioni/{applistaId}/attestato-di-presenza` - Retrieves the attendance certificate

```java
/**
 * The attendance certificate is generated only if the following conditions are met: the appeal's configuration includes certificate generation (TIPI_GEST_APP.GESTIONE_ATT_PRESENZA), the outcome is published with an active publication status, and there are no SQL conditions preventing certificate generation.
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param applistaId           integer (path, required)            - Unique ID of a student's reservation
 * @return file on success,
 *         DettaglioErrore on failure
 */
GET /libretti/{matId}/righe/{adsceId}/prenotazioni/{applistaId}/attestato-di-presenza
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** highRefreshRateUserIndependent

**Content-Type:** `applicatrion/octet-stream`

#### Response

**`200 OK`**

**`422 Unprocessable Entity` - Error during PDF generation**

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

### `GET /libretti/{matId}/righe/{adsceId}/prenotazioni/{applistaId}/statino-prenotazione` - Retrieves the reservation slip

```java
/**
 * The reservation slip is always retrievable via REST services, unlike ESSE3 WEB. To replicate the web behavior, printing must be blocked after the appeal date has passed.
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param applistaId           integer (path, required)            - Unique ID of a student's reservation
 * @return file on success,
 *         DettaglioErrore on failure
 */
GET /libretti/{matId}/righe/{adsceId}/prenotazioni/{applistaId}/statino-prenotazione
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** none

**Content-Type:** `applicatrion/octet-stream`

#### Response

**`200 OK`**

**`422 Unprocessable Entity` - Error during PDF generation**

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

## Endpoints - Libretto

### `GET /libretti/{matId}/medie` - All averages of the booklet

```java
/**
 * Retrieves information on possible exam averages associated with the student's booklet.
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param dataRifMedieIni      string (query, optional)            - Initial reference date for calculating averages
 * @param dataRifMedieFin      string (query, optional)            - Final reference date for calculating averages
 * @return List<MediaLibretto> on success
 */
GET /libretti/{matId}/medie
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "definizioneBase": "CDS", // Type of average definition, retrieving the base value from the regulation (CDSORD) or base 110 (CDS) (required)
    "tipoMediaCod": "A", // Description of the expected average type: Arithmetic or Weighted (required)
    "base": 1, // Base on which the average is calculated (required)
    "tipoOk": 1, // Value set to 1 if the average type is consistent with the one defined by the rules (required)
    "media": 1 // Calculated average (required)
  }
]
```

<br>

---

<br>

### `GET /libretti/{matId}/medie/{base}/{tipo}` - Requested booklet average

```java
/**
 * Retrieves information on the calculated exam averages. Possible averages are defined according to the following parameters: base (type of average definition, CDSORD retrieves the base from the regulation, CDS retrieves base 110), and type (type of calculation, A for Arithmetic average, P for Weighted average).
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param base                 string (path, required)             - Type of base to retrieve the average with (CDSORD, CDS)
 * @param tipo                 string (path, required)             - Type of average calculation (A, P)
 * @param dataRifMedieIni      string (query, optional)            - Initial reference date for calculating averages
 * @param dataRifMedieFin      string (query, optional)            - Final reference date for calculating averages
 * @return List<MediaLibretto> on success
 */
GET /libretti/{matId}/medie/{base}/{tipo}
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "definizioneBase": "CDS", // Type of average definition, retrieving the base value from the regulation (CDSORD) or base 110 (CDS) (required)
    "tipoMediaCod": "A", // Description of the expected average type: Arithmetic or Weighted (required)
    "base": 1, // Base on which the average is calculated (required)
    "tipoOk": 1, // Value set to 1 if the average type is consistent with the one defined by the rules (required)
    "media": 1 // Calculated average (required)
  }
]
```

<br>

---

<br>

### `GET /libretti/{matId}/righe/` - All activities of the booklet of the selected career segment

```java
/**
 * All activities of the booklet of the selected career segment
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adCod                string (query, optional)            - Activity code of the booklet row to search
 * @param adNonCancellabili    integer (query, optional)           - If 1, retrieves non-cancellable educational activities of the booklet. Defaults to 0
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param filter               string (query, optional)            - il parametro consente di applicare dei filtri alla classe di modello utilizzando il linguaggio RS...
 * @return List<RigaLibretto> on success
 */
GET /libretti/{matId}/righe/
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
    "ord": 1, // Activity sorting progressive, calculated taking into account groupings and regulations expected by the system (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "stuId": 1, // Unique ID identifying the student's career (required)
    "pianoId": 1, // Progressive ID of the study plan linked through implementation to the booklet.
    "itmId": 1, // Progressive ID of the plan activity linked to the booklet row
    "ragId": 1, // If the activity belongs to a grouping, contains the adsceID of the grouping parent
    "raggEsaTipo": "ESA", // Contains the grouping type typology, valued only on the grouping parent (i.e., when ragId=adsceId)
    "adCod": "ADCOD", // Code of the educational activity present in the booklet. The code is copied into each single booklet and normally matches the code expected in the educational offering to which the activity refers
    "adDes": "Descrizione AD", // Description of the educational activity present in the booklet; like the code, the description is copied from the educational offering but can be modified (required)
    "annoCorso": 1, // Course year in which the educational activity is expected (required)
    "stato": "S", // State of the educational activity (code) (required)
    "statoDes": "Superata", // Descrizione dello stato dell\'attività didattica (required)
    "chiaveADContestualizzata": {
      "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
      "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
      "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
      "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
      "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
      "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
      "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
      "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
      "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
      "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
      "adId": 1, // Chiave dell'attività didattica (required)
      "adCod": "PDS_AD_1", // Codice dell''attività didattica
      "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
      "afId": 1 // Id della afId proveniente da U-Gov Didattica
    }, // ChiaveADContestualizzata
    "tipoEsaCod": "O", // Code of the exam type expected for the educational activity
    "tipoEsaDes": "Orale", // Description of the exam type expected for the educational activity
    "tipoInsCod": "OBB", // Code of the teaching type expected for the educational activity
    "tipoInsDes": "Obbligatorio", // Description of the teaching type expected for the educational activity
    "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation) (required)
    "tipoRicCod": "P", // Code of the recognition type expected for the educational activity
    "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals (required)
    "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
    "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
    "freqUffFlg": 1, // Automatically assigned attendance (required)
    "freqObbligFlg": 0, // Mandatory attendance (required)
    "dataScadIscr": "15/10/2015", // Enrollment expiration date, the activity cannot be taken after this date; the required format is DD/MM/YYYY
    "gruppoVotoId": 1, // ID of the used grade typology, indicating which grade range is defined for the educational activity, the minimum passing grade, the maximum grade, and the possible presence of honors
    "gruppoVotoMinVoto": 18, // Indicates the minimum passing grade for the selected grading scale
    "gruppoVotoMaxVoto": 30, // Indicates the maximum passing grade for the selected grading scale
    "gruppoVotoLodeFlg": 1, // Indicates whether the selected grading scale includes honors
    "gruppoGiudCod": "9998", // Code of the judgment group to which the judgment present in the outcome belongs
    "gruppoGiudDes": "Idoneità", // Description of the judgment group to which the selected judgment belongs
    "esito": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // Esito
    "sovranFlg": 0, // Supernumerary activity (required)
    "note": "nota di prova", // Notes associated with the booklet row
    "debitoFlg": 0, // Debt activity (required)
    "ofaFlg": 0, // OFA activity (optional)
    "annoCorsoAnticipo": 2, // Anticipated course year of the activity; if valued, indicates the course year to which the activity was anticipated
    "genAutoFlg": 0, // Activity automatically inserted by a procedure other than career plan implementation or booklet management (e.g., appeal reservations, exam registrations, etc.) (required)
    "genRicSpecFlg": 0, // Automatically inserted activity related to credit recognition for specialized careers (3+2), containing all segments of the three-year segment of the specialized degree (required)
    "tipoOrigEvecar": 1, // Indicates the origin type of the booklet AD: 0 = AD not linked to any resolution; 1 = AD inserted automatically during implementation with pending resolution (in this case, AD is not linked to the plan); 2 = AD linked to resolution and inserted automatically upon activation; 3 = AD linked to resolution (state transition 1->3 after resolution approval); 4 = AD related to a canceled resolution, in this case, the AD is not linked to the plan (optional)
    "urlSitoWeb": "null", // URL of the teaching web page (optional)
    "infoDottorati": {
      "soggettoErogante": "Università La Sapienza", // Entity providing the activity
      "destinazione": "Università La Sapienza", // Location where the activity is provided
      "dataPartenza": "10/10/2020", // Start date
      "dataArrivo": "10/10/2020", // End date
      "noteStu": "10/10/2020", // Student's notes on the activity
      "adFuoriOffFlg": 1, // Flag indicating whether the activity is part of Ph.D. ADs
      "missioneFlg": 0, // Indicates that the activity requires a mission
      "ricercaFlg": 0, // Indicates that the activity is related to research
      "periodoEsteroFlg": 0, // Indicates that the activity is a period abroad
      "aziendaFlg": 0 // Indicates that the activity takes place in a company
    }, // InfoDottorati (optional)
    "rilFreq": [
      {
        "matId": 1, // ID of the career segment on which to calculate statistics
        "adsceRilId": 1, // Identifier of the detections group
        "aaRilevazioneId": 1, // Detection year
        "adsceId": 1, // Identificativo univoco che consente di individuare una riga di libretto dello studente
        "stuTipoCorsoCod": "L2", // Code of the student's study course type
        "statoAdsceRil": "A", // State of the detection (A, B, X)
        "aaFreqId": 2020, // Attendance year set by the detection
        "dataFreq": "10/10/2020", // Attendance acquisition date
        "staSceCod": "F", // Educational activity state set by the detection
        "totOrePerFreq": 1, // Total hours of detections
        "totRilPerFreq": 1, // Total number of detections
        "percPresPerFreq": 1, // Percentage of presence
        "percOrePresPerFreq": 1, // Percentage of hours of presence
        "numRil": 1, // Total number of calculated detections
        "oreRil": 1, // Total hours of calculated detections
        "numAss": 1, // Total number of calculated absences
        "numPres": 1, // Total number of calculated presences
        "oreAss": 1, // Total hours of calculated absences
        "orePres": 1, // Total hours of calculated presences
        "oreTotFreqAd": 1, // Expected attendance hours for the educational activity
        "numTotFreqAd": 1, // Number of expected lessons for the educational activity (based on par_conf RIL_FREQ_DURATA_RIL which indicates the average duration of a lesson)
        "dataFreqRilFreqDett": "10/10/2020 10:00:00", // Maximum detection date calculated over a set of detections
        "dataFreqAdLog": "01/01/1900 10:00:00" // End date of the educational period
      }
    ], // RilFreq (optional)
    "statoMissione": "I", // Mission state (optional)
    "statoMissioneDes": "In Missione", // Mission state description (optional)
    "numAppelliPrenotabili": 1, // Contains the number of bookable appeals at the system date for the booklet row
    "superataFlg": 0, // Passed activity, also includes the case of recorded exams not loaded into the career due to errors during the carica_prove procedure
    "numPrenotazioni": 10, // Contains the number of pending reservations linked to the booklet row.
    "abilFlg": 1, // Indicates whether the educational activity is associated with obtaining a specific qualification required by the study course.
    "genConvAdsceId": 12345, // Source adsce_id of the validation for ADs that are for completion.
    "infoInterateneo": {
      "aaOffAdId": 2024, // Offering year provided in the inter-university
      "aaOrdAdId": 2024, // Regulation year provided in the inter-university
      "adCod": "AD", // Activity code provided in the inter-university
      "adDes": "Attivita", // Activity description provided in the inter-university
      "adsceId": 12345, // Booklet row of the operational headquarters where the educational activity linked to the booklet row was loaded
      "ateneoId": 6, // ID of the university where the educational activity is provided
      "cdsAdCod": "3165", // Course code provided in the inter-university
      "cdsAdDes": "CHIMICA", // Course description provided in the inter-university
      "pdsAdCod": "PDS9999", // Path code provided in the inter-university
      "pdsAdDes": "COMUNE" // Path description provided in the inter-university
    }, // InfoInterateneo (optional)
    "extraInfo": {
      "matId": 1, // ID of the career segment on which to calculate statistics
      "adsceId": 1, // Unique ID identifying a student's booklet row
      "dataInizioLezioni": "10/10/2020", // Expected start date of lessons
      "dataFineLezioni": "10/10/2020", // Expected end date of lessons
      "titMatricola": "222", // Matriculation of the titular of the student's partition
      "titNome": "Mario", // Name of the titular of the student's partition
      "titCognome": "Rossi", // Surname of the titular of the student's partition
      "titCodFis": "222", // Matriculation of the titular of the student's partition
      "fatPartCod": "AK_LZ", // Partitioning factor of the educational activity
      "domPartCod": "AK", // Class assigned to the student
      "tipiSceCod": "O", // Plan rule linked to the booklet row, valid only if the plan is active
      "tipiSceDes": "Obbligatoria", // Description of the plan rule type linked to the booklet row, valid only if the plan is active
      "sceDes": "O", // Description of the plan rule linked to the booklet row, valid only if the plan is active
      "freqObbligFlg": 0, // Activity with mandatory attendance
      "adPartId": 1, // ID of the booklet partition row
      "titDocenteId": 1234 // Unique identifier of the teacher
    } // ExtraInfo (optional)
  }
]
```

<br>

---

<br>

### `POST /libretti/{matId}/righe/` - Inserts a booklet row

```java
/**
 * Allows inserting a booklet row; to populate the body parameters' IDs, the services-service-v1/translator/cod-to-id service can be used.
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param body                 AttivitaDaInserire (body, required) - Object containing the row to be inserted
 * @return 201 Operation successfully performed,
 *         DettaglioErrore on failure
 */
POST /libretti/{matId}/righe/
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Request body

```json
{
  "annoCorso": 1, // Course year of the educational activity (required)
  "ofaFlg": 0, // Flag indicating whether the activity should be considered an OFA; if not passed, defaults to 0
  "debitoFlg": 0, // Flag indicating whether the activity should be considered a debt; if not passed, defaults to 0
  "tipoAttivita": "offerta", // Type of activity to insert: - offerta (offered): populate the 'dettagliOfferta' property; - fuoriOfferta (out of offering): populate the 'dettagliFuoriOfferta' property (required)
  "dettagliOfferta": {
    "adId": 1, // ID of the educational activity to insert (valued as an alternative to adCod); one of adId or adCod is mandatory
    "adCod": "AD_COD", // Code of the educational activity to insert (valued as an alternative to adId); one of adId or adCod is mandatory
    "cdsId": 2, // ID of the study course providing the educational activity to insert (valued as an alternative to cdsCod); one of cdsId or cdsCod is mandatory
    "cdsCod": "CDS_COD", // Code of the study course providing the educational activity to insert (valued as an alternative to cdsId); one of cdsId or cdsCod is mandatory
    "aaOrdId": 2020, // Regulation year of the study course providing the educational activity to insert; if not valued, it is calculated by the system (required)
    "pdsId": 2, // ID of the study path providing the educational activity to insert (valued as an alternative to pdsCod); one of pdsId or pdsCod is mandatory
    "pdsCod": "PDS_COD", // Code of the study path providing the educational activity to insert (valued as an alternative to pdsId); one of pdsId or pdsCod is mandatory
    "aaOffId": 2020 // Offering year of the educational activity to insert; if not valued, it is calculated by the system (required)
  }, // DettagliOfferta
  "dettagliFuoriOfferta": {
    "cod": "AD1", // Code of the activity to insert (required)
    "des": "Attività didattica 1", // Description of the activity to insert (required)
    "peso": "10.0", // Weight of the activity if no segments are present; otherwise, it must be consistent with the sum of the segments themselves
    "aaOffId": 2021, // Reference offering year of the activity
    "segmenti": [
      {
        "udCod": "UDCOD1", // Code of the teaching unit to which the segment belongs
        "udDes": "udDes", // Description of the teaching unit to which the segment belongs
        "tipoCreCod": "tipoCreCod", // Expected credit type for the segment (required)
        "taf": "A", // Educational Activity Type
        "ambId": 1, // Area ID
        "settCod": "MAT/01", // Scientific disciplinary sector code (required)
        "discCod": "X", // Expected discipline type, valid if CDSORD is not defined by Sectors
        "peso": 10.5, // Weight of the segment according to the unit of measurement expected by the booklet row (required)
        "durata": 1, // Duration in hours of the segment
        "oreMinFreq": 0.0, // Minimum number of attendance hours required for the segment. Populated if attendance is mandatory
        "oreRegFreq": 10.0, // Registered attendance hours
        "dataRegFreq": "2016-01-14T22:00:00.000+0000", // Attendance registration date; required format is DD/MM/YYYY
        "freqObbligFlg": 0 // Mandatory segment; the activity has mandatory attendance if there is at least one mandatory segment
      }
    ] // Segmenti (required)
  } // DettagliFuoriOfferta
}
```

#### Response

**`201 Created` - Operation successfully performed**

**`422 Unprocessable Entity` - Insertion failed**

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

### `GET /libretti/{matId}/righe/{adsceId}` - Activity requested in the selected booklet

```java
/**
 * Activity requested in the selected booklet
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @return RigaLibretto on success
 */
GET /libretti/{matId}/righe/{adsceId}
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
  "ord": 1, // Activity sorting progressive, calculated taking into account groupings and regulations expected by the system (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "stuId": 1, // Unique ID identifying the student's career (required)
  "pianoId": 1, // Progressive ID of the study plan linked through implementation to the booklet.
  "itmId": 1, // Progressive ID of the plan activity linked to the booklet row
  "ragId": 1, // If the activity belongs to a grouping, contains the adsceID of the grouping parent
  "raggEsaTipo": "ESA", // Contains the grouping type typology, valued only on the grouping parent (i.e., when ragId=adsceId)
  "adCod": "ADCOD", // Code of the educational activity present in the booklet. The code is copied into each single booklet and normally matches the code expected in the educational offering to which the activity refers
  "adDes": "Descrizione AD", // Description of the educational activity present in the booklet; like the code, the description is copied from the educational offering but can be modified (required)
  "annoCorso": 1, // Course year in which the educational activity is expected (required)
  "stato": "S", // State of the educational activity (code) (required)
  "statoDes": "Superata", // Descrizione dello stato dell\'attività didattica (required)
  "chiaveADContestualizzata": {
    "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
    "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
    "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
    "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
    "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
    "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
    "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
    "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
    "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
    "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
    "adId": 1, // Chiave dell'attività didattica (required)
    "adCod": "PDS_AD_1", // Codice dell''attività didattica
    "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
    "afId": 1 // Id della afId proveniente da U-Gov Didattica
  }, // ChiaveADContestualizzata
  "tipoEsaCod": "O", // Code of the exam type expected for the educational activity
  "tipoEsaDes": "Orale", // Description of the exam type expected for the educational activity
  "tipoInsCod": "OBB", // Code of the teaching type expected for the educational activity
  "tipoInsDes": "Obbligatorio", // Description of the teaching type expected for the educational activity
  "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation) (required)
  "tipoRicCod": "P", // Code of the recognition type expected for the educational activity
  "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals (required)
  "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
  "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
  "freqUffFlg": 1, // Automatically assigned attendance (required)
  "freqObbligFlg": 0, // Mandatory attendance (required)
  "dataScadIscr": "15/10/2015", // Enrollment expiration date, the activity cannot be taken after this date; the required format is DD/MM/YYYY
  "gruppoVotoId": 1, // ID of the used grade typology, indicating which grade range is defined for the educational activity, the minimum passing grade, the maximum grade, and the possible presence of honors
  "gruppoVotoMinVoto": 18, // Indicates the minimum passing grade for the selected grading scale
  "gruppoVotoMaxVoto": 30, // Indicates the maximum passing grade for the selected grading scale
  "gruppoVotoLodeFlg": 1, // Indicates whether the selected grading scale includes honors
  "gruppoGiudCod": "9998", // Code of the judgment group to which the judgment present in the outcome belongs
  "gruppoGiudDes": "Idoneità", // Description of the judgment group to which the selected judgment belongs
  "esito": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // Esito
  "sovranFlg": 0, // Supernumerary activity (required)
  "note": "nota di prova", // Notes associated with the booklet row
  "debitoFlg": 0, // Debt activity (required)
  "ofaFlg": 0, // OFA activity (optional)
  "annoCorsoAnticipo": 2, // Anticipated course year of the activity; if valued, indicates the course year to which the activity was anticipated
  "genAutoFlg": 0, // Activity automatically inserted by a procedure other than career plan implementation or booklet management (e.g., appeal reservations, exam registrations, etc.) (required)
  "genRicSpecFlg": 0, // Automatically inserted activity related to credit recognition for specialized careers (3+2), containing all segments of the three-year segment of the specialized degree (required)
  "tipoOrigEvecar": 1, // Indicates the origin type of the booklet AD: 0 = AD not linked to any resolution; 1 = AD inserted automatically during implementation with pending resolution (in this case, AD is not linked to the plan); 2 = AD linked to resolution and inserted automatically upon activation; 3 = AD linked to resolution (state transition 1->3 after resolution approval); 4 = AD related to a canceled resolution, in this case, the AD is not linked to the plan (optional)
  "urlSitoWeb": "null", // URL of the teaching web page (optional)
  "infoDottorati": {
    "soggettoErogante": "Università La Sapienza", // Entity providing the activity
    "destinazione": "Università La Sapienza", // Location where the activity is provided
    "dataPartenza": "10/10/2020", // Start date
    "dataArrivo": "10/10/2020", // End date
    "noteStu": "10/10/2020", // Student's notes on the activity
    "adFuoriOffFlg": 1, // Flag indicating whether the activity is part of Ph.D. ADs
    "missioneFlg": 0, // Indicates that the activity requires a mission
    "ricercaFlg": 0, // Indicates that the activity is related to research
    "periodoEsteroFlg": 0, // Indicates that the activity is a period abroad
    "aziendaFlg": 0 // Indicates that the activity takes place in a company
  }, // InfoDottorati (optional)
  "rilFreq": [
    {
      "matId": 1, // ID of the career segment on which to calculate statistics
      "adsceRilId": 1, // Identifier of the detections group
      "aaRilevazioneId": 1, // Detection year
      "adsceId": 1, // Identificativo univoco che consente di individuare una riga di libretto dello studente
      "stuTipoCorsoCod": "L2", // Code of the student's study course type
      "statoAdsceRil": "A", // State of the detection (A, B, X)
      "aaFreqId": 2020, // Attendance year set by the detection
      "dataFreq": "10/10/2020", // Attendance acquisition date
      "staSceCod": "F", // Educational activity state set by the detection
      "totOrePerFreq": 1, // Total hours of detections
      "totRilPerFreq": 1, // Total number of detections
      "percPresPerFreq": 1, // Percentage of presence
      "percOrePresPerFreq": 1, // Percentage of hours of presence
      "numRil": 1, // Total number of calculated detections
      "oreRil": 1, // Total hours of calculated detections
      "numAss": 1, // Total number of calculated absences
      "numPres": 1, // Total number of calculated presences
      "oreAss": 1, // Total hours of calculated absences
      "orePres": 1, // Total hours of calculated presences
      "oreTotFreqAd": 1, // Expected attendance hours for the educational activity
      "numTotFreqAd": 1, // Number of expected lessons for the educational activity (based on par_conf RIL_FREQ_DURATA_RIL which indicates the average duration of a lesson)
      "dataFreqRilFreqDett": "10/10/2020 10:00:00", // Maximum detection date calculated over a set of detections
      "dataFreqAdLog": "01/01/1900 10:00:00" // End date of the educational period
    }
  ], // RilFreq (optional)
  "statoMissione": "I", // Mission state (optional)
  "statoMissioneDes": "In Missione", // Mission state description (optional)
  "numAppelliPrenotabili": 1, // Contains the number of bookable appeals at the system date for the booklet row
  "superataFlg": 0, // Passed activity, also includes the case of recorded exams not loaded into the career due to errors during the carica_prove procedure
  "numPrenotazioni": 10, // Contains the number of pending reservations linked to the booklet row.
  "abilFlg": 1, // Indicates whether the educational activity is associated with obtaining a specific qualification required by the study course.
  "genConvAdsceId": 12345, // Source adsce_id of the validation for ADs that are for completion.
  "infoInterateneo": {
    "aaOffAdId": 2024, // Offering year provided in the inter-university
    "aaOrdAdId": 2024, // Regulation year provided in the inter-university
    "adCod": "AD", // Activity code provided in the inter-university
    "adDes": "Attivita", // Activity description provided in the inter-university
    "adsceId": 12345, // Booklet row of the operational headquarters where the educational activity linked to the booklet row was loaded
    "ateneoId": 6, // ID of the university where the educational activity is provided
    "cdsAdCod": "3165", // Course code provided in the inter-university
    "cdsAdDes": "CHIMICA", // Course description provided in the inter-university
    "pdsAdCod": "PDS9999", // Path code provided in the inter-university
    "pdsAdDes": "COMUNE" // Path description provided in the inter-university
  }, // InfoInterateneo (optional)
  "extraInfo": {
    "matId": 1, // ID of the career segment on which to calculate statistics
    "adsceId": 1, // Unique ID identifying a student's booklet row
    "dataInizioLezioni": "10/10/2020", // Expected start date of lessons
    "dataFineLezioni": "10/10/2020", // Expected end date of lessons
    "titMatricola": "222", // Matriculation of the titular of the student's partition
    "titNome": "Mario", // Name of the titular of the student's partition
    "titCognome": "Rossi", // Surname of the titular of the student's partition
    "titCodFis": "222", // Matriculation of the titular of the student's partition
    "fatPartCod": "AK_LZ", // Partitioning factor of the educational activity
    "domPartCod": "AK", // Class assigned to the student
    "tipiSceCod": "O", // Plan rule linked to the booklet row, valid only if the plan is active
    "tipiSceDes": "Obbligatoria", // Description of the plan rule type linked to the booklet row, valid only if the plan is active
    "sceDes": "O", // Description of the plan rule linked to the booklet row, valid only if the plan is active
    "freqObbligFlg": 0, // Activity with mandatory attendance
    "adPartId": 1, // ID of the booklet partition row
    "titDocenteId": 1234 // Unique identifier of the teacher
  } // ExtraInfo (optional)
}
```

<br>

---

<br>

### `PATCH /libretti/{matId}/righe/{adsceId}` - Modifies a booklet row

```java
/**
 * Modifies a booklet row
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param body                 PatchRigaLibretto (body, required)  - Object containing the row to be inserted
 * @return RigaLibretto on success,
 *         DettaglioErrore on failure
 */
PATCH /libretti/{matId}/righe/{adsceId}
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Request body

```json
{
  "statoMissione": "I" // Mission state
}
```

#### Response

**`200 OK`**

```json
{
  "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
  "ord": 1, // Activity sorting progressive, calculated taking into account groupings and regulations expected by the system (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "stuId": 1, // Unique ID identifying the student's career (required)
  "pianoId": 1, // Progressive ID of the study plan linked through implementation to the booklet.
  "itmId": 1, // Progressive ID of the plan activity linked to the booklet row
  "ragId": 1, // If the activity belongs to a grouping, contains the adsceID of the grouping parent
  "raggEsaTipo": "ESA", // Contains the grouping type typology, valued only on the grouping parent (i.e., when ragId=adsceId)
  "adCod": "ADCOD", // Code of the educational activity present in the booklet. The code is copied into each single booklet and normally matches the code expected in the educational offering to which the activity refers
  "adDes": "Descrizione AD", // Description of the educational activity present in the booklet; like the code, the description is copied from the educational offering but can be modified (required)
  "annoCorso": 1, // Course year in which the educational activity is expected (required)
  "stato": "S", // State of the educational activity (code) (required)
  "statoDes": "Superata", // Descrizione dello stato dell\'attività didattica (required)
  "chiaveADContestualizzata": {
    "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
    "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
    "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
    "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
    "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
    "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
    "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
    "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
    "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
    "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
    "adId": 1, // Chiave dell'attività didattica (required)
    "adCod": "PDS_AD_1", // Codice dell''attività didattica
    "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
    "afId": 1 // Id della afId proveniente da U-Gov Didattica
  }, // ChiaveADContestualizzata
  "tipoEsaCod": "O", // Code of the exam type expected for the educational activity
  "tipoEsaDes": "Orale", // Description of the exam type expected for the educational activity
  "tipoInsCod": "OBB", // Code of the teaching type expected for the educational activity
  "tipoInsDes": "Obbligatorio", // Description of the teaching type expected for the educational activity
  "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation) (required)
  "tipoRicCod": "P", // Code of the recognition type expected for the educational activity
  "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals (required)
  "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
  "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
  "freqUffFlg": 1, // Automatically assigned attendance (required)
  "freqObbligFlg": 0, // Mandatory attendance (required)
  "dataScadIscr": "15/10/2015", // Enrollment expiration date, the activity cannot be taken after this date; the required format is DD/MM/YYYY
  "gruppoVotoId": 1, // ID of the used grade typology, indicating which grade range is defined for the educational activity, the minimum passing grade, the maximum grade, and the possible presence of honors
  "gruppoVotoMinVoto": 18, // Indicates the minimum passing grade for the selected grading scale
  "gruppoVotoMaxVoto": 30, // Indicates the maximum passing grade for the selected grading scale
  "gruppoVotoLodeFlg": 1, // Indicates whether the selected grading scale includes honors
  "gruppoGiudCod": "9998", // Code of the judgment group to which the judgment present in the outcome belongs
  "gruppoGiudDes": "Idoneità", // Description of the judgment group to which the selected judgment belongs
  "esito": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // Esito
  "sovranFlg": 0, // Supernumerary activity (required)
  "note": "nota di prova", // Notes associated with the booklet row
  "debitoFlg": 0, // Debt activity (required)
  "ofaFlg": 0, // OFA activity (optional)
  "annoCorsoAnticipo": 2, // Anticipated course year of the activity; if valued, indicates the course year to which the activity was anticipated
  "genAutoFlg": 0, // Activity automatically inserted by a procedure other than career plan implementation or booklet management (e.g., appeal reservations, exam registrations, etc.) (required)
  "genRicSpecFlg": 0, // Automatically inserted activity related to credit recognition for specialized careers (3+2), containing all segments of the three-year segment of the specialized degree (required)
  "tipoOrigEvecar": 1, // Indicates the origin type of the booklet AD: 0 = AD not linked to any resolution; 1 = AD inserted automatically during implementation with pending resolution (in this case, AD is not linked to the plan); 2 = AD linked to resolution and inserted automatically upon activation; 3 = AD linked to resolution (state transition 1->3 after resolution approval); 4 = AD related to a canceled resolution, in this case, the AD is not linked to the plan (optional)
  "urlSitoWeb": "null", // URL of the teaching web page (optional)
  "infoDottorati": {
    "soggettoErogante": "Università La Sapienza", // Entity providing the activity
    "destinazione": "Università La Sapienza", // Location where the activity is provided
    "dataPartenza": "10/10/2020", // Start date
    "dataArrivo": "10/10/2020", // End date
    "noteStu": "10/10/2020", // Student's notes on the activity
    "adFuoriOffFlg": 1, // Flag indicating whether the activity is part of Ph.D. ADs
    "missioneFlg": 0, // Indicates that the activity requires a mission
    "ricercaFlg": 0, // Indicates that the activity is related to research
    "periodoEsteroFlg": 0, // Indicates that the activity is a period abroad
    "aziendaFlg": 0 // Indicates that the activity takes place in a company
  }, // InfoDottorati (optional)
  "rilFreq": [
    {
      "matId": 1, // ID of the career segment on which to calculate statistics
      "adsceRilId": 1, // Identifier of the detections group
      "aaRilevazioneId": 1, // Detection year
      "adsceId": 1, // Identificativo univoco che consente di individuare una riga di libretto dello studente
      "stuTipoCorsoCod": "L2", // Code of the student's study course type
      "statoAdsceRil": "A", // State of the detection (A, B, X)
      "aaFreqId": 2020, // Attendance year set by the detection
      "dataFreq": "10/10/2020", // Attendance acquisition date
      "staSceCod": "F", // Educational activity state set by the detection
      "totOrePerFreq": 1, // Total hours of detections
      "totRilPerFreq": 1, // Total number of detections
      "percPresPerFreq": 1, // Percentage of presence
      "percOrePresPerFreq": 1, // Percentage of hours of presence
      "numRil": 1, // Total number of calculated detections
      "oreRil": 1, // Total hours of calculated detections
      "numAss": 1, // Total number of calculated absences
      "numPres": 1, // Total number of calculated presences
      "oreAss": 1, // Total hours of calculated absences
      "orePres": 1, // Total hours of calculated presences
      "oreTotFreqAd": 1, // Expected attendance hours for the educational activity
      "numTotFreqAd": 1, // Number of expected lessons for the educational activity (based on par_conf RIL_FREQ_DURATA_RIL which indicates the average duration of a lesson)
      "dataFreqRilFreqDett": "10/10/2020 10:00:00", // Maximum detection date calculated over a set of detections
      "dataFreqAdLog": "01/01/1900 10:00:00" // End date of the educational period
    }
  ], // RilFreq (optional)
  "statoMissione": "I", // Mission state (optional)
  "statoMissioneDes": "In Missione", // Mission state description (optional)
  "numAppelliPrenotabili": 1, // Contains the number of bookable appeals at the system date for the booklet row
  "superataFlg": 0, // Passed activity, also includes the case of recorded exams not loaded into the career due to errors during the carica_prove procedure
  "numPrenotazioni": 10, // Contains the number of pending reservations linked to the booklet row.
  "abilFlg": 1, // Indicates whether the educational activity is associated with obtaining a specific qualification required by the study course.
  "genConvAdsceId": 12345, // Source adsce_id of the validation for ADs that are for completion.
  "infoInterateneo": {
    "aaOffAdId": 2024, // Offering year provided in the inter-university
    "aaOrdAdId": 2024, // Regulation year provided in the inter-university
    "adCod": "AD", // Activity code provided in the inter-university
    "adDes": "Attivita", // Activity description provided in the inter-university
    "adsceId": 12345, // Booklet row of the operational headquarters where the educational activity linked to the booklet row was loaded
    "ateneoId": 6, // ID of the university where the educational activity is provided
    "cdsAdCod": "3165", // Course code provided in the inter-university
    "cdsAdDes": "CHIMICA", // Course description provided in the inter-university
    "pdsAdCod": "PDS9999", // Path code provided in the inter-university
    "pdsAdDes": "COMUNE" // Path description provided in the inter-university
  }, // InfoInterateneo (optional)
  "extraInfo": {
    "matId": 1, // ID of the career segment on which to calculate statistics
    "adsceId": 1, // Unique ID identifying a student's booklet row
    "dataInizioLezioni": "10/10/2020", // Expected start date of lessons
    "dataFineLezioni": "10/10/2020", // Expected end date of lessons
    "titMatricola": "222", // Matriculation of the titular of the student's partition
    "titNome": "Mario", // Name of the titular of the student's partition
    "titCognome": "Rossi", // Surname of the titular of the student's partition
    "titCodFis": "222", // Matriculation of the titular of the student's partition
    "fatPartCod": "AK_LZ", // Partitioning factor of the educational activity
    "domPartCod": "AK", // Class assigned to the student
    "tipiSceCod": "O", // Plan rule linked to the booklet row, valid only if the plan is active
    "tipiSceDes": "Obbligatoria", // Description of the plan rule type linked to the booklet row, valid only if the plan is active
    "sceDes": "O", // Description of the plan rule linked to the booklet row, valid only if the plan is active
    "freqObbligFlg": 0, // Activity with mandatory attendance
    "adPartId": 1, // ID of the booklet partition row
    "titDocenteId": 1234 // Unique identifier of the teacher
  } // ExtraInfo (optional)
}
```

**`422 Unprocessable Entity` - Modification failed**

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

### `DELETE /libretti/{matId}/righe/{adsceId}` - Deletes a booklet row

```java
/**
 * Allows deleting a booklet row
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @return 204 Operation successfully performed,
 *         DettaglioErrore on failure
 */
DELETE /libretti/{matId}/righe/{adsceId}
```

**Auth:** `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`204 No Content` - Operation successfully performed**

**`422 Unprocessable Entity` - Insertion failed**

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

### `PUT /libretti/{matId}/righe/{adsceId}/freq` - Sets or removes attendance from the booklet

```java
/**
 * Sets or removes attendance for a booklet row: values for setting attendance are as follows: staSceCod: educational activity state (F sets attendance, P removes it); aaRilevazioneId: attendance detection year, if not passed DR_CARR is taken at the current date; aaFreqId: attendance acquisition year; dataFreq: attendance acquisition date; codFisDocenteControllo: fiscal code of the teacher with whom to check consistency against booklet rows, only activities for which the indicated teacher holds ownership over the Educational Activity CODE are loaded. It is automatically valued if the user executing the operation is a teacher. It is optionally possible to pass data for attendance detection; attendance detection data are as follows: codFisDocenteRilevazione: fiscal code of the teacher who performed the detection; mandatory if the executing user is not a teacher, if populated indicates the detecting teacher; totaleRilevazioni: total number of detections; totaleOreRilevazioni: total hours performed; rilevazioni: set containing the student's individual detections list. ##### Return Codes of the Function Return Code | Description - | - -1 | Requested booklet row does not exist -2 | Activity is already passed -3 | Activity attendance was obtained through validation or recognition -4 | Activity already has a recorded exam with a positive outcome -5 | Activity is a child of an attendance grouping -6 | Student does not have a valid enrollment in the passed year -7 | Cannot remove attendance if a recorded exam exists -8 | Cannot remove attendance on a planned exam -9 | Cannot modify attendance on an inactive career segment -10 | Cannot modify attendance on an inactive career -51 | Missing mandatory detection values. staSceCod, tottaleOre, totaleRilevazioni, percentualeOre, percentualeRilevazione must be valued -52 | Missing mandatory detection values. statoRilevazione, durata, dataOraInizio must be valued -53 | The value of statoRilevazione must be A or R -54 | Passed matriculation does not identify a unique career segment -55 | Passed booklet row does not match input values (adCod, cdsCod, aaOrdId, pdsId, aaOffId) -56 | Input values (adCod, cdsCod, aaOrdId, pdsId, aaOffId) do not allow selecting a single booklet row -57 | matId field is mandatory -58 | adsceId field is mandatory -59 | codFisDocenteControllo does not identify a teacher -60 | codFisDocenteControllo is not valued -61 | Teacher with codiceFiscaleControllo has no coverage on the booklet row's AD -100 | Error removing attendance (detail in error message)
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param body                 ParametriFreqSingola (body, required) - Object containing the students to assign attendance to
 * @return RigaLibretto on success,
 *         DettaglioErrore on failure
 */
PUT /libretti/{matId}/righe/{adsceId}/freq
```

**Auth:** `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Request body

```json
{}
```

#### Response

**`200 OK`**

```json
{
  "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
  "ord": 1, // Activity sorting progressive, calculated taking into account groupings and regulations expected by the system (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "stuId": 1, // Unique ID identifying the student's career (required)
  "pianoId": 1, // Progressive ID of the study plan linked through implementation to the booklet.
  "itmId": 1, // Progressive ID of the plan activity linked to the booklet row
  "ragId": 1, // If the activity belongs to a grouping, contains the adsceID of the grouping parent
  "raggEsaTipo": "ESA", // Contains the grouping type typology, valued only on the grouping parent (i.e., when ragId=adsceId)
  "adCod": "ADCOD", // Code of the educational activity present in the booklet. The code is copied into each single booklet and normally matches the code expected in the educational offering to which the activity refers
  "adDes": "Descrizione AD", // Description of the educational activity present in the booklet; like the code, the description is copied from the educational offering but can be modified (required)
  "annoCorso": 1, // Course year in which the educational activity is expected (required)
  "stato": "S", // State of the educational activity (code) (required)
  "statoDes": "Superata", // Descrizione dello stato dell\'attività didattica (required)
  "chiaveADContestualizzata": {
    "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
    "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
    "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
    "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
    "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
    "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
    "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
    "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
    "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
    "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
    "adId": 1, // Chiave dell'attività didattica (required)
    "adCod": "PDS_AD_1", // Codice dell''attività didattica
    "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
    "afId": 1 // Id della afId proveniente da U-Gov Didattica
  }, // ChiaveADContestualizzata
  "tipoEsaCod": "O", // Code of the exam type expected for the educational activity
  "tipoEsaDes": "Orale", // Description of the exam type expected for the educational activity
  "tipoInsCod": "OBB", // Code of the teaching type expected for the educational activity
  "tipoInsDes": "Obbligatorio", // Description of the teaching type expected for the educational activity
  "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation) (required)
  "tipoRicCod": "P", // Code of the recognition type expected for the educational activity
  "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals (required)
  "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
  "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
  "freqUffFlg": 1, // Automatically assigned attendance (required)
  "freqObbligFlg": 0, // Mandatory attendance (required)
  "dataScadIscr": "15/10/2015", // Enrollment expiration date, the activity cannot be taken after this date; the required format is DD/MM/YYYY
  "gruppoVotoId": 1, // ID of the used grade typology, indicating which grade range is defined for the educational activity, the minimum passing grade, the maximum grade, and the possible presence of honors
  "gruppoVotoMinVoto": 18, // Indicates the minimum passing grade for the selected grading scale
  "gruppoVotoMaxVoto": 30, // Indicates the maximum passing grade for the selected grading scale
  "gruppoVotoLodeFlg": 1, // Indicates whether the selected grading scale includes honors
  "gruppoGiudCod": "9998", // Code of the judgment group to which the judgment present in the outcome belongs
  "gruppoGiudDes": "Idoneità", // Description of the judgment group to which the selected judgment belongs
  "esito": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // Esito
  "sovranFlg": 0, // Supernumerary activity (required)
  "note": "nota di prova", // Notes associated with the booklet row
  "debitoFlg": 0, // Debt activity (required)
  "ofaFlg": 0, // OFA activity (optional)
  "annoCorsoAnticipo": 2, // Anticipated course year of the activity; if valued, indicates the course year to which the activity was anticipated
  "genAutoFlg": 0, // Activity automatically inserted by a procedure other than career plan implementation or booklet management (e.g., appeal reservations, exam registrations, etc.) (required)
  "genRicSpecFlg": 0, // Automatically inserted activity related to credit recognition for specialized careers (3+2), containing all segments of the three-year segment of the specialized degree (required)
  "tipoOrigEvecar": 1, // Indicates the origin type of the booklet AD: 0 = AD not linked to any resolution; 1 = AD inserted automatically during implementation with pending resolution (in this case, AD is not linked to the plan); 2 = AD linked to resolution and inserted automatically upon activation; 3 = AD linked to resolution (state transition 1->3 after resolution approval); 4 = AD related to a canceled resolution, in this case, the AD is not linked to the plan (optional)
  "urlSitoWeb": "null", // URL of the teaching web page (optional)
  "infoDottorati": {
    "soggettoErogante": "Università La Sapienza", // Entity providing the activity
    "destinazione": "Università La Sapienza", // Location where the activity is provided
    "dataPartenza": "10/10/2020", // Start date
    "dataArrivo": "10/10/2020", // End date
    "noteStu": "10/10/2020", // Student's notes on the activity
    "adFuoriOffFlg": 1, // Flag indicating whether the activity is part of Ph.D. ADs
    "missioneFlg": 0, // Indicates that the activity requires a mission
    "ricercaFlg": 0, // Indicates that the activity is related to research
    "periodoEsteroFlg": 0, // Indicates that the activity is a period abroad
    "aziendaFlg": 0 // Indicates that the activity takes place in a company
  }, // InfoDottorati (optional)
  "rilFreq": [
    {
      "matId": 1, // ID of the career segment on which to calculate statistics
      "adsceRilId": 1, // Identifier of the detections group
      "aaRilevazioneId": 1, // Detection year
      "adsceId": 1, // Identificativo univoco che consente di individuare una riga di libretto dello studente
      "stuTipoCorsoCod": "L2", // Code of the student's study course type
      "statoAdsceRil": "A", // State of the detection (A, B, X)
      "aaFreqId": 2020, // Attendance year set by the detection
      "dataFreq": "10/10/2020", // Attendance acquisition date
      "staSceCod": "F", // Educational activity state set by the detection
      "totOrePerFreq": 1, // Total hours of detections
      "totRilPerFreq": 1, // Total number of detections
      "percPresPerFreq": 1, // Percentage of presence
      "percOrePresPerFreq": 1, // Percentage of hours of presence
      "numRil": 1, // Total number of calculated detections
      "oreRil": 1, // Total hours of calculated detections
      "numAss": 1, // Total number of calculated absences
      "numPres": 1, // Total number of calculated presences
      "oreAss": 1, // Total hours of calculated absences
      "orePres": 1, // Total hours of calculated presences
      "oreTotFreqAd": 1, // Expected attendance hours for the educational activity
      "numTotFreqAd": 1, // Number of expected lessons for the educational activity (based on par_conf RIL_FREQ_DURATA_RIL which indicates the average duration of a lesson)
      "dataFreqRilFreqDett": "10/10/2020 10:00:00", // Maximum detection date calculated over a set of detections
      "dataFreqAdLog": "01/01/1900 10:00:00" // End date of the educational period
    }
  ], // RilFreq (optional)
  "statoMissione": "I", // Mission state (optional)
  "statoMissioneDes": "In Missione", // Mission state description (optional)
  "numAppelliPrenotabili": 1, // Contains the number of bookable appeals at the system date for the booklet row
  "superataFlg": 0, // Passed activity, also includes the case of recorded exams not loaded into the career due to errors during the carica_prove procedure
  "numPrenotazioni": 10, // Contains the number of pending reservations linked to the booklet row.
  "abilFlg": 1, // Indicates whether the educational activity is associated with obtaining a specific qualification required by the study course.
  "genConvAdsceId": 12345, // Source adsce_id of the validation for ADs that are for completion.
  "infoInterateneo": {
    "aaOffAdId": 2024, // Offering year provided in the inter-university
    "aaOrdAdId": 2024, // Regulation year provided in the inter-university
    "adCod": "AD", // Activity code provided in the inter-university
    "adDes": "Attivita", // Activity description provided in the inter-university
    "adsceId": 12345, // Booklet row of the operational headquarters where the educational activity linked to the booklet row was loaded
    "ateneoId": 6, // ID of the university where the educational activity is provided
    "cdsAdCod": "3165", // Course code provided in the inter-university
    "cdsAdDes": "CHIMICA", // Course description provided in the inter-university
    "pdsAdCod": "PDS9999", // Path code provided in the inter-university
    "pdsAdDes": "COMUNE" // Path description provided in the inter-university
  }, // InfoInterateneo (optional)
  "extraInfo": {
    "matId": 1, // ID of the career segment on which to calculate statistics
    "adsceId": 1, // Unique ID identifying a student's booklet row
    "dataInizioLezioni": "10/10/2020", // Expected start date of lessons
    "dataFineLezioni": "10/10/2020", // Expected end date of lessons
    "titMatricola": "222", // Matriculation of the titular of the student's partition
    "titNome": "Mario", // Name of the titular of the student's partition
    "titCognome": "Rossi", // Surname of the titular of the student's partition
    "titCodFis": "222", // Matriculation of the titular of the student's partition
    "fatPartCod": "AK_LZ", // Partitioning factor of the educational activity
    "domPartCod": "AK", // Class assigned to the student
    "tipiSceCod": "O", // Plan rule linked to the booklet row, valid only if the plan is active
    "tipiSceDes": "Obbligatoria", // Description of the plan rule type linked to the booklet row, valid only if the plan is active
    "sceDes": "O", // Description of the plan rule linked to the booklet row, valid only if the plan is active
    "freqObbligFlg": 0, // Activity with mandatory attendance
    "adPartId": 1, // ID of the booklet partition row
    "titDocenteId": 1234 // Unique identifier of the teacher
  } // ExtraInfo (optional)
}
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

### `GET /libretti/{matId}/righe/{adsceId}/prop` - Performs the prerequisites check

```java
/**
 * Prerequisites check
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param dataRif              string (query, optional)            - Date on which to calculate the prerequisite; if not valued, today's date is used
 * @return ControlloPropedeuticita on success,
 *         DettaglioErrore on failure
 */
GET /libretti/{matId}/righe/{adsceId}/prop
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "esito": 1 // Value 1 indicates check passed, otherwise check not passed
}
```

**`422 Unprocessable Entity` - Insertion failed**

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

### `PUT /libretti/{matId}/righe/{adsceId}/riconoscimento` - Inserts a recognition or validation

```java
/**
 * It is possible to perform a recognition of an activity or attendance (ric_id = 1) or activity (ric_id=2)
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param type                 string (query, optional)            - Type of load, ric=booklet recognition, attoCar=career act for internships
 * @param body                 ParametriRiconoscimento (body, required) - Object containing the data to modify
 * @return RigaLibretto on success,
 *         DettaglioErrore on failure
 */
PUT /libretti/{matId}/righe/{adsceId}/riconoscimento
```

**Auth:** `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Request body

```json
{}
```

#### Response

**`200 OK`**

```json
{
  "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
  "ord": 1, // Activity sorting progressive, calculated taking into account groupings and regulations expected by the system (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "stuId": 1, // Unique ID identifying the student's career (required)
  "pianoId": 1, // Progressive ID of the study plan linked through implementation to the booklet.
  "itmId": 1, // Progressive ID of the plan activity linked to the booklet row
  "ragId": 1, // If the activity belongs to a grouping, contains the adsceID of the grouping parent
  "raggEsaTipo": "ESA", // Contains the grouping type typology, valued only on the grouping parent (i.e., when ragId=adsceId)
  "adCod": "ADCOD", // Code of the educational activity present in the booklet. The code is copied into each single booklet and normally matches the code expected in the educational offering to which the activity refers
  "adDes": "Descrizione AD", // Description of the educational activity present in the booklet; like the code, the description is copied from the educational offering but can be modified (required)
  "annoCorso": 1, // Course year in which the educational activity is expected (required)
  "stato": "S", // State of the educational activity (code) (required)
  "statoDes": "Superata", // Descrizione dello stato dell\'attività didattica (required)
  "chiaveADContestualizzata": {
    "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
    "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
    "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
    "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
    "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
    "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
    "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
    "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
    "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
    "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
    "adId": 1, // Chiave dell'attività didattica (required)
    "adCod": "PDS_AD_1", // Codice dell''attività didattica
    "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
    "afId": 1 // Id della afId proveniente da U-Gov Didattica
  }, // ChiaveADContestualizzata
  "tipoEsaCod": "O", // Code of the exam type expected for the educational activity
  "tipoEsaDes": "Orale", // Description of the exam type expected for the educational activity
  "tipoInsCod": "OBB", // Code of the teaching type expected for the educational activity
  "tipoInsDes": "Obbligatorio", // Description of the teaching type expected for the educational activity
  "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation) (required)
  "tipoRicCod": "P", // Code of the recognition type expected for the educational activity
  "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals (required)
  "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
  "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
  "freqUffFlg": 1, // Automatically assigned attendance (required)
  "freqObbligFlg": 0, // Mandatory attendance (required)
  "dataScadIscr": "15/10/2015", // Enrollment expiration date, the activity cannot be taken after this date; the required format is DD/MM/YYYY
  "gruppoVotoId": 1, // ID of the used grade typology, indicating which grade range is defined for the educational activity, the minimum passing grade, the maximum grade, and the possible presence of honors
  "gruppoVotoMinVoto": 18, // Indicates the minimum passing grade for the selected grading scale
  "gruppoVotoMaxVoto": 30, // Indicates the maximum passing grade for the selected grading scale
  "gruppoVotoLodeFlg": 1, // Indicates whether the selected grading scale includes honors
  "gruppoGiudCod": "9998", // Code of the judgment group to which the judgment present in the outcome belongs
  "gruppoGiudDes": "Idoneità", // Description of the judgment group to which the selected judgment belongs
  "esito": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // Esito
  "sovranFlg": 0, // Supernumerary activity (required)
  "note": "nota di prova", // Notes associated with the booklet row
  "debitoFlg": 0, // Debt activity (required)
  "ofaFlg": 0, // OFA activity (optional)
  "annoCorsoAnticipo": 2, // Anticipated course year of the activity; if valued, indicates the course year to which the activity was anticipated
  "genAutoFlg": 0, // Activity automatically inserted by a procedure other than career plan implementation or booklet management (e.g., appeal reservations, exam registrations, etc.) (required)
  "genRicSpecFlg": 0, // Automatically inserted activity related to credit recognition for specialized careers (3+2), containing all segments of the three-year segment of the specialized degree (required)
  "tipoOrigEvecar": 1, // Indicates the origin type of the booklet AD: 0 = AD not linked to any resolution; 1 = AD inserted automatically during implementation with pending resolution (in this case, AD is not linked to the plan); 2 = AD linked to resolution and inserted automatically upon activation; 3 = AD linked to resolution (state transition 1->3 after resolution approval); 4 = AD related to a canceled resolution, in this case, the AD is not linked to the plan (optional)
  "urlSitoWeb": "null", // URL of the teaching web page (optional)
  "infoDottorati": {
    "soggettoErogante": "Università La Sapienza", // Entity providing the activity
    "destinazione": "Università La Sapienza", // Location where the activity is provided
    "dataPartenza": "10/10/2020", // Start date
    "dataArrivo": "10/10/2020", // End date
    "noteStu": "10/10/2020", // Student's notes on the activity
    "adFuoriOffFlg": 1, // Flag indicating whether the activity is part of Ph.D. ADs
    "missioneFlg": 0, // Indicates that the activity requires a mission
    "ricercaFlg": 0, // Indicates that the activity is related to research
    "periodoEsteroFlg": 0, // Indicates that the activity is a period abroad
    "aziendaFlg": 0 // Indicates that the activity takes place in a company
  }, // InfoDottorati (optional)
  "rilFreq": [
    {
      "matId": 1, // ID of the career segment on which to calculate statistics
      "adsceRilId": 1, // Identifier of the detections group
      "aaRilevazioneId": 1, // Detection year
      "adsceId": 1, // Identificativo univoco che consente di individuare una riga di libretto dello studente
      "stuTipoCorsoCod": "L2", // Code of the student's study course type
      "statoAdsceRil": "A", // State of the detection (A, B, X)
      "aaFreqId": 2020, // Attendance year set by the detection
      "dataFreq": "10/10/2020", // Attendance acquisition date
      "staSceCod": "F", // Educational activity state set by the detection
      "totOrePerFreq": 1, // Total hours of detections
      "totRilPerFreq": 1, // Total number of detections
      "percPresPerFreq": 1, // Percentage of presence
      "percOrePresPerFreq": 1, // Percentage of hours of presence
      "numRil": 1, // Total number of calculated detections
      "oreRil": 1, // Total hours of calculated detections
      "numAss": 1, // Total number of calculated absences
      "numPres": 1, // Total number of calculated presences
      "oreAss": 1, // Total hours of calculated absences
      "orePres": 1, // Total hours of calculated presences
      "oreTotFreqAd": 1, // Expected attendance hours for the educational activity
      "numTotFreqAd": 1, // Number of expected lessons for the educational activity (based on par_conf RIL_FREQ_DURATA_RIL which indicates the average duration of a lesson)
      "dataFreqRilFreqDett": "10/10/2020 10:00:00", // Maximum detection date calculated over a set of detections
      "dataFreqAdLog": "01/01/1900 10:00:00" // End date of the educational period
    }
  ], // RilFreq (optional)
  "statoMissione": "I", // Mission state (optional)
  "statoMissioneDes": "In Missione", // Mission state description (optional)
  "numAppelliPrenotabili": 1, // Contains the number of bookable appeals at the system date for the booklet row
  "superataFlg": 0, // Passed activity, also includes the case of recorded exams not loaded into the career due to errors during the carica_prove procedure
  "numPrenotazioni": 10, // Contains the number of pending reservations linked to the booklet row.
  "abilFlg": 1, // Indicates whether the educational activity is associated with obtaining a specific qualification required by the study course.
  "genConvAdsceId": 12345, // Source adsce_id of the validation for ADs that are for completion.
  "infoInterateneo": {
    "aaOffAdId": 2024, // Offering year provided in the inter-university
    "aaOrdAdId": 2024, // Regulation year provided in the inter-university
    "adCod": "AD", // Activity code provided in the inter-university
    "adDes": "Attivita", // Activity description provided in the inter-university
    "adsceId": 12345, // Booklet row of the operational headquarters where the educational activity linked to the booklet row was loaded
    "ateneoId": 6, // ID of the university where the educational activity is provided
    "cdsAdCod": "3165", // Course code provided in the inter-university
    "cdsAdDes": "CHIMICA", // Course description provided in the inter-university
    "pdsAdCod": "PDS9999", // Path code provided in the inter-university
    "pdsAdDes": "COMUNE" // Path description provided in the inter-university
  }, // InfoInterateneo (optional)
  "extraInfo": {
    "matId": 1, // ID of the career segment on which to calculate statistics
    "adsceId": 1, // Unique ID identifying a student's booklet row
    "dataInizioLezioni": "10/10/2020", // Expected start date of lessons
    "dataFineLezioni": "10/10/2020", // Expected end date of lessons
    "titMatricola": "222", // Matriculation of the titular of the student's partition
    "titNome": "Mario", // Name of the titular of the student's partition
    "titCognome": "Rossi", // Surname of the titular of the student's partition
    "titCodFis": "222", // Matriculation of the titular of the student's partition
    "fatPartCod": "AK_LZ", // Partitioning factor of the educational activity
    "domPartCod": "AK", // Class assigned to the student
    "tipiSceCod": "O", // Plan rule linked to the booklet row, valid only if the plan is active
    "tipiSceDes": "Obbligatoria", // Description of the plan rule type linked to the booklet row, valid only if the plan is active
    "sceDes": "O", // Description of the plan rule linked to the booklet row, valid only if the plan is active
    "freqObbligFlg": 0, // Activity with mandatory attendance
    "adPartId": 1, // ID of the booklet partition row
    "titDocenteId": 1234 // Unique identifier of the teacher
  } // ExtraInfo (optional)
}
```

**`422 Unprocessable Entity` - Insertion failed**

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

### `DELETE /libretti/{matId}/righe/{adsceId}/riconoscimento` - Cancels a recognition

```java
/**
 * Cancels a recognition
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @return RigaLibretto on success,
 *         DettaglioErrore on failure
 */
DELETE /libretti/{matId}/righe/{adsceId}/riconoscimento
```

**Auth:** `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
  "ord": 1, // Activity sorting progressive, calculated taking into account groupings and regulations expected by the system (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "stuId": 1, // Unique ID identifying the student's career (required)
  "pianoId": 1, // Progressive ID of the study plan linked through implementation to the booklet.
  "itmId": 1, // Progressive ID of the plan activity linked to the booklet row
  "ragId": 1, // If the activity belongs to a grouping, contains the adsceID of the grouping parent
  "raggEsaTipo": "ESA", // Contains the grouping type typology, valued only on the grouping parent (i.e., when ragId=adsceId)
  "adCod": "ADCOD", // Code of the educational activity present in the booklet. The code is copied into each single booklet and normally matches the code expected in the educational offering to which the activity refers
  "adDes": "Descrizione AD", // Description of the educational activity present in the booklet; like the code, the description is copied from the educational offering but can be modified (required)
  "annoCorso": 1, // Course year in which the educational activity is expected (required)
  "stato": "S", // State of the educational activity (code) (required)
  "statoDes": "Superata", // Descrizione dello stato dell\'attività didattica (required)
  "chiaveADContestualizzata": {
    "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
    "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
    "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
    "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
    "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
    "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
    "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
    "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
    "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
    "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
    "adId": 1, // Chiave dell'attività didattica (required)
    "adCod": "PDS_AD_1", // Codice dell''attività didattica
    "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
    "afId": 1 // Id della afId proveniente da U-Gov Didattica
  }, // ChiaveADContestualizzata
  "tipoEsaCod": "O", // Code of the exam type expected for the educational activity
  "tipoEsaDes": "Orale", // Description of the exam type expected for the educational activity
  "tipoInsCod": "OBB", // Code of the teaching type expected for the educational activity
  "tipoInsDes": "Obbligatorio", // Description of the teaching type expected for the educational activity
  "ricId": 0, // Presence of a recognition or validation. 0 = No Recognition 1 = RF (Attendance Recognition) 2 = RA (Activity Recognition) 3 = CF (Attendance Validation) 4 = CA (Activity Validation) (required)
  "tipoRicCod": "P", // Code of the recognition type expected for the educational activity
  "peso": 10.0, // Weight of the educational activity, calculated as the sum of segment weights; weight allows two optional decimals (required)
  "aaFreqId": 2016, // Attendance year, valued if the activity state is F or S
  "dataFreq": "15/10/2015", // Date of attendance acquisition; if valued, indicates the reference date from which attendance is acquired; the required format is DD/MM/YYYY
  "freqUffFlg": 1, // Automatically assigned attendance (required)
  "freqObbligFlg": 0, // Mandatory attendance (required)
  "dataScadIscr": "15/10/2015", // Enrollment expiration date, the activity cannot be taken after this date; the required format is DD/MM/YYYY
  "gruppoVotoId": 1, // ID of the used grade typology, indicating which grade range is defined for the educational activity, the minimum passing grade, the maximum grade, and the possible presence of honors
  "gruppoVotoMinVoto": 18, // Indicates the minimum passing grade for the selected grading scale
  "gruppoVotoMaxVoto": 30, // Indicates the maximum passing grade for the selected grading scale
  "gruppoVotoLodeFlg": 1, // Indicates whether the selected grading scale includes honors
  "gruppoGiudCod": "9998", // Code of the judgment group to which the judgment present in the outcome belongs
  "gruppoGiudDes": "Idoneità", // Description of the judgment group to which the selected judgment belongs
  "esito": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // Esito
  "sovranFlg": 0, // Supernumerary activity (required)
  "note": "nota di prova", // Notes associated with the booklet row
  "debitoFlg": 0, // Debt activity (required)
  "ofaFlg": 0, // OFA activity (optional)
  "annoCorsoAnticipo": 2, // Anticipated course year of the activity; if valued, indicates the course year to which the activity was anticipated
  "genAutoFlg": 0, // Activity automatically inserted by a procedure other than career plan implementation or booklet management (e.g., appeal reservations, exam registrations, etc.) (required)
  "genRicSpecFlg": 0, // Automatically inserted activity related to credit recognition for specialized careers (3+2), containing all segments of the three-year segment of the specialized degree (required)
  "tipoOrigEvecar": 1, // Indicates the origin type of the booklet AD: 0 = AD not linked to any resolution; 1 = AD inserted automatically during implementation with pending resolution (in this case, AD is not linked to the plan); 2 = AD linked to resolution and inserted automatically upon activation; 3 = AD linked to resolution (state transition 1->3 after resolution approval); 4 = AD related to a canceled resolution, in this case, the AD is not linked to the plan (optional)
  "urlSitoWeb": "null", // URL of the teaching web page (optional)
  "infoDottorati": {
    "soggettoErogante": "Università La Sapienza", // Entity providing the activity
    "destinazione": "Università La Sapienza", // Location where the activity is provided
    "dataPartenza": "10/10/2020", // Start date
    "dataArrivo": "10/10/2020", // End date
    "noteStu": "10/10/2020", // Student's notes on the activity
    "adFuoriOffFlg": 1, // Flag indicating whether the activity is part of Ph.D. ADs
    "missioneFlg": 0, // Indicates that the activity requires a mission
    "ricercaFlg": 0, // Indicates that the activity is related to research
    "periodoEsteroFlg": 0, // Indicates that the activity is a period abroad
    "aziendaFlg": 0 // Indicates that the activity takes place in a company
  }, // InfoDottorati (optional)
  "rilFreq": [
    {
      "matId": 1, // ID of the career segment on which to calculate statistics
      "adsceRilId": 1, // Identifier of the detections group
      "aaRilevazioneId": 1, // Detection year
      "adsceId": 1, // Identificativo univoco che consente di individuare una riga di libretto dello studente
      "stuTipoCorsoCod": "L2", // Code of the student's study course type
      "statoAdsceRil": "A", // State of the detection (A, B, X)
      "aaFreqId": 2020, // Attendance year set by the detection
      "dataFreq": "10/10/2020", // Attendance acquisition date
      "staSceCod": "F", // Educational activity state set by the detection
      "totOrePerFreq": 1, // Total hours of detections
      "totRilPerFreq": 1, // Total number of detections
      "percPresPerFreq": 1, // Percentage of presence
      "percOrePresPerFreq": 1, // Percentage of hours of presence
      "numRil": 1, // Total number of calculated detections
      "oreRil": 1, // Total hours of calculated detections
      "numAss": 1, // Total number of calculated absences
      "numPres": 1, // Total number of calculated presences
      "oreAss": 1, // Total hours of calculated absences
      "orePres": 1, // Total hours of calculated presences
      "oreTotFreqAd": 1, // Expected attendance hours for the educational activity
      "numTotFreqAd": 1, // Number of expected lessons for the educational activity (based on par_conf RIL_FREQ_DURATA_RIL which indicates the average duration of a lesson)
      "dataFreqRilFreqDett": "10/10/2020 10:00:00", // Maximum detection date calculated over a set of detections
      "dataFreqAdLog": "01/01/1900 10:00:00" // End date of the educational period
    }
  ], // RilFreq (optional)
  "statoMissione": "I", // Mission state (optional)
  "statoMissioneDes": "In Missione", // Mission state description (optional)
  "numAppelliPrenotabili": 1, // Contains the number of bookable appeals at the system date for the booklet row
  "superataFlg": 0, // Passed activity, also includes the case of recorded exams not loaded into the career due to errors during the carica_prove procedure
  "numPrenotazioni": 10, // Contains the number of pending reservations linked to the booklet row.
  "abilFlg": 1, // Indicates whether the educational activity is associated with obtaining a specific qualification required by the study course.
  "genConvAdsceId": 12345, // Source adsce_id of the validation for ADs that are for completion.
  "infoInterateneo": {
    "aaOffAdId": 2024, // Offering year provided in the inter-university
    "aaOrdAdId": 2024, // Regulation year provided in the inter-university
    "adCod": "AD", // Activity code provided in the inter-university
    "adDes": "Attivita", // Activity description provided in the inter-university
    "adsceId": 12345, // Booklet row of the operational headquarters where the educational activity linked to the booklet row was loaded
    "ateneoId": 6, // ID of the university where the educational activity is provided
    "cdsAdCod": "3165", // Course code provided in the inter-university
    "cdsAdDes": "CHIMICA", // Course description provided in the inter-university
    "pdsAdCod": "PDS9999", // Path code provided in the inter-university
    "pdsAdDes": "COMUNE" // Path description provided in the inter-university
  }, // InfoInterateneo (optional)
  "extraInfo": {
    "matId": 1, // ID of the career segment on which to calculate statistics
    "adsceId": 1, // Unique ID identifying a student's booklet row
    "dataInizioLezioni": "10/10/2020", // Expected start date of lessons
    "dataFineLezioni": "10/10/2020", // Expected end date of lessons
    "titMatricola": "222", // Matriculation of the titular of the student's partition
    "titNome": "Mario", // Name of the titular of the student's partition
    "titCognome": "Rossi", // Surname of the titular of the student's partition
    "titCodFis": "222", // Matriculation of the titular of the student's partition
    "fatPartCod": "AK_LZ", // Partitioning factor of the educational activity
    "domPartCod": "AK", // Class assigned to the student
    "tipiSceCod": "O", // Plan rule linked to the booklet row, valid only if the plan is active
    "tipiSceDes": "Obbligatoria", // Description of the plan rule type linked to the booklet row, valid only if the plan is active
    "sceDes": "O", // Description of the plan rule linked to the booklet row, valid only if the plan is active
    "freqObbligFlg": 0, // Activity with mandatory attendance
    "adPartId": 1, // ID of the booklet partition row
    "titDocenteId": 1234 // Unique identifier of the teacher
  } // ExtraInfo (optional)
}
```

**`422 Unprocessable Entity` - Insertion failed**

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

### `GET /libretti/{matId}/stats` - All averages of the booklet

```java
/**
 * Retrieves information on statistics connected to the booklet.
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param dataRifMedieIni      string (query, optional)            - Initial reference date for calculating averages
 * @param dataRifMedieFin      string (query, optional)            - Final reference date for calculating averages
 * @param motRegolePercorso    string (query, optional)            - Type of rules to use (default OFFF)
 * @param motOrigineDati       string (query, optional)            - Data origin type to use (default LIBRETTO_AD_SUPERATE)
 * @return StatsLibretto on success,
 *         DettaglioErrore on failure
 */
GET /libretti/{matId}/stats
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "matId": 1, // ID of the career segment on which to calculate statistics
  "umPesoCod": "C", // Unit of measurement code of the course the student is enrolled in; statistics refer to this unit
  "umPesoDes": "Crediti", // Unit of measurement description of the course the student is enrolled in
  "umPesoMin": 180.0, // Minimum weight to obtain to pass the degree
  "umPesoMax": 180.0, // Maximum weight to obtain to pass the degree
  "umPesoSuperato": 100.0, // Weight of passed ADs in the booklet, representing the sum of the weights of non-supernumerary passed activities
  "umPesoFrequentato": 100.0, // Weight of attended ADs in the booklet, representing the sum of the weights of non-supernumerary attended activities
  "umPesoPianificato": 100.0, // Weight of planned ADs in the booklet, representing the sum of the weights of non-supernumerary planned activities
  "umPesoPiano": 100.0, // Weight of passed ADs linked to the approved plan
  "umPesoCalcolato": 100.0, // Weight of passed ADs in the booklet according to path rules; weights of segments incompatible with path rules are discarded
  "umPesoConvalidato": 100.0, // Weight of validated ADs in the booklet according to path rules
  "numAdLibretto": 10, // Number of activities present in the booklet and valid towards obtaining the degree
  "numAdPiano": 10, // Number of activities required in the plan to obtain the degree
  "numAdSuperate": 10, // Number of passed activities in the booklet (non-supernumerary)
  "numAdFrequentate": 10, // Number of attended activities in the booklet (non-supernumerary)
  "numAdPianificate": 10, // Number of planned activities in the booklet (non-supernumerary)
  "gruppoVoto": {
    "cod": "30L", // Grade group code
    "des": "Trentesimi con lode", // Grade group description
    "minPunti": 18, // Minimum positive score of the grading scale
    "maxPunti": 30, // Maximum score of the grading scale
    "lodeFlg": 1 // Flag che indica se è prevista la lode
  }, // GruppoVoto
  "medie": [
    {
      "definizioneBase": "CDS", // Type of average definition, retrieving the base value from the regulation (CDSORD) or base 110 (CDS) (required)
      "tipoMediaCod": "A", // Description of the expected average type: Arithmetic or Weighted (required)
      "base": 1, // Base on which the average is calculated (required)
      "tipoOk": 1, // Value set to 1 if the average type is consistent with the one defined by the rules (required)
      "media": 1 // Calculated average (required)
    }
  ] // Medie (optional)
}
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

## Endpoints - Partizione

### `GET /libretti/{matId}/partizioni` - All partitions of the educational activities of a booklet

```java
/**
 * All partitions of the educational activities of a booklet
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param start                integer (query, optional)           - utilizzato insieme a `limit` per indicare la paginazione sui record
 * @param limit                integer (query, optional)           - utilizzato insieme a `start` per indicare la paginazione sui record, `limit` indica il numero di ...
 * @return List<PartizioneLibretto> on success
 */
GET /libretti/{matId}/partizioni
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "adpartId": 1, // ID of the booklet partition row (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
    "chiaveAdContestualizzata": {
      "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
      "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
      "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
      "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
      "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
      "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
      "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
      "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
      "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
      "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
      "adId": 1, // Chiave dell'attività didattica (required)
      "adCod": "PDS_AD_1", // Codice dell''attività didattica
      "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
      "afId": 1 // Id della afId proveniente da U-Gov Didattica
    }, // ChiaveAdContestualizzata
    "chiavePartizione": {
      "aaOffId": 1, // Anno di erogazione della partizione (required)
      "fatPartCod": "ALF", // Partition factor code (required)
      "fatPartDes": "Alfabetico", // Partition factor description
      "fatPartDesEng": "Alphabetic", // Partition factor description in English
      "domPartCod": "PARI", // Partition domain code (required)
      "domPartDes": "PARI", // Partition domain description
      "domPartDesEng": "ODD", // Partition domain description in English
      "partCod": "S1", // Academic year partition code (required)
      "partDes": "Primo semestre", // Academic year partition description
      "partDesEng": "First Semester", // Academic year partition description in English
      "adLogId": 1 // Logistics grouping ID (required)
    }, // ChiavePartizione
    "partEffCod": "partEffCod", // Code of the actually offered academic year partition.
    "partEffDes": "partEffDes", // Description of the actually offered academic year partition.
    "docenteId": 1, // ID of the teacher who owns the partition assigned to the student
    "cognomeDocTit": "Rossi", // Surname of the teacher owning the partition
    "nomeDoctit": "Mario", // Name of the teacher owning the partition
    "ruoloDocTit": "ORD", // Role code of the teacher owning the partition
    "appellativoDocTit": "Chi.mo", // Title of the teacher owning the partition
    "linguaDidId": 4, // ID of the teaching language
    "linguaDidCod": "eng", // ISO6392 code of the teaching language
    "linguaDidDes": "Inglese" // Description of the teaching language
  }
]
```

<br>

---

<br>

### `GET /libretti/{matId}/righe/{adsceId}/partizioni` - All partitions of the selected educational activity

```java
/**
 * All partitions of the selected educational activity
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<PartizioneLibretto> on success
 */
GET /libretti/{matId}/righe/{adsceId}/partizioni
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "adpartId": 1, // ID of the booklet partition row (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
    "chiaveAdContestualizzata": {
      "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
      "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
      "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
      "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
      "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
      "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
      "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
      "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
      "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
      "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
      "adId": 1, // Chiave dell'attività didattica (required)
      "adCod": "PDS_AD_1", // Codice dell''attività didattica
      "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
      "afId": 1 // Id della afId proveniente da U-Gov Didattica
    }, // ChiaveAdContestualizzata
    "chiavePartizione": {
      "aaOffId": 1, // Anno di erogazione della partizione (required)
      "fatPartCod": "ALF", // Partition factor code (required)
      "fatPartDes": "Alfabetico", // Partition factor description
      "fatPartDesEng": "Alphabetic", // Partition factor description in English
      "domPartCod": "PARI", // Partition domain code (required)
      "domPartDes": "PARI", // Partition domain description
      "domPartDesEng": "ODD", // Partition domain description in English
      "partCod": "S1", // Academic year partition code (required)
      "partDes": "Primo semestre", // Academic year partition description
      "partDesEng": "First Semester", // Academic year partition description in English
      "adLogId": 1 // Logistics grouping ID (required)
    }, // ChiavePartizione
    "partEffCod": "partEffCod", // Code of the actually offered academic year partition.
    "partEffDes": "partEffDes", // Description of the actually offered academic year partition.
    "docenteId": 1, // ID of the teacher who owns the partition assigned to the student
    "cognomeDocTit": "Rossi", // Surname of the teacher owning the partition
    "nomeDoctit": "Mario", // Name of the teacher owning the partition
    "ruoloDocTit": "ORD", // Role code of the teacher owning the partition
    "appellativoDocTit": "Chi.mo", // Title of the teacher owning the partition
    "linguaDidId": 4, // ID of the teaching language
    "linguaDidCod": "eng", // ISO6392 code of the teaching language
    "linguaDidDes": "Inglese" // Description of the teaching language
  }
]
```

<br>

---

<br>

### `GET /libretti/{matId}/righe/{adsceId}/partizioni/{adpartId}` - Requested partition of the selected educational activity

```java
/**
 * Requested partition of the selected educational activity
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param adpartId             integer (path, required)            - ID of the segment connected to the booklet row
 * @return PartizioneLibretto on success
 */
GET /libretti/{matId}/righe/{adsceId}/partizioni/{adpartId}
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "adpartId": 1, // ID of the booklet partition row (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
  "chiaveAdContestualizzata": {
    "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
    "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
    "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
    "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
    "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
    "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
    "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
    "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
    "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
    "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
    "adId": 1, // Chiave dell'attività didattica (required)
    "adCod": "PDS_AD_1", // Codice dell''attività didattica
    "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
    "afId": 1 // Id della afId proveniente da U-Gov Didattica
  }, // ChiaveAdContestualizzata
  "chiavePartizione": {
    "aaOffId": 1, // Anno di erogazione della partizione (required)
    "fatPartCod": "ALF", // Partition factor code (required)
    "fatPartDes": "Alfabetico", // Partition factor description
    "fatPartDesEng": "Alphabetic", // Partition factor description in English
    "domPartCod": "PARI", // Partition domain code (required)
    "domPartDes": "PARI", // Partition domain description
    "domPartDesEng": "ODD", // Partition domain description in English
    "partCod": "S1", // Academic year partition code (required)
    "partDes": "Primo semestre", // Academic year partition description
    "partDesEng": "First Semester", // Academic year partition description in English
    "adLogId": 1 // Logistics grouping ID (required)
  }, // ChiavePartizione
  "partEffCod": "partEffCod", // Code of the actually offered academic year partition.
  "partEffDes": "partEffDes", // Description of the actually offered academic year partition.
  "docenteId": 1, // ID of the teacher who owns the partition assigned to the student
  "cognomeDocTit": "Rossi", // Surname of the teacher owning the partition
  "nomeDoctit": "Mario", // Name of the teacher owning the partition
  "ruoloDocTit": "ORD", // Role code of the teacher owning the partition
  "appellativoDocTit": "Chi.mo", // Title of the teacher owning the partition
  "linguaDidId": 4, // ID of the teaching language
  "linguaDidCod": "eng", // ISO6392 code of the teaching language
  "linguaDidDes": "Inglese" // Description of the teaching language
}
```

<br>

---

<br>

## Endpoints - Prova

### `GET /libretti/{matId}/prove` - All exams of the educational activities of a booklet

```java
/**
 * All exams of the educational activities of a booklet
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param start                integer (query, optional)           - utilizzato insieme a `limit` per indicare la paginazione sui record
 * @param limit                integer (query, optional)           - utilizzato insieme a `start` per indicare la paginazione sui record, `limit` indica il numero di ...
 * @return List<ProvaLibretto> on success
 */
GET /libretti/{matId}/prove
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "adregId": 1, // Unique ID of the exam related to an educational activity of the booklet (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
    "staRegCod": "P", // Exam state code
    "staRegDes": "Prenotato", // Exam state description
    "applistaId": 1, // Unique ID of the reservation connected to the booklet exam
    "tipoAppCod": "PF", // Appeal type linked to the reservation
    "cdsEsaId": 1, // ID of the study course providing the exam (parent of the common exam); the course coincides with the course where the session linked to passing the exam is defined
    "adEsaId": 1, // ID of the educational activity providing the exam (parent of the common exam)
    "sesId": 1, // ID of the session that allows passing the exam (session key is composed of cdsAdId, sesId, esito.aaSupId)
    "sesDes": "Anticipo sessione esiva", // Description of the session that allows passing the exam
    "tipoIscrCod": "S", // Enrollment type required for the exam
    "dataApp": "15/10/2015", // Appeal date of the reservation linked to the exam; required format is DD/MM/YYYY
    "esitoFinale": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // EsitoFinale
    "esitoScr": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // EsitoScr
    "esitoParziale": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // EsitoParziale
    "tipoNoSupCod": "2", // Reason code for not passing
    "tipiNosupDes": "Assente", // Description of the reason for not passing
    "tipoNoCarCod": "TAS", // Reason code for not loading
    "tipoNoCarDes": "Caricamento Bloccato per mancanza pagamento delle tasse", // Description of the reason for not loading
    "lottoId": 1, // ID of the batch of the report linked to the exam
    "verbId": 1, // ID of the report contained within the batch that loaded the exam
    "errNum": 17, // Error number for report loading
    "errDes": "Tasse irregolari", // Description of the error for report loading
    "errDesWeb": "Tasse irregolari" // Description of the error for report loading (suitable for WEB display)
  }
]
```

<br>

---

<br>

### `GET /libretti/{matId}/righe/{adsceId}/prove/{adregId}` - Requested exam of the selected educational activity

```java
/**
 * Requested exam of the selected educational activity
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param adregId              integer (path, required)            - ID of the exam connected to the booklet row
 * @return ProvaLibretto on success
 */
GET /libretti/{matId}/righe/{adsceId}/prove/{adregId}
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "adregId": 1, // Unique ID of the exam related to an educational activity of the booklet (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
  "staRegCod": "P", // Exam state code
  "staRegDes": "Prenotato", // Exam state description
  "applistaId": 1, // Unique ID of the reservation connected to the booklet exam
  "tipoAppCod": "PF", // Appeal type linked to the reservation
  "cdsEsaId": 1, // ID of the study course providing the exam (parent of the common exam); the course coincides with the course where the session linked to passing the exam is defined
  "adEsaId": 1, // ID of the educational activity providing the exam (parent of the common exam)
  "sesId": 1, // ID of the session that allows passing the exam (session key is composed of cdsAdId, sesId, esito.aaSupId)
  "sesDes": "Anticipo sessione esiva", // Description of the session that allows passing the exam
  "tipoIscrCod": "S", // Enrollment type required for the exam
  "dataApp": "15/10/2015", // Appeal date of the reservation linked to the exam; required format is DD/MM/YYYY
  "esitoFinale": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // EsitoFinale
  "esitoScr": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // EsitoScr
  "esitoParziale": {
    "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
    "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
    "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
    "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
    "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
    "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
    "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
    "aaSupId": 2016 // Year of passing the exam
  }, // EsitoParziale
  "tipoNoSupCod": "2", // Reason code for not passing
  "tipiNosupDes": "Assente", // Description of the reason for not passing
  "tipoNoCarCod": "TAS", // Reason code for not loading
  "tipoNoCarDes": "Caricamento Bloccato per mancanza pagamento delle tasse", // Description of the reason for not loading
  "lottoId": 1, // ID of the batch of the report linked to the exam
  "verbId": 1, // ID of the report contained within the batch that loaded the exam
  "errNum": 17, // Error number for report loading
  "errDes": "Tasse irregolari", // Description of the error for report loading
  "errDesWeb": "Tasse irregolari" // Description of the error for report loading (suitable for WEB display)
}
```

<br>

---

<br>

## Endpoints - Prove

### `GET /libretti/{matId}/righe/{adsceId}/prove` - All exams of the selected educational activity

```java
/**
 * All exams of the selected educational activity
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<ProvaLibretto> on success
 */
GET /libretti/{matId}/righe/{adsceId}/prove
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "adregId": 1, // Unique ID of the exam related to an educational activity of the booklet (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
    "staRegCod": "P", // Exam state code
    "staRegDes": "Prenotato", // Exam state description
    "applistaId": 1, // Unique ID of the reservation connected to the booklet exam
    "tipoAppCod": "PF", // Appeal type linked to the reservation
    "cdsEsaId": 1, // ID of the study course providing the exam (parent of the common exam); the course coincides with the course where the session linked to passing the exam is defined
    "adEsaId": 1, // ID of the educational activity providing the exam (parent of the common exam)
    "sesId": 1, // ID of the session that allows passing the exam (session key is composed of cdsAdId, sesId, esito.aaSupId)
    "sesDes": "Anticipo sessione esiva", // Description of the session that allows passing the exam
    "tipoIscrCod": "S", // Enrollment type required for the exam
    "dataApp": "15/10/2015", // Appeal date of the reservation linked to the exam; required format is DD/MM/YYYY
    "esitoFinale": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // EsitoFinale
    "esitoScr": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // EsitoScr
    "esitoParziale": {
      "modValCod": "V", // Type of evaluation mode for the exam. Can assume values V, G, N; if the value is V, then upon passing the vote field is populated; otherwise, if the value is G, the tipo_giud_cod field is populated (required)
      "supEsaFlg": 1, // Flag indicating whether the outcome is positive (required)
      "voto": 1, // Vote, valued if modValCod is V. Final exam outcomes (those involving booklet row loading) are INTEGERS; partial exam outcomes can have 2 decimal digits
      "lodeFlg": 1, // Flag indicating honors (cum laude), set to 1 only if modValCod is V and honors must be set
      "tipoGiudCod": "IDO", // Code indicating the type of judgment used, valued only if modValCod is G
      "tipoGiudDes": "Idoneo", // Description indicating the type of judgment used, valued only if modValCod is G
      "dataEsa": "15/10/2015", // Date of the exam; the required format is DD/MM/YYYY
      "aaSupId": 2016 // Year of passing the exam
    }, // EsitoParziale
    "tipoNoSupCod": "2", // Reason code for not passing
    "tipiNosupDes": "Assente", // Description of the reason for not passing
    "tipoNoCarCod": "TAS", // Reason code for not loading
    "tipoNoCarDes": "Caricamento Bloccato per mancanza pagamento delle tasse", // Description of the reason for not loading
    "lottoId": 1, // ID of the batch of the report linked to the exam
    "verbId": 1, // ID of the report contained within the batch that loaded the exam
    "errNum": 17, // Error number for report loading
    "errDes": "Tasse irregolari", // Description of the error for report loading
    "errDesWeb": "Tasse irregolari" // Description of the error for report loading (suitable for WEB display)
  }
]
```

<br>

---

<br>

## Endpoints - Rilevazioni In Aula

### `GET /libretti/{matId}/righe/{adsceId}/rilevazioni-in-aula/{adsceRilId}/eventi` - Retrieves detection details

```java
/**
 * Retrieves detection details
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param adsceRilId           integer (path, required)            - ID of the detections group created by attendance tracking
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param filter               string (query, optional)            - il parametro consente di applicare dei filtri alla classe di modello utilizzando il linguaggio RS...
 * @return List<RilFreqDett> on success
 */
GET /libretti/{matId}/righe/{adsceId}/rilevazioni-in-aula/{adsceRilId}/eventi
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "adsceRilId": 1, // Identifier of the detections group
    "adsceRilDettId": 1, // Identifier of the detection
    "matId": 1, // ID of the career segment on which to calculate statistics
    "adsceId": 1, // Identificativo univoco che consente di individuare una riga di libretto dello studente
    "docenteCodFis": "docenteCodFis", // Fiscal code of the teacher who carried out the detection
    "docenteId": 1, // Unique identifier of the teacher
    "docenteNome": "docenteNome", // Nome del docente
    "docenteCognome": "docenteCognome", // Cognome del docente
    "dataOraInizio": "01/01/1900 10:00:00", // Date and time of detection start
    "durata": 1, // Duration in hours of the detection
    "stato": "A", // Stato della rilevazione (A, P)
    "adLogDateId": 1, // Unique identifier for lessons/detections dates
    "minutiAssenza": 25 // Minutes of absence at a lesson; the data is valid only if the detection state is P - presence
  }
]
```

<br>

---

<br>

## Endpoints - Segmento

### `GET /libretti/{matId}/righe/{adsceId}/segmenti` - All segments of the selected educational activity

```java
/**
 * All segments of the selected educational activity
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<SegmentoLibretto> on success
 */
GET /libretti/{matId}/righe/{adsceId}/segmenti
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "segsceId": 1, // Unique ID of the segment identifying the characteristics of the educational activity (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
    "attributi": {}
  }
]
```

<br>

---

<br>

### `GET /libretti/{matId}/righe/{adsceId}/segmenti/{segsceId}` - Requested segment of the selected educational activity

```java
/**
 * Requested segment of the selected educational activity
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param segsceId             integer (path, required)            - ID of the segment connected to the booklet row
 * @return SegmentoLibretto on success
 */
GET /libretti/{matId}/righe/{adsceId}/segmenti/{segsceId}
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "segsceId": 1, // Unique ID of the segment identifying the characteristics of the educational activity (required)
  "adsceId": 1, // Unique ID identifying a student's booklet row (required)
  "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
  "attributi": {}
}
```

<br>

---

<br>

### `GET /libretti/{matId}/segmenti` - All segments of the educational activities of a booklet

```java
/**
 * All segments of the educational activities of a booklet
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adNonCancellabili    integer (query, optional)           - If 1, retrieves non-cancellable educational activities of the booklet. Defaults to 0
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @param start                integer (query, optional)           - utilizzato insieme a `limit` per indicare la paginazione sui record
 * @param limit                integer (query, optional)           - utilizzato insieme a `start` per indicare la paginazione sui record, `limit` indica il numero di ...
 * @return List<SegmentoLibretto> on success
 */
GET /libretti/{matId}/segmenti
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "segsceId": 1, // Unique ID of the segment identifying the characteristics of the educational activity (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "matId": 1, // Id univoco che consente di individuare il libretto dello studente (required)
    "attributi": {}
  }
]
```

<br>

---

<br>

## Endpoints - Syllabus

### `GET /libretti/{matId}/righe/{adsceId}/syllabus/AD` - Syllabus of the educational activity connected to the booklet row

```java
/**
 * Syllabus of the educational activity connected to the booklet row
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<SyllabusADLibretto> on success
 */
GET /libretti/{matId}/righe/{adsceId}/syllabus/AD
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "chiavePartizione": {
      "aaOffId": 1, // Anno di erogazione della partizione (required)
      "fatPartCod": "ALF", // Partition factor code (required)
      "fatPartDes": "Alfabetico", // Partition factor description
      "fatPartDesEng": "Alphabetic", // Partition factor description in English
      "domPartCod": "PARI", // Partition domain code (required)
      "domPartDes": "PARI", // Partition domain description
      "domPartDesEng": "ODD", // Partition domain description in English
      "partCod": "S1", // Academic year partition code (required)
      "partDes": "Primo semestre", // Academic year partition description
      "partDesEng": "First Semester", // Academic year partition description in English
      "adLogId": 1 // Logistics grouping ID (required)
    }, // ChiavePartizione (required)
    "chiaveADContestualizzata": {
      "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
      "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
      "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
      "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
      "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
      "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
      "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
      "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
      "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
      "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
      "adId": 1, // Chiave dell'attività didattica (required)
      "adCod": "PDS_AD_1", // Codice dell''attività didattica
      "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
      "afId": 1 // Id della afId proveniente da U-Gov Didattica
    }, // ChiaveADContestualizzata (required)
    "desAdPubblFlg": 0, // Flag indicating if the descriptions of the educational activities are publishable (required)
    "contenuti": "contenuti del corso", // Course contents
    "obiettiviFormativi": "obiettivi formativi", // Educational objectives
    "prerequisiti": "prerequisiti", // Prerequisites
    "metodiDidattici": "metodi didattici", // Teaching methods
    "modalitaVerificaApprendimento": "Assessment methods", // Aa
    "altreInfo": "altre informazioni", // Other information
    "testiRiferimento": "Reference texts" // Aa
  }
]
```

<br>

---

<br>

### `GET /libretti/{matId}/righe/{adsceId}/syllabus/UD` - Syllabus of the teaching units connected to the booklet row

```java
/**
 * Syllabus of the teaching units connected to the booklet row
 *
 * @param matId                integer (path, required)            - ID of the career segment to retrieve the booklet for
 * @param adsceId              integer (path, required)            - ID of the booklet row
 * @param fields               string (query, optional)            - Specifies the list of optional fields (which are not retrieved by default)
 * @param order                string (query, optional)            - consente di specificare un ordine per il recupero dei record. La sintassi è la seguente * +/- : s...
 * @return List<SyllabusUDLibretto> on success
 */
GET /libretti/{matId}/righe/{adsceId}/syllabus/UD
```

**Auth:** `STUDENTE`, `DOCENTE_APP`, `DOCENTE_PIANI`, `UTENTE_TECNICO`, `UTENTE_PTA`, `UTENTE_PTA_ADMIN` required · Supported: `Basic`, `JWT`

**Cache:** midRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "matId": 1, // Unique ID identifying the student's career segment and its linked booklet (required)
    "adsceId": 1, // Unique ID identifying a student's booklet row (required)
    "chiavePartizione": {
      "aaOffId": 1, // Anno di erogazione della partizione (required)
      "fatPartCod": "ALF", // Partition factor code (required)
      "fatPartDes": "Alfabetico", // Partition factor description
      "fatPartDesEng": "Alphabetic", // Partition factor description in English
      "domPartCod": "PARI", // Partition domain code (required)
      "domPartDes": "PARI", // Partition domain description
      "domPartDesEng": "ODD", // Partition domain description in English
      "partCod": "S1", // Academic year partition code (required)
      "partDes": "Primo semestre", // Academic year partition description
      "partDesEng": "First Semester", // Academic year partition description in English
      "adLogId": 1 // Logistics grouping ID (required)
    }, // ChiavePartizione (required)
    "chiaveAdContestualizzata": {
      "cdsId": 1, // Chiave del corso di studio di erogazione dell'attività didattica (required)
      "cdsCod": "CDS_AD_1", // Codice del corso di studio di erogazione dell'attività didattica
      "cdsDes": "Esempio di CDS AD", // Descrizione del corso di erogazione dell'attività didattica
      "aaOrdId": 2016, // Anno di ordinamento del corso di studio di erogazione dell'attività didattica (required)
      "aaOrdCod": "CDS_AD_1", // Code of the regulation providing the educational activity
      "aaOrdDes": "Esempio di CDS AD", // Description of the regulation providing the educational activity
      "pdsId": 1, // Chiave del percorso di studio di erogazione dell'attività didattica (required)
      "pdsCod": "PDS_AD_1", // Codice del percorso di erogazione dell'attività didattica
      "pdsDes": "Esempio di PDS AD", // Descrizione del percorso di erogazione dell'attività didattica
      "aaOffId": 1, // Anno di offerta di erogazione dell'attività didattica (required)
      "adId": 1, // Chiave dell'attività didattica (required)
      "adCod": "PDS_AD_1", // Codice dell''attività didattica
      "adDes": "Esempio di PDS AD", // Descrizione dell''attività didattica
      "afId": 1 // Id della afId proveniente da U-Gov Didattica
    }, // ChiaveAdContestualizzata (required)
    "udLogId": 1, // ID that allows identifying the partition linked to the UD (required)
    "udCod": "UD_COD", // Teaching unit code
    "udDes": "UD_DES", // Teaching unit description
    "desUdPubblFlg": 0, // Flag indicating if the description of the teaching unit is publishable (required)
    "obiettiviFormativi": "obiettivi formativi", // Educational objectives
    "prerequisiti": "prerequisiti", // Prerequisites
    "testiRiferimento": "Reference texts" // Aa
  }
]
```

<br>

---

<br>

---

## References

- **Swagger UI:** [Libretto Api V2 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Libretto%20Api%20V2%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Flibretto-service-v2)#/syllabus/getSyllabusADRigaLibretto>)
- **Spec YAML:** [librettoApiV2.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p11-librettoApiV2.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)