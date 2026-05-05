---
title: Docenti API V1 | OhMyUniversity!
description: REST API documentation for the Docenti service (docenti-service-v1) - CINECA ESSE3.
head:
  - - meta
    - property: og:title
      content: Docenti API V1 | OhMyUniversity!
  - - meta
    - property: og:description
      content: REST API documentation for the Docenti service (docenti-service-v1) - CINECA ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/api-unimol/docenti-api-v1
  - - meta
    - name: keywords
      content: docenti v1 api, esse3 rest api, cineca api, ohmyuniversity api, docenti-service-v1
  - - meta
    - name: twitter:title
      content: Docenti API V1 | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: REST API documentation for the Docenti service (docenti-service-v1) - CINECA ESSE3.
---

# OhMyUniversity! - Unimol: Docenti API V1

**ENG:** `Professors`

**Version:** `1.0.0` · **Base URL:** `/docenti-service-v1`

These services allow retrieving information about professors and performing operations on them.

---

## Endpoints - Professors (Docenti)

### `GET /docenti` - Retrieve professors

```java
/**
 * Retrieves information about professors along with their possible reception hours.
 * Optional parameters filter one or more professors.
 *
 * @param docenteMatricola     string (query, optional)            - Professor registration number
 * @param docenteCognome       string (query, optional)            - Professor surname (using * applies a LIKE filter)
 * @param docenteNome          string (query, optional)            - Professor name (using * applies a LIKE filter)
 * @param codFis               string (query, optional)            - User's fiscal code
 * @param idAb                 integer (query, optional)           - Person's address book ID in ugov
 * @param dataMod              string (query, optional)            - Last modification date
 * @param oraMod               string (query, optional)            - Last modification time (HH:MI:SS), retrieves all records inserted...
 * @param dataIns              string (query, optional)            - Insertion date
 * @param caricaId             array (query, optional)             - Role ID
 * @param cdsIdCarica          array (query, optional)             - Study Course ID associated with the role
 * @param facIdCarica          array (query, optional)             - Faculty/Department ID associated with the role
 * @param dataValiditaCarica   string (query, optional)            - Filter for a valid role on a specific date (format DD/MM/YYYY)
 * @param facIdAppartenenza    integer (query, optional)           - Affiliation Faculty/Department ID
 * @param ruoliDocCod          array (query, optional)             - Professor roles code
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @param fields               string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @return List<DocentiNew> on success,
 *         DettaglioErrore on failure
 */
GET /docenti
```

**Auth:** `UserTecnicoMassivo` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserDependent

#### Response

**`200 OK`**

```json
[
  {
    "docenteId": 1, // Professor key
    "docenteMatricola": "MAT1234", // Professor registration number
    "docenteCognome": "ROSSI", // Professor surname
    "docenteNome": "PAOLO", // Professor name
    "userId": "userID", // Active UserId linked to the professor
    "settCod": "MAT/01", // Professor sector
    "badge": "B90887", // Badge number
    "eMail": "pr@pers.it", // Professor email
    "emailAte": "mrossi@ateneo.it", // Email address assigned by the university.
    "emailDocenteLa": "pr@ateneola.it", // Reference email for L.A. professors.
    "facId": 1, // Professor's affiliation structure ID
    "facCod": "facCod", // Professor's affiliation structure code
    "facDes": "facDes", // Professor's affiliation structure description
    "ruoloDocCod": "ORD", // Professor role
    "codFis": "LNZFCR67R07A944E", // Professor fiscal code
    "cellulare": "3471234562", // Professor mobile phone
    "hyperlink": "www.paolorossi.it", // Professor hyperlink
    "dataIniAtt": "15/10/2015", // Professor activity start date. Format: DD/MM/YYYY
    "dataFinAtt": "15/10/2015", // Professor activity end date. Format: DD/MM/YYYY
    "sesso": "F,M", // Professor gender
    "dataNascita": "15/10/1970", // Professor birth date. Format: DD/MM/YYYY
    "p01NaziCodFisc": "Z112", // Birth nation fiscal code
    "p01NaziDes": "Francia", // Birth nation description
    "p01NaziNazioneCod": "FR", // Birth nation ISO code
    "p01NaziCod": "215", // Birth nation code
    "p01ComuComuneId": 1, // Birth municipality ID
    "p01ComuCodIstat": "698", // Birth municipality ISTAT code
    "p01ComuComuneCod": "L219", // Birth municipality code
    "p01ComuCodIstatMiur": "698", // Birth municipality MIUR ISTAT code
    "comuNascDes": "Milano", // Birth municipality description
    "citstraNasc": "Paris", // Birth foreign city
    "comuNascSigla": "BO", // Birth province abbreviation
    "p01ProvDes": "Bologna", // Birth province description
    "notePubblicazioni": "note pubblicazioni", // Publication notes
    "noteBiografiche": "note biografiche", // Biographical notes
    "noteCurriculum": "note curriculum", // Curriculum notes
    "noteDocente": "note docente", // Professor notes
    "idAb": 1, // Professor AB ID
    "dataModDoc": "15/10/1970", // Professor modification date. Format: DD/MM/YYYY
    "dataMod": "15/10/1970", // Professor modification date. Format: DD/MM/YYYY
    "dataIns": "15/10/1970", // Professor insertion date. Format: DD/MM/YYYY
    "settDes": "BIOLOGIA APPLICATA", // Sector description
    "dipId": 123, // Department identifier
    "dipCod": "A234", // Department code
    "dipDes": "Dipartimento di Biologia", // Department description
    "ruoloDocDes": "Ricercatore", // Professor role description
    "profilo": "0", // Professor profile
    "docenteAppellativo": "Professor", // Professor title
    "dataIniRuolo": "15/10/1970", // Current professor role start date. Format: DD/MM/YYYY
    "orario": [
      {
        "docenteOrarioId": 1, // Professor schedule key (required)
        "docenteId": 1, // Professor key (required)
        "giorno": "1,2,3,4,5,6,7", // Day of the week
        "giornoDes": "Lunedì", // Day of the week
        "oraInizio": "08:30", // Appointment start time.
        "oraFine": "08:30", // Appointment end time.
        "desLuogo": "aula 20", // Appointment location
        "nota": "nota" // Note linked to the appointment
      }
    ], // Orario (optional)
    "cariche": [
      {
        "struttId": 321, // Structure identifier.
        "caricaId": 12345, // Role identifier.
        "caricaDes": "Direttore", // Role description.
        "caricaCognome": "Mario", // Manager surname.
        "caricaNome": "Rossi", // Manager name.
        "caricaIdAb": 123123, // Manager U-gov identifier.
        "docenteId": 54321, // Professor identifier.
        "dataInizioVal": "01/01/2020", // Validity start date.
        "dataFineVal": "02/02/2020", // Validity end date.
        "codStruttura": "BO42", // Structure code.
        "desStruttura": "Università degli Studi di BOLOGNA", // Structure description.
        "tipoStruttura": "CDS" // Structure type.
      }
    ], // Cariche (optional)
    "docentiNote": [
      {
        "docenteId": 1, // Professor key
        "noteBiografiche": "note_biografiche", // Professor biographical notes.
        "notePubblicazioni": "note_pubblicazioni", // Professor publication notes.
        "noteCurriculum": "note_curriculum", // Professor academic curriculum notes.
        "noteDocente": "note_docente" // Free notes relative to the professor.
      }
    ], // DocentiNote (optional)
    "docentiRecapiti": [
      {
        "docenteId": 1, // Professor key (required)
        "citt1Cod": "200", // Citizenship code
        "citt1Des": "italiana", // Citizenship description
        "citt1NazioneCod": "IT", // Citizenship nation code
        "citt1Dataini": "10/09/2016", // Citizenship start date
        "citt1Datafin": "10/09/2016", // Citizenship end date
        "citt2Cod": "200", // Citizenship code
        "citt2Des": "italiana", // Citizenship description
        "citt2NazioneCod": "IT", // Citizenship nation code
        "citt2Dataini": "10/09/2016", // Citizenship start date
        "citt2Datafin": "10/09/2016", // Citizenship end date
        "citt3Cod": "200", // Citizenship code
        "citt3Des": "italiana", // Citizenship description
        "citt3NazioneCod": "IT", // Citizenship nation code
        "citt3Dataini": "10/09/2016", // Citizenship start date
        "citt3Datafin": "10/09/2016", // Citizenship end date
        "naziResId": 1, // Residence nation ID
        "comResId": 172, // Residence municipality ID
        "naziResCodFis": "Z112", // Residence nation fiscal code
        "naziResDes": "Germania", // Residence nation description
        "naziResNazioneCod": "FR", // Residence nation code
        "naziResCod": "216", // Residence nation code
        "comuResCodIstat": "698", // Residence municipality ISTAT code
        "comuResComuneCod": "L219", // Residence municipality code
        "comuResCodIstatMiur": "698", // Residence municipality MIUR ISTAT code
        "comuResDes": "Bologna", // Residence municipality description
        "citstraRes": "Paris", // Residence foreign city
        "comuResSigla": "BO", // Residence province abbreviation
        "provResDes": "Bologna", // Residence province description
        "viaRes": "via roma", // Residence street description
        "numCivRes": "3/3", // Residence street number
        "capRes": "40131", // Residence postal code
        "telRes": "10897106", // Residence phone
        "prefixInternazRes": "39", // Residence phone international prefix
        "nazDomId": 172, // Domicile nation ID
        "comDomId": 172, // Domicile municipality ID
        "naziDomCodFisc": "a1b2c3d4", // Domicile nation fiscal code
        "naziDomDes": "Italia", // Domicile nation description
        "naziDomNazioneCod": "1234", // Domicile nation code
        "naziDomCod": "1234", // Domicile nation code
        "comuDomCodIstat": "1234", // Domicile municipality ISTAT code
        "comuDomComuneCod": "1234", // Domicile municipality code
        "comuDomCodIstatMiur": "1243", // Domicile municipality MIUR ISTAT code
        "comuDomDes": "Casalecchio di Reno", // Domicile municipality description
        "citstraDom": "Germania", // Domicile foreign city
        "comuDomSigla": "a1b2c3", // Domicile municipality abbreviation
        "provDomDes": "Bologna", // Domicile province description
        "viaDom": "via magnanelli", // Domicile street
        "numCivDom": "16a", // Domicile street number
        "capDom": "40126", // Domicile postal code
        "telDom": "1234567890", // Domicile phone
        "prefixInternazDom": "39", // Domicile international prefix
        "co": "mario rossi", // Care of
        "fax": "1234567890", // Fax
        "tipoIndirizCod": "1234", // Address type code
        "domComeResFlg": false, // Domicile as residence flag
        "usrInsId": "1243", // Insertion user ID
        "dataIns": "10/12/2022", // Insertion date
        "usrModId": "1234", // Modification user ID
        "dataMod": "10/12/2022" // Modification date
      }
    ], // DocentiRecapiti (optional)
    "docentiAlias": [
      {
        "aliasId": 1234, // Professor alias
        "alias": "alias1234", // Professor alias description
        "dataScadenza": "10/12/2022", // Expiration date
        "usrInsId": "user1234", // Insertion user ID
        "dataIns": "10/12/2022", // Data di inserimento
        "usrModId": "user1234", // Modification user ID
        "dataMod": "10/12/2022", // Data di modifica
        "tipologia": "1243" // Alias type
      }
    ], // DocentiAlias (optional)
    "docentiProfili": [
      {
        "codiceFiscale": "GGGTTT81XA944H", // User fiscal code
        "userId": "1234", // Unique ID that identifies the user account
        "grpName": "Administrator", // User group description
        "profiloExtCod": "1", // ProfiloExtCod
        "profiloExtDes": "1234", // ProfiloExtDes
        "profiloDesExt": "1" // ProfiloDesExt
      }
    ] // DocentiProfili (optional)
  }
]
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /docenti/{docenteId}` - Retrieve professor details

```java
/**
 * Retrieves information about the professor; optionally it is possible to retrieve
 * schedules.
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @param fields               string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @return List<DocentiNew> on success
 */
GET /docenti/{docenteId}
```

**Auth:** `UserTecnicoMassivo`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "docenteId": 1, // Professor key
    "docenteMatricola": "MAT1234", // Professor registration number
    "docenteCognome": "ROSSI", // Professor surname
    "docenteNome": "PAOLO", // Professor name
    "userId": "userID", // Active UserId linked to the professor
    "settCod": "MAT/01", // Professor sector
    "badge": "B90887", // Badge number
    "eMail": "pr@pers.it", // Professor email
    "emailAte": "mrossi@ateneo.it", // Email address assigned by the university.
    "emailDocenteLa": "pr@ateneola.it", // Reference email for L.A. professors.
    "facId": 1, // Professor's affiliation structure ID
    "facCod": "facCod", // Professor's affiliation structure code
    "facDes": "facDes", // Professor's affiliation structure description
    "ruoloDocCod": "ORD", // Professor role
    "codFis": "LNZFCR67R07A944E", // Professor fiscal code
    "cellulare": "3471234562", // Professor mobile phone
    "hyperlink": "www.paolorossi.it", // Professor hyperlink
    "dataIniAtt": "15/10/2015", // Professor activity start date. Format: DD/MM/YYYY
    "dataFinAtt": "15/10/2015", // Professor activity end date. Format: DD/MM/YYYY
    "sesso": "F,M", // Professor gender
    "dataNascita": "15/10/1970", // Professor birth date. Format: DD/MM/YYYY
    "p01NaziCodFisc": "Z112", // Birth nation fiscal code
    "p01NaziDes": "Francia", // Birth nation description
    "p01NaziNazioneCod": "FR", // Birth nation ISO code
    "p01NaziCod": "215", // Birth nation code
    "p01ComuComuneId": 1, // Birth municipality ID
    "p01ComuCodIstat": "698", // Birth municipality ISTAT code
    "p01ComuComuneCod": "L219", // Birth municipality code
    "p01ComuCodIstatMiur": "698", // Birth municipality MIUR ISTAT code
    "comuNascDes": "Milano", // Birth municipality description
    "citstraNasc": "Paris", // Birth foreign city
    "comuNascSigla": "BO", // Birth province abbreviation
    "p01ProvDes": "Bologna", // Birth province description
    "notePubblicazioni": "note pubblicazioni", // Publication notes
    "noteBiografiche": "note biografiche", // Biographical notes
    "noteCurriculum": "note curriculum", // Curriculum notes
    "noteDocente": "note docente", // Professor notes
    "idAb": 1, // Professor AB ID
    "dataModDoc": "15/10/1970", // Professor modification date. Format: DD/MM/YYYY
    "dataMod": "15/10/1970", // Professor modification date. Format: DD/MM/YYYY
    "dataIns": "15/10/1970", // Professor insertion date. Format: DD/MM/YYYY
    "settDes": "BIOLOGIA APPLICATA", // Sector description
    "dipId": 123, // Department identifier
    "dipCod": "A234", // Department code
    "dipDes": "Dipartimento di Biologia", // Department description
    "ruoloDocDes": "Ricercatore", // Professor role description
    "profilo": "0", // Professor profile
    "docenteAppellativo": "Professor", // Professor title
    "dataIniRuolo": "15/10/1970", // Current professor role start date. Format: DD/MM/YYYY
    "orario": [
      {
        "docenteOrarioId": 1, // Professor schedule key (required)
        "docenteId": 1, // Professor key (required)
        "giorno": "1,2,3,4,5,6,7", // Day of the week
        "giornoDes": "Lunedì", // Day of the week
        "oraInizio": "08:30", // Appointment start time.
        "oraFine": "08:30", // Appointment end time.
        "desLuogo": "aula 20", // Appointment location
        "nota": "nota" // Note linked to the appointment
      }
    ], // Orario (optional)
    "cariche": [
      {
        "struttId": 321, // Structure identifier.
        "caricaId": 12345, // Role identifier.
        "caricaDes": "Direttore", // Role description.
        "caricaCognome": "Mario", // Manager surname.
        "caricaNome": "Rossi", // Manager name.
        "caricaIdAb": 123123, // Manager U-gov identifier.
        "docenteId": 54321, // Professor identifier.
        "dataInizioVal": "01/01/2020", // Validity start date.
        "dataFineVal": "02/02/2020", // Validity end date.
        "codStruttura": "BO42", // Structure code.
        "desStruttura": "Università degli Studi di BOLOGNA", // Structure description.
        "tipoStruttura": "CDS" // Structure type.
      }
    ], // Cariche (optional)
    "docentiNote": [
      {
        "docenteId": 1, // Professor key
        "noteBiografiche": "note_biografiche", // Professor biographical notes.
        "notePubblicazioni": "note_pubblicazioni", // Professor publication notes.
        "noteCurriculum": "note_curriculum", // Professor academic curriculum notes.
        "noteDocente": "note_docente" // Free notes relative to the professor.
      }
    ], // DocentiNote (optional)
    "docentiRecapiti": [
      {
        "docenteId": 1, // Professor key (required)
        "citt1Cod": "200", // Citizenship code
        "citt1Des": "italiana", // Citizenship description
        "citt1NazioneCod": "IT", // Citizenship nation code
        "citt1Dataini": "10/09/2016", // Citizenship start date
        "citt1Datafin": "10/09/2016", // Citizenship end date
        "citt2Cod": "200", // Citizenship code
        "citt2Des": "italiana", // Citizenship description
        "citt2NazioneCod": "IT", // Citizenship nation code
        "citt2Dataini": "10/09/2016", // Citizenship start date
        "citt2Datafin": "10/09/2016", // Citizenship end date
        "citt3Cod": "200", // Citizenship code
        "citt3Des": "italiana", // Citizenship description
        "citt3NazioneCod": "IT", // Citizenship nation code
        "citt3Dataini": "10/09/2016", // Citizenship start date
        "citt3Datafin": "10/09/2016", // Citizenship end date
        "naziResId": 1, // Residence nation ID
        "comResId": 172, // Residence municipality ID
        "naziResCodFis": "Z112", // Residence nation fiscal code
        "naziResDes": "Germania", // Residence nation description
        "naziResNazioneCod": "FR", // Residence nation code
        "naziResCod": "216", // Residence nation code
        "comuResCodIstat": "698", // Residence municipality ISTAT code
        "comuResComuneCod": "L219", // Residence municipality code
        "comuResCodIstatMiur": "698", // Residence municipality MIUR ISTAT code
        "comuResDes": "Bologna", // Residence municipality description
        "citstraRes": "Paris", // Residence foreign city
        "comuResSigla": "BO", // Residence province abbreviation
        "provResDes": "Bologna", // Residence province description
        "viaRes": "via roma", // Residence street description
        "numCivRes": "3/3", // Residence street number
        "capRes": "40131", // Residence postal code
        "telRes": "10897106", // Residence phone
        "prefixInternazRes": "39", // Residence phone international prefix
        "nazDomId": 172, // Domicile nation ID
        "comDomId": 172, // Domicile municipality ID
        "naziDomCodFisc": "a1b2c3d4", // Domicile nation fiscal code
        "naziDomDes": "Italia", // Domicile nation description
        "naziDomNazioneCod": "1234", // Domicile nation code
        "naziDomCod": "1234", // Domicile nation code
        "comuDomCodIstat": "1234", // Domicile municipality ISTAT code
        "comuDomComuneCod": "1234", // Domicile municipality code
        "comuDomCodIstatMiur": "1243", // Domicile municipality MIUR ISTAT code
        "comuDomDes": "Casalecchio di Reno", // Domicile municipality description
        "citstraDom": "Germania", // Domicile foreign city
        "comuDomSigla": "a1b2c3", // Domicile municipality abbreviation
        "provDomDes": "Bologna", // Domicile province description
        "viaDom": "via magnanelli", // Domicile street
        "numCivDom": "16a", // Domicile street number
        "capDom": "40126", // Domicile postal code
        "telDom": "1234567890", // Domicile phone
        "prefixInternazDom": "39", // Domicile international prefix
        "co": "mario rossi", // Care of
        "fax": "1234567890", // Fax
        "tipoIndirizCod": "1234", // Address type code
        "domComeResFlg": false, // Domicile as residence flag
        "usrInsId": "1243", // Insertion user ID
        "dataIns": "10/12/2022", // Insertion date
        "usrModId": "1234", // Modification user ID
        "dataMod": "10/12/2022" // Modification date
      }
    ], // DocentiRecapiti (optional)
    "docentiAlias": [
      {
        "aliasId": 1234, // Professor alias
        "alias": "alias1234", // Professor alias description
        "dataScadenza": "10/12/2022", // Expiration date
        "usrInsId": "user1234", // Insertion user ID
        "dataIns": "10/12/2022", // Data di inserimento
        "usrModId": "user1234", // Modification user ID
        "dataMod": "10/12/2022", // Data di modifica
        "tipologia": "1243" // Alias type
      }
    ], // DocentiAlias (optional)
    "docentiProfili": [
      {
        "codiceFiscale": "GGGTTT81XA944H", // User fiscal code
        "userId": "1234", // Unique ID that identifies the user account
        "grpName": "Administrator", // User group description
        "profiloExtCod": "1", // ProfiloExtCod
        "profiloExtDes": "1234", // ProfiloExtDes
        "profiloDesExt": "1" // ProfiloDesExt
      }
    ] // DocentiProfili (optional)
  }
]
```

<br>

---

<br>

### `PATCH /docenti/{docenteId}` - Update professor email

```java
/**
 * Allows modifying the professor's email. If the input structure field
 * is not set to null or not passed, it will not be passed.
 * To set fields to null, pass special values defined in the following list:
 * Strings: #!N!#, Numerics: -2.147.483.649, Dates: 01/01/1970
 * Return Codes: -1 | Generic Error, 1 | Correct Execution
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @param optionalFields       string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param body                 ParametriDocente (body, required)   - Object with fields to modify
 * @return List<DocentiNew> on success,
 *         DettaglioErrore on failure
 */
PATCH /docenti/{docenteId}
```

**Auth:** `UTENTE_TECNICO`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "email": "mia@mail.com" // Email
}
```

#### Response

**`200 OK`**

```json
[
  {
    "docenteId": 1, // Professor key
    "docenteMatricola": "MAT1234", // Professor registration number
    "docenteCognome": "ROSSI", // Professor surname
    "docenteNome": "PAOLO", // Professor name
    "userId": "userID", // Active UserId linked to the professor
    "settCod": "MAT/01", // Professor sector
    "badge": "B90887", // Badge number
    "eMail": "pr@pers.it", // Professor email
    "emailAte": "mrossi@ateneo.it", // Email address assigned by the university.
    "emailDocenteLa": "pr@ateneola.it", // Reference email for L.A. professors.
    "facId": 1, // Professor's affiliation structure ID
    "facCod": "facCod", // Professor's affiliation structure code
    "facDes": "facDes", // Professor's affiliation structure description
    "ruoloDocCod": "ORD", // Professor role
    "codFis": "LNZFCR67R07A944E", // Professor fiscal code
    "cellulare": "3471234562", // Professor mobile phone
    "hyperlink": "www.paolorossi.it", // Professor hyperlink
    "dataIniAtt": "15/10/2015", // Professor activity start date. Format: DD/MM/YYYY
    "dataFinAtt": "15/10/2015", // Professor activity end date. Format: DD/MM/YYYY
    "sesso": "F,M", // Professor gender
    "dataNascita": "15/10/1970", // Professor birth date. Format: DD/MM/YYYY
    "p01NaziCodFisc": "Z112", // Birth nation fiscal code
    "p01NaziDes": "Francia", // Birth nation description
    "p01NaziNazioneCod": "FR", // Birth nation ISO code
    "p01NaziCod": "215", // Birth nation code
    "p01ComuComuneId": 1, // Birth municipality ID
    "p01ComuCodIstat": "698", // Birth municipality ISTAT code
    "p01ComuComuneCod": "L219", // Birth municipality code
    "p01ComuCodIstatMiur": "698", // Birth municipality MIUR ISTAT code
    "comuNascDes": "Milano", // Birth municipality description
    "citstraNasc": "Paris", // Birth foreign city
    "comuNascSigla": "BO", // Birth province abbreviation
    "p01ProvDes": "Bologna", // Birth province description
    "notePubblicazioni": "note pubblicazioni", // Publication notes
    "noteBiografiche": "note biografiche", // Biographical notes
    "noteCurriculum": "note curriculum", // Curriculum notes
    "noteDocente": "note docente", // Professor notes
    "idAb": 1, // Professor AB ID
    "dataModDoc": "15/10/1970", // Professor modification date. Format: DD/MM/YYYY
    "dataMod": "15/10/1970", // Professor modification date. Format: DD/MM/YYYY
    "dataIns": "15/10/1970", // Professor insertion date. Format: DD/MM/YYYY
    "settDes": "BIOLOGIA APPLICATA", // Sector description
    "dipId": 123, // Department identifier
    "dipCod": "A234", // Department code
    "dipDes": "Dipartimento di Biologia", // Department description
    "ruoloDocDes": "Ricercatore", // Professor role description
    "profilo": "0", // Professor profile
    "docenteAppellativo": "Professor", // Professor title
    "dataIniRuolo": "15/10/1970", // Current professor role start date. Format: DD/MM/YYYY
    "orario": [
      {
        "docenteOrarioId": 1, // Professor schedule key (required)
        "docenteId": 1, // Professor key (required)
        "giorno": "1,2,3,4,5,6,7", // Day of the week
        "giornoDes": "Lunedì", // Day of the week
        "oraInizio": "08:30", // Appointment start time.
        "oraFine": "08:30", // Appointment end time.
        "desLuogo": "aula 20", // Appointment location
        "nota": "nota" // Note linked to the appointment
      }
    ], // Orario (optional)
    "cariche": [
      {
        "struttId": 321, // Structure identifier.
        "caricaId": 12345, // Role identifier.
        "caricaDes": "Direttore", // Role description.
        "caricaCognome": "Mario", // Manager surname.
        "caricaNome": "Rossi", // Manager name.
        "caricaIdAb": 123123, // Manager U-gov identifier.
        "docenteId": 54321, // Professor identifier.
        "dataInizioVal": "01/01/2020", // Validity start date.
        "dataFineVal": "02/02/2020", // Validity end date.
        "codStruttura": "BO42", // Structure code.
        "desStruttura": "Università degli Studi di BOLOGNA", // Structure description.
        "tipoStruttura": "CDS" // Structure type.
      }
    ], // Cariche (optional)
    "docentiNote": [
      {
        "docenteId": 1, // Professor key
        "noteBiografiche": "note_biografiche", // Professor biographical notes.
        "notePubblicazioni": "note_pubblicazioni", // Professor publication notes.
        "noteCurriculum": "note_curriculum", // Professor academic curriculum notes.
        "noteDocente": "note_docente" // Free notes relative to the professor.
      }
    ], // DocentiNote (optional)
    "docentiRecapiti": [
      {
        "docenteId": 1, // Professor key (required)
        "citt1Cod": "200", // Citizenship code
        "citt1Des": "italiana", // Citizenship description
        "citt1NazioneCod": "IT", // Citizenship nation code
        "citt1Dataini": "10/09/2016", // Citizenship start date
        "citt1Datafin": "10/09/2016", // Citizenship end date
        "citt2Cod": "200", // Citizenship code
        "citt2Des": "italiana", // Citizenship description
        "citt2NazioneCod": "IT", // Citizenship nation code
        "citt2Dataini": "10/09/2016", // Citizenship start date
        "citt2Datafin": "10/09/2016", // Citizenship end date
        "citt3Cod": "200", // Citizenship code
        "citt3Des": "italiana", // Citizenship description
        "citt3NazioneCod": "IT", // Citizenship nation code
        "citt3Dataini": "10/09/2016", // Citizenship start date
        "citt3Datafin": "10/09/2016", // Citizenship end date
        "naziResId": 1, // Residence nation ID
        "comResId": 172, // Residence municipality ID
        "naziResCodFis": "Z112", // Residence nation fiscal code
        "naziResDes": "Germania", // Residence nation description
        "naziResNazioneCod": "FR", // Residence nation code
        "naziResCod": "216", // Residence nation code
        "comuResCodIstat": "698", // Residence municipality ISTAT code
        "comuResComuneCod": "L219", // Residence municipality code
        "comuResCodIstatMiur": "698", // Residence municipality MIUR ISTAT code
        "comuResDes": "Bologna", // Residence municipality description
        "citstraRes": "Paris", // Residence foreign city
        "comuResSigla": "BO", // Residence province abbreviation
        "provResDes": "Bologna", // Residence province description
        "viaRes": "via roma", // Residence street description
        "numCivRes": "3/3", // Residence street number
        "capRes": "40131", // Residence postal code
        "telRes": "10897106", // Residence phone
        "prefixInternazRes": "39", // Residence phone international prefix
        "nazDomId": 172, // Domicile nation ID
        "comDomId": 172, // Domicile municipality ID
        "naziDomCodFisc": "a1b2c3d4", // Domicile nation fiscal code
        "naziDomDes": "Italia", // Domicile nation description
        "naziDomNazioneCod": "1234", // Domicile nation code
        "naziDomCod": "1234", // Domicile nation code
        "comuDomCodIstat": "1234", // Domicile municipality ISTAT code
        "comuDomComuneCod": "1234", // Domicile municipality code
        "comuDomCodIstatMiur": "1243", // Domicile municipality MIUR ISTAT code
        "comuDomDes": "Casalecchio di Reno", // Domicile municipality description
        "citstraDom": "Germania", // Domicile foreign city
        "comuDomSigla": "a1b2c3", // Domicile municipality abbreviation
        "provDomDes": "Bologna", // Domicile province description
        "viaDom": "via magnanelli", // Domicile street
        "numCivDom": "16a", // Domicile street number
        "capDom": "40126", // Domicile postal code
        "telDom": "1234567890", // Domicile phone
        "prefixInternazDom": "39", // Domicile international prefix
        "co": "mario rossi", // Care of
        "fax": "1234567890", // Fax
        "tipoIndirizCod": "1234", // Address type code
        "domComeResFlg": false, // Domicile as residence flag
        "usrInsId": "1243", // Insertion user ID
        "dataIns": "10/12/2022", // Insertion date
        "usrModId": "1234", // Modification user ID
        "dataMod": "10/12/2022" // Modification date
      }
    ], // DocentiRecapiti (optional)
    "docentiAlias": [
      {
        "aliasId": 1234, // Professor alias
        "alias": "alias1234", // Professor alias description
        "dataScadenza": "10/12/2022", // Expiration date
        "usrInsId": "user1234", // Insertion user ID
        "dataIns": "10/12/2022", // Data di inserimento
        "usrModId": "user1234", // Modification user ID
        "dataMod": "10/12/2022", // Data di modifica
        "tipologia": "1243" // Alias type
      }
    ], // DocentiAlias (optional)
    "docentiProfili": [
      {
        "codiceFiscale": "GGGTTT81XA944H", // User fiscal code
        "userId": "1234", // Unique ID that identifies the user account
        "grpName": "Administrator", // User group description
        "profiloExtCod": "1", // ProfiloExtCod
        "profiloExtDes": "1234", // ProfiloExtDes
        "profiloDesExt": "1" // ProfiloDesExt
      }
    ] // DocentiProfili (optional)
  }
]
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `GET /docenti/{docenteId}/note` - Retrieve notes associated with a professor

```java
/**
 * Retrieves notes associated with a professor.
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @return DocentiNote on success
 */
GET /docenti/{docenteId}/note
```

**Auth:** `UTENTE_TECNICO`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
{
  "docenteId": 1, // Professor key
  "noteBiografiche": "note_biografiche", // Professor biographical notes.
  "notePubblicazioni": "note_pubblicazioni", // Professor publication notes.
  "noteCurriculum": "note_curriculum", // Professor academic curriculum notes.
  "noteDocente": "note_docente" // Free notes relative to the professor.
}
```

<br>

---

<br>

### `PUT /docenti/{docenteId}/note` - Insert or update notes associated with a professor

```java
/**
 * The service inserts or updates the notes of the professor identified by
 * the 'docenteId' parameter. If a body field is not passed or is set to null,
 * the service will NOT modify that field.
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @param body                 PutNoteDocente (body, required)     - Object with fields to modify
 * @return DocentiNote on success,
 *         DettaglioErrore on failure
 */
PUT /docenti/{docenteId}/note
```

**Auth:** `UTENTE_TECNICO`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Request body

```json
{
  "noteBiografiche": "note_biografiche", // Professor biographical notes.
  "notePubblicazioni": "note_pubblicazioni", // Professor publication notes.
  "noteCurriculum": "note_curriculum", // Professor academic curriculum notes.
  "noteDocente": "note_docente" // Free notes relative to the professor.
}
```

#### Response

**`200 OK`**

```json
{
  "docenteId": 1, // Professor key
  "noteBiografiche": "note_biografiche", // Professor biographical notes.
  "notePubblicazioni": "note_pubblicazioni", // Professor publication notes.
  "noteCurriculum": "note_curriculum", // Professor academic curriculum notes.
  "noteDocente": "note_docente" // Free notes relative to the professor.
}
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

## Endpoints - Roles (Ruoli)

### `GET /docenti/ruoli` - Retrieve professor roles

```java
/**
 * Provides the professor roles configured on esse3.
 *
 * @param ruoloDocCod          string (query, optional)            - Professor role code.
 * @param csaCod               string (query, optional)            - CSA code.
 * @param tipoRuoloDocCod      object (query, optional)            - Professor role type code.
 * @param fields               string (query, optional)            - Specifies the list of optional fields (not retrieved by default)
 * @param order                string (query, optional)            - Allows specifying an order for retrieving records. Syntax is * +/- : s...
 * @param start                integer (query, optional)           - Used with `limit` for record pagination
 * @param limit                integer (query, optional)           - Used with `start` for record pagination, `limit` indicates the number of...
 * @return List<RuoloDocente> on success
 */
GET /docenti/ruoli
```

**Auth:** `UTENTE_TECNICO` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "ruoloDocCod": "E", // Professor role code.
    "ruoloDocDes": "Esterno", // Description of professor role code.
    "tipoRuoloDocCod": "EST", // Professor role type code.
    "tipoRuoliDocDes": "Docente Esterno", // Description of professor role type code.
    "csaCod": "CL", // CSA code.
    "ruoloDoc": "LC" // Professor role.
  }
]
```

<br>

---

<br>

## Endpoints - Schedules (Orari)

### `GET /docenti/{docenteId}/orario` - Retrieve schedules associated with a professor

```java
/**
 * Retrieves schedules associated with a professor. Schedules can be filtered
 * by day.
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @param giorno               integer (query, optional)           - Day of the week (1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday)
 * @return List<DocentiOrario> on success
 */
GET /docenti/{docenteId}/orario
```

**Auth:** `UTENTE_TECNICO`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** lowRefreshRateUserIndependent

#### Response

**`200 OK`**

```json
[
  {
    "docenteOrarioId": 1, // Professor schedule key (required)
    "docenteId": 1, // Professor key (required)
    "giorno": "1,2,3,4,5,6,7", // Day of the week
    "giornoDes": "Lunedì", // Day of the week
    "oraInizio": "08:30", // Appointment start time.
    "oraFine": "08:30", // Appointment end time.
    "desLuogo": "aula 20", // Appointment location
    "nota": "nota" // Note linked to the appointment
  }
]
```

<br>

---

<br>

### `POST /docenti/{docenteId}/orario` - Insert schedules associated with a professor

```java
/**
 * The service inserts the schedules of the professor identified by
 * the 'docenteId' parameter. It is possible to specify a list of schedules
 * to insert. Note that if one schedule in the list is incorrect, no
 * schedule will be inserted. If successful, the service returns ALL
 * schedules for the professor (not just the newly created ones).
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @param body                 object (body, required)             - Object with fields to insert
 * @return List<DocentiOrario> on success,
 *         DettaglioErrore on failure
 */
POST /docenti/{docenteId}/orario
```

**Auth:** `UTENTE_TECNICO`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
[
  {
    "giorno": 1, // Day of the week (required)
    "oraInizio": "08:30", // Appointment start time (required)
    "oraFine": "08:30", // Appointment end time (required)
    "desLuogo": "aula 20", // Appointment location
    "nota": "nota" // Note linked to the appointment
  }
]
```

#### Response

**`201 Created` - Update succeded**

```json
[
  {
    "docenteOrarioId": 1, // Professor schedule key (required)
    "docenteId": 1, // Professor key (required)
    "giorno": "1,2,3,4,5,6,7", // Day of the week
    "giornoDes": "Lunedì", // Day of the week
    "oraInizio": "08:30", // Appointment start time.
    "oraFine": "08:30", // Appointment end time.
    "desLuogo": "aula 20", // Appointment location
    "nota": "nota" // Note linked to the appointment
  }
]
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `PUT /docenti/{docenteId}/orario` - Update schedules associated with a professor

```java
/**
 * The service updates the schedules of the professor identified by
 * the 'docenteId' parameter. Only one record can be updated at a time.
 * If multiple schedules are found with the given parameters, no schedule
 * will be updated. The record to update can be identified by
 * docenteOrarioRicId, or by day, startTime, and endTime, or all of these.
 * If successful, the service returns ALL schedules for the professor.
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @param giorno               integer (query, optional)           - Day of the week (1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday)
 * @param docenteOrarioRicId   integer (query, optional)           - Professor reception schedule ID
 * @param oraInizio            string (query, optional)            - Reception start time
 * @param oraFine              string (query, optional)            - Reception end time
 * @param body                 PostOrarioDocente (body, required)  - Object with fields to insert
 * @return List<DocentiOrario> on success,
 *         DettaglioErrore on failure
 */
PUT /docenti/{docenteId}/orario
```

**Auth:** `UTENTE_TECNICO`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Request body

```json
{
  "giorno": 1, // Day of the week (required)
  "oraInizio": "08:30", // Appointment start time (required)
  "oraFine": "08:30", // Appointment end time (required)
  "desLuogo": "aula 20", // Appointment location
  "nota": "nota" // Note linked to the appointment
}
```

#### Response

**`200 OK`**

```json
[
  {
    "docenteOrarioId": 1, // Professor schedule key (required)
    "docenteId": 1, // Professor key (required)
    "giorno": "1,2,3,4,5,6,7", // Day of the week
    "giornoDes": "Lunedì", // Day of the week
    "oraInizio": "08:30", // Appointment start time.
    "oraFine": "08:30", // Appointment end time.
    "desLuogo": "aula 20", // Appointment location
    "nota": "nota" // Note linked to the appointment
  }
]
```

**`422 Unprocessable Entity` - Update failed**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

### `DELETE /docenti/{docenteId}/orario` - Delete schedules associated with a professor

```java
/**
 * Deletes schedules associated with the professor identified by 'docenteId'.
 * If the day is not specified, all schedules are deleted.
 *
 * @param docenteId            integer (path, required)            - Professor ID
 * @param giorno               integer (query, optional)           - Day of the week (1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday)
 * @param docenteOrarioRicId   integer (query, optional)           - Professor reception schedule ID
 * @param oraInizio            string (query, optional)            - Reception start time
 * @param oraFine              string (query, optional)            - Reception end time
 * @return 204 Delete succeded,
 *         DettaglioErrore on failure
 */
DELETE /docenti/{docenteId}/orario
```

**Auth:** `UTENTE_TECNICO`, `DOCENTE` required · Supported: `Basic`, `JWT`

**Cache:** none

#### Response

**`204 No Content` - Delete succeded**

**`422 Unprocessable Entity` - Invalid parameters**

```json
{
  "statusCode": 200, // Http Status Code
  "retCode": -1, // Error code
  "retErrMsg": "Parametri non corretti", // Error description
  "errDetails": [
    {
      "errorType": "stackTrace", // Additional error type description
      "value": "SocketTimeoutException....", // Error description
      "rawValue": "SocketTimeoutException...." // Error description
    }
  ] // ErrDetails
}
```

<br>

---

<br>

---

## References

- **Swagger UI:** [Docenti Api V1 - ESSE3 REST Docs](<https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Docenti%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fdocenti-service-v1)>)
- **Spec YAML:** [anag-docentiApiV1.yaml](https://unimol.esse3.cineca.it/e3rest/docs/?urls.primaryName=Docenti%20Api%20V1%20(https%3A%2F%2Funimol.esse3.cineca.it%2Fe3rest%2Fapi%2Fdocenti-service-v1))
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)