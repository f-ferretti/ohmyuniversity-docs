# OhMyUniversity! - API Overview

The API layer is responsible for aggregating and normalizing data from multiple external sources such as MIUR, CINECA, and the European Data Portal.

### Key characteristics

- Unified interface over multiple data sources
- No direct user authentication required for public data
- Data is primarily file-based (CSV/ZIP) or preprocessed into structured responses
- Focus on normalization and consistency across datasets

### Example usage

```bash
curl https://api.example.com/universities
```

### Documentation

Full API documentation is available in the `/api/` section of the repository.
