---
title: Auth API V1 | OhMyUniversity!
description: REST API documentation for the Common Auth service (frk-authApiV1) — authentication and session management in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Auth API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Common Auth service (frk-authApiV1) — authentication and session management in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/auth-api-v1
  - - meta
    - name: keywords
      content: auth api, authentication api, esse3 rest api, cineca api, ohmyuniversity api, login, logout, session management, jwt, oauth2, basic auth
  - - meta
    - name: twitter:title
      content: Auth API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Common Auth service (frk-authApiV1) — authentication and session management in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Auth API V1

**ENG:** `Authentication`

**Version:** `1.8.0` · **Base URL:** `/`

Common authentication service for ESSE3 REST APIs. Manages login, logout, session lifecycle, password operations, and JWT token generation.

---

## Authentication methods

All authenticated endpoints require an `Authorization` header. Three methods are supported:

- **Basic** — standard HTTP Basic Auth as per RFC2617
- **OAuth2** — compatible with RFC6749; supports `IMPLICIT` and `AUTHORIZATION_CODE` flows
- **ApiKey** — additional validation via `X-api-key` header, enabled by configuration (`REST_API_KEY_STRICT_MODE`); always used in combination with Basic or OAuth2, never alone

---

## Session modes

### Implicit login

The session is created automatically on the first authenticated request and reused for all subsequent calls with the same `Authorization` header. Only one session per user is allowed at a time. The session expires on timeout or explicit `/logout` call.

### Explicit login

Call `/login` first to receive an `authToken` (jsessionid). Pass it in subsequent requests either as a URL parameter (`;jsessionid=`) or as a cookie. Multiple concurrent sessions per user are supported. Call `/logout` when done.

::: warning Multiple sessions
If multiple valid sessions exist for the same user and no jsessionid is provided, the server responds with `HTTP 403` and `errorCode 111`.
:::

---

## Session expiry

Sessions expire after a maximum of **6 hours** from creation regardless of activity.

**Implicit login** — the session is removed automatically when:

- idle longer than the timeout configured on the user's group (`p18_grp.http_session_timeout`)
- alive longer than `REST_MAX_SESSION_TIME` (default: 5h 45m)

**Explicit login** — sessions are NOT removed automatically on timeout. The client is responsible for tracking session lifetime and calling `/login` again when needed. Sessions sharing the same `Authorization` header are grouped for timeout calculation — the group expires based on the most recent activity across all sessions in the group.

---

## JWT tokens

ESSE3 can generate JWT tokens using an auto-generated key pair stored in the database. Tokens can be obtained in two ways:

- via `/login` by adding the optional `jwt` field to the request body
- via `GET /login/jwt/new`

The public key is exposed at `GET /jwt/jwk`. Tokens can be refreshed via `GET /jwt/refresh`.

---

## Unsupported user groups

Login is available even for users not enabled for REST API management. In this case only the following endpoints are accessible: `/login`, `/logout`, `/checkPassword`, `/changePassword`. All other paths return `HTTP 400`. A warning header is included in the response indicating this limitation.

---

## Changelog

| Version | ESSE3 Release | Changes                                                                                  |
| ------- | ------------- | ---------------------------------------------------------------------------------------- |
| 1.1.0   | 17.11.00.00   | Deprecated `POST /changePassword` > use `PUT`; deprecated `POST /checkLogon` > use `GET` |
| 1.2.0   | 18.01.02.00   | Session cookie (jsessionid) now required in multi-Tomcat environments                    |
| 1.3.0   | 18.02.00.00   | Added `GET /sessions/{sessionId}/check`                                                  |
| 1.4.0   | 18.07.02.00   | Login now supported for user groups not enabled for REST APIs                            |
| 1.4.1   | 18.07.02.00   | Removed deprecated `POST /checkLogon` and `POST /changePassword`                         |
| 1.5.0   | 19.11.01.00   | Multiple concurrent sessions per user                                                    |
| 1.6.0   | 20.01.01.00   | ApiKey client validation                                                                 |
| 1.6.1   | 20.11.00.00   | Fixed login response when multiple profiles are available                                |
| 1.7.0   | 22.10.01.00   | JWT token generation with ESSE3 keys                                                     |
| 1.8.0   | 23.03.02.00   | Added `TrattoAttivo` object in login response for student users; added `sesso` field     |

---

## Endpoints - Authentication (Autenticazione)

### `PUT /changeUserPassword` — Change user password

```java
/**
 * Changes the password for a specific user. Requires technical user
 * credentials passed via the Authorization: Basic header. The technical
 * user must have REST client access enabled and permission SI_18_008.
 *
 * @param username    string (body, required) - username whose password
 *                                             will be changed
 * @param oldPassword string (body, required) - current password
 * @param newPassword string (body, required) - new password
 * @return result string indicating the operation outcome on success,
 *         401 Unauthorized if credentials are missing or invalid
 */
PUT /changeUserPassword
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`

**Cache:** none

::: warning
Access requires a technical user (`UTENTE_TECNICO`) with REST client access enabled and function `SI_18_008` authorized.
:::

#### Request body

```json
{
  "username": "string", // Username whose password will be changed
  "oldPassword": "string", // Current password
  "newPassword": "string" // New password
}
```

#### Response

**`200 OK`**

```json
{
  "result": "string" // Operation result description
}
```

**`401 Unauthorized`** — `Authorization` header is missing, invalid, or contains wrong credentials.

<br>

---

<br>

### `GET /checkLogon` — Verify user credentials

```java
/**
 * Verifies the credentials provided via the Authorization: Basic header.
 * Returns whether the credentials are valid and whether the user is
 * required to change their password (e.g. if it has expired).
 * This is a public endpoint — no prior authentication required.
 *
 * @param none
 * @return credential check result including password change requirement
 */
GET /checkLogon
```

**Auth:** `ALL` — public endpoint · Supported: `Basic`
**Cache:** none

#### Response

**`200 OK`**

```json
{
  "ok": true, // true=credentials valid, false=invalid
  "changePassword": true // true=password change required (e.g. expired)
}
```

**`401 Unauthorized`** — `Authorization` header is missing or contains invalid data.

<br>

---

<br>

### `GET /login` — Login

```java
/**
 * Authenticates a user in ESSE3 and creates a session. Credentials are
 * passed via the Authorization header. An optional profile can be specified
 * via the X-Esse3-User-Profile HTTP header (STUDENTE, DOCENTE, USER_TECNICO).
 * If the user has multiple profiles and authenticates via tax code,
 * returns HTTP 300 without creating a session — retry with the
 * X-Esse3-User-Profile header set to one of the available profiles.
 *
 * @param sessionLinguaCod string (query, optional) - ISO 639-2 language code
 *                                                    for descriptions; defaults
 *                                                    to system language
 * @param optionalFields   string (query, optional) - optional fields to include;
 *                                                    use ALL for all; supports
 *                                                    Ant Glob Patterns;
 *                                                    available: jwt
 * @return SessioneUtente session data including user info, auth tokens,
 *         career segments, and available profiles on success
 */
GET /login
```

**Auth:** `ALL` — public endpoint · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

**Optional header:** `X-Esse3-User-Profile: STUDENTE | DOCENTE | USER_TECNICO`

#### Response

**`200 OK`** — Login successful.

```json
{
  "authToken": "XDddlw213123ws233", // Session token (jsessionid) for explicit login
  "internalAuthToken": "ASDFKLASJKdk12kl341s", // Internal session token
  "expPwd": false, // true=password is expired
  "jwt": "string", // JWT token (optional — use optionalFields=jwt)
  "credentials": {
    "kind": "BASIC", // Authentication method used
    "profile": "GUEST", // Active profile
    "jwtKeyId": "univ", // JWT key ID
    "jwtIsExpired": false, // true=JWT token is expired
    "user": "m.rossi" // Username
  },
  "user": {
    "firstName": "Mario", // First name
    "lastName": "Rossi", // Last name
    "sex": "M", // Gender (F/M)
    "codFis": "string", // Tax code
    "idAb": 123, // U-Gov address book ID
    "persId": 123, // Person ID
    "docenteId": 123, // Teaching staff ID
    "soggEstId": 123, // External subject ID
    "id": 123, // User ID
    "grpId": 123, // Group ID
    "grpUserTecnicoFlg": 0, // Technical user flag (0=no, 1=yes)
    "grpPta": 0, // PTA group flag (0=no, 1=yes)
    "grpDes": "Docente", // Group description
    "sessionTimeout": 10, // Session timeout in minutes
    "userId": "mario.rossi", // Username
    "tipoFirmaId": 0, // Signature type ID
    "tipoFirmaFaId": 0, // FA signature type ID
    "aliasName": "Luca", // Alias name
    "trattiCarriera": [
      // Student career segments (STUDENTE only)
      {
        "stuId": 123, // Career ID
        "matId": 123, // Career segment ID
        "matricola": "AA-123", // Registration number
        "cdsId": 123, // Degree course ID
        "cdsDes": "string", // Degree course description
        "staStuCod": "A", // Student status code
        "staStuDes": "Attivo", // Student status description
        "motStastuCod": "IMM", // Student status reason code
        "motStastuDes": "Attivo", // Student status reason description
        "staMatCod": "A", // Registration status code
        "staMatDes": "Attivo", // Registration status description
        "dettaglioTratto": {
          "profCod": "1", // Profile code
          "facCod": "FAC", // Faculty code
          "facId": 123, // Faculty ID
          "stuId": 123, // Career ID
          "matId": 123, // Career segment ID
          "cdsCod": "CDS", // Degree course code
          "cdsId": 123, // Degree course ID
          "aaOrdId": 2021, // Curriculum academic year ID
          "pdsCod": "PFS", // Study plan code
          "pdsId": 123, // Study plan ID
          "iscrId": 1, // Enrollment ID
          "staStuCod": "A", // Student status code
          "motStastuCod": "IMM", // Student status reason code
          "staMatCod": "A", // Registration status code
          "motStamatCod": "TRI", // Registration status reason code
          "staIscrCod": "A", // Enrollment status code
          "motStaiscrCod": "TRI", // Enrollment status reason code
          "annoCorso": 1, // Current year of study
          "anniFC": 1, // Out-of-course years
          "aaIscrId": 2022, // Enrollment academic year
          "durataAnni": 3, // Degree duration in years
          "ultimoAnnoFlg": 1, // Last year flag (0=no, 1=yes)
          "condFlg": 1, // Conditional flag (0=no, 1=yes)
          "domiscrFlg": 1, // Enrollment application flag (0=no, 1=yes)
          "tipoCorsoCod": "LM", // Course type code
          "aaRegId": 1, // Cohort academic year ID
          "tipoSpecCod": "MED", // Specialization type code
          "tipoIscrCod": "IC", // Enrollment type code
          "passaggioFlg": 1, // Transfer flag (0=no, 1=yes)
          "notaBloccanteFlg": 1, // Blocking note flag (0=no, 1=yes)
          "mobilFlg": 1, // Mobility flag (0=no, 1=yes)
          "ptFlg": 1, // Part-time flag (0=no, 1=yes)
          "normId": 1, // Regulation ID
          "tipoCatAmmId": 123 // Admission category ID
        }
      }
    ]
  },
  "profili": [
    // Available profiles (populated on HTTP 300)
    {
      "grpId": 0, // Group ID
      "des": "string", // Profile description
      "userId": "string" // User ID for this profile
    }
  ]
}
```

**`300 Multiple Choices`** — Multiple profiles available. Login not performed. Retry with `X-Esse3-User-Profile` header set to `STUDENTE`, `DOCENTE`, or `USER_TECNICO`. The `profili` array in the response lists the available options.

**`401 Unauthorized`** — Login failed.

<br>

---

<br>

### `GET /login/cache` — Get session cache parameters

```java
/**
 * Returns the cache configuration enabled for the current session,
 * indicating whether HTTP cache and server cache are active.
 *
 * @param none
 * @return cache flags for the current session
 */
GET /login/cache
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "httpCacheEnable": 1, // HTTP cache enabled (0=no, 1=yes)
  "serverCacheEnable": 1 // Server cache enabled (0=no, 1=yes)
}
```

<br>

---

<br>

### `PUT /login/cache` — Set session cache parameters

```java
/**
 * Enables or disables HTTP cache and server cache for the current
 * user session. Settings apply only to the current session.
 *
 * @param httpCacheEnable   int (body, required) - HTTP cache flag
 *                                                 (0=disabled, 1=enabled)
 * @param serverCacheEnable int (body, required) - server cache flag
 *                                                 (0=disabled, 1=enabled)
 * @return updated cache flags on success, DettaglioErrore on failure
 */
PUT /login/cache
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Request body

```json
{
  "httpCacheEnable": 1, // HTTP cache flag (0=disabled, 1=enabled)
  "serverCacheEnable": 1 // Server cache flag (0=disabled, 1=enabled)
}
```

#### Response

**`200 OK`**

```json
{
  "httpCacheEnable": 1, // Updated HTTP cache flag
  "serverCacheEnable": 1 // Updated server cache flag
}
```

**`422 Unprocessable Entity`** — Update failed.

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

### `GET /login/jwt/new` — Generate new JWT token

```java
/**
 * Generates and returns a new JWT token issued by ESSE3 for the current
 * authenticated session. The public key for token validation is available
 * at <webesse3.url>/jwt/jwk.do
 *
 * The token contains the following claims:
 * - sub: user identifier (per OAUTH_USER_CLAIM config parameter)
 * - iss: esse3
 * - iat: token generation epoch
 * - exp: token expiry epoch (configured on user group)
 * - profile: user profile
 * - fiscalCode: user tax code
 * - tenant: installation tenant
 *
 * @param none
 * @return JWT token string for the current session
 */
GET /login/jwt/new
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "jwt": "string" // Generated JWT token
}
```

<br>

---

<br>

### `GET /login/lingua` — Get session language

```java
/**
 * Returns the language code currently set for the user session.
 * This language is used in GET operations to retrieve descriptions
 * in the selected language where supported.
 *
 * @param none
 * @return ISO 639-2 language code for the current session
 */
GET /login/lingua
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "linguaCod": "ita" // ISO 639-2 language code for the current session
}
```

<br>

---

<br>

### `PUT /login/lingua` — Set session language

```java
/**
 * Updates the language for the current user session. This language is used
 * in GET operations to retrieve descriptions in the selected language where
 * supported. If not provided or unavailable, defaults to the system language.
 *
 * @param sessionLinguaCod string (query, optional) - ISO 639-2 language code
 *                                                    to set for the session;
 *                                                    defaults to system language
 *                                                    if not provided or unavailable
 * @return updated ISO 639-2 language code for the session
 */
PUT /login/lingua
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "linguaCod": "ita" // Updated ISO 639-2 language code for the session
}
```

<br>

---

<br>

### `GET /logout` — Logout

```java
/**
 * Terminates the current ESSE3 session. For explicit login sessions,
 * this must be called explicitly when done. For implicit login sessions,
 * this invalidates the current session associated with the Authorization header.
 *
 * @param none
 * @return 200 OK on success
 */
GET /logout
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Response

**`200 OK`** — Session successfully terminated.

<br>

---

<br>

### `GET /sessions/current-session` — Check current session

```java
/**
 * Validates the current session and returns the associated user data.
 * Returns 404 if the session is not valid or has expired.
 * Response structure is identical to GET /login.
 *
 * @param optionalFields string (query, optional) - optional fields to include;
 *                                                  use ALL for all; supports
 *                                                  Ant Glob Patterns;
 *                                                  available: jwt
 * @return SessioneUtente current session data on success,
 *         404 if session is invalid or expired
 */
GET /sessions/current-session
```

**Auth:** Authenticated user required (`AUTENTICATO`) · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Response

**`200 OK`** — Session is valid. Response structure is identical to [`GET /login`](#get-login----login).

```json
{
  "authToken": "string", // Session token
  "internalAuthToken": "string", // Internal session token
  "expPwd": false, // true=password is expired
  "jwt": "string", // JWT token (optional — use optionalFields=jwt)
  "credentials": {
    /* ... */
  }, // Authentication credentials info
  "user": {
    /* ... */
  }, // User data including career segments
  "profili": [
    /* ... */
  ] // Available profiles
}
```

> See [`GET /login`](#get-login----login) for the full response field list and descriptions.

**`300 Multiple Choices`** — Multiple profiles available. Retry with `X-Esse3-User-Profile` header.

**`401 Unauthorized`** — Login failed.

**`404 Not Found`** — Session is invalid or has expired.

<br>

---

<br>

### `GET /sessions/{sessionId}/check` — Check session validity by ID

```java
/**
 * Validates a specific backend session ID. Returns 200 if the session
 * is valid, 404 if it is not valid or has expired.
 * Unlike GET /sessions/current-session, this endpoint targets a specific
 * session by ID and requires UTENTE_TECNICO authentication.
 *
 * @param sessionId string (path, required) - backend session ID to validate
 * @return 200 OK if valid, 404 Not Found if invalid or expired
 */
GET /sessions/{sessionId}/check
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`, `ApiKey`

**Cache:** none

#### Response

**`200 OK`** — Session is valid.

**`404 Not Found`** — Session ID is invalid or has expired.

<br>

---

<br>

## Endpoints - JWT (JWT)

### `GET /jwt/jwk` — Get JWT public keys (JWKS)

```java
/**
 * Returns the JSON Web Key Set (JWKS) containing the public keys used by
 * ESSE3 to sign JWT tokens. Use these keys to validate tokens issued via
 * GET /login (with jwt field) or GET /login/jwt/new.
 * This is a public endpoint — no authentication required.
 *
 * @param none
 * @return JWKS object containing the public key(s) for JWT validation
 */
GET /jwt/jwk
```

**Auth:** `ALL` — public endpoint

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "keys": [
    {
      "kty": "string", // Key type (e.g. RSA)
      "kid": "string", // Key ID
      "alg": "string", // Algorithm (e.g. RS256)
      "n": "string", // RSA modulus (Base64url encoded)
      "e": "string" // RSA public exponent (Base64url encoded)
    }
  ]
}
```

<br>

---

<br>

### `GET /jwt/refresh` — Refresh JWT token

```java
/**
 * Refreshes a JWT token previously issued by ESSE3 via GET /login
 * or GET /login/jwt/new. Returns a new token with a refreshed expiry.
 * This is a public endpoint — no session authentication required,
 * only a valid ESSE3-issued JWT must be provided.
 *
 * @param jwt string (query, optional) - JWT token to refresh; must have
 *                                       been issued by this ESSE3 instance
 * @return new JWT token on success, DettaglioErrore on failure
 */
GET /jwt/refresh
```

**Auth:** `ALL` — public endpoint

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "jwt": "string" // Refreshed JWT token
}
```

**`422 Unprocessable Entity`** — Invalid parameters.

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

- **Swagger UI:** [Auth Api V1 — ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Auth%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi)>)
- **Spec YAML:** [frk-authApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/frk-authApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
