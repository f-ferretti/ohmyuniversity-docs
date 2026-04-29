---
title: Questionari API V1 | OhMyUniversity!
description: REST API documentation for the Questionari service (questionari-service-v1) - survey compilation and results access in CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Questionari API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Questionari service (questionari-service-v1) - survey compilation and results access in CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/questionari-api-v1
  - - meta
    - name: keywords
      content: questionari api, survey api, esse3 rest api, cineca api, ohmyuniversity api, questionari-service-v1, compilazione questionari, libretto, statistiche questionari, valutazione didattica
  - - meta
    - name: twitter:title
      content: Questionari API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Questionari service (questionari-service-v1) - survey compilation and results access in CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Questionari API V1

**ENG:** `Surveys`

**Version:** `1.0.0` · **Base URL:** `/questionari-service-v1`

REST API for accessing ESSE3 surveys, covering the full compilation lifecycle for teaching evaluation questionnaires, student booklet integration, result statistics, and visibility management.

---

## Covered entities

| Entity                | Description                                                              | Tag                        |
| --------------------- | ------------------------------------------------------------------------ | -------------------------- |
| `PaginaQuestionario`  | A single page of a questionnaire with paragraphs, questions, and answers | `Compilazione questionari` |
| `QuestSummary`        | Summary of a completed questionnaire session                             | `Compilazione questionari` |
| `LibrettoQuestionari` | Questionnaire availability linked to student booklet entries             | `Libretto`                 |
| `StatisticheQuest`    | Aggregated statistics on questionnaire results                           | `Statistiche`              |

---

## Compilation flow

Questionnaire compilation follows a stateful multi-step flow. The session is tracked via `questCompId` (compilation ID) and `userCompId` (user session ID), both generated at start.

1. **Start** - `PUT /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/start` - creates a new compilation session and returns the first page
2. **Navigate** - `GET .../pagina/{pageId}`, `.../next`, `.../prev` - move between pages
3. **Save** - `PUT .../quest/{questionarioId}/{questCompId}/save/{pageId}` - save answers for a page
4. **Review** - `GET .../summary` - review all answers before confirming
5. **Confirm** - `PUT .../conferma` - finalize and submit the questionnaire

::: warning
Each step requires both `questCompId` and `userCompId` to be passed. These are returned by the start endpoint and must be preserved throughout the session. Confirming without saving all pages may result in a `400` error.
:::

---

## Endpoints - Survey Compilation (Compilazione Questionari)

### `PUT /questionari/compilazione/{stuId}/quest/{questionarioId}/{questCompId}/save/{pageId}` - Save page answers

```java
/**
 * Saves the answers submitted for a specific questionnaire page, typically
 * the page the user is currently filling in. Must be called before navigating
 * to the next page or confirming the questionnaire.
 *
 * @param stuId          long     (path, required)  - student career ID
 * @param questionarioId string   (path, required)  - questionnaire code
 * @param questCompId    long     (path, required)  - compilation session ID
 * @param pageId         long     (path, required)  - page ID to save answers for
 * @param eventCompId    string   (query, required) - compilation event ID
 * @param ansBody        Answer[] (body, required)  - list of answers to save;
 *                                                    each entry contains:
 *   @param domandaId      long   - question ID
 *   @param rispostaId     long   - selected answer ID
 *   @param corpoRisposta  string - free-text answer body (when applicable)
 * @return string "OK" if the page was saved successfully
 */
PUT /questionari/compilazione/{stuId}/quest/{questionarioId}/{questCompId}/save/{pageId}
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Request body

```json
[
  {
    "domandaId": 4445, // Question ID
    "rispostaId": 4446, // Selected answer ID
    "corpoRisposta": "era testo ma testo suonava male" // Free-text answer body
  }
]
```

#### Response

**`200 OK`**

```json
"OK"
```

**`400 Bad Request`** - validation errors on submitted answers

```json
[
  {
    "statusCode": 200,
    "retCode": -1,
    "retErrMsg": "Parametri non corretti",
    "errDetails": [
      {
        "errorType": "stackTrace", // Error type; possible values:
        //   MANDATORY_MISSING: required answer not provided
        //   DATE_FORMAT|NUMBER_FORMAT: invalid answer format
        //   NO_TEXT: free text provided where fixed text expected
        //   TOO_VALUES: too many answers in multiple choice
        //   QUESTION_DOES_NOT_EXIST: question not found
        "value": "SocketTimeoutException....",
        // Format: 'paginaId: v | domandaId: v | rispostaId: v'
        "rawValue": "SocketTimeoutException...."
      }
    ]
  }
]
```

**`404 Not Found`**

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

**`422 Unprocessable Entity`** - invalid user session

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

### `PUT /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/start` - Start new questionnaire session

```java
/**
 * Creates a new questionnaire compilation session based on the questionnaire
 * type and returns the first page. The response contains the questCompId and
 * userCompId that must be preserved for all subsequent steps in the session.
 *
 * @param stuId          long    (path, required)  - student career ID
 * @param adsceId        long    (path, required)  - student booklet teaching activity ID
 * @param questionarioId string  (path, required)  - questionnaire code
 * @param eventCompId    string  (query, required) - compilation event ID
 * @param questConfigId  long    (query, required) - questionnaire configuration ID
 * @param tagList        string  (query, optional) - DEPRECATED: use body instead;
 *                                                   tag list from UD_LOG_PDS_LIST_WEB dataset
 * @param raw            int     (query, optional) - tag and placeholder mode:
 *                                                   1 = return tag list, questions without
 *                                                       placeholder substitution;
 *                                                   0 (default) = return questions with
 *                                                       placeholders resolved, no tag list
 * @param body           TagsList (body, optional) - alternative way to pass tag list;
 *                                                   takes precedence over tagList query param;
 *                                                   at least one of body or tagList is required
 * @return PaginaQuestionario the first page of the questionnaire, including questCompId
 *         and userCompId needed for subsequent steps
 */
PUT /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/start
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Request body

```json
{
  "tags": "CDS_AD_ID_VAL:10496|DOM_PART_AD_COD_VAL:N0|AD_ID_VAL:14469|UD_ID_VAL:1|DOC_AD_ID_VAL:1298|"
  // Pipe-separated key:value pairs; takes precedence over tagList query param
}
```

#### Response

**`200 OK`**

```json
{
  "paginaId": 4405, // Page ID (primary key)
  "elemCod": "pag", // Element code
  "elementiDes": "descrizione elemento", // Element description
  "elementiNota": "note a caso", // Element note
  "note": "moar note", // Additional notes
  "questCompId": 16543, // Compilation session ID - preserve for all subsequent calls
  "userCompId": 12881, // User session ID - preserve for all subsequent calls
  "questionarioCod": "CLA_2012_GIUR", // Questionnaire code
  "pPaginaPrecId": 1234, // Previous page ID (null if first page)
  "pPaginaSuccId": 5678, // Next page ID (null if last page)
  "pQuestionarioDes": "Descrizione di qualcosa", // Questionnaire description
  "pQuestionarioNote": "Note di qualcos'altro", // Questionnaire notes
  "questionarioId": 36, // Questionnaire numeric ID
  "des": "Indagine Formazione Linguistica...", // Full questionnaire title
  "numeroRisposte": 0, // Number of answers already submitted

  // --- Paragraphs ---
  "paragrafi": [
    {
      "paginaId": 4405, // Parent page ID
      "paragrafoId": 4406, // Paragraph ID (primary key)
      "elemCod": "CEL1", // Element code
      "elementiDes": "Descrizione del paragrafo", // Paragraph description
      "elementiNota": "Nota del paragrafo", // Paragraph note
      "obbligatorioFlg": 1, // Mandatory flag (0=no, 1=yes)
      "note": "Do Re Mi", // Additional notes

      // --- Questions ---
      "domande": [
        {
          "paragrafoId": 4406, // Parent paragraph ID
          "domandaId": 4407, // Question ID (primary key)
          "elemCod": "1", // Element code
          "elementiDes": "Descrizione della domanda", // Question description
          "elementiNota": "Nota della domanda", // Question note
          "note": "note un sacco di note", // Additional notes
          "obbligatorioFlg": 1, // Mandatory flag (0=no, 1=yes)
          "numMaxSce": 10, // Maximum number of selectable answers
          "tipoFormatoCod": "TL_DOM_DFM", // Question format type code

          // --- Available answers ---
          "rispDisponibili": [
            {
              "domandaId": 4407, // Parent question ID
              "rispostaId": 4408, // Answer ID
              "elemCod": "ECO11", // Element code
              "elementiDes": "Rosalind Thomson", // Answer description
              "elementiNota": "note a caso", // Answer note
              "note": "moar note", // Additional notes
              "rispostaFormatoCod": "TL_RSP_TFB", // Answer format type code
              "domandaFormatoCod": "TL_DOM_DFM", // Parent question format type code
              "punteggio": 7, // Answer score
              "obbligatorioFlg": 0, // Mandatory flag (0=no, 1=yes)
              "operandoDomId": 0, // Domain operand ID (primary key)
              "limMin": 0, // Minimum value limit
              "limMax": 0, // Maximum value limit
              "numMaxValori": 0, // Maximum number of domain values selectable

              // --- Domain values for this answer ---
              "dominioRisposte": [
                {
                  "quesitoId": 5491, // Question instance ID (primary key)
                  "operandoDomId": 91001, // Domain operand ID
                  "numMaxValori": 3, // Maximum selectable values
                  "questCompId": 130810, // Compilation session ID
                  "desValDom": "ITALIA" // Domain value description
                }
              ]
            }
          ],

          // --- Already compiled answers ---
          "rispComplete": [
            {
              "domandaId": 4407, // Parent question ID
              "quesitoId": 4408, // Question instance ID (primary key)
              "rispostaCompilataId": 198617, // Compiled answer ID
              "testoLibero": "wall of text", // Free-text answer content
              "rispostaDominio": {
                // Selected domain value
                "quesitoId": 5491,
                "operandoDomId": 91001,
                "numMaxValori": 3,
                "questCompId": 130810,
                "desValDom": "ITALIA"
              }
            }
          ]
        }
      ]
    }
  ],

  // --- Tags (only when raw=1) ---
  "tagsWeb": [
    {
      "paginaId": 4405, // Parent page ID
      "tagCod": "AA_CFU_STU_COMP", // Tag code
      "tagValAlfa": "2013", // Alphanumeric tag value
      "tagValId": "2014", // ID tag value
      "tagValNum": 12, // Numeric tag value
      "tagValData": "12/12/2012", // Date tag value (DD/MM/YYYY)
      "visFlg": 1 // Visibility flag (0=no, 1=yes)
    }
  ]
}
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

### `PUT /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/conferma` - Confirm questionnaire submission

```java
/**
 * Finalizes and submits the completed questionnaire for the given compilation
 * session. This is the last step of the compilation flow and cannot be undone.
 *
 * @param stuId          long   (path, required)  - student career ID
 * @param adsceId        long   (path, required)  - student booklet teaching activity ID
 * @param questionarioId string (path, required)  - questionnaire code
 * @param questCompId    long   (path, required)  - compilation session ID
 * @param questConfigId  long   (query, required) - questionnaire configuration ID
 * @param userCompId     long   (query, required) - user session ID
 * @param eventCompId    string (query, required) - compilation event ID
 * @return string "OK" if the questionnaire was confirmed successfully
 */
PUT /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/conferma
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
"OK"
```

**`400 Bad Request`** - invalid user session

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

**`404 Not Found`**

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

**`422 Unprocessable Entity`** - invalid user session

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

### `GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/getPagina/{pageId}/` - Get questionnaire page

```java
/**
 * Returns the questionnaire page identified by pageId, reflecting the current
 * state of compilation based on answers given so far.
 *
 * @param stuId          long   (path, required)  - student career ID
 * @param adsceId        long   (path, required)  - student booklet teaching activity ID
 * @param questionarioId string (path, required)  - questionnaire code
 * @param questCompId    long   (path, required)  - compilation session ID
 * @param pageId         long   (path, required)  - page ID to retrieve
 * @param userCompId     long   (query, required) - user session ID
 * @param raw            int    (query, optional) - tag and placeholder mode:
 *                                                  1 = return tag list, questions without
 *                                                      placeholder substitution;
 *                                                  0 (default) = return questions with
 *                                                      placeholders resolved, no tag list
 * @return PaginaQuestionario the requested page with paragraphs, questions,
 *         available answers, and already compiled answers;
 *         or 404 if the page is not found
 */
GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/getPagina/{pageId}/
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent`

::: tip
The response structure is identical to [`PUT .../start`](#put-questionari-compilazione-stuid-adsceid-quest-questionarioid-start-start-new-questionnaire-session). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
{
  "paginaId": 4405,           // Page ID (primary key)
  "questCompId": 16543,       // Compilation session ID
  "userCompId": 12881,        // User session ID
  "pPaginaPrecId": 1234,      // Previous page ID (null if first page)
  "pPaginaSuccId": 5678,      // Next page ID (null if last page)
  "paragrafi": [ ... ],       // See PUT .../start for full structure
  "tagsWeb": [ ... ]          // Only present when raw=1
}
```

**`404 Not Found`**

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

**`422 Unprocessable Entity`** - invalid user session

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

### `GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/pagina/{pageId}/next` - Get next questionnaire page

```java
/**
 * Returns the page following pageId in the questionnaire, determined
 * dynamically based on the answers given so far (branching logic may apply).
 *
 * @param stuId          long   (path, required)  - student career ID
 * @param adsceId        long   (path, required)  - student booklet teaching activity ID
 * @param questionarioId string (path, required)  - questionnaire code
 * @param questCompId    long   (path, required)  - compilation session ID
 * @param pageId         long   (path, required)  - current page ID
 * @param userCompId     long   (query, required) - user session ID
 * @param raw            int    (query, optional) - tag and placeholder mode:
 *                                                  1 = return tag list, questions without
 *                                                      placeholder substitution;
 *                                                  0 (default) = return questions with
 *                                                      placeholders resolved, no tag list
 * @return PaginaQuestionario the next page with paragraphs, questions,
 *         available answers, and already compiled answers;
 *         or 404 if there is no next page
 */
GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/pagina/{pageId}/next
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent`

::: tip
The response structure is identical to [`PUT .../start`](#put-questionari-compilazione-stuid-adsceid-quest-questionarioid-start-start-new-questionnaire-session). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
{
  "paginaId": 4405,           // Page ID (primary key)
  "questCompId": 16543,       // Compilation session ID
  "userCompId": 12881,        // User session ID
  "pPaginaPrecId": 1234,      // Previous page ID
  "pPaginaSuccId": 5678,      // Next page ID (null if this is the last page)
  "paragrafi": [ ... ],       // See PUT .../start for full structure
  "tagsWeb": [ ... ]          // Only present when raw=1
}
```

**`404 Not Found`**

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

**`422 Unprocessable Entity`** - invalid user session

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

### `GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/pagina/{pageId}/prev` - Get previous questionnaire page

```java
/**
 * Returns the page preceding pageId in the questionnaire, determined
 * dynamically based on the answers given so far (branching logic may apply).
 *
 * @param stuId          long   (path, required)  - student career ID
 * @param adsceId        long   (path, required)  - student booklet teaching activity ID
 * @param questionarioId string (path, required)  - questionnaire code
 * @param questCompId    long   (path, required)  - compilation session ID
 * @param pageId         long   (path, required)  - current page ID
 * @param userCompId     long   (query, required) - user session ID
 * @param raw            int    (query, optional) - tag and placeholder mode:
 *                                                  1 = return tag list, questions without
 *                                                      placeholder substitution;
 *                                                  0 (default) = return questions with
 *                                                      placeholders resolved, no tag list
 * @return PaginaQuestionario the previous page with paragraphs, questions,
 *         available answers, and already compiled answers;
 *         or 404 if there is no previous page
 */
GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/pagina/{pageId}/prev
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent`

::: tip
The response structure is identical to [`PUT .../start`](#put-questionari-compilazione-stuid-adsceid-quest-questionarioid-start-start-new-questionnaire-session). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
{
  "paginaId": 4405,           // Page ID (primary key)
  "questCompId": 16543,       // Compilation session ID
  "userCompId": 12881,        // User session ID
  "pPaginaPrecId": 1234,      // Previous page ID (null if this is the first page)
  "pPaginaSuccId": 5678,      // Next page ID
  "paragrafi": [ ... ],       // See PUT .../start for full structure
  "tagsWeb": [ ... ]          // Only present when raw=1
}
```

**`404 Not Found`**

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

**`422 Unprocessable Entity`** - invalid user session

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

### `GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/summary` - Get questionnaire compilation summary

```java
/**
 * Returns a summary of the compiled questionnaire, showing all pages with
 * their paragraphs, questions, and submitted answers. Used to review the
 * full compilation before confirming.
 *
 * @param stuId          long   (path, required)  - student career ID
 * @param adsceId        long   (path, required)  - student booklet teaching activity ID
 * @param questCompId    long   (path, required)  - compilation session ID
 * @param questionarioId string (path, required)  - questionnaire code
 * @param questConfigId  long   (query, required) - questionnaire configuration ID
 * @param userCompId     long   (query, required) - user session ID
 * @param eventCompId    string (query, required) - compilation event ID
 * @param raw            int    (query, optional) - tag and placeholder mode:
 *                                                  1 = return tag list, questions without
 *                                                      placeholder substitution;
 *                                                  0 (default) = return questions with
 *                                                      placeholders resolved, no tag list
 * @return QuestSummary the full compilation summary with all pages, paragraphs,
 *         questions, and submitted answers
 */
GET /questionari/compilazione/{stuId}/{adsceId}/quest/{questionarioId}/{questCompId}/summary
```

**Auth:** `STUDENTE` · `UTENTE_TECNICO` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `midRefreshRateUserDependent`

#### Response

**`200 OK`**

```json
{
  "questCompId": 130791, // Compilation session ID (primary key)
  "questionarioId": 60, // Questionnaire numeric ID
  "stato": "completato", // Compilation status
  "completoFlg": "string", // Completion flag
  "eventoCompCod": "string", // Compilation event code
  "questionarioCod": "AVA_1_3_2014", // Questionnaire code
  "pQuestionarioDes": "Descrizione di qualcosa", // Questionnaire description
  "pQuestionarioNote": "Note di qualcos'altro", // Questionnaire notes
  "pPrimaPaginaId": 1, // First page ID

  // --- Tags (only when raw=1) ---
  "tagsWeb": [
    {
      "questCompId": 130791, // Parent compilation session ID
      "tagCod": "AA_CFU_STU_COMP", // Tag code
      "tagValAlfa": "2013", // Alphanumeric tag value
      "tagValId": "2014", // ID tag value
      "tagValNum": 12, // Numeric tag value
      "tagValData": "12/12/2012", // Date tag value (DD/MM/YYYY)
      "visFlg": 1 // Visibility flag (0=no, 1=yes)
    }
  ],

  // --- Summary pages ---
  "pagine": [
    {
      "paginaId": 5124, // Page ID (primary key)
      "p02QuesitiNote": "note dei quesiti", // Question set notes
      "p02QuesitiParentQuesitoId": "string", // Parent question set ID
      "elementiDes": "string", // Page elements description
      "elementiNote": "string", // Page elements notes

      // --- Summary paragraphs ---
      "paragrafiRiepilogo": [
        {
          "paginaId": 5124, // Parent page ID
          "paragrafoId": 5125, // Paragraph ID (primary key)
          "p02QuesitiElemCod": "P_VUOTO", // Question set element code
          "p02QuesitiNote": "note dei quesiti", // Question set notes
          "elementiDes": "string", // Paragraph elements description
          "elementiNota": "string", // Paragraph elements note

          // --- Summary questions ---
          "domandeRiepilogo": [
            {
              "paragrafoId": 5125, // Parent paragraph ID
              "domandaId": 5126, // Question ID
              "elemCod": "AVA_FREQ", // Element code
              "elementiDes": "Con riferimento alle attività didattiche...", // Question text (IT/EN)
              "elementiNota": "nota dell'elemento", // Question note
              "tipoFormatoCod": "TL_DOM_DFS", // Question format type code
              "note": "note della domanda" // Additional notes
            }
          ],

          // --- Summary answers ---
          "risposteRiepilogo": [
            {
              "paragrafoId": 5125, // Parent paragraph ID
              "domandaId": 5126, // Parent question ID
              "rispostaCompilataId": 2870404, // Compiled answer ID
              "elemCod": "R_MIN50", // Answer element code
              "elementiDes": "Non frequentante o inferiore al 50%...", // Answer text (IT/EN)
              "elementiNota": "nota dell'elemento", // Answer note
              "testoLibero": "qua viene inserito il testo libero della risposta", // Free-text answer
              "tipoFormatoCod": "TL_RSP_TFB", // Answer format type code
              "punteggio": 5, // Answer score
              "domandaTipoFormatoCod": "TL_DOM_DFS", // Parent question format type code
              "note": "altre note" // Additional notes
            }
          ]
        }
      ]
    }
  ]
}
```

**`400 Bad Request`** - invalid user session

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

**`422 Unprocessable Entity`** - invalid user session

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

## Endpoints - Questionnaires (Questionari)

### `GET /questionari/eventoAvaDoc/datiAccesso/{questionarioId}/{aaId}/` - Get teaching evaluation access data

```java
/**
 * Returns the list of access entries for compiled teaching evaluation
 * questionnaires, queried from the V02_QUEST_DOC_VALDID_TAG_USER view.
 * Each entry contains the user session identifiers and the full context
 * of the evaluated teaching activity.
 *
 * @param questionarioId  string (path, required)  - questionnaire code
 * @param aaId            int    (path, required)  - academic year of compilation (4 digits)
 * @param idUser          long   (query, optional) - user ID
 * @param aaOffAdId       int    (query, optional) - offer year of the evaluated activity (4 digits)
 * @param cdsAdCod        string (query, optional) - degree course code of the evaluated activity
 * @param cdsAdDes        string (query, optional) - degree course description; append * for LIKE search
 * @param aaOrdAdId       int    (query, optional) - curriculum ordering year of the evaluated activity (4 digits)
 * @param pdsAdId         long   (query, optional) - study path ID of the evaluated activity
 * @param adCod           string (query, optional) - teaching activity code
 * @param adDes           string (query, optional) - teaching activity description; append * for LIKE search
 * @param docenteMatricola string (query, optional) - evaluated teacher's registration number
 * @param docenteCognome  string (query, optional) - evaluated teacher's surname
 * @param docenteNome     string (query, optional) - evaluated teacher's name
 * @param start           int    (query, optional) - index of the first record to load,
 *                                                   defaults to 0
 * @param limit           int    (query, optional) - number of records to retrieve starting
 *                                                   from start, defaults to 50,
 *                                                   allowed range: 0–100
 * @param order           string (query, optional) - sort order; syntax: +/- followed by
 *                                                   field name (+ = ASC, - = DESC);
 *                                                   multiple fields comma-separated
 * @return List<TagsUserCompEventoAvaDoc> paginated list of access entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoAvaDoc/datiAccesso/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "userCompId": 1, // User compilation session ID
    "questConfigId": 1, // Questionnaire configuration ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "questionarioDes": "Questionario ANVUR scheda 1 e 3", // Questionnaire description
    "idUser": 1, // User ID
    "dataIniComp": "15/10/2015", // Compilation start date (DD/MM/YYYY)
    "dataFineComp": "15/10/2015", // Compilation end date (DD/MM/YYYY)
    "questCompId": 1, // Compilation session ID
    "docenteId": 1, // Evaluated teacher ID
    "docenteMatricola": "mrrs01", // Evaluated teacher's registration number
    "docenteNome": "Mario", // Evaluated teacher's name
    "docenteCognome": "Rossi", // Evaluated teacher's surname
    "docenteIdAb": 1, // Evaluated teacher's habilitation ID
    "aaOffAdId": 2016, // Offer year of the evaluated activity
    "cdsAdId": 1, // Degree course ID of the evaluated activity
    "cdsAdCod": "CDS_AD_1", // Degree course code of the evaluated activity
    "cdsAdDes": "Esempio di CDS AD", // Degree course description of the evaluated activity
    "aaOrdAdId": 2016, // Curriculum ordering year of the evaluated activity
    "pdsAdId": 1, // Study path ID of the evaluated activity
    "adId": 1, // Teaching activity ID
    "adCod": "PDS_AD_1", // Teaching activity code
    "adDes": "Esempio di PDS AD", // Teaching activity description
    "udId": 1, // Teaching unit ID
    "udCod": "PDS_AD_1", // Teaching unit code
    "udDes": "Esempio di PDS AD", // Teaching unit description
    "domPartAdCod": "PARI", // Partition domain code
    "adLogId": 1, // Logistics sharing ID for the activity
    "udLogId": 1, // Logistics sharing ID for the unit
    "aaId": 2016, // Academic year of compilation
    "dataOra": "15/10/2015" // Access timestamp (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /questionari/eventoAvaDoc/datiCompilazione/{questionarioId}/{aaId}/` - Get teaching evaluation compilation data

```java
/**
 * Returns the list of compiled teaching evaluation questionnaire entries,
 * queried from the V02_QUEST_DOC_VALDID_TAG_COMP view. Each entry contains
 * the compilation session ID and the full context of the evaluated teaching
 * activity, including department and teacher details.
 *
 * @param questionarioId   string (path, required)  - questionnaire code
 * @param aaId             int    (path, required)  - academic year of compilation (4 digits)
 * @param aaOffAdId        int    (query, optional) - offer year of the evaluated activity (4 digits)
 * @param cdsAdCod         string (query, optional) - degree course code of the evaluated activity
 * @param cdsAdDes         string (query, optional) - degree course description; append * for LIKE search
 * @param aaOrdAdId        int    (query, optional) - curriculum ordering year of the evaluated activity (4 digits)
 * @param pdsAdId          long   (query, optional) - study path ID of the evaluated activity
 * @param adCod            string (query, optional) - teaching activity code
 * @param adDes            string (query, optional) - teaching activity description; append * for LIKE search
 * @param docenteMatricola string (query, optional) - evaluated teacher's registration number
 * @param docenteCognome   string (query, optional) - evaluated teacher's surname
 * @param docenteNome      string (query, optional) - evaluated teacher's name
 * @param start            int    (query, optional) - index of the first record to load,
 *                                                    defaults to 0
 * @param limit            int    (query, optional) - number of records to retrieve starting
 *                                                    from start, defaults to 50,
 *                                                    allowed range: 0–100
 * @param order            string (query, optional) - sort order; syntax: +/- followed by
 *                                                    field name (+ = ASC, - = DESC);
 *                                                    multiple fields comma-separated
 * @return List<TagsQuestCompEventoAvaDoc> paginated list of compilation entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoAvaDoc/datiCompilazione/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "questCompId": 1, // Compilation session ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "questionarioDes": "Questionario ANVUR scheda 1 e 3", // Questionnaire description
    "docenteId": 1, // Evaluated teacher ID
    "docenteMatricola": "mrrs01", // Evaluated teacher's registration number
    "docenteNome": "Mario", // Evaluated teacher's name
    "docenteCognome": "Rossi", // Evaluated teacher's surname
    "docenteIdAb": 1, // Evaluated teacher's habilitation ID
    "dipId": 1, // Department ID
    "dipCod": "DIP_1", // Department code
    "dipDes": "Esempio di DIP", // Department description
    "aaOffAdId": 2016, // Offer year of the evaluated activity
    "cdsAdId": 1, // Degree course ID of the evaluated activity
    "cdsAdCod": "CDS_AD_1", // Degree course code of the evaluated activity
    "cdsAdDes": "Esempio di CDS AD", // Degree course description of the evaluated activity
    "aaOrdAdId": 2016, // Curriculum ordering year of the evaluated activity
    "pdsAdId": 1, // Study path ID of the evaluated activity
    "adId": 1, // Teaching activity ID
    "adCod": "PDS_AD_1", // Teaching activity code
    "adDes": "Esempio di PDS AD", // Teaching activity description
    "udId": 1, // Teaching unit ID
    "udCod": "PDS_AD_1", // Teaching unit code
    "udDes": "Esempio di PDS AD", // Teaching unit description
    "domPartAdCod": "PARI", // Partition domain code
    "adLogId": 1, // Logistics sharing ID for the activity
    "udLogId": 1, // Logistics sharing ID for the unit
    "aaId": 2016, // Academic year of compilation
    "dataOra": "15/10/2015" // Compilation timestamp (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /questionari/eventoGenQuest/datiAccesso/{questionarioId}/{aaId}/` - Get generic questionnaire access data

```java
/**
 * Returns the list of access entries for compiled generic questionnaires,
 * queried from the V02_QUEST_GEN_TAG_USER view. Each entry contains the
 * user session identifiers and full student context at the time of compilation.
 *
 * @param questionarioId string (path, required)  - questionnaire code
 * @param aaId           int    (path, required)  - academic year of compilation (4 digits)
 * @param idUser         long   (query, optional) - user ID
 * @param cdsCod         string (query, optional) - student's degree course code
 * @param cdsDes         string (query, optional) - student's degree course description;
 *                                                  append * for LIKE search
 * @param aaOrdId        int    (query, optional) - student's curriculum ordering year (4 digits)
 * @param pdsId          long   (query, optional) - student's study path ID
 * @param start          int    (query, optional) - index of the first record to load,
 *                                                  defaults to 0
 * @param limit          int    (query, optional) - number of records to retrieve starting
 *                                                  from start, defaults to 50,
 *                                                  allowed range: 0–100
 * @param order          string (query, optional) - sort order; syntax: +/- followed by
 *                                                  field name (+ = ASC, - = DESC);
 *                                                  multiple fields comma-separated
 * @return List<TagsUserCompEventoGenQuest> paginated list of access entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoGenQuest/datiAccesso/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "userCompId": 1, // User compilation session ID
    "questConfigId": 1, // Questionnaire configuration ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "questionarioDes": "Questionario ANVUR scheda 1 e 3", // Questionnaire description
    "idUser": 1, // User ID
    "dataIniComp": "15/10/2015", // Compilation start date (DD/MM/YYYY)
    "dataFineComp": "15/10/2015", // Compilation end date (DD/MM/YYYY)
    "questCompId": 1, // Compilation session ID
    "stuId": 1, // Student career ID
    "aaId": 2016, // Academic year of compilation
    "cdsId": 1, // Student's degree course ID
    "cdsCod": "CDS_AD_1", // Student's degree course code
    "cdsDes": "Esempio di CDS AD", // Student's degree course description
    "aaOrdId": 2016, // Student's curriculum ordering year
    "pdsId": 1, // Student's study path ID
    "annoCorso": 1, // Student's current course year
    "facId": 1, // Faculty ID
    "facCod": "FAC_1", // Faculty code
    "facDes": "Esempio di FAC", // Faculty description
    "dipId": 1, // Department ID
    "dipCod": "DIP_1", // Department code
    "dipDes": "Esempio di DIP", // Department description
    "sesso": "M", // Student's gender (M/F)
    "annoNascita": 1995, // Student's year of birth
    "cittCod": "IT", // Student's citizenship code
    "nazioneCod": "I", // Student's nationality code
    "cittDes": "Italiana", // Student's citizenship description
    "provDes": "Roma", // Student's province of residence
    "comResId": 1, // Student's municipality of residence ID
    "comResCod": "A944", // Student's municipality of residence code (ISTAT)
    "comResDes": "Bologna", // Student's municipality of residence description
    "nazResId": 1, // Student's country of residence ID
    "nazResCod": "IT", // Student's country of residence code
    "nazResDes": "Italia", // Student's country of residence description
    "tipoTitoloCod": "L2", // Previous qualification type code
    "cfuAcqStu": 4, // CFU acquired by the student
    "dataOra": "15/10/2015" // Access timestamp (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /questionari/eventoGenQuest/datiCompilazione/{questionarioId}/{aaId}/` - Get generic questionnaire compilation data

```java
/**
 * Returns the list of compiled generic questionnaire entries, queried from
 * the V02_QUEST_GEN_TAG_COMP view. Each entry contains the compilation session
 * ID and full student context at the time of compilation. Unlike the access
 * data endpoint, this does not include user session or teacher fields.
 *
 * @param questionarioId string (path, required)  - questionnaire code
 * @param aaId           int    (path, required)  - academic year of compilation (4 digits)
 * @param cdsCod         string (query, optional) - student's degree course code
 * @param cdsDes         string (query, optional) - student's degree course description;
 *                                                  append * for LIKE search
 * @param aaOrdId        int    (query, optional) - student's curriculum ordering year (4 digits)
 * @param pdsId          long   (query, optional) - student's study path ID
 * @param start          int    (query, optional) - index of the first record to load,
 *                                                  defaults to 0
 * @param limit          int    (query, optional) - number of records to retrieve starting
 *                                                  from start, defaults to 50,
 *                                                  allowed range: 0–100
 * @param order          string (query, optional) - sort order; syntax: +/- followed by
 *                                                  field name (+ = ASC, - = DESC);
 *                                                  multiple fields comma-separated
 * @return List<TagsQuestCompEventoGenQuest> paginated list of compilation entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoGenQuest/datiCompilazione/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "questCompId": 1, // Compilation session ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "questionarioDes": "Questionario ANVUR scheda 1 e 3", // Questionnaire description
    "aaId": 2016, // Academic year of compilation
    "cdsId": 1, // Student's degree course ID
    "cdsCod": "CDS_AD_1", // Student's degree course code
    "cdsDes": "Esempio di CDS AD", // Student's degree course description
    "aaOrdId": 2016, // Student's curriculum ordering year
    "pdsId": 1, // Student's study path ID
    "annoCorso": 1, // Student's current course year
    "facId": 1, // Faculty ID
    "facCod": "FAC_1", // Faculty code
    "facDes": "Esempio di FAC", // Faculty description
    "dipId": 1, // Department ID
    "dipCod": "DIP_1", // Department code
    "dipDes": "Esempio di DIP", // Department description
    "sesso": "M", // Student's gender (M/F)
    "annoNascita": 1995, // Student's year of birth
    "cittCod": "IT", // Student's citizenship code
    "nazioneCod": "I", // Student's nationality code
    "cittDes": "Italiana", // Student's citizenship description
    "provDes": "Roma", // Student's province of residence
    "comResId": 1, // Student's municipality of residence ID
    "comResCod": "A944", // Student's municipality of residence code (ISTAT)
    "comResDes": "Bologna", // Student's municipality of residence description
    "nazResId": 1, // Student's country of residence ID
    "nazResCod": "IT", // Student's country of residence code
    "nazResDes": "Italia", // Student's country of residence description
    "tipoTitoloCod": "L2", // Previous qualification type code
    "cfuAcqStu": 4, // CFU acquired by the student
    "dataOra": "15/10/2015" // Compilation timestamp (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /questionari/eventoPostLogin/datiAccesso/{questionarioId}/{aaId}/` - Get post-login questionnaire access data

```java
/**
 * Returns the list of access entries for compiled post-login questionnaires,
 * queried from the V02_QUEST_POST_LOGIN_TAG_USER view. Each entry contains
 * the user session identifiers and full student context at the time of
 * compilation.
 *
 * @param questionarioId string (path, required)  - questionnaire code
 * @param aaId           int    (path, required)  - academic year of compilation (4 digits)
 * @param idUser         long   (query, optional) - user ID
 * @param cdsCod         string (query, optional) - student's degree course code
 * @param cdsDes         string (query, optional) - student's degree course description;
 *                                                  append * for LIKE search
 * @param aaOrdId        int    (query, optional) - student's curriculum ordering year (4 digits)
 * @param pdsId          long   (query, optional) - student's study path ID
 * @param start          int    (query, optional) - index of the first record to load,
 *                                                  defaults to 0
 * @param limit          int    (query, optional) - number of records to retrieve starting
 *                                                  from start, defaults to 50,
 *                                                  allowed range: 0–100
 * @param order          string (query, optional) - sort order; syntax: +/- followed by
 *                                                  field name (+ = ASC, - = DESC);
 *                                                  multiple fields comma-separated
 * @return List<TagsUserCompEventoPostLogin> paginated list of access entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoPostLogin/datiAccesso/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

::: tip
The response structure is identical to [`GET /questionari/eventoGenQuest/datiAccesso/{questionarioId}/{aaId}/`](#get-questionari-eventogenquest-datiaccesso-questionarioid-aaid-get-generic-questionnaire-access-data). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
[
  {
    "userCompId": 1, // User compilation session ID
    "questConfigId": 1, // Questionnaire configuration ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "idUser": 1, // User ID
    "dataIniComp": "15/10/2015", // Compilation start date (DD/MM/YYYY)
    "dataFineComp": "15/10/2015", // Compilation end date (DD/MM/YYYY)
    "questCompId": 1, // Compilation session ID
    "stuId": 1, // Student career ID
    "aaId": 2016, // Academic year of compilation
    "cdsCod": "CDS_AD_1", // Student's degree course code
    "aaOrdId": 2016, // Student's curriculum ordering year
    "pdsId": 1, // Student's study path ID
    // ... see GET /questionari/eventoGenQuest/datiAccesso/{questionarioId}/{aaId}/
    //     for full field list
    "dataOra": "15/10/2015" // Access timestamp (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /questionari/eventoPostLogin/datiCompilazione/{questionarioId}/{aaId}/` - Get post-login questionnaire compilation data

```java
/**
 * Returns the list of compiled post-login questionnaire entries, queried
 * from the V02_QUEST_POST_LOGIN_TAG_COMP view. Each entry contains the
 * compilation session ID and full student context at the time of compilation.
 *
 * @param questionarioId string (path, required)  - questionnaire code
 * @param aaId           int    (path, required)  - academic year of compilation (4 digits)
 * @param cdsCod         string (query, optional) - student's degree course code
 * @param cdsDes         string (query, optional) - student's degree course description;
 *                                                  append * for LIKE search
 * @param aaOrdId        int    (query, optional) - student's curriculum ordering year (4 digits)
 * @param pdsId          long   (query, optional) - student's study path ID
 * @param start          int    (query, optional) - index of the first record to load,
 *                                                  defaults to 0
 * @param limit          int    (query, optional) - number of records to retrieve starting
 *                                                  from start, defaults to 50,
 *                                                  allowed range: 0–100
 * @param order          string (query, optional) - sort order; syntax: +/- followed by
 *                                                  field name (+ = ASC, - = DESC);
 *                                                  multiple fields comma-separated
 * @return List<TagsQuestCompEventoPostLogin> paginated list of compilation entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoPostLogin/datiCompilazione/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

::: tip
The response structure is identical to [`GET /questionari/eventoGenQuest/datiCompilazione/{questionarioId}/{aaId}/`](#get-questionari-eventogenquest-daticompilazione-questionarioid-aaid-get-generic-questionnaire-compilation-data). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
[
  {
    "questCompId": 1, // Compilation session ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "aaId": 2016, // Academic year of compilation
    "cdsCod": "CDS_AD_1", // Student's degree course code
    "aaOrdId": 2016, // Student's curriculum ordering year
    "pdsId": 1, // Student's study path ID
    // ... see GET /questionari/eventoGenQuest/datiCompilazione/{questionarioId}/{aaId}/
    //     for full field list
    "dataOra": "15/10/2015" // Compilation timestamp (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /questionari/eventoValDid/datiAccesso/{questionarioId}/{aaId}/` - Get teaching evaluation (ValDid) access data

```java
/**
 * Returns the list of access entries for compiled teaching evaluation
 * questionnaires, queried from the V02_QUEST_VALDID_TAG_USER view. Each
 * entry contains the user session identifiers, the full context of the
 * evaluated teaching activity, the evaluated teacher, the titular teacher,
 * and the student's demographic data.
 *
 * @param questionarioId   string (path, required)  - questionnaire code
 * @param aaId             int    (path, required)  - academic year of compilation (4 digits)
 * @param idUser           long   (query, optional) - user ID
 * @param aaOffAdId        int    (query, optional) - offer year of the evaluated activity (4 digits)
 * @param cdsAdCod         string (query, optional) - degree course code of the evaluated activity
 * @param cdsAdDes         string (query, optional) - degree course description; append * for LIKE search
 * @param aaOrdAdId        int    (query, optional) - curriculum ordering year of the evaluated activity (4 digits)
 * @param pdsAdId          long   (query, optional) - study path ID of the evaluated activity
 * @param adCod            string (query, optional) - teaching activity code
 * @param adDes            string (query, optional) - teaching activity description; append * for LIKE search
 * @param docenteMatricola string (query, optional) - evaluated teacher's registration number
 * @param docenteCognome   string (query, optional) - evaluated teacher's surname
 * @param docenteNome      string (query, optional) - evaluated teacher's name
 * @param start            int    (query, optional) - index of the first record to load,
 *                                                    defaults to 0
 * @param limit            int    (query, optional) - number of records to retrieve starting
 *                                                    from start, defaults to 50,
 *                                                    allowed range: 0–100
 * @param order            string (query, optional) - sort order; syntax: +/- followed by
 *                                                    field name (+ = ASC, - = DESC);
 *                                                    multiple fields comma-separated
 * @return List<TagsUserCompEventoValDid> paginated list of access entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoValDid/datiAccesso/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "userCompId": 1, // User compilation session ID
    "questConfigId": 1, // Questionnaire configuration ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "questionarioDes": "Questionario ANVUR scheda 1 e 3", // Questionnaire description
    "idUser": 1, // User ID
    "dataIniComp": "15/10/2015", // Compilation start date (DD/MM/YYYY)
    "dataFineComp": "15/10/2015", // Compilation end date (DD/MM/YYYY)
    "questCompId": 1, // Compilation session ID
    "stuId": 1, // Student career ID

    // --- Evaluated teaching activity ---
    "aaOffAdId": 2016, // Offer year of the evaluated activity
    "cdsAdId": 1, // Degree course ID of the evaluated activity
    "cdsAdCod": "CDS_AD_1", // Degree course code of the evaluated activity
    "cdsAdDes": "Esempio di CDS AD", // Degree course description of the evaluated activity
    "aaOrdAdId": 2016, // Curriculum ordering year of the evaluated activity
    "pdsAdId": 1, // Study path ID of the evaluated activity
    "adId": 1, // Teaching activity ID
    "adCod": "PDS_AD_1", // Teaching activity code
    "adDes": "Esempio di PDS AD", // Teaching activity description
    "udId": 1, // Teaching unit ID
    "udCod": "PDS_AD_1", // Teaching unit code
    "udDes": "Esempio di PDS AD", // Teaching unit description
    "domPartAdCod": "PARI", // Partition domain code
    "partAdCod": "S1", // Semester partition code
    "annoCorsoAd": 1, // Course year of the evaluated activity

    // --- Evaluated teacher ---
    "docenteId": 1, // Evaluated teacher ID
    "docenteMatricola": "mrrs01", // Evaluated teacher's registration number
    "docenteNome": "Mario", // Evaluated teacher's name
    "docenteCognome": "Rossi", // Evaluated teacher's surname
    "docenteIdAb": 1, // Evaluated teacher's habilitation ID

    // --- Titular teacher ---
    "docenteTitId": 1, // Titular teacher ID
    "docenteTitMatricola": "mrrs01", // Titular teacher's registration number
    "docenteTitNome": "Mario", // Titular teacher's name
    "docenteTitCognome": "Rossi", // Titular teacher's surname
    "docenteTitIdAb": 1, // Titular teacher's habilitation ID

    // --- Student context ---
    "cdsId": 1, // Student's degree course ID
    "cdsCod": "CDS_AD_1", // Student's degree course code
    "cdsDes": "Esempio di CDS AD", // Student's degree course description
    "facId": 1, // Faculty ID
    "facCod": "FAC_1", // Faculty code
    "facDes": "Esempio di FAC", // Faculty description
    "dipId": 1, // Department ID
    "dipCod": "DIP_1", // Department code
    "dipDes": "Esempio di DIP", // Department description
    "sesso": "M", // Student's gender (M/F)
    "annoNascita": 1995, // Student's year of birth
    "cittCod": "IT", // Student's citizenship code
    "nazioneCod": "I", // Student's nationality code
    "cittDes": "Italiana", // Student's citizenship description
    "provDes": "Roma", // Student's province of residence
    "comResId": 1, // Student's municipality of residence ID
    "comResCod": "A944", // Student's municipality of residence code (ISTAT)
    "comResDes": "Bologna", // Student's municipality of residence description
    "nazResId": 1, // Student's country of residence ID
    "nazResCod": "IT", // Student's country of residence code
    "nazResDes": "Italia", // Student's country of residence description
    "tipoTitoloCod": "L2", // Previous qualification type code
    "aaCfuStu": 2016, // Academic year reference for CFU count
    "cfuAaStu": 4, // CFU acquired in the reference academic year
    "cfuAcqStu": 4, // Total CFU acquired by the student
    "aaId": 2016, // Academic year of compilation
    "dataOra": "15/10/2015", // Access timestamp (DD/MM/YYYY)
    "stuFreqFlg": 0 // Student attendance flag (0=non-attending, 1=attending)
  }
]
```

<br>

---

<br>

### `GET /questionari/eventoValDid/datiCompilazione/{questionarioId}/{aaId}/` - Get teaching evaluation (ValDid) compilation data

```java
/**
 * Returns the list of compiled teaching evaluation questionnaire entries,
 * queried from the V02_QUEST_VALDID_TAG_COMP view. Each entry contains the
 * compilation session ID and the full context of the evaluated teaching
 * activity, including faculty and department of the AD, evaluated teacher,
 * titular teacher, and student demographic data.
 *
 * @param questionarioId   string (path, required)  - questionnaire code
 * @param aaId             int    (path, required)  - academic year of compilation (4 digits)
 * @param aaOffAdId        int    (query, optional) - offer year of the evaluated activity (4 digits)
 * @param cdsAdCod         string (query, optional) - degree course code of the evaluated activity
 * @param cdsAdDes         string (query, optional) - degree course description; append * for LIKE search
 * @param aaOrdAdId        int    (query, optional) - curriculum ordering year of the evaluated activity (4 digits)
 * @param pdsAdId          long   (query, optional) - study path ID of the evaluated activity
 * @param adCod            string (query, optional) - teaching activity code
 * @param adDes            string (query, optional) - teaching activity description; append * for LIKE search
 * @param docenteMatricola string (query, optional) - evaluated teacher's registration number
 * @param docenteCognome   string (query, optional) - evaluated teacher's surname
 * @param docenteNome      string (query, optional) - evaluated teacher's name
 * @param start            int    (query, optional) - index of the first record to load,
 *                                                    defaults to 0
 * @param limit            int    (query, optional) - number of records to retrieve starting
 *                                                    from start, defaults to 50,
 *                                                    allowed range: 0–100
 * @param order            string (query, optional) - sort order; syntax: +/- followed by
 *                                                    field name (+ = ASC, - = DESC);
 *                                                    multiple fields comma-separated
 * @return List<TagsQuestCompEventoValDid> paginated list of compilation entries,
 *         or an empty array if none match the filters
 */
GET /questionari/eventoValDid/datiCompilazione/{questionarioId}/{aaId}/
```

**Auth:** Public · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "questCompId": 1, // Compilation session ID
    "questionarioId": 1, // Questionnaire numeric ID
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "questionarioDes": "Questionario ANVUR scheda 1 e 3", // Questionnaire description

    // --- Evaluated teaching activity ---
    "aaOffAdId": 2016, // Offer year of the evaluated activity
    "cdsAdId": 1, // Degree course ID of the evaluated activity
    "cdsAdCod": "CDS_AD_1", // Degree course code of the evaluated activity
    "cdsAdDes": "Esempio di CDS AD", // Degree course description of the evaluated activity
    "aaOrdAdId": 2016, // Curriculum ordering year of the evaluated activity
    "pdsAdId": 1, // Study path ID of the evaluated activity
    "adId": 1, // Teaching activity ID
    "adCod": "PDS_AD_1", // Teaching activity code
    "adDes": "Esempio di PDS AD", // Teaching activity description
    "udId": 1, // Teaching unit ID
    "udCod": "PDS_AD_1", // Teaching unit code
    "udDes": "Esempio di PDS AD", // Teaching unit description
    "domPartAdCod": "PARI", // Partition domain code
    "partAdCod": "S1", // Semester partition code
    "tipoCreAdCod": "LEZ", // Credit type code for the activity
    "annoCorsoAd": 1, // Course year of the evaluated activity
    "facAdId": 1, // Faculty ID of the evaluated activity
    "facAdCod": "FAC_1", // Faculty code of the evaluated activity
    "facAdDes": "Esempio di FAC", // Faculty description of the evaluated activity
    "dipAdId": 1, // Department ID of the evaluated activity
    "dipAdCod": "DIP_1", // Department code of the evaluated activity
    "dipAdDes": "Esempio di DIP", // Department description of the evaluated activity

    // --- Evaluated teacher ---
    "docenteId": 1, // Evaluated teacher ID
    "docenteMatricola": "mrrs01", // Evaluated teacher's registration number
    "docenteNome": "Mario", // Evaluated teacher's name
    "docenteCognome": "Rossi", // Evaluated teacher's surname
    "docenteIdAb": 1, // Evaluated teacher's habilitation ID

    // --- Titular teacher ---
    "docenteTitId": 1, // Titular teacher ID
    "docenteTitMatricola": "mrrs01", // Titular teacher's registration number
    "docenteTitNome": "Mario", // Titular teacher's name
    "docenteTitCognome": "Rossi", // Titular teacher's surname
    "docenteTitIdAb": 1, // Titular teacher's habilitation ID

    // --- Student context ---
    "cdsId": 1, // Student's degree course ID
    "cdsCod": "CDS_AD_1", // Student's degree course code
    "cdsDes": "Esempio di CDS AD", // Student's degree course description
    "facId": 1, // Student's faculty ID
    "facCod": "FAC_1", // Student's faculty code
    "facDes": "Esempio di FAC", // Student's faculty description
    "dipId": 1, // Student's department ID
    "dipCod": "DIP_1", // Student's department code
    "dipDes": "Esempio di DIP", // Student's department description
    "sesso": "M", // Student's gender (M/F)
    "annoNascita": 1995, // Student's year of birth
    "cittCod": "IT", // Student's citizenship code
    "nazioneCod": "I", // Student's nationality code
    "cittDes": "Italiana", // Student's citizenship description
    "provDes": "Roma", // Student's province of residence
    "comResId": 1, // Student's municipality of residence ID
    "comResCod": "A944", // Student's municipality of residence code (ISTAT)
    "comResDes": "Bologna", // Student's municipality of residence description
    "nazResId": 1, // Student's country of residence ID
    "nazResCod": "IT", // Student's country of residence code
    "nazResDes": "Italia", // Student's country of residence description
    "tipoTitoloCod": "L2", // Previous qualification type code
    "aaCfuStu": 2016, // Academic year reference for CFU count
    "cfuAaStu": 4, // CFU acquired in the reference academic year
    "cfuAcqStu": 4, // Total CFU acquired by the student
    "aaRegId": 2016, // Student's enrollment regulation year
    "annoCorso": 1, // Student's current course year
    "aaId": 2016, // Academic year of compilation
    "dataOra": "15/10/2015", // Compilation timestamp (DD/MM/YYYY)
    "stuFreqFlg": 0 // Student attendance flag (0=non-attending, 1=attending)
  }
]
```

<br>

---

<br>

### `GET /questionari/questionariCompilati/{questCompId}/` - Get all elements of a compiled questionnaire

```java
/**
 * Returns all elements of a compiled questionnaire identified by questCompId,
 * including the answers chosen by the compiler. Results are queried from the
 * V02_GEN_QUESTIONARIO view and ordered by ORD_VIS ASC.
 *
 * @param questCompId long (path, required) - compilation session ID
 * @return List<QuestionariCompilati> all question-answer pairs for the given
 *         compilation session, ordered by display order ascending
 */
GET /questionari/questionariCompilati/{questCompId}/
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "questionarioId": 1, // Questionnaire numeric ID
    "questCompId": 1, // Compilation session ID
    "ordVis": 4, // Display order (sorted ASC)
    "questionarioCod": "AVA_1_3_STD", // Questionnaire code
    "questionarioDes": "Questionario ANVUR scheda 1 e 3", // Questionnaire description
    "statoQuestCod": "A", // Questionnaire status code
    "questionarioNote": "Questionario ANVUR scheda 1 e 3", // Questionnaire notes
    "questContCod": "VAL_DID", // Questionnaire context code
    "questContDes": "Valutazione della didattica", // Questionnaire context description
    "questDataIns": "15/10/2015", // Questionnaire insertion date (DD/MM/YYYY)
    "questDataMod": "15/10/2015", // Questionnaire last modification date (DD/MM/YYYY)
    "quesitoId": 1, // Question instance ID
    "elemCod": "R_INS1", // Element code
    "elementiDes": "Dichiarazione di frequenza", // Element description
    "parentQuesitoId": 1, // Parent question instance ID
    "tipoFormatoCod": "TL_RSP_TFB", // Format type code
    "tipoFormatoDes": "Risposta a testo fisso", // Format type description
    "quesitoPunteggio": 4, // Answer score
    "obbligatorioFlg": 0, // Mandatory flag (0=no, 1=yes)
    "quesitoNote": "Questionario ANVUR scheda 1 e 3", // Question notes
    "tagCod": "STU_ID_COMP", // Tag code associated with the question
    "categCod": "CAT_ECO", // Category code
    "tipoElemCod": "T_DOMANDA", // Element type code (T_DOMANDA=question, T_RISPOSTA=answer, etc.)
    "elementiNota": "note", // Element note
    "rispostaId": 1, // Selected answer ID
    "testoLibero": "Esempio di risposta a testo libero", // Free-text answer content
    "rispostaDataIns": "15/10/2015", // Answer insertion date (DD/MM/YYYY)
    "rispostaDataMod": "15/10/2015" // Answer last modification date (DD/MM/YYYY)
  }
]
```

<br>

---

<br>

### `GET /questionari/tirocinio/{domTiroId}` - Get internship questionnaires

```java
/**
 * Returns the questionnaire configuration and compilation tag data associated
 * with an internship application, identified by its unique ID.
 *
 * @param domTiroId long (path, required) - internship application ID
 * @return QuestionariTirocinio an object containing the questionnaire
 *         configuration entries and the compilation tag data for the
 *         internship application
 */
GET /questionari/tirocinio/{domTiroId}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`200 OK`**

```json
{
  "configTiro": [
    // Questionnaire configuration entries for the internship
    {}
  ],
  "domTiroTagComp": [
    // Compilation tag data entries for the internship application
    {}
  ]
}
```

::: warning
The ESSE3 Swagger spec does not provide example field-level data for this endpoint. Refer to the [Swagger UI](#references) for the full model definition.
:::

<br>

---

<br>

### `POST /questionari/visibility/{userId}/{questCompId}/{visKind}/{visValue}` - Set questionnaire result visibility

```java
/**
 * Sets the visibility flag of a compiled questionnaire's results for either
 * the recipient (VIS_DEST_FLG) or the public (VIS_PUB_FLG).
 *
 * @param userId      long    (path, required) - ID of the user performing the change
 * @param questCompId long    (path, required) - compilation session ID
 * @param visKind     string  (path, required) - visibility type to set;
 *                                               valid values:
 *                                               VIS_DEST_FLG = recipient visibility,
 *                                               VIS_PUB_FLG  = public visibility
 * @param visValue    boolean (path, required) - visibility value to set
 *                                               (true=visible, false=hidden)
 * @return 200 OK if the visibility was updated successfully,
 *         400 Bad Request if the input is invalid
 */
POST /questionari/visibility/{userId}/{questCompId}/{visKind}/{visValue}
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`** - visibility updated successfully

**`400 Bad Request`** - invalid input

<br>

---

<br>

## Endpoints - Booklet (Libretto)

### `GET /questionari/libretto/{adsceId}/unitadidattiche` - Get teaching units with questionnaire status

```java
/**
 * Returns the teaching units associated with a student booklet activity entry,
 * along with the current status of the teaching evaluation questionnaire for
 * each unit. Used to determine which units still require questionnaire
 * compilation and to retrieve the tag string needed to start a new session.
 *
 * @param adsceId     long   (path, required)  - student booklet teaching activity ID
 * @param eventCompId string (query, required) - compilation event ID
 * @param domPartCod  string (query, optional) - partition domain code filter
 * @return UnitaDidatticaConQuestionario the activity entry with its questionnaire
 *         configuration and the list of teaching units with their compilation status
 */
GET /questionari/libretto/{adsceId}/unitadidattiche
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`
**Cache:** `configuration`

#### Response

**`200 OK`**

```json
{
  "adsceId": 0, // Student booklet activity ID (primary key)
  "stato": 0, // Questionnaire compilation status
  "questConfigId": 325, // Questionnaire configuration ID
  "des": "Valutazione didattica", // Activity description
  "questionarioDes": "Questionario per la Valutazione della Didattica", // Questionnaire description
  "questionarioId": 1, // Questionnaire numeric ID
  "anonimoFlg": 1, // Anonymous compilation flag (0=no, 1=yes)

  // --- Teaching units ---
  "udLogPdsListWeb": [
    {
      "adsceId": 4401793, // Student booklet activity ID
      "aaOffId": 2015, // Offer year
      "cdsId": 278, // Degree course ID
      "aaOrd": 2014, // Curriculum ordering year
      "pdsId": 9999, // Study path ID
      "adId": 9886, // Teaching activity ID
      "udId": 1, // Teaching unit ID
      "partCod": "WI804", // Partition code
      "fatPartCod": "A2", // Partition factor code
      "domPartCod": "M-Z", // Partition domain code
      "docenteId": 421, // Teacher ID
      "udCod": "4S002918", // Teaching unit code
      "udDes": "Lingua spagnola 2", // Teaching unit description
      "tipoCredCod": "Lez", // Credit type code
      "tipoCredDes": "Lezione", // Credit type description
      "docentiCognome": "Bianchi", // Teacher's surname
      "docentiNome": "Luca", // Teacher's name
      "domPartDes": "Cognomi M-Z", // Partition domain description
      "statoLink": 3, // Questionnaire link status for this unit
      "adDes": "Lingua Spagnola", // Teaching activity description
      "adCod": "4S002918", // Teaching activity code
      "cfu": 9, // CFU for this unit
      "tagsValdid": "AA_OFF_AD_ID_VAL:2015|PDS_AD_ID_VAL:9999|..."
      // Pipe-separated tag string to pass to start endpoint
    }
  ]
}
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

### `GET /questionari/libretto/{matId}` - Get booklet activities with questionnaire status

```java
/**
 * Returns all booklet activity entries for a given student career segment,
 * optionally filtered by questionnaire status. Results are ordered by +ord
 * by default. Each entry includes exam outcome, attendance data, frequency
 * detection, and optional fields for doctoral info, inter-university info,
 * and extra partition/teacher data.
 *
 * @param matId          long   (path, required)  - student career segment ID
 * @param questFilter    string (query, optional) - questionnaire filter:
 *                                                  P = all activities with questionnaires
 *                                                      regardless of status;
 *                                                  C = only activities with questionnaires
 *                                                      still to be compiled
 * @param fields         string (query, optional) - list of optional fields to include;
 *                                                  use ALL to return all fields;
 *                                                  supports Ant Glob Patterns
 * @param optionalFields string (query, optional) - alias for fields; same behavior
 * @param order          string (query, optional) - sort order; syntax: +/- followed by
 *                                                  field name (+ = ASC, - = DESC);
 *                                                  default: +ord
 * @param filter         string (query, optional) - RSQL filter expression applied
 *                                                  after data retrieval
 * @return List<RigaLibretto> booklet activity rows with exam outcomes, frequency
 *         data, and questionnaire link status
 */
GET /questionari/libretto/{matId}
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `configuration`

#### Response

**`200 OK`**

```json
[
  {
    "matId": 1, // Career segment ID
    "ord": 1, // Display order
    "adsceId": 1, // Booklet activity ID (primary key)
    "stuId": 1, // Student career ID
    "pianoId": 1, // Study plan ID
    "itmId": 1, // Study plan item ID
    "ragId": 1, // Exam grouping ID
    "raggEsaTipo": "ESA", // Exam grouping type
    "adCod": "ADCOD", // Teaching activity code
    "adDes": "Descrizione AD", // Teaching activity description
    "annoCorso": 1, // Course year
    "stato": "S", // Activity status code
    "statoDes": "Superata", // Activity status description
    "chiaveADContestualizzata": {
      // Contextualized AD key
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
      "afId": 1 // Teaching load ID
    },
    "tipoEsaCod": "O", // Exam type code
    "tipoEsaDes": "Orale", // Exam type description
    "tipoInsCod": "OBB", // Insertion type code
    "tipoInsDes": "Obbligatorio", // Insertion type description
    "ricId": 0, // Recognition ID
    "tipoRicCod": "P", // Recognition type code
    "peso": 10, // Activity weight
    "aaFreqId": 2016, // Attendance academic year ID
    "dataFreq": "15/10/2015", // Attendance date (DD/MM/YYYY)
    "freqUffFlg": 1, // Official attendance flag (0=no, 1=yes)
    "freqObbligFlg": 0, // Mandatory attendance flag (0=no, 1=yes)
    "dataScadIscr": "15/10/2015", // Exam registration deadline (DD/MM/YYYY)
    "gruppoVotoId": 1, // Grade group ID
    "gruppoVotoMinVoto": 18, // Grade group minimum grade
    "gruppoVotoMaxVoto": 30, // Grade group maximum grade
    "gruppoVotoLodeFlg": 1, // Honours allowed flag (0=no, 1=yes)
    "gruppoGiudCod": "9998", // Judgement group code
    "gruppoGiudDes": "Idoneità", // Judgement group description

    // --- Exam outcome ---
    "esito": {
      "modValCod": "V", // Assessment mode code
      "supEsaFlg": 1, // Passed flag (0=no, 1=yes)
      "voto": 0, // Grade
      "lodeFlg": 1, // Honours flag (0=no, 1=yes)
      "tipoGiudCod": "IDO", // Judgement type code
      "tipoGiudDes": "Idoneo", // Judgement type description
      "dataEsa": "15/10/2015", // Exam date (DD/MM/YYYY)
      "aaSupId": 2016 // Academic year of passing
    },

    "sovranFlg": 0, // Sovereign flag (0=no, 1=yes)
    "note": "nota di prova", // Activity notes
    "debitoFlg": 0, // Debt flag (optional field) (0=no, 1=yes)
    "ofaFlg": 0, // OFA flag (optional field) (0=no, 1=yes)
    "annoCorsoAnticipo": 2, // Anticipated course year
    "genAutoFlg": 0, // Auto-generated flag (optional field) (0=no, 1=yes)
    "genRicSpecFlg": 0, // Special recognition flag (optional field) (0=no, 1=yes)
    "tipoOrigEvecar": 4, // Career event origin type (optional field)
    "urlSitoWeb": "null", // Website URL (optional field)

    // --- Doctoral info (optional field) ---
    "infoDottorati": {
      "soggettoErogante": "Università La Sapienza", // Provider institution
      "destinazione": "Università La Sapienza", // Destination institution
      "dataPartenza": "10/10/2020", // Departure date (DD/MM/YYYY)
      "dataArrivo": "10/10/2020", // Arrival date (DD/MM/YYYY)
      "noteStu": "10/10/2020", // Student notes
      "adFuoriOffFlg": 1, // Out-of-offer activity flag (0=no, 1=yes)
      "missioneFlg": 0, // Mission flag (0=no, 1=yes)
      "ricercaFlg": 0, // Research flag (0=no, 1=yes)
      "periodoEsteroFlg": 0, // Abroad period flag (0=no, 1=yes)
      "aziendaFlg": 0 // Company flag (0=no, 1=yes)
    },

    // --- Frequency detection (optional field) ---
    "rilFreq": [
      {
        "matId": 1, // Career segment ID
        "adsceRilId": 0, // Detection entry ID (primary key)
        "aaRilevazioneId": 0, // Detection academic year ID
        "adsceId": 1, // Booklet activity ID
        "stuTipoCorsoCod": "L2", // Student course type code
        "statoAdsceRil": "A", // Detection status code
        "aaFreqId": 2020, // Attendance academic year
        "dataFreq": "10/10/2020", // Attendance date (DD/MM/YYYY)
        "staSceCod": "F", // Selection status code
        "totOrePerFreq": 0, // Total hours for attendance
        "totRilPerFreq": 0, // Total detections for attendance
        "percPresPerFreq": 100, // Attendance percentage
        "percOrePresPerFreq": 100, // Attendance hours percentage
        "numRil": 0, // Number of detections
        "oreRil": 0, // Hours detected
        "numAss": 0, // Number of absences
        "numPres": 0, // Number of presences
        "oreAss": 0, // Hours absent
        "orePres": 0, // Hours present
        "oreTotFreqAd": 0, // Total activity hours
        "numTotFreqAd": 0, // Total activity detections
        "dataFreqRilFreqDett": "10/10/2020 10:00:00", // Last detection detail timestamp
        "dataFreqAdLog": "01/01/1900 10:00:00" // Logistics attendance date
      }
    ],

    "statoMissione": "I", // Mission status code (optional field)
    "statoMissioneDes": "In Missione", // Mission status description (optional field)
    "numAppelliPrenotabili": 1, // Number of bookable exam sessions
    "superataFlg": 0, // Passed flag (0=no, 1=yes)
    "numPrenotazioni": 10, // Number of active bookings
    "abilFlg": 1, // Enabled flag (0=no, 1=yes)
    "genConvAdsceId": 12345, // Converted activity ID

    // --- Inter-university info (optional field) ---
    "infoInterateneo": {
      "aaOffAdId": 2024, // Offer year of the inter-university activity
      "aaOrdAdId": 2024, // Ordering year of the inter-university activity
      "adCod": "AD", // Teaching activity code
      "adDes": "Attivita", // Teaching activity description
      "adsceId": 12345, // Booklet activity ID
      "ateneoId": 6, // Partner institution ID
      "cdsAdCod": "3165", // Degree course code
      "cdsAdDes": "CHIMICA", // Degree course description
      "pdsAdCod": "PDS9999", // Study path code
      "pdsAdDes": "COMUNE" // Study path description
    },

    // --- Extra partition/teacher info (optional field) ---
    "extraInfo": {
      "matId": 1, // Career segment ID (primary key)
      "adsceId": 1, // Booklet activity ID (primary key)
      "dataInizioLezioni": "10/10/2020", // Lesson start date (DD/MM/YYYY)
      "dataFineLezioni": "10/10/2020", // Lesson end date (DD/MM/YYYY)
      "titMatricola": "222", // Titular teacher's registration number
      "titNome": "Mario", // Titular teacher's name
      "titCognome": "Rossi", // Titular teacher's surname
      "titCodFis": "222", // Titular teacher's fiscal code
      "fatPartCod": "AK_LZ", // Partition factor code
      "domPartCod": "AK", // Partition domain code
      "tipiSceCod": "O", // Selection type code
      "tipiSceDes": "Obbligatoria", // Selection type description
      "sceDes": "O", // Selection description
      "freqObbligFlg": 0, // Mandatory attendance flag (0=no, 1=yes)
      "adPartId": 1, // Activity partition ID
      "titDocenteId": 1234 // Titular teacher ID
    },

    "statoLink": 0 // Questionnaire link status for this activity
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

### `GET /questionari/libretto/{matId}/righe/{adsceId}` - Get single booklet activity row

```java
/**
 * Returns a single booklet activity entry identified by adsceId, scoped to
 * the given student career segment. Supports the same optional fields and
 * questionnaire filter as the full booklet endpoint.
 *
 * @param matId          long   (path, required)  - student career segment ID
 * @param adsceId        long   (path, required)  - student booklet activity ID
 * @param questFilter    string (query, optional) - questionnaire filter:
 *                                                  P = activity with questionnaire
 *                                                      regardless of status;
 *                                                  C = only if questionnaire is
 *                                                      still to be compiled
 * @param optionalFields string (query, optional) - list of optional fields to include;
 *                                                  use ALL to return all fields;
 *                                                  supports Ant Glob Patterns
 * @return RigaLibretto the booklet activity row with exam outcome, frequency
 *         data, and questionnaire link status, or 404 if not found
 */
GET /questionari/libretto/{matId}/righe/{adsceId}
```

**Auth:** `UTENTE_TECNICO` · `STUDENTE` (at least one required) · Supported: `Basic`, `JWT`

**Cache:** `configuration`

::: tip
The response structure is identical to [`GET /questionari/libretto/{matId}`](#get-questionari-libretto-matid-get-booklet-activities-with-questionnaire-status). Refer to that endpoint for the full field-level documentation.
:::

#### Response

**`200 OK`**

```json
{
  "matId": 1,                 // Career segment ID
  "adsceId": 1,               // Booklet activity ID (primary key)
  "stuId": 1,
  "adCod": "ADCOD",
  "adDes": "Descrizione AD",
  "stato": "S",
  "statoDes": "Superata",
  "esito": { ... },           // See GET /questionari/libretto/{matId} for full structure
  "rilFreq": [ ... ],         // Optional field - frequency detection entries
  "infoDottorati": { ... },   // Optional field - doctoral info
  "infoInterateneo": { ... }, // Optional field - inter-university info
  "extraInfo": { ... },       // Optional field - partition/teacher extra info
  "statoLink": 0              // Questionnaire link status
}
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

- **Swagger UI:** [Questionari Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Questionari%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fquestionari-service-v1)#/>)
- **Spec YAML:** [p02-questionariApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/api/swagger-service-v1/swagger/specs/p02-questionariApiV1.yaml)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
