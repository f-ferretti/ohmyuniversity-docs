import type { DefaultTheme } from 'vitepress';
import { API_DOCS, COMMON_LINKS, COMMON_TITLES } from '../../constants';

// ================================
// SHARED BACK LINK
// ================================
const backToApiDocs = {
  text: '< API Docs',
  link: `/${API_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
};

// ================================
// API DOCS ROOT
// ================================
const apiRootSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: API_DOCS.MAIN_TITLE,
    items: [
      {
        text: COMMON_TITLES.OVERVIEW,
        link: `/${API_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: 'Conventions',
        link: `/${API_DOCS.BASE_URL}/conventions`,
      },
    ],
  },
  {
    text: 'Internal APIs',
    items: [
      {
        text: 'App Private APIs',
        link: `/${API_DOCS.BASE_URL}/int-private/${COMMON_LINKS.OVERVIEW}`,
      },
    ],
  },
  {
    text: 'External APIs',
    items: [
      {
        text: API_DOCS.CINECA,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: API_DOCS.MULTIVERSITY,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MULTIVERSITY_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: API_DOCS.MIM,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MIM_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: API_DOCS.MUR,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: API_DOCS.EDP,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
    ],
  },
];

// ================================
// CINECA
// ================================
const cinecaSidebar: DefaultTheme.SidebarItem[] = [
  backToApiDocs,
  {
    text: API_DOCS.CINECA,
    items: [
      {
        text: COMMON_TITLES.OVERVIEW,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: 'Authentication',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/auth`,
      },
      {
        text: COMMON_TITLES.CHANGELOG,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/${COMMON_LINKS.CHANGELOG}`,
      },
    ],
  },
  {
    text: 'API Common',
    collapsed: true,
    items: [
      {
        text: COMMON_TITLES.OVERVIEW,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-common/${COMMON_LINKS.OVERVIEW}`,
      },
    ],
  },
  {
    text: 'API Unimol',
    collapsed: true,
    items: [
      {
        text: 'Overview',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: 'Aggiorna Carriere',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/aggcarr-api-v1`,
      },
      {
        text: 'Allegati',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/allegati-api-v1`,
      },
      {
        text: 'Anagrafica',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/anagrafica-api-v2`,
      },
      {
        text: 'Auth',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/auth-api-v1`,
      },
      {
        text: 'Badge',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/badge-api-v1`,
      },
      {
        text: 'Calendario Appuntamenti',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/calendario-appuntamenti-api-v1`,
      },
      {
        text: 'Calesa',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/calesa-api-v1`,
      },
      {
        text: 'Carriere',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/carriere-api-v1`,
      },
      {
        text: 'Comunicazioni',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/comunicazioni-api-v1`,
      },
      {
        text: 'Concorsi',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/concorsi-api-v2`,
      },
      {
        text: 'Conseguimento Titolo',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/conseguimento-titolo-api-v1`,
      },
      {
        text: 'Docenti',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/docenti-api-v1`,
      },
      {
        text: 'Import Badge',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/import-badge-api-v1`,
      },
      {
        text: 'Libretto',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/libretto-api-v2`,
      },
      {
        text: 'Logging',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/logging-api-v1`,
      },
      {
        text: 'Logistica',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/logistica-api-v1`,
      },
      {
        text: 'Nazioni',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/nazioni-api-v1`,
      },
      {
        text: 'Offerta',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/offerta-api-v1`,
      },
      {
        text: 'Piani',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/piani-api-v1`,
      },
      {
        text: 'Questionari',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/questionari-api-v1`,
      },
      {
        text: 'Regpds',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/regpds-api-v1`,
      },
      {
        text: 'Regprop',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/regprop-api-v1`,
      },
      {
        text: 'Regsce',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/regsce-api-v1`,
      },
      {
        text: 'Rendicontazione Doc',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/rendicontazione-doc-api-v1`,
      },
      {
        text: 'Servizi',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/servizi-api-v1`,
      },
      {
        text: 'Struttura',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/struttura-api-v1`,
      },
      {
        text: 'Tasse',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/tasse-api-v1`,
      },
      {
        text: 'Tirocini',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/tirocini-api-v1`,
      },
      {
        text: 'Utenti',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/utenti-api-v1`,
      },
      {
        text: 'Verbali',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/api-unimol/verbali-api-v1`,
      },
    ],
  },
];

// ================================
// MULTIVERSITY
// ================================
const multiversitySidebar: DefaultTheme.SidebarItem[] = [
  backToApiDocs,
  {
    text: API_DOCS.MULTIVERSITY,
    items: [
      {
        text: 'Overview',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MULTIVERSITY_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: 'Authentication',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MULTIVERSITY_URL}/auth`,
      },
      {
        text: COMMON_TITLES.CHANGELOG,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MULTIVERSITY_URL}/${COMMON_LINKS.CHANGELOG}`,
      },
    ],
  },
  {
    text: API_DOCS.REFERENCE,
    collapsed: true,
    items: [],
  },
];

// ================================
// MIM - MINISTERO DELL'ISTRUZIONE E DEL MERITO
// ================================
const mimSidebar: DefaultTheme.SidebarItem[] = [
  backToApiDocs,
  {
    text: API_DOCS.MIM,
    items: [
      {
        text: COMMON_TITLES.OVERVIEW,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MIM_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: 'Authentication',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MIM_URL}/auth`,
      },
      {
        text: COMMON_TITLES.CHANGELOG,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MIM_URL}/${COMMON_LINKS.CHANGELOG}`,
      },
    ],
  },
  {
    text: API_DOCS.REFERENCE,
    collapsed: true,
    items: [
      {
        text: 'Endpoints',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MIM_URL}/endpoints`,
      },
      {
        text: 'Datasets',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MIM_URL}/datasets`,
      },
    ],
  },
];

// ================================
// MUR - MINISTERO DELL'UNIVERSITÀ E DELLA RICERCA
// ================================
const murSidebar: DefaultTheme.SidebarItem[] = [
  backToApiDocs,
  {
    text: API_DOCS.MUR,
    items: [
      {
        text: COMMON_TITLES.OVERVIEW,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: 'Authentication',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/auth`,
      },
      {
        text: COMMON_TITLES.CHANGELOG,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${COMMON_LINKS.CHANGELOG}`,
      },
    ],
  },
  {
    text: API_DOCS.REFERENCE,
    collapsed: true,
    items: [
      {
        text: 'Activity',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${API_DOCS.BASE_URL}/activity-api-v3`,
      },
      {
        text: 'Dataset',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${API_DOCS.BASE_URL}/dataset-api-v3`,
      },
      {
        text: 'Datastore',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${API_DOCS.BASE_URL}/datastore-api-v3`,
      },
      {
        text: 'Groups & Organizations',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${API_DOCS.BASE_URL}/groups-organizations-api-v3`,
      },
      {
        text: 'Portal',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${API_DOCS.BASE_URL}/portal-api-v3`,
      },
      {
        text: 'Resources',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${API_DOCS.BASE_URL}/resources-api-v3`,
      },
      {
        text: 'Taxonomy',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${API_DOCS.BASE_URL}/taxonomy-api-v3`,
      },
    ],
  },
];

// ================================
// EDP - EUROPEAN DATA PORTAL
// ================================
const europeanDataPortalSidebar: DefaultTheme.SidebarItem[] = [
  backToApiDocs,
  {
    text: API_DOCS.EDP,
    items: [
      {
        text: COMMON_TITLES.OVERVIEW,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: 'Authentication',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/auth`,
      },
      {
        text: COMMON_TITLES.CHANGELOG,
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${COMMON_LINKS.CHANGELOG}`,
      },
    ],
  },
  {
    text: API_DOCS.REFERENCE,
    collapsed: true,
    items: [
      {
        text: '???',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${API_DOCS.BASE_URL}/mqa-api`,
      },
      {
        text: 'Registry',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${API_DOCS.BASE_URL}/registry-api`,
      },
      {
        text: 'Search',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${API_DOCS.BASE_URL}/search-api`,
      },
      {
        text: '???',
        link: `/${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${API_DOCS.BASE_URL}/sparql-api`,
      },
    ],
  },
];

// ================================
// APP PRIVATE APIs
// ================================
const privateApiSidebar: DefaultTheme.SidebarItem[] = [
  backToApiDocs,
  {
    text: 'App Private APIs',
    items: [
      {
        text: COMMON_TITLES.OVERVIEW,
        link: `/${API_DOCS.BASE_URL}/int-private/${COMMON_LINKS.OVERVIEW}`,
      },
      {
        text: COMMON_TITLES.CHANGELOG,
        link: `/${API_DOCS.BASE_URL}/int-private/${COMMON_LINKS.CHANGELOG}`,
      },
    ],
  },
];

// ================================
// EXPORT
// ================================
export const apiSidebar: DefaultTheme.SidebarMulti = {
  '/api/cineca/api-unimol/': cinecaSidebar,
  '/api/cineca/api-common/': cinecaSidebar,
  '/api/cineca/': cinecaSidebar,
  '/api/multiversity/': multiversitySidebar,
  '/api/mim/': mimSidebar,
  '/api/mur/': murSidebar,
  '/api/edp/': europeanDataPortalSidebar,
  '/api/int-private/': privateApiSidebar,
  '/api/': apiRootSidebar,
};
