---
title: Calendario Appuntamenti API V1 | OhMyUniversity!
description: REST API documentation for the Calendario Appuntamenti service (calendario-app-service-v1) - appointment calendar management in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Calendario Appuntamenti API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Calendario Appuntamenti service (calendario-app-service-v1) - appointment calendar management in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/calendario-appuntamenti-api-v1
  - - meta
    - name: keywords
      content: calendario appuntamenti api, appointment calendar api, esse3 rest api, cineca api, ohmyuniversity api, prenotazione appuntamento, turni calendario
  - - meta
    - name: twitter:title
      content: Calendario Appuntamenti API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Calendario Appuntamenti service (calendario-app-service-v1) - appointment calendar management in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Calendario Appuntamenti API V1

**ENG:** `Appointment Calendar`

**Version:** `1.0.0` · **Base URL:** `/calendario-app-service-v1`

REST API for managing appointment calendars in ESSE3, including calendar retrieval by context, slot browsing, and booking management (create, update, cancel).

---

## Changelog

| Version | ESSE3 Release | Changes                                                                                                     |
| ------- | ------------- | ----------------------------------------------------------------------------------------------------------- |
| 1.0.0   | 20.01.02.00   | Added `GET /calendari/contesti/{contestoCalendario}` - retrieve calendars for a context                     |
| 1.0.0   | 20.01.02.00   | Added `GET /calendari/turni/{codTipoCalendario}` - retrieve slots for a calendar                            |
| 1.0.0   | 20.01.02.00   | Added `GET /calendari/contesti/{contestoCalendario}/appuntamenti/{persId}` - retrieve bookings for a person |
| 1.0.0   | 20.01.02.00   | Added `POST /calendari/appuntamenti/{persId}` - book an appointment                                         |
| 1.0.0   | 20.01.02.00   | Added `PUT /calendari/appuntamenti/{persId}/{appId}` - update a booking                                     |
| 1.0.0   | 20.01.02.00   | Added `DELETE /calendari/appuntamenti/{persId}/{appId}` - cancel a booking                                  |

---

## Endpoints - Appointments (Appuntamenti)

### `POST /calendari/appuntamenti/{persId}` - Book an appointment

```java
/**
 * Books an appointment for a specific person in a given calendar slot.
 *
 * @param persId long (path, required)   - person ID
 * @param turnoId long (body, required)  - calendar slot ID to book
 * @param stuId  long (body, optional)   - career ID of the student
 * @param nota   string (body, optional) - appointment note
 * @param notaId long (body, optional)   - note template ID
 * @return 201 Created on success, DettaglioErrore on failure
 */
POST /calendari/appuntamenti/{persId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent` - medium-frequency resource, HTTP cache enabled, server cache disabled

#### Request body

```json
{
  "turnoId": 1670, // Calendar slot ID to book
  "stuId": 49245, // Student career ID
  "nota": "Consegna documenti per il tirocinio", // Appointment note
  "notaId": 1265 // Note template ID
}
```

#### Response

**`201 Created`** - Appointment successfully booked.

**`422 Unprocessable Entity`** - Booking failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `PUT /calendari/appuntamenti/{persId}/{appId}` - Update appointment booking

```java
/**
 * Updates an existing appointment booking for a specific person by
 * cancelling the old appointment and creating a new one in the
 * specified slot.
 *
 * @param persId  long (path, required)   - person ID
 * @param appId   long (path, required)   - appointment ID to cancel and replace
 * @param turnoId long (body, required)   - new calendar slot ID to book
 * @param stuId   long (body, optional)   - career ID of the student
 * @param nota    string (body, optional) - appointment note
 * @param notaId  long (body, optional)   - note template ID
 * @return updated turnoId on success, DettaglioErrore on failure
 */
PUT /calendari/appuntamenti/{persId}/{appId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent` - medium-frequency resource, HTTP cache enabled, server cache disabled

#### Request body

```json
{
  "turnoId": 1670, // New calendar slot ID to book
  "stuId": 49245, // Student career ID
  "nota": "Consegna documenti per il tirocinio", // Appointment note
  "notaId": 1265 // Note template ID
}
```

#### Response

**`200 OK`** - Appointment successfully updated.

```json
{
  "turnoId": 1682 // New slot ID assigned to the updated appointment
}
```

**`422 Unprocessable Entity`** - Update failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `DELETE /calendari/appuntamenti/{persId}/{appId}` - Cancel appointment booking

```java
/**
 * Cancels a specific appointment booking for a given person.
 *
 * @param persId long (path, required) - person ID
 * @param appId  long (path, required) - appointment ID to cancel
 * @return 204 No Content on success, DettaglioErrore on failure
 */
DELETE /calendari/appuntamenti/{persId}/{appId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent` - medium-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`204 No Content`** - Appointment successfully cancelled.

**`422 Unprocessable Entity`** - Cancellation failed.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /calendari/contesti/{contestoCalendario}/appuntamenti/{persId}` - Get person appointment bookings

```java
/**
 * Returns the paginated list of appointment bookings for a specific person
 * within a given calendar context. Supports filtering by career, degree
 * course, study plan, enrollment, and campus.
 *
 * @param contestoCalendario string (path, required)   - calendar context code
 * @param persId             long (path, required)     - person ID
 * @param lingua             string (query, optional)  - language code for descriptions
 * @param stuId              long (query, optional)    - career ID filter
 * @param cdsId              long (query, optional)    - degree course ID filter
 * @param aaOrdId            long (query, optional)    - curriculum academic year ID filter
 * @param pdsId              long (query, optional)    - study plan ID filter
 * @param aaIscrId           long (query, optional)    - enrollment year ID filter
 * @param iscrId             long (query, optional)    - enrollment ID filter
 * @param sedeId             long (query, optional)    - campus ID filter
 * @param start              int (query, optional)     - index of the first record
 *                                                       to load, defaults to 0
 * @param limit              int (query, optional)     - number of records to retrieve
 *                                                       starting from start, defaults
 *                                                       to 50, allowed range: 0–100
 * @param order              string (query, optional)  - sort order; prefix field with
 *                                                       + (ASC) or - (DESC); multiple
 *                                                       fields comma-separated
 * @return List<Appuntamento> paginated list of bookings on success,
 *         DettaglioErrore on failure
 */
GET /calendari/contesti/{contestoCalendario}/appuntamenti/{persId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent` - medium-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoCalAppCod": "DCT_DOC", // Calendar type code
    "tipoCalAppDes": "string", // Calendar type description
    "modCancIscrCalId": 2, // Cancellation mode ID
    "calAppIscrittiId": 1337, // Appointment booking ID
    "dataIniTurnoVis": "20/01/2020 09:00:00", // Slot start date DD/MM/YYYY HH:mm:ss
    "dataFineTurnoVis": "20/01/2020 10:00:00", // Slot end date DD/MM/YYYY HH:mm:ss
    "giorno": "Venerdì", // Day of the week
    "nGgModifica": 5, // Days allowed for modification
    "dataPrenotazione": "20/01/2020 00:00:00", // Booking date DD/MM/YYYY HH:mm:ss
    "sede": "Casalecchio di Reno", // Campus name
    "strutAmmDes": "string" // Administrative structure description
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

## Endpoints - Calendars (Calendari)

### `GET /calendari/contesti/{contestoCalendario}` - Get calendars by context

```java
/**
 * Returns the paginated list of appointment calendars available for a
 * specific context. Optionally filtered by campus and language.
 *
 * @param contestoCalendario string (path, required)  - calendar context code
 * @param lingua             string (query, optional) - language code for descriptions
 * @param sedeId             long (query, optional)   - campus ID filter
 * @param start              int (query, optional)    - index of the first record
 *                                                      to load, defaults to 0
 * @param limit              int (query, optional)    - number of records to retrieve
 *                                                      starting from start, defaults
 *                                                      to 50, allowed range: 0–100
 * @param order              string (query, optional) - sort order; prefix field with
 *                                                      + (ASC) or - (DESC); multiple
 *                                                      fields comma-separated
 * @return List<Calendario> paginated list of calendars on success,
 *         DettaglioErrore on failure
 */
GET /calendari/contesti/{contestoCalendario}
```

**Auth:** `UTENTE_TECNICO` · `AUTENTICATO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent` - medium-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "tipoCalAppCod": "DCT_DOC", // Calendar type code
    "tipoCalAppDes": "string", // Calendar type description
    "modCancIscrCalId": 2 // Cancellation mode ID
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

<br>

---

<br>

### `GET /calendari/turni/{codTipoCalendario}` - Get calendar slots

```java
/**
 * Returns the paginated list of available appointment slots for a specific
 * calendar type. Optionally filtered by campus and administrative structure.
 *
 * @param codTipoCalendario string (path, required)  - calendar type code
 * @param lingua            string (query, optional) - language code for descriptions
 * @param sedeId            long (query, optional)   - campus ID filter
 * @param StrutAmmId        long (query, optional)   - administrative structure ID filter
 * @param start             int (query, optional)    - index of the first record
 *                                                     to load, defaults to 0
 * @param limit             int (query, optional)    - number of records to retrieve
 *                                                     starting from start, defaults
 *                                                     to 50, allowed range: 0–100
 * @param order             string (query, optional) - sort order; prefix field with
 *                                                     + (ASC) or - (DESC); multiple
 *                                                     fields comma-separated
 * @return List<Turno> paginated list of calendar slots on success,
 *         DettaglioErrore on failure
 */
GET /calendari/turni/{codTipoCalendario}
```

**Auth:** `UTENTE_TECNICO` · `AUTENTICATO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent` - medium-frequency resource, HTTP cache enabled, server cache disabled

#### Response

**`200 OK`**

```json
[
  {
    "calendarioAppId": 5, // Calendar ID
    "tipoCalAppCod": "DCT_DOC", // Calendar type code
    "calendarioAppCod": "DOC", // Calendar code
    "calendarioAppDes": "Consegna documenti", // Calendar description
    "calendarioAppAaDes": "2019/2020", // Academic year description
    "calTurnoId": 1663, // Slot ID
    "dataIniTurno": "24/01/2020 09:10:00", // Slot start date DD/MM/YYYY HH:mm:ss
    "dataFineTurno": "24/01/2020 09:20:00", // Slot end date DD/MM/YYYY HH:mm:ss
    "dataIniTurnoVis": "24/01/2020 09:00:00", // Slot display start date DD/MM/YYYY HH:mm:ss
    "dataFineTurnoVis": "24/01/2020 10:00:00", // Slot display end date DD/MM/YYYY HH:mm:ss
    "dataIniPren": "17/10/2019 00:00:00", // Booking open date DD/MM/YYYY HH:mm:ss
    "dataFinePren": "24/01/2020 00:00:00", // Booking close date DD/MM/YYYY HH:mm:ss
    "sedeDes": "Casalecchio di Reno", // Campus description
    "strutAmmDes": "string", // Administrative structure description
    "abilNotaprenFlg": 0, // Booking note enabled (0=no, 1=yes)
    "tipoNotaId": null, // Note type ID
    "giorno": "Venerdì" // Day of the week
  }
]
```

**`422 Unprocessable Entity`** - Invalid parameters.

```json
{
  "statusCode": 200, // HTTP status code
  "retCode": -1, // Internal error code
  "retErrMsg": "string", // Error description
  "errDetails": [
    {
      "errorType": "string", // Error type (e.g. stackTrace)
      "value": "string", // Error detail
      "rawValue": "string" // Raw error detail (JSON)
    }
  ]
}
```

---

## References

- **Swagger UI:** [Calendario Appuntamenti Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Calendario%20Appuntamenti%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fcalendario-app-service-v1)>)
- **Spec YAML:** [p19-calendarioAppuntamentiApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p19-calendarioAppuntamentiApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
