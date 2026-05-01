---
title: Unimol API Overview | OhMyUniversity!
description: Overview of the Cineca ESSE3 REST APIs documented for the University of Molise (Unimol) integration in OhMyUniversity!
head:
  - - meta
    - property: og:title
      content: Unimol API Overview | OhMyUniversity!
  - - meta
    - property: og:description
      content: Overview of the Cineca ESSE3 REST APIs documented for the University of Molise (Unimol) integration in OhMyUniversity!
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/overview
  - - meta
    - name: keywords
      content: unimol api, esse3 rest api, cineca api, ohmyuniversity api, university of molise, api overview, student data api, academic api
  - - meta
    - name: twitter:title
      content: Unimol API Overview | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Overview of the Cineca ESSE3 REST APIs documented for the University of Molise (Unimol) integration in OhMyUniversity!
---

# OhMyUniversity! - Unimol: API Overview

This section documents the **CINECA ESSE3 REST APIs** exposed by the **University of Molise (Unimol)** instance, available at:

```
https://unimol.esse3.cineca.it/e3rest/api/
```

All APIs listed here are part of the ESSE3 academic management platform by CINECA and are specific to the Unimol deployment. The documentation covers request/response schemas, authentication requirements, available filters, and execution flows for each service.

---

## Authentication

All endpoints require authentication. Two methods are supported across all services:

- **Basic Auth** - username and password, base64-encoded
- **JWT** - Bearer token obtained via the Auth API

Most endpoints require the `UTENTE_TECNICO` role. Some endpoints additionally support `DOCENTE` or `SOGG_EST` roles - these are noted individually in each API page.

---

## API Index

| Service                 | Base URL                              | Description                                                       |
| ----------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| Aggiorna Carriere       | `/aggcarr-service-v1`                 | Bulk and single-student academic record updates                   |
| Allegati                | `/allegati-service-v1`                | Upload and download of attachments linked to application entities |
| Anagrafica              | `/anagrafica-service-v2`              | Student and person registry management                            |
| Auth                    | `/auth-service-v1`                    | Authentication and token management                               |
| Badge                   | `/badge-service-v1`                   | Badge issuance and management                                     |
| Calendario Appuntamenti | `/calendario-appuntamenti-service-v1` | Appointment calendar management                                   |
| Calesa                  | `/calesa-service-v1`                  | Exam session management                                           |
| Carriere                | `/carriere-service-v1`                | Student career and enrollment management                          |
| Comunicazioni           | `/comunicazioni-service-v1`           | Internal communications and notifications                         |
| Concorsi                | `/concorsi-service-v2`                | Admission contest management                                      |
| Conseguimento Titolo    | `/conseguimento-titolo-service-v1`    | Degree completion and graduation management                       |
| Docenti                 | `/docenti-service-v1`                 | Faculty and teaching staff management                             |
| Import Badge            | `/import-badge-service-v1`            | Batch badge import                                                |
| Libretto                | `/libretto-service-v2`                | Student academic transcript (libretto)                            |
| Logging                 | `/logging-service-v1`                 | System event logging                                              |
| Logistica               | `/logistica-service-v1`               | Rooms, spaces, and logistical resource management                 |
| Nazioni                 | `/nazioni-service-v1`                 | Countries and nationalities registry                              |
| Offerta                 | `/offerta-service-v1`                 | Teaching offer and course catalog                                 |
| Piani                   | `/piani-service-v1`                   | Study plan management                                             |
| Questionari             | `/questionari-service-v1`             | Surveys and questionnaire management                              |
| Regpds                  | `/regpds-service-v1`                  | Study plan regulation management                                  |
| Regprop                 | `/regprop-service-v1`                 | Property regulation management                                    |
| Regsce                  | `/regsce-service-v1`                  | Academic calendar regulation management                           |
| Rendicontazione Doc     | `/rendicontazione-doc-service-v1`     | Document reporting and tracking                                   |
| Servizi                 | `/servizi-service-v1`                 | Student services management                                       |
| Struttura               | `/struttura-service-v1`               | Organizational structure (faculties, departments, degree courses) |
| Tasse                   | `/tasse-service-v1`                   | Tuition fees and payments                                         |
| Tirocini                | `/tirocini-service-v1`                | Internship management                                             |
| Utenti                  | `/utenti-service-v1`                  | User account management                                           |
| Verbali                 | `/verbali-service-v1`                 | Exam records and minutes                                          |

---

## References

- **Swagger UI:** [ESSE3 REST API Docs](https://unimol.esse3.cineca.it/e3rest/docs/)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
