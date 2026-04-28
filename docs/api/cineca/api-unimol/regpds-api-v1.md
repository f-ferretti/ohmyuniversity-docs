---
title: Regpds API V1 | OhMyUniversity!
description: REST API documentation for the Regpds service (regole-percorso-service-v1) - access to study path regulations in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Regpds API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Regpds service (regole-percorso-service-v1) - access to study path regulations in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/regpds-api-v1
  - - meta
    - name: keywords
      content: regpds api, regolamento di percorso api, study path regulation, esse3 rest api, cineca api, ohmyuniversity api, regole-percorso-service-v1, schema libero, schema vincolato, rad, regole percorso
  - - meta
    - name: twitter:title
      content: Regpds API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Regpds service (regole-percorso-service-v1) - access to study path regulations in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Regpds API V1

**ENG:** `Study Path Regulation`

**Version:** `1.1.0` · **Base URL:** `/regole-percorso-service-v1`

Service for accessing study path regulations in ESSE3. Regulations are divided into two mutually exclusive schema types - **free schema** (`schema libero`) and **constrained schema** (`schema vincolato`) - each with dedicated endpoints. A generic search endpoint covers both types.

---

## Covered entities

| Entity                    | Description                                                     | Tag                        |
| ------------------------- | --------------------------------------------------------------- | -------------------------- |
| `RegolamentoPercorso`     | Generic study path regulation header                            | `Regole di percorso`       |
| `RegolamentoSchemaLibero` | Free-schema regulation with open activity rules                 | `Schema libero`            |
| `RegolamentoConDettagli`  | Constrained-schema regulation with TAF, scope, and sector rules | `Schema vincolato` / `RAD` |

## Regulation types

| Type               | Description                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `Schema libero`    | Students can freely choose activities within defined CFU limits; no TAF/scope structure enforced |
| `Schema vincolato` | Activities are organized into TAF categories, disciplinary scopes, and sector rules              |

::: tip
Regulations are identified by a composite key of **`cdsId`** (degree course), **`aaOrdId`** (curriculum ordering year), and **`insId`** (rule set ID) - not by a single primary key like other services. The `coorte`-scoped endpoints return all study paths and profiles for a given cohort in one call.
:::

---

## Endpoints - Study Path Regulations (Regole di Percorso)

### `GET /regole-percorso` - Search study path regulations

```java
/**
 * Returns a paginated list of study path regulations available in the system,
 * covering both schema types. Schema libero (SL) and schema vincolato (SV)
 * are mutually exclusive per regulation entry.
 *
 * @param facCod       string[] (query, optional) - faculty codes; multiple values allowed
 * @param cdsCod       string[] (query, optional) - degree course codes; multiple values allowed
 * @param tipoCorsoCod string[] (query, optional) - course type codes; multiple values allowed
 * @param pdsCod       string[] (query, optional) - study path codes; multiple values allowed
 * @param coorte       int[]    (query, optional) - cohort years; multiple values allowed
 * @param profilo      string   (query, optional) - regulation profile
 * @param start        int      (query, optional) - index of the first record to load,
 *                                                  defaults to 0
 * @param limit        int      (query, optional) - number of records to retrieve starting
 *                                                  from start, defaults to 50,
 *                                                  allowed range: 0–100
 * @param order        string   (query, optional) - sort order; syntax: +/- followed by
 *                                                  field name (+ = ASC, - = DESC);
 *                                                  multiple fields comma-separated
 * @return List<RegolamentoPercorso> paginated list of study path regulation headers,
 *         or an empty array if none match the filters
 */
GET /regole-percorso
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "facId": 1234, // Faculty ID
    "cdsId": 123, // Degree course ID (primary key)
    "aaOrdId": 2020, // Curriculum ordering year (primary key)
    "pdsId": 143, // Study path ID
    "insId": 1111, // Rule set ID (primary key)
    "coorte": 2024, // Student cohort year
    "profCod": "1", // Profile code
    "tipoCorsoCod": "L2", // Course type code
    "tipoCorsoDes": "Corso di Laurea", // Course type description
    "facCod": "3", // Faculty code
    "facDes": "FARMACIA", // Faculty description
    "cdsCod": "2", // Degree course code
    "cdsDes": "ARCHITETTURA", // Degree course description
    "pdsCod": "9999", // Study path code
    "pdsDes": "PERCORSO COMUNE", // Study path description
    "attivoFlg": 1, // Active flag (0=no, 1=yes)
    "regClaFlg": 1, // Class regulation flag (0=no, 1=yes)
    "settFlg": 1, // Sector rules present flag (0=no, 1=yes)
    "rifFlg": 0, // Reference flag (0=no, 1=yes)
    "normCod": "DM270", // Normative reference code
    "tipoRegolamento": "SL" // Regulation type (SL=schema libero, SV=schema vincolato)
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

## Endpoints - Free Schema (Schema Libero)

### `GET /regole-sl/coorte/{cdsId}/{aaOrdId}/{coorte}` - Get free-schema regulations by cohort

```java
/**
 * Returns all free-schema regulations for a given degree course, curriculum
 * ordering year, and cohort. The response covers all study paths and profiles
 * associated with that cohort, each including their activity rules.
 *
 * @param cdsId   long (path, required) - degree course ID
 * @param aaOrdId long (path, required) - curriculum ordering year
 * @param coorte  long (path, required) - student cohort year
 * @param start   int  (query, optional) - index of the first record to load,
 *                                         defaults to 0
 * @param limit   int  (query, optional) - number of records to retrieve starting
 *                                         from start, defaults to 50,
 *                                         allowed range: 0–100
 * @param order   string (query, optional) - sort order; syntax: +/- followed by
 *                                           field name (+ = ASC, - = DESC);
 *                                           multiple fields comma-separated
 * @return List<RegolamentoSchemaLibero> paginated list of free-schema regulations
 *         for the cohort, or an empty array if none match
 */
GET /regole-sl/coorte/{cdsId}/{aaOrdId}/{coorte}
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "facId": 1234, // Faculty ID
    "cdsId": 123, // Degree course ID (primary key)
    "aaOrdId": 2020, // Curriculum ordering year (primary key)
    "pdsId": 143, // Study path ID
    "insId": 1111, // Rule set ID (primary key)
    "coorte": 2024, // Student cohort year
    "profCod": "1", // Profile code
    "tipoCorsoCod": "L2", // Course type code
    "tipoCorsoDes": "Corso di Laurea", // Course type description
    "facCod": "3", // Faculty code
    "facDes": "FARMACIA", // Faculty description
    "cdsCod": "2", // Degree course code
    "cdsDes": "ARCHITETTURA", // Degree course description
    "pdsCod": "9999", // Study path code
    "pdsDes": "PERCORSO COMUNE", // Study path description
    "attivoFlg": 1, // Active flag (0=no, 1=yes)
    "regClaFlg": 1, // Class regulation flag (0=no, 1=yes)
    "settFlg": 1, // Sector rules present flag (0=no, 1=yes)
    "rifFlg": 0, // Reference flag (0=no, 1=yes)
    "normCod": "DM270", // Normative reference code
    "tipoRegolamento": "SL", // Regulation type (SL=schema libero)

    // --- Activity rules ---
    "regoleA": [
      {
        "cdsId": 551, // Degree course ID (primary key)
        "aaOrdId": 2001, // Curriculum ordering year (primary key)
        "pdsId": 9999, // Study path ID
        "insId": 1, // Rule set ID (primary key)
        "regId": 1, // Rule ID
        "tipoAmbCod": "SETT", // Scope type code
        "tipoAmbDes": "Elenco Settori Scientifico/Disciplinari", // Scope type description
        "tipoAfCod": "E", // TAF type code
        "tipoAfDes": "Lingua/Prova Finale", // TAF type description
        "tipoInsCod": "FON", // Rule insertion type code
        "tipoInsDes": "Fondamentale", // Rule insertion type description
        "des": "Regola", // Rule description
        "dataInizio": "01/11/2024", // Validity start date (DD/MM/YYYY)
        "dataFine": "05/11/2024", // Validity end date (DD/MM/YYYY)
        "quantMin": 0, // Minimum quantity (CFU or units)
        "quantMax": 999, // Maximum quantity (CFU or units)

        // --- Discipline filters ---
        "filtroDisciplina": [
          {
            "aaOrdId": 2001, // Curriculum ordering year
            "cdsId": 551, // Degree course ID
            "pdsId": 9999, // Study path ID
            "insId": 1, // Rule set ID
            "regId": 1, // Rule ID
            "settCod": "MED/41", // Scientific sector code
            "settDes": "ANESTESIOLOGIA", // Scientific sector description
            "discCod": "1", // Discipline code
            "discDes": "ISTITUZIONI DI LOGICA MATEMATICA" // Discipline description
          }
        ],

        // --- Sector filters ---
        "filtroSettore": [
          {
            "aaOrdId": 2001, // Curriculum ordering year
            "cdsId": 551, // Degree course ID
            "pdsId": 9999, // Study path ID
            "insId": 1, // Rule set ID
            "regId": 1, // Rule ID
            "settCod": "MED/41", // Scientific sector code
            "settDes": "ANESTESIOLOGIA" // Scientific sector description
          }
        ]
      }
    ]
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

### `GET /regole-sl/{cdsId}/{aaOrdId}/{insId}/{pdsId}` - Get single free-schema regulation

```java
/**
 * Returns a single free-schema regulation identified by its composite key
 * (degree course, curriculum ordering year, rule set, and study path),
 * including all associated activity rules.
 *
 * @param cdsId   long (path, required)  - degree course ID
 * @param aaOrdId long (path, required)  - curriculum ordering year
 * @param insId   long (path, required)  - rule set ID
 * @param pdsId   long (path, required)  - study path ID
 * @param start   int  (query, optional) - index of the first record to load,
 *                                         defaults to 0
 * @param limit   int  (query, optional) - number of records to retrieve starting
 *                                         from start, defaults to 50,
 *                                         allowed range: 0–100
 * @param order   string (query, optional) - sort order; syntax: +/- followed by
 *                                           field name (+ = ASC, - = DESC);
 *                                           multiple fields comma-separated
 * @return List<RegolamentoSchemaLibero> the matching free-schema regulation with
 *         its activity rules, or an empty array if not found
 */
GET /regole-sl/{cdsId}/{aaOrdId}/{insId}/{pdsId}
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

::: tip
The response structure is identical to [`GET /regole-sl/coorte/{cdsId}/{aaOrdId}/{coorte}`](#get-regole-sl-coorte-cdsid-aaordid-coorte-get-free-schema-regulations-by-cohort). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
[
  {
    "facId": 1234,
    "cdsId": 123,                   // Degree course ID (primary key)
    "aaOrdId": 2020,                // Curriculum ordering year (primary key)
    "pdsId": 143,
    "insId": 1111,                  // Rule set ID (primary key)
    "coorte": 2024,
    "profCod": "1",
    "tipoCorsoCod": "L2",
    "tipoCorsoDes": "Corso di Laurea",
    "facCod": "3",
    "facDes": "FARMACIA",
    "cdsCod": "2",
    "cdsDes": "ARCHITETTURA",
    "pdsCod": "9999",
    "pdsDes": "PERCORSO COMUNE",
    "attivoFlg": 1,
    "regClaFlg": 1,
    "settFlg": 1,
    "rifFlg": 0,
    "normCod": "DM270",
    "tipoRegolamento": "SL",        // Regulation type (SL=schema libero)
    "regoleA": [ ... ]              // See GET /regole-sl/coorte/{cdsId}/{aaOrdId}/{coorte}
                                    // for full regoleA structure
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

## Endpoints - Degree Course Teaching Regulation (RAD - Regolamento Didattico di Ateneo)

### `GET /regole-sl/{cdsId}/{aaOrdId}/{insId}` - Get RAD for a degree course

```java
/**
 * Returns the RAD (Regolamento Didattico di Ateneo) for a degree course,
 * identified by its composite key. The response includes the full TAF
 * hierarchy with disciplinary scopes and sector rules:
 *
 *   Regulation header
 *   └── TAF rules (regoleTaf)
 *       └── Disciplinary scopes (regoleAmbito)
 *           └── Sector rules (regoleSettore)
 *
 * @param cdsId   long (path, required)  - degree course ID
 * @param aaOrdId long (path, required)  - curriculum ordering year
 * @param insId   long (path, required)  - rule set ID
 * @param start   int  (query, optional) - index of the first record to load,
 *                                         defaults to 0
 * @param limit   int  (query, optional) - number of records to retrieve starting
 *                                         from start, defaults to 50,
 *                                         allowed range: 0–100
 * @param order   string (query, optional) - sort order; syntax: +/- followed by
 *                                           field name (+ = ASC, - = DESC);
 *                                           multiple fields comma-separated
 * @return List<RegolamentoConDettagli> the RAD regulation with full TAF/scope/sector
 *         hierarchy, or an empty array if not found
 */
GET /regole-sl/{cdsId}/{aaOrdId}/{insId}
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "facId": 1234, // Faculty ID
    "cdsId": 123, // Degree course ID (primary key)
    "aaOrdId": 2020, // Curriculum ordering year (primary key)
    "pdsId": 143, // Study path ID
    "insId": 1111, // Rule set ID (primary key)
    "coorte": 2024, // Student cohort year
    "profCod": "1", // Profile code
    "tipoCorsoCod": "L2", // Course type code
    "tipoCorsoDes": "Corso di Laurea", // Course type description
    "facCod": "3", // Faculty code
    "facDes": "FARMACIA", // Faculty description
    "cdsCod": "2", // Degree course code
    "cdsDes": "ARCHITETTURA", // Degree course description
    "pdsCod": "9999", // Study path code
    "pdsDes": "PERCORSO COMUNE", // Study path description
    "attivoFlg": 1, // Active flag (0=no, 1=yes)
    "regClaFlg": 1, // Class regulation flag (0=no, 1=yes)
    "settFlg": 1, // Sector rules present flag (0=no, 1=yes)
    "rifFlg": 0, // Reference flag (0=no, 1=yes)
    "normCod": "DM270", // Normative reference code
    "tipoRegolamento": "SL", // Regulation type (SL=schema libero)

    // --- TAF rules ---
    "regoleTaf": [
      {
        "tipoAfCod": "E", // TAF type code (primary key)
        "tipoAfDes": "Lingua/Prova Finale", // TAF type description
        "insId": 1, // Rule set ID (primary key)
        "pdsId": 109, // Study path ID
        "aaOrdId": 2001, // Curriculum ordering year (primary key)
        "cdsId": 539, // Degree course ID (primary key)
        "cfuMin": 10, // Minimum CFU for this TAF
        "cfuMax": 999, // Maximum CFU for this TAF
        "cfuCla": "9", // Class-level CFU reference value

        // --- Disciplinary scopes ---
        "regoleAmbito": [
          {
            "ambId": 31, // Scope ID (primary key)
            "tipoAfCod": "A", // TAF type code (primary key)
            "tipoAfDes": "Base", // TAF type description
            "insId": 1, // Rule set ID (primary key)
            "pdsId": 9999, // Study path ID
            "aaOrdId": 2001, // Curriculum ordering year (primary key)
            "cdsId": 551, // Degree course ID (primary key)
            "ambitoDes": "Aziendale", // Scope description
            "cfuMin": 10, // Minimum CFU for this scope/TAF
            "cfuCla": 20, // Class-level CFU reference value
            "cfuMax": 999, // Maximum CFU for this scope/TAF
            "varTafFlg": 1, // TAF variation flag; 1 = scope moved from CARATTERIZZANTE to AFFINE
            "ambSedeFlg": 0, // Scope origin flag (0=ministerial, 1=institution-defined)
            "idAmbitoUnivoco": 123, // Unique MIUR scope ID

            // --- Sector rules ---
            "regoleSettore": [
              {
                "cdsId": 551, // Degree course ID
                "aaOrdId": 2001, // Curriculum ordering year
                "pdsId": 9999, // Study path ID
                "insId": 1, // Rule set ID
                "tipoAfCod": "A", // TAF type code
                "tipoAfDes": "Base", // TAF type description
                "ambId": 31, // Parent scope ID
                "ambitoDes": "Aziendale", // Parent scope description
                "settCod": "MED/41", // Scientific sector code (SSD)
                "settDes": "ANESTESIOLOGIA", // Scientific sector description
                "cfuMin": 10, // Minimum CFU for this sector
                "cfuCla": 20, // Class-level CFU reference value
                "cfuMax": 999 // Maximum CFU for this sector
              }
            ]
          }
        ]
      }
    ]
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

## Endpoints - Constrained Schema (Schema Vincolato)

### `GET /regole-sv/coorte/{cdsId}/{aaOrdId}/{coorte}` - Get constrained-schema regulations by cohort

```java
/**
 * Returns all constrained-schema regulations for a given degree course,
 * curriculum ordering year, and cohort. The response covers all study paths
 * and profiles associated with that cohort, each including the full TAF
 * hierarchy with disciplinary scopes and sector rules.
 *
 * @param cdsId   long (path, required)  - degree course ID
 * @param aaOrdId long (path, required)  - curriculum ordering year
 * @param coorte  long (path, required)  - student cohort year
 * @param start   int  (query, optional) - index of the first record to load,
 *                                         defaults to 0
 * @param limit   int  (query, optional) - number of records to retrieve starting
 *                                         from start, defaults to 50,
 *                                         allowed range: 0–100
 * @param order   string (query, optional) - sort order; syntax: +/- followed by
 *                                           field name (+ = ASC, - = DESC);
 *                                           multiple fields comma-separated
 * @return List<RegolamentoConDettagli> paginated list of constrained-schema regulations
 *         for the cohort with full TAF/scope/sector hierarchy, or an empty array if
 *         none match
 */
GET /regole-sv/coorte/{cdsId}/{aaOrdId}/{coorte}
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

::: tip
The response structure - including `regoleTaf`, `regoleAmbito`, and `regoleSettore` - is identical to the one returned by [`GET /regole-sl/{cdsId}/{aaOrdId}/{insId}`](#get-regole-sl-cdsid-aaordid-insid-get-rad-for-a-degree-course). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
[
  {
    "facId": 1234,
    "cdsId": 123,                     // Degree course ID (primary key)
    "aaOrdId": 2020,                  // Curriculum ordering year (primary key)
    "pdsId": 143,
    "insId": 1111,                    // Rule set ID (primary key)
    "coorte": 2024,
    "profCod": "1",
    "tipoCorsoCod": "L2",
    "tipoCorsoDes": "Corso di Laurea",
    "facCod": "3",
    "facDes": "FARMACIA",
    "cdsCod": "2",
    "cdsDes": "ARCHITETTURA",
    "pdsCod": "9999",
    "pdsDes": "PERCORSO COMUNE",
    "attivoFlg": 1,
    "regClaFlg": 1,
    "settFlg": 1,
    "rifFlg": 0,
    "normCod": "DM270",
    "tipoRegolamento": "SV",          // Regulation type (SV=schema vincolato)
    "regoleTaf": [ ... ]              // See GET /regole-sl/{cdsId}/{aaOrdId}/{insId}
                                      // for full regoleTaf structure
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

### `GET /regole-sv/{cdsId}/{aaOrdId}/{insId}/{pdsId}` - Get single constrained-schema regulation

```java
/**
 * Returns a single constrained-schema regulation identified by its composite
 * key (degree course, curriculum ordering year, rule set, and study path),
 * including the full TAF hierarchy with disciplinary scopes and sector rules.
 *
 * @param cdsId   long (path, required)  - degree course ID
 * @param aaOrdId long (path, required)  - curriculum ordering year
 * @param insId   long (path, required)  - rule set ID
 * @param pdsId   long (path, required)  - study path ID
 * @param start   int  (query, optional) - index of the first record to load,
 *                                         defaults to 0
 * @param limit   int  (query, optional) - number of records to retrieve starting
 *                                         from start, defaults to 50,
 *                                         allowed range: 0–100
 * @param order   string (query, optional) - sort order; syntax: +/- followed by
 *                                           field name (+ = ASC, - = DESC);
 *                                           multiple fields comma-separated
 * @return List<RegolamentoConDettagli> the matching constrained-schema regulation
 *         with full TAF/scope/sector hierarchy, or an empty array if not found
 */
GET /regole-sv/{cdsId}/{aaOrdId}/{insId}/{pdsId}
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

::: tip
The response structure - including `regoleTaf`, `regoleAmbito`, and `regoleSettore` - is identical to the one returned by [`GET /regole-sl/{cdsId}/{aaOrdId}/{insId}`](#get-regole-sl-cdsid-aaordid-insid-get-rad-for-a-degree-course). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
[
  {
    "facId": 1234,
    "cdsId": 123,                     // Degree course ID (primary key)
    "aaOrdId": 2020,                  // Curriculum ordering year (primary key)
    "pdsId": 143,
    "insId": 1111,                    // Rule set ID (primary key)
    "coorte": 2024,
    "profCod": "1",
    "tipoCorsoCod": "L2",
    "tipoCorsoDes": "Corso di Laurea",
    "facCod": "3",
    "facDes": "FARMACIA",
    "cdsCod": "2",
    "cdsDes": "ARCHITETTURA",
    "pdsCod": "9999",
    "pdsDes": "PERCORSO COMUNE",
    "attivoFlg": 1,
    "regClaFlg": 1,
    "settFlg": 1,
    "rifFlg": 0,
    "normCod": "DM270",
    "tipoRegolamento": "SV",          // Regulation type (SV=schema vincolato)
    "regoleTaf": [ ... ]              // See GET /regole-sl/{cdsId}/{aaOrdId}/{insId}
                                      // for full regoleTaf structure
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

---

## References

- **Swagger UI:** [Regpds Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Regpds%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fregole-percorso-service-v1)#/>)
- **Spec YAML:** [p08-regpdsApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p08-regpdsApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
