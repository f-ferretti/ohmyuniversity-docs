# OhMyUniversity! - Documentation

[![Documentation](https://img.shields.io/badge/docs-online-blue?style=flat-square)](https://docs.university.ohmyopensource.org)

Welcome to the official documentation repository of **OhMyUniversity!**, an open source project from **OhMyOpenSource!**, that aggregates, normalizes, and makes accessible data and services from the Italian and European university ecosystem.

> 📖 **Documentation site:** [docs.university.ohmyopensource.org](https://docs.university.ohmyopensource.org)

This repository does not contain code: it serves as the central reference point for anyone who wants to contribute, integrate, or understand how the OhMyUniversity! ecosystem works.

---

## What are OhMyOpenSource! and OhMyUniversity! ?

**OhMyOpenSource!** is an open source organization that develops free open source for everybody.

**OhMyUniversity!** is an open source tool for students, researchers, and developers working with university data. The project aggregates information from institutional sources (CINECA, MIM, European Data Portal) and exposes it through unified APIs and accessible interfaces.

---

## Repository structure across the organization

All repositories under the `OhMyOpenSource!` organization follow pretty muche the same structure and naming conventions.

In particular, the api folder contains all the information about data retriving from CINECA, MIM, MUR and European Data Portal.

Each documentation repository is organized as follows:

```
ohmyuniversity-docs/
├── README.md                  ← current file
├── CONTRIBUTING.md            ← contribution guidelines
├── LICENSE
├── package.json
└── docs/
    ├── index.md               ← home page
    ├── getting-started/       ← introductory guides, setup, quickstart
    ├── guides/                ← in-depth thematic guides
    ├── architecture/          ← architectural decisions, diagrams, ADRs
    ├── api/                   ← documentation of integrated external APIs
    │   ├── conventions.md
    │   ├── overview.md
    │   ├── cineca/
    │   ├── mim/
    │   ├── mur/
    │   └── edp/
    └── project/               ← project specifications and documentation
        ├── overview.md
        ├── rad/               ← Requirements & Analysis Document
        ├── sdd/               ← System Design Document
        ├── odd/               ← Object Design Document
        ├── testing/           ← test plan and reports
        └── user-manual/       ← end-user documentation
```

The `getting-started/`, `guides/`, `architecture/`, and `contributing/` sections are shared across all documentation repositories in the organization and follow the same templates. When navigating another repository, the same structure will be found consistently.

---

## What is specific to this repository: API

In addition to the standard structure, as said, this repository includes the **`api/`** section - a curated collection of all external APIs that **OhMyUniversity!** uses or may use.

The goal is to allow developers to open `api/` and immediately find:

- where the data comes from
- how authentication works
- which endpoints are available and what they return
- ready-to-use request and response examples

The sources documented in this repository are:

| Source               | Type                                                          | Folder                                    |
| -------------------- | ------------------------------------------------------------- | ----------------------------------------- |
| CINECA               | Institutional REST APIs (ANS, ESSE3, etc.)                    | [`api/cineca/`](./api/cineca/overview.md) |
| Open Data MIM        | Public open data from the Ministry of Education and Merit     | [`api/mim/`](./api/mim/overview.md)       |
| Open Data MUR        | Public open data from the Ministry of University and Research | [`api/mur/`](./api/mur/overview.md)       |
| European Data Portal | European open data on education and research                  | [`api/edpl/`](./api/edpl/overview.md)     |

---

## Navigating the API documentation

Start from [`api/overview.md`](./api/overview.md) for an overview of all available sources, or navigate directly to the folder of interest.

Each source is documented using the same set of files:

- `overview.md` - description, base URL, limits, response format
- `auth.md` - authentication method (or why it is not required)
- `datasets.md` - catalog of available datasets _(only for data catalog sources)_
- `changelog.md` - versions, breaking changes, updates

---

## Contributing

Refer to [`contributing/`](./contributing/) for instructions on proposing changes, reporting documentation issues, or adding new API sources.

Any pull request that adds or modifies an API integration must follow the templates defined in [`api/conventions.md`](./api/conventions.md).

---

## License

This documentation is dedicated to the public domain under the [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) license.

To the extent possible under law, all copyright and related rights are waived.
