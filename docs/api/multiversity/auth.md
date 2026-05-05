---
title: Authentication | Multiversity | OhMyUniversity!
description: Overview of the authentication model used across the Multiversity Group platform - SSO, OAuth2/OIDC, and session management for students and faculty.
head:
  - - meta
    - property: og:title
      content: Authentication | Multiversity | OhMyUniversity!
  - - meta
    - property: og:description
      content: Overview of the authentication model used across the Multiversity Group platform - SSO, OAuth2/OIDC, and session management for students and faculty.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/multiversity/auth
  - - meta
    - name: keywords
      content: multiversity auth, pegaso login, multiversity sso, oauth2 multiversity, oidc multiversity, multiversity authentication, ohmyuniversity multiversity auth
  - - meta
    - name: twitter:title
      content: Authentication | Multiversity | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Overview of the authentication model used across the Multiversity Group platform - SSO, OAuth2/OIDC, and session management for students and faculty.
---

# OhMyUniversity! - Multiversity: Authentication

This page describes the authentication model used across the Multiversity Group platform. Unlike CINECA ESSE3, Multiversity does not publish a public API specification, so this document is based on observed platform behaviour rather than official documentation.

::: warning
The information on this page is based on community research and platform observation. Multiversity does not currently expose a public REST API or authentication documentation. Treat this as a reference overview, not an integration guide.
:::

---

## How authentication works in Multiversity

All three universities in the Multiversity Group - Pegaso, Mercatorum, and San Raffaele Roma - share a **single, centralized identity layer**. Authentication is not handled independently by each university's LMS instance: instead, every login is routed through a shared Identity Provider (IdP) operated by the group.

This is consistent with the SSO architecture visible in the platform: the sign-in entry point (`signin.multiversity.click`) is a dedicated authorization service, separate from the individual university LMS instances (`*.multiversity.click`).

---

## Single Sign-On (SSO)

The core of Multiversity's authentication model is **Single Sign-On**. A user authenticates once through the group's centralized IdP and gains access to all services they are entitled to - the LMS, the student area, administrative services - without logging in again for each.

This means that from an integration standpoint, there is no per-university authentication: credentials and sessions are managed at the group level, not at the individual institution level.

---

## OAuth2 / OIDC

The Multiversity platform authentication infrastructure is built on **OAuth2 and OpenID Connect (OIDC)**, the industry-standard protocols for delegated authentication and identity federation. This is evidenced by the structure of the `signin.multiversity.click` authorization endpoint, which behaves as a standard OAuth2 authorization server.

In practical terms, this means:

- Users authenticate against the central IdP, which issues **access tokens** and **ID tokens**
- Applications (LMS, student portal, administrative tools) consume those tokens to verify identity and establish sessions
- Token-based access allows the group to manage permissions and roles centrally across all three universities

---

## User roles

Access to platform features is controlled by the **role** associated with the user's account. The main roles present across the platform are:

- **Studente** - enrolled student; access to course content, exam booking, career management
- **Docente** - faculty member; access to course management and student records
- **Tutor** - academic tutor; access to student support tools
- **Amministratore** - administrative staff; access to secretarial and management functions

Role assignment is managed centrally and propagated across all university instances via the shared identity layer.

---

## What this means for integrators

Because Multiversity does not publish a public API or developer documentation, direct programmatic integration is not officially supported. The authentication layer is not designed for third-party consumption - it is an internal SSO infrastructure for the group's own applications.

Any integration would require a formal agreement with Multiversity and access to their internal IdP configuration (client credentials, redirect URIs, scopes). There is no self-service API key or token endpoint publicly available.

---

## References

- **Multiversity Group:** [multiversity.it](https://multiversity.it)
- **Multiversity Sign-In (IdP):** [signin.multiversity.click](https://signin.multiversity.click) _(requires JavaScript - authorization client)_
- **MUR - Università Telematiche riconosciute:** [mur.gov.it](https://www.mur.gov.it/it/aree-tematiche/universita/le-universita/universita-telematiche)
