---
title: RAD: 1 Introduction | OhMyUniversity!
description: Requirements Analysis Document for OhMyUniversity - a unified middleware platform designed to simplify and centralize the university digital experience for students.
head:
  - - meta
    - property: og:title
      content: RAD: 1 Introduction | OhMyUniversity!
  - - meta
    - property: og:description
      content: Requirements Analysis Document for OhMyUniversity - a unified middleware platform designed to simplify and centralize the university digital experience for students.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/rad/introduction
  - - meta
    - name: keywords
      content: ohmyuniversity, rad, requirements analysis, university app, cineca, esse3, moodle, spid, gdpr, agid, middleware, student portal, academic management
  - - meta
    - name: twitter:title
      content: RAD: 1 Introduction | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Requirements Analysis Document for OhMyUniversity - a unified middleware platform designed to simplify and centralize the university digital experience for students.
---

# OhMyUniversity! - RAD: 1 Introduction

This document specifies the requirements needed for **OhMyUniversity!**, a system designed to unify and simplify the student experience across various university digital services. It serves as the definitive foundation for the development phase, detailing the system's objectives, scope, success criteria, and underlying architecture.

Conceived to resolve the deep fragmentation within current university digital services, **OhMyUniversity!** provides students - the primary actors of the system - with a single, simplified access point for managing their academic life. It transforms a scattered user experience, currently divided among numerous web portals, static PDF files, and physical offices, into a comprehensive digital ecosystem. The software acts as an active supportive tool that goes beyond mere data visualization, assisting students throughout their entire journey: from daily logistical activities to the strategic planning of their academic career, effectively reducing the burden of bureaucracy and information retrieval.

The scope of the project encompasses the development of a unified interface acting as a **middleware** layer. By leveraging APIs, **OhMyUniversity!** interoperates with a set of external systems to deliver its core functionalities: 

- **Cineca/Esse3** and **Moodle** provide career and didactic data;
- **Digital Identity Providers** such as SPID enable secure user authentication; 
- **Map Providers** support transportation and geolocation features;
- **Corporate Partners** enable the delivery of student conventions and discounts. 

However, the system's scope remains strictly limited to data consultation, synchronization, and organization - direct financial transactions and the official recording of grades are explicitly excluded, as these functions fall under the exclusive jurisdiction of the university's administrative management systems.

The success of the project is anchored to strict technical and functional parameters: zero error tolerance when syncing sensitive academic data with official university servers, high navigation efficiency allowing expert users to reach critical information within a maximum of 3 interactions, and flawless integration with both institutional and partner portals.

The entire system is designed in full compliance with **GDPR** (EU Regulation 2016/679) and the accessibility criteria outlined by **AgID** *(Agenzia per l'Italia Digitale)*, ensuring the secure processing and protection of users' personal data throughout.
