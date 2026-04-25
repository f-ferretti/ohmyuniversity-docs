import { defineConfig } from 'vitepress';
import {
  ORGANIZATION,
  REPOSITORY,
  PROJECT_DOCS,
  API_DOCS,
  CREDITS,
  COMMON_LINKS,
  COMMON_TITLES,
} from './constants';

export default defineConfig({
  title: REPOSITORY.NAME,
  description: `Open source University Data Platform by ${ORGANIZATION.NAME} - Docs, ${API_DOCS.MAIN_TITLE} & Project Specifications`,
  lang: 'en-US',

  srcDir: '.',
  outDir: '../dist',
  cleanUrls: true,

  // ================================
  // SEO & SOCIAL MEDIA META TAGS
  // ================================
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/omos-logo.png' }],
    ['meta', { name: 'theme-color', content: '#3451b2' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: REPOSITORY.NAME }],
    [
      'meta',
      {
        property: 'og:description',
        content: `Open source University Data Platform by ${ORGANIZATION.NAME} - Docs, ${API_DOCS.MAIN_TITLE} & Project Specifications`,
      },
    ],
  ],

  themeConfig: {
    logo: '/omos-logo.png',
    siteTitle: REPOSITORY.NAME,

    // ================================
    // TOP NAVIGATION
    // ================================
    nav: [
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
                text: 'UML Diagrams',
                link: `${PROJECT_DOCS.BASE_URL}/uml/${COMMON_LINKS.OVERVIEW}`,
              },
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
                text: 'App Private APIs',
                link: `${API_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
              },
            ],
          },
          {
            text: 'External APIs',
            items: [
              {
                text: 'ESSE3/CINECA',
                link: `${API_DOCS.BASE_URL}/cineca/${COMMON_LINKS.OVERVIEW}`,
              },
              {
                text: 'MIUR',
                link: `${API_DOCS.BASE_URL}/miur/${COMMON_LINKS.OVERVIEW}`,
              },
              {
                text: 'European Data Portal',
                link: `${API_DOCS.BASE_URL}/european-data-portal/${COMMON_LINKS.OVERVIEW}`,
              },
            ],
          },
        ],
      },

      // ================================
      // GitHub
      // ================================
      {
        text: 'GitHub',
        link: `${ORGANIZATION.BASE_URL}/${REPOSITORY.URL}`,
        target: '_blank',
      },
    ],

    // ================================
    // SIDEBARS
    // ================================
    sidebar: {
      // ================================
      // PROJECT DOCS
      // ================================
      '/project/': [
        {
          text: PROJECT_DOCS.MAIN_TITLE,
          items: [
            {
              text: COMMON_TITLES.OVERVIEW,
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
              text: 'UML Diagrams',
              link: `${PROJECT_DOCS.BASE_URL}/uml/${COMMON_LINKS.OVERVIEW}`,
            },
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
      // ================================
      // RAD
      // ================================
      '/project/rad/': [
        {
          text: '< Project Docs',
          link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
        },
        {
          text: PROJECT_DOCS.RAD,
          items: [
            {
              text: 'Overview',
              link: `${PROJECT_DOCS.BASE_URL}/rad/${COMMON_LINKS.OVERVIEW}`,
            },
          ],
        },
        {
          text: '1. Introduction',
          collapsed: true,
          items: [
            {
              text: '1. Introduction',
              link: `${PROJECT_DOCS.BASE_URL}/rad/1-introduction/1-introduction`,
            },
            {
              text: '1.1 Purpose of the System',
              link: `${PROJECT_DOCS.BASE_URL}/rad/1-introduction/1-1-purpose-of-the-system`,
            },
            {
              text: '1.2 Scope of the System',
              link: `${PROJECT_DOCS.BASE_URL}/rad/1-introduction/1-2-scope-of-the-system`,
            },
            {
              text: '1.3 Objectives & Success Criteria',
              link: `${PROJECT_DOCS.BASE_URL}/rad/1-introduction/1-3-objectives-and-success-criteria-of-the-project`,
            },
            {
              text: '1.4 Definitions, Acronyms & Abbreviations',
              link: `${PROJECT_DOCS.BASE_URL}/rad/1-introduction/1-4-definitions-acronyms-and-abbreviations`,
            },
            {
              text: '1.5 References',
              link: `${PROJECT_DOCS.BASE_URL}/rad/1-introduction/1-5-references`,
            },
            {
              text: '1.6 Overview',
              link: `${PROJECT_DOCS.BASE_URL}/rad/1-introduction/1-6-overview`,
            },
          ],
        },
        {
          text: '2. Current System',
          collapsed: true,
          items: [
            {
              text: '2. Current System',
              link: `${PROJECT_DOCS.BASE_URL}/rad/2-current-system/2-current-system`,
            },
          ],
        },
        {
          text: '3. Proposed System',
          collapsed: true,
          items: [
            {
              text: '3. Proposed System',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-proposed-system/3-proposed-system`,
            },
            {
              text: '3.1 Overview',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-1-overview`,
            },
            {
              text: '3.2 Functional Requirements',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-2-functional-requirements`,
            },
            {
              text: '3.3 Non-Functional Requirements',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-nonfunctional-requirements`,
            },
            {
              text: '3.3.1 Usability',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-1-usability`,
            },
            {
              text: '3.3.2 Reliability',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-2-reliability`,
            },
            {
              text: '3.3.3 Performance',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-3-performance`,
            },
            {
              text: '3.3.4 Supportability',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-4-supportability`,
            },
            {
              text: '3.3.5 Implementation',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-5-implementation`,
            },
            {
              text: '3.3.6 Interface',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-6-interface`,
            },
            {
              text: '3.3.7 Packaging',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-7-packaging`,
            },
            {
              text: '3.3.8 Legal',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-3-8-legal`,
            },
            {
              text: '3.4 System Models',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-4-system-models`,
            },
            {
              text: '3.4.1 Scenarios',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-4-1-scenarios`,
            },
            {
              text: '3.4.2 Use Case Model',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-4-2-use-case-model`,
            },
            {
              text: '3.4.3 Object Model',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-4-3-object-model`,
            },
            {
              text: '3.4.4 Dynamic Model',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-4-4-dynamic-model`,
            },
            {
              text: '3.4.5 UI-Navigational Paths & Screen Mockups',
              link: `${PROJECT_DOCS.BASE_URL}/rad/3-proposed-system/3-4-5-user-interface-navigational-paths-and-screen-mockups`,
            },
          ],
        },
        {
          text: '4. Glossary',
          collapsed: true,
          items: [
            {
              text: '4. Glossary',
              link: `${PROJECT_DOCS.BASE_URL}/rad/4-glossary/4-glossary`,
            },
          ],
        },
      ],

      // ================================
      // SDD
      // ================================
      '/project/sdd/': [
        {
          text: '< Project Docs',
          link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
        },
        {
          text: PROJECT_DOCS.SDD,
          items: [
            {
              text: 'Overview',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/${COMMON_LINKS.OVERVIEW}`,
            },
          ],
        },
        {
          text: '1. Introduction',
          collapsed: true,
          items: [
            {
              text: '1. Introduction',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/1-introduction/1-introduction`,
            },
            {
              text: '1.1 Purpose of the System',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/1-introduction/1-1-purpose-of-the-system`,
            },
            {
              text: '1.2 Design Goals',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/1-introduction/1-2-design-goals`,
            },
            {
              text: '1.3 Definitions, Acronyms & Abbreviations',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/1-introduction/1-3-definitions-acronyms-and-abbreviations`,
            },
            {
              text: '1.4 References',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/1-introduction/1-4-references`,
            },
            {
              text: '1.5 Overview',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/1-introduction/1-5-overview`,
            },
          ],
        },
        {
          text: '2. Current Software Architecture',
          collapsed: true,
          items: [
            {
              text: '2. Current Software Architecture',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/2-current-software-architecture/2-current-software-architecture`,
            },
          ],
        },
        {
          text: '3. Proposed Software Architecture',
          collapsed: true,
          items: [
            {
              text: '3. Proposed Software Architecture',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-proposed-software-architecture`,
            },
            {
              text: '3.1 Overview',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-1-overview`,
            },
            {
              text: '3.2 Subsystem Decomposition',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-2-subsystem-decomposition`,
            },
            {
              text: '3.3 Hardware/Software Mapping',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-3-hardware-software-mapping`,
            },
            {
              text: '3.4 Persistent Data Management',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-4-persistent-data-management`,
            },
            {
              text: '3.5 Access Control & Security',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-5-access-control-and-security`,
            },
            {
              text: '3.6 Global Software Control',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-6-global-software-control`,
            },
            {
              text: '3.7 Boundary Conditions',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/3-proposed-software-architecture/3-7-boundary-conditions`,
            },
          ],
        },
        {
          text: '4. Subsystems & Services',
          collapsed: true,
          items: [
            {
              text: '4. Subsystems & Services',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/4-subsystems-services/4-subsystems-services`,
            },
          ],
        },
        {
          text: '5. Glossary',
          collapsed: true,
          items: [
            {
              text: '5. Glossary',
              link: `${PROJECT_DOCS.BASE_URL}/sdd/5-glossary/5-glossary`,
            },
          ],
        },
      ],

      // ================================
      // ODD
      // ================================
      '/project/odd/': [
        {
          text: '< Project Docs',
          link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
        },
        {
          text: PROJECT_DOCS.ODD,
          items: [
            {
              text: 'Overview',
              link: `${PROJECT_DOCS.BASE_URL}/odd/${COMMON_LINKS.OVERVIEW}`,
            },
          ],
        },
        {
          text: '1. Introduction',
          collapsed: true,
          items: [
            {
              text: '1. Introduction',
              link: `${PROJECT_DOCS.BASE_URL}/odd/1-introduction/1-introduction`,
            },
            {
              text: '1.1 Object Design Trade-offs',
              link: `${PROJECT_DOCS.BASE_URL}/odd/1-introduction/1-1-object-design-trade-offs`,
            },
            {
              text: '1.2 Guidelines for Interface Documentation',
              link: `${PROJECT_DOCS.BASE_URL}/odd/1-introduction/1-2-guidelines-for-interface-documentation`,
            },
            {
              text: '1.3 Definitions, Acronyms & Abbreviations',
              link: `${PROJECT_DOCS.BASE_URL}/odd/1-introduction/1-3-definitions-acronyms-and-abbreviations`,
            },
            {
              text: '1.4 References',
              link: `${PROJECT_DOCS.BASE_URL}/odd/1-introduction/1-4-references`,
            },
          ],
        },
        {
          text: '2. Packages',
          collapsed: true,
          items: [
            {
              text: '2. Packages',
              link: `${PROJECT_DOCS.BASE_URL}/odd/2-packages/2-packages`,
            },
          ],
        },
        {
          text: '3. Class Interfaces',
          collapsed: true,
          items: [
            {
              text: '3. Class Interfaces',
              link: `${PROJECT_DOCS.BASE_URL}/odd/3-class-interfaces/3-class-interfaces`,
            },
          ],
        },
        {
          text: '4. Glossary',
          collapsed: true,
          items: [
            {
              text: '4. Glossary',
              link: `${PROJECT_DOCS.BASE_URL}/odd/4-glossary/4-glossary`,
            },
          ],
        },
      ],

      // ================================
      // UML
      // ================================
      '/project/uml/': [
        {
          text: '< Project Docs',
          link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
        },
        {
          text: 'UML Diagrams',
          items: [
            {
              text: 'Overview',
              link: `${PROJECT_DOCS.BASE_URL}/uml/${COMMON_LINKS.OVERVIEW}`,
            },
          ],
        },
        {
          text: 'Structural Diagrams',
          collapsed: false,
          items: [
            {
              text: 'Class Diagram',
              link: `${PROJECT_DOCS.BASE_URL}/uml/class-diagram`,
            },
            {
              text: 'Component Diagram',
              link: `${PROJECT_DOCS.BASE_URL}/uml/component-diagram`,
            },
            {
              text: 'Deployment Diagram',
              link: `${PROJECT_DOCS.BASE_URL}/uml/deployment-diagram`,
            },
          ],
        },
        {
          text: 'Behavioral Diagrams',
          collapsed: false,
          items: [
            {
              text: 'Use Case Diagram',
              link: `${PROJECT_DOCS.BASE_URL}/uml/use-case-diagram`,
            },
            {
              text: 'Sequence Diagrams',
              link: `${PROJECT_DOCS.BASE_URL}/uml/sequence-diagrams`,
            },
            {
              text: 'Activity Diagrams',
              link: `${PROJECT_DOCS.BASE_URL}/uml/activity-diagrams`,
            },
          ],
        },
      ],

      // ================================
      // TESTING
      // ================================
      '/project/testing/': [
        {
          text: '< Project Docs',
          link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
        },
        {
          text: 'Testing',
          items: [
            {
              text: 'Overview',
              link: `${PROJECT_DOCS.BASE_URL}/testing/${COMMON_LINKS.OVERVIEW}`,
            },
            {
              text: 'Test Plan',
              link: `${PROJECT_DOCS.BASE_URL}/testing/test-plan`,
            },
            {
              text: 'Test Strategy',
              link: `${PROJECT_DOCS.BASE_URL}/testing/test-strategy`,
            },
          ],
        },
        {
          text: 'Test Specifications',
          collapsed: false,
          items: [
            {
              text: 'Unit Tests',
              link: `${PROJECT_DOCS.BASE_URL}/testing/unit-tests`,
            },
            {
              text: 'Integration Tests',
              link: `${PROJECT_DOCS.BASE_URL}/testing/integration-tests`,
            },
            {
              text: 'End-to-End Tests',
              link: `${PROJECT_DOCS.BASE_URL}/testing/e2e-tests`,
            },
            {
              text: 'Performance Tests',
              link: `${PROJECT_DOCS.BASE_URL}/testing/performance-tests`,
            },
          ],
        },
      ],

      // ================================
      // USER MANUAL
      // ================================
      '/project/user-manual/': [
        {
          text: '< Project Docs',
          link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
        },
        {
          text: 'User Manual',
          items: [
            {
              text: 'Overview',
              link: `${PROJECT_DOCS.BASE_URL}/user-manual/${COMMON_LINKS.OVERVIEW}`,
            },
          ],
        },
        {
          text: 'Platform Guides',
          collapsed: false,
          items: [
            {
              text: 'Web Application',
              link: `${PROJECT_DOCS.BASE_URL}/user-manual/web-app`,
            },
            {
              text: 'Mobile Application',
              link: `${PROJECT_DOCS.BASE_URL}/user-manual/mobile-app`,
            },
          ],
        },
        {
          text: 'Support',
          collapsed: false,
          items: [
            { text: 'FAQ', link: `${PROJECT_DOCS.BASE_URL}/user-manual/faq` },
            {
              text: 'Troubleshooting',
              link: `${PROJECT_DOCS.BASE_URL}/user-manual/troubleshooting`,
            },
          ],
        },
      ],

      // ================================
      // GETTING STARTED
      // ================================
      '/getting-started/': [
        {
          text: COMMON_TITLES.GETTING_STARTED,
          items: [
            {
              text: 'Overview',
              link: `/${COMMON_LINKS.GETTING_STARTED}/${COMMON_LINKS.OVERVIEW}`,
            },
            { text: 'Setup', link: `/${COMMON_LINKS.GETTING_STARTED}/setup` },
            {
              text: 'API Quickstart',
              link: `/${COMMON_LINKS.GETTING_STARTED}/api`,
            },
            {
              text: 'Contributing',
              link: `/${COMMON_LINKS.GETTING_STARTED}/contribute`,
            },
          ],
        },
      ],

      // ================================
      // ARCHITECTURE
      // ================================
      '/architecture/': [
        {
          text: COMMON_TITLES.ARCHITECTURE,
          items: [
            {
              text: 'Overview',
              link: `/architecture/${COMMON_LINKS.OVERVIEW}`,
            },
            { text: 'System Context', link: '/architecture/system-context' },
          ],
        },
        {
          text: 'API Backend',
          collapsed: false,
          items: [
            {
              text: 'Overview',
              link: `/architecture/api/${COMMON_LINKS.OVERVIEW}`,
            },
            { text: 'API Design', link: '/architecture/api/api-design' },
            {
              text: COMMON_TITLES.ARCHITECTURE,
              link: '/architecture/api/architecture',
            },
            { text: 'Authentication', link: '/architecture/api/auth' },
            { text: 'Database', link: '/architecture/api/database' },
          ],
        },
        {
          text: 'Web App',
          collapsed: false,
          items: [
            {
              text: 'Overview',
              link: `/architecture/web/${COMMON_LINKS.OVERVIEW}`,
            },
            {
              text: COMMON_TITLES.ARCHITECTURE,
              link: '/architecture/web/architecture',
            },
            {
              text: 'State Management',
              link: '/architecture/web/state-management',
            },
            {
              text: 'Build & Deployment',
              link: '/architecture/web/build-deployment',
            },
          ],
        },
        {
          text: 'Mobile App',
          collapsed: true,
          items: [
            {
              text: 'Overview',
              link: `/architecture/mobile/${COMMON_LINKS.OVERVIEW}`,
            },
            {
              text: COMMON_TITLES.ARCHITECTURE,
              link: '/architecture/mobile/architecture',
            },
            {
              text: 'State & Navigation',
              link: '/architecture/mobile/state-navigation',
            },
            {
              text: 'Build & Release',
              link: '/architecture/mobile/build-release',
            },
          ],
        },
        {
          text: 'Desktop App',
          collapsed: true,
          items: [
            {
              text: 'Overview',
              link: `/architecture/desktop/${COMMON_LINKS.OVERVIEW}`,
            },
            {
              text: COMMON_TITLES.ARCHITECTURE,
              link: '/architecture/desktop/architecture',
            },
            { text: 'Packaging', link: '/architecture/desktop/packaging' },
          ],
        },
        {
          text: 'Shared',
          collapsed: true,
          items: [
            {
              text: 'API Contracts',
              link: '/architecture/shared/api-contracts',
            },
            { text: 'Conventions', link: '/architecture/shared/conventions' },
            { text: 'Data Models', link: '/architecture/shared/data-models' },
          ],
        },
      ],

      // ================================
      // API DOCS
      // ================================
      '/api/': [
        {
          text: API_DOCS.MAIN_TITLE,
          items: [
            {
              text: 'Overview',
              link: `${API_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
            },
            { text: 'Conventions', link: `${API_DOCS.BASE_URL}/conventions` },
          ],
        },
        {
          text: 'CINECA',
          collapsed: false,
          items: [
            {
              text: 'Overview',
              link: `${API_DOCS.BASE_URL}/cineca/${COMMON_LINKS.OVERVIEW}`,
            },
            {
              text: 'Authentication',
              link: `${API_DOCS.BASE_URL}/cineca/auth`,
            },
            {
              text: 'Endpoints',
              link: `${API_DOCS.BASE_URL}/cineca/endpoints`,
            },
            {
              text: 'Changelog',
              link: `${API_DOCS.BASE_URL}/cineca/changelog`,
            },
          ],
        },
        {
          text: 'MIUR',
          collapsed: false,
          items: [
            {
              text: 'Overview',
              link: `${API_DOCS.BASE_URL}/miur/${COMMON_LINKS.OVERVIEW}`,
            },
            { text: 'Authentication', link: `${API_DOCS.BASE_URL}/miur/auth` },
            { text: 'Endpoints', link: `${API_DOCS.BASE_URL}/miur/endpoints` },
            { text: 'Datasets', link: `${API_DOCS.BASE_URL}/miur/datasets` },
            { text: 'Changelog', link: `${API_DOCS.BASE_URL}/miur/changelog` },
          ],
        },
        {
          text: 'European Data Portal',
          collapsed: true,
          items: [
            {
              text: 'Overview',
              link: `${API_DOCS.BASE_URL}/european-data-portal/${COMMON_LINKS.OVERVIEW}`,
            },
            {
              text: 'Authentication',
              link: `${API_DOCS.BASE_URL}/european-data-portal/auth`,
            },
            {
              text: 'Endpoints',
              link: `${API_DOCS.BASE_URL}/european-data-portal/endpoints`,
            },
            {
              text: 'Changelog',
              link: `${API_DOCS.BASE_URL}/european-data-portal/changelog`,
            },
          ],
        },
      ],

      // ================================
      // GUIDES
      // ================================
      '/guides/': [
        {
          text: COMMON_TITLES.GUIDES,
          items: [
            {
              text: 'Data Sources Overview',
              link: `/${COMMON_LINKS.GUIDES}/data-sources-overview`,
            },
            {
              text: 'API Usage Patterns',
              link: `/${COMMON_LINKS.GUIDES}/api-usage-patterns`,
            },
          ],
        },
        {
          text: 'Data Sources',
          collapsed: false,
          items: [
            {
              text: 'CINECA Data Guide',
              link: `/${COMMON_LINKS.GUIDES}/cineca-data-guide`,
            },
            {
              text: 'MIUR Data Guide',
              link: `/${COMMON_LINKS.GUIDES}/miur-data-guide`,
            },
            {
              text: 'European Data Portal Guide',
              link: `/${COMMON_LINKS.GUIDES}/european-data-portal-guide`,
            },
          ],
        },
        {
          text: 'Data Engineering',
          collapsed: false,
          items: [
            {
              text: 'Common Data Issues',
              link: `/${COMMON_LINKS.GUIDES}/common-data-issues`,
            },
            {
              text: 'Data Cleaning Strategies',
              link: `/${COMMON_LINKS.GUIDES}/data-cleaning-strategies`,
            },
            {
              text: 'Dataset Normalization',
              link: `/${COMMON_LINKS.GUIDES}/dataset-normalization`,
            },
            {
              text: 'Mapping University Codes',
              link: `/${COMMON_LINKS.GUIDES}/mapping-university-codes`,
            },
            {
              text: 'Year Aggregation Rules',
              link: `/${COMMON_LINKS.GUIDES}/year-aggregation-rules`,
            },
          ],
        },
      ],
    },

    // ================================
    // SITE EXTRAS
    // ================================
    socialLinks: [
      {
        icon: 'github',
        link: `${ORGANIZATION.BASE_URL}/${REPOSITORY.URL}`,
      },
    ],

    footer: {
      message: `${REPOSITORY.LICENSE} · Icons by ${CREDITS.STREAMLINE}`,
      copyright: `Copyright © 2026 ${ORGANIZATION.NAME} - Guides, ${PROJECT_DOCS.MAIN_TITLE} & ${API_DOCS.MAIN_TITLE}`,
    },

    editLink: {
      pattern: `${ORGANIZATION.BASE_URL}/${REPOSITORY.URL}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },

    outline: {
      label: 'On this page',
      level: [2, 3],
    },

    returnToTopLabel: 'Back to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
  },
});
