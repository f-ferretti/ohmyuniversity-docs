# Open Data MIUR - Authentication

## No authentication required

The Open Data MIUR portal is fully public. Registration, tokens, or API keys are not required to access the datasets.

All files are accessible via direct URLs using a simple HTTP GET request.

```bash
curl -O "https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/ISCRITTIATENEO202223.zip"
```

---

## Practical considerations

Even though no authentication is required, it is good practice to identify requests with a descriptive `User-Agent` when making automated calls. This helps respect the service and supports traffic analysis by MIUR.

```bash
curl -A "OhMyUniversity-bot/1.0 (https://github.com/ohmyuniversity)" \
  -O "https://dati.istruzione.it/opendata/opendata/catalogo/ISCRITTIATENEO/ISCRITTIATENEO202223.zip"
```

---

## Terms of use (MIUR data)

The datasets provided by the Open Data MIUR portal are generally released under the Italian Open Data License v2.0 (IODL 2.0).

However, the applicable license may vary depending on the specific dataset. The license indicated in the dataset metadata or download page should always be considered the authoritative source.

This applies to the data itself, not to this documentation.

Attribution to the Ministry of Education and Merit is required when reusing the data.

Recommended attribution format:

> Data: Ministry of Education and Merit - [dati.istruzione.it](https://dati.istruzione.it), IODL 2.0 license
