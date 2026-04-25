---
title: API Index | OhMyUniversity!
description: Comprehensive index of all API sources used in the OhMyUniversity! ecosystem, including endpoints, authentication methods, rate limits, and integration status.
head:
  - - meta
    - property: og:title
      content: API Index | OhMyUniversity!
  - - meta
    - property: og:description
      content: Explore the full list of API sources integrated in OhMyUniversity!, with details on endpoints, authentication, rate limits, and current status.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/components/badge
  - - meta
    - name: keywords
      content: ohmyuniversity api, university api index, cineca ans api, miur open data api, european data portal api, student data api, university integration, api documentation
  - - meta
    - name: twitter:title
      content: API Index | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Full overview of APIs used in OhMyUniversity!, including endpoints, authentication methods, and integration status.
---

# OhMyUniversity! - API Index

Overview of all API sources documented in this repository. Update this table whenever a source is add or modified.

| Source               | Base URL                                       | Auth               | Rate limit    | Status         | Last updated |
| -------------------- | ---------------------------------------------- | ------------------ | ------------- | -------------- | ------------ |
| CINECA ANS           | `https://api.cineca.it/ans/v1`                 | Bearer token       | Not public    | to be verified | -            |
| Open Data MIUR       | `https://dati.istruzione.it/opendata/opendata` | None               | None declared | active         | 2024-01      |
| European Data Portal | `https://data.europa.eu/api/hub/search`        | API Key (optional) | 100 req/min   | active         | 2024-03      |

### Status legend

- active - endpoints verified and working
- to be verified - documentation available but endpoints not recently tested
- deprecated - do not use, see the source changelog
