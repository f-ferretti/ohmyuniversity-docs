---
title: Aggiorna Carriere API V1 | OhMyUniversity!
description: REST API documentation for the Aggiorna Carriere service (aggcarr-service-v1) — CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Aggiorna Carriere API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Aggiorna Carriere service (aggcarr-service-v1) — CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/aggcarr-api-v1
  - - meta
    - name: keywords
      content: aggcarr api, career update api, aggiorna carriere, esse3 rest api, cineca api, ohmyuniversity api, academic record update, student career management
  - - meta
    - name: twitter:title
      content: Aggiorna Carriere API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Aggiorna Carriere service (aggcarr-service-v1) — CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Aggiorna Carriere API V1

**ENG:** `Academic Record Update`

**Version:** `1.0.0` · **Base URL:** `/aggcarr-service-v1`

Engine for updating student academic records, both in bulk (by department or degree) and individually (by student ID).

---

## How it works

Each procedure runs in two modes depending on the endpoint used:

- **`/aggcarr/{nomeProc}`** — bulk mode, targets multiple students based on filters
- **`/aggcarr/{nomeProc}/{matId}`** — single mode, targets one specific student

### Available procedures

- `AGG_AD_OFF` — Syncs teaching activity attributes from the reference offer
- `FREQ` — Assigns attendance frequency
- `RIMUOVI_FREQ` — Removes attendance frequency
- `SEG` — Updates activity segments in the student record from the reference offer
- `SOST` — Substitutes one teaching activity with another

---

## Common filters

All procedures accept a `filtriComuni` object to scope which students are affected.

- `facId` / `facCod` — department/faculty (use one)
- `cdsId` / `cdsCod` — degree course (use one)
- `aaOrdId` — academic year of the curriculum (requires `cdsId` or `cdsCod`)
- `pdsId` / `pdsCod` — study plan, relative to `cdsId` and `aaOrdId` (use one)
- `aaRegId` — cohort year

::: warning
Bulk calls require at least `facId` or `cdsId`. Single calls only need `matId` — common filters are optional.
:::

---

## Execution flow

### Bulk

1. Call `/aggcarr/{nomeProc}` — response includes a `link` header pointing to the preview
2. Review affected rows via `/aggcarr/{aggcarrId}/dettagli`
3. Optionally exclude rows via `/aggcarr/{aggcarrId}/{aggcarrdettId}/elabora`
4. Trigger execution via `/aggcarr/{aggcarrId}/{aggcarrdettId}/esegui`
5. Check results via `/aggcarr/{aggcarrId}/log`
6. Delete the elaboration when done

### Single

1. Call `/aggcarr/{nomeProc}/{matId}` — log is returned directly
2. Review results via `/aggcarr/{aggcarrId}/dettagli`
3. Delete the elaboration when done

---

## Endpoints

### `GET /aggcarr` — Get all career update headers

```java
/**
 * Returns the list of career update process headers (testate).
 * Each entry represents a bulk update session with its associated
 * degree course, faculty, study plan, and runtime parameters.
 *
 * @param none
 * @return List<TestataAggiornaCarriera> list of career update headers,
 *         or an empty array if none are available
 */
GET /aggcarr
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
[
  {
    "aggcarrId": 123, // Career update header ID (primary key)
    "procCod": "string", // Process code
    "stato": 0, // Process status
    "facId": 1, // Faculty ID
    "facCod": "fac_cod", // Faculty code
    "facDes": "fac_des", // Faculty description
    "cdsId": 1, // Degree course ID
    "cdsCod": "cds_cod", // Degree course code
    "cdsDes": "cds_des", // Degree course description
    "aaOrdId": 1, // Curriculum academic year ID
    "pdsId": 1, // Study plan ID
    "pdsCod": "pds_cod", // Study plan code
    "pdsDes": "pds_des", // Study plan description
    "aaRegId": 1, // Cohort academic year ID
    "parametri": [
      {
        "aggcarrId": 123, // Career update header ID (primary key)
        "paramCod": "string", // Parameter code (primary key)
        "paramDes": "string", // Parameter description
        "valAlfa": "S1", // Alphanumeric value
        "valNum": 1 // Numeric value
      }
    ]
  }
]
```

---

## References

- **Swagger UI:** [Aggcarr Api V1 — ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Aggcarr%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Faggcarr-service-v1)#/>)
- **Spec YAML:** [p11-aggcarrApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p11-aggcarrApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
