---
title: Open Data MIM Overview | OhMyUniversity!
description: Overview of Open Data MIM datasets, including data formats, access methods, update frequency, and best practices for integration.
head:
  - - meta
    - property: og:title
      content: Open Data MIM Overview | OhMyUniversity!
  - - meta
    - property: og:description
      content: Discover how Open Data MIM works, including dataset structure, formats, update cycles, and integration best practices.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/mim/overview
  - - meta
    - name: keywords
      content: open data mim overview, italian education data, mim datasets structure, university data italy, mim csv format, iodl 2.0, ohmyuniversity api
  - - meta
    - name: twitter:title
      content: Open Data MIM Overview | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Overview of Open Data MIM datasets, formats, update cycles, and integration practices.
---

# OhMyUniversity! - Open Data MIM: Overview

The Italian Ministry of Education and Merit (MIM, formerly MIUR) publishes open datasets on the official Italian education open data portal. The data covers universities, schools, students, faculty, educational offerings, and institutional performance.

**Official portal:** [https://dati.istruzione.it](https://dati.istruzione.it)
**Official documentation:** [https://dati.istruzione.it/opendata/opendata](https://dati.istruzione.it/opendata/opendata)
**Data formats:** CSV, JSON, XML (varies by dataset)
**Data license:** generally Italian Open Data License v2.0 (IODL 2.0), unless otherwise specified

---

## Base URL

```
https://dati.istruzione.it/opendata/opendata
```

Some datasets are also distributed via the national portal [https://dati.gov.it](https://dati.gov.it) and the European Data Portal. The URLs in this documentation refer to the direct MIM portal.

---

## Authentication

None. All datasets are public and can be freely downloaded without authentication. See [`auth.md`](./auth.md).

---

## Response format

Datasets are primarily distributed as **downloadable files** (CSV or XML), rather than as real-time queryable REST APIs. The typical workflow is:

1. query the catalog to identify the dataset of interest
2. obtain the direct file URL
3. download and process the file

Some datasets are updated annually, others on a semiannual basis. See [`datasets.md`](./datasets.md) for dataset-specific details.

---

## Rate limiting

No explicit rate limits are declared. Since these are static files, best practices include:

- **avoid downloading the same file multiple times per day** - data is not updated in real time
- **use local caching** with a TTL of at least 24 hours
- **avoid scraping HTML pages** - always use direct file URLs

---

## Data updates

University datasets (enrollments, graduates, educational offerings) typically refer to the **academic year** and are published with a delay of 6–12 months after the end of the reference period. For example, data for the 2022/2023 academic year is generally published between late 2023 and early 2024.

Always check the `anno_riferimento` or `annoRiferimento` field in the files to determine the reference year.

---

## Typical structure of a MIM CSV file

CSV files from the MIM portal follow these conventions:

- **encoding:** UTF-8 with BOM (handle BOM during parsing)
- **delimiter:** `;` (semicolon), not `,`
- **header:** first row with column names in Italian, snake_case or UPPERCASE
- **null values:** empty cell or `"ND"` (not available)
- **numbers:** comma as decimal separator (e.g. `1.234,56`)

Example in Python:

```python id="0zj8jx"
import pandas as pd

df = pd.read_csv(
    "MIM_dataset.csv",
    sep=";",
    encoding="utf-8-sig",   # handles BOM
    decimal=","
)
```

---

## Useful links

- [https://dati.istruzione.it/opendata/opendata](https://dati.istruzione.it/opendata/opendata)
- [https://dati.istruzione.it/opendata/opendata/catalogo/note-metodologiche](https://dati.istruzione.it/opendata/opendata/catalogo/note-metodologiche)
- [https://www.dati.gov.it/view-dataset?holder_name=Ministero+dell%27Istruzione](https://www.dati.gov.it/view-dataset?holder_name=Ministero+dell%27Istruzione)
