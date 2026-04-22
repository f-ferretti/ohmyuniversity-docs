# Open Data MIUR - Endpoints and Downloads

> ⚠️ **Note:** The MIUR portal does not expose a traditional REST API with queryable endpoints. Data is distributed as **static downloadable files** (CSV/ZIP). This page documents file access URLs and catalog navigation endpoints.

---

## Dataset catalog (HTML navigation / scraping)

The full catalog is available at:

```
https://dati.istruzione.it/opendata/opendata/catalogo
```

No JSON endpoint is available for the catalog. To automate dataset discovery, HTML parsing is required, or alternatively pre-defined dataset URLs documented in [`datasets.md`](./datasets.md) can be used.

---

## Direct file download

### GET - Download a dataset

```
GET https://dati.istruzione.it/opendata/opendata/catalogo/{DATASET}/{DATASET}{YEAR}.zip
```

**Path parameters:**

| Parameter | Type   | Description                      | Example        |
| --------- | ------ | -------------------------------- | -------------- |
| DATASET   | string | Dataset name in UPPERCASE        | ISCRITTIATENEO |
| YEAR      | string | Academic year without separators | 202223         |

**Example - enrollments 2022/2023:**

```bash id="9x2lqp"
curl -L \
  -A "OhMyUniversity-bot/1.0 (https://github.com/ohmyuniversity)" \
  -O "https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/ISCRITTIATENEO202223.zip"
```

**Response:**

The server returns a ZIP file. The `-L` flag handles possible redirects (some files may be served via CDN redirections).

```
HTTP/2 200
content-type: application/zip
content-disposition: attachment; filename="ISCRITTIATENEO202223.zip"
```

Inside the ZIP there is typically a single CSV file with a matching name:

```
ISCRITTIATENEO202223.zip
└── ISCRITTIATENEO202223.csv
```

**Decompression and reading in Python:**

```python
import zipfile
import pandas as pd
import io
import requests

url = "https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/ISCRITTIATENEO202223.zip"
headers = {"User-Agent": "OhMyUniversity-bot/1.0"}

response = requests.get(url, headers=headers)
response.raise_for_status()

with zipfile.ZipFile(io.BytesIO(response.content)) as z:
    csv_name = z.namelist()[0]
    with z.open(csv_name) as f:
        df = pd.read_csv(f, sep=";", encoding="utf-8-sig", decimal=",")

print(df.head())
print(f"Total rows: {len(df)}")
```

**Example output (indicative):**

```
  ATENEO DENOMINAZIONE_ATENEO AREA_GEOGRAFICA REGIONE TIPO_CORSO
0    001  University of Turin            North  Piedmont        L
...
Total rows: 48320
```

---

## File existence check (HEAD request)

Before downloading, it is possible to verify whether a file exists and retrieve its size:

```
curl -I "https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/ISCRITTIATENEO202324.zip"
```

**If available:**

```
HTTP/2 200
content-length: 1245678
last-modified: Thu, 15 Feb 2024 10:32:00 GMT
```

**If not yet published:**

```
HTTP/2 404
```

This is useful for implementing automated checks that detect when a new academic year dataset becomes available.

---

## URL patterns for main datasets

| Dataset              | URL pattern                                                           |
| -------------------- | --------------------------------------------------------------------- |
| Enrollments          | `.../ISCRITTIATENEO/ISCRITTIATENEO{YEAR}.zip`                         |
| Enrolled students    | `.../IMMATRICOLATIATENEO/IMMATRICOLATIATENEO{YEAR}.zip`               |
| Graduates            | `.../LAUREATIATENEO/LAUREATIATENEO{YEAR}.zip`                         |
| Academic offerings   | `.../OFFERTAFORMATIVAUNIVERSITA/OFFERTAFORMATIVAUNIVERSITA{YEAR}.zip` |
| University faculty   | `.../DOCENTIUNIVERSITA/DOCENTIUNIVERSITA{YEAR}.zip`                   |
| Administrative staff | `.../PERSONALETA/PERSONALETA{YEAR}.zip`                               |

Common base URL:
`https://dati.istruzione.it/opendata/opendata/catalogo/`

---

## Error handling

| HTTP code | Meaning                                 | Action                                                   |
| --------- | --------------------------------------- | -------------------------------------------------------- |
| 200       | File available                          | Proceed with download                                    |
| 301 / 302 | Redirect                                | Use `-L` with curl or `allow_redirects=True` in requests |
| 404       | Dataset not yet published for that year | Retry later; check portal                                |
| 403       | Access denied                           | Rare; try adding a `User-Agent`                          |
| 5xx       | MIUR server error                       | Retry after a few minutes                                |
