---
title: API Documentation Conventions | OhMyUniversity!
description: Standardized guidelines for documenting APIs in OhMyUniversity!, including folder structure, naming conventions, request formats, and changelog requirements.
head:
  - - meta
    - property: og:title
      content: API Documentation Conventions | OhMyUniversity!
  - - meta
    - property: og:description
      content: Learn the official conventions for documenting APIs in OhMyUniversity!, covering structure, naming, request examples, and changelog practices.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/conventions
  - - meta
    - name: keywords
      content: api documentation conventions, api guidelines, ohmyuniversity api standards, api structure, curl examples api, api documentation best practices, developer documentation rules
  - - meta
    - name: twitter:title
      content: API Documentation Conventions | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Official API documentation standards for OhMyUniversity!, including structure, naming, and example formatting.
---

# OhMyUniversity! - API Documentation Conventions

These rules apply to all folders inside `api/`. They must be followed when adding a new source or updating an existing one.

---

## Required structure for each source

```
api/<source-name>/
├── overview.md     ← required
├── auth.md         ← required
├── endpoints.md    ← required
├── changelog.md    ← required
└── datasets.md     ← only for data catalog–type sources
```

## Naming

- Folder names must be in **lowercase kebab-case**: `european-data-portal`, not `EuropeanDataPortal`.
- File names must always be lowercase and contain no spaces.
- Do not use abbreviations in folder names: `miur` is acceptable because it is an official acronym, `edp` is not - use `european-data-portal`.

## Request example format

`curl` must always be used as the primary format for examples. It is universal and requires no dependencies.

```bash
curl -X GET "https://example.com/api/endpoint" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

- Use `YOUR_TOKEN`, `YOUR_API_KEY` as placeholders - never real tokens.
- Always include relevant headers.
- For requests with a body, use `-d` with explicit JSON.

## Example response format

A real response (or as close as possible) must always be shown, trimmed to what is necessary. Add `// ...` to indicate omitted fields.

```json
{
  "data": [
    {
      "id": "12345",
      "name": "Politecnico di Milano"
    }
    // ...
  ],
  "total": 97,
  "page": 1
}
```

## Changelog updates

Any change to a source’s documentation must include an entry in `changelog.md` with:

- date in `YYYY-MM-DD` format
- type of change: `added`, `modified`, `deprecated`, `removed`
- short description

## Index updates

After adding or modifying a source, the table in [`overview.md`](./overview.md) must be updated with the correct date and status.
