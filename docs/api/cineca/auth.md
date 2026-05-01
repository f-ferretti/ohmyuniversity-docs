---
title: Cineca / ESSE3 Authentication | OhMyUniversity!
description: Overview of the authentication mechanisms used across all Cineca ESSE3 REST APIs - Basic Auth, JWT, and API Key.
head:
  - - meta
    - property: og:title
      content: Cineca / ESSE3 Authentication | OhMyUniversity!
  - - meta
    - property: og:description
      content: Overview of the authentication mechanisms used across all Cineca ESSE3 REST APIs - Basic Auth, JWT, and API Key.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/cineca/auth
  - - meta
    - name: keywords
      content: cineca esse3 auth, esse3 authentication, basic auth esse3, jwt esse3, api key esse3, esse3 rest api authentication, ohmyuniversity cineca auth
  - - meta
    - name: twitter:title
      content: Cineca / ESSE3 Authentication | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Overview of the authentication mechanisms used across all Cineca ESSE3 REST APIs - Basic Auth, JWT, and API Key.
---

# OhMyUniversity! - Cineca / ESSE3: Authentication

This page describes the authentication model used across all ESSE3 REST APIs. The mechanisms described here apply uniformly to every service and every university deployment - individual API pages only specify which method is required for each endpoint, not how it works.

---

## How authentication works in ESSE3

Every ESSE3 REST API endpoint is protected. There is no public access - all calls must carry valid credentials or a valid token. ESSE3 supports three authentication methods, which can be used independently or in combination.

---

## Basic Auth

The simplest method. Credentials (username and password) are encoded in Base64 and sent in the `Authorization` header of every request. No session is created on the server - each request is self-contained and authenticated independently.

This method is the most straightforward to set up and is the standard choice for **server-to-server (S2S) integrations**, especially those using a dedicated `UTENTE_TECNICO` account.

---

## JWT (Bearer token)

A more structured approach based on signed tokens. The user authenticates once via the **Auth API** (`auth-service-v1`) and receives a JWT token. That token is then passed in the `Authorization` header of every subsequent request, without having to resend the password each time.

The token contains the user's identity, encoded in its payload via the `sub` claim. On the server side, ESSE3 uses this claim to map the token back to the corresponding user account.

JWT is well suited for **interactive applications** (web apps, mobile apps) where a user logs in explicitly and the session has a defined lifecycle - login, use, logout.

---

## API Key

An optional layer that can be added on top of Basic Auth or JWT. It does not replace either method - it complements them. When enabled by the institution, every request must include a valid API Key alongside the usual credentials or token.

API Keys are issued and managed directly in the ESSE3 backoffice. They identify the **client application** making the request, independently of the user. This is useful in contexts where multiple external systems integrate with the same ESSE3 instance and the institution wants to track or control access per integration.

::: warning
API Key enforcement is disabled by default. It is activated at the institution level via a server-side configuration parameter. Whether it is active on a specific deployment depends on the institution's setup - check with the ESSE3 administrator if in doubt.
:::

---

## User roles

Authentication tells ESSE3 _who_ is making the request. Authorization - what that user is allowed to do - is determined by the **role** associated with their account. ESSE3 defines several user types, each with a different scope of accessible resources:

- **`UTENTE_TECNICO`** - technical/system user, full access; the standard role for backend integrations
- **`DOCENTE`** - faculty member, access to teaching-related resources
- **`STUDENTE`** - student, access to personal career and services
- **`SOGG_EST`** - external subject, limited access for third-party integrations

Each API endpoint specifies which roles are accepted. Some endpoints require `UTENTE_TECNICO` exclusively; others accept multiple roles.

---

## Authentication backends

Independent of the method used to pass credentials, ESSE3 can validate those credentials against different identity sources, configured per user group by the institution:

- **DBMS** - credentials stored and validated directly in the ESSE3 database
- **LDAP / Active Directory** - credentials validated against an institutional directory server
- **Shibboleth / External IDP** - federated authentication via an external Identity Provider

This distinction matters for integrators: if a user group is configured for external IDP authentication, Basic Auth and JWT password-based login may not be available for that group via the REST API without additional configuration on the institution's side.

---

## References

- **ESSE3 REST API General Documentation:** [wiki.u-gov.it](https://wiki.u-gov.it/confluence/display/ESSE3/Servizi+REST+su+ESSE3)
- **ESSE3 App Auth Documentation:** [wiki.u-gov.it – Autenticazione APP Studenti](https://wiki.u-gov.it/confluence/display/ESSE3/Autenticazione+APP+Studenti)
