---
title: Piani API V1 | OhMyUniversity!
description: REST API documentation for the Piani service (piani-service-v1) - student study plan access and management in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Piani API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Piani service (piani-service-v1) - student study plan access and management in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/piani-api-v1
  - - meta
    - name: keywords
      content: piani api, piano studente api, study plan api, esse3 rest api, cineca api, ohmyuniversity api, piani-service-v1, piano di studio, testate piano, attuazione piano
  - - meta
    - name: twitter:title
      content: Piani API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Piani service (piani-service-v1) - student study plan access and management in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Piani API V1

**ENG:** `Student Study Plans`

**Version:** `1.0.0` · **Base URL:** `/piani-service-v1`

REST API for accessing and managing student study plans in ESSE3. Provides endpoints for querying career segments with active plans, retrieving plan headers and full details, inserting new individual plans, and updating plan state and approval notes.

---

## Covered entities

| Entity                     | Description                                              | Tag         |
| -------------------------- | -------------------------------------------------------- | ----------- |
| `TrattoCarriera`           | Career segment (enrollment record) linked to study plans | `matricola` |
| `TestataPianoDiStudio`     | Study plan header with status, schema, and path info     | `piano`     |
| `PianoDiStudioConDettagli` | Full study plan with rules and teaching activities       | `piano`     |
| `PianiDiStudioStatistics`  | Aggregated statistics on study plans                     | `piano`     |

---

## Plan states

| Code | Description  |
| ---- | ------------ |
| `B`  | Draft        |
| `P`  | Proposed     |
| `V`  | Under review |
| `A`  | Approved     |
| `R`  | Rejected     |
| `X`  | Cancelled    |

---

## Plan insertion (POST) return codes

The `POST /piani/{stuId}` endpoint returns specific negative `retCode` values on failure. Only individual plans (`tipo = I`) are supported.

| Code   | Description                                                                                                                            |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `-1`   | Invalid input parameters                                                                                                               |
| `-2`   | Error cancelling the current valid plan                                                                                                |
| `-3`   | Error setting the requested plan state                                                                                                 |
| `-101` | Duplicate `ordNum` value in rules                                                                                                      |
| `-102` | Duplicate `scePianoId` in rules                                                                                                        |
| `-103` | Invalid `tipUnt` for rule with `ordNum` XX - must be `CFU`, `BLK`, or `ANN`                                                            |
| `-104` | Invalid `tipSce` for rule with `ordNum` XX                                                                                             |
| `-105` | Invalid `tipoAfCod` for rule with `ordNum` XX                                                                                          |
| `-106` | `maxUnt` must be ≥ `minUnt` for rule with `ordNum` XX                                                                                  |
| `-107` | `annoCorso` ≥ `annoCorsoAnticipo` for rule with `ordNum` XX                                                                            |
| `-200` | Duplicate `itmId` in activities                                                                                                        |
| `-201` | `itmPadreId` for `itmId` XX points to no activity                                                                                      |
| `-202` | `itmPadreId` for `itmId` XX points to multiple activities                                                                              |
| `-203` | `ordNum` for `itmId` XX points to no rule                                                                                              |
| `-204` | `ordNum` for `itmId` XX points to multiple rules                                                                                       |
| `-205` | `annoCorso` ≥ `annoCorsoAnticipo` for activity with `itmId` XX                                                                         |
| `-206` | Invalid `tipoAfCod` for activity with `itmId` XX                                                                                       |
| `-207` | Error retrieving offer data for activity with `itmId` XX (is the offer active?)                                                        |
| `-209` | `adsceId` value for activity with `itmId` XX does not exist                                                                            |
| `-210` | `adsceId` for activity with `itmId` XX does not belong to the student's `matId`                                                        |
| `-211` | Invalid `tipoInsCodPadreDottorati` for activity with `itmId` XX                                                                        |
| `-212` | Activity with `itmId` XX has doctoral fields but the linked rule is not a doctoral type                                                |
| `-213` | Invalid `tipoInsCod` for activity with `itmId` XX                                                                                      |
| `-214` | Error calculating weight from offer for `itmId` XX                                                                                     |
| `-215` | Error calculating weight from booklet for `itmId` XX                                                                                   |
| `-216` | Error retrieving parent grouping info for `itmId` XX                                                                                   |
| `-217` | Invalid `nazioneCod` for activity with `itmId` XX                                                                                      |
| `-218` | Error calculating weight from booklet for `itmId` XX (neither `adsceId` nor offer key set)                                             |
| `-219` | Activity with `itmId` XX has no linked rule and no `annoCorso` set                                                                     |
| `-220` | Activity with `itmId` XX has doctoral fields but the linked rule is not a doctoral type                                                |
| `-221` | Activity with `itmId` XX has doctoral fields but is the parent of the grouping - doctoral attributes are reserved for child activities |

---

## Endpoints - Career Segments (Matricola)

### `GET /piani` - Get career segments with study plans

```java
/**
 * Returns the list of career segments (TrattoCarriera) in which a study plan
 * can exist. At least one filter parameter must be provided to perform the query.
 *
 * @param matricola      string (query, optional) - student registration number; max 16 chars
 * @param cdsStuId       long   (query, optional) - student's degree course ID
 * @param cdsStuCod      string (query, optional) - student's degree course code
 * @param aaOrdStuId     int    (query, optional) - plan regulation ordering year (4 digits)
 * @param pdsStuId       long   (query, optional) - student's study path ID
 * @param pdsStuCod      string (query, optional) - student's study path code
 * @param coorte         int    (query, optional) - selection regulation cohort year (4 digits)
 * @param codiceFiscale  string (query, optional) - student's fiscal code; max 16 chars
 * @param staStuCod      string (query, optional) - student career status code; max 5 chars
 * @param start          int    (query, optional) - index of the first record to load,
 *                                                  defaults to 0
 * @param limit          int    (query, optional) - number of records to retrieve starting
 *                                                  from start, defaults to 50,
 *                                                  allowed range: 0–100
 * @param order          string (query, optional) - sort order; syntax: +/- followed by
 *                                                  field name (+ = ASC, - = DESC);
 *                                                  multiple fields comma-separated
 * @param fields         string (query, optional) - list of optional fields to include;
 *                                                  use ALL to return all fields;
 *                                                  supports Ant Glob Patterns
 * @param optionalFields string (query, optional) - alias for fields; same behavior
 * @return List<TrattoCarriera> paginated list of career segments with active study plans,
 *         or an empty array if none match the filters
 */
GET /piani
```

**Auth:** `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` · `DOCENTE_PIANI` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent`

::: warning
At least one filter parameter must be provided. Requests with no filters will be rejected.
:::

#### Response

**`200 OK`**

```json
[
  {
    "persId": 1, // Person ID
    "stuId": 1, // Student career ID
    "matId": 1, // Career segment ID
    "cognome": "Mario", // Student's surname
    "nome": "Mario", // Student's name
    "codiceFiscale": "AGVVTR78A62H501F", // Student's fiscal code
    "matricola": "123456", // Student's registration number
    "cdsId": 1, // Degree course ID
    "cdsCod": "CDS_1", // Degree course code
    "cdsDes": "Esempio di CDS", // Degree course description
    "aaOrdId": 2016, // Curriculum ordering year
    "pdsId": 1, // Study path ID
    "pdsCod": "PDS_1", // Study path code
    "pdsDes": "esempio di pds", // Study path description
    "aaRegId": 2016, // Enrollment regulation year
    "staStuCod": "A", // Student career status code
    "staStuDes": "Attivo", // Student career status description
    "staMatCod": "A", // Enrollment status code
    "staMatDes": "Attivo", // Enrollment status description
    "umPesoCod": "C", // Weight unit code
    "umPesoDes": "Crediti", // Weight unit description
    "codiceLettore": "7000", // Reader code
    "titoloStudio": 3, // Study title level
    "tipoLettore": "SM", // Reader type
    "autDatiPersonali": "S", // Personal data consent flag
    "statoTasse": 1, // Fee status
    "aaImm1": 2021, // First enrollment academic year (optional field)
    "tipoCorsoCod": "LM", // Course type code (optional field)
    "tipoCorsoDes": "Laurea Magistrale", // Course type description (optional field)
    "drCarr": 2023 // Career duration in years (optional field)
  }
]
```

**`422 Unprocessable Entity`**

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace",
      "value": "SocketTimeoutException....",
      "rawValue": "SocketTimeoutException...."
    }
  ]
}
```

<br>

---

<br>

## Endpoints - Study Plans (Piano)

### `GET /piani/stats` - Get study plan statistics

```java
/**
 * Returns aggregated statistics on study plans, broken down by plan type,
 * statutory flag, regulation type, and status. Supports optional filters
 * to scope the results by faculty, cohort, course type, or degree course.
 *
 * @param facCod       string (query, optional) - faculty code
 * @param coorte       int    (query, optional) - selection regulation cohort year (4 digits)
 * @param coorteMin    int    (query, optional) - minimum cohort year for range filter (4 digits)
 * @param tipoCorsoCod string (query, optional) - course type code
 * @param cdsCod       string (query, optional) - degree course code
 * @return List<PianiDiStudioStatistics> list of statistics entries grouped by
 *         plan type, statutory flag, regulation type, and status
 */
GET /piani/stats
```

**Auth:** `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response

**`200 OK`**

```json
[
  {
    "tipPiano": "string", // Plan type code
    "statuFlg": 0, // Statutory flag (0=no, 1=yes)
    "tipoRegsce": 0, // Regulation type code
    "num": 0, // Number of plans matching this combination
    "staPianoCod": "string", // Plan status code
    "staPianoDes": "string" // Plan status description
  }
]
```

<br>

---

<br>

### `GET /piani/{stuId}` - Get study plan headers for a student career

```java
/**
 * Returns the list of study plan headers for a given student career,
 * optionally filtered by plan status. Each entry represents a single plan
 * version with its status, schema, path, and activation metadata.
 *
 * @param stuId          long     (path, required)  - student career ID
 * @param statoPiano     string[] (query, optional) - plan status filter; valid values:
 *                                                    B, P, V, A, R, X;
 *                                                    multiple values allowed
 * @param order          string   (query, optional) - sort order; syntax: +/- followed by
 *                                                    field name (+ = ASC, - = DESC);
 *                                                    multiple fields comma-separated
 * @param fields         string   (query, optional) - list of optional fields to include;
 *                                                    use ALL to return all fields;
 *                                                    supports Ant Glob Patterns
 * @param optionalFields string   (query, optional) - alias for fields; same behavior
 * @return List<TestataPianoDiStudio> list of study plan headers for the student career,
 *         or an empty array if none match
 */
GET /piani/{stuId}
```

**Auth:** `UTENTE_TECNICO` · `DOCENTE_PIANI` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response

**`200 OK`**

```json
[
  {
    "stuId": 123, // Student career ID (primary key)
    "pianoId": 1, // Study plan ID (primary key)
    "staStuCod": "A", // Student status code (optional field)
    "motStastuCod": "ATT", // Student status reason code (optional field)
    "staMatCod": "A", // Enrollment status code (optional field)
    "motStamatCod": "IMM", // Enrollment status reason code (optional field)
    "matId": 123, // Career segment ID
    "regsceId": 122, // Selection regulation ID
    "schemaId": 122, // Plan schema ID
    "finregsceId": 122, // Compilation window ID (optional field)
    "stato": "A", // Plan status code (B/P/V/A/R/X)
    "statoDes": "string", // Plan status description
    "dataUltimaVarStato": "15/10/2015", // Last status change date (DD/MM/YYYY)
    "tipoPiano": "I", // Plan type (I=individual, S=standard)
    "statutarioFlg": 0, // Statutory flag (0=no, 1=yes)
    "coorte": 2012, // Student cohort year (optional field)
    "aaRevisioneId": 2012, // Revision year (optional field)
    "cdsStuId": 1223, // Student's degree course ID
    "cdsStuCod": "GEN", // Student's degree course code
    "cdsStuDes": "percorso generico", // Student's degree course description (optional field)
    "aaOrdStuId": 1223, // Student's curriculum ordering year
    "pdsStuId": 123, // Student's study path ID (optional field)
    "pdsStuCod": "GEN", // Student's study path code
    "pdsDes": "percorso generico", // Student's study path description (optional field)
    "pdsSceId": 123, // Selection study path ID (optional field)
    "pdsSceCod": "GEN", // Selection study path code
    "pdsSceDes": "percorso generico", // Selection study path description (optional field)
    "aaDefId": 2012, // Definition academic year
    "aaIscrId": 2012, // Enrollment academic year (optional field)
    "aptId": 122, // Part-time alternative ID
    "aptCod": "B2", // Part-time alternative code
    "aptDes": "Part Time al 50%", // Part-time alternative description (optional field)
    "aaUltimaAttuazioneId": 2012, // Last activation academic year
    "dataUltimaAttuazione": "15/10/2015", // Last activation date (DD/MM/YYYY)
    "userUltimaAttuazione": "m.rossi", // Last activation user
    "userControllo": "m.rossi", // Review user
    "notaControllo": "per approvare il piano occorre sostituire l'attività X con l'attività Y", // Review note
    "noteSistema": "Annullamento massivo per attivazione piani approvati", // System notes
    "noteUtente": "note libere", // User notes
    "extCod": "per approvare il piano occorre sostituire l'attività X con l'attività Y" // External code (optional field)
  }
]
```

<br>

---

<br>

### `POST /piani/{stuId}` - Insert a new study plan

```java
/**
 * Creates a new individual study plan for the given student career.
 * Only plans of type I (Individuale) are supported. The plan can be
 * inserted as Approved (A) or Proposed (P). If state is A and attuaFlg
 * is true, the plan is also activated immediately.
 *
 * For validation error codes returned on failure, see the
 * Plan insertion return codes table in the introduction.
 *
 * @param stuId long   (path, required) - student career ID
 * @param body  object (body, required) - plan creation payload; required fields:
 *   @param tipo                  string  - plan type; only "I" (individual) is supported
 *   @param stato                 string  - plan status; "A" (approved) or "P" (proposed)
 *   @param attuaFlg              boolean - activate the plan immediately (only if stato=A)
 *   @param annullaPianoValidoFlg boolean - cancel any current valid plan (stato A/P/V)
 *                                          before validating the new one
 *   @param tipoOrigModTaf        string  - TAF validation regulation to apply;
 *                                          "RAD" or "OFFF"
 *   @param pdsSceCod             string  - study path code for path selection
 *                                          (optional; defaults to student's path)
 *   @param regole                array   - selection rules (optional)
 *   @param attivita              array   - teaching activities (required); can be
 *                                          linked to rules via ordNum
 * @return 201 Created if the plan was inserted successfully
 */
POST /piani/{stuId}
```

**Auth:** `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Request body

```json
{
  "tipo": "I",                        // Plan type - only "I" (individual) supported
  "stato": "A",                       // Plan status: "A" (approved) or "P" (proposed)
  "attuaFlg": true,                   // Activate immediately (only if stato=A)
  "annullaPianoValidoFlg": true,      // Cancel current valid plan before inserting
  "tipoOrigModTaf": "OFFF",           // TAF validation regulation: "RAD" or "OFFF"
  "pdsSceCod": "GEN",                 // Study path code (optional; defaults to student's)
  "aaOffId": 2024,                    // Offer year
  "aaIscrId": 2024,                   // Enrollment year
  "tipoRegsce": 1,                    // Regulation type

  // --- Inter-university data (optional) ---
  "interateneo": {
    "sedeAmmCodeUn": "1",             // Administrative institution code
    "pianiInterateneo": [
      {
        "sedeOpCodeUn": "1",          // Operating institution code
        "staPianoInterateCod": "INV", // Inter-university plan status code
        "sedeOpPianoId": 1,           // Operating institution plan ID
        "sedeOpStaPianoCod": "P",     // Operating institution plan status code
        "sedeOpValutazione": 2,       // Operating institution evaluation value
        "msgSync": "sincronizzato correttamente",     // Sync message
        "msgSyncDett": "sincronizzato correttamente", // Sync message detail
        "userControlloCognome": "ROSSI",  // Review user surname
        "userControllonome": "MARIO",     // Review user name
        "userControlloMatricola": "MAT123", // Review user registration number
        "notaControllo": "OK",            // Review note
        "userValutatoreCognome": "ROSSI", // Evaluator surname
        "userValutatorenome": "MARIO",    // Evaluator name
        "userValutatoreMatricola": "MAT123", // Evaluator registration number
        "notaValutatore": "OK",           // Evaluator note
        "interateId": 1,                  // Inter-university record ID
        "regoleInterateneo": [
          {
            "sedeOpCodeUn": "1",          // Operating institution code
            "tipoRegolaInterateneo": "F", // Inter-university rule type
            "viewStudente": 1,            // Visible to student (0=no, 1=yes)
            "viewDocente": 1,             // Visible to teacher (0=no, 1=yes)
            "viewSegr": 1,                // Visible to secretariat (0=no, 1=yes)
            "ordNum": 2                   // Display order
          }
        ]
      }
    ],
    "attivitaInterateneo": [
      {
        "sedeOpCodeUn": "1",              // Operating institution code
        "staAdInterateCod": "INV",        // Inter-university activity status code
        "dettstaAdInterateCod": "OK",     // Inter-university activity status detail
        "adsceId": 1234,                  // Booklet activity ID
        "adId": 1234,                     // Teaching activity ID
        "adCod": "1234",                  // Teaching activity code
        "adDes": "1234",                  // Teaching activity description
        "cdsAdId": 1234,                  // Degree course ID
        "cdsAdCod": "1234",               // Degree course code
        "cdsAdDes": "1234",               // Degree course description
        "aaOrdAdId": 1234,                // Curriculum ordering year
        "pdsAdId": 1234,                  // Study path ID
        "pdsAdCod": "1234",               // Study path code
        "pdsAdDes": "1234",               // Study path description
        "aaOffAdId": 1234,                // Offer year
        "minPuntiEsa": 18,                // Minimum exam score
        "maxPuntiEsa": 18,                // Maximum exam score
        "tipoAzioneRicCod": "INTEGR",     // Recognition action type code
        "adsceIntComplId": 1234,          // Complementary booklet activity ID
        "adIntComplCod": "1234",          // Complementary activity code
        "adIntComplDes": "1234",          // Complementary activity description
        "dottTipoInsFlags": "10010",      // Doctoral insertion type flags
        "esito": {                         // Exam outcome for this activity
          "dataFreq": "1234",             // Attendance date
          "aaFreqId": 1234,               // Attendance academic year
          "dataSup": "1234",              // Passing date
          "aaSupId": 1234,                // Passing academic year
          "modValCod": "V",               // Assessment mode code
          "voto": 25,                     // Grade
          "lode": 0,                      // Honours flag (0=no, 1=yes)
          "tipoGiudCod": "IDO",           // Judgement type code
          "tipoGiudDes": "Idoneità",      // Judgement type description
          "ricId": 0,                     // Recognition ID
          "tipoRicCod": "R",              // Recognition type code
          "livelloLinguaCod": "B2",       // Language level code
          "linguaCod": "ita",             // Language code (ISO 639-2)
          "tipoSvolgimentoEsameCod": "si" // Exam delivery type code
        },
        "esitoIntCompl": { ... },         // Same structure as esito; for complementary activity
        "itmId": 1,                       // Activity item ID
        "msgSync": "SYNC"                 // Sync message
      }
    ],
    "segmentiInterateneo": [
      {
        "sedeOffertaCodeUn": "1",         // Offer institution code
        "sedeOpCodeUn": "1",              // Operating institution code
        "tipoSegInterateCod": "OFF",      // Segment type code
        "udCod": "UD1",                   // Teaching unit code
        "udDes": "Modulo 1",             // Teaching unit description
        "tipoCreCod": "LEZ",              // Credit type code
        "tipoCreDes": "Lezione",          // Credit type description
        "settCod": "MAT/01",              // Scientific sector code (SSD)
        "settDes": "Matematica di base",  // Scientific sector description
        "ambId": 1222,                    // Disciplinary scope ID
        "ambDes": "Ambito Matematica di base", // Disciplinary scope description
        "tipoAfCod": "A",                 // TAF type code
        "tipoAfDes": "Di Base",           // TAF type description
        "freqObbligFlg": 1,               // Mandatory attendance flag (0=no, 1=yes)
        "oreMinFreq": 12,                 // Minimum attendance hours
        "peso": 12,                       // Weight (CFU)
        "pesoConv": 12,                   // Converted weight
        "durata": 12,                     // Duration
        "durataStudioIndividuale": 10,    // Individual study duration
        "itmId": 1,                       // Activity item ID
        "udId": 1,                        // Teaching unit ID
        "segId": 1                        // Segment ID
      }
    ]
  },

  // --- Selection rules (optional) ---
  "regole": [
    {
      "ordNum": 1,                        // Rule display order
      "des": "Esami Obbligatori",         // Rule description
      "annoCorso": 1,                     // Course year
      "annoCorsoAnticipo": 1,             // Anticipated course year
      "unitaMisura": "CFU",               // Unit of measure (CFU, BLK, ANN)
      "tipoRegola": "F",                  // Rule type
      "maxUnt": 10,                       // Maximum units
      "minUnt": 1,                        // Minimum units
      "opzFlg": 0,                        // Optional flag (0=no, 1=yes)
      "sovranFlg": 0,                     // Sovereign flag (0=no, 1=yes)
      "taf": "D",                         // TAF category code
      "interateCodeUn": "123"             // Inter-university institution code
    }
  ],

  // --- Teaching activities (required) ---
  "attivita": [
    {
      "itmId": 1,                         // Activity item ID (must be unique)
      "itmPadreId": 1,                    // Parent item ID for grouping
      "genConvItmId": 1,                  // Converted item ID for recognition
      "ordNum": 1,                        // Rule reference order number
      "annoCorso": 1,                     // Course year (required if ordNum not set)
      "annoCorsoAnticipo": 1,             // Anticipated course year
      "sovranFlg": 0,                     // Sovereign flag (0=no, 1=yes)
      "cdsAdCod": "CDS1",                 // Degree course code of the offer
      "ordAdId": 2021,                    // Ordering year of the offer
      "pdsAdCod": "PDS1",                 // Study path code of the offer
      "aaOffAdId": 2021,                  // Offer year
      "adCod": "AD1",                     // Teaching activity code
      "adsceId": 123,                     // Booklet activity ID (alternative to offer key)
      "tesorettoFlg": 0,                  // Tesoretto flag (0=no, 1=yes)
      "tipoInsAdPadreDottorato": "DOTT",  // Doctoral grouping type for parent activity
      "dottorati": {                       // Doctoral info (only for doctoral grouping children)
        "desAd": "Seminario del ginocchio", // Doctoral activity description
        "tipoInsCod": "DOTT",             // Insertion type code
        "codCatNazione": "Z500",          // Country category code
        "dataPartenzaPrev": "01/01/2024", // Expected departure date (DD/MM/YYYY)
        "dataArrivoPrev": "01/02/2024",   // Expected arrival date (DD/MM/YYYY)
        "soggettoErogante": "Università di Cambrige", // Provider institution
        "destinazione": "Cambrige",       // Destination
        "linkPubblicazioni": [            // Publication links
          "http://www.google.com"
        ]
      }
    }
  ]
}
```

#### Response

**`201 Created`** - plan inserted successfully

**`422 Unprocessable Entity`**

```json
{
  "statusCode": 200,
  "retCode": -1, // See return codes table in the introduction
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace",
      "value": "SocketTimeoutException....",
      "rawValue": "SocketTimeoutException...."
    }
  ]
}
```

<br>

---

<br>

### `GET /piani/{stuId}/{pianoId}` - Get study plan with full details

```java
/**
 * Returns the full detail tree of a single study plan, identified by its
 * student career ID and plan ID. The response follows a 1-n structure:
 *
 *   Plan header
 *   ├── Selection rules (regole)
 *   ├── Teaching activities (attivita)
 *   │   └── Selected teaching units (udSelezionate)
 *   └── Inter-university data (interateneo, optional field)
 *       ├── Inter-university plans
 *       ├── Inter-university activities
 *       └── Inter-university segments
 *
 * @param stuId          long   (path, required)  - student career ID
 * @param pianoId        long   (path, required)  - plan ID (sequential per stuId)
 * @param fields         string (query, optional) - list of optional fields to include;
 *                                                  use ALL to return all fields;
 *                                                  supports Ant Glob Patterns
 * @param optionalFields string (query, optional) - alias for fields; same behavior
 * @param filter         string (query, optional) - RSQL filter expression applied
 *                                                  after data retrieval
 * @return PianoDiStudioConDettagli the full plan with rules, activities, and
 *         optional inter-university data, or 404 if not found
 */
GET /piani/{stuId}/{pianoId}
```

**Auth:** `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` · `DOCENTE_PIANI` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response

**`200 OK`**

```json
{
  // --- Plan header ---
  "stuId": 123,                         // Student career ID (primary key)
  "pianoId": 1,                         // Study plan ID (primary key)
  "staStuCod": "A",                     // Student status code (optional field)
  "motStastuCod": "ATT",                // Student status reason code (optional field)
  "staMatCod": "A",                     // Enrollment status code (optional field)
  "motStamatCod": "IMM",                // Enrollment status reason code (optional field)
  "matId": 123,                         // Career segment ID
  "regsceId": 122,                      // Selection regulation ID
  "schemaId": 122,                      // Plan schema ID
  "finregsceId": 122,                   // Compilation window ID (optional field)
  "stato": "A",                         // Plan status code (B/P/V/A/R/X)
  "statoDes": "string",                 // Plan status description
  "dataUltimaVarStato": "15/10/2015",   // Last status change date (DD/MM/YYYY)
  "tipoPiano": "I",                     // Plan type (I=individual, S=standard)
  "statutarioFlg": 0,                   // Statutory flag (0=no, 1=yes)
  "coorte": 2012,                       // Student cohort year (optional field)
  "aaRevisioneId": 2012,                // Revision year (optional field)
  "cdsStuId": 1223,                     // Student's degree course ID
  "cdsStuCod": "GEN",                   // Student's degree course code
  "cdsStuDes": "percorso generico",     // Student's degree course description (optional field)
  "aaOrdStuId": 1223,                   // Student's curriculum ordering year
  "pdsStuId": 123,                      // Student's study path ID (optional field)
  "pdsStuCod": "GEN",                   // Student's study path code
  "pdsDes": "percorso generico",        // Student's study path description (optional field)
  "pdsSceId": 123,                      // Selection study path ID (optional field)
  "pdsSceCod": "GEN",                   // Selection study path code
  "pdsSceDes": "percorso generico",     // Selection study path description (optional field)
  "aaDefId": 2012,                      // Definition academic year
  "aaIscrId": 2012,                     // Enrollment academic year (optional field)
  "aptId": 122,                         // Part-time alternative ID
  "aptCod": "B2",                       // Part-time alternative code
  "aptDes": "Part Time al 50%",         // Part-time alternative description (optional field)
  "aaUltimaAttuazioneId": 2012,         // Last activation academic year
  "dataUltimaAttuazione": "15/10/2015", // Last activation date (DD/MM/YYYY)
  "userUltimaAttuazione": "m.rossi",    // Last activation user
  "userControllo": "m.rossi",           // Review user
  "notaControllo": "per approvare il piano...", // Review note
  "noteSistema": "Annullamento massivo...",     // System notes
  "noteUtente": "note libere",          // User notes
  "extCod": "...",                      // External code (optional field)

  // --- Selection rules ---
  "regole": [
    {
      "stuId": 12,                      // Student career ID (primary key)
      "pianoId": 1,                     // Plan ID (primary key)
      "matId": 123,                     // Career segment ID (optional field)
      "schemaId": 122,                  // Plan schema ID (optional field)
      "scePianoId": 2,                  // Plan selection rule ID (primary key)
      "sceltaId": 1234,                 // Regulation selection rule ID
      "ordNum": 12,                     // Display order
      "des": "Descrizione della regola di scelta", // Rule description
      "ptSlotId": 12,                   // Part-time slot ID
      "ptSlotCod": "12",                // Part-time slot code
      "ptSlotDes": "12",                // Part-time slot description (optional field)
      "annoCorso": 1,                   // Course year
      "annoCorsoAnticipo": 1,           // Anticipated course year
      "tipSce": "O",                    // Rule type code
      "tipSceDes": "regola da Elenco",  // Rule type description
      "tipUnt": "CFU",                  // Unit type (CFU, BLK, ANN)
      "minUnt": 1,                      // Minimum units required
      "maxUnt": 1,                      // Maximum units allowed
      "modTAF": "A",                    // TAF mode
      "opzFlg": 0,                      // Optional flag (0=no, 1=yes)
      "tesorettoFlg": 0,                // Tesoretto flag (0=no, 1=yes)
      "sovranFlg": 0,                   // Sovereign flag (0=no, 1=yes)
      "azzeraCfuFlg": 0,                // Reset CFU flag (optional field) (0=no, 1=yes)
      "abilFlg": 0,                     // Enabled flag (optional field) (0=no, 1=yes)
      "regolaSistemaFlg": 0,            // System rule flag (optional field) (0=no, 1=yes)
      "extCod": "EXT_COD"               // External code (optional field)
    }
  ],

  // --- Teaching activities ---
  "attivita": [
    {
      "stuId": 12,                      // Student career ID (primary key)
      "pianoId": 1,                     // Plan ID (primary key)
      "scePianoId": 1,                  // Plan selection rule ID
      "itmId": 12,                      // Activity item ID (primary key)
      "matId": 123,                     // Career segment ID (optional field)
      "schemaId": 122,                  // Plan schema ID (optional field)
      "sceltaId": 1234,                 // Regulation selection rule ID (optional field)
      "sceltaAdId": 0,                  // Regulation activity entry ID
      "chiaveADContestualizzata": {      // Contextualized AD key
        "cdsId": 1,
        "cdsCod": "CDS_AD_1",
        "cdsDes": "Esempio di CDS AD",
        "aaOrdId": 2016,
        "aaOrdCod": "CDS_AD_1",
        "aaOrdDes": "Esempio di CDS AD",
        "pdsId": 1,
        "pdsCod": "PDS_AD_1",
        "pdsDes": "Esempio di PDS AD",
        "aaOffId": 1,
        "adId": 1,
        "adCod": "PDS_AD_1",
        "adDes": "Esempio di PDS AD",
        "afId": 1                       // Teaching load ID
      },
      "adsceId": 1234,                  // Booklet activity ID
      "adsceAttId": 1234,               // Active booklet activity ID
      "sceltaFlg": 1,                   // Selection flag (0=no, 1=yes)
      "tesorettoFlg": 1,                // Tesoretto flag (0=no, 1=yes)
      "ragId": 12,                      // Exam grouping ID
      "adragoffId": 12,                 // Exam grouping offer ID
      "tipoRagCod": "ESA",              // Grouping type code
      "adLibCod": "AD_COD",             // Free activity code
      "adLibDes": "Descrizione attività didattica", // Free activity description
      "peso": 4,                        // Activity weight (CFU)
      "pesoAdVis": 4,                   // Displayed weight
      "linguaSceCod": "eng",            // Selected language code
      "linguaSceNum": 1,                // Selected language number

      // --- Selected teaching units (optional field) ---
      "udSelezionate": [
        {
          "stuId": 0,                   // Student career ID (primary key)
          "pianoId": 0,                 // Plan ID (primary key)
          "itmId": 0,                   // Activity item ID (primary key)
          "matId": 123,                 // Career segment ID (optional field)
          "schemaId": 122,              // Plan schema ID (optional field)
          "scePianoId": 2,              // Plan selection rule ID (optional field)
          "sceltaId": 1234,             // Regulation selection rule ID (optional field)
          "sceltaAdId": 0,              // Regulation activity entry ID (optional field)
          "udId": 0,                    // Teaching unit ID (primary key)
          "udCod": "string",            // Teaching unit code
          "udDes": "string",            // Teaching unit description
          "peso": 4                     // Teaching unit weight (CFU)
        }
      ],

      "conteggiabileFlg": 1,            // Countable flag (optional field) (0=no, 1=yes)
      "deliberaFlg": 1,                 // Deliberation flag (optional field) (0=no, 1=yes)
      "statoAttuazione": 1,             // Activation status (optional field)
      "partEffCod": "S1",               // Effective partition code (optional field)
      "linguaDidId": "1",               // Teaching language ID (optional field)
      "linguaDidCod": "eng",            // Teaching language code (optional field)
      "linguaDidDes": "English",        // Teaching language description (optional field)
      "tipoDidCod": "pres",             // Teaching type code (optional field)
      "tipoDidDes": "In Presenza",      // Teaching type description (optional field)
      "grpAdlogCod": "mat",             // Logistics group code (optional field)
      "grpAdlogDes": "Mattina",         // Logistics group description (optional field)
      "chiavePartizione": {              // Partition key
        "aaOffId": 0,                   // Offer year
        "fatPartCod": "ALF",            // Partition factor code
        "fatPartDes": "Alfabetico",     // Partition factor description (IT)
        "fatPartDesEng": "Alphabetic",  // Partition factor description (EN)
        "domPartCod": "PARI",           // Partition domain code
        "domPartDes": "PARI",           // Partition domain description (IT)
        "domPartDesEng": "ODD",         // Partition domain description (EN)
        "partCod": "S1",                // Partition code
        "partDes": "Primo semestre",    // Partition description (IT)
        "partDesEng": "First Semester", // Partition description (EN)
        "adLogId": 1                    // Logistics sharing ID
      },
      "annoCorso": 1,                   // Course year
      "annoCorsoAnticipo": 1,           // Anticipated course year

      // --- Doctoral info (optional field) ---
      "infoDottorati": {
        "soggettoErogante": "Università La Sapienza", // Provider institution
        "destinazione": "Università La Sapienza",     // Destination institution
        "dataPartenza": "10/10/2020",   // Departure date (DD/MM/YYYY)
        "dataArrivo": "10/10/2020",     // Arrival date (DD/MM/YYYY)
        "noteAd": "10/10/2020",         // Activity notes
        "missioneFlg": 0,               // Mission flag (0=no, 1=yes)
        "ricercaFlg": 0,                // Research flag (0=no, 1=yes)
        "adDes": "Seminario di xxxx",   // Doctoral activity description
        "tipoInsCod": "SEM",            // Insertion type code
        "tipoInsDes": "Seminario"       // Insertion type description
      }
    }
  ],

  // --- Inter-university data (optional field) ---
  "interateneo": {
    "sedeAmmCodeUn": "1",               // Administrative institution code
    "stuId": 0,                         // Student career ID
    "pianoId": 0,                       // Plan ID
    "pianiInterateneo": [ ... ],        // See POST /piani/{stuId} for full structure
    "attivitaInterateneo": [ ... ],     // See POST /piani/{stuId} for full structure
    "segmentiInterateneo": [ ... ]      // See POST /piani/{stuId} for full structure
  }
}
```

<br>

---

<br>

### `GET /piani/{stuId}/{pianoId}/stampa` - Get study plan print (PDF)

```java
/**
 * Returns the PDF printout of a study plan identified by student career ID
 * and plan ID. The print is only available when the plan status is Approved (A),
 * Proposed (P), or Under Review (V), and the student's career status is active.
 *
 * @param stuId   long (path, required) - student career ID
 * @param pianoId long (path, required) - plan ID (sequential per stuId)
 * @return application/octet-stream the PDF binary of the study plan print,
 *         or 422 if the plan is not in a printable state
 */
GET /piani/{stuId}/{pianoId}/stampa
```

**Auth:** `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` · `DOCENTE_PIANI` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

::: warning
The print is only available when the plan status is `A` (Approved), `P` (Proposed), or `V` (Under Review), and the student's career status is active. Requests for plans in other states will return a `422`.
:::

#### Response

**`200 OK`** - returns the PDF as `application/octet-stream`

**`422 Unprocessable Entity`** - error generating the PDF

```json
{
  "statusCode": 200,
  "retCode": -1,
  "retErrMsg": "Parametri non corretti",
  "errDetails": [
    {
      "errorType": "stackTrace",
      "value": "SocketTimeoutException....",
      "rawValue": "SocketTimeoutException...."
    }
  ]
}
```

---

## References

- **Swagger UI:** [Piani Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Piani%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fpiani-service-v1)#/>)
- **Spec YAML:** [p11-pianiApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p11-pianiApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
