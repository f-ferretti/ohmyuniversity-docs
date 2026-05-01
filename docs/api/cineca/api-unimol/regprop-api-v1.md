---
title: Regprop API V1 | OhMyUniversity!
description: REST API documentation for the Regprop service (regprop-service-v1) - access to prerequisite regulations in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Regprop API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Regprop service (regprop-service-v1) - access to prerequisite regulations in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/regprop-api-v1
  - - meta
    - name: keywords
      content: regprop api, regolamento di propedeuticità api, prerequisite regulation, esse3 rest api, cineca api, ohmyuniversity api, regprop-service-v1, vincoli propedeuticità
  - - meta
    - name: twitter:title
      content: Regprop API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Regprop service (regprop-service-v1) - access to prerequisite regulations in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Regprop API V1

**ENG:** `Prerequisite Regulation`

**Version:** `1.0.0` · **Base URL:** `/regprop-service-v1`

Service for accessing prerequisite regulations in ESSE3, including regulation headers and their associated prerequisite constraints.

---

## Covered entities

| Entity                        | Description                                    | Tag           |
| ----------------------------- | ---------------------------------------------- | ------------- |
| `RegolamentoDiPropedeuticita` | Header of a prerequisite regulation            | `regolamento` |
| `VincoloDiPropedeuticita`     | Prerequisite constraint linked to a regulation | `vincolo`     |

::: tip
The full prerequisite regulation tree (header > constraints > OR rules > AND rules > elements) is also accessible directly from a selection regulation via [`GET /regsceFull/{regsceId}/regprop`](/api/cineca/api-unimol/regsce-api-v1#get-regscefull-regsceId-regprop-get-prerequisite-regulation-for-a-selection-regulation) in the Regsce API.
:::

---

## Endpoints - Regulation Header (Regolamento)

### `GET /regprop` - Filter prerequisite regulation headers

```java
/**
 * Returns a filtered list of prerequisite regulation headers.
 * If statoRegprop is not specified, only active regulations (stato = A)
 * are returned by default.
 *
 * @param statoRegprop string (query, optional) - regulation status; valid values: A, B, X;
 *                                                defaults to A if not provided
 * @param facId        long   (query, optional) - faculty ID
 * @param facCod       string (query, optional) - faculty code
 * @param cdsId        long   (query, optional) - degree course ID
 * @param cdsCod       string (query, optional) - degree course code
 * @param tipoCorsoCod string (query, optional) - course type code
 * @param coorte       long   (query, optional) - student cohort year
 * @param start        int    (query, optional) - index of the first record to load,
 *                                                defaults to 0
 * @param limit        int    (query, optional) - number of records to retrieve starting
 *                                                from start, defaults to 50,
 *                                                allowed range: 0–100
 * @param order        string (query, optional) - sort order; syntax: +/- followed by
 *                                                field name (+ = ASC, - = DESC);
 *                                                multiple fields comma-separated
 * @param fields         string (query, optional) - list of optional fields to include;
 *                                                  use ALL to return all fields;
 *                                                  supports Ant Glob Patterns
 * @param optionalFields string (query, optional) - alias for fields; same behavior
 * @return List<RegolamentoDiPropedeuticita> paginated list of prerequisite regulation
 *         headers, or an empty array if none match the filters
 */
GET /regprop
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "regpropId": 1, // Prerequisite regulation ID (primary key)
    "facId": 123, // Faculty ID
    "facCod": "123", // Faculty code
    "tipoCorsoCod": "123", // Course type code
    "cdsId": 123, // Degree course ID
    "cdsCod": "123", // Degree course code
    "cdsDes": "123", // Degree course description
    "aaOrdId": 123, // Curriculum ordering year
    "coorte": 2012, // Student cohort year
    "aaRevisioneId": 2012, // Revision year
    "stato": "A", // Regulation status (A=active, B=draft, X=cancelled)
    "extId": 1 // External system ID (optional field)
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

### `GET /regprop/{regpropId}` - Get prerequisite regulation with full details

```java
/**
 * Returns the full detail tree of a single prerequisite regulation, identified
 * by its unique ID. The response follows a nested 1-n structure:
 *
 *   Regulation header
 *   └── Constraints (vincoli)
 *       └── OR rules
 *           └── AND rules
 *               └── Prerequisite elements (figli)
 *
 * @param regpropId      long   (path, required)  - unique prerequisite regulation ID
 * @param fields         string (query, optional) - list of optional fields to include;
 *                                                  use ALL to return all fields;
 *                                                  supports Ant Glob Patterns
 * @param optionalFields string (query, optional) - alias for fields; same behavior
 * @param filter         string (query, optional) - RSQL filter expression applied
 *                                                  after data retrieval
 * @return RegolamentoDiPropedeuticitaConVincoli the full regulation detail tree,
 *         or 404 if not found
 */
GET /regprop/{regpropId}
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

::: tip
The nested structure of the response - from `vincoli` down through `regolePropOR`, `regolePropAND`, and `figli` - is identical to the one returned by [`GET /regsceFull/{regsceId}/regprop`](/api/cineca/api-unimol/regsce-api-v1#get-regscefull-regsceId-regprop-get-prerequisite-regulation-for-a-selection-regulation). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
{
  "regpropId": 1,           // Prerequisite regulation ID (primary key)
  "facId": 123,             // Faculty ID
  "facCod": "123",          // Faculty code
  "tipoCorsoCod": "123",    // Course type code
  "cdsId": 123,             // Degree course ID
  "cdsCod": "123",          // Degree course code
  "cdsDes": "123",          // Degree course description
  "aaOrdId": 123,           // Curriculum ordering year
  "coorte": 2012,           // Student cohort year
  "aaRevisioneId": 2012,    // Revision year
  "stato": "A",             // Regulation status (A=active, B=draft, X=cancelled)
  "extId": 1,               // External system ID (optional field)
  "vincoli": [ ... ]        // See GET /regsceFull/{regsceId}/regprop for full structure
}
```

## <br>

<br>

## Endpoints - Prerequisite Constraints (Vincolo)

### `GET /regprop/{regpropId}` - Get prerequisite regulation with constraints

::: tip
This endpoint is shared between the `regolamento` and `vincolo` tags in the ESSE3 Swagger UI. The full response - including the complete constraint tree (`vincoli` > `regolePropOR` > `regolePropAND` > `figli`) - is already documented under the [Regulation Header](#get-regprop-regpropid-get-prerequisite-regulation-with-full-details) section above.
:::

<br>

---

<br>

### `GET /regprop/{regpropId}/{regpropVincId}` - Get prerequisite constraint by ID

```java
/**
 * Returns a single prerequisite constraint identified by its unique ID,
 * scoped to the parent regulation. The response includes the full constraint
 * detail tree:
 *
 *   Constraint
 *   └── OR rules
 *       └── AND rules
 *           └── Prerequisite elements (figli)
 *
 * @param regpropId      long   (path, required)  - unique prerequisite regulation ID
 * @param regpropVincId  long   (path, required)  - unique constraint ID
 * @param fields         string (query, optional) - list of optional fields to include;
 *                                                  use ALL to return all fields;
 *                                                  supports Ant Glob Patterns
 * @param optionalFields string (query, optional) - alias for fields; same behavior
 * @param filter         string (query, optional) - RSQL filter expression applied
 *                                                  after data retrieval
 * @return List<VincoloDiPropedeuticita> the constraint with its OR/AND rule tree,
 *         or 404 if not found
 */
GET /regprop/{regpropId}/{regpropVincId}
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "regpropVincId": 1, // Constraint ID (primary key)
    "regpropId": 1, // Parent regulation ID
    "tipoVincolo": "AD", // Constraint type
    "chiaveADContestualizzata": {
      // Contextualized AD key for this constraint
      "cdsId": 1,
      "cdsCod": "CDS_AD_1",
      "cdsDes": "Esempio di CDS AD",
      "aaOrdId": 2016, // Curriculum ordering year
      "aaOrdCod": "CDS_AD_1",
      "aaOrdDes": "Esempio di CDS AD",
      "pdsId": 1,
      "pdsCod": "PDS_AD_1",
      "pdsDes": "Esempio di PDS AD",
      "aaOffId": 1, // Offer year ID
      "adId": 1, // Teaching activity ID
      "adCod": "PDS_AD_1",
      "adDes": "Esempio di PDS AD",
      "afId": 1 // Teaching load ID
    },
    "annoCorso": 1, // Course year
    "settCod": "123", // Scientific sector code
    "regolePropOR": [
      // OR rules
      {
        "regpropOrId": 1, // OR rule ID (primary key)
        "regpropVincId": 1, // Parent constraint ID
        "regpropId": 1, // Parent regulation ID
        "des": "123", // OR rule description
        "regolePropAND": [
          // AND rules within this OR group
          {
            "regpropAndId": 1, // AND rule ID (primary key)
            "regpropOrId": 1, // Parent OR rule ID
            "regpropVincId": 1, // Parent constraint ID
            "regpropId": 1, // Parent regulation ID
            "tipoVincoloRegola": "NUM_AF", // Rule constraint type
            "numAd": 1, // Number of teaching activities required
            "peso": 5, // Weight
            "raggruppamentoFigli": 1, // Child grouping
            "figli": [
              // Prerequisite elements
              {
                "regpropPropId": 1, // Prerequisite element ID (primary key)
                "regpropAndId": 1, // Parent AND rule ID
                "tipoElemento": "AC", // Element type
                "chiaveADContestualizzata": {
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
                  "afId": 1
                },
                "annoCorso": 1, // Course year
                "settCod": "123" // Scientific sector code
              }
            ]
          }
        ]
      }
    ],
    "extId": 1 // External system ID (optional field)
  }
]
```

---

## References

- **Swagger UI:** [Regprop Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Regprop%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fregprop-service-v1)#/>)
- **Spec YAML:** [p09-regpropApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p09-regpropApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
