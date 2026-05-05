---
title: Multiversity Overview | OhMyUniversity!
description: Overview of the Multiversity Group and its digital university platform, with the list of universities operating under the Multiversity ecosystem.
head:
  - - meta
    - property: og:title
      content: Multiversity Overview | OhMyUniversity!
  - - meta
    - property: og:description
      content: Overview of the Multiversity Group and its digital university platform, with the list of universities operating under the Multiversity ecosystem.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/multiversity/overview
  - - meta
    - name: keywords
      content: multiversity, pegaso, mercatorum, san raffaele, università telematica, università online, multiversity api, ohmyuniversity multiversity
  - - meta
    - name: twitter:title
      content: Multiversity Overview | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Overview of the Multiversity Group and its digital university platform, with the list of universities operating under the Multiversity ecosystem.
---

# OhMyUniversity! - Multiversity Overview

This section documents the APIs and integrations available for universities operating within the **Multiversity Group** ecosystem. Each subsection is specific to a university instance and covers its available endpoints, authentication methods, and platform details.

---

## What is Multiversity?

**Multiversity S.p.A.** is the leading private group in digital higher education in Italy, founded in 2006 with the launch of Università Telematica Pegaso. Backed by the British investment fund **CVC Capital Partners**, the group has grown to become one of the most significant players in the Italian e-learning landscape.

The group owns and operates three **MUR-accredited telematic universities** (università telematiche), alongside a set of non-university education and certification businesses. All academic institutions in the group share a common digital infrastructure and LMS platform, developed and maintained internally by Multiversity.

Key figures (as of 2022–2024):

- **3** accredited telematic universities
- **100+** exam locations across Italy
- **~1,000** E-Learning Center Points (ECPs) nationwide
- **110,000+** enrolled students across the group
- **40+** degree programmes, **109+** higher education courses

**Website:** [multiversity.it](https://multiversity.it)

---

## The Multiversity Platform

All universities in the group share a unified **LMS (Learning Management System)** platform, accessible via the `*.multiversity.click` domain. The platform provides:

- **Video lectures** - on-demand course content streamed through the student area
- **Exam booking** - online reservation of exam sessions at physical or remote locations
- **Career management** - student record, grades, and academic progress tracking
- **Administrative services** - enrollment, tuition payments, document requests
- **Accessible version** - a dedicated accessibility-compliant interface for each university

Each university instance is served at a dedicated subdomain following this pattern:

```
LMS Portal:   https://lms.{university}.multiversity.click/
Student area: https://{university}.multiversity.click/
```

::: warning
Multiversity does not currently publish a public REST API specification. The API surface documented in this section is based on observed platform behaviour and community research. Always verify against official documentation if available.
:::

---

## Universities in the Multiversity Group

The table below lists the universities and higher education institutions operating under the Multiversity Group. Three are MUR-accredited telematic universities delivering fully online degree programmes recognised under Italian law; the fourth is Pegaso International, the group's international arm, accredited in Malta by the MFHEA.

| Institution                             | Type                  | Short name   | Founded | Accreditation | Portal                                                    | LMS                                                                     |
| --------------------------------------- | --------------------- | ------------ | ------- | ------------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| Università Telematica Pegaso            | Telematic university  | Pegaso       | 2006    | MUR (Italy)   | [unipegaso.it](https://www.unipegaso.it/)                 | [pegaso.multiversity.click](https://pegaso.multiversity.click/)         |
| Universitas Mercatorum                  | Telematic university  | Mercatorum   | 2003    | MUR (Italy)   | [unimercatorum.it](https://www.unimercatorum.it/)         | [mercatorum.multiversity.click](https://mercatorum.multiversity.click/) |
| Università Telematica San Raffaele Roma | Telematic university  | San Raffaele | 1998    | MUR (Italy)   | [uniroma5.it](https://www.uniroma5.it/)                   | [utsr.multiversity.click](https://lms.utsr.multiversity.click/)         |
| Pegaso International                    | Lifelong learning HEI | -            | 2015    | MFHEA (Malta) | [pegasointernational.eu](https://pegasointernational.eu/) | -                                                                       |

---

## References

- **Multiversity Group:** [multiversity.it](https://multiversity.it)
- **Università Telematica Pegaso:** [unipegaso.it](https://www.unipegaso.it/)
- **Universitas Mercatorum:** [unimercatorum.it](https://www.unimercatorum.it/)
- **Università Telematica San Raffaele Roma:** [uniroma5.it](https://www.uniroma5.it/)
- **MUR - Università Telematiche riconosciute:** [mur.gov.it](https://www.mur.gov.it/it/ateneo/universita-telematiche)
