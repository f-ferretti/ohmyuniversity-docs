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
The full prerequisite regulation tree (header → constraints → OR rules → AND rules → elements) is also accessible directly from a selection regulation via [`GET /regsceFull/{regsceId}/regprop`](/api/cineca/api-unimol/regsce-api-v1#get-regscefull-regsceId-regprop-get-prerequisite-regulation-for-a-selection-regulation) in the Regsce API.
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

## Endpoints - ??? (Vincolo)

---

## References

- **Swagger UI:** [Regprop Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Regprop%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fregprop-service-v1)#/>)
- **Spec YAML:** [p09-regpropApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p09-regpropApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
