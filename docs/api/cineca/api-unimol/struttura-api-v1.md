---
title: Struttura API V1 | OhMyUniversity!
description: REST API documentation for the Struttura service (struttura-service-v1) - access to teaching structures, degree courses, study plans, and academic activities in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Struttura API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Struttura service (struttura-service-v1) - access to teaching structures, degree courses, study plans, and academic activities in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/struttura-api-v1
  - - meta
    - name: keywords
      content: struttura api, teaching structure api, esse3 rest api, cineca api, ohmyuniversity api, corsi di studio, facolta, dipartimento, attivita didattiche, percorsi di studio
  - - meta
    - name: twitter:title
      content: Struttura API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Struttura service (struttura-service-v1) - access to teaching structures, degree courses, study plans, and academic activities in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Struttura API V1

**ENG:** `Teaching Structure`

**Version:** `1.0.0` · **Base URL:** `/struttura-service-v1`

REST API for accessing the teaching structure in ESSE3, including disciplinary areas, degree courses, teaching structures (faculties and departments), study plans, academic activities, and related configuration data.

---

## Changelog

| Version | ESSE3 Release | Changes                                           |
| ------- | ------------- | ------------------------------------------------- |
| 1.1.0   | 19.04.02.00   | Added optional field `struttureCorso` to `/corsi` |

---

## Endpoints - Structure (Struttura)

### `GET /areeDisc` - Get disciplinary areas

```java
/**
 * Returns the list of disciplinary areas, optionally filtered by description.
 *
 * @param areaDiscDes string (query, optional) - disciplinary area description;
 *                                               supports wildcard * for LIKE search
 * @param order       string (query, optional) - sort order; prefix + (ASC) or -
 *                                               (DESC) followed by field name;
 *                                               multiple fields comma-separated
 *                                               (e.g. +areaDiscCod,-areaDiscDes)
 * @return List<AreaDisciplinare> list of disciplinary areas,
 *         or an empty array if none match
 */
GET /areeDisc
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "areaDiscCod": "AREA_1", // Disciplinary area code (primary key)
    "areaDiscDes": "string", // Disciplinary area description (Italian)
    "areaDiscDesEng": "string", // Disciplinary area description (English)
    "ateneoId": 1 // Institution ID
  }
]
```

<br>

---

<br>

### `GET /areeDisc/{areaDiscCod}` - Get disciplinary area by code

```java
/**
 * Returns a specific disciplinary area identified by its code.
 *
 * @param areaDiscCod string (path, required) - disciplinary area code
 * @return AreaDisciplinare the disciplinary area, or 404 if not found
 */
GET /areeDisc/{areaDiscCod}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
{
  "areaDiscCod": "AREA_1", // Disciplinary area code (primary key)
  "areaDiscDes": "string", // Disciplinary area description (Italian)
  "areaDiscDesEng": "string", // Disciplinary area description (English)
  "ateneoId": 1 // Institution ID
}
```

<br>

---

<br>

### `GET /corsi` - Get degree courses

```java
/**
 * Returns the list of degree courses with their teaching structure associations,
 * optionally filtered by code, description, type, modification date, and more.
 *
 * @param cdsCod          string (query, optional) - degree course code
 * @param cdsDes          string (query, optional) - degree course description;
 *                                                    supports wildcard * for LIKE search
 * @param tipoCorsoCod    string (query, optional) - course type code
 * @param dataModCds      string (query, optional) - last modification date
 *                                                    (dd/MM/yyyy, exactly 10 chars)
 * @param sdrFlg          int    (query, optional) - filter by teaching structure
 *                                                    link (1=linked, 0=not linked)
 * @param ordAttivoFlg    int    (query, optional) - filter by active curriculum
 *                                                    (1=active, 0=not active)
 * @param ordAbilImmaFlg  int    (query, optional) - filter by enrollment-enabled
 *                                                    curriculum (1=yes, 0=no)
 * @param tipoCatalogoCod string (query, optional) - catalog type code (max 10 chars)
 * @param tipoCicloFormCod string (query, optional) - training cycle type code
 *                                                    (max 10 chars)
 * @param attivoInAa      int    (query, optional) - filter by structures active
 *                                                    in the given academic year
 * @param facId           int    (query, optional) - teaching structure ID
 * @param q               string (query, optional) - predefined filter shortcode;
 *                                                    STRUTTURE_DEF_AMM = only structures
 *                                                    with def_amm_flg or def_amm_old_flg = 1
 * @param fields          string (query, optional) - comma-separated list of optional
 *                                                    fields to include; use ALL for all
 *                                                    fields; supports Ant Glob Patterns
 *                                                    (e.g. childObj.prop1,
 *                                                    childObj.*, childObj.**)
 * @param optionalFields  string (query, optional) - same as fields; alternative
 *                                                    parameter for optional field selection
 * @param start           int    (query, optional) - index of the first record to load,
 *                                                    defaults to 0
 * @param limit           int    (query, optional) - number of records to retrieve
 *                                                    starting from start, defaults
 *                                                    to 50, allowed range: 0–100
 * @param order           string (query, optional) - sort order; prefix + (ASC) or -
 *                                                    (DESC) followed by field name;
 *                                                    multiple fields comma-separated
 *                                                    (e.g. +cdsCod,-tipoCorsoCod)
 * @return List<CorsoDiStudioConStruttura> paginated list of degree courses,
 *         or an empty array if none match
 */
GET /corsi
```

**Auth:** public - no authentication required

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "cdsId": 1, // Degree course ID (primary key)
    "cdsCod": "string", // Degree course code
    "cdsDes": "string", // Degree course description (Italian)
    "cdsDesEng": "string", // Degree course description (English)
    "cdsDesCert": "string", // Certified description (Italian)
    "cdsDesCertEng": "string", // Certified description (English)
    "cdsDesCertBis": "string", // Alternative certified description (Italian)
    "cdsDesCertBisEng": "string", // Alternative certified description (English)
    "cdsDesCertAlt": "string", // Second alternative certified description (Italian)
    "cdsDesCertAltEng": "string", // Second alternative certified description (English)
    "ateneoId": 1, // Institution ID
    "tipoCorsoCod": "L2", // Course type code
    "tipoCorsoDes": "string", // Course type description (Italian)
    "tipoCorsoDesEng": "string", // Course type description (English)
    "tipoDidCod": "C", // Teaching type code
    "tipoDidDes": "string", // Teaching type description (Italian)
    "tipoDidDesEng": "string", // Teaching type description (English)
    "istatCod": "string", // ISTAT code
    "rifFlg": 0, // Reference flag (1=yes, 0=no)
    "codicione": "string", // Full ministry course code
    "umPesoCod": "C", // Weight unit code
    "umPesoDes": "Crediti", // Weight unit description
    "aaAttId": 2016, // Activation academic year ID
    "aaDisId": 2016, // Deactivation academic year ID
    "tipoSpecCod": "C", // Specialization type code
    "tipoSpecDes": "string", // Specialization type description
    "tipoTititCod": "L2", // Degree title type code
    "tipoTititDes": "string", // Degree title type description (Italian)
    "tipoTititDesEng": "string", // Degree title type description (English)
    "urlSitoWeb": "string", // Course website URL
    "webViewFlg": 0, // Web visibility flag (1=yes, 0=no)
    "normCod": "DM270", // Regulatory framework code
    "normDes": "string", // Regulatory framework description (Italian)
    "normDesEng": "string", // Regulatory framework description (English)
    "claCod": "LM-40", // Degree class code
    "claDes": "string", // Degree class description (Italian)
    "claDesEng": "string", // Degree class description (English)
    "interClaCod": "string", // Inter-class code
    "interClaDes": "string", // Inter-class description (Italian)
    "interClaDesEng": "string", // Inter-class description (English)
    "tipoAccesso": "L,P,T", // Access type (L=free, P=planned, T=restricted)
    "dataModCds": "string", // Last modification date (dd/MM/yyyy)
    "sdrFlg": 1, // Linked to teaching structure (1=yes, 0=no)
    "iscedCod": "string", // ISCED code
    "iscedDes": "string", // ISCED description
    "ordAttivoFlg": 1, // Active curriculum flag (1=yes, 0=no)
    "ordAbilImmaFlg": 1, // Enrollment-enabled curriculum flag (1=yes, 0=no)
    "tipoCatalogoCod": "string", // Catalog type code
    "tipoCatalogoDes": "string", // Catalog type description
    "tipoCicloFormCod": "string", // Training cycle type code
    "tipoCicloFormDes": "string", // Training cycle type description
    "abilImmaWeb": 1, // Web enrollment enabled (1=yes, 0=no)
    "ccRaggrCod": "string", // Grouping code
    "ccMasterFlg": 0, // Master course flag (1=yes, 0=no)
    "urlInfoWeb": "string", // Info website URL
    "facIdDef": 1, // Default faculty ID
    "maxPunti": 110, // Maximum grade points
    "trasmAlmaFlg": 0, // AlmaLaurea transmission flag (1=yes, 0=no)
    "obSvilSosFlg": 0, // Sustainable development flag (1=yes, 0=no)
    "aaOrdAttivo": 2025, // Active curriculum academic year
    "durataAnniOrdAttivo": 3, // Active curriculum duration in years
    "note": "string", // Notes
    "gruppoTcCod": "ALTRO", // Course type group code
    "gruppoTcDes": "string", // Course type group description
    "struttureCorso": [
      // Teaching structure associations (optional field)
      {
        "cdsId": 1, // Degree course ID (primary key)
        "facId": 1, // Teaching structure ID (primary key)
        "facCod": "FAC_1", // Teaching structure code
        "facDes": "string", // Teaching structure description (Italian)
        "facDesEng": "string", // Teaching structure description (English)
        "facCitta": "string", // Teaching structure city
        "defAmmFlg": 0, // Default administrative structure flag (1=yes, 0=no)
        "oldDefAmmFlg": 0, // Old default administrative structure flag (optional field)
        "defStatFlg": 0, // Default statistical structure flag (1=yes, 0=no)
        "defRegCtFlg": 0, // Default regional CT structure flag (1=yes, 0=no)
        "oldDefRegCtFlg": 0, // Old default regional CT structure flag (1=yes, 0=no)
        "racFlg": 0, // RAC flag (optional field)
        "annFlg": 0, // Annual flag (1=yes, 0=no)
        "aaAttId": 2016, // Activation academic year ID
        "aaDisId": 2016, // Deactivation academic year ID
        "csaCod": "string" // CSA code
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

### `GET /corsi/caratteristiche` - Get course characteristics

```java
/**
 * Returns the characteristics of a degree course for a given academic year
 * range. Course code and both year bounds are required.
 *
 * @param cdsCod   string (query, required) - degree course code
 * @param aaInizio int    (query, required) - minimum academic year (exactly 4 digits)
 * @param aaFine   int    (query, required) - maximum academic year (exactly 4 digits)
 * @return List<CaratteristicheCorso> list of course characteristics for the
 *         given year range, or an empty array if none match
 */
GET /corsi/caratteristiche
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "cdsId": 1, // Degree course ID
    "cdsCod": "CDS_COD", // Degree course code
    "carattId": 1, // Characteristic ID
    "tipoCarattCod": "string", // Characteristic type code (e.g. REQ_ACC, OBB_SPEC)
    "ordine": 1, // Display order
    "annoAccademico": 2022, // Academic year
    "sdrTip": "string", // Structure type (e.g. ATE, FAC, CDS, DIP)
    "tipoTestoProgDidCod": "string", // Didactic program text type code
    // (e.g. OBIETT_FORM, PROVA_FINALE)
    "titolo": "string", // Title (Italian)
    "titoloEng": "string", // Title (English)
    "testo": "string", // Content text (Italian)
    "testoEng": "string" // Content text (English)
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

### `GET /corsi/cariche` - Get course positions

```java
/**
 * Returns the institutional positions (cariche) associated with a degree
 * course for a given academic year range. Optionally filtered by validity
 * date range. Course code and both year bounds are required.
 *
 * @param cdsCod       string (query, required)  - degree course code
 * @param aaInizio     int    (query, required)  - minimum academic year (exactly 4 digits)
 * @param aaFine       int    (query, required)  - maximum academic year (exactly 4 digits)
 * @param dataInizioVal string (query, optional) - position validity start date
 *                                                  (dd/MM/yyyy, exactly 10 chars)
 * @param dataFineVal  string (query, optional)  - position validity end date
 *                                                  (dd/MM/yyyy, exactly 10 chars)
 * @return List<CaricaCorso> list of positions for the course and year range,
 *         or an empty array if none match
 */
GET /corsi/cariche
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "annoAccademico": 2022, // Academic year
    "cdsId": 1, // Degree course ID
    "cdsCod": "CDS_COD", // Degree course code
    "caricaId": 1, // Position ID
    "caricaDes": "string", // Position description (Italian)
    "caricaDesEng": "string", // Position description (English)
    "caricaNome": "Paolo", // Position holder first name
    "caricaCognome": "Rossi", // Position holder last name
    "caricaIdAb": 1, // Position holder U-Gov ID
    "tipoUtilizzoId": 1, // Usage type ID
    "ordine": 1, // Display order
    "docenteId": 1, // Teacher ID
    "caricaMatricola": "string", // Position holder ID number
    "caricaCodFis": "string", // Position holder fiscal code
    "dataInizioVal": "string", // Validity start date (dd/MM/yyyy)
    "dataFineVal": "string" // Validity end date (dd/MM/yyyy)
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

### `GET /corsi/scadenze` - Get course deadlines

```java
/**
 * Returns the deadlines associated with a degree course for a specific
 * academic year. Course code and academic year are required.
 *
 * @param cdsCod string (query, required) - degree course code
 * @param aaId   int    (query, required) - academic year (exactly 4 digits)
 * @return List<ScadenzaCorso> list of deadlines for the course and year,
 *         or an empty array if none match
 */
GET /corsi/scadenze
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "annoAccademico": 2022, // Academic year
    "cdsId": 1, // Degree course ID
    "cdsCod": "CDS_COD", // Degree course code
    "scadenzaCod": "IMM_W", // Deadline code
    "scadenzaDes": "string", // Deadline description (Italian)
    "scadenzaDesEng": "string", // Deadline description (English)
    "dataDa": "string", // Start date (dd/MM/yyyy)
    "dataA": "string" // End date (dd/MM/yyyy)
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

### `GET /corsi/tasse` - Get course fees

```java
/**
 * Returns the fees associated with a degree course for a specific academic
 * year. Course code and academic year are required.
 *
 * @param cdsCod string (query, required) - degree course code
 * @param aaId   int    (query, required) - academic year (exactly 4 digits)
 * @return List<TassaCorso> list of fees for the course and year,
 *         or an empty array if none match
 */
GET /corsi/tasse
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "aa_id": 2022, // Academic year ID
    "tipologia": "T", // Fee typology
    "cdsId": 1, // Degree course ID
    "cdsCod": "CDS_COD", // Degree course code
    "voce_id": 1, // Voice ID
    "codice_versamento": "B01", // Payment code
    "descrizione_versamento": "BOLLO", // Payment description
    "importo": 42, // Amount
    "scadenza": "string" // Due date (dd/MM/yyyy)
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

### `GET /corsi/titoli-accesso` - Get course admission requirements

```java
/**
 * Returns the admission title requirements for a degree course, for a
 * specific admission typology. Returns both mandatory titles and optional
 * combinations.
 *
 * @param cdsCod      string (query, required) - degree course code
 * @param tipologiaCod string (query, required) - typology code;
 *                                                AMM=Ammissione, IMM=Immatricolazione,
 *                                                ABBR=Abbreviazione, EQUI=Equipollenza
 * @return List<TitoliAccessoCorso> admission requirements with mandatory titles
 *         and optional combinations, or an empty array if none match
 */
GET /corsi/titoli-accesso
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "cdsId": 1, // Degree course ID
    "cdsCod": "CDS_COD", // Degree course code
    "tipologiaCod": "IMM", // Typology code
    "tipologiaDes": "string", // Typology description
    "titoliObbligatori": [
      // Mandatory admission titles
      {
        "tipoTititCod": "TSS", // Title type code
        "tipiTititDes": "string", // Title type description
        "tipiTititLivello": 0, // Title type level
        "rifFlg": 0, // Reference flag (1=yes, 0=no)
        "statoRichiesto": "C", // Required status code
        "dettagli": [
          // Title detail entries
          {
            "tititCod": "LMG/01", // Specific title code
            "tititDes": "string" // Specific title description
          }
        ]
      }
    ],
    "combinazioniOpzionali": [
      // Optional title combinations
      {
        "combTaDes": "string", // Combination description
        "combTaNota": "string", // Combination note
        "tipiTitolo": [
          // Titles in this combination
          {
            "tipoTititCod": "L1", // Title type code
            "tipiTititDes": "string", // Title type description
            "tipiTititLivello": 2, // Title type level
            "votoMinimo": 100, // Minimum grade required
            "rifFlg": 1, // Reference flag (1=yes, 0=no)
            "statoRichiesto": "I", // Required status code
            "dettagli": [
              // Title detail entries
              {
                "tititCod": "LMG/01", // Specific title code
                "tititDes": "string" // Specific title description
              }
            ]
          }
        ]
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /corsi/{cdsId}` - Get degree course by ID

```java
/**
 * Returns the full details of a specific degree course identified by its ID,
 * including optional teaching structure associations.
 *
 * @param cdsId          long   (path, required)  - degree course ID
 * @param fields         string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @param optionalFields string (query, optional) - same as fields; alternative
 *                                                   parameter for optional field
 *                                                   selection
 * @param q              string (query, optional) - predefined filter shortcode;
 *                                                   STRUTTURE_DEF_AMM = only structures
 *                                                   with def_amm_flg or
 *                                                   def_amm_old_flg = 1
 * @return CorsoDiStudioConStruttura degree course details,
 *         or 404 if not found
 */
GET /corsi/{cdsId}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as a single entry in [`GET /corsi`](#get-corsi-get-degree-courses), returned as a single object rather than an array.

```json
{
  "cdsId": 1,
  "cdsCod": "string",
  "cdsDes": "string",
  // ... all fields as documented in GET /corsi
  "struttureCorso": [
    /* optional field */
  ]
}
```

<br>

---

<br>

### `GET /corsi/{cdsId}/ordinamenti` - Get course curricula

```java
/**
 * Returns the list of curricula (ordinamenti) for a specific degree course,
 * including teaching languages, didactic regulations, and optionally PhD
 * sector information.
 *
 * @param cdsId          long   (path, required)  - degree course ID
 * @param optionalFields string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @return List<OrdinamentoConSettoriDottorato> list of curricula for the course,
 *         or an empty array if none are found
 */
GET /corsi/{cdsId}/ordinamenti
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "cdsId": 1, // Degree course ID (primary key)
    "aaOrdId": 2016, // Curriculum academic year ID (primary key)
    "cdsOrdCod": "CDS_1", // Curriculum code
    "cdsOrdDes": "string", // Curriculum description (Italian)
    "cdsOrdDesEng": "string", // Curriculum description (English)
    "cdsOrdDesCert": "string", // Certified curriculum description (Italian)
    "cdsOrdDesCertEng": "string", // Certified curriculum description (English)
    "statoCod": "A", // Status code
    "aaOrdCessId": 2016, // Cessation academic year ID
    "valoreMin": 180, // Minimum credit value
    "durataAnni": 3, // Duration in years
    "durataEffettiva": 3, // Effective duration in years
    "umDurata": "A", // Duration unit (optional field)
    "scuolaDottId": 3, // PhD school ID (optional field)
    "scuolaDottDes": "string", // PhD school description (optional field)

    "lingueDidattica": [
      // Teaching languages
      {
        "cdsId": 1, // Degree course ID (primary key)
        "aaOrdId": 2016, // Curriculum academic year ID (primary key)
        "linguaDidId": 1, // Teaching language ID (primary key)
        "linguaDidCod": "string", // ISO 639-2 language code
        "linguaDidDes": "string", // Language description
        "linguaDidDesEng": "string" // Language description (English)
      }
    ],

    "regolamentiDidattici": [
      // Didactic regulations (optional field)
      {
        "regdidId": 1, // Regulation ID (primary key)
        "aaRegdidId": 2016, // Regulation academic year ID
        "regdidCod": "RD_1", // Regulation code
        "regdidDes": "string", // Regulation description
        "radCod": "RAD_1", // RAD code
        "ateneiConsorziati": [
          // Consortium institutions
          {
            "sdrId": 1, // Teaching structure ID
            "ateneoId": 1, // Institution ID
            "ateneoCod": "ATE_1", // Institution code
            "ateneoDes": "string", // Institution description
            "atestraFlg": 0 // Foreign institution flag (1=yes, 0=no)
          }
        ]
      }
    ],

    "settoriDottorato": [
      // PhD sectors (optional field)
      {
        "cdsId": 1, // Degree course ID (primary key)
        "aaOrdId": 2016, // Curriculum academic year ID (primary key)
        "settCod": "MAT01", // Sector code
        "settDes": "string", // Sector description (Italian)
        "settDesEng": "string", // Sector description (English)
        "prevalenteFlg": 0, // Prevalent sector flag (1=yes, 0=no)
        "areaCod": "2", // Area code
        "areaDes": "string", // Area description (Italian)
        "areaDesEng": "string" // Area description (English)
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /corsi/{cdsId}/ordinamenti/{aaOrdId}` - Get curriculum by ID

```java
/**
 * Returns the details of a specific curriculum (ordinamento) identified by
 * degree course ID and curriculum academic year, including teaching languages,
 * didactic regulations, and optionally PhD sector information.
 *
 * @param cdsId          long   (path, required)  - degree course ID
 * @param aaOrdId        int    (path, required)  - curriculum academic year ID
 *                                                   (exactly 4 digits)
 * @param optionalFields string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @return OrdinamentoConSettoriDottorato curriculum details,
 *         or 404 if not found
 */
GET /corsi/{cdsId}/ordinamenti/{aaOrdId}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as a single entry in [`GET /corsi/{cdsId}/ordinamenti`](#get-corsi-cdsid-ordinamenti-get-course-curricula), returned as a single object rather than an array.

```json
{
  "cdsId": 1,
  "aaOrdId": 2016,
  "cdsOrdCod": "string",
  "cdsOrdDes": "string",
  // ... all fields as documented in GET /corsi/{cdsId}/ordinamenti
  "lingueDidattica": [
    /* ... */
  ],
  "regolamentiDidattici": [
    /* optional field */
  ],
  "settoriDottorato": [
    /* optional field */
  ]
}
```

<br>

---

<br>

### `GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/percorsi` - Get study plans

```java
/**
 * Returns the list of study plans (percorsi di studio) for a specific
 * curriculum, including their teaching languages.
 *
 * @param cdsId   long (path, required) - degree course ID
 * @param aaOrdId int  (path, required) - curriculum academic year ID
 *                                         (exactly 4 digits)
 * @return List<PercorsoDiStudio> list of study plans for the curriculum,
 *         or an empty array if none are found
 */
GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/percorsi
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "cdsId": 1, // Degree course ID (primary key)
    "aaOrdId": 2016, // Curriculum academic year ID (primary key)
    "pdsId": 9999, // Study plan ID (primary key)
    "pdsCod": "PDS_1", // Study plan code
    "pdsDes": "string", // Study plan description (Italian)
    "pdsDesEng": "string", // Study plan description (English)
    "statoCod": "A", // Status code
    "webViewFlg": 0, // Web visibility flag (1=yes, 0=no)
    "lingueDidattica": [
      // Teaching languages
      {
        "cdsId": 1, // Degree course ID (primary key)
        "aaOrdId": 2016, // Curriculum academic year ID (primary key)
        "pdsId": 9999, // Study plan ID (primary key)
        "linguaDidId": 1, // Teaching language ID (primary key)
        "linguaDidCod": "string", // ISO 639-2 language code
        "linguaDidDes": "string", // Language description
        "linguaDidDesEng": "string" // Language description (English)
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/percorsi/{pdsId}` - Get study plan by ID

```java
/**
 * Returns the details of a specific study plan (percorso di studio)
 * identified by degree course ID, curriculum academic year, and study
 * plan ID.
 *
 * @param cdsId   long (path, required) - degree course ID
 * @param aaOrdId int  (path, required) - curriculum academic year ID
 *                                         (exactly 4 digits)
 * @param pdsId   long (path, required) - study plan ID
 * @return PercorsoDiStudio study plan details, or 404 if not found
 */
GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/percorsi/{pdsId}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as a single entry in [`GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/percorsi`](#get-corsi-cdsid-ordinamenti-aaordid-percorsi-get-study-plans), returned as a single object rather than an array.

```json
{
  "cdsId": 1,
  "aaOrdId": 2016,
  "pdsId": 9999,
  "pdsCod": "string",
  "pdsDes": "string",
  "pdsDesEng": "string",
  "statoCod": "A",
  "webViewFlg": 0,
  "lingueDidattica": [
    /* ... */
  ]
}
```

<br>

---

<br>

### `GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/percorsi/{pdsId}/titoli-accesso/{tipologiaCod}` - Get study plan admission requirements

```java
/**
 * Returns the admission title requirements for a specific study plan,
 * curriculum, and admission typology.
 *
 * @param cdsId        long   (path, required) - degree course ID
 * @param aaOrdId      int    (path, required) - curriculum academic year ID
 *                                               (exactly 4 digits)
 * @param pdsId        long   (path, required) - study plan ID
 * @param tipologiaCod string (path, required) - typology code;
 *                                               AMM=Ammissione, IMM=Immatricolazione,
 *                                               ABBR=Abbreviazione, EQUI=Equipollenza
 * @return List<TitoliAccessoPds> admission requirements with mandatory titles
 *         and optional combinations, or an empty array if none match
 */
GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/percorsi/{pdsId}/titoli-accesso/{tipologiaCod}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as [`GET /corsi/titoli-accesso`](#get-corsi-titoli-accesso-get-course-admission-requirements), scoped to the specific study plan and curriculum.

```json
[
  {
    "cdsId": 1, // Degree course ID
    "tipologiaCod": "IMM", // Typology code
    "tipologiaDes": "string", // Typology description
    "titoliObbligatori": [
      // Mandatory admission titles
      {
        "tipoTititCod": "TSS", // Title type code
        "tipiTititDes": "string", // Title type description
        "tipiTititLivello": 0, // Title type level
        "rifFlg": 0, // Reference flag (1=yes, 0=no)
        "statoRichiesto": "C", // Required status code
        "dettagli": [
          {
            "tititCod": "LMG/01", // Specific title code
            "tititDes": "string" // Specific title description
          }
        ]
      }
    ],
    "combinazioniOpzionali": [
      // Optional title combinations
      {
        "combTaDes": "string", // Combination description
        "combTaNota": "string", // Combination note
        "tipiTitolo": [
          {
            "tipoTititCod": "L1", // Title type code
            "tipiTititDes": "string", // Title type description
            "tipiTititLivello": 2, // Title type level
            "votoMinimo": 100, // Minimum grade required
            "rifFlg": 1, // Reference flag (1=yes, 0=no)
            "statoRichiesto": "I", // Required status code
            "dettagli": [
              {
                "tititCod": "LMG/01", // Specific title code
                "tititDes": "string" // Specific title description
              }
            ]
          }
        ]
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/titoli-accesso/{tipologiaCod}` - Get curriculum admission requirements

```java
/**
 * Returns the admission title requirements for a specific curriculum
 * and admission typology.
 *
 * @param cdsId        long   (path, required) - degree course ID
 * @param aaOrdId      int    (path, required) - curriculum academic year ID
 *                                               (exactly 4 digits)
 * @param tipologiaCod string (path, required) - typology code;
 *                                               AMM=Ammissione, IMM=Immatricolazione,
 *                                               ABBR=Abbreviazione, EQUI=Equipollenza
 * @return List<TitoliAccessoOrd> admission requirements with mandatory titles
 *         and optional combinations, or an empty array if none match
 */
GET /corsi/{cdsId}/ordinamenti/{aaOrdId}/titoli-accesso/{tipologiaCod}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as [`GET /corsi/titoli-accesso`](#get-corsi-titoli-accesso-get-course-admission-requirements), scoped to the specific curriculum.

```json
[
  {
    "cdsId": 1, // Degree course ID
    "tipologiaCod": "IMM", // Typology code
    "tipologiaDes": "string", // Typology description
    "titoliObbligatori": [
      // Mandatory admission titles
      {
        "tipoTititCod": "TSS", // Title type code
        "tipiTititDes": "string", // Title type description
        "tipiTititLivello": 0, // Title type level
        "rifFlg": 0, // Reference flag (1=yes, 0=no)
        "statoRichiesto": "C", // Required status code
        "dettagli": [
          {
            "tititCod": "LMG/01", // Specific title code
            "tititDes": "string" // Specific title description
          }
        ]
      }
    ],
    "combinazioniOpzionali": [
      // Optional title combinations
      {
        "combTaDes": "string", // Combination description
        "combTaNota": "string", // Combination note
        "tipiTitolo": [
          {
            "tipoTititCod": "L1", // Title type code
            "tipiTititDes": "string", // Title type description
            "tipiTititLivello": 2, // Title type level
            "votoMinimo": 100, // Minimum grade required
            "rifFlg": 1, // Reference flag (1=yes, 0=no)
            "statoRichiesto": "I", // Required status code
            "dettagli": [
              {
                "tititCod": "LMG/01", // Specific title code
                "tititDes": "string" // Specific title description
              }
            ]
          }
        ]
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /corsi/{cdsId}/titoli-accesso/{tipologiaCod}` - Get course admission requirements by ID

```java
/**
 * Returns the admission title requirements for the currently active curriculum
 * of a specific degree course and admission typology. Uses the maximum active
 * curriculum year automatically.
 *
 * @param cdsId        long   (path, required) - degree course ID
 * @param tipologiaCod string (path, required) - typology code;
 *                                               AMM=Ammissione, IMM=Immatricolazione,
 *                                               ABBR=Abbreviazione, EQUI=Equipollenza
 * @return List<TitoliAccesso> admission requirements with mandatory titles
 *         and optional combinations, or an empty array if none match
 */
GET /corsi/{cdsId}/titoli-accesso/{tipologiaCod}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as [`GET /corsi/titoli-accesso`](#get-corsi-titoli-accesso-get-course-admission-requirements), scoped to the active curriculum of the given course.

```json
[
  {
    "cdsId": 1, // Degree course ID
    "tipologiaCod": "IMM", // Typology code
    "tipologiaDes": "string", // Typology description
    "titoliObbligatori": [
      // Mandatory admission titles
      {
        "tipoTititCod": "TSS", // Title type code
        "tipiTititDes": "string", // Title type description
        "tipiTititLivello": 0, // Title type level
        "rifFlg": 0, // Reference flag (1=yes, 0=no)
        "statoRichiesto": "C", // Required status code
        "dettagli": [
          {
            "tititCod": "LMG/01", // Specific title code
            "tititDes": "string" // Specific title description
          }
        ]
      }
    ],
    "combinazioniOpzionali": [
      // Optional title combinations
      {
        "combTaDes": "string", // Combination description
        "combTaNota": "string", // Combination note
        "tipiTitolo": [
          {
            "tipoTititCod": "L1", // Title type code
            "tipiTititDes": "string", // Title type description
            "tipiTititLivello": 2, // Title type level
            "votoMinimo": 100, // Minimum grade required
            "rifFlg": 1, // Reference flag (1=yes, 0=no)
            "statoRichiesto": "I", // Required status code
            "dettagli": [
              {
                "tititCod": "LMG/01", // Specific title code
                "tititDes": "string" // Specific title description
              }
            ]
          }
        ]
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /corsiEliminati` - Get deleted degree courses

```java
/**
 * Returns the list of deleted degree courses with their deletion date,
 * optionally filtered by last modification date.
 *
 * @param dataModCds string (query, optional) - last modification date filter
 *                                              (dd/MM/yyyy, exactly 10 chars)
 * @param start      int    (query, optional) - index of the first record to load,
 *                                              defaults to 0
 * @param limit      int    (query, optional) - number of records to retrieve
 *                                              starting from start, defaults
 *                                              to 50, allowed range: 0–100
 * @param order      string (query, optional) - sort order; prefix + (ASC) or -
 *                                              (DESC) followed by field name;
 *                                              multiple fields comma-separated
 *                                              (e.g. +cdsId,-dataModCds)
 * @return List<CorsoDiStudioEliminato> paginated list of deleted degree courses,
 *         or an empty array if none match
 */
GET /corsiEliminati
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "cdsId": 1, // Degree course ID (primary key)
    "dataModCds": "string" // Deletion date (dd/MM/yyyy)
  }
]
```

<br>

---

<br>

### `GET /corsiFull/{cdsId}` - Get full degree course details

```java
/**
 * Returns the full details of a degree course including all related data:
 * curricula with study plans, locations, teaching structures, positions,
 * characteristics, deadlines, fees, admission titles, academic periods,
 * consortium courses, cohorts, and optionally enrollment statistics and
 * admission tests.
 *
 * @param cdsId          long   (path, required)  - degree course ID
 * @param tipoUtilizzoId long   (query, optional) - usage type ID for positions
 * @param ordAttivoFlg   int    (query, optional) - filter by active curriculum
 *                                                   (1=active, 0=not active)
 * @param ordAbilImmaFlg int    (query, optional) - filter by enrollment-enabled
 *                                                   curriculum (1=yes, 0=no)
 * @param optionalFields string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; supports Ant Glob
 *                                                   Patterns (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @return CorsoDiStudioConDettagli full degree course object,
 *         or 404 if not found
 */
GET /corsiFull/{cdsId}
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  // Core degree course fields - same as GET /corsi/{cdsId}
  "cdsId": 1,
  "cdsCod": "string",
  "cdsDes": "string",
  // ...

  // Curricula with study plans
  "ordinamentiConPercorsi": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "aaOrdId": 2016, // Curriculum academic year ID (primary key)
      "cdsOrdCod": "string", // Curriculum code
      "cdsOrdDes": "string", // Curriculum description (Italian)
      "cdsOrdDesEng": "string", // Curriculum description (English)
      "cdsOrdDesCert": "string", // Certified description (Italian)
      "cdsOrdDesCertEng": "string", // Certified description (English)
      "statoCod": "A", // Status code
      "aaOrdCessId": 2016, // Cessation academic year ID
      "valoreMin": 180, // Minimum credit value
      "durataAnni": 3, // Duration in years
      "durataEffettiva": 3, // Effective duration in years
      "umDurata": "A", // Duration unit (optional field)
      "scuolaDottId": 3, // PhD school ID (optional field)
      "scuolaDottDes": "string", // PhD school description (optional field)
      "lingueDidattica": [
        /* ... */
      ], // Teaching languages
      "regolamentiDidattici": [
        /* ... */
      ], // Didactic regulations (optional field)
      "percorsiDiStudio": [
        // Study plans
        {
          "cdsId": 1, // Degree course ID (primary key)
          "aaOrdId": 2016, // Curriculum academic year ID (primary key)
          "pdsId": 9999, // Study plan ID (primary key)
          "pdsCod": "PDS_1", // Study plan code
          "pdsDes": "string", // Study plan description (Italian)
          "pdsDesEng": "string", // Study plan description (English)
          "statoCod": "A", // Status code
          "webViewFlg": 0, // Web visibility flag (1=yes, 0=no)
          "lingueDidattica": [
            /* ... */
          ] // Teaching languages
        }
      ]
    }
  ],

  // Locations
  "sediCorso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "ateneoId": 78, // Institution ID
      "sedeId": 1, // Location ID (primary key)
      "sedeDes": "string", // Location description (Italian)
      "sedeDesEng": "string", // Location description (English)
      "defDidFlg": 0, // Default teaching location flag (1=yes, 0=no)
      "codStatMiur": "string", // MIUR statistical code
      "dataIniVal": "string", // Validity start date (dd/MM/yyyy)
      "dataFineVal": "string" // Validity end date (dd/MM/yyyy)
    }
  ],

  // Teaching structures
  "struttureCorso": [
    /* same as GET /corsi */
  ],

  // Positions
  "caricheCorso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "caricaId": 1, // Position ID
      "caricaNome": "string", // Position holder first name
      "caricaCognome": "string", // Position holder last name
      "caricaDes": "string", // Position description (Italian)
      "caricaDesEng": "string", // Position description (English)
      "ordine": 1, // Display order
      "tipoUtilizzoId": 1, // Usage type ID
      "caricaIdAb": 1, // Position holder U-Gov ID
      "caricaMatricola": "string", // Position holder ID number
      "caricaCodFis": "string" // Position holder fiscal code
    }
  ],

  // Characteristics
  "caratteristicheCorso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "aaId": 2016, // Academic year ID
      "tipoCarattCod": "string", // Characteristic type code
      "tipoTestoProgDidCod": "string", // Didactic program text type code
      "carattTitolo": "string", // Characteristic title (Italian)
      "carattTitoloEng": "string", // Characteristic title (English)
      "carattTesto": "string", // Characteristic text (Italian)
      "carattTestoEng": "string", // Characteristic text (English)
      "ordine": 1 // Display order
    }
  ],

  // Deadlines
  "scadenzeCorso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "aaId": 2016, // Academic year ID
      "scadenzaDes": "string", // Deadline description (Italian)
      "scadenzaDesEng": "string", // Deadline description (English)
      "scadenzaDtaInizio": "string", // Start date (dd/MM/yyyy)
      "scadenzaDtaFine": "string" // End date (dd/MM/yyyy)
    }
  ],

  // Fees
  "tasseCorso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "aaId": 2016, // Academic year ID
      "causale": "string", // Fee reason
      "importo": 140, // Amount
      "scadenzaDta": "string" // Due date (dd/MM/yyyy)
    }
  ],

  // Admission titles
  "titoliAccesso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "aaOrdId": 2016, // Curriculum academic year ID
      "combtitPrg": 1, // Combination title progressive
      "tipoTititCod": "string", // Title type code (primary key)
      "tipoTititDes": "string", // Title type description (Italian)
      "tipoTititDesEng": "string" // Title type description (English)
    }
  ],

  // Academic periods
  "periodiCorso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "aaId": 2017, // Academic year ID
      "partCod": "S1", // Period code
      "partDes": "string", // Period description (Italian)
      "partDesEng": "string", // Period description (English)
      "dataInizio": "string", // Start date (dd/MM/yyyy)
      "dataFine": "string", // End date (dd/MM/yyyy)
      "durata": 3.2 // Duration in months
    }
  ],

  // Consortium courses
  "corsiConsorziati": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "ateneoId": 1, // Institution ID
      "ateneoDes": "string", // Institution description (Italian)
      "ateneoDesEng": "string", // Institution description (English)
      "cdsAteId": 1, // Course at institution ID
      "cdsAteneiItaDes": "string", // Course description at Italian institution
      "atestraId": 1, // Foreign institution ID
      "atestraDes": "string", // Foreign institution description
      "cdsDes": "string", // Course description (Italian)
      "cdsStraDes": "string" // Course description (foreign institution)
    }
  ],

  // Teaching types
  "tipiDidattica": [
    {
      "cdsId": 1, // Degree course ID
      "tipoDidCod": "string", // Teaching type code
      "tipoDidDes": "string", // Teaching type description (Italian)
      "tipoDidDesEng": "string" // Teaching type description (English)
    }
  ],

  // Cohorts (optional field)
  "coortiCorso": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "aaRegId": 2016 // Cohort academic year ID
    }
  ],

  // Enrolled students per year (optional field)
  "iscrittiCdsPerAnno": [
    {
      "annoCorso": 1, // Course year
      "tipoIscrCod": "IC", // Enrollment type code
      "tipoIscrDes": "string", // Enrollment type description
      "numIscritti": 25 // Number of enrolled students
    }
  ],

  // Admission tests (optional field)
  "listaConc": [
    {
      "cdsId": 1, // Degree course ID (primary key)
      "tipoCorsoCod": "L2", // Course type code
      "aaId": 2025, // Academic year ID
      "testId": 1, // Test ID (primary key)
      "concorsoDes": "string", // Admission test description
      "tipoTestCod": "A", // Test type code
      "tipoTestDes": "string", // Test type description
      "dataIniAmmWeb": "string", // Web admission start date (dd/MM/yyyy)
      "dataFinAmmWeb": "string", // Web admission end date (dd/MM/yyyy)
      "dataScad": "string", // Expiry date (dd/MM/yyyy)
      "dataScadPreim": "string" // Pre-enrollment expiry date (dd/MM/yyyy)
    }
  ]
}
```

<br>

---

<br>

### `GET /entiEsterni` - Get external entities

```java
/**
 * Returns the list of external entities, optionally filtered by ID, type
 * code, entity code, and entity category.
 *
 * @param enteId      int    (query, optional) - external entity ID
 * @param tipoEnteCod string (query, optional) - entity type code (max 5 chars)
 * @param enteCod     string (query, optional) - entity code (max 10 chars)
 * @param tipoEnte    string (query, optional) - entity category filter;
 *                                               AZIENDA, AGENZIA, or ALL
 * @param start       int    (query, optional) - index of the first record to load,
 *                                               defaults to 0
 * @param limit       int    (query, optional) - number of records to retrieve
 *                                               starting from start, defaults
 *                                               to 50, allowed range: 0–100
 * @param order       string (query, optional) - sort order; prefix + (ASC) or -
 *                                               (DESC) followed by field name;
 *                                               multiple fields comma-separated
 *                                               (e.g. +enteCod,-tipoEnteCod)
 * @return List<EnteEsterno> paginated list of external entities,
 *         or an empty array if none match
 */
GET /entiEsterni
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "enteId": 1, // External entity ID (primary key)
    "enteCod": "string", // Entity code
    "des": "string", // Description
    "desEstesa": "string", // Extended description
    "via": "string", // Street address
    "cap": "string", // Postal code
    "cf": "string", // Fiscal code
    "piva": "string", // VAT number
    "direttore": "string", // Director name
    "tipoEnteCod": "E_RIC", // Entity type code
    "tipiEnteRic": "string", // Entity type description
    "nazioneId": 1, // Country ID
    "nazioneCodFisc": "string", // Country fiscal code
    "nazioneDes": "string", // Country description
    "comuneId": 1, // Municipality ID
    "comuneCod": "string", // Municipality code
    "comuneDes": "string", // Municipality description
    "aziendaFlg": 1, // Company flag (1=yes, 0=no)
    "agenziaFlg": 1 // Agency flag (1=yes, 0=no)
  }
]
```

<br>

---

<br>

### `GET /sedi` - Get institution locations

```java
/**
 * Returns the list of institution locations (sedi), optionally filtered
 * by description, faculty, degree course, or department.
 *
 * @param sedeDes string (query, optional) - location description;
 *                                           supports wildcard * for LIKE search
 * @param idFac   long   (query, optional) - faculty ID
 * @param idCds   long   (query, optional) - degree course ID
 * @param idDip   long   (query, optional) - department ID
 * @param fields  string (query, optional) - comma-separated list of optional
 *                                           fields to include; use ALL for all
 *                                           fields; supports Ant Glob Patterns
 *                                           (e.g. childObj.prop1,
 *                                           childObj.*, childObj.**)
 * @param order   string (query, optional) - sort order; prefix + (ASC) or -
 *                                           (DESC) followed by field name;
 *                                           multiple fields comma-separated
 *                                           (e.g. +sedeDes,-sedeId)
 * @return List<Sede> list of institution locations, or an empty array if
 *         none match
 */
GET /sedi
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "sedeId": 1, // Location ID (primary key)
    "ateneoId": 1, // Institution ID
    "sedeDes": "Roma", // Location description (Italian)
    "sedeDesEng": "Rome", // Location description (English)
    "cap": "string", // Postal code
    "via": "string", // Street address
    "direttore": "string", // Director name
    "citta": "string", // City (Italian)
    "cistra": "string", // City (foreign)
    "istatCod": "string", // ISTAT code
    "tel": "string", // Phone number
    "fax": "string", // Fax number
    "email": "string", // Email address
    "urlSitoWeb": "string", // Website URL
    "webViewFlg": 0, // Web visibility flag (1=yes, 0=no)
    "sedePrincipaleFlg": 0, // Main location flag (1=yes, 0=no)
    "provincia": "string", // Province code
    "nazione": "string" // Country
  }
]
```

<br>

---

<br>

### `GET /sedi/{sedeId}` - Get location by ID

```java
/**
 * Returns the details of a specific institution location identified by its ID.
 *
 * @param sedeId long (path, required) - location ID
 * @return Sede location details, or 404 if not found
 */
GET /sedi/{sedeId}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as a single entry in [`GET /sedi`](#get-sedi-get-institution-locations), returned as a single object rather than an array.

```json
{
  "sedeId": 1,
  "ateneoId": 1,
  "sedeDes": "string",
  "sedeDesEng": "string",
  "cap": "string",
  "via": "string",
  "direttore": "string",
  "citta": "string",
  "cistra": "string",
  "istatCod": "string",
  "tel": "string",
  "fax": "string",
  "email": "string",
  "urlSitoWeb": "string",
  "webViewFlg": 0,
  "sedePrincipaleFlg": 0,
  "provincia": "string",
  "nazione": "string"
}
```

<br>

---

<br>

### `GET /strutture` - Get teaching structures

```java
/**
 * Returns the list of teaching structures (faculties, departments, etc.),
 * optionally filtered by code, description, type, academic year, and
 * degree course. Location data is not included by default - use
 * optionalFields=sediStruttura to retrieve it.
 *
 * @param facCod       string (query, optional) - teaching structure code
 * @param facDes       string (query, optional) - teaching structure description;
 *                                                supports wildcard * for LIKE search
 * @param sdrTip       string (query, optional) - structure type (FAC=Facoltà,
 *                                                DIP=Dipartimento)
 * @param attivoInAa   int    (query, optional) - filter by structures active in
 *                                                the given academic year
 * @param cdsCod       string (query, optional) - degree course code
 * @param optionalFields string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; use sediStruttura
 *                                                   to include location data;
 *                                                   supports Ant Glob Patterns
 *                                                   (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @param fields       string (query, optional) - same as optionalFields; alternative
 *                                                parameter for optional field selection
 * @param filter       string (query, optional) - RSQL filter expression applied
 *                                                after data retrieval
 * @param order        string (query, optional) - sort order; prefix + (ASC) or -
 *                                                (DESC) followed by field name;
 *                                                multiple fields comma-separated
 *                                                (e.g. +facCod,-sdrTip)
 * @return List<StrutturaConSedi> list of teaching structures,
 *         or an empty array if none match
 */
GET /strutture
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "facId": 1, // Teaching structure ID (primary key)
    "istatCod": "string", // ISTAT code
    "facCod": "FAC_1", // Teaching structure code
    "facDes": "string", // Teaching structure description (Italian)
    "facDesEng": "string", // Teaching structure description (English)
    "ateneoId": 1, // Institution ID
    "citta": "string", // City
    "via": "string", // Street address
    "prov": "string", // Province code
    "cap": "string", // Postal code
    "codFis": "string", // Fiscal code
    "aaAttId": 2016, // Activation academic year ID
    "aaDisId": 2016, // Deactivation academic year ID
    "urlSitoWeb": "string", // Website URL
    "webViewFlg": 0, // Web visibility flag (1=yes, 0=no)
    "tel": "string", // Phone number
    "fax": "string", // Fax number
    "email": "string", // Email address
    "codStatMiur": "string", // MIUR statistical code
    "csaCod": "string", // CSA code
    "sdrTip": "FAC", // Structure type (FAC/DIP)
    "areaDiscCod": "string", // Disciplinary area code
    "areaDiscDesEng": "string", // Disciplinary area description (English)
    "sediStruttura": [
      // Linked locations (optional field)
      {
        "facId": 1, // Teaching structure ID (primary key)
        "sedeId": 1, // Location ID (primary key)
        "sedeDes": "string", // Location description (Italian)
        "sedeDesEng": "string", // Location description (English)
        "defAmmFlg": 0 // Default administrative location flag (1=yes, 0=no)
      }
    ],
    "tipiCorsoStruttura": [
      // Course types linked to structure (optional field)
      {
        "facId": 1, // Teaching structure ID (primary key)
        "cdsId": 12, // Degree course ID
        "tipoCorsoCod": "L2", // Course type code
        "tipoCorsoDes": "string" // Course type description
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

### `GET /strutture/{facId}` - Get teaching structure by ID

```java
/**
 * Returns the details of a specific teaching structure (faculty, department,
 * etc.) identified by its ID. Location data is available as an optional field.
 *
 * @param facId          long   (path, required)  - teaching structure ID
 * @param optionalFields string (query, optional) - comma-separated list of optional
 *                                                   fields to include; use ALL for
 *                                                   all fields; use sediStruttura
 *                                                   to include location data;
 *                                                   supports Ant Glob Patterns
 *                                                   (e.g. childObj.prop1,
 *                                                   childObj.*, childObj.**)
 * @return StrutturaConSedi teaching structure details, or 404 if not found
 */
GET /strutture/{facId}
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

Same structure as a single entry in [`GET /strutture`](#get-strutture-get-teaching-structures), returned as a single object rather than an array.

```json
{
  "facId": 1,
  "istatCod": "string",
  "facCod": "FAC_1",
  "facDes": "string",
  "facDesEng": "string",
  "ateneoId": 1,
  "citta": "string",
  "via": "string",
  "prov": "string",
  "cap": "string",
  "codFis": "string",
  "aaAttId": 2016,
  "aaDisId": 2016,
  "urlSitoWeb": "string",
  "webViewFlg": 0,
  "tel": "string",
  "fax": "string",
  "email": "string",
  "codStatMiur": "string",
  "csaCod": "string",
  "sdrTip": "FAC",
  "areaDiscCod": "string",
  "areaDiscDesEng": "string",
  "sediStruttura": [
    /* optional field */
  ],
  "tipiCorsoStruttura": [
    /* optional field */
  ]
}
```

<br>

---

<br>

### `GET /tipiCorso` - Get course types

```java
/**
 * Returns the list of degree course types, optionally filtered by code,
 * description, faculty, and various type flags.
 *
 * @param tipoCorsoCod  string (query, optional) - course type code
 * @param tipoCorsoDes  string (query, optional) - course type description;
 *                                                  supports wildcard * for LIKE search
 * @param facId         int    (query, optional) - teaching structure ID
 * @param dottoratoFlg  int    (query, optional) - filter by PhD programs
 *                                                  (1=PhD only, 0=exclude PhD)
 * @param scuolaSpecFlg int    (query, optional) - filter by specialization schools
 *                                                  (1=specialization only,
 *                                                  0=exclude specialization)
 * @param gruppoTcCod   string (query, optional) - course type group code
 * @param order         string (query, optional) - sort order; prefix + (ASC) or -
 *                                                  (DESC) followed by field name;
 *                                                  multiple fields comma-separated
 *                                                  (e.g. +tipoCorsoCod,-livello)
 * @return List<TipoCorso> list of course types, or an empty array if none match
 */
GET /tipiCorso
```

**Auth:** public - no authentication required

**Cache:** `configuration` - configuration resource, very slow-changing, HTTP cache and server cache enabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoCorsoCod": "L2", // Course type code
    "tipoCorsoDes": "string", // Course type description (Italian)
    "tipoCorsoDesEng": "string", // Course type description (English)
    "durataAnni": 3, // Standard duration in years
    "umDurata": "A", // Duration unit
    "durataEffettiva": 3, // Effective duration in years
    "valoreMin": 1, // Minimum credit value
    "rifFlg": 0, // Reference flag (1=yes, 0=no)
    "livello": 0, // Level
    "dottoratoFlg": 0, // PhD program flag (1=yes, 0=no)
    "scuolaSpecFlg": 0, // Specialization school flag (1=yes, 0=no)
    "domCtFlg": 0, // CT domain flag (1=yes, 0=no)
    "gruppoTcCod": "ALTRO", // Course type group code
    "gruppoTcDes": "string", // Course type group description
    "almaCod": "M1" // AlmaLaurea code
  }
]
```

<br>

---

<br>

---

## References

- **Swagger UI:** [Struttura Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Struttura%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fstruttura-service-v1)#/>)
- **Spec YAML:** [p06-strutturaApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p06-strutturaApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
