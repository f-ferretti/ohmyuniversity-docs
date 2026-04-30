---
title: Calesa API V1 | OhMyUniversity!
description: REST API documentation for the Calesa service (calesa-service-v1) - exam calendar management and booking in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Calesa API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Calesa service (calesa-service-v1) - exam calendar management and booking in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/calesa-api-v1
  - - meta
    - name: keywords
      content: calesa api, calendario esami, exam calendar api, esse3 rest api, cineca api, ohmyuniversity api, prenotazione esame, appello, iscritti, esito, pubblicazione esiti, sessione
  - - meta
    - name: twitter:title
      content: Calesa API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Calesa service (calesa-service-v1) - exam calendar management and booking in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Calesa (Calendario Esami e Prenotazione) API V1

**ENG:** `Exam Calendar & Booking`

**Version:** `1.25.0` · **Base URL:** `/calesa-service-v1`

Service for managing the exam calendar in ESSE3, including creation and update of exam sessions (appelli), student bookings, grade entry, results publication, and integration with external logistics systems.

---

## Main operations

- Consulting the exam calendar
- Creating and updating an exam session (appello)
- Student booking and cancellation
- Grade acknowledgement (presa visione)
- Results publication
- Grade entry
- External logistics system (aule/edifici) integration

---

## Changelog

| Version | ESSE3 Release | Changes                                                                                                                                                   |
| ------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1.0   | 17.07.03.00   | Added `/appelli/{cdsId}/{adId}/{appId}/pubblicazione`, `/turni/{appLogId}/pubblicazione`, `/iscritti/{stuId}/esito`                                       |
| 1.2.0   | 17.09.04.00   | Added `UTENTE_TECNICO` (grp16) support                                                                                                                    |
| 1.3.0   | 17.12.02.00   | Enabled `STUDENTE` access to `/appelli/{cdsId}/{adId}/{appId}`; added `q=APPELLI_PRENOTABILI` filter                                                      |
| 1.4.0   | 18.02.00.00   | Added `extAulaCod` on turn; added `desAppello`, `desTurno`, `dataOraInizioTurno` on `IscrizioneAppello`                                                   |
| 1.5.0   | 18.04.01.00   | Added `/sessioni` and children                                                                                                                            |
| 1.6.0   | 18.06.02.00   | Fixed booking bug on warning; added commission management on PUT appello                                                                                  |
| 1.7.0   | 18.10.01.00   | Added linked exam management on POST, PUT, GEST appello                                                                                                   |
| 1.8.0   | 18.12.01.00   | Added linked booking management on `presaVisione` endpoints                                                                                               |
| 1.9.0   | 19.04.01.00   | Added `/sistLogExt/export` and children                                                                                                                   |
| 1.10.0  | 19.10.03.00   | Added `UTENTE_TECNICO` support to `/iscritti`, `/prenotazioni/{matId}` and `/prenotazioni/{matId}/{applistaId}`                                           |
| 1.11.0  | 20.01.00.00   | Added `attoreCod` field to POST `/iscritti` body (technical users only)                                                                                   |
| 1.12.0  | 20.05.01.00   | Added `/abilitazioni/{docenteId}`; added `userId` to `IscrizioneAppello`; added `UTENTE_TECNICO` grade loading via `docenteImpersId`; added Moodle filter |
| 1.13.0  | 20.06.00.00   | Added compensatory measures per booking                                                                                                                   |
| 1.14.0  | 20.07.02.00   | Added optional `config` and `attoreCod` query param to `/appelli/{cdsId}/{adId}` and `/appelli/{cdsId}/{adId}/{appId}`                                    |
| 1.15.0  | 20.10.02.00   | Added `tipoSvolgimentoEsame` to booking POST and grade entry PUT                                                                                          |
| 1.16.0  | 20.11.00.00   | Added `/sistLogExt/update`                                                                                                                                |
| 1.17.0  | 21.03.03.00   | Added turn-group template code on exam load                                                                                                               |
| 1.18.0  | 21.04.03.00   | Added `q=APPELLI_PRENOTABILI_E_FUTURI` filter                                                                                                             |
| 1.19.0  | 21.05.02.00   | Added `/abilitazioni/{docenteId}/appelli`                                                                                                                 |
| 1.20.0  | 21.06.01.00   | Added `/appelli/{cdsId}/{adId}/{appId}/tipi-svolgimento-esame`                                                                                            |
| 1.21.0  | 21.10.00.00   | Added English event descriptions on `/sistLogExt/export/{elabId}/eventi`                                                                                  |
| 1.22.0  | 21.10.01.00   | Added common exam (esame comune) management                                                                                                               |
| 1.23.0  | 21.11.00.00   | Added `/appelli/{cdsId}/{adId}/{appId}/tags/{adsceId}`                                                                                                    |
| 1.24.0  | 22.06.00.00   | Added `/appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}`                                                                                                  |
| 1.25.0  | 23.03.02.00   | Added booking slip (PDF) and exam attendance certificate (PDF) endpoints                                                                                  |

---

## Endpoints - Authorizations (Abilitazione)

### `GET /abilitazioni` - Get teacher authorizations

```java
/**
 * Returns the list of teacher authorization records (AbilitazioniDocente).
 * At least one filter parameter must be provided to retrieve data.
 *
 * @param cdsAbilId   long   (query, optional) - degree course ID of the common exam
 * @param cdsAbilCod  string (query, optional) - degree course code of the common exam
 * @param adAbilId    long   (query, optional) - teaching activity ID of the common exam
 * @param adAbilCod   string (query, optional) - teaching activity code of the common exam
 * @param aaOffAbilId int    (query, optional) - definition year of the common exam (4 digits)
 * @return List<AbilitazioniDocente> list of teacher authorizations,
 *         or an empty array if none match the filters
 */
GET /abilitazioni
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent`

#### Response **`200 OK`**

```json
[
  {
    "aaAbilDocId": 2015, // authorization year (primary key)
    "cdsId": 10, // degree course ID (primary key)
    "cdsDefAppCod": "30", // degree course code
    "adId": 10, // teaching activity ID (primary key)
    "adDefAppCod": "30", // teaching activity code
    "docenteId": 11234, // teacher ID (primary key)
    "docenteCognome": "Rossi", // teacher surname
    "docenteNome": "Mario", // teacher first name
    "defApp": 1, // exam definition mode
    "visApp": 1, // exam visibility mode
    "minAaSesId": 2010, // min session year for which the authorization is valid (optional)
    "maxAaSesId": 2010, // max session year for which the authorization is valid (optional)
    "gruppoGiudCod": "9999", // judgement-type grade group code (optional)
    "gruppoVotoCod": "30", // numeric-vote grade group code (optional)
    "figliEsacom": [
      // child CDS/AD pairs of a common exam, if applicable (optional)
      {
        "cdsId": 10, // parent degree course ID (primary key)
        "adId": 10, // parent teaching activity ID (primary key)
        "aaOffId": 10, // offer year (primary key)
        "cdsFiglioId": 10, // child degree course ID (primary key)
        "adFiglioId": 10, // child teaching activity ID (primary key)
        "cdsFiglioCod": "CDS1", // child degree course code
        "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
        "adFiglioCod": "AD_F_1", // child teaching activity code
        "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
        "docenteId": 10 // teacher ID (primary key)
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /abilitazioni/{docenteId}` - Get authorizations by teacher

```java
/**
 * Returns the list of teaching authorizations for a given teacher.
 *
 * @param docenteId long (path, required) - teacher ID
 * @return List<AbilitazioniDocente> list of authorizations for the teacher,
 *         or an empty array if none are found
 */
GET /abilitazioni/{docenteId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "aaAbilDocId": 2015, // authorization year (primary key)
    "cdsId": 10, // degree course ID (primary key)
    "cdsDefAppCod": "30", // degree course code
    "adId": 10, // teaching activity ID (primary key)
    "adDefAppCod": "30", // teaching activity code
    "docenteId": 11234, // teacher ID (primary key)
    "docenteCognome": "Rossi", // teacher surname
    "docenteNome": "Mario", // teacher first name
    "defApp": 1, // exam definition mode
    "visApp": 1, // exam visibility mode
    "minAaSesId": 2010, // min session year for which the authorization is valid (optional)
    "maxAaSesId": 2010, // max session year for which the authorization is valid (optional)
    "gruppoGiudCod": "9999", // judgement-type grade group code (optional)
    "gruppoVotoCod": "30", // numeric-vote grade group code (optional)
    "figliEsacom": [
      // child CDS/AD pairs of a common exam, if applicable (optional)
      {
        "cdsId": 10, // parent degree course ID (primary key)
        "adId": 10, // parent teaching activity ID (primary key)
        "aaOffId": 10, // offer year (primary key)
        "cdsFiglioId": 10, // child degree course ID (primary key)
        "adFiglioId": 10, // child teaching activity ID (primary key)
        "cdsFiglioCod": "CDS1", // child degree course code
        "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
        "adFiglioCod": "AD_F_1", // child teaching activity code
        "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
        "docenteId": 10 // teacher ID (primary key)
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /abilitazioni/{docenteId}/appelli` - Get exams linked to teacher authorizations

```java
/**
 * Returns the list of exam sessions (appelli) linked to the authorizations
 * of a given teacher, filtered by a mandatory date range (max 30 days).
 *
 * @param docenteId      long   (path, required)  - teacher ID
 * @param minDataApp     string (query, required)  - minimum exam date (DD/MM/YYYY)
 * @param maxDataApp     string (query, required)  - maximum exam date (DD/MM/YYYY)
 * @param aaCalId        int    (query, optional)  - exam calendar year (1900–2099)
 * @param stato          string (query, optional)  - exam session status
 * @param statoInsEsiti  string (query, optional)  - grade entry status (C=not started, A=in progress, F=completed)
 * @param statoPubblEsiti string (query, optional) - results publication status (C, A, F)
 * @param statoVerb      string (query, optional)  - verbalization status (C, A, F)
 * @param recenteFlg     int    (query, optional)  - whether the exam is considered recent (0=no, 1=yes)
 * @param q              string (query, optional)  - predefined filter; supported value:
 *                                                   APPELLI_MOODLE_QUIZ - returns only exams integrated with Moodle quiz management
 * @return List<AppelloAbildoc> list of exam sessions linked to the teacher's authorizations,
 *         or an empty array if none match
 */
GET /abilitazioni/{docenteId}/appelli
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // degree course ID (primary key)
    "adId": 10, // teaching activity ID (primary key)
    "desApp": "primo appello", // free-text exam description
    "tipoDefAppCod": "STD", // exam definition mode code
    "tipoGestAppCod": "STD", // exam management mode code
    "tipoGestPrenCod": "STD", // booking management mode code
    "dataInizioIscr": "10/10/2016", // registration start date (DD/MM/YYYY)
    "dataFineIscr": "16/10/2016", // registration end date (DD/MM/YYYY)
    "dataInizioApp": "20/10/2016", // exam start date (DD/MM/YYYY)
    "oraEsa": "01/01/1900 10:00:00", // exam time of the minimum associated turn
    "riservatoFlg": 0, // reserved exam, hidden to students (0=no, 1=yes)
    "tipoSceltaTurno": 0, // turn selection mode (0=system-assigned, 1=student selects compatible, 2=student selects any free)
    "condId": 11234, // associated SQL condition ID
    "gruppoVotoId": 1, // grade group ID, if degree courses have different grade groups (optional)
    "sedeId": 11234, // campus ID associated to the exam (optional)
    "tagTemplId": 11234, // tag template group ID, requires tag selection at booking (optional)
    "note": "Note dell'appello", // exam notes
    "noteSistLog": "Note dell'appello", // notes for the external logistics system (optional)
    "aaCalId": 0, // exam calendar year
    "appelloId": 10, // absolute exam ID
    "appId": 10, // progressive exam ID within (cdsId, adId) (primary key)
    "tipoAppCod": "PF", // exam type (PF=Final Exam, PP=Partial Exam)
    "tipoIscrCod": "S", // registration mode (S=Written, O=Oral, SO=Written+Oral)
    "tipoEsaCod": "S", // exam mode (S=Written, O=Oral, SOC=Written+Oral Joint, SOS=Written+Oral Separate)
    "cdsCod": "CDS1", // degree course code
    "cdsDes": "Corso di studio di esempio", // degree course description
    "adCod": "AD15556", // teaching activity code
    "adDes": "Attività di esempio", // teaching activity description
    "tipoDefAppDes": "Appello Standard", // exam definition mode description
    "tipoGestAppDes": "Appello Standard", // exam management mode description
    "tipoGestPrenDes": "Appello Standard", // booking management mode description
    "presidenteId": 11234, // commission president teacher ID
    "presidenteCognome": "Rossi", // commission president surname
    "presidenteNome": "Mario", // commission president first name
    "stato": "C", // overall exam status
    "statoDes": "C", // exam status description
    "statoInsEsiti": "A", // grade entry status (C=not started, A=in progress, F=completed)
    "statoPubblEsiti": "A", // results publication status (C, A, F)
    "statoVerb": "A", // verbalization status (C, A, F)
    "statoAperturaApp": "C", // exam opening status (C, A, F)
    "statoLog": "string", // logistics process status (G=generated, C=consolidated, I=sent, R=returned, A=activated)
    "numIscritti": 12, // number of enrolled students
    "numPubblicazioni": 12, // number of publications made
    "numVerbaliCar": 12, // number of loaded verbals
    "numVerbaliGen": 12, // number of generated but not yet loaded verbals
    "periodoId": 11234, // associated period ID (optional)
    "indexId": 11234, // index ID of the associated manager (optional)
    "commPianId": 11234, // planning commission ID (optional)
    "capostipiteId": 11234, // guide code ID that generated the exam (optional)
    "datacalId": 11234, // planning date ID used for exam generation (optional)
    "config": {
      // exam configuration (optional)
      "tipoGestApp": {
        "tipoGestAppCod": "STD", // exam management type code
        "des": "descrizione" // exam management type description
      },
      "tipoGestPren": {
        "tipoGestPrenCod": "STD", // booking management type code
        "des": "des", // booking management type description
        "listaStudentiFlg": 0, // student list enabled flag
        "regAppFlg": 0, // exam register flag
        "chkCancPren": 1 // check on booking cancellation
      },
      "tipoGestPrenAttore": [
        { "key": "std", "value": "std" } // booking config key-value pairs per actor (primary key: key, value)
      ],
      "tipoGestAppDett": [
        { "key": "std", "value": "std" } // exam management config key-value pairs (primary key: key, value)
      ]
    },
    "turni": [
      // list of associated turns (optional)
      {
        "cdsId": 10, // degree course ID (primary key)
        "adId": 10, // teaching activity ID (primary key)
        "appId": 10, // exam progressive ID (primary key)
        "appLogId": 10, // turn progressive ID within the exam (primary key)
        "des": "descrizione libera del turno", // turn free description
        "dataOraEsa": "10/10/2016 10:00:00", // turn date and time (DD/MM/YYYY HH:MM:SS)
        "edificioId": 10, // building ID
        "aulaId": 10, // classroom ID (requires edificioId)
        "fatPartCod": "A1", // partition factor code
        "domPartCod": "AK", // partition domain code (requires fatPartCod)
        "edificioCod": "ED1", // building code
        "edificioDes": "Edificio di prova", // building description
        "aulaCod": "AU1", // classroom code
        "extAulaCod": "AU1", // classroom code on the external logistics system (optional)
        "aulaDes": "Aula di prova", // classroom description
        "numIscritti": 12, // number of students enrolled in this turn
        "docenteId": 10 // teacher ID (primary key)
      }
    ],
    "docenteId": 10 // teacher ID (primary key)
  }
]
```

<br>

---

<br>

### `GET /abilitazioni/{docenteId}/{cdsId}/{adId}` - Get authorizations by teacher and CDS/AD pair

```java
/**
 * Returns the list of teaching authorizations for a given teacher,
 * scoped to a specific degree course and teaching activity pair.
 *
 * @param docenteId long (path, required) - teacher ID
 * @param cdsId     long (path, required) - degree course ID
 * @param adId      long (path, required) - teaching activity ID
 * @return List<AbilitazioniDocente> list of authorizations for the given teacher and CDS/AD pair,
 *         or an empty array if none are found
 */
GET /abilitazioni/{docenteId}/{cdsId}/{adId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "aaAbilDocId": 2015, // authorization year (primary key)
    "cdsId": 10, // degree course ID (primary key)
    "cdsDefAppCod": "30", // degree course code
    "adId": 10, // teaching activity ID (primary key)
    "adDefAppCod": "30", // teaching activity code
    "docenteId": 11234, // teacher ID (primary key)
    "docenteCognome": "Rossi", // teacher surname
    "docenteNome": "Mario", // teacher first name
    "defApp": 1, // exam definition mode
    "visApp": 1, // exam visibility mode
    "minAaSesId": 2010, // min session year for which the authorization is valid (optional)
    "maxAaSesId": 2010, // max session year for which the authorization is valid (optional)
    "gruppoGiudCod": "9999", // judgement-type grade group code (optional)
    "gruppoVotoCod": "30", // numeric-vote grade group code (optional)
    "figliEsacom": [
      // child CDS/AD pairs of a common exam, if applicable (optional)
      {
        "cdsId": 10, // parent degree course ID (primary key)
        "adId": 10, // parent teaching activity ID (primary key)
        "aaOffId": 10, // offer year (primary key)
        "cdsFiglioId": 10, // child degree course ID (primary key)
        "adFiglioId": 10, // child teaching activity ID (primary key)
        "cdsFiglioCod": "CDS1", // child degree course code
        "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
        "adFiglioCod": "AD_F_1", // child teaching activity code
        "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
        "docenteId": 10 // teacher ID (primary key)
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /abilitazioni/{docenteId}/{cdsId}/{adId}/{aaOffAbilDocId}` - Get single teacher authorization

```java
/**
 * Returns a single teaching authorization for a given teacher,
 * identified by the CDS/AD pair and the authorization year.
 *
 * @param docenteId      long (path, required) - teacher ID
 * @param cdsId          long (path, required) - degree course ID
 * @param adId           long (path, required) - teaching activity ID
 * @param aaOffAbilDocId long (path, required) - teacher authorization year
 * @return AbilitazioniDocente the matching authorization, or 404 if not found
 */
GET /abilitazioni/{docenteId}/{cdsId}/{adId}/{aaOffAbilDocId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "aaAbilDocId": 2015, // authorization year (primary key)
  "cdsId": 10, // degree course ID (primary key)
  "cdsDefAppCod": "30", // degree course code
  "adId": 10, // teaching activity ID (primary key)
  "adDefAppCod": "30", // teaching activity code
  "docenteId": 11234, // teacher ID (primary key)
  "docenteCognome": "Rossi", // teacher surname
  "docenteNome": "Mario", // teacher first name
  "defApp": 1, // exam definition mode
  "visApp": 1, // exam visibility mode
  "minAaSesId": 2010, // min session year for which the authorization is valid (optional)
  "maxAaSesId": 2010, // max session year for which the authorization is valid (optional)
  "gruppoGiudCod": "9999", // judgement-type grade group code (optional)
  "gruppoVotoCod": "30", // numeric-vote grade group code (optional)
  "figliEsacom": [
    // child CDS/AD pairs of a common exam, if applicable (optional)
    {
      "cdsId": 10, // parent degree course ID (primary key)
      "adId": 10, // parent teaching activity ID (primary key)
      "aaOffId": 10, // offer year (primary key)
      "cdsFiglioId": 10, // child degree course ID (primary key)
      "adFiglioId": 10, // child teaching activity ID (primary key)
      "cdsFiglioCod": "CDS1", // child degree course code
      "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
      "adFiglioCod": "AD_F_1", // child teaching activity code
      "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
      "docenteId": 10 // teacher ID (primary key)
    }
  ]
}
```

<br>

---

<br>

### `GET /appelli` - Get available CDS/AD pairs for exam operations

```java
/**
 * Returns the list of CDS/AD pairs on which exam operations can be performed.
 * At least one filter between course parameters (cdsAbilId or cdsAbilCod)
 * and activity parameters (adAbilId or adAbilCod) must be provided.
 *
 * For students, results can be further scoped to a specific career track
 * via matricola or matId. For teachers, these parameters are not allowed.
 *
 * @param cdsAbilId   long   (query, optional) - degree course ID
 * @param cdsAbilCod  string (query, optional) - degree course code
 * @param adAbilId    long   (query, optional) - teaching activity ID
 * @param adAbilCod   string (query, optional) - teaching activity code
 * @param aaOffAbilId int    (query, optional) - offer year (4 digits)
 * @param matricola   string (query, optional) - student registration number (students only)
 * @param matId       long   (query, optional) - student career track ID (students only)
 * @return List<AttivitaPerAppello> list of CDS/AD pairs available for exam operations,
 *         or an empty array if none match
 */
GET /appelli
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserDependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsDefAppId": 10, // degree course ID for exam definition (primary key)
    "adDefAppId": 10, // teaching activity ID for exam definition (primary key)
    "aaOffId": 2010, // latest offer year in which the CDS/AD pair is active (primary key)
    "adCod": "CDS1", // teaching activity code
    "adDes": "Corso di studio di esempio", // teaching activity description
    "matId": 1234 // student career track ID linked to this CDS/AD pair (optional)
  }
]
```

<br>

---

<br>

## Endpoints - Exam Sessions (Appello)

### `GET /abilitazioni/{docenteId}/appelli` - Get exams linked to teacher authorizations

::: info
This endpoint is also listed under the **Abilitazione** tag. Full documentation is available at
[`GET /abilitazioni/{docenteId}/appelli`](#get-abilitazioni-docenteid-appelli).
:::

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}` - Get exam sessions by CDS/AD pair

```java
/**
 * Returns the list of exam sessions (appelli) for a given degree course
 * and teaching activity pair. At least one filter between course parameters
 * (cdsId) and activity parameters (adId) must be provided.
 *
 * @param cdsId           long   (path, required)  - degree course ID
 * @param adId            long   (path, required)  - teaching activity ID
 * @param aaCalId         int    (query, optional)  - exam calendar year (1900–2099)
 * @param minDataApp      string (query, optional)  - minimum exam date (DD/MM/YYYY)
 * @param maxDataApp      string (query, optional)  - maximum exam date (DD/MM/YYYY)
 * @param stato           string (query, optional)  - exam session status
 * @param statoInsEsiti   string (query, optional)  - grade entry status (C=not started, A=in progress, F=completed)
 * @param statoPubblEsiti string (query, optional)  - results publication status (C, A, F)
 * @param statoVerb       string (query, optional)  - verbalization status (C, A, F)
 * @param recenteFlg      int    (query, optional)  - whether the exam is considered recent (0=no, 1=yes)
 * @param persId          long   (query, optional)  - student person ID to search bookable exams for; UTENTE_TECNICO only
 * @param attoreCod       string (query, optional)  - actor type for config filtering (STU, DOC, SEG);
 *                                                    defaults to current user's actor if null
 * @param q               string (query, optional)  - predefined filter; supported values:
 *                                                    APPELLI_PRENOTABILI - bookable exams with no existing booking (STUDENTE, TECNICO only)
 *                                                    APPELLI_PRENOTABILI_E_FUTURI - bookable or future exams with no booking (STUDENTE, TECNICO only)
 *                                                    APPELLI_MOODLE_QUIZ - exams integrated with Moodle quiz management
 * @return List<Appello> list of exam sessions for the given CDS/AD pair,
 *         or an empty array if none match
 */
GET /appelli/{cdsId}/{adId}
```

**Auth:** `STUDENTE` · `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // degree course ID (primary key)
    "adId": 10, // teaching activity ID (primary key)
    "desApp": "primo appello", // free-text exam description
    "tipoDefAppCod": "STD", // exam definition mode code
    "tipoGestAppCod": "STD", // exam management mode code
    "tipoGestPrenCod": "STD", // booking management mode code
    "dataInizioIscr": "10/10/2016", // registration start date (DD/MM/YYYY)
    "dataFineIscr": "16/10/2016", // registration end date (DD/MM/YYYY)
    "dataInizioApp": "20/10/2016", // exam start date (DD/MM/YYYY)
    "oraEsa": "01/01/1900 10:00:00", // exam time of the minimum associated turn
    "riservatoFlg": 0, // reserved exam, hidden to students (0=no, 1=yes)
    "tipoSceltaTurno": 0, // turn selection mode (0=system-assigned, 1=student selects compatible, 2=student selects any free)
    "condId": 11234, // associated SQL condition ID
    "gruppoVotoId": 1, // grade group ID (optional)
    "sedeId": 11234, // campus ID (optional)
    "tagTemplId": 11234, // tag template group ID (optional)
    "note": "Note dell'appello", // exam notes
    "noteSistLog": "Note dell'appello", // notes for the external logistics system (optional)
    "aaCalId": 0, // exam calendar year
    "appelloId": 10, // absolute exam ID
    "appId": 10, // progressive exam ID within (cdsId, adId) (primary key)
    "tipoAppCod": "PF", // exam type (PF=Final Exam, PP=Partial Exam)
    "tipoIscrCod": "S", // registration mode (S=Written, O=Oral, SO=Written+Oral)
    "tipoEsaCod": "S", // exam mode (S=Written, O=Oral, SOC=Written+Oral Joint, SOS=Written+Oral Separate)
    "cdsCod": "CDS1", // degree course code
    "cdsDes": "Corso di studio di esempio", // degree course description
    "adCod": "AD15556", // teaching activity code
    "adDes": "Attività di esempio", // teaching activity description
    "tipoDefAppDes": "Appello Standard", // exam definition mode description
    "tipoGestAppDes": "Appello Standard", // exam management mode description
    "tipoGestPrenDes": "Appello Standard", // booking management mode description
    "presidenteId": 11234, // commission president teacher ID
    "presidenteCognome": "Rossi", // commission president surname
    "presidenteNome": "Mario", // commission president first name
    "stato": "C", // overall exam status
    "statoDes": "C", // exam status description
    "statoInsEsiti": "A", // grade entry status (C=not started, A=in progress, F=completed)
    "statoPubblEsiti": "A", // results publication status (C, A, F)
    "statoVerb": "A", // verbalization status (C, A, F)
    "statoAperturaApp": "C", // exam opening status (C, A, F)
    "statoLog": "string", // logistics process status (G=generated, C=consolidated, I=sent, R=returned, A=activated)
    "numIscritti": 12, // number of enrolled students
    "numPubblicazioni": 12, // number of publications made
    "numVerbaliCar": 12, // number of loaded verbals
    "numVerbaliGen": 12, // number of generated but not yet loaded verbals
    "periodoId": 11234, // associated period ID (optional)
    "indexId": 11234, // index ID of the associated manager (optional)
    "commPianId": 11234, // planning commission ID (optional)
    "capostipiteId": 11234, // guide code ID that generated the exam (optional)
    "datacalId": 11234, // planning date ID used for exam generation (optional)
    "config": {
      // exam configuration (optional)
      "tipoGestApp": {
        "tipoGestAppCod": "STD", // exam management type code (primary key)
        "des": "descrizione" // exam management type description
      },
      "tipoGestPren": {
        "tipoGestPrenCod": "STD", // booking management type code (primary key)
        "des": "des", // booking management type description
        "listaStudentiFlg": 0, // student list enabled flag
        "regAppFlg": 0, // exam register flag
        "chkCancPren": 1 // check on booking cancellation
      },
      "tipoGestPrenAttore": [
        { "key": "std", "value": "std" } // booking config key-value pairs per actor (primary key: key, value)
      ],
      "tipoGestAppDett": [
        { "key": "std", "value": "std" } // exam management config key-value pairs (primary key: key, value)
      ]
    }
  }
]
```

<br>

---

<br>

### `POST /appelli/{cdsId}/{adId}` - Create a new exam session

```java
/**
 * Creates a new exam session (appello) for a given CDS/AD pair.
 * If cdsId and adId are not set in the body, they are taken from the path.
 * If aaCalId is not set, it defaults to the maximum authorization year
 * for the teacher's CDS/AD pair.
 *
 * Turns (turni) are optional: if omitted, one turn is automatically created
 * with the same date as the exam. If provided, the minimum turn date must
 * match the exam start date, and all turn dates must fall within the
 * associated sessions.
 *
 * Sessions (sessioni) are optional: if omitted, all sessions compatible
 * with the exam date are associated automatically.
 *
 * Commission (commissione) is optional: if omitted, the inserting teacher
 * is added automatically, or commissions are derived from the
 * ASSOCIA_COMM_APP configuration parameter.
 *
 * Links (links) require either templvotoId or (cdsId, adId, appId) of the
 * linked exam, plus a valid tipoRelAppCod.
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param body  InserimentoAppello (body, required) - exam session object to insert
 * @return 201 Created on success
 */
POST /appelli/{cdsId}/{adId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "cdsId": 10, // degree course ID (primary key, defaults to path if omitted)
  "adId": 10, // teaching activity ID (primary key, defaults to path if omitted)
  "desApp": "primo appello", // free-text exam description
  "tipoDefAppCod": "STD", // exam definition mode code
  "tipoGestAppCod": "STD", // exam management mode code
  "tipoGestPrenCod": "STD", // booking management mode code
  "dataInizioIscr": "10/10/2016", // registration start date (DD/MM/YYYY)
  "dataFineIscr": "16/10/2016", // registration end date (DD/MM/YYYY)
  "dataInizioApp": "20/10/2016", // exam start date (DD/MM/YYYY) - required
  "oraEsa": "01/01/1900 10:00:00", // exam time
  "riservatoFlg": 0, // reserved exam, hidden to students (0=no, 1=yes)
  "tipoSceltaTurno": 0, // turn selection mode (0=system-assigned, 1=student selects compatible, 2=student selects any free)
  "condId": 11234, // associated SQL condition ID
  "gruppoVotoId": 1, // grade group ID (optional)
  "sedeId": 11234, // campus ID (optional)
  "tagTemplId": 11234, // tag template group ID (optional)
  "note": "Note dell'appello", // exam notes
  "noteSistLog": "Note dell'appello", // notes for the external logistics system (optional)
  "aaCalId": 2020, // exam calendar year - required
  "templateTurnoCod": "LIS", // turn group template code
  "tipoIscrCod": "S", // registration mode (S=Written, O=Oral, SO=Written+Oral)
  "tipoEsaCod": "S", // exam mode (S=Written, O=Oral, SOC=Written+Oral Joint, SOS=Written+Oral Separate)
  "turni": [
    // list of turns (optional - one auto turn created if omitted)
    {
      "des": "descrizione libera del turno", // turn free description
      "dataOraEsa": "10/10/2016 10:00:00", // turn date and time - required (DD/MM/YYYY HH:MM:SS)
      "edificioId": 10, // building ID
      "aulaId": 10, // classroom ID (requires edificioId)
      "fatPartCod": "A1", // partition factor code
      "domPartCod": "AK" // partition domain code (requires fatPartCod)
    }
  ],
  "sessioni": [
    // list of sessions (optional - all compatible sessions if omitted)
    {
      "aaSesId": 10, // session year (primary key) - required
      "sesId": 10 // session progressive ID (primary key) - required
    }
  ],
  "commissione": [
    // list of commission members (optional)
    {
      "docenteId": 10, // teacher ID (primary key) - required
      "ruoloCod": "P" // role code - required (P=President)
    }
  ],
  "links": [
    // list of linked exams (optional)
    {
      "templvotoRelId": 11, // linked exam grade template ID (alternative to cdsRelId+adRelId+appRelId)
      "cdsRelId": 31, // linked exam degree course ID
      "adRelId": 32, // linked exam teaching activity ID
      "appRelId": 33, // linked exam progressive ID
      "tipoLinkRelAppCod": "COMP_APP_PF" // link type code - required
    }
  ]
}
```

#### Response **`201 Created`**

Empty body on success.

::: warning Return codes
A `412 Precondition Failed` is returned on insertion failure. The `retCode` field in the response body indicates the specific error:

| Code | Description                                                                               |
| ---- | ----------------------------------------------------------------------------------------- |
| -1   | Invalid exam parameters                                                                   |
| -2   | Turn `XX` with `cds_id=AAA`: `data_esa` not set                                           |
| -3   | Logistics system turn management is enabled - turns cannot be inserted at definition time |
| -4   | Session `XX` with `cds_id=AAA`: `aa_ses_id` or `ses_id` not set                           |
| -5   | Teacher `XX` with `cds_id=AAA`: `docente_id` or `ruolo_cod` not set                       |
| -6   | Error in period completeness check                                                        |
| -7   | No valid session could be associated to the exam                                          |
| -8   | Web call but session ID does not belong to a teacher                                      |
| -9   | Error retrieving `TIPI_DEF_APP` configuration                                             |
| -10  | Could not calculate the index to associate to the exam                                    |
| -11  | Could not load the commission for the exam                                                |
| -12  | Cannot insert exam: `p09_cds_ad_gen.def_app_flg = 0`                                      |
| -13  | UP synchronization failed                                                                 |
| -14  | Cannot create exam on a module if `tipo_esa_cod_prev != 'UD'`                             |
| -15  | Error creating the grade template for the exam                                            |
| -16  | A teacher with president role must be provided                                            |
| -17  | Turn date is not compatible with exam dates                                               |
| -18  | Minimum turn date must match exam start date                                              |
| -19  | Could not determine `gruppo_voto_id`                                                      |
| -20  | Invalid parameters for exam link associations                                             |
| -21  | Error inserting/updating/deleting exam link associations                                  |
| -22  | Unhandled error code in exam link associations                                            |
| -23  | Invalid turn template code                                                                |
| -24  | Turn template data must have date and time set                                            |
| -25  | Turn `XX` with `cds_id=XX`: `fat_part_cod` set but `dom_part_cod` missing                 |
| -26  | Turn template data has `fat_part_cod` set but `dom_part_cod` missing                      |

:::

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}` - Get exam session details

```java
/**
 * Returns the full details of a single exam session (AppelloConDettagli),
 * including its turns, commissions, sessions, common exams, and links.
 *
 * @param cdsId                  long   (path, required)  - degree course ID
 * @param adId                   long   (path, required)  - teaching activity ID
 * @param appId                  long   (path, required)  - progressive exam ID within (cdsId, adId)
 * @param persId                 long   (query, optional)  - student person ID to check bookable exams for; UTENTE_TECNICO only
 * @param attoreCod              string (query, optional)  - actor type for config filtering (STU, DOC, SEG);
 *                                                          defaults to current user's actor if null
 * @param attoreCodTipoSvolgEsame string (query, optional) - actor type for exam mode filtering (STU, DOC, SEG);
 *                                                          defaults to current user's actor if null
 * @param q                      string (query, optional)  - predefined filter; supported values:
 *                                                          APPELLI_PRENOTABILI - returns exam only if student has no booking and it is bookable (STUDENTE only)
 *                                                          APPELLI_PRENOTABILI_E_FUTURI - returns exam only if student has no booking and it is bookable or future (STUDENTE only)
 *                                                          APPELLI_MOODLE_QUIZ - returns only exams integrated with Moodle quiz management
 * @return AppelloConDettagli the full exam session object, or 404 if not found
 */
GET /appelli/{cdsId}/{adId}/{appId}
```

**Auth:** `STUDENTE` · `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "cdsId": 10, // degree course ID (primary key)
  "adId": 10, // teaching activity ID (primary key)
  "desApp": "primo appello", // free-text exam description
  "tipoDefAppCod": "STD", // exam definition mode code
  "tipoGestAppCod": "STD", // exam management mode code
  "tipoGestPrenCod": "STD", // booking management mode code
  "dataInizioIscr": "10/10/2016", // registration start date (DD/MM/YYYY)
  "dataFineIscr": "16/10/2016", // registration end date (DD/MM/YYYY)
  "dataInizioApp": "20/10/2016", // exam start date (DD/MM/YYYY)
  "oraEsa": "01/01/1900 10:00:00", // exam time of the minimum associated turn
  "riservatoFlg": 0, // reserved exam, hidden to students (0=no, 1=yes)
  "tipoSceltaTurno": 0, // turn selection mode (0=system-assigned, 1=student selects compatible, 2=student selects any free)
  "condId": 11234, // associated SQL condition ID
  "gruppoVotoId": 1, // grade group ID (optional)
  "sedeId": 11234, // campus ID (optional)
  "tagTemplId": 11234, // tag template group ID (optional)
  "note": "Note dell'appello", // exam notes
  "noteSistLog": "Note dell'appello", // notes for the external logistics system (optional)
  "aaCalId": 0, // exam calendar year
  "appelloId": 10, // absolute exam ID
  "appId": 10, // progressive exam ID within (cdsId, adId) (primary key)
  "tipoAppCod": "PF", // exam type (PF=Final Exam, PP=Partial Exam)
  "tipoIscrCod": "S", // registration mode (S=Written, O=Oral, SO=Written+Oral)
  "tipoEsaCod": "S", // exam mode (S=Written, O=Oral, SOC=Written+Oral Joint, SOS=Written+Oral Separate)
  "cdsCod": "CDS1", // degree course code
  "cdsDes": "Corso di studio di esempio", // degree course description
  "adCod": "AD15556", // teaching activity code
  "adDes": "Attività di esempio", // teaching activity description
  "tipoDefAppDes": "Appello Standard", // exam definition mode description
  "tipoGestAppDes": "Appello Standard", // exam management mode description
  "tipoGestPrenDes": "Appello Standard", // booking management mode description
  "presidenteId": 11234, // commission president teacher ID
  "presidenteCognome": "Rossi", // commission president surname
  "presidenteNome": "Mario", // commission president first name
  "stato": "C", // overall exam status
  "statoDes": "C", // exam status description
  "statoInsEsiti": "A", // grade entry status (C=not started, A=in progress, F=completed)
  "statoPubblEsiti": "A", // results publication status (C, A, F)
  "statoVerb": "A", // verbalization status (C, A, F)
  "statoAperturaApp": "C", // exam opening status (C, A, F)
  "statoLog": "string", // logistics process status (G=generated, C=consolidated, I=sent, R=returned, A=activated)
  "numIscritti": 12, // number of enrolled students
  "numPubblicazioni": 12, // number of publications made
  "numVerbaliCar": 12, // number of loaded verbals
  "numVerbaliGen": 12, // number of generated but not yet loaded verbals
  "periodoId": 11234, // associated period ID (optional)
  "indexId": 11234, // index ID of the associated manager (optional)
  "commPianId": 11234, // planning commission ID (optional)
  "capostipiteId": 11234, // guide code ID that generated the exam (optional)
  "datacalId": 11234, // planning date ID used for exam generation (optional)
  "config": {
    // exam configuration (optional)
    "tipoGestApp": {
      "tipoGestAppCod": "STD", // exam management type code (primary key)
      "des": "descrizione" // exam management type description
    },
    "tipoGestPren": {
      "tipoGestPrenCod": "STD", // booking management type code (primary key)
      "des": "des", // booking management type description
      "listaStudentiFlg": 0, // student list enabled flag
      "regAppFlg": 0, // exam register flag
      "chkCancPren": 1 // check on booking cancellation
    },
    "tipoGestPrenAttore": [
      { "key": "std", "value": "std" } // booking config key-value pairs per actor (primary key: key, value)
    ],
    "tipoGestAppDett": [
      { "key": "std", "value": "std" } // exam management config key-value pairs (primary key: key, value)
    ]
  },
  "turni": [
    // list of associated turns
    {
      "cdsId": 10, // degree course ID (primary key)
      "adId": 10, // teaching activity ID (primary key)
      "appId": 10, // exam progressive ID (primary key)
      "appLogId": 10, // turn progressive ID within the exam (primary key)
      "des": "descrizione libera del turno", // turn free description
      "dataOraEsa": "10/10/2016 10:00:00", // turn date and time (DD/MM/YYYY HH:MM:SS)
      "edificioId": 10, // building ID
      "aulaId": 10, // classroom ID (requires edificioId)
      "fatPartCod": "A1", // partition factor code
      "domPartCod": "AK", // partition domain code (requires fatPartCod)
      "edificioCod": "ED1", // building code
      "edificioDes": "Edificio di prova", // building description
      "aulaCod": "AU1", // classroom code
      "extAulaCod": "AU1", // classroom code on the external logistics system (optional)
      "aulaDes": "Aula di prova", // classroom description
      "numIscritti": 12, // number of students enrolled in this turn
      "commissione": [
        // commission members for this turn
        {
          "cdsId": 10, // degree course ID (primary key)
          "adId": 10, // teaching activity ID (primary key)
          "appId": 10, // exam progressive ID (primary key)
          "appLogId": 10, // turn progressive ID (primary key)
          "docenteId": 10, // teacher ID (primary key)
          "ruoloCod": "P", // role code (P=President)
          "idAb": 1234, // address book ID in UGOV
          "docenteNome": "Mario", // teacher first name
          "docenteCognome": "Rossi", // teacher surname
          "ruoloDes": "P" // role description
        }
      ]
    }
  ],
  "sessioni": [
    // list of associated sessions
    {
      "cdsId": 10, // degree course ID (primary key)
      "adId": 10, // teaching activity ID (primary key)
      "appId": 10, // exam progressive ID (primary key)
      "aaSesId": 10, // session year (primary key)
      "sesId": 10, // session progressive ID (primary key)
      "sesDes": "string", // session description
      "dataInizio": "10/10/2016", // session start date (DD/MM/YYYY)
      "dataFine": "10/10/2016" // session end date (DD/MM/YYYY)
    }
  ],
  "commissione": [
    // commission members at exam level
    {
      "cdsId": 10, // degree course ID (primary key)
      "adId": 10, // teaching activity ID (primary key)
      "appId": 10, // exam progressive ID (primary key)
      "docenteId": 10, // teacher ID (primary key)
      "ruoloCod": "P", // role code (P=President)
      "idAb": 1234, // address book ID in UGOV
      "docenteNome": "Mario", // teacher first name
      "docenteCognome": "Rossi", // teacher surname
      "ruoloDes": "P" // role description
    }
  ],
  "esameComune": [
    // list of common exams associated to this exam
    {
      "cdsId": 10, // parent degree course ID (primary key)
      "adId": 10, // parent teaching activity ID (primary key)
      "aaOffId": 10, // offer year (primary key)
      "cdsFiglioId": 10, // child degree course ID (primary key)
      "adFiglioId": 10, // child teaching activity ID (primary key)
      "cdsFiglioCod": "CDS1", // child degree course code
      "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
      "adFiglioCod": "AD_F_1", // child teaching activity code
      "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
      "appId": 10 // exam progressive ID (primary key)
    }
  ],
  "links": [
    // list of linked exams
    {
      "templvotoId": 10, // grade template ID (primary key)
      "cdsId": 1, // degree course ID (primary key)
      "adId": 2, // teaching activity ID (primary key)
      "appId": 3, // exam progressive ID (primary key)
      "templvotoRelId": 11, // linked exam grade template ID
      "cdsRelId": 31, // linked exam degree course ID
      "adRelId": 32, // linked exam teaching activity ID
      "appRelId": 33, // linked exam progressive ID
      "tipoLinkRelAppCod": "COMP_APP_PF", // link type code on the linked exam side
      "tipoLinkAppCod": "COMP_APP", // link type code on this exam side
      "cdsRelCod": "cdsRelCod", // linked exam degree course code
      "adRelCod": "adRelCod", // linked exam teaching activity code
      "dataInizioRelApp": "10/10/2018", // linked exam start date (DD/MM/YYYY)
      "tipoIscrRelCod": "S", // linked exam registration mode
      "desRelApp": "desApp" // linked exam description
    }
  ],
  "tipiSvolgimentoEsame": [
    // list of valid exam delivery modes
    {
      "cdsId": 10, // degree course ID (primary key)
      "adId": 10, // teaching activity ID (primary key)
      "appId": 10, // exam progressive ID (primary key)
      "tipoSvolgimentoEsameCod": "P", // exam delivery mode code
      "tipoSvolgimentoEsameDes": "Presenza", // exam delivery mode description
      "attoreCod": "STU", // actor type for which this mode is valid
      "webFlg": 1 // visible on web (0=no, 1=yes)
    }
  ]
}
```

<br>

---

<br>

### `PUT /appelli/{cdsId}/{adId}/{appId}` - Update an exam session

```java
/**
 * Updates an existing exam session. Only fields explicitly set in the body
 * are modified; omitted or null fields are left unchanged.
 *
 * To explicitly clear a field, use the following null placeholders:
 *   - strings:  #!N!#
 *   - numerics: -1
 *   - dates:    01/01/1970
 *
 * Turn operations are controlled via appLogId:
 *   - appLogId > 0  → update the turn with that ID
 *   - appLogId = null → insert a new turn (dataOraEsa required)
 *   - appLogId < 0  → delete the turn whose ID equals abs(appLogId)
 *
 * Sessions: if omitted, sessions are recalculated by the system.
 *
 * Links: use positive IDs for insert/update, negative IDs for deletion.
 * Exam start date changes must be made via dataOraEsa on the turns, not
 * directly on dataInizioApp.
 *
 * @param cdsId                   long   (path, required)  - degree course ID
 * @param adId                    long   (path, required)  - teaching activity ID
 * @param appId                   long   (path, required)  - progressive exam ID within (cdsId, adId)
 * @param attoreCodTipoSvolgEsame string (query, optional) - actor type for exam mode filtering (STU, DOC, SEG);
 *                                                           defaults to current user's actor if null
 * @param body AggiornamentoAppello (body, required) - partial exam object with fields to update
 * @return AppelloConDettagli the updated exam session
 */
PUT /appelli/{cdsId}/{adId}/{appId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "cdsId": 10, // degree course ID (primary key)
  "adId": 10, // teaching activity ID (primary key)
  "appId": 10, // progressive exam ID (primary key)
  "desApp": "primo appello", // free-text exam description
  "tipoDefAppCod": "STD", // exam definition mode code
  "tipoGestAppCod": "STD", // exam management mode code
  "tipoGestPrenCod": "STD", // booking management mode code
  "dataInizioIscr": "10/10/2016", // registration start date (DD/MM/YYYY)
  "dataFineIscr": "16/10/2016", // registration end date (DD/MM/YYYY)
  "dataInizioApp": "20/10/2016", // exam start date - change via turn dataOraEsa instead
  "oraEsa": "01/01/1900 10:00:00", // exam time
  "riservatoFlg": 0, // reserved exam, hidden to students (0=no, 1=yes)
  "tipoSceltaTurno": 0, // turn selection mode (0=system-assigned, 1=compatible, 2=any free)
  "condId": 11234, // associated SQL condition ID
  "gruppoVotoId": 1, // grade group ID (optional)
  "sedeId": 11234, // campus ID (optional)
  "tagTemplId": 11234, // tag template group ID (optional)
  "note": "Note dell'appello", // exam notes
  "noteSistLog": "Note dell'appello", // notes for the external logistics system (optional)
  "tipoIscrCod": "S", // registration mode (S=Written, O=Oral, SO=Written+Oral)
  "tipoEsaCod": "O", // exam mode (S=Written, O=Oral, SOC=Joint, SOS=Separate)
  "invioCom": 0, // send communication flag (0=no, 1=yes)
  "turni": [
    // turns to insert, update or delete
    {
      "appLogId": 10, // turn ID: >0=update, null=insert, <0=delete abs(appLogId)
      "des": "descrizione libera del turno", // turn free description
      "dataOraEsa": "10/10/2016 10:00:00", // turn date and time (DD/MM/YYYY HH:MM:SS)
      "edificioId": 10, // building ID
      "aulaId": 10, // classroom ID (requires edificioId)
      "fatPartCod": "A1", // partition factor code
      "domPartCod": "AK", // partition domain code (requires fatPartCod)
      "commissione": [
        // commission members for this turn
        {
          "docenteId": 10, // teacher ID (primary key)
          "ruoloCod": "P", // role code (P=President)
          "ordineVisNum": 999 // display order
        }
      ]
    }
  ],
  "sessioni": [
    // sessions to associate (null = recalculated by system)
    {
      "aaSesId": 10, // session year (primary key)
      "sesId": 10 // session progressive ID (primary key)
    }
  ],
  "commissione": [
    // commission members at exam level
    {
      "docenteId": 10, // teacher ID (primary key)
      "ruoloCod": "P", // role code (P=President)
      "ordineVisNum": 999 // display order
    }
  ],
  "linkAppello": [
    // linked exams: positive ID=insert/update, negative ID=delete
    {
      "templvotoRelId": 11, // linked exam grade template ID
      "cdsRelId": 31, // linked exam degree course ID
      "adRelId": 32, // linked exam teaching activity ID
      "appRelId": 33, // linked exam progressive ID
      "tipoLinkRelAppCod": "COMP_APP_PF" // link type code
    }
  ]
}
```

#### Response **`200 OK`**

Returns the full updated `AppelloConDettagli` object. Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}`](#get-appelli-cdsid-adid-appid).

::: warning Return codes
A `422 Unprocessable Entity` is returned on update failure. The `retCode` field indicates the specific error:

| Code  | Description                                                                              |
| ----- | ---------------------------------------------------------------------------------------- |
| -2    | Error retrieving turn                                                                    |
| -1    | Web call but session ID does not belong to a teacher                                     |
| 2     | Exam not found                                                                           |
| 3     | Invalid sessions with enrolled students, or error inserting new sessions                 |
| 4     | Registration start date must be before registration end date                             |
| 5     | Registration end date must be between registration start and exam start date             |
| 6     | Exam start date is before registration end date                                          |
| 7     | Exam end date is not after exam start date                                               |
| 8     | Exam start date does not fall within any session                                         |
| 9     | Error checking date overlaps                                                             |
| 10    | Turn key not set but turn modifications requested                                        |
| 11    | Error sending communication                                                              |
| 12    | Turn dates are not before exam end date                                                  |
| 13    | Error updating `tipi_gest_app`                                                           |
| 14    | Error updating `tipo_app_cod`                                                            |
| 15    | Field is not modifiable                                                                  |
| 16    | Exam type `UD` is only allowed when a module is associated                               |
| 17    | Cannot change the associated module when students are enrolled                           |
| 18    | `tipoIscrCod` and `tipoEsaCod` must be set consistently                                  |
| 19    | Some provided sessions are not consistent with the exam                                  |
| 20    | Provided sessions are not compatible with the exam                                       |
| 21    | Missing required fields for turn insertion                                               |
| 22    | Turn cannot be deleted because students are enrolled                                     |
| 23    | Turn cannot be deleted because it is the system-generated default turn                   |
| 24    | Turn cannot be deleted because it is the last turn of the exam                           |
| 25    | Some enrolled students have exam pass dates earlier than the exam date                   |
| 26    | Grade scale is not compatible with the exam                                              |
| 27-28 | Cannot change grade scale when students are enrolled                                     |
| 29    | Could not load commission for the exam                                                   |
| 30    | Could not load index for the exam                                                        |
| 31    | Cannot change the exam group when students are enrolled                                  |
| 32    | Attempting to insert a disabled classroom                                                |
| 33    | Turn modification is not compatible with exam sessions                                   |
| 34    | Commission data inconsistent: `docente_id` or `ruolo_cod` not set                        |
| 35    | Commission data inconsistent: turn commission present but `pi_app_log_id` not set        |
| 36    | Commission data inconsistent: invalid `ordine_vis_num` value                             |
| 37    | Commission can have at most one president                                                |
| 38    | Commission must have at least one president                                              |
| 39    | Duplicate display order values in commission                                             |
| 40    | Cannot modify turn commission when there is only one turn                                |
| 41    | Turn commission contains teachers not present in the exam commission                     |
| 42    | Cannot add turns to an exam whose `tipo_def_app` uses external logistics synchronization |
| 43    | Invalid parameters for exam link associations                                            |
| 44    | Error inserting/updating/deleting exam link associations                                 |
| 45    | Unhandled error code in exam link associations                                           |

:::

<br>

---

<br>

### `DELETE /appelli/{cdsId}/{adId}/{appId}` - Delete an exam session

```java
/**
 * Deletes an exam session. A force flag controls whether the deletion
 * can proceed in the presence of enrolled students, publications, or
 * external logistics submissions.
 *
 * @param cdsId     long (path, required)  - degree course ID
 * @param adId      long (path, required)  - teaching activity ID
 * @param appId     long (path, required)  - progressive exam ID within (cdsId, adId)
 * @param forzaCanc long (query, required) - deletion force level (0–3):
 *                                           0 = no force
 *                                           1 = force if students enrolled but no publications or verbals generated
 *                                           2 = force if students enrolled and publications generated but no verbals
 *                                           3 = force if exam was sent to UP but not yet returned
 * @return 204 No Content on success
 */
DELETE /appelli/{cdsId}/{adId}/{appId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Response **`204 No Content`**

Empty body on success.

::: warning Return codes
A `422 Unprocessable Entity` is returned on deletion failure. The `retCode` field indicates the specific error:

| Code | Description                                                                |
| ---- | -------------------------------------------------------------------------- |
| 2    | No rows deleted                                                            |
| -1   | Invalid launch parameters                                                  |
| -2   | Cannot delete: students are present in the enrolled list                   |
| -3   | Cannot delete: grades exist for enrolled students                          |
| -4   | Cannot delete: data has already been sent to the external logistics system |
| -5   | Error during exam deletion                                                 |
| -6   | Error removing bookings                                                    |
| -7   | Cannot delete: booking logs are present that cannot be removed             |

:::

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/comm` - Get exam commission

```java
/**
 * Returns the list of teachers in the commission of a given exam session.
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @return List<DocenteCommissioneAppello> list of commission members,
 *         or an empty array if none are found
 */
GET /appelli/{cdsId}/{adId}/{appId}/comm
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // degree course ID (primary key)
    "adId": 10, // teaching activity ID (primary key)
    "appId": 10, // progressive exam ID (primary key)
    "docenteId": 10, // teacher ID (primary key)
    "ruoloCod": "P", // role code (P=President)
    "idAb": 1234, // address book ID in UGOV
    "docenteNome": "Mario", // teacher first name
    "docenteCognome": "Rossi", // teacher surname
    "ruoloDes": "P" // role description
  }
]
```

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/comm/{docenteId}` - Get single commission member

```java
/**
 * Returns a single teacher from the commission of a given exam session.
 *
 * @param cdsId     long (path, required) - degree course ID
 * @param adId      long (path, required) - teaching activity ID
 * @param appId     long (path, required) - progressive exam ID within (cdsId, adId)
 * @param docenteId long (path, required) - teacher ID
 * @return DocenteCommissioneAppello the commission member, or 404 if not found
 */
GET /appelli/{cdsId}/{adId}/{appId}/comm/{docenteId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "cdsId": 10, // degree course ID (primary key)
  "adId": 10, // teaching activity ID (primary key)
  "appId": 10, // progressive exam ID (primary key)
  "docenteId": 10, // teacher ID (primary key)
  "ruoloCod": "P", // role code (P=President)
  "idAb": 1234, // address book ID in UGOV
  "docenteNome": "Mario", // teacher first name
  "docenteCognome": "Rossi", // teacher surname
  "ruoloDes": "P" // role description
}
```

<br>

---

<br>

### `PUT /appelli/{cdsId}/{adId}/{appId}/pubblicazione` - Publish exam results

```java
/**
 * Publishes exam results for students enrolled in a given exam session.
 * If no student list is provided, publication is applied to all active
 * enrolled students. Students that cannot be published or that encounter
 * errors are returned in the error detail of the response.
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @param body  object (body, required) - publication data
 * @return 200 OK on success
 */
PUT /appelli/{cdsId}/{adId}/{appId}/pubblicazione
```

**Auth:** `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "emailMittente": "mario.rossi@univXX.it", // sender email address
  "nomeMittente": "Mario Rossi", // sender display name
  "dataPubbl": "15/10/2015", // publication date (DD/MM/YYYY)
  "dataUltimoRif": "15/10/2015", // last rejection date (DD/MM/YYYY), required if configured
  "notaMailStu": "nota mail studente", // note included in the student email
  "notaFrom": "nota from", // from note
  "inviaComFlg": 0, // send communication flag (0=no, 1=yes)
  "stuDaPubblicare": [1234] // list of stuId to publish (optional - all active students if omitted)
}
```

#### Response **`200 OK`**

Empty body on success.

::: warning Return codes
A `422 Unprocessable Entity` is returned on failure. The `retCode` field indicates the specific error:

| Code | Description                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------- |
| 1    | Publication successful                                                                            |
| 2    | Publication date differs from today                                                               |
| 3    | Sender fields are inconsistent (one set, the other not)                                           |
| 4    | Exam key not provided                                                                             |
| 5    | Last rejection date not provided, but required by exam type configuration                         |
| 6    | All bookings are already published                                                                |
| 7    | Some students cannot be published                                                                 |
| 8    | Exam is simplified - publications are not supported                                               |
| 9    | Exam not found                                                                                    |
| 10   | Invalid last rejection date: precedes publication date or does not respect min/max rejection days |
| 11   | User not authorized to publish results - check `tipi_gest_app.gestione_pubblicazione` parameter   |
| 98   | Error during publication generation                                                               |
| 99   | Invalid session                                                                                   |

:::

<br>

---

<br>

## Endpoints - Turns (Turno)

### `GET /appelli/{cdsId}/{adId}/{appId}/turni` - Get exam turns

```java
/**
 * Returns the list of turns associated with a given exam session.
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @return List<TurnoAppello> list of turns for the exam session,
 *         or an empty array if none are found
 */
GET /appelli/{cdsId}/{adId}/{appId}/turni
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // degree course ID (primary key)
    "adId": 10, // teaching activity ID (primary key)
    "appId": 10, // progressive exam ID (primary key)
    "appLogId": 10, // turn progressive ID within the exam (primary key)
    "des": "descrizione libera del turno", // turn free description
    "dataOraEsa": "10/10/2016 10:00:00", // turn date and time (DD/MM/YYYY HH:MM:SS)
    "edificioId": 10, // building ID
    "aulaId": 10, // classroom ID (requires edificioId)
    "fatPartCod": "A1", // partition factor code
    "domPartCod": "AK", // partition domain code (requires fatPartCod)
    "edificioCod": "ED1", // building code
    "edificioDes": "Edificio di prova", // building description
    "aulaCod": "AU1", // classroom code
    "extAulaCod": "AU1", // classroom code on the external logistics system (optional)
    "aulaDes": "Aula di prova", // classroom description
    "numIscritti": 12 // number of students enrolled in this turn
  }
]
```

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}` - Get single exam turn

```java
/**
 * Returns a single turn of a given exam session, identified by its
 * progressive ID within the exam.
 *
 * @param cdsId    long (path, required) - degree course ID
 * @param adId     long (path, required) - teaching activity ID
 * @param appId    long (path, required) - progressive exam ID within (cdsId, adId)
 * @param appLogId long (path, required) - turn progressive ID within (cdsId, adId, appId)
 * @return TurnoAppello the turn, or 404 if not found
 */
GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "cdsId": 10, // degree course ID (primary key)
  "adId": 10, // teaching activity ID (primary key)
  "appId": 10, // progressive exam ID (primary key)
  "appLogId": 10, // turn progressive ID within the exam (primary key)
  "des": "descrizione libera del turno", // turn free description
  "dataOraEsa": "10/10/2016 10:00:00", // turn date and time (DD/MM/YYYY HH:MM:SS)
  "edificioId": 10, // building ID
  "aulaId": 10, // classroom ID (requires edificioId)
  "fatPartCod": "A1", // partition factor code
  "domPartCod": "AK", // partition domain code (requires fatPartCod)
  "edificioCod": "ED1", // building code
  "edificioDes": "Edificio di prova", // building description
  "aulaCod": "AU1", // classroom code
  "extAulaCod": "AU1", // classroom code on the external logistics system (optional)
  "aulaDes": "Aula di prova", // classroom description
  "numIscritti": 12 // number of students enrolled in this turn
}
```

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm` - Get turn commission

```java
/**
 * Returns the list of teachers in the commission of a specific turn
 * within a given exam session.
 *
 * @param cdsId    long (path, required) - degree course ID
 * @param adId     long (path, required) - teaching activity ID
 * @param appId    long (path, required) - progressive exam ID within (cdsId, adId)
 * @param appLogId long (path, required) - turn progressive ID within (cdsId, adId, appId)
 * @return List<DocenteCommissioneTurno> list of commission members for the turn,
 *         or an empty array if none are found
 */
GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // degree course ID (primary key)
    "adId": 10, // teaching activity ID (primary key)
    "appId": 10, // progressive exam ID (primary key)
    "appLogId": 10, // turn progressive ID (primary key)
    "docenteId": 10, // teacher ID (primary key)
    "ruoloCod": "P", // role code (P=President)
    "idAb": 1234, // address book ID in UGOV
    "docenteNome": "Mario", // teacher first name
    "docenteCognome": "Rossi", // teacher surname
    "ruoloDes": "P" // role description
  }
]
```

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm/{docenteId}` - Get single turn commission member

```java
/**
 * Returns a single teacher from the commission of a specific turn
 * within a given exam session.
 *
 * @param cdsId     long (path, required) - degree course ID
 * @param adId      long (path, required) - teaching activity ID
 * @param appId     long (path, required) - progressive exam ID within (cdsId, adId)
 * @param appLogId  long (path, required) - turn progressive ID within (cdsId, adId, appId)
 * @param docenteId long (path, required) - teacher ID
 * @return DocenteCommissioneTurno the commission member for the turn, or 404 if not found
 */
GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm/{docenteId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "cdsId": 10, // degree course ID (primary key)
  "adId": 10, // teaching activity ID (primary key)
  "appId": 10, // progressive exam ID (primary key)
  "appLogId": 10, // turn progressive ID (primary key)
  "docenteId": 10, // teacher ID (primary key)
  "ruoloCod": "P", // role code (P=President)
  "idAb": 1234, // address book ID in UGOV
  "docenteNome": "Mario", // teacher first name
  "docenteCognome": "Rossi", // teacher surname
  "ruoloDes": "P" // role description
}
```

<br>

---

<br>

### `PUT /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/pubblicazione` - Publish turn results

```java
/**
 * Publishes exam results for students enrolled in a specific turn of an exam session.
 * If no student list is provided, publication is applied to all active enrolled
 * students in the turn. Students that cannot be published or that encounter errors
 * are returned in the error detail of the response.
 *
 * @param cdsId    long (path, required) - degree course ID
 * @param adId     long (path, required) - teaching activity ID
 * @param appId    long (path, required) - progressive exam ID within (cdsId, adId)
 * @param appLogId long (path, required) - turn progressive ID within (cdsId, adId, appId)
 * @param body     object (body, required) - publication data
 * @return 200 OK on success
 */
PUT /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/pubblicazione
```

**Auth:** `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "emailMittente": "mario.rossi@univXX.it", // sender email address
  "nomeMittente": "Mario Rossi", // sender display name
  "dataPubbl": "15/10/2015", // publication date (DD/MM/YYYY)
  "dataUltimoRif": "15/10/2015", // last rejection date (DD/MM/YYYY), required if configured
  "notaMailStu": "nota mail studente", // note included in the student email
  "notaFrom": "nota from", // from note
  "inviaComFlg": 0, // send communication flag (0=no, 1=yes)
  "stuDaPubblicare": [1234] // list of stuId to publish (optional - all active students if omitted)
}
```

#### Response **`200 OK`**

Empty body on success.

::: info
Return codes for this endpoint are identical to those of [`PUT /appelli/{cdsId}/{adId}/{appId}/pubblicazione`](#put-appelli-cdsid-adid-appid-pubblicazione).
:::

<br>

---

<br>

## Endpoints - Commission (Commissione)

### `GET /appelli/{cdsId}/{adId}/{appId}/comm` - Get exam commission

::: info
This endpoint is also listed under the **Appello** tag. Full documentation is available at
[`GET /appelli/{cdsId}/{adId}/{appId}/comm`](#get-appelli-cdsid-adid-appid-comm).
:::

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/comm/{docenteId}` - Get single commission member

::: info
This endpoint is also listed under the **Appello** tag. Full documentation is available at
[`GET /appelli/{cdsId}/{adId}/{appId}/comm/{docenteId}`](#get-appelli-cdsid-adid-appid-comm-docenteid).
:::

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm` - Get turn commission

::: info
This endpoint is also listed under the **Turno** tag. Full documentation is available at
[`GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm`](#get-appelli-cdsid-adid-appid-turni-applogid-comm).
:::

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm/{docenteId}` - Get single turn commission member

::: info
This endpoint is also listed under the **Turno** tag. Full documentation is available at
[`GET /appelli/{cdsId}/{adId}/{appId}/turni/{appLogId}/comm/{docenteId}`](#get-appelli-cdsid-adid-appid-turni-applogid-comm-docenteid).
:::

<br>

---

<br>

## Endpoints - Session (Sessione)

### `GET /appelli/{cdsId}/{adId}/{appId}/sessioni` - Get sessions associated to an exam

```java
/**
 * Returns the list of exam sessions (sessioni) associated with a given
 * exam session (appello).
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @return List<SessioneAppello> list of sessions associated to the exam,
 *         or an empty array if none are found
 */
GET /appelli/{cdsId}/{adId}/{appId}/sessioni
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // degree course ID (primary key)
    "adId": 10, // teaching activity ID (primary key)
    "appId": 10, // progressive exam ID (primary key)
    "aaSesId": 10, // session year (primary key)
    "sesId": 10, // session progressive ID within (cdsId, aaSesId) (primary key)
    "sesDes": "string", // session description
    "dataInizio": "10/10/2016", // session start date (DD/MM/YYYY)
    "dataFine": "10/10/2016" // session end date (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/sessioni/{aaSesId}/{sesId}` - Get single session associated to an exam

```java
/**
 * Returns a single session associated with a given exam session,
 * identified by session year and progressive ID.
 *
 * @param cdsId   long (path, required) - degree course ID
 * @param adId    long (path, required) - teaching activity ID
 * @param appId   long (path, required) - progressive exam ID within (cdsId, adId)
 * @param aaSesId long (path, required) - session year (4 digits)
 * @param sesId   long (path, required) - session progressive ID within (cdsId, aaSesId)
 * @return SessioneAppello the session, or 404 if not found
 */
GET /appelli/{cdsId}/{adId}/{appId}/sessioni/{aaSesId}/{sesId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "cdsId": 10, // degree course ID (primary key)
  "adId": 10, // teaching activity ID (primary key)
  "appId": 10, // progressive exam ID (primary key)
  "aaSesId": 10, // session year (primary key)
  "sesId": 10, // session progressive ID within (cdsId, aaSesId) (primary key)
  "sesDes": "string", // session description
  "dataInizio": "10/10/2016", // session start date (DD/MM/YYYY)
  "dataFine": "10/10/2016" // session end date (DD/MM/YYYY)
}
```

<br>

---

<br>

### `GET /sessioni` - Get exam sessions

```java
/**
 * Returns the list of exam sessions (Sessione) filtered by department,
 * degree course, and/or date range. At least one filter must be provided.
 *
 * @param facId        long   (query, optional) - faculty/department ID
 * @param facCod       string (query, optional) - faculty/department code
 * @param cdsId        long   (query, optional) - degree course ID
 * @param cdsCod       string (query, optional) - degree course code
 * @param minDataInizio string (query, optional) - minimum session start date (DD/MM/YYYY)
 * @param maxDataFine   string (query, optional) - maximum session end date (DD/MM/YYYY)
 * @return List<Sessione> list of exam sessions matching the filters,
 *         or an empty array if none are found
 */
GET /sessioni
```

**Auth:** public · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "facId": 1, // faculty/department ID (primary key)
    "facCod": "cds1", // faculty/department code
    "facDes": "corso di studio 1", // faculty/department description (optional)
    "cdsId": 1, // degree course ID (primary key)
    "cdsCod": "cds1", // degree course code
    "cdsDes": "corso di studio 1", // degree course description (optional)
    "aaSesId": 2012, // session year (primary key)
    "sesId": 1, // session progressive ID within (cdsId, aaSesId) (primary key)
    "des": "sessione invernale", // free-text session description
    "dataInizio": "10/10/2016", // session start date (DD/MM/YYYY)
    "dataFine": "10/10/2016", // session end date (DD/MM/YYYY)
    "sesCod": "S", // session type code
    "sesDes": "Straordinaria", // session type description
    "straFlg": 0, // extraordinary session flag (0=no, 1=yes) (optional)
    "tipoSesCod": "A", // session type code related to straFlg (optional)
    "tipoSesDes": "A", // session type description related to straFlg (optional)
    "umCod": "AD", // unit of measure for summer course session limits (optional)
    "maxNormali": 10, // max normal ADs/CFUs in summer course session (optional)
    "maxLab": 10, // max lab ADs/CFUs in summer course session (optional)
    "vincFlg": 0, // summer course exam constraint flag (optional)
    "tipoValSes": "PF", // session reserved for specific exam types (PF=Final, PP=Partial; null=all)
    "numGgIniIscr": 20, // days delta for opening enrollment lists for exams in this session (optional)
    "grpCondSqlId": 1 // SQL condition group ID applied to bookings in this session (optional)
  }
]
```

<br>

---

<br>

### `GET /sessioni/{aaSesId}` - Get sessions by year

```java
/**
 * Returns the list of exam sessions for a given session year,
 * across all degree courses.
 *
 * @param aaSesId long (path, required) - session year ID
 * @return List<Sessione> list of exam sessions for the given year,
 *         or an empty array if none are found
 */
GET /sessioni/{aaSesId}
```

**Auth:** public · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "facId": 1, // faculty/department ID (primary key)
    "facCod": "cds1", // faculty/department code
    "facDes": "corso di studio 1", // faculty/department description (optional)
    "cdsId": 1, // degree course ID (primary key)
    "cdsCod": "cds1", // degree course code
    "cdsDes": "corso di studio 1", // degree course description (optional)
    "aaSesId": 2012, // session year (primary key)
    "sesId": 1, // session progressive ID within (cdsId, aaSesId) (primary key)
    "des": "sessione invernale", // free-text session description
    "dataInizio": "10/10/2016", // session start date (DD/MM/YYYY)
    "dataFine": "10/10/2016", // session end date (DD/MM/YYYY)
    "sesCod": "S", // session type code
    "sesDes": "Straordinaria", // session type description
    "straFlg": 0, // extraordinary session flag (0=no, 1=yes) (optional)
    "tipoSesCod": "A", // session type code related to straFlg (optional)
    "tipoSesDes": "A", // session type description related to straFlg (optional)
    "umCod": "AD", // unit of measure for summer course session limits (optional)
    "maxNormali": 10, // max normal ADs/CFUs in summer course session (optional)
    "maxLab": 10, // max lab ADs/CFUs in summer course session (optional)
    "vincFlg": 0, // summer course exam constraint flag (optional)
    "tipoValSes": "PF", // session reserved for specific exam types (PF=Final, PP=Partial; null=all)
    "numGgIniIscr": 20, // days delta for opening enrollment lists (optional)
    "grpCondSqlId": 1 // SQL condition group ID applied to bookings (optional)
  }
]
```

<br>

---

<br>

### `GET /sessioni/{aaSesId}/{cdsId}` - Get sessions by year and degree course

```java
/**
 * Returns the list of exam sessions for a given session year
 * scoped to a specific degree course.
 *
 * @param aaSesId long (path, required) - session year ID
 * @param cdsId   long (path, required) - degree course ID
 * @return List<Sessione> list of exam sessions for the given year and degree course,
 *         or an empty array if none are found
 */
GET /sessioni/{aaSesId}/{cdsId}
```

**Auth:** public · Supported: `Basic`, `JWT`

**Cache:** `lowRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "facId": 1, // faculty/department ID (primary key)
    "facCod": "cds1", // faculty/department code
    "facDes": "corso di studio 1", // faculty/department description (optional)
    "cdsId": 1, // degree course ID (primary key)
    "cdsCod": "cds1", // degree course code
    "cdsDes": "corso di studio 1", // degree course description (optional)
    "aaSesId": 2012, // session year (primary key)
    "sesId": 1, // session progressive ID within (cdsId, aaSesId) (primary key)
    "des": "sessione invernale", // free-text session description
    "dataInizio": "10/10/2016", // session start date (DD/MM/YYYY)
    "dataFine": "10/10/2016", // session end date (DD/MM/YYYY)
    "sesCod": "S", // session type code
    "sesDes": "Straordinaria", // session type description
    "straFlg": 0, // extraordinary session flag (0=no, 1=yes) (optional)
    "tipoSesCod": "A", // session type code related to straFlg (optional)
    "tipoSesDes": "A", // session type description related to straFlg (optional)
    "umCod": "AD", // unit of measure for summer course session limits (optional)
    "maxNormali": 10, // max normal ADs/CFUs in summer course session (optional)
    "maxLab": 10, // max lab ADs/CFUs in summer course session (optional)
    "vincFlg": 0, // summer course exam constraint flag (optional)
    "tipoValSes": "PF", // session reserved for specific exam types (PF=Final, PP=Partial; null=all)
    "numGgIniIscr": 20, // days delta for opening enrollment lists (optional)
    "grpCondSqlId": 1 // SQL condition group ID applied to bookings (optional)
  }
]
```

<br>

---

<br>

## Endpoints - Common Exam (Esame Comune)

### `GET /appelli/{cdsId}/{adId}/{appId}/esacom` - Get common exams associated to an exam

```java
/**
 * Returns the list of common exams (esami comuni) associated with a given
 * exam session, including their child CDS/AD pairs.
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @return List<EsameComuneAppello> list of common exams associated to the exam,
 *         or an empty array if none are found
 */
GET /appelli/{cdsId}/{adId}/{appId}/esacom
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // parent degree course ID (primary key)
    "adId": 10, // parent teaching activity ID (primary key)
    "aaOffId": 10, // offer year (primary key)
    "cdsFiglioId": 10, // child degree course ID (primary key)
    "adFiglioId": 10, // child teaching activity ID (primary key)
    "appId": 10, // progressive exam ID (primary key)
    "cdsFiglioCod": "CDS1", // child degree course code
    "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
    "adFiglioCod": "AD_F_1", // child teaching activity code
    "adFiglioDes": "Attività figlia di esempio" // child teaching activity description
  }
]
```

<br>

---

<br>

### `GET /esacom/{aaId}` - Get common exams by academic year

```java
/**
 * Returns the list of common exams (esami comuni) defined for a given
 * academic year, including their parent and child CDS/AD pairs.
 *
 * @param aaId int (path, required) - academic year of the common exam definition
 * @return List<EsameComune> list of common exams for the given year,
 *         or an empty array if none are found
 */
GET /esacom/{aaId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsEsaId": 10, // parent degree course ID (primary key)
    "adEsaId": 10, // parent teaching activity ID (primary key)
    "aaId": 10, // academic year of the common exam (primary key)
    "cdsEsaCod": "CDS_P_1", // parent degree course code
    "cdsEsaDes": "Corso di studio di esempio", // parent degree course description
    "adEsaCod": "AD_P_1", // parent teaching activity code
    "adEsaDes": "Attività padre di esempio", // parent teaching activity description
    "cdsFiglioId": 10, // child degree course ID (primary key)
    "adFiglioId": 10, // child teaching activity ID (primary key)
    "cdsFiglioCod": "CDS1", // child degree course code
    "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
    "adFiglioCod": "AD_F_1", // child teaching activity code
    "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
    "mutFlg": 0, // linked to a mutual recognition (0=no, 1=yes)
    "logCondFlg": 0 // linked to a logistics sharing (0=no, 1=yes)
  }
]
```

<br>

---

<br>

### `GET /esacom/{aaId}/{cdsEsaId}/{adEsaId}` - Get common exam by parent CDS/AD

```java
/**
 * Returns the list of common exam entries for a given academic year,
 * scoped to a specific parent degree course and teaching activity pair.
 *
 * @param aaId     int  (path, required) - academic year of the common exam definition
 * @param cdsEsaId long (path, required) - parent degree course ID
 * @param adEsaId  long (path, required) - parent teaching activity ID
 * @return List<EsameComune> list of common exam entries for the given parent CDS/AD,
 *         or an empty array if none are found
 */
GET /esacom/{aaId}/{cdsEsaId}/{adEsaId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsEsaId": 10, // parent degree course ID (primary key)
    "adEsaId": 10, // parent teaching activity ID (primary key)
    "aaId": 10, // academic year of the common exam (primary key)
    "cdsEsaCod": "CDS_P_1", // parent degree course code
    "cdsEsaDes": "Corso di studio di esempio", // parent degree course description
    "adEsaCod": "AD_P_1", // parent teaching activity code
    "adEsaDes": "Attività padre di esempio", // parent teaching activity description
    "cdsFiglioId": 10, // child degree course ID (primary key)
    "adFiglioId": 10, // child teaching activity ID (primary key)
    "cdsFiglioCod": "CDS1", // child degree course code
    "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
    "adFiglioCod": "AD_F_1", // child teaching activity code
    "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
    "mutFlg": 0, // linked to a mutual recognition (0=no, 1=yes)
    "logCondFlg": 0 // linked to a logistics sharing (0=no, 1=yes)
  }
]
```

<br>

---

<br>

### `GET /esacom/{aaId}/{cdsEsaId}/{adEsaId}/figli/{cdsFiglioId}/{adFiglioId}` - Get single common exam child

```java
/**
 * Returns a single child entry of a common exam, identified by the full
 * parent/child CDS/AD key combination and academic year.
 *
 * @param aaId        int  (path, required) - academic year of the common exam definition
 * @param cdsEsaId    long (path, required) - parent degree course ID
 * @param adEsaId     long (path, required) - parent teaching activity ID
 * @param cdsFiglioId long (path, required) - child degree course ID
 * @param adFiglioId  long (path, required) - child teaching activity ID
 * @return EsameComune the common exam child entry, or 404 if not found
 */
GET /esacom/{aaId}/{cdsEsaId}/{adEsaId}/figli/{cdsFiglioId}/{adFiglioId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "cdsEsaId": 10, // parent degree course ID (primary key)
  "adEsaId": 10, // parent teaching activity ID (primary key)
  "aaId": 10, // academic year of the common exam (primary key)
  "cdsEsaCod": "CDS_P_1", // parent degree course code
  "cdsEsaDes": "Corso di studio di esempio", // parent degree course description
  "adEsaCod": "AD_P_1", // parent teaching activity code
  "adEsaDes": "Attività padre di esempio", // parent teaching activity description
  "cdsFiglioId": 10, // child degree course ID (primary key)
  "adFiglioId": 10, // child teaching activity ID (primary key)
  "cdsFiglioCod": "CDS1", // child degree course code
  "cdsFiglioDes": "Corso di studio di esempio", // child degree course description
  "adFiglioCod": "AD_F_1", // child teaching activity code
  "adFiglioDes": "Attività figlia di esempio", // child teaching activity description
  "mutFlg": 0, // linked to a mutual recognition (0=no, 1=yes)
  "logCondFlg": 0 // linked to a logistics sharing (0=no, 1=yes)
}
```

<br>

---

<br>

### `PUT /esacom/{aaId}/{cdsEsaId}/{adEsaId}/figli/{cdsFiglioId}/{adFiglioId}` - Insert common exam child

```java
/**
 * Inserts a child CDS/AD pair into an existing common exam definition.
 * If certain validation checks fail but are forceable, the forceFlg
 * parameter can be used to bypass them.
 *
 * @param aaId        int     (path, required)  - academic year of the common exam definition
 * @param cdsEsaId    long    (path, required)  - parent degree course ID
 * @param adEsaId     long    (path, required)  - parent teaching activity ID
 * @param cdsFiglioId long    (path, required)  - child degree course ID
 * @param adFiglioId  long    (path, required)  - child teaching activity ID
 * @param forceFlg    boolean (query, optional) - force flag to bypass forceable validation checks
 * @param body        object  (body, required)  - common exam child parameters
 * @return EsameComuneEsito result object indicating success or forceable error details
 */
PUT /esacom/{aaId}/{cdsEsaId}/{adEsaId}/figli/{cdsFiglioId}/{adFiglioId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "mutFlg": 0, // linked to a mutual recognition (0=no, 1=yes)
  "logCondFlg": 0 // linked to a logistics sharing (0=no, 1=yes)
}
```

#### Response **`200 OK`**

```json
{
  "forceFlg": 0, // indicates if the result can be forced (0=no, 1=yes)
  "errMsg": "aaaaaa", // error message if forceFlg=1, describing what can be forced
  "dettaglioErrore": {
    // error detail object, present only when forceFlg=1
    "errcarrtstId": 1, // error record ID
    "des": "descrizione libera dell'errore", // error description
    "entitaErrCarrCod": "APP", // entity code related to the error
    "valAlfa": "null", // alphanumeric value related to the error
    "valNum": null, // numeric value related to the error
    "tipoErr": 0, // error type
    "dettagli": [
      // list of error sub-details
      {
        "errcarrtstId": 1, // error record ID
        "progId": 1, // progressive detail ID
        "cod": "codice dell'errore", // error code
        "des": "descrizione libera dell'errore", // detail description
        "entitaCarrCod": "APP", // entity code
        "valNum": null, // numeric value
        "tipoErr": 0 // error type
      }
    ]
  }
}
```

<br>

---

<br>

### `DELETE /esacom/{aaId}/{cdsEsaId}/{adEsaId}/figli/{cdsFiglioId}/{adFiglioId}` - Delete common exam child

```java
/**
 * Removes a child CDS/AD pair from an existing common exam definition.
 * If certain validation checks fail but are forceable, the forceFlg
 * parameter can be used to bypass them.
 *
 * @param aaId        int     (path, required)  - academic year of the common exam definition
 * @param cdsEsaId    long    (path, required)  - parent degree course ID
 * @param adEsaId     long    (path, required)  - parent teaching activity ID
 * @param cdsFiglioId long    (path, required)  - child degree course ID
 * @param adFiglioId  long    (path, required)  - child teaching activity ID
 * @param forceFlg    boolean (query, optional) - force flag to bypass forceable validation checks
 * @return EsameComuneEsito result object indicating success or forceable error details
 */
DELETE /esacom/{aaId}/{cdsEsaId}/{adEsaId}/figli/{cdsFiglioId}/{adFiglioId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response **`200 OK`**

```json
{
  "forceFlg": 0, // indicates if the result can be forced (0=no, 1=yes)
  "errMsg": "aaaaaa", // error message if forceFlg=1, describing what can be forced
  "dettaglioErrore": {
    // error detail object, present only when forceFlg=1
    "errcarrtstId": 1, // error record ID
    "des": "descrizione libera dell'errore", // error description
    "entitaErrCarrCod": "APP", // entity code related to the error
    "valAlfa": "null", // alphanumeric value related to the error
    "valNum": null, // numeric value related to the error
    "tipoErr": 0, // error type
    "dettagli": [
      // list of error sub-details
      {
        "errcarrtstId": 1, // error record ID
        "progId": 1, // progressive detail ID
        "cod": "codice dell'errore", // error code
        "des": "descrizione libera dell'errore", // detail description
        "entitaCarrCod": "APP", // entity code
        "valNum": null, // numeric value
        "tipoErr": 0 // error type
      }
    ]
  }
}
```

<br>

---

<br>

## Endpoints - Enrolled Students (Lista Iscritti)

### `GET /appelli/{cdsId}/{adId}/{appId}/iscritti` - Get enrolled students list

```java
/**
 * Returns the list of students enrolled in a given exam session,
 * optionally filtered by turn. When authenticated as UTENTE_TECNICO,
 * the attoreCod parameter is required to specify the actor perspective.
 *
 * @param cdsId     long   (path, required)  - degree course ID
 * @param adId      long   (path, required)  - teaching activity ID
 * @param appId     long   (path, required)  - progressive exam ID within (cdsId, adId)
 * @param appLogId  int    (query, optional)  - turn progressive ID to filter by turn
 * @param attoreCod string (query, optional)  - actor type (STU, DOC); required for UTENTE_TECNICO
 * @param filter    string (query, optional)  - RSQL filter applied after data retrieval
 * @return List<IscrizioneAppello> list of student enrollments for the exam session,
 *         or an empty array if none are found
 */
GET /appelli/{cdsId}/{adId}/{appId}/iscritti
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `highRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "applistaId": 102220, // unique booking ID (primary key)
    "cdsId": 102344, // degree course ID
    "adId": 1022, // teaching activity ID
    "appId": 1, // progressive exam ID
    "appLogId": 1, // turn progressive ID
    "stuId": 12, // student career track ID
    "adregId": 112, // linked exam record ID
    "adsceId": 112, // linked transcript row ID
    "matId": 112, // student registration ID (optional)
    "adStuCod": "AD1", // booked teaching activity code
    "adStuDes": "Attività di esempio", // booked teaching activity description (optional)
    "cdsAdStuCod": "CDS1", // booked degree course code
    "cdsAdStuDes": "Corso di studio di esempio", // booked degree course description (optional)
    "cdsAdIdStu": 102344, // booked degree course ID (optional)
    "desAppello": "descrizione appello", // exam description (optional)
    "desTurno": "descrizione turno", // turn description (optional)
    "aulaCod": "codice aula", // classroom code (optional)
    "aulaDes": "descizione aula", // classroom description (optional)
    "edificioCod": "codice edificio", // building code (optional)
    "edificioDes": "descizione edificio", // building description (optional)
    "sedeId": 123, // campus ID (optional)
    "sedeDes": "descizione sede", // campus description (optional)
    "dataOraTurno": "10/10/2016 12:00:00", // turn date and time (optional)
    "aaFreqId": 2020, // activity attendance year (optional)
    "statoAdsce": "S", // teaching activity status code
    "pesoAd": 10, // teaching activity weight (CFU)
    "userId": "m.rossi", // student active user ID
    "matricola": "124AA-12", // student registration number
    "nomeStudente": "Mario", // student first name
    "nomeAlias": "Giulia", // student alias first name
    "cognomeStudente": "Rossi", // student surname
    "codFisStudente": "XXXYYY99A12K123H", // student tax code
    "dataNascitaStudente": "10/10/1985", // student birth date (DD/MM/YYYY)
    "sessoStudente": "M", // student gender (optional)
    "comuNascCodIstat": "M200", // ISTAT code of birth municipality (optional)
    "cittStraNasc": "ENG", // foreign citizenship at birth (optional)
    "cittCod": "ENG", // citizenship code (optional)
    "cdsStuCod": "CDS1", // enrolled degree course code
    "cdsStuDes": "Corso di studio di esempio", // enrolled degree course description
    "cdsIdStu": 102344, // enrolled degree course ID (optional)
    "aaOrdStuId": 2010, // enrollment curriculum year (optional)
    "pdsStuCod": "PDS1", // enrolled study plan code (optional)
    "pdsStuDes": "Percorso di studio di esempio", // enrolled study plan description (optional)
    "pdsIdStu": 9999, // enrolled study plan ID (optional)
    "pubblId": 11234, // result publication ID
    "presaVisione": "N", // result acknowledgement status (N=not seen, V=seen, R=rejected, A=accepted)
    "userIdPresaVisione": "m.rossi", // user who last changed acknowledgement status (optional)
    "userGrpPresaVisione": 7, // group of user who last changed acknowledgement status (optional)
    "dataRifEsito": "10/12/2017", // last rejection date applied to teacher (optional)
    "dataRifEsitoStu": "10/12/2017", // last rejection date applied to student
    "notaPubbl": "nota di pubblicazione", // note added during publication
    "gruppoVotoCod": "30L", // student transcript grade scale code
    "gruppoVotoMaxPunti": 30, // maximum grade in the scale
    "esito": {
      // grade result object
      "modValCod": "V", // evaluation mode code
      "superatoFlg": 1, // passed flag (0=no, 1=yes)
      "votoEsa": 22, // numeric grade
      "tipoGiudCod": "IDO", // judgement type code
      "tipoGiudizioDes": "Idoneo", // judgement type description
      "assenteFlg": 1, // absent flag (0=no, 1=yes)
      "ritiratoFlg": 1 // withdrawn flag (0=no, 1=yes)
    },
    "manualeFlg": 1, // manual booking flag (0=student, 1=staff/teacher)
    "dataEsa": "10/10/2016", // exam date (DD/MM/YYYY)
    "domandeEsame": "prima domanda esame; seconda domanda esame", // exam questions
    "notaStudente": "vecchio ordinamento; Studente Lavoratore; Studente fuoricorso etc.", // student booking note
    "tipoSvolgimentoEsameCod": "P", // exam delivery mode code
    "tipoSvolgimentoEsameDes": "Presenza", // exam delivery mode description
    "tipoSvolgimentoEsameRichiestaFlg": "1", // delivery mode is a student request pending confirmation (optional)
    "tagCod": "GRP1", // tag selected by student at booking (optional)
    "autoTagCod": "99", // auto-assigned booking class (optional)
    "livUscitaCod": "B1", // language exit level code (optional)
    "linguaUscitaCod": "eng", // ISO 639-2 language code for exit level (optional)
    "dataIns": "10/10/2016", // booking date (DD/MM/YYYY HH:MM:SS)
    "tipoDefAppCod": "STD", // exam definition mode code (optional)
    "tipoGestPrenCod": "STD", // booking management mode code (optional)
    "tipoGestAppCod": "STD", // exam management mode code (optional)
    "tipoAppCod": "PP", // exam type code (optional)
    "posiz": 12, // booking position in the enrolled list (optional)
    "posizApp": 12, // booking position ordered by booking date
    "dataInizioIscr": "10/10/2016", // registration start date (optional)
    "dataFineIscr": "16/10/2016", // registration end date (optional)
    "tipoIscrCod": "S", // registration mode (optional)
    "tipoEsaCod": "S", // exam mode (optional)
    "aaCalId": 2020, // exam calendar year (optional)
    "aaSesId": 2020, // session year (optional)
    "sesDes": "Sessione Invernale", // session description (optional)
    "misureCompensative": [
      // compensatory measures for the booking (optional)
      {
        "applistaId": 102220, // booking ID (primary key)
        "cdsId": 102344, // degree course ID (optional)
        "adId": 1022, // teaching activity ID (optional)
        "appId": 1, // exam progressive ID (optional)
        "appLogId": 1, // turn progressive ID (optional)
        "stuId": 12, // student career track ID (optional)
        "misuraCompensativaCod": "TASSE_W", // compensatory measure code
        "desLiberaFlg": 1, // free description enabled flag
        "visWebFlg": 1, // visible on web flag
        "des": "Necessario più tempo", // measure description
        "statoMisComp": "A, X, V", // measure status codes (A=confirmed, X=verified, V=cancelled)
        "statoMisCompDes": "CONFERMATA, VERIFICATA, ANNULLATA" // measure status descriptions
      }
    ],
    "warnings": [
      // booking warnings (optional)
      {
        "applistaId": 102220, // booking ID (primary key)
        "cdsId": 102344, // degree course ID (optional)
        "adId": 1022, // teaching activity ID (optional)
        "appId": 1, // exam progressive ID (optional)
        "appLogId": 1, // turn progressive ID (optional)
        "stuId": 12, // student career track ID (optional)
        "tipoErrore": "TASSE_W", // warning type code
        "des": "Studente non in regola con le tasse" // warning description
      }
    ]
  }
]
```

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/tags/{adsceId}` - Get valid tags for a booking

```java
/**
 * Returns the list of valid tags for a specific student booking,
 * identified by the transcript row (riga di libretto) linked to the exam.
 * Used to retrieve the available language level tags before booking.
 *
 * @param cdsId   long (path, required) - degree course ID
 * @param adId    long (path, required) - teaching activity ID
 * @param appId   long (path, required) - progressive exam ID within (cdsId, adId)
 * @param adsceId long (path, required) - transcript row ID (riga di libretto)
 * @return List<TagIscrizione> list of valid tags for the booking,
 *         or an empty array if none are available
 */
GET /appelli/{cdsId}/{adId}/{appId}/tags/{adsceId}
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `highRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "tagCod": "B1", // tag code
    "tagDes": "Livello B1", // tag description
    "linguaIso6392Cod": "eng", // ISO 639-2 language code the tag refers to
    "livCertLinUscitaCod": "b1_eng", // language exit level code
    "livCertLinUscitaDes": "Livello B1 Inglese" // language exit level description
  }
]
```

<br>

---

<br>

## Endpoints - Bookings (Prenotazione)

### `POST /appelli/{cdsId}/{adId}/{appId}/iscritti` - Book a student into an exam session

```java
/**
 * Books a student into a given exam session. Booking rules are applied
 * based on the logged-in user's actor type. For UTENTE_TECNICO the default
 * actor is SEG; a different actor can be forced via the attoreCod field
 * in the request body.
 *
 * If the booking completes with warnings, these are returned in the
 * response headers as per RFC 7234 (Warnings header).
 *
 * @param cdsId long   (path, required) - degree course ID
 * @param adId  long   (path, required) - teaching activity ID
 * @param appId long   (path, required) - progressive exam ID within (cdsId, adId)
 * @param body  object (body, required) - booking parameters
 * @return 201 Created on success
 */
POST /appelli/{cdsId}/{adId}/{appId}/iscritti
```

**Auth:** `STUDENTE` · `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "adsceId": 1234, // transcript row ID to link the booking to (required)
  "tipoIscrStu": "O", // student registration mode (S=Written, O=Oral, SO=Written+Oral)
  "notaStu": "nota di prova", // student booking note
  "appLogId": 1, // turn progressive ID to book into (optional - system-assigned if omitted)
  "tagCod": "B1", // tag selected by the student (optional - required if exam has tag template)
  "attoreCod": "STU", // actor type override for UTENTE_TECNICO (STU, DOC, SEG)
  "tipoSvolgimentoEsame": "P", // exam delivery mode code (optional)
  "misureCompensative": [
    // compensatory measures for the booking (optional)
    {
      "misuraCompensativaCod": "1", // compensatory measure code
      "desLiberaMisura": "descrizione libera" // free-text description for the measure
    }
  ]
}
```

#### Response **`201 Created`**

Empty body on success. Warnings, if any, are returned in the `Warnings` response header as per [RFC 7234](https://tools.ietf.org/html/rfc7234#section-5.5).

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}` - Get student booking details

```java
/**
 * Returns the booking details of a specific student for a given exam session.
 * When authenticated as UTENTE_TECNICO, the attoreCod parameter is required.
 *
 * @param cdsId     long   (path, required)  - degree course ID
 * @param adId      long   (path, required)  - teaching activity ID
 * @param appId     long   (path, required)  - progressive exam ID within (cdsId, adId)
 * @param stuId     long   (path, required)  - student career track ID
 * @param attoreCod string (query, optional)  - actor type (STU, DOC); required for UTENTE_TECNICO
 * @param q         string (query, optional)  - predefined filter; supported value:
 *                                             BACHECA_ESITI - returns booking only if published,
 *                                             with results, past rejection date, and no verbal generated
 * @return IscrizioneAppello the student booking, or 404 if not found
 */
GET /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}
```

**Auth:** `STUDENTE` · `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `highRefreshRateUserIndependent`

#### Response **`200 OK`**

Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}/iscritti`](#get-appelli-cdsid-adid-appid-iscritti), but returns a single `IscrizioneAppello` object instead of a list.

<br>

---

<br>

### `PUT /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}` - Update a student booking

```java
/**
 * Updates an existing booking for a specific student in a given exam session.
 * Allows modification of the exam delivery mode and compensatory measures.
 *
 * @param cdsId long   (path, required) - degree course ID
 * @param adId  long   (path, required) - teaching activity ID
 * @param appId long   (path, required) - progressive exam ID within (cdsId, adId)
 * @param stuId long   (path, required) - student career track ID
 * @param body  object (body, required) - booking fields to update
 * @return IscrizioneAppello the updated booking
 */
PUT /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}
```

**Auth:** `STUDENTE` · `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "attoreCod": "STU", // actor type override for UTENTE_TECNICO (STU, DOC, SEG)
  "tipoSvolgimentoEsame": "P", // exam delivery mode code to update
  "misureCompensative": [
    // compensatory measures to add, update or delete
    {
      "misuraCompensativaCod": "1", // compensatory measure code
      "desLiberaMisura": "descrizione libera", // free-text description for the measure
      "deleteFlg": false // set to true to remove this measure
    }
  ]
}
```

#### Response **`200 OK`**

Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}/iscritti`](#get-appelli-cdsid-adid-appid-iscritti), returning the updated `IscrizioneAppello` object.

<br>

---

<br>

### `DELETE /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}` - Cancel a student booking

```java
/**
 * Cancels a single student booking for a given exam session.
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @param stuId long (path, required) - student career track ID
 * @return 204 No Content on success
 */
DELETE /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}
```

**Auth:** `STUDENTE` · `DOCENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Response **`204 No Content`**

Empty body on success. A `412 Precondition Failed` is returned if the cancellation cannot be completed.

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/attestato-di-presenza` - Get exam attendance certificate

```java
/**
 * Returns the exam attendance certificate (attestato di presenza) as a PDF
 * for a given student booking. The certificate is generated only if all of
 * the following conditions are met:
 *   - the exam configuration enables certificate generation (TIPI_GEST_APP.GESTIONE_ATT_PRESENZA)
 *   - the result has been published with an active publication status
 *   - no SQL conditions prevent certificate generation
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @param stuId long (path, required) - student career track ID
 * @return file PDF attendance certificate binary stream
 */
GET /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/attestato-di-presenza
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** `highRefreshRateUserIndependent`

#### Response **`200 OK`**

Binary PDF file stream (`application/octet-stream`). A `422 Unprocessable Entity` is returned if the PDF cannot be generated.

<br>

---

<br>

### `PUT /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/esito` - Enter or update a student grade

```java
/**
 * Inserts or updates the grade result for a specific student booking.
 * Also allows setting a note, exam date, exam questions, and acknowledgement status.
 *
 * Exactly one of the following grade values must be provided per call:
 *   - voto: numeric grade (max+1 = cum laude, e.g. 31 for 30L; 0 = generic fail)
 *   - tipoGiudCod: judgement code (must be compatible with the exam's judgement group)
 *   - assenteFlg: marks the student as absent
 *   - ritiratoFlg: marks the student as withdrawn
 *
 * All grades on an exam must be homogeneous (all numeric or all judgement).
 *
 * @param cdsId long   (path, required) - degree course ID
 * @param adId  long   (path, required) - teaching activity ID
 * @param appId long   (path, required) - progressive exam ID within (cdsId, adId)
 * @param stuId long   (path, required) - student career track ID
 * @param body  object (body, required) - grade data to insert or update
 * @return IscrizioneAppello the updated booking with grade
 */
PUT /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/esito
```

**Auth:** `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "docenteImpersId": 1, // teacher ID to impersonate for grade entry; UTENTE_TECNICO only
  "sovrascritturaFlg": 0, // allow overwrite of existing grade (0=no, 1=yes)
  "voto": 31, // numeric grade (max+1=cum laude, 0=generic fail; mutually exclusive)
  "tipoGiudCod": "IDO", // judgement code (mutually exclusive with voto/assenteFlg/ritiratoFlg)
  "assenteFlg": 0, // absent flag (mutually exclusive with other grade values)
  "ritiratoFlg": 0, // withdrawn flag (mutually exclusive with other grade values)
  "dataEsa": "15/10/2015", // exam date (DD/MM/YYYY; cannot be before turn date or in the future)
  "domandeEsame": "domande d'esame", // exam questions text
  "notaPubbl": "nota pubblicazione per lo studente", // publication note for the student
  "presaVisione": "N", // acknowledgement status (N=not seen, V=seen, R=rejected, A=accepted)
  "appCollegato": {
    // linked exam booking to manage alongside grade entry (optional)
    "opType": "INSERT", // operation type (INSERT, DELETE, UPDATE)
    "cdsId": 10, // linked exam degree course ID
    "adId": 10, // linked exam teaching activity ID
    "appId": 10, // linked exam progressive ID
    "appLogId": 11, // linked exam turn ID
    "notaStu": "Nota libera", // student note for the linked booking
    "tagCod": "B2" // tag for the linked booking
  },
  "tipoSvolgimentoEsame": "P" // exam delivery mode code
}
```

#### Response **`200 OK`**

Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}/iscritti`](#get-appelli-cdsid-adid-appid-iscritti), returning the updated `IscrizioneAppello` object.

::: warning Return codes
A `422 Unprocessable Entity` is returned on failure. The `retCode` field indicates the specific error:

| Code | Description                                                             |
| ---- | ----------------------------------------------------------------------- |
| 1    | Update successful                                                       |
| 2    | Grade type inconsistent with exam (numeric vs judgement mismatch)       |
| 3    | Overwrite not allowed                                                   |
| 4    | Cannot update acknowledgement: a publication already exists             |
| 5    | Grade already published, modification not allowed in the requested mode |
| 8    | Grade not compatible with the configured grade scale                    |
| 9    | Grades with free notes are not supported                                |
| 10   | Booking not found                                                       |
| 11   | Language exit level required for language exams when result is positive |
| 12   | Exam date cannot be earlier than the student's assigned turn date       |
| 13   | Exam date must fall within the sessions associated to the exam          |
| 14   | Exam date cannot be in the future                                       |
| 50   | Generic error                                                           |
| 99   | Invalid session                                                         |

:::

<br>

---

<br>

### `PUT /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/presaVisione` - Acknowledge a published result

```java
/**
 * Updates the acknowledgement status (presa visione) of a published exam result
 * for a specific student. Optionally manages a linked exam booking alongside
 * the acknowledgement operation.
 *
 * This URI is an alias of /prenotazioni/{matId}/{applistaId}/presaVisione.
 * Full documentation is available at that endpoint.
 *
 * @param cdsId          long   (path, required)     - degree course ID
 * @param adId           long   (path, required)     - teaching activity ID
 * @param appId          long   (path, required)     - progressive exam ID within (cdsId, adId)
 * @param stuId          long   (path, required)     - student career track ID
 * @param presaVisione   string (formData, required) - acknowledgement status (N=not seen, V=seen, R=rejected, A=accepted)
 * @param appRelOpType   string (formData, optional) - operation on linked booking (INSERT, DELETE, UPDATE, DELETE_ALL)
 * @param cdsRelAppId    long   (formData, optional) - linked exam degree course ID
 * @param adRelAppId     long   (formData, optional) - linked exam teaching activity ID
 * @param appRelAppId    long   (formData, optional) - linked exam progressive ID
 * @param appLogRelAppId long   (formData, optional) - linked exam turn ID
 * @param notaStuRelApp  string (formData, optional) - student note for the linked booking
 * @param tagCodRelApp   string (formData, optional) - tag for the linked booking
 * @return IscrizioneAppello the updated booking with new acknowledgement status
 */
PUT /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/presaVisione
```

**Auth:** `STUDENTE` · `DOCENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** none

#### Response **`200 OK`**

Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}/iscritti`](#get-appelli-cdsid-adid-appid-iscritti), returning the updated `IscrizioneAppello` object.

::: info
This endpoint is an alias of [`PUT /prenotazioni/{matId}/{applistaId}/presaVisione`](#put-prenotazioni-matid-applistaid-presavisione). Refer to that endpoint for the full parameter and return code documentation.
:::

<br>

---

<br>

### `GET /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/statino-prenotazione` - Get booking slip PDF

```java
/**
 * Returns the booking slip (statino di prenotazione) as a PDF for a given
 * student booking. Unlike the ESSE3 web interface, this endpoint always
 * allows retrieval regardless of the exam date. To replicate the web
 * behaviour, callers should block printing after the exam date has passed.
 *
 * @param cdsId long (path, required) - degree course ID
 * @param adId  long (path, required) - teaching activity ID
 * @param appId long (path, required) - progressive exam ID within (cdsId, adId)
 * @param stuId long (path, required) - student career track ID
 * @return file PDF booking slip binary stream
 */
GET /appelli/{cdsId}/{adId}/{appId}/iscritti/{stuId}/statino-prenotazione
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** `highRefreshRateUserIndependent`

#### Response **`200 OK`**

Binary PDF file stream (`application/octet-stream`). A `422 Unprocessable Entity` is returned if the PDF cannot be generated.

<br>

---

<br>

## Endpoints - Bookings by Career Track (Prenotazioni)

### `GET /prenotazioni/{matId}` - Get bookings by career track

```java
/**
 * Returns the list of exam bookings linked to a given student career track.
 * When authenticated as UTENTE_TECNICO, the attoreCod parameter is required.
 *
 * @param matId     long   (path, required)  - student career track ID
 * @param attoreCod string (query, optional)  - actor type (STU, DOC); required for UTENTE_TECNICO
 * @param q         string (query, optional)  - predefined filter; supported value:
 *                                             BACHECA_ESITI - returns only bookings visible on the
 *                                             results board (published with active status, past
 *                                             rejection date, no verbal generated yet)
 * @param filter    string (query, optional)  - RSQL filter applied after data retrieval
 * @return List<IscrizioneAppello> list of bookings for the given career track,
 *         or an empty array if none are found
 */
GET /prenotazioni/{matId}
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `highRefreshRateUserIndependent`

#### Response **`200 OK`**

Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}/iscritti`](#get-appelli-cdsid-adid-appid-iscritti), returning a list of `IscrizioneAppello` objects.

<br>

---

<br>

### `GET /prenotazioni/{matId}/{applistaId}` - Get single booking by career track

```java
/**
 * Returns the details of a single exam booking, identified by the student
 * career track ID and the unique booking ID. When authenticated as
 * UTENTE_TECNICO, the attoreCod parameter is required.
 *
 * @param matId       long   (path, required)  - student career track ID
 * @param applistaId  long   (path, required)  - unique booking ID
 * @param attoreCod   string (query, optional)  - actor type (STU, DOC); required for UTENTE_TECNICO
 * @return IscrizioneAppello the booking, or 404 if not found
 */
GET /prenotazioni/{matId}/{applistaId}
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` · `UTENTE_PTA` · `UTENTE_PTA_ADMIN` (at least one required) · Supported: `Basic`, `JWT` **Cache:** `highRefreshRateUserIndependent`

#### Response **`200 OK`**

Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}/iscritti`](#get-appelli-cdsid-adid-appid-iscritti), but returns a single `IscrizioneAppello` object instead of a list.

<br>

---

<br>

### `PUT /prenotazioni/{matId}/{applistaId}/presaVisione` - Acknowledge a published result

```java
/**
 * Updates the acknowledgement status (presa visione) of a published exam result
 * for a specific student booking. Optionally manages a linked exam booking
 * alongside the acknowledgement, based on the appRelOpType value:
 *
 *   INSERT     - any status    - inserts a linked booking on the provided exam key
 *   DELETE     - status != R   - deletes the linked booking on the provided exam key
 *   UPDATE     - status = R    - updates the linked booking on the provided exam key
 *   DELETE_ALL - status != R   - deletes all linked bookings (no exam key required)
 *
 * Leave all four appRel* fields null if no linked booking management is needed.
 *
 * @param matId          long   (path, required)     - student career track ID
 * @param applistaId     long   (path, required)     - unique booking ID
 * @param presaVisione   string (formData, required) - acknowledgement status (N=not seen, V=seen, R=rejected, A=accepted)
 * @param appRelOpType   string (formData, optional) - operation on linked booking (INSERT, DELETE, UPDATE, DELETE_ALL)
 * @param cdsRelAppId    long   (formData, optional) - linked exam degree course ID
 * @param adRelAppId     long   (formData, optional) - linked exam teaching activity ID
 * @param appRelAppId    long   (formData, optional) - linked exam progressive ID
 * @param appLogRelAppId long   (formData, optional) - linked exam turn ID
 * @param notaStuRelApp  string (formData, optional) - student note for the linked booking
 * @param tagCodRelApp   string (formData, optional) - tag for the linked booking
 * @return IscrizioneAppello the updated booking with new acknowledgement status
 */
PUT /prenotazioni/{matId}/{applistaId}/presaVisione
```

**Auth:** `STUDENTE` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response **`200 OK`**

Same structure as [`GET /appelli/{cdsId}/{adId}/{appId}/iscritti`](#get-appelli-cdsid-adid-appid-iscritti), returning the updated `IscrizioneAppello` object.

::: warning Return codes
A `422 Unprocessable Entity` is returned on failure. The `retCode` field indicates the specific error:

| Code | Description                                                                     |
| ---- | ------------------------------------------------------------------------------- |
| 1    | Update successful                                                               |
| 2    | Publication date differs from today                                             |
| 17   | Linked exam for booking is not valid                                            |
| 18   | Linked booking not found                                                        |
| 19   | Error inserting linked booking                                                  |
| 20   | Error deleting linked booking                                                   |
| 21   | Attempting to delete a linked booking on a different exam than the one provided |
| 22   | Attempting to update a linked booking on the same exam as the one provided      |
| 23   | Error inserting booking link: link already exists                               |
| 24   | Error deleting booking link                                                     |
| 50   | Generic error                                                                   |
| -51  | Error retrieving booking                                                        |
| -52  | Booking not found                                                               |
| -55  | Save conditions not met                                                         |

:::

<br>

---

<br>

## Endpoints - External Logistics System (Sistema Logistico Esterno)

### `GET /sistLogExt/export` - Get export elaborations list

```java
/**
 * Returns the list of export elaborations generated for the external
 * logistics system (classroom and building data).
 *
 * @param none
 * @return List<ExportSistLog> list of export elaboration headers,
 *         or an empty array if none are found
 */
GET /sistLogExt/export
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "elabId": 1234, // elaboration ID
    "diffElabId": 1, // reference elaboration ID used for diff comparison
    "des": "abcd", // elaboration description
    "tipoElab": 0, // elaboration type (0=point-in-time, 1=bulk)
    "dataIns": "01/01/1900", // insertion date (DD/MM/YYYY)
    "usrInsId": "string" // user ID who created the elaboration
  }
]
```

<br>

---

<br>

### `GET /sistLogExt/export/{elabId}` - Get export elaboration by ID

```java
/**
 * Returns the header of a specific export elaboration for the external
 * logistics system, identified by its unique elaboration ID.
 *
 * @param elabId long (path, required) - unique elaboration ID
 * @return ExportSistLog the export elaboration header, or 404 if not found
 */
GET /sistLogExt/export/{elabId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
{
  "elabId": 1234, // elaboration ID
  "diffElabId": 1, // reference elaboration ID used for diff comparison
  "des": "abcd", // elaboration description
  "tipoElab": 0, // elaboration type (0=point-in-time, 1=bulk)
  "dataIns": "01/01/1900", // insertion date (DD/MM/YYYY)
  "usrInsId": "string" // user ID who created the elaboration
}
```

<br>

---

<br>

### `GET /sistLogExt/export/{elabId}/eventi` - Get export events by elaboration ID

```java
/**
 * Returns the list of exam event packages included in a given export
 * elaboration for the external logistics system. Each package represents
 * an exam session with its commission, common exams, and logistics data.
 *
 * @param elabId               long    (path, required)  - unique elaboration ID
 * @param escludiPacchettiUguali boolean (query, optional) - exclude packages identical to the
 *                                                           previous elaboration referenced by
 *                                                           diff_elab_id (default: false)
 * @return List<ExportSistLogEventoTst> list of event packages for the elaboration,
 *         or an empty array if none are found
 */
GET /sistLogExt/export/{elabId}/eventi
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT` **Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "elabId": 1234, // elaboration ID
    "chiavePacchetto": "1", // unique package key
    "cdsId": 1234, // degree course ID
    "adId": 1234, // teaching activity ID
    "appId": 1234, // progressive exam ID
    "facCodFiglio": "CDSFiglioCod", // faculty code of the child degree course
    "cdsCodFiglio": "CDSFiglioCod", // child degree course code
    "adCodFiglio": "ADFiglioCod", // child teaching activity code
    "tipoAttivitaCod": "tipoAttivitaCod", // exam registration type
    "annoAccademico": 2019, // academic year of the exam date
    "descrizione": "descrizione", // package description (Italian)
    "descrizioneEng": "descrizione", // package description (English)
    "presidenteComm": "presidenteComm", // commission president registration number
    "commissioneAllExport": "commissioneAllExport", // concatenated commission member names
    "commissioneCorrente": [
      // current commission members
      {
        "cdsId": 10, // degree course ID (primary key)
        "adId": 10, // teaching activity ID (primary key)
        "appId": 10, // progressive exam ID (primary key)
        "docenteId": 10, // teacher ID (primary key)
        "ruoloCod": "P", // role code (P=President)
        "idAb": 1234, // address book ID in UGOV
        "docenteNome": "Mario", // teacher first name
        "docenteCognome": "Rossi", // teacher surname
        "ruoloDes": "P" // role description
      }
    ],
    "maxAaSesId": 2019, // maximum session year expected for the exam
    "chiaveMaxSessione": "668", // maximum session key
    "numPostiTotale": 10, // total enrolled students count
    "esameComune": [
      // common exam child entries
      {
        "elabId": 1234, // elaboration ID
        "chiavePacchetto": "1", // package key
        "cdsCodFiglio": "cdsCodFiglio", // child degree course code
        "adCodFiglio": "adCodFiglio", // child teaching activity code
        "facCodFiglio": "FacCodFiglio", // child faculty code
        "flgLogicoMaster": 0, // logical master flag (0=no, 1=yes)
        "numPosti": 10 // seats for this child entry
      }
    ],
    "noteSistLog": "nota di esempio", // notes for the external logistics system
    "fatPartCod": "ALF", // partition factor code of the default turn
    "domPartCod": "ALF", // partition domain code of the default turn
    "sedeId": 11, // campus ID for the event
    "sedeProgDidId": 11, // UGOV campus ID for the event
    "sedeDes": "string", // campus description
    "tipoDiff": 0 // diff type vs previous elaboration (0=unchanged, see docs for other values)
  }
]
```

<br>

---

<br>

### `GET /sistLogExt/export/{elabId}/sessioni` - Get export sessions by elaboration ID

```java
/**
 * Returns the list of exam sessions included in a given export elaboration
 * for the external logistics system.
 *
 * @param elabId long (path, required) - unique elaboration ID
 * @return List<ExportSistLogSessioni> list of sessions for the elaboration,
 *         or an empty array if none are found
 */
GET /sistLogExt/export/{elabId}/sessioni
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "elabId": 1234, // elaboration ID
    "chiaveSessione": "0", // session key
    "sesCod": "U", // session type code
    "cdsCod": "1234", // degree course code
    "des": "sessione", // session description
    "aaSesId": 2017, // session year ID
    "dataInizio": "01/01/1900", // session start date (DD/MM/YYYY)
    "dataFine": "01/01/1900" // session end date (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /sistLogExt/impegni` - Get commitments modified in ESSE3

```java
/**
 * Returns the list of commitments (impegni) sent by the external logistics
 * system that have been modified within ESSE3 in a given reference day,
 * for exams with logistics status "Ritornato" and booking status "Prenotato".
 *
 * Tracked modifications include: enrolled student count, commission president,
 * and exam changes (registration dates, exam date).
 *
 * The reference date must be less than or equal to today. If not provided,
 * defaults to the current date.
 *
 * @param dataRif string (query, optional) - reference date (DD/MM/YYYY); defaults to today
 * @return List<ImpegnoSistLogEsse3> list of modified commitments for the given date,
 *         or an empty array if none are found
 */
GET /sistLogExt/impegni
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "impegnoCod": "12321dsfsd1212", // unique commitment code
    "cdsId": 1234, // degree course ID linked to the turn
    "adId": 4567, // teaching activity ID linked to the turn
    "appId": 1, // exam progressive ID linked to the turn
    "appLogId": 1, // turn progressive ID linked to the commitment
    "appelloId": 1234, // absolute exam ID linked to the commitment
    "dataInizioIscr": "10/10/2016", // exam registration start date (DD/MM/YYYY)
    "dataFineIscr": "20/10/2016", // exam registration end date (DD/MM/YYYY)
    "dataInizioApp": "30/10/2016", // exam start date (DD/MM/YYYY)
    "dataEsa": "30/10/2016", // turn date (DD/MM/YYYY)
    "oraEsa": "20/10/2016", // turn time (HH:MM)
    "matricolaPres": "1234567", // commission president registration number
    "cntIscritti": 12 // enrolled student count for the turn
  }
]
```

<br>

---

<br>

### `PUT /sistLogExt/import` - Import commitments from external logistics system

```java
/**
 * Imports a list of commitments (impegni) from the external logistics system
 * into ESSE3, updating classroom and turn assignments accordingly.
 *
 * @param body object (body, required) - object containing the list of commitments to import
 * @return ImportSistLogResult result object with return code and list of discarded events
 */
PUT /sistLogExt/import
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "impegni": [
    // list of commitments to import
    {
      "eventoCod": "12343332222222", // external event code
      "impegnoCod": "12321dsfsd1212", // unique commitment code
      "cdsId": 1234, // degree course ID
      "adId": 1234, // teaching activity ID
      "appId": 1234, // progressive exam ID
      "dataEvento": "10/10/2016", // event date (DD/MM/YYYY)
      "dataImpegno": "10/10/2016", // commitment date (DD/MM/YYYY)
      "oraInizioImpegno": "10/10/2016 09:00:00", // commitment start time (DD/MM/YYYY HH:MM:SS)
      "oraFineImpegno": "10/10/2016 11:00:00", // commitment end time (DD/MM/YYYY HH:MM:SS)
      "extAulaCod": "ext_cod", // classroom code on the external system
      "posti": 9999, // available seats
      "tolleranza": 9999, // seat tolerance
      "desTurno": "descrizione turno", // turn description
      "fatPartCod": "ALF", // partition factor code
      "domPartCod": "AK" // partition domain code (requires fatPartCod)
    }
  ]
}
```

#### Response **`200 OK`**

```json
{
  "retCode": 1, // return code (1=success, 0=partial with discards, -99=generic error)
  "retErrMsg": "Errore generico", // error message if retCode != 1
  "errori": [
    // list of discarded commitments with error details
    {
      "eventoCod": "12343332222222", // external event code
      "impegnoCod": "12321dsfsd1212", // unique commitment code
      "cdsId": 1234, // degree course ID
      "adId": 1234, // teaching activity ID
      "appId": 1234, // progressive exam ID
      "dataEvento": "10/10/2016", // event date (DD/MM/YYYY)
      "dataImpegno": "10/10/2016", // commitment date (DD/MM/YYYY)
      "oraInizioImpegno": "10/10/2016 09:00:00", // commitment start time
      "oraFineImpegno": "10/10/2016 11:00:00", // commitment end time
      "extAulaCod": "ext_cod", // classroom code on the external system
      "posti": 9999, // available seats
      "tolleranza": 9999, // seat tolerance
      "desTurno": "descrizione turno", // turn description
      "fatPartCod": "ALF", // partition factor code
      "domPartCod": "AK", // partition domain code
      "desErrore": "errore", // error description for this discarded commitment
      "codErrore": -1 // error code for this discarded commitment
    }
  ]
}
```

::: warning Return codes
| Code | Description |
| ---- | ----------- |
| 1 | Import successful |
| 0 | Import executed but some events were discarded |
| -99 | Generic error |
:::

<br>

---

<br>

### `PUT /sistLogExt/update` - Update commitments from external logistics system

```java
/**
 * Updates turns previously imported from the external logistics system.
 * Internally calls the exam update function; refer to the return codes of
 * PUT /appelli/{cdsId}/{adId}/{appId} for the base set of possible errors.
 * Additional specific codes are listed below for commitment-to-turn linking issues.
 *
 * The invioCom flag controls communication behaviour when enrolled students are present:
 *   0  - do not send communication
 *   1  - send communication if configured
 *   -1 - block update if students are enrolled
 *
 * Each commitment supports the following operations via the `operazione` field:
 *   UPDATE, INSERT, DELETE, UPSERT
 *
 * @param body object (body, required) - object containing invioCom flag and list of commitments to update
 * @return ImportSistLogResult result object with return code and list of failed commitments
 */
PUT /sistLogExt/update
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "invioCom": 1, // communication flag (0=no, 1=yes if configured, -1=block if students enrolled)
  "impegni": [
    // list of commitments to update
    {
      "cdsId": 54321, // degree course ID
      "adId": 54321, // teaching activity ID
      "appId": 54321, // progressive exam ID
      "eventoCod": "12343332222222", // external event code
      "impegnoCod": "12321dsfsd1212", // unique commitment code
      "dataImpegno": "10/10/2016", // commitment date (DD/MM/YYYY)
      "oraInizioImpegno": "10/10/2016 09:00:00", // commitment start time (DD/MM/YYYY HH:MM:SS)
      "oraFineImpegno": "10/10/2016 11:00:00", // commitment end time (DD/MM/YYYY HH:MM:SS)
      "extAulaCod": "ext_cod", // classroom code on the external system
      "posti": 9999, // available seats
      "tolleranza": 9999, // seat tolerance
      "desTurno": "descrizione turno", // turn description
      "fatPartCod": "ALF", // partition factor code
      "domPartCod": "AK", // partition domain code (requires fatPartCod)
      "operazione": "UPDATE, INSERT, DELETE, UPSERT" // operation type
    }
  ]
}
```

#### Response **`200 OK`**

```json
{
  "retCode": 1, // return code (see table below)
  "retErrMsg": "Errore generico", // error message if retCode indicates failure
  "errori": [
    // list of failed commitments with error details
    {
      "eventoCod": "12343332222222", // external event code
      "impegnoCod": "12321dsfsd1212", // unique commitment code
      "cdsId": 1234, // degree course ID
      "adId": 1234, // teaching activity ID
      "appId": 1234, // progressive exam ID
      "dataEvento": "10/10/2016", // event date (DD/MM/YYYY)
      "dataImpegno": "10/10/2016", // commitment date (DD/MM/YYYY)
      "oraInizioImpegno": "10/10/2016 09:00:00", // commitment start time
      "oraFineImpegno": "10/10/2016 11:00:00", // commitment end time
      "extAulaCod": "ext_cod", // classroom code on the external system
      "posti": 9999, // available seats
      "tolleranza": 9999, // seat tolerance
      "desTurno": "descrizione turno", // turn description
      "fatPartCod": "ALF", // partition factor code
      "domPartCod": "AK", // partition domain code
      "desErrore": "errore", // error description for this failed commitment
      "codErrore": -1 // error code for this failed commitment
    }
  ]
}
```

::: warning Return codes
In addition to the return codes from [`PUT /appelli/{cdsId}/{adId}/{appId}`](#put-appelli-cdsid-adid-appid), the following specific codes apply:

| Code | Description                                                     |
| ---- | --------------------------------------------------------------- |
| -91  | `fatPartCod` and `domPartCod` have unacceptable values          |
| -92  | `domPartCod` and `fatPartCod` must both be set                  |
| -93  | Data is inconsistent                                            |
| -94  | Commitment code not found                                       |
| -95  | Commitment code being inserted already exists                   |
| -96  | Students are enrolled in the turn                               |
| -97  | Classroom code not found in ESSE3                               |
| -98  | `impegnoId` not found - cannot link commitment to an ESSE3 turn |
| -99  | Generic error                                                   |

:::

<br>

---

<br>

## Endpoints - Exam Delivery Modes (Tipo Svolgimento Esame)

### `GET /appelli/{cdsId}/{adId}/{appId}/tipi-svolgimento-esame` - Get valid exam delivery modes

```java
/**
 * Returns the list of valid exam delivery modes (tipi svolgimento esame)
 * for a given exam session, optionally filtered by actor type.
 *
 * @param cdsId                   long   (path, required)  - degree course ID
 * @param adId                    long   (path, required)  - teaching activity ID
 * @param appId                   long   (path, required)  - progressive exam ID within (cdsId, adId)
 * @param attoreCodTipoSvolgEsame string (query, optional) - actor type for filtering (STU, DOC, SEG);
 *                                                           defaults to current user's actor if null
 * @param filter                  string (query, optional) - RSQL filter applied after data retrieval
 * @return List<TipoSvolgimentoEsame> list of valid exam delivery modes,
 *         or an empty array if none are found
 */
GET /appelli/{cdsId}/{adId}/{appId}/tipi-svolgimento-esame
```

**Auth:** `STUDENTE` · `DOCENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserIndependent`

#### Response **`200 OK`**

```json
[
  {
    "cdsId": 10, // degree course ID (primary key)
    "adId": 10, // teaching activity ID (primary key)
    "appId": 10, // progressive exam ID (primary key)
    "tipoSvolgimentoEsameCod": "P", // exam delivery mode code
    "tipoSvolgimentoEsameDes": "Presenza", // exam delivery mode description
    "attoreCod": "STU", // actor type for which this mode is valid
    "webFlg": 1 // visible on web (0=no, 1=yes)
  }
]
```

---

## References

- **Swagger UI:** [Calesa Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Calesa%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fcalesa-service-v1)#/>)
- **Spec YAML:** [p10-calesaApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p10-calesaApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
