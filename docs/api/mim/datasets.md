---
title: Open Data MIM Dataset Catalog | OhMyUniversity!
description: Complete catalog of Open Data MIM datasets, including university enrollments, graduates, and course offerings with download URLs, formats, and update frequency.
head:
  - - meta
    - property: og:title
      content: Open Data MIM Dataset Catalog | OhMyUniversity!
  - - meta
    - property: og:description
      content: Explore the Open Data MIM dataset catalog with detailed information on university data, formats, update schedules, and download examples.
  - - meta
    - property: og:url
      content: https://docs.university.ohmyopensource.org/api/mim/datasets
  - - meta
    - name: keywords
      content: open data mim datasets, italian university data, mim dataset catalog, university enrollments italy, mim csv data, higher education data italy, ohmyuniversity datasets
  - - meta
    - name: twitter:title
      content: Open Data MIM Dataset Catalog | OhMyUniversity!
  - - meta
    - name: twitter:description
      content: Detailed catalog of Open Data MIM datasets including enrollments, graduates, and academic programs.
---

# OhMyUniversity! - Open Data MIM: Dataset Catalog

List of datasets relevant to OhMyUniversity!, including download URLs, update frequency, and notes.

> **How to read this table:** the “Latest available academic year” column indicates the most recent academic year present in the file at the time of the last check. This column must be updated whenever new data availability is verified.

---

## University datasets

### University enrollments

| Field               | Value                                                                   |
| ------------------- | ----------------------------------------------------------------------- |
| File name           | `ISCRITTIATENEO{YYYYYY}.zip`                                            |
| Base URL            | `https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/` |
| Format              | CSV inside ZIP                                                          |
| Update frequency    | Annual (typical release: October/November)                              |
| Latest available AY | 2022/2023 _(verified: 2024-01)_                                         |
| Granularity         | By university, degree program, year of study, gender                    |

**Download example:**

```
curl -O "https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/ISCRITTIATENEO202223.zip"
unzip ISCRITTIATENEO202223.zip
```

**Main CSV columns:**

| Column                 | Type    | Description                                          |
| ---------------------- | ------- | ---------------------------------------------------- |
| `ATENEO`               | string  | University ministerial code (e.g. `001`)             |
| `DENOMINAZIONE_ATENEO` | string  | Full university name (e.g. University of Bologna)    |
| `AREA_GEOGRAFICA`      | string  | `North`, `Central`, `South`, `Islands`               |
| `REGIONE`              | string  | Region of the university                             |
| `TIPO_CORSO`           | string  | `L` (Bachelor), `LM` (Master), `LMCU` (Single-cycle) |
| `CORSO`                | string  | Degree program name                                  |
| `CLASSE`               | string  | Ministerial class of the program                     |
| `ANNO_CORSO`           | integer | Year of enrollment (1, 2, 3, ...)                    |
| `SESSO`                | string  | `M`, `F`                                             |
| `ISCRITTI`             | integer | Number of enrolled students                          |
| `ANNO_ACCADEMICO`      | string  | e.g. `2022/2023`                                     |

**Example CSV output (first rows):**

```
ATENEO;DENOMINAZIONE_ATENEO;AREA_GEOGRAFICA;REGIONE;TIPO_CORSO;CORSO;CLASSE;ANNO_CORSO;SESSO;ISCRITTI;ANNO_ACCADEMICO
001;University of Turin;North;Piedmont;L;Computer Science;L-31;1;M;312;2022/2023
001;University of Turin;North;Piedmont;L;Computer Science;L-31;1;F;98;2022/2023
001;University of Turin;North;Piedmont;L;Computer Science;L-31;2;M;287;2022/2023
```

---

### University enrollments (first-year students)

| Field               | Value                                                                        |
| ------------------- | ---------------------------------------------------------------------------- |
| File name           | `IMMATRICOLATIATENEO{YYYYYY}.zip`                                            |
| Base URL            | `https://dati.istruzione.it/opendata/opendata/catalogo/IMMATRICOLATIATENEO/` |
| Format              | CSV inside ZIP                                                               |
| Update frequency    | Annual                                                                       |
| Latest available AY | 2022/2023 _(verified: 2024-01)_                                              |
| Granularity         | By university, program, gender, geographic origin                            |

**Main CSV columns:**

| Column                 | Type    | Description                 |
| ---------------------- | ------- | --------------------------- |
| `ATENEO`               | string  | University code             |
| `DENOMINAZIONE_ATENEO` | string  | University name             |
| `TIPO_CORSO`           | string  | `L`, `LM`, `LMCU`           |
| `CORSO`                | string  | Degree program              |
| `SESSO`                | string  | `M`, `F`                    |
| `CITTADINANZA`         | string  | `ITALIANA`, `FOREIGN`       |
| `IMMATRICOLATI`        | integer | Number of enrolled students |
| `ANNO_ACCADEMICO`      | string  | e.g. `2022/2023`            |

---

### University graduates

| Field               | Value                                                                   |
| ------------------- | ----------------------------------------------------------------------- |
| File name           | `LAUREATIATENEO{YYYYYY}.zip`                                            |
| Base URL            | `https://dati.istruzione.it/opendata/opendata/catalogo/LAUREATIATENEO/` |
| Format              | CSV inside ZIP                                                          |
| Update frequency    | Annual                                                                  |
| Latest available AY | 2021/2022 _(verified: 2024-01)_                                         |
| Granularity         | By university, program, graduation grade, gender, age                   |

---

### University course offerings (active programs)

| Field               | Value                                                                               |
| ------------------- | ----------------------------------------------------------------------------------- |
| File name           | `OFFERTAFORMATIVAUNIVERSITA{YYYYYY}.zip`                                            |
| Base URL            | `https://dati.istruzione.it/opendata/opendata/catalogo/OFFERTAFORMATIVAUNIVERSITA/` |
| Format              | CSV inside ZIP                                                                      |
| Update frequency    | Annual                                                                              |
| Latest available AY | 2023/2024 _(verified: 2024-01)_                                                     |
| Granularity         | By university, program, campus, delivery mode                                       |

**Main columns:**

| Column                 | Type   | Description                        |
| ---------------------- | ------ | ---------------------------------- |
| `ATENEO`               | string | University code                    |
| `DENOMINAZIONE_ATENEO` | string | University name                    |
| `CORSO`                | string | Program name                       |
| `CLASSE`               | string | Ministerial class                  |
| `TIPO_CORSO`           | string | `L`, `LM`, `LMCU`, `D` (PhD)       |
| `MODALITA_EROGAZIONE`  | string | `On-site`, `Distance`, `Hybrid`    |
| `STATO_CORSO`          | string | `Active`, `Suspended`, `Completed` |
| `SEDE`                 | string | City of the course location        |
| `REGIONE_SEDE`         | string | Region of the campus               |

---

## How to construct dataset URLs

The URL pattern is always:

```
https://dati.istruzione.it/opendata/opendata/catalogo/{DATASET}/{DATASET}{YEAR}.zip
```

Where `{YEAR}` is the academic year in `YYYYYY` format without separators (e.g. `202223` for 2022/2023, `202324` for 2023/2024).

Example for downloading 2023/2024 enrollments when available:

```bash id="p4kq9m"
curl -O "https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/ISCRITTIATENEO202324.zip"
```

---

## Note on university codes

The university codes used by MIM are **ministerial codes** (numeric strings of 3–4 digits), different from CINECA codes. When combining MIM and CINECA datasets, a mapping table is required. See `guides/mapping-university-codes.md`.
