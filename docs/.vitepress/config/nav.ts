import type { DefaultTheme } from 'vitepress';
import {
  ORGANIZATION,
  REPOSITORY,
  PROJECT_DOCS,
  API_DOCS,
  COMMON_LINKS,
  COMMON_TITLES,
} from '../constants';

export const nav: DefaultTheme.NavItem[] = [
  // ================================
  // Getting Started
  // ================================
  {
    text: COMMON_TITLES.GETTING_STARTED,
    link: `/${COMMON_LINKS.GETTING_STARTED}/${COMMON_LINKS.OVERVIEW}`,
  },

  // ================================
  // Architecture
  // ================================
  {
    text: COMMON_TITLES.ARCHITECTURE,
    link: `/architecture/${COMMON_LINKS.OVERVIEW}`,
  },

  // ================================
  // Guides
  // ================================
  {
    text: COMMON_TITLES.GUIDES,
    link: `/${COMMON_LINKS.GUIDES}/data-sources-overview`,
  },

  // ================================
  // Project Docs
  // ================================
  {
    text: PROJECT_DOCS.MAIN_TITLE,
    activeMatch: `${PROJECT_DOCS.BASE_URL}/`,
    items: [
      {
        text: `${PROJECT_DOCS.MAIN_TITLE} Overview`,
        items: [
          {
            text: 'Overview',
            link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
          },
        ],
      },
      {
        text: 'Formal Documents',
        items: [
          {
            text: PROJECT_DOCS.RAD,
            link: `${PROJECT_DOCS.BASE_URL}/rad/${COMMON_LINKS.OVERVIEW}`,
          },
          {
            text: PROJECT_DOCS.SDD,
            link: `${PROJECT_DOCS.BASE_URL}/sdd/${COMMON_LINKS.OVERVIEW}`,
          },
          {
            text: PROJECT_DOCS.ODD,
            link: `${PROJECT_DOCS.BASE_URL}/odd/${COMMON_LINKS.OVERVIEW}`,
          },
        ],
      },
      {
        text: 'Supporting Material',
        items: [
          {
            text: 'Test Plan',
            link: `${PROJECT_DOCS.BASE_URL}/testing/test-plan`,
          },
          {
            text: 'User Manual',
            link: `${PROJECT_DOCS.BASE_URL}/user-manual/${COMMON_LINKS.OVERVIEW}`,
          },
        ],
      },
    ],
  },

  // ================================
  // API DOCS
  // ================================
  {
    text: API_DOCS.MAIN_TITLE,
    activeMatch: `${API_DOCS.BASE_URL}/`,
    items: [
      {
        text: `${API_DOCS.MAIN_TITLE} Overview`,
        items: [
          {
            text: 'Overview',
            link: `${API_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
          },
          { text: 'Conventions', link: `${API_DOCS.BASE_URL}/conventions` },
        ],
      },
      {
        text: 'Internal APIs',
        items: [
          {
            text: 'Overview',
            link: `${API_DOCS.BASE_URL}/int-private/${COMMON_LINKS.OVERVIEW}`,
          },
        ],
      },
      {
        text: 'External APIs',
        items: [
          {
            text: API_DOCS.CINECA,
            link: `${API_DOCS.BASE_URL}/${API_DOCS.CINECA_URL}/${COMMON_LINKS.OVERVIEW}`,
          },
          {
            text: API_DOCS.MIM,
            link: `${API_DOCS.BASE_URL}/${API_DOCS.MIM_URL}/${COMMON_LINKS.OVERVIEW}`,
          },
          {
            text: API_DOCS.MUR,
            link: `${API_DOCS.BASE_URL}/${API_DOCS.MUR_URL}/${COMMON_LINKS.OVERVIEW}`,
          },
          {
            text: API_DOCS.EDP,
            link: `${API_DOCS.BASE_URL}/${API_DOCS.EDP_URL}/${COMMON_LINKS.OVERVIEW}`,
          },
        ],
      },
    ],
  },

  // ================================
  // Team
  // ================================
  { text: 'Team', link: '/team' },

  // ================================
  // GitHub
  // ================================
  {
    text: 'GitHub',
    link: `${ORGANIZATION.BASE_URL}/${REPOSITORY.URL}`,
    target: '_blank',
  },
];
