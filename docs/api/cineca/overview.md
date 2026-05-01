---
title: Cineca / ESSE3 Overview | OhMyUniversity!
description: Overview of Cineca and the ESSE3 Student Management System, with the full list of Italian universities currently running ESSE3.
head:
  - - meta
    - property: og:title
      content: Cineca / ESSE3 Overview | OhMyUniversity!
  - - meta
    - property: og:description
      content: Overview of Cineca and the ESSE3 Student Management System, with the full list of Italian universities currently running ESSE3.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/overview
  - - meta
    - name: keywords
      content: cineca, esse3, student management system, university api, italian universities, esse3 atenei, cineca esse3 overview, ohmyuniversity cineca
  - - meta
    - name: twitter:title
      content: Cineca / ESSE3 Overview | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Overview of Cineca and the ESSE3 Student Management System, with the full list of Italian universities currently running ESSE3.
---

# OhMyUniversity! - Cineca / ESSE3: Overview

This section documents the REST APIs exposed by universities running the **CINECA ESSE3** platform. Each subsection is specific to a university instance and covers its available endpoints, authentication methods, and integration details.

---

## What is CINECA?

**CINECA** is a non-profit consortium of 102 Italian institutions, including universities, national research bodies, and the Ministries of University and Education. It is the largest Italian computing centre and one of the most significant in Europe, operating in high-performance scientific computing, network infrastructure, and complex information systems for the academic and public administration sectors.

In the university domain, CINECA develops and maintains the core software suite used by the majority of Italian universities for academic management, student services, and compliance with national reporting requirements (e.g. the Anagrafe Nazionale Studenti - ANS).

- **Website:** [cineca.it](https://www.cineca.it)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)

---

## What is ESSE3?

**ESSE3** is CINECA's Student Management System (SMS), used by approximately 80% of Italian universities. It covers the full student lifecycle - from pre-enrollment to graduation - across all three Bologna Process cycles (Bachelor's, Master's, Doctorate).

Its main functional areas are:

- **Student Registry** - enrollment, personal data, career segments, transfers, withdrawals
- **Academic Offer** - course catalog, teaching offer, study plans, curricula
- **Exams & Grades** - exam booking, grade recording, official transcripts
- **Fees & Payments** - tuition management, payment flows, regional scholarship integration
- **Internships & Mobility** - internship tracking, Erasmus, learning agreements
- **Reporting & Compliance** - ANS data submissions, MIUR statistical reporting

ESSE3 is deployed either as a **hosted** service (managed by CINECA on its infrastructure) or **in-house** (installed and managed directly by the university). Both deployments expose the same REST API surface, accessible at:

```
https://{university-code}.esse3.cineca.it/e3rest/docs/
```

---

## Universities running ESSE3

The table below lists the Italian universities and institutions known to be running ESSE3, based on the official CINECA registry. The **ESSE3 Portal** column links to each institution's public-facing portal. The **REST API base URL** follows the standard pattern and can be used to access the e3rest API layer.

::: info
**Note:** This list reflects the state as of November 2020 (74 active institutions per CINECA). Some entries may have changed since then. Always verify against the institution's official documentation.
:::

| Institution                                                 | Code          | Deployment | ESSE3 Portal                                                           | REST API Base URL                                    |
| ----------------------------------------------------------- | ------------- | ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------- |
| Humanitas University (Milano)                               | HUMANITAS     | Hosting    | [humanitas.esse3.cineca.it](https://humanitas.esse3.cineca.it)         | `https://humanitas.esse3.cineca.it/e3rest/docs/`     |
| Scuola IMT Alti Studi Lucca                                 | IMTLUCCA      | Hosting    | [imtlucca.esse3.cineca.it](https://imtlucca.esse3.cineca.it)           | `https://imtlucca.esse3.cineca.it/e3rest/docs/`      |
| Università IUAV di Venezia                                  | IUAV          | Hosting    | [iuav.esse3.cineca.it](https://iuav.esse3.cineca.it)                   | `https://iuav.esse3.cineca.it/e3rest/docs/`          |
| Università IULM (Milano)                                    | IULM          | Hosting    | [iulm.esse3.cineca.it](https://iulm.esse3.cineca.it)                   | `https://iulm.esse3.cineca.it/e3rest/docs/`          |
| Università "L'Orientale" di Napoli                          | UNIOR         | Hosting    | [unior.esse3.cineca.it](https://unior.esse3.cineca.it)                 | `https://unior.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Roma "Foro Italico"               | IUSM          | Hosting    | [iusm.esse3.cineca.it](https://iusm.esse3.cineca.it)                   | `https://iusm.esse3.cineca.it/e3rest/docs/`          |
| Scuola Universitaria Superiore IUSS Pavia                   | IUSSPAVIA     | Hosting    | [iusspavia.esse3.cineca.it](https://iusspavia.esse3.cineca.it)         | `https://iusspavia.esse3.cineca.it/e3rest/docs/`     |
| Università Carlo Cattaneo – LIUC                            | LIUC          | In-house   | [liuc.esse3.cineca.it](https://liuc.esse3.cineca.it)                   | `https://liuc.esse3.cineca.it/e3rest/docs/`          |
| LUISS Guido Carli                                           | LUISS         | Hosting    | [luiss.esse3.cineca.it](https://luiss.esse3.cineca.it)                 | `https://luiss.esse3.cineca.it/e3rest/docs/`         |
| Scuola Superiore Sant'Anna di Pisa                          | SSSUP         | Hosting    | [sssup.esse3.cineca.it](https://sssup.esse3.cineca.it)                 | `https://sssup.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Bari                              | UNIBA         | In-house   | [uniba.esse3.cineca.it](https://uniba.esse3.cineca.it)                 | `https://uniba.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi della Basilicata                     | UNIBAS        | Hosting    | [unibas.esse3.cineca.it](https://unibas.esse3.cineca.it)               | `https://unibas.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi di Bergamo                           | UNIBG         | In-house   | [unibg.esse3.cineca.it](https://unibg.esse3.cineca.it)                 | `https://unibg.esse3.cineca.it/e3rest/docs/`         |
| Università Luigi Bocconi                                    | UNIBOCCONI    | In-house   | [unibocconi.esse3.cineca.it](https://unibocconi.esse3.cineca.it)       | `https://unibocconi.esse3.cineca.it/e3rest/docs/`    |
| Università degli Studi di Brescia                           | UNIBS         | Hosting    | [unibs.esse3.cineca.it](https://unibs.esse3.cineca.it)                 | `https://unibs.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Cagliari                          | UNICA         | Hosting    | [unica.esse3.cineca.it](https://unica.esse3.cineca.it)                 | `https://unica.esse3.cineca.it/e3rest/docs/`         |
| Università della Calabria                                   | UNICAL        | Hosting    | [unical.esse3.cineca.it](https://unical.esse3.cineca.it)               | `https://unical.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi di Camerino                          | UNICAM        | Hosting    | [unicam.esse3.cineca.it](https://unicam.esse3.cineca.it)               | `https://unicam.esse3.cineca.it/e3rest/docs/`        |
| Università Campus Bio-Medico di Roma                        | UNICAMPUS     | In-house   | [unicampus.esse3.cineca.it](https://unicampus.esse3.cineca.it)         | `https://unicampus.esse3.cineca.it/e3rest/docs/`     |
| Università Cattolica del Sacro Cuore                        | UNICATT       | In-house   | [unicatt.esse3.cineca.it](https://unicatt.esse3.cineca.it)             | `https://unicatt.esse3.cineca.it/e3rest/docs/`       |
| Università degli Studi "G. d'Annunzio" Chieti-Pescara       | UNICH         | Hosting    | [unich.esse3.cineca.it](https://unich.esse3.cineca.it)                 | `https://unich.esse3.cineca.it/e3rest/docs/`         |
| Università di Catanzaro "Magna Graecia"                     | UNICZ         | Hosting    | [unicz.esse3.cineca.it](https://unicz.esse3.cineca.it)                 | `https://unicz.esse3.cineca.it/e3rest/docs/`         |
| Università Telematica Leonardo da Vinci – Chieti            | UNIDAV        | Hosting    | [unidav.esse3.cineca.it](https://unidav.esse3.cineca.it)               | `https://unidav.esse3.cineca.it/e3rest/docs/`        |
| Università Telematica eCampus                               | UNIECAMPUS    | In-house   | [uniecampus.esse3.cineca.it](https://uniecampus.esse3.cineca.it)       | `https://uniecampus.esse3.cineca.it/e3rest/docs/`    |
| Università Europea di Roma                                  | UNIER         | Hosting    | [unier.esse3.cineca.it](https://unier.esse3.cineca.it)                 | `https://unier.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Ferrara                           | UNIFE         | Hosting    | [unife.esse3.cineca.it](https://unife.esse3.cineca.it)                 | `https://unife.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Foggia                            | UNIFG         | Hosting    | [unifg.esse3.cineca.it](https://unifg.esse3.cineca.it)                 | `https://unifg.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Firenze                           | UNIFI         | Hosting    | [unifi.esse3.cineca.it](https://unifi.esse3.cineca.it)                 | `https://unifi.esse3.cineca.it/e3rest/docs/`         |
| IRCCS Ospedale San Raffaele Milano                          | UNIHSR        | Hosting    | [unihsr.esse3.cineca.it](https://unihsr.esse3.cineca.it)               | `https://unihsr.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi di Enna – KORE                       | UNIKORE       | Hosting    | [unikore.esse3.cineca.it](https://unikore.esse3.cineca.it)             | `https://unikore.esse3.cineca.it/e3rest/docs/`       |
| Università degli Studi dell'Insubria                        | UNINSUBRIA    | Hosting    | [uninsubria.esse3.cineca.it](https://uninsubria.esse3.cineca.it)       | `https://uninsubria.esse3.cineca.it/e3rest/docs/`    |
| Università degli Studi di Macerata                          | UNIMC         | Hosting    | [unimc.esse3.cineca.it](https://unimc.esse3.cineca.it)                 | `https://unimc.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Messina                           | UNIME         | Hosting    | [unime.esse3.cineca.it](https://unime.esse3.cineca.it)                 | `https://unime.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Milano                            | UNIMI         | In-house   | [unimi.esse3.cineca.it](https://unimi.esse3.cineca.it)                 | `https://unimi.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Milano-Bicocca                    | UNIMIB        | Hosting    | [unimib.esse3.cineca.it](https://unimib.esse3.cineca.it)               | `https://unimib.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi del Molise                           | UNIMOL        | Hosting    | [unimol.esse3.cineca.it](https://unimol.esse3.cineca.it)               | `https://unimol.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi di Modena e Reggio Emilia            | UNIMORE       | Hosting    | [unimore.esse3.cineca.it](https://unimore.esse3.cineca.it)             | `https://unimore.esse3.cineca.it/e3rest/docs/`       |
| Università degli Studi di Napoli Federico II                | UNINA         | In-house   | [unina.esse3.cineca.it](https://unina.esse3.cineca.it)                 | `https://unina.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Napoli Parthenope                 | UNIPARTHENOPE | Hosting    | [uniparthenope.esse3.cineca.it](https://uniparthenope.esse3.cineca.it) | `https://uniparthenope.esse3.cineca.it/e3rest/docs/` |
| Università del Piemonte Orientale                           | UNIPMN        | Hosting    | [unipmn.esse3.cineca.it](https://unipmn.esse3.cineca.it)               | `https://unipmn.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi di Padova                            | UNIPD         | In-house   | [unipd.esse3.cineca.it](https://unipd.esse3.cineca.it)                 | `https://unipd.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Perugia                           | UNIPG         | Hosting    | [unipg.esse3.cineca.it](https://unipg.esse3.cineca.it)                 | `https://unipg.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Parma                             | UNIPR         | Hosting    | [unipr.esse3.cineca.it](https://unipr.esse3.cineca.it)                 | `https://unipr.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Pavia                             | UNIPV         | Hosting    | [unipv.esse3.cineca.it](https://unipv.esse3.cineca.it)                 | `https://unipv.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Roma "La Sapienza"                | UNIROMA1      | Hosting    | [uniroma1.esse3.cineca.it](https://uniroma1.esse3.cineca.it)           | `https://uniroma1.esse3.cineca.it/e3rest/docs/`      |
| Università degli Studi di Roma "Tor Vergata"                | UNIROMA2      | Hosting    | [uniroma2.esse3.cineca.it](https://uniroma2.esse3.cineca.it)           | `https://uniroma2.esse3.cineca.it/e3rest/docs/`      |
| Università degli Studi Roma Tre                             | UNIROMA3      | Hosting    | [uniroma3.esse3.cineca.it](https://uniroma3.esse3.cineca.it)           | `https://uniroma3.esse3.cineca.it/e3rest/docs/`      |
| Università degli Studi del Salento                          | UNISALENTO    | Hosting    | [unisalento.esse3.cineca.it](https://unisalento.esse3.cineca.it)       | `https://unisalento.esse3.cineca.it/e3rest/docs/`    |
| Università degli Studi del Sannio                           | UNISANNIO     | Hosting    | [unisannio.esse3.cineca.it](https://unisannio.esse3.cineca.it)         | `https://unisannio.esse3.cineca.it/e3rest/docs/`     |
| Università degli Studi di Sassari                           | UNISS         | Hosting    | [uniss.esse3.cineca.it](https://uniss.esse3.cineca.it)                 | `https://uniss.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Siena                             | UNISI         | Hosting    | [unisi.esse3.cineca.it](https://unisi.esse3.cineca.it)                 | `https://unisi.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Torino                            | UNITO         | Hosting    | [unito.esse3.cineca.it](https://unito.esse3.cineca.it)                 | `https://unito.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Trento                            | UNITN         | Hosting    | [unitn.esse3.cineca.it](https://unitn.esse3.cineca.it)                 | `https://unitn.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Trieste                           | UNITS         | Hosting    | [units.esse3.cineca.it](https://units.esse3.cineca.it)                 | `https://units.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Udine                             | UNIUD         | Hosting    | [uniud.esse3.cineca.it](https://uniud.esse3.cineca.it)                 | `https://uniud.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Urbino Carlo Bo                   | UNIURB        | Hosting    | [uniurb.esse3.cineca.it](https://uniurb.esse3.cineca.it)               | `https://uniurb.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi di Verona                            | UNIVR         | Hosting    | [univr.esse3.cineca.it](https://univr.esse3.cineca.it)                 | `https://univr.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi della Tuscia                         | UNITUS        | Hosting    | [unitus.esse3.cineca.it](https://unitus.esse3.cineca.it)               | `https://unitus.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi Internazionali di Roma – UNINT       | UNINT         | Hosting    | [unint.esse3.cineca.it](https://unint.esse3.cineca.it)                 | `https://unint.esse3.cineca.it/e3rest/docs/`         |
| Libera Università degli Studi "Maria SS. Assunta" – LUMSA   | LUMSA         | Hosting    | [lumsa.esse3.cineca.it](https://lumsa.esse3.cineca.it)                 | `https://lumsa.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Ancona – Politecnica delle Marche | UNIVPM        | Hosting    | [univpm.esse3.cineca.it](https://univpm.esse3.cineca.it)               | `https://univpm.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi della Campania "Luigi Vanvitelli"    | UNICAMPANIA   | Hosting    | [unicampania.esse3.cineca.it](https://unicampania.esse3.cineca.it)     | `https://unicampania.esse3.cineca.it/e3rest/docs/`   |
| Politecnico di Bari                                         | POLIBA        | Hosting    | [poliba.esse3.cineca.it](https://poliba.esse3.cineca.it)               | `https://poliba.esse3.cineca.it/e3rest/docs/`        |
| Politecnico di Milano                                       | POLIMI        | In-house   | [polimi.esse3.cineca.it](https://polimi.esse3.cineca.it)               | `https://polimi.esse3.cineca.it/e3rest/docs/`        |
| Politecnico di Torino                                       | POLITO        | In-house   | [polito.esse3.cineca.it](https://polito.esse3.cineca.it)               | `https://polito.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi Mediterranea di Reggio Calabria      | UNIRC         | Hosting    | [unirc.esse3.cineca.it](https://unirc.esse3.cineca.it)                 | `https://unirc.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Napoli "L'Orientale"              | IIOR          | Hosting    | [iior.esse3.cineca.it](https://iior.esse3.cineca.it)                   | `https://iior.esse3.cineca.it/e3rest/docs/`          |
| Link Campus University                                      | LINK          | Hosting    | [link.esse3.cineca.it](https://link.esse3.cineca.it)                   | `https://link.esse3.cineca.it/e3rest/docs/`          |
| Università degli Studi di Catania                           | UNICT         | Hosting    | [unict.esse3.cineca.it](https://unict.esse3.cineca.it)                 | `https://unict.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Palermo                           | UNIPA         | Hosting    | [unipa.esse3.cineca.it](https://unipa.esse3.cineca.it)                 | `https://unipa.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di Genova                            | UNIGE         | Hosting    | [unige.esse3.cineca.it](https://unige.esse3.cineca.it)                 | `https://unige.esse3.cineca.it/e3rest/docs/`         |
| Università degli Studi di L'Aquila                          | UNIVAQ        | Hosting    | [univaq.esse3.cineca.it](https://univaq.esse3.cineca.it)               | `https://univaq.esse3.cineca.it/e3rest/docs/`        |
| Università degli Studi di Pisa                              | UNIPI         | Hosting    | [unipi.esse3.cineca.it](https://unipi.esse3.cineca.it)                 | `https://unipi.esse3.cineca.it/e3rest/docs/`         |

---

::: info
**Deployment modes:** **Hosting** = infrastructure managed by CINECA;

**In-house** = installed and operated directly by the institution. Both expose the same REST API surface.
:::

---

## References

- **CINECA official website:** [cineca.it](https://www.cineca.it)
- **ESSE3 product page:** [eventi.cineca.it – ESSE3](https://eventi.cineca.it/en/solutions/esse3-student-management-system)
- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
- **ESSE3 university list:** `http://ans-esse3.cineca.it/2007/12/03/atenei-esse3` _(source blog - currently unreachable, preserved for reference)_
