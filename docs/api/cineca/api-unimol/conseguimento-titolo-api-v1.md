---
title: ConseguimentoTitolo API V1 | OhMyUniversity!
description: REST API documentation for the ConseguimentoTitolo service (ConseguimentoTitolo-service-v1) - CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: ConseguimentoTitolo API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the ConseguimentoTitolo service (ConseguimentoTitolo-service-v1) - CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/conseguimentoTitolo-api-v1
  - - meta
    - name: keywords
      content: conseguimentoTitolo v1 api, esse3 rest api, cineca api, ohmyuniversity api, ConseguimentoTitolo-service-v1
  - - meta
    - name: twitter:title
      content: ConseguimentoTitolo API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the ConseguimentoTitolo service (ConseguimentoTitolo-service-v1) - CINECA ESSE3.
---

# OhMyUniversity! - Unimol: ConseguimentoTitolo API V1

**ENG:** `Thesis and Graduation`

**Version:** `1.2.0` · **Base URL:** `/ConseguimentoTitolo-service-v1`

The services allow retrieving information on the graduation process of the Esse3 system, including:
- graduation exam dates and related information
- the list of professors who can be selected as thesis advisors
- the list of external subjects who can be selected as thesis advisors
- the summary of all data entered and options chosen during the presentation of the graduation application
- the types of thesis configured based on the graduation rules related to the student
- the thesis data and information related to the exam and session

---

## Endpoints - Thesis Attachments (Allegati Di Tesi)

### `POST /allegati/tesi/` - Insert attachment metadata

```java
/**
 * Allows inserting metadata of a new thesis attachment,
 * the response contains the location header that allows uploading
 * the blob connected to the metadata via uploadId. If the thesis has not
 * yet been inserted, it can be added via the /domandeCt/tesi API.
 *
 * @param body                 InserimentoAllegatoTesiMetadata (body, required) - Object containing the metadata of the attachment to insert
 * @return 201 Successful response,
 *         DettaglioErrore on failure
 */
POST /allegati/tesi/
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "chiaviCollegamento": [
    {
      "nome": "domTiroId", // Contains the key relating the attachment to other esse3 entities
      "valore": 123 // Contains the ID value
    }
  ], // ChiaviCollegamento
  "proprietaAggiuntive": [
    {
      "nome": "nome", // Name of the additional property (required)
      "valAlfa": "val_alfa", // Property value if string
      "valNum": 1.0, // Property value if number
      "valDate": "valDate" // Property value if date time
    }
  ], // ProprietaAggiuntive
  "filename": "readme.txt", // File name
  "autore": "mario rossi", // File author
  "titolo": "tesi di laurea", // File title
  "descrizione": "descrizione libera", // Free description
  "tipologiaAllegato": "ACC_RIS" // Attachment type related to p17_tipologia_allegati entity
}
```

#### Response

**`201 Created` - Successful response**

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /allegati/tesi/antiplagio` - Insert anti-plagiarism data for thesis attachments

```java
/**
 * Inserts anti-plagiarism data for thesis attachments and
 * optionally the approval of the final thesis attachment with consequent
 * approval of the thesis as well.
 *
 * @param allegatoId           integer (query, optional)           - Attachment ID
 * @param indxAntiplagio       string (query, optional)            - Anti-plagiarism reference
 * @param linkAntiplagio       string (query, optional)            - Anti-plagiarism link
 * @param notaAntiplagio       string (query, optional)            - Anti-plagiarism note
 * @param approvazioneAllegFlg integer (query, optional)           - Flag indicating whether to approve the final attachment and therefore the thesis
 * @return InserimentoDatiAntiplagio on success,
 *         DettaglioErrore on failure
 */
PUT /allegati/tesi/antiplagio
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

#### Response

**`200 OK`**

```json
{
  "allegatoId": 1, // Attachment ID (required)
  "indxAntiplagio": "indx antiP", // Anti-plagiarism reference
  "linkAntiplagio": "link antiP", // Anti-plagiarism link
  "notaAntiplagio": "nota antiP", // Anti-plagiarism note
  "approvazioneAllegFlg": 1 // Final attachment approval flag and therefore approval
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Graduation Exams (Appelli Laurea)

### `GET /appelliCt` - Retrieve graduation exams list

```java
/**
 * Retrieves the list of graduation exams
 *
 * @param tipoCorsoCod         string (query, optional)            - Study Course Type code
 * @param cdsCod               string (query, optional)            - Study Course code
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @return List<Appello> on success,
 *         DettaglioErrore on failure
 */
GET /appelliCt
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "appCtId": 1, // Graduation exam ID
    "sesCtId": 1, // Graduation session ID
    "aaId": 2017, // Year associated with the exam session
    "sesCtDes": "Sessione Estiva", // Session description
    "appCtDes": "Appello di Giugno", // Exam description
    "dataAppCt": "18/12/2017", // Graduation exam date
    "dataIniSesCt": "18/12/2017", // Start date of the session containing the graduation exam
    "dataFinSesCt": "18/12/2017", // End date of the session containing the graduation exam
    "appCtNota": "Appello di Giugno per gli studenti del corso di laurea in Medicina", // Session description
    "cdsId": 1, // Study course ID
    "aaOrdId": 2001, // Sort year ID
    "pdsId": 1, // Study path ID
    "linguaId": 1, // Language ID
    "linguaIso6392Cod": "ita", // Language code
    "cdsCod": "MED12", // Study course code
    "cdsDes": "Corso di laurea a ciclo unico in Medicina e Chirurgia", // Study course description
    "tipoCorsoCod": "LM", // Study course type code
    "scadenze": [
      {
        "appCtId": 1, // Graduation exam ID
        "tipoScadenzaCod": "DAW", // Deadline type
        "tipoScadenzaDes": "Scadenza Domanda Ammissione Web", // Deadline type
        "dataScaIni": "18/12/2017", // Start date of the deadline type configured for the graduation exam
        "dataScaFin": "18/12/2017", // End date of the deadline type configured for the graduation exam
        "linguaId": 1, // Language ID
        "linguaIso6392Cod": "ita" // Language code
      }
    ] // Scadenze
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Graduation Exam (Appello Di Laurea)

### `GET /appelliCt/{appCtId}` - Retrieve graduation exam information

```java
/**
 * Retrieves the graduation exam objects list
 *
 * @param appCtId              integer (path, required)            - Graduation exam ID
 * @return List<Appello> on success
 */
GET /appelliCt/{appCtId}
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "appCtId": 1, // Graduation exam ID
    "sesCtId": 1, // Graduation session ID
    "aaId": 2017, // Year associated with the exam session
    "sesCtDes": "Sessione Estiva", // Session description
    "appCtDes": "Appello di Giugno", // Exam description
    "dataAppCt": "18/12/2017", // Graduation exam date
    "dataIniSesCt": "18/12/2017", // Start date of the session containing the graduation exam
    "dataFinSesCt": "18/12/2017", // End date of the session containing the graduation exam
    "appCtNota": "Appello di Giugno per gli studenti del corso di laurea in Medicina", // Session description
    "cdsId": 1, // Study course ID
    "aaOrdId": 2001, // Sort year ID
    "pdsId": 1, // Study path ID
    "linguaId": 1, // Language ID
    "linguaIso6392Cod": "ita", // Language code
    "cdsCod": "MED12", // Study course code
    "cdsDes": "Corso di laurea a ciclo unico in Medicina e Chirurgia", // Study course description
    "tipoCorsoCod": "LM", // Study course type code
    "scadenze": [
      {
        "appCtId": 1, // Graduation exam ID
        "tipoScadenzaCod": "DAW", // Deadline type
        "tipoScadenzaDes": "Scadenza Domanda Ammissione Web", // Deadline type
        "dataScaIni": "18/12/2017", // Start date of the deadline type configured for the graduation exam
        "dataScaFin": "18/12/2017", // End date of the deadline type configured for the graduation exam
        "linguaId": 1, // Language ID
        "linguaIso6392Cod": "ita" // Language code
      }
    ] // Scadenze
  }
]
```

<br>

---

<br>

## Endpoints - Graduation Application (Domanda Di Laurea)

### `POST /domandeCt` - Insert graduation application based on process data

```java
/**
 * Allows inserting the graduation application and the related thesis
 *
 * @param body                 InserimentoDomCt (body, required)   - Object containing the row to insert
 * @return 201 Insert succeded,
 *         DettaglioErrore on failure
 */
POST /domandeCt
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "domanda": {
    "stuId": 1, // Student ID (required)
    "aaId": 2017, // Year associated with the exam session
    "dataDomCt": "18/12/2017", // Graduation application presentation date
    "appCtId": 1, // Graduation exam ID
    "sesCtId": 1, // Graduation session ID
    "quesAlma": "S", // Almalaurea questionnaire status
    "tipoDomCt": "NOR", // Graduation application type
    "stage": "Stage presso CINECA", // Student internship
    "stageEng": "Stage in CINECA", // Student internship in English
    "projectWork": "Progetto di tesi presso CINECA", // Description of any project work done for graduation.
    "projectWorkEng": "Project study in CINECA", // Description of any project work done for graduation in English
    "cdsDicId": 1, // Study Course ID
    "aaOrdDicId": 2001, // Sort Year ID
    "pdsDicId": 1, // Study Path ID
    "prosSpecFlg": 1, // Indicates if the graduating bachelor's student will continue with a master's degree
    "regAzionistuId": 1, // Student ID on the p18_reg_azioni_stu table
    "cdsProsId": 101, // Study Course ID related to the master's enrollment
    "aaOrdProsId": 2012, // Sort Year ID related to the master's enrollment
    "pdsProsId": 1, // Study Path ID related to the master's enrollment
    "linguaQuadId": 1, // ID of the four-year language followed by the student.
    "nota": "testo della nota", // Notes
    "numTel": "+39 349 12345633", // Indicates the student's phone number during the thesis period
    "domCtId": 1, // Graduation application ID
    "mesiProrogaCt": 12, // Indicates the number of extension months for a doctorate graduation
    "regCtId": 1, // Graduation rule ID related to the graduation application
    "consVulcanoFlg": 1, // Flag indicating any transmission of graduation application data via the Vulcano procedure
    "esaSostFlg": 1, // Flag indicating the student applying for graduation has passed all exams in their study plan
    "autWebFlg": 1, // Flag authorizing web publication of graduation data
    "tipoEsactCod": "DP", // Indicates the code for the graduation exam type
    "tesiDiGruppoFlg": 1, // Flag indicating if it's a group thesis
    "confEsplicitaFlg": 1, // Explicit student confirmation. Explicit confirmation is a phase that may be required from the student before their application is effectively confirmed by the secretariat
    "ricPergaFlg": 1, // Flag indicating if the student requested the graduation parchment during graduation
    "motCtrlRifreg": 1, // Reference rules to use in the RULES and Plans control engine for the student (0 Use path rules (OFFF), 1 Use RAD)
    "regAlmaFlg": 1, // Flag indicating if the student has already registered on the AlmaLaurea site
    "pergaNumRaggr": 1 // Grouping ID for printing parchments/drafts
  }, // Domanda
  "tesi": {
    "stuId": 1, // Student ID
    "regCtId": 1, // Graduation rule ID related to the graduation application
    "tipoTesiCod": "T0", // Thesis type code
    "dataDepositoTesi": "18/12/2017", // Thesis deposit date
    "titoloTesiIta": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
    "abstractTesiIta": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
    "titoloTesiEng": "Application of quantum physics theories into the real world", // Graduation thesis title in English
    "abstractTesiEng": "Application of quantum physics theories into the real worl, abstract", // Graduation thesis abstract in English
    "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
    "settCod": "PROFIN_S", // Sector code of the thesis ad
    "settDiscCod": "SSN", // ID code of the reference scientific disciplinary sector
    "discCod": "SSN", // ID code of the discipline (within the scientific disciplinary sector)
    "adId": 2018, // Thesis academic activity ID
    "udAdId": 1, // Academic activity ID.
    "cdsId": 177, // Study Course ID
    "aaOffId": 2001, // Academic offer year ID
    "udId": 1, // Didactic unit ID
    "adTesiDes": "Ingegneria del Software", // Graduation thesis academic activity description
    "linguaTesi": 1, // Thesis language ID
    "linguaDiscussioneTesi": 1, // Thesis discussion language ID
    "keywordAlma1": "ingegneria", // 1st Almalaurea keyword
    "keywordAlma2": "del software", // 2nd Almalaurea keyword
    "keywordAlma3": "metriche", // 3rd Almalaurea keyword
    "keywordAlma4": "effort", // 4th Almalaurea keyword
    "keywordAlma5": "ore lavoro", // 5th Almalaurea keyword
    "nota": "lo studente ha effettuato la tesi con un'esperienza all'estero", // Note defined on the graduation thesis
    "tesiElettrFlg": 1, // Flag indicating if the thesis was delivered electronically
    "modConsTesiCod": "PUB", // Thesis consultation consent modality code
    "modRiprTesiCod": "IMM", // Thesis reproduction modality code
    "tesinaFlg": 0, // Flag indicating if it's a term paper
    "esteroFlg": 1, // Flag indicating if thesis preparation took place abroad
    "tipoRecapitoCod": "CASA", // Thesis delivery type
    "altroRecapitoTesi": "Via Magnanelli, 2 Casalecchio di Reno (BO)", // Free thesis delivery address, usable if OTHER is indicated as thesis delivery type
    "tipoRecapitoPergaCod": "codice", // Parchment delivery type
    "altroRecapitoPerga": "Via Magnanelli, 2 Casalecchio di Reno (BO)", // Free parchment delivery address, usable if OTHER is indicated as parchment delivery type.
    "dataMinSesCt": "18/12/2017", // Minimum graduation session date that can be chosen by the student
    "regAzionistuId": 1, // Student ID on the p18_reg_azioni_stu table
    "tesiId": 1, // Student thesis ID
    "keywordAlmaEng1": "word", // 1st Almalaurea keyword in English
    "keywordAlmaEng2": "key", // 2nd Almalaurea keyword in English
    "keywordAlmaEng3": "software", // 3rd Almalaurea keyword in English
    "keywordAlmaEng4": "metrics", // 4th Almalaurea keyword in English
    "keywordAlmaEng5": "test", // 5th Almalaurea keyword in English
    "confTesiDefFlg": 0, // Indicates if the student explicitly confirmed uploading the final thesis to the system.
    "complTesi": 0, // Indicates if the thesis completion activity was done at least once from web
    "mesiEmbargo": 6, // Thesis embargo months.
    "tipoAutVerifTesiCod": "AUT", // Authorization type code for verifying thesis authenticity
    "recPergaNazioneId": 1, // Indicates the Nation of the free parchment delivery address
    "recPergaComuneId": 111, // Indicates the municipality of the free parchment delivery address
    "recPergaVia": "via Roma", // Indicates the address of the free parchment delivery address
    "recPergaNumCiv": "12", // Indicates the street number of the free parchment delivery address
    "recPergaCap": "12", // Indicates the postal code of the free parchment delivery address
    "recPergaCitstra": "12", // Indicates the postal code of the free parchment delivery address
    "TesiDiGruppo": 1, // Indicates if it's a group thesis
    "relatori": [
      {
        "preTesiId": 1, // Thesis ID (pre)
        "docenteId": 1, // Advisor professor ID
        "soggEstId": 1, // External subject advisor ID
        "tipoRelCod": "R1", // Code identifying the advisor type
        "dipId": 1, // Advisor department ID. Automatically populated when choosing the professor.
        "notaTesi": "Tesi di Laurea di" // Reports the advisor's annotations on the thesis
      }
    ] // Relatori
  } // Tesi
}
```

#### Response

**`201 Created` - Insert succeded**

**`412` - Insert failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /domandeCt/annullaDomandaCt` - Cancel graduation application

```java
/**
 * Graduation application cancellation
 *
 * @param domConsTitId         integer (query, optional)           - Graduation application ID
 * @param studId               integer (query, optional)           - Student ID
 * @param checkScadenze        boolean (query, optional)           - Indicates whether to check deadlines. True to perform the check, false otherwise
 * @return AnnullamentoDomCt on success,
 *         DettaglioErrore on failure
 */
PUT /domandeCt/annullaDomandaCt
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** configuration

#### Response

**`200 OK`**

```json
{
  "domCtId": 1234, // Graduation application ID (required)
  "stuId": 4321, // Student ID (required)
  "checkScadenze": true, // Boolean managing deadline checks. True if checked, otherwise false (required)
  "statoDomanda": "ANN" // Application status.
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /domandeCt/appCtId/{appCtId}/tesi` - Retrieve thesis data linked to applications of a specific exam

```java
/**
 * Retrieves thesis data linked to applications of a specific exam
 *
 * @param appCtId              integer (path, required)            - Graduation exam ID
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<RiepilogoTesiDomCt> on success,
 *         DettaglioErrore on failure
 */
GET /domandeCt/appCtId/{appCtId}/tesi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "tesiId": 1, // Graduation thesis ID
    "stuId": 1, // Student ID
    "appCtId": 1, // Exam ID linked to the application
    "titoloTesiIta": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
    "abstractTesiIta": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
    "titoloTesiEng": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title in English
    "abstractTesiEng": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract in English
    "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
    "AdGenDes": "Ingegneria del Software", // Graduation thesis academic activity description
    "AdTesiDes": "Ingegneria del Software", // Hardcoded graduation thesis academic activity description
    "TesiDiGruppo": 1, // Indicates if it's a group thesis
    "dataDepositoTesi": "18/12/2017", // Thesis deposit date
    "StatoTesi": "Presentata", // Graduation thesis status description
    "DomCtId": 1, // ID of the application associated with the thesis
    "linguaTesi": "italiano", // Thesis language description
    "linguaDiscussioneTesi": "italiano", // Thesis discussion language description
    "linguaId": 1, // Language ID
    "linguaIso6392Cod": "ita", // Language code
    "modConsTesiCod": "PUB", // Thesis consultation modality code
    "allegatiTesi": [
      {
        "allegatoTypeCod": "DOM_CT", // ALLEGATI_TYPE ENUM value linked to attachment type
        "allegatoId": 1, // Attachment ID
        "domCtId": 1, // ID of the application associated with the thesis
        "appCtId": 1, // ID of the application associated with the thesis
        "titolo": "Tesi sulla creazione di un sistema in cloud tramite Docker.", // Attachment title
        "allegatoDes": "Tesi sulla creazione di un sistema in cloud tramite Docker.", // Attachment description
        "filename": "tesi.pdf", // Attached file name
        "estensione": "pdf", // Attached file extension
        "defFlg": 1, // Flag indicating if attachment is final or not
        "usrInsId": "1", // ID of user who inserted the attachment
        "dataMod": "18/12/2017", // Attachment data modification date
        "statoAllTesiCod": "A", // Thesis attachment status - A (approved), R (rejected), I (inserted)
        "motivazione": "Allegato approvato", // Motivation related to attachment status
        "dataAppRif": "18/12/2017", // Attachment approval or rejection date
        "statoAllTesiDes": "Approvato", // Thesis attachment status description - A (approved), R (rejected), I (inserted)
        "tipoAllegatoCod": "TESI", // Attachment type code
        "tipologiaDes": "TESI", // Attachment type code
        "autUsoAll": 1, // Des des
        "dataAutUsoAll": "18/12/2017", // Des des
        "indxAntiplagio": "ref antiP", // Anti-plagiarism reference
        "linkAntiplagio": "link antiP", // Anti-plagiarism link
        "notaAntiplagio": "nota antiplagio", // Anti-plagiarism note
        "modConsTesi": "AUTH", // Thesis consultation modality
        "autAccessoTesi": "embargo", // Thesis access authorization
        "giorniEmbargo": 1, // Embargo days
        "dataFineEmbargo": "18/12/2017" // Embargo end date
      }
    ], // AllegatiTesi
    "relatori": [
      {
        "tesiId": 1, // ID of thesis linked to advisor
        "tipoRelCod": "R1", // Advisor type
        "tipoRelDes": "tipoRelDes", // Advisor type description
        "docenteId": 1, // Professor ID
        "domCtId": 1, // Application ID
        "appCtId": 1, // Exam ID
        "soggEstId": 1, // External subject ID
        "notaTesi": "nota della tesi", // Thesis note
        "ricEccellenzaFlg": 1, // External subject ID
        "dataRicEccellenza": "18/12/2017", // Excellence request date
        "puntiProp": 1, // Professor ID
        "motPuntiProp": "motivazione punteggio proposto" // Proposed score motivation
      }
    ] // Relatori
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /domandeCt/matId/{matId}` - Retrieve graduation application data by student matriculation

```java
/**
 * Retrieves graduation application data by matriculation ID
 *
 * @param matId                integer (path, required)            - Matriculation ID
 * @return List<RiepilogoDomCt> on success,
 *         DettaglioErrore on failure
 */
GET /domandeCt/matId/{matId}
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "domCtId": 1, // Graduation application ID
    "stuId": 1, // Student ID
    "matId": 1, // Student ID
    "dataDomandaCt": "18/12/2017", // Graduation application date
    "aaId": 1, // Academic year ID of application
    "stato": "ita", // Graduation application status
    "sessioneCtDes": "Sessione Invernale 2018", // Chosen exam session
    "dataInizioSessioneCt": "18/12/2017", // Start date of graduation session chosen for application
    "dataFineSessioneCt": "18/12/2017", // Start date of graduation session chosen for application
    "appelloCtDes": "Appello di Laurea Ottobe", // Exam selected during graduation application presentation
    "dataAppelloCt": "18/12/2017", // Selected exam date during graduation application presentation
    "dataSedutaCt": "18/12/2017", // Graduation session date chosen for application
    "orarioSedutaCt": "600", // Graduation session time (HH24:MI)
    "EdificioDes": "Edificio della facoltà di Matematica", // Description
    "AulaDes": "Aula Magna", // Description
    "tesiId": 1, // Graduation thesis ID associated with application
    "titoloTesi": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
    "abstractTesi": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
    "dataDepositoTesi": "18/12/2017", // Thesis deposit date
    "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
    "AdGenDes": "Ingegneria del Software", // Graduation thesis academic activity description
    "AdTesiDes": "Ingegneria del Software", // Free graduation thesis academic activity description
    "TesiDiGruppo": 1, // Flag indicating if thesis associated with application is Group
    "KeywordAlma1": "parola", // 1st Almalaurea keyword
    "KeywordAlma2": "parola", // 2nd Almalaurea keyword
    "KeywordAlma3": "parola", // 3rd Almalaurea keyword
    "KeywordAlma4": "parola", // 4th Almalaurea keyword
    "KeywordAlma5": "parola", // 5th Almalaurea keyword
    "StatoTesiCod": "CON", // ID code of graduation thesis status
    "dataCt": "18/12/2017", // Graduation date
    "tesiElettronica": 1, // Flag che Indica se la tesi è stata consegnata in formato elettronico
    "numeroMavCtit": "12345", // MAV payment number related to CTIT process taxes
    "dataPagamentoCtit": "18/12/2017", // MAV payment date related to CTIT process taxes
    "numeroMavPerga": "12345", // MAV payment number related to PERGA process taxes
    "dataPagamentoPerga": "18/12/2017", // MAV payment date related to CTIT process taxes
    "linguaId": 1, // Language ID
    "linguaIso6392Cod": "ita", // Language code
    "votoFinale": 28, // Final grade
    "lodeFlg": 1, // Honors flag
    "puntiAgg": 1.0, // Additional points
    "tipiGiudProFinDes": "ita", // Judgment description
    "menzioneFlg": 1, // Honors flag
    "encomioFlg": 1, // Honors flag
    "cfuFinali": 100.0 // Final credits
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /domandeCt/stuId/{stuId}` - Retrieve graduation application data by student ID

```java
/**
 * Retrieves graduation application data by student ID
 *
 * @param stuId                integer (path, required)            - Student ID
 * @return List<RiepilogoDomCt> on success,
 *         DettaglioErrore on failure
 */
GET /domandeCt/stuId/{stuId}
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "domCtId": 1, // Graduation application ID
    "stuId": 1, // Student ID
    "matId": 1, // Student ID
    "dataDomandaCt": "18/12/2017", // Graduation application date
    "aaId": 1, // Academic year ID of application
    "stato": "ita", // Graduation application status
    "sessioneCtDes": "Sessione Invernale 2018", // Chosen exam session
    "dataInizioSessioneCt": "18/12/2017", // Start date of graduation session chosen for application
    "dataFineSessioneCt": "18/12/2017", // Start date of graduation session chosen for application
    "appelloCtDes": "Appello di Laurea Ottobe", // Exam selected during graduation application presentation
    "dataAppelloCt": "18/12/2017", // Selected exam date during graduation application presentation
    "dataSedutaCt": "18/12/2017", // Graduation session date chosen for application
    "orarioSedutaCt": "600", // Graduation session time (HH24:MI)
    "EdificioDes": "Edificio della facoltà di Matematica", // Description
    "AulaDes": "Aula Magna", // Description
    "tesiId": 1, // Graduation thesis ID associated with application
    "titoloTesi": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
    "abstractTesi": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
    "dataDepositoTesi": "18/12/2017", // Thesis deposit date
    "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
    "AdGenDes": "Ingegneria del Software", // Graduation thesis academic activity description
    "AdTesiDes": "Ingegneria del Software", // Free graduation thesis academic activity description
    "TesiDiGruppo": 1, // Flag indicating if thesis associated with application is Group
    "KeywordAlma1": "parola", // 1st Almalaurea keyword
    "KeywordAlma2": "parola", // 2nd Almalaurea keyword
    "KeywordAlma3": "parola", // 3rd Almalaurea keyword
    "KeywordAlma4": "parola", // 4th Almalaurea keyword
    "KeywordAlma5": "parola", // 5th Almalaurea keyword
    "StatoTesiCod": "CON", // ID code of graduation thesis status
    "dataCt": "18/12/2017", // Graduation date
    "tesiElettronica": 1, // Flag che Indica se la tesi è stata consegnata in formato elettronico
    "numeroMavCtit": "12345", // MAV payment number related to CTIT process taxes
    "dataPagamentoCtit": "18/12/2017", // MAV payment date related to CTIT process taxes
    "numeroMavPerga": "12345", // MAV payment number related to PERGA process taxes
    "dataPagamentoPerga": "18/12/2017", // MAV payment date related to CTIT process taxes
    "linguaId": 1, // Language ID
    "linguaIso6392Cod": "ita", // Language code
    "votoFinale": 28, // Final grade
    "lodeFlg": 1, // Honors flag
    "puntiAgg": 1.0, // Additional points
    "tipiGiudProFinDes": "ita", // Judgment description
    "menzioneFlg": 1, // Honors flag
    "encomioFlg": 1, // Honors flag
    "cfuFinali": 100.0 // Final credits
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `POST /domandeCt/tesi` - Insert a new thesis

```java
/**
 * Allows inserting the thesis for a student. If the student already has
 * a graduation application, it is possible to retrieve the dom_ct_id via
 * the /domandeCt/stuId/{stuId} API specifying the stu_id. Once the dom_ct_id
 * is obtained, it is inserted in the body and thus the thesis is associated with
 * the application. If the student does not yet have an application, the dom_ct_id
 * can be omitted.
 *
 * @param body                 InserimentoTesiIntoDomCt (body, required) - Object containing the row to insert
 * @return 201 Insert succeded,
 *         DettaglioErrore on failure
 */
POST /domandeCt/tesi
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "domCtId": 1, // Graduation application ID
  "tesi": {
    "stuId": 1, // Student ID
    "regCtId": 1, // Graduation rule ID related to the graduation application
    "tipoTesiCod": "T0", // Thesis type code
    "dataDepositoTesi": "18/12/2017", // Thesis deposit date
    "titoloTesiIta": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
    "abstractTesiIta": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
    "titoloTesiEng": "Application of quantum physics theories into the real world", // Graduation thesis title in English
    "abstractTesiEng": "Application of quantum physics theories into the real worl, abstract", // Graduation thesis abstract in English
    "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
    "settCod": "PROFIN_S", // Sector code of the thesis ad
    "settDiscCod": "SSN", // ID code of the reference scientific disciplinary sector
    "discCod": "SSN", // ID code of the discipline (within the scientific disciplinary sector)
    "adId": 2018, // Thesis academic activity ID
    "udAdId": 1, // Academic activity ID.
    "cdsId": 177, // Study Course ID
    "aaOffId": 2001, // Academic offer year ID
    "udId": 1, // Didactic unit ID
    "adTesiDes": "Ingegneria del Software", // Graduation thesis academic activity description
    "linguaTesi": 1, // Thesis language ID
    "linguaDiscussioneTesi": 1, // Thesis discussion language ID
    "keywordAlma1": "ingegneria", // 1st Almalaurea keyword
    "keywordAlma2": "del software", // 2nd Almalaurea keyword
    "keywordAlma3": "metriche", // 3rd Almalaurea keyword
    "keywordAlma4": "effort", // 4th Almalaurea keyword
    "keywordAlma5": "ore lavoro", // 5th Almalaurea keyword
    "nota": "lo studente ha effettuato la tesi con un'esperienza all'estero", // Note defined on the graduation thesis
    "tesiElettrFlg": 1, // Flag indicating if the thesis was delivered electronically
    "modConsTesiCod": "PUB", // Thesis consultation consent modality code
    "modRiprTesiCod": "IMM", // Thesis reproduction modality code
    "tesinaFlg": 0, // Flag indicating if it's a term paper
    "esteroFlg": 1, // Flag indicating if thesis preparation took place abroad
    "tipoRecapitoCod": "CASA", // Thesis delivery type
    "altroRecapitoTesi": "Via Magnanelli, 2 Casalecchio di Reno (BO)", // Free thesis delivery address, usable if OTHER is indicated as thesis delivery type
    "tipoRecapitoPergaCod": "codice", // Parchment delivery type
    "altroRecapitoPerga": "Via Magnanelli, 2 Casalecchio di Reno (BO)", // Free parchment delivery address, usable if OTHER is indicated as parchment delivery type.
    "dataMinSesCt": "18/12/2017", // Minimum graduation session date that can be chosen by the student
    "regAzionistuId": 1, // Student ID on the p18_reg_azioni_stu table
    "tesiId": 1, // Student thesis ID
    "keywordAlmaEng1": "word", // 1st Almalaurea keyword in English
    "keywordAlmaEng2": "key", // 2nd Almalaurea keyword in English
    "keywordAlmaEng3": "software", // 3rd Almalaurea keyword in English
    "keywordAlmaEng4": "metrics", // 4th Almalaurea keyword in English
    "keywordAlmaEng5": "test", // 5th Almalaurea keyword in English
    "confTesiDefFlg": 0, // Indicates if the student explicitly confirmed uploading the final thesis to the system.
    "complTesi": 0, // Indicates if the thesis completion activity was done at least once from web
    "mesiEmbargo": 6, // Thesis embargo months.
    "tipoAutVerifTesiCod": "AUT", // Authorization type code for verifying thesis authenticity
    "recPergaNazioneId": 1, // Indicates the Nation of the free parchment delivery address
    "recPergaComuneId": 111, // Indicates the municipality of the free parchment delivery address
    "recPergaVia": "via Roma", // Indicates the address of the free parchment delivery address
    "recPergaNumCiv": "12", // Indicates the street number of the free parchment delivery address
    "recPergaCap": "12", // Indicates the postal code of the free parchment delivery address
    "recPergaCitstra": "12", // Indicates the postal code of the free parchment delivery address
    "TesiDiGruppo": 1, // Indicates if it's a group thesis
    "relatori": [
      {
        "preTesiId": 1, // Thesis ID (pre)
        "docenteId": 1, // Advisor professor ID
        "soggEstId": 1, // External subject advisor ID
        "tipoRelCod": "R1", // Code identifying the advisor type
        "dipId": 1, // Advisor department ID. Automatically populated when choosing the professor.
        "notaTesi": "Tesi di Laurea di" // Reports the advisor's annotations on the thesis
      }
    ] // Relatori
  } // Tesi
}
```

#### Response

**`201 Created` - Insert succeded**

**`412` - Insert failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /domandeCt/{domCtId}` - Retrieve graduation application data

```java
/**
 * Retrieves graduation application data by application ID
 *
 * @param domCtId              integer (path, required)            - Graduation application ID
 * @return RiepilogoDomCt on success,
 *         DettaglioErrore on failure
 */
GET /domandeCt/{domCtId}
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
{
  "domCtId": 1, // Graduation application ID
  "stuId": 1, // Student ID
  "matId": 1, // Student ID
  "dataDomandaCt": "18/12/2017", // Graduation application date
  "aaId": 1, // Academic year ID of application
  "stato": "ita", // Graduation application status
  "sessioneCtDes": "Sessione Invernale 2018", // Chosen exam session
  "dataInizioSessioneCt": "18/12/2017", // Start date of graduation session chosen for application
  "dataFineSessioneCt": "18/12/2017", // Start date of graduation session chosen for application
  "appelloCtDes": "Appello di Laurea Ottobe", // Exam selected during graduation application presentation
  "dataAppelloCt": "18/12/2017", // Selected exam date during graduation application presentation
  "dataSedutaCt": "18/12/2017", // Graduation session date chosen for application
  "orarioSedutaCt": "600", // Graduation session time (HH24:MI)
  "EdificioDes": "Edificio della facoltà di Matematica", // Description
  "AulaDes": "Aula Magna", // Description
  "tesiId": 1, // Graduation thesis ID associated with application
  "titoloTesi": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
  "abstractTesi": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
  "dataDepositoTesi": "18/12/2017", // Thesis deposit date
  "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
  "AdGenDes": "Ingegneria del Software", // Graduation thesis academic activity description
  "AdTesiDes": "Ingegneria del Software", // Free graduation thesis academic activity description
  "TesiDiGruppo": 1, // Flag indicating if thesis associated with application is Group
  "KeywordAlma1": "parola", // 1st Almalaurea keyword
  "KeywordAlma2": "parola", // 2nd Almalaurea keyword
  "KeywordAlma3": "parola", // 3rd Almalaurea keyword
  "KeywordAlma4": "parola", // 4th Almalaurea keyword
  "KeywordAlma5": "parola", // 5th Almalaurea keyword
  "StatoTesiCod": "CON", // ID code of graduation thesis status
  "dataCt": "18/12/2017", // Graduation date
  "tesiElettronica": 1, // Flag che Indica se la tesi è stata consegnata in formato elettronico
  "numeroMavCtit": "12345", // MAV payment number related to CTIT process taxes
  "dataPagamentoCtit": "18/12/2017", // MAV payment date related to CTIT process taxes
  "numeroMavPerga": "12345", // MAV payment number related to PERGA process taxes
  "dataPagamentoPerga": "18/12/2017", // MAV payment date related to CTIT process taxes
  "linguaId": 1, // Language ID
  "linguaIso6392Cod": "ita", // Language code
  "votoFinale": 28, // Final grade
  "lodeFlg": 1, // Honors flag
  "puntiAgg": 1.0, // Additional points
  "tipiGiudProFinDes": "ita", // Judgment description
  "menzioneFlg": 1, // Honors flag
  "encomioFlg": 1, // Honors flag
  "cfuFinali": 100.0 // Final credits
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /domandeCt/{domCtId}/tesi` - Retrieve thesis data linked to the student's graduation application

```java
/**
 * Retrieves thesis data linked to the student's graduation application
 *
 * @param domCtId              integer (path, required)            - Graduation application ID
 * @return RiepilogoTesiDomCt on success,
 *         DettaglioErrore on failure
 */
GET /domandeCt/{domCtId}/tesi
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
{
  "tesiId": 1, // Graduation thesis ID
  "stuId": 1, // Student ID
  "appCtId": 1, // Exam ID linked to the application
  "titoloTesiIta": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
  "abstractTesiIta": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
  "titoloTesiEng": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title in English
  "abstractTesiEng": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract in English
  "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
  "AdGenDes": "Ingegneria del Software", // Graduation thesis academic activity description
  "AdTesiDes": "Ingegneria del Software", // Hardcoded graduation thesis academic activity description
  "TesiDiGruppo": 1, // Indicates if it's a group thesis
  "dataDepositoTesi": "18/12/2017", // Thesis deposit date
  "StatoTesi": "Presentata", // Graduation thesis status description
  "DomCtId": 1, // ID of the application associated with the thesis
  "linguaTesi": "italiano", // Thesis language description
  "linguaDiscussioneTesi": "italiano", // Thesis discussion language description
  "linguaId": 1, // Language ID
  "linguaIso6392Cod": "ita", // Language code
  "modConsTesiCod": "PUB", // Thesis consultation modality code
  "allegatiTesi": [
    {
      "allegatoTypeCod": "DOM_CT", // ALLEGATI_TYPE ENUM value linked to attachment type
      "allegatoId": 1, // Attachment ID
      "domCtId": 1, // ID of the application associated with the thesis
      "appCtId": 1, // ID of the application associated with the thesis
      "titolo": "Tesi sulla creazione di un sistema in cloud tramite Docker.", // Attachment title
      "allegatoDes": "Tesi sulla creazione di un sistema in cloud tramite Docker.", // Attachment description
      "filename": "tesi.pdf", // Attached file name
      "estensione": "pdf", // Attached file extension
      "defFlg": 1, // Flag indicating if attachment is final or not
      "usrInsId": "1", // ID of user who inserted the attachment
      "dataMod": "18/12/2017", // Attachment data modification date
      "statoAllTesiCod": "A", // Thesis attachment status - A (approved), R (rejected), I (inserted)
      "motivazione": "Allegato approvato", // Motivation related to attachment status
      "dataAppRif": "18/12/2017", // Attachment approval or rejection date
      "statoAllTesiDes": "Approvato", // Thesis attachment status description - A (approved), R (rejected), I (inserted)
      "tipoAllegatoCod": "TESI", // Attachment type code
      "tipologiaDes": "TESI", // Attachment type code
      "autUsoAll": 1, // Des des
      "dataAutUsoAll": "18/12/2017", // Des des
      "indxAntiplagio": "ref antiP", // Anti-plagiarism reference
      "linkAntiplagio": "link antiP", // Anti-plagiarism link
      "notaAntiplagio": "nota antiplagio", // Anti-plagiarism note
      "modConsTesi": "AUTH", // Thesis consultation modality
      "autAccessoTesi": "embargo", // Thesis access authorization
      "giorniEmbargo": 1, // Embargo days
      "dataFineEmbargo": "18/12/2017" // Embargo end date
    }
  ], // AllegatiTesi
  "relatori": [
    {
      "tesiId": 1, // ID of thesis linked to advisor
      "tipoRelCod": "R1", // Advisor type
      "tipoRelDes": "tipoRelDes", // Advisor type description
      "docenteId": 1, // Professor ID
      "domCtId": 1, // Application ID
      "appCtId": 1, // Exam ID
      "soggEstId": 1, // External subject ID
      "notaTesi": "nota della tesi", // Thesis note
      "ricEccellenzaFlg": 1, // External subject ID
      "dataRicEccellenza": "18/12/2017", // Excellence request date
      "puntiProp": 1, // Professor ID
      "motPuntiProp": "motivazione punteggio proposto" // Proposed score motivation
    }
  ] // Relatori
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Thesis Consultation Modality (Modalità Di Consultazione Tesi)

### `GET /modConsTesi` - Retrieve list of thesis consultation modalities

```java
/**
 * Retrieves the list of thesis consultation modalities
 *
 * @param abilFlg              integer (query, optional)           - Flag indicating whether the consultation modality is enabled or not
 * @return List<ModalitaConsultazioneTesi> on success,
 *         DettaglioErrore on failure
 */
GET /modConsTesi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "modConsTesiCod": "AUTH", // Thesis consultation modality code
    "des": "Tesi accessibile via web", // Thesis consultation modality description
    "abilFlg": 1, // Enabled flag
    "modAutAccTesiCod": "PUB", // Thesis consultation modality code
    "giorniEmbargo": 1, // Thesis embargo days
    "autAccessoTesi": "embargo" // Thesis access authorization
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /tesi/{tesiId}/modConsTesi` - Update thesis consultation modality code

```java
/**
 * Update the thesis consultation modality code
 *
 * @param tesiId               integer (path, required)            - Thesis ID
 * @param modConsTesiCod       string (query, required)            - Thesis consultation modality code
 * @return InserimentoModConsTesiCod on success,
 *         DettaglioErrore on failure
 */
PUT /tesi/{tesiId}/modConsTesi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
{
  "tesiId": 1, // Thesis ID (required)
  "modConsTesiCod": "PUB" // Thesis consultation modality code
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Thesis Advisor Professors (Docenti Relatori Di Tesi)

### `GET /relatori/docenti` - Retrieve list of available thesis advisor professors for the student

```java
/**
 * Retrieves the list of available thesis advisor professors for the student
 *
 * @param cognome              string (query, optional)            - Advisor surname, search is done with LIKE in format SURNAME%
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @return List<DocenteRelatore> on success,
 *         DettaglioErrore on failure
 */
GET /relatori/docenti
```

**Auth:** `STUDENTE`, `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "docenteId": 1, // Professor registry ID
    "settCod": "MED/01", // Scientific disciplinary sector code
    "matricola": "12345", // Professor matriculation
    "cognome": "Rossi", // Professor surname
    "nome": "Mario", // Professor name
    "badge": "1212aa", // Professor badge number
    "email": "nome@indirizzo.it", // Public email address, shown on web and printed on various docs
    "dipartimentoCod": "M01", // Professor department code
    "dipartimentoDes": "Dipartimento di Medicina", // Professor department description
    "facoltaCod": "F01", // Professor faculty code
    "facoltaDes": "Facoltà di Medicina", // Professor faculty description
    "ruoloDocCod": "A", // Professor role code
    "ruoloDocDes": "Professore Associato", // Professor role description
    "dipId": 1, // Department ID
    "dataFinAtt": "18/12/2017", // Professor end activation date. If null, considered active.
    "linguaId": 1 // Language ID
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - External Subject Thesis Advisor (Soggetto Esterno Relatore Di Tesi)

### `GET /relatori/soggEst/` - Retrieve list of available external subjects for the student

```java
/**
 * Retrieves the list of available external subjects for the student
 *
 * @param cognome              string (query, optional)            - Advisor surname, search is done with LIKE in format SURNAME%
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @return List<SoggettoEsterno> on success,
 *         DettaglioErrore on failure
 */
GET /relatori/soggEst/
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "soggEstId": 1, // External subject registry ID
    "Cognome": "descrizione", // External subject surname
    "Nome": "descrizione", // External subject name
    "CodiceFiscale": "RSSMAR76L07L219C", // External subject fiscal code
    "dataNascita": "10/10/2016", // External subject birth date (DD/MM/YYYY)
    "Appellativo": "dott.", // External subject title
    "Email": "nome@indirizzo.it", // External subject email address, shown on web and printed
    "tipoSoggettoEsterno": "descrizione", // External subject type
    "contattoAziendale": "descrizione" // External subject type
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Thesis Advisor Report (Report Tesi Relatori)

### `GET /report/tesi/relatori/{dipCod}` - Retrieve statistics on thesis advisors

```java
/**
 * Retrieves statistics on thesis advisors
 *
 * @param dipCod               string (path, required)             - Department code
 * @param dataIni              string (query, required)            - Start date, format DD/MM/YYYY
 * @param dataFine             string (query, required)            - End date, format DD/MM/YYYY
 * @param docenteId            integer (query, optional)           - Professor ID
 * @param soggEstId            integer (query, optional)           - External subject ID
 * @param tipoRelCod           string (query, optional)            - Advisor type code
 * @return DipartimentiRelatoriTesi on success,
 *         DettaglioErrore on failure
 */
GET /report/tesi/relatori/{dipCod}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
{
  "dipartimentoCod": "300716", // Department code
  "dipartimentoDes": "Dipartimento di Medicina", // Department description
  "dataInizio": "15/10/2015", // Start date. Format: DD/MM/YYYY
  "dataFine": "15/10/2015", // End date. Format: DD/MM/YYYY
  "relatori": [
    {
      "docenteId": 1, // Professor ID
      "soggEstId": 1, // External subject ID
      "totals": [
        {
          "docenteId": 1, // Professor ID
          "soggEstId": 1, // External subject ID
          "tipoRelCod": "R1", // Codice tipo relatore
          "numTesi": 1 // Number of theses associated with advisor
        }
      ] // Totals
    }
  ] // Relatori
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Graduation Sessions and Commissions (Sedute E Commissioni Di Laurea)

### `GET /sedAppCt` - Retrieve information on sessions and respective graduation commissions

```java
/**
 * Retrieves information on sessions and respective graduation commissions
 *
 * @param aaId                 integer (query, optional)           - Graduation year ID
 * @param dipartimento         string (query, optional)            - Department code
 * @return List<SedAppCt> on success,
 *         DettaglioErrore on failure
 */
GET /sedAppCt
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "sesCtId": 1, // Session ID
    "appCtId": 1, // Exam ID
    "sedCtPrg": 1, // Session progressive
    "aulaId": 1, // Classroom ID
    "aulaDes": "Aula 1", // Classroom description
    "commCtId": 1, // Commission ID
    "sedutaCod": "22530-1", // Session code
    "orarioSeduta": "600", // Graduation session time (HH24:MI)
    "dataSeduta": "18/12/2017", // Session date
    "aaId": 2020, // Year ID
    "desAppello": "SECONDO APPELLO", // Exam description
    "desSessione": "Sessione Estiva", // Description sessione
    "dipartimento": "D04", // Department
    "desDipartimento": "Dipartimento di Ingegneria e Architettura", // Department description
    "membriCommissione": [
      {
        "docSedCtId": 1, // Graduation commission professor ID
        "commCtId": 1, // Commission ID
        "appellativo": "Professore", // Professor title
        "nome": "Claudio", // Professor name
        "cognome": "Rossi", // Professor surname
        "ruoloCod": "P", // Professor role code
        "ruoloDes": "Presidente", // Description del ruolo docente
        "idAb": 1, // AB ID
        "codFis": "MRYWLM80A01H501H", // Professor fiscal code
        "docenteId": 1, // Professor ID
        "soggEstId": 1 // External subject ID
      }
    ] // MembriCommissione
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Thesis (Tesi Di Laurea)

### `GET /tesi/{tesiId}` - Retrieve thesis data specified by tesiId

```java
/**
 * Retrieves thesis data specified by tesiId
 *
 * @param tesiId               integer (path, required)            - Thesis ID
 * @return RiepilogoTesi on success,
 *         DettaglioErrore on failure
 */
GET /tesi/{tesiId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
{
  "tesiId": 1, // Graduation thesis ID
  "stuId": 1, // Student ID
  "appCtId": 1, // Exam ID linked to the application
  "titoloTesiIta": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title
  "abstractTesiIta": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract
  "titoloTesiEng": "Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis title in English
  "abstractTesiEng": "testo abstract Applicazione di teorie di fisica quantistica al mondo reale", // Graduation thesis abstract in English
  "TipoTesiDes": "Tesi Sperimentale", // Graduation thesis type description
  "AdGenDes": "Ingegneria del Software", // Graduation thesis academic activity description
  "AdTesiDes": "Ingegneria del Software", // Hardcoded graduation thesis academic activity description
  "TesiDiGruppo": 1, // Indicates if it's a group thesis
  "dataDepositoTesi": "18/12/2017", // Thesis deposit date
  "StatoTesi": "Presentata", // Graduation thesis status description
  "DomCtId": 1, // ID of the application associated with the thesis
  "linguaTesi": "italiano", // Thesis language description
  "linguaDiscussioneTesi": "italiano", // Thesis discussion language description
  "linguaId": 1, // Language ID
  "linguaIso6392Cod": "ita", // Language code
  "modConsTesiCod": "PUB", // Thesis consultation modality code
  "allegatiTesi": [
    {
      "allegatoTypeCod": "DOM_CT", // ALLEGATI_TYPE ENUM value linked to attachment type
      "allegatoId": 1, // Attachment ID
      "domCtId": 1, // ID of the application associated with the thesis
      "appCtId": 1, // ID of the application associated with the thesis
      "titolo": "Tesi sulla creazione di un sistema in cloud tramite Docker.", // Attachment title
      "allegatoDes": "Tesi sulla creazione di un sistema in cloud tramite Docker.", // Attachment description
      "filename": "tesi.pdf", // Attached file name
      "estensione": "pdf", // Attached file extension
      "defFlg": 1, // Flag indicating if attachment is final or not
      "usrInsId": "1", // ID of user who inserted the attachment
      "dataMod": "18/12/2017", // Attachment data modification date
      "statoAllTesiCod": "A", // Thesis attachment status - A (approved), R (rejected), I (inserted)
      "motivazione": "Allegato approvato", // Motivation related to attachment status
      "dataAppRif": "18/12/2017", // Attachment approval or rejection date
      "statoAllTesiDes": "Approvato", // Thesis attachment status description - A (approved), R (rejected), I (inserted)
      "tipoAllegatoCod": "TESI", // Attachment type code
      "tipologiaDes": "TESI", // Attachment type code
      "autUsoAll": 1, // Des des
      "dataAutUsoAll": "18/12/2017", // Des des
      "indxAntiplagio": "ref antiP", // Anti-plagiarism reference
      "linkAntiplagio": "link antiP", // Anti-plagiarism link
      "notaAntiplagio": "nota antiplagio", // Anti-plagiarism note
      "modConsTesi": "AUTH", // Thesis consultation modality
      "autAccessoTesi": "embargo", // Thesis access authorization
      "giorniEmbargo": 1, // Embargo days
      "dataFineEmbargo": "18/12/2017" // Embargo end date
    }
  ], // AllegatiTesi
  "relatori": [
    {
      "tesiId": 1, // ID of thesis linked to advisor
      "tipoRelCod": "R1", // Advisor type
      "tipoRelDes": "tipoRelDes", // Advisor type description
      "docenteId": 1, // Professor ID
      "domCtId": 1, // Application ID
      "soggEstId": 1, // External subject ID
      "notaTesi": "nota della tesi", // Thesis note
      "ricEccellenzaFlg": 1, // External subject ID
      "dataRicEccellenza": "18/12/2017", // Excellence request date
      "puntiProp": 1, // Professor ID
      "motPuntiProp": "motivazione punteggio proposto" // Proposed score motivation
    }
  ] // Relatori
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Thesis Advisor Insertion (Inserimento Relatori Di Tesi)

### `PUT /tesi/{tesiId}/relatori` - Insert an advisor for a thesis

```java
/**
 * Insert an advisor for a thesis
 *
 * @param tesiId               integer (path, required)            - Thesis ID
 * @param body                 object (body, required)             - Object containing the row to insert
 * @return ImportResponseInsRelat on success,
 *         DettaglioErrore on failure
 */
PUT /tesi/{tesiId}/relatori
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Request body

```json
[
  {
    "tipoRelCod": "R1", // Thesis advisor ID
    "docenteId": 1, // Professor ID
    "soggEstId": 1, // External subject ID
    "notaTesi": "nota di tesi", // Thesis note
    "ricEccellenzaFlg": 1, // Excellence request flag (required)
    "dataRicEccellenza": "18/12/2017", // Excellence request date
    "puntiProp": 4, // Proposed points
    "motPuntiProp": "motivazione punti" // Proposed points motivation
  }
]
```

#### Response

**`200 OK`**

```json
{
  "esitoElaborazione": "esitoElaborazione", // Executed successfully or failed
  "elencoErrori": [
    {
      "descrizioneErrore": "descrizioneErrore" // Error description
    }
  ] // ElencoErrori
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Thesis Advisor Types (Tipologie Relatori Tesi)

### `GET /tipiRelTesi/{stuId}` - Retrieve thesis advisor types

```java
/**
 * Retrieves thesis advisor types
 *
 * @param stuId                integer (path, required)            - Student ID
 * @return List<RegTipoRel> on success,
 *         DettaglioErrore on failure
 */
GET /tipiRelTesi/{stuId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "regCtId": 1, // Professor ID
    "tipoRelCod": "R1", // Advisor type
    "tipoRelDes": "tipoRelDes", // Advisor type description
    "numMin": 1, // Minimum number
    "numMax": 1, // Maximum number
    "docenti": 1, // Professor ID
    "soggEst": 1 // External subject ID
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Thesis Types (Tipi Tesi Di Laurea)

### `GET /tipiTesiStu` - Retrieve list of thesis types

```java
/**
 * Retrieves the list of thesis types
 *
 * @param regCtId              integer (query, optional)           - Graduation rules ID
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @return List<TipiTesi> on success,
 *         DettaglioErrore on failure
 */
GET /tipiTesiStu
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "tipoTesiCod": "descrizione", // Code representing thesis type
    "des": "descrizione", // Thesis type description
    "miurTipoTesiCod": "descrizione", // Session description
    "regCtId": 1 // Graduation rules ID
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
      "errorType": "stackTrace", // Description del tipo di errore aggiuntivo
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

- **Swagger UI:** [ConseguimentoTitolo Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Conseguimento%20Titolo%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2FconsTit-service-v1)>)
- **Spec YAML:** [conseguimentoTitoloApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p12-conseguimentoTitoloApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
