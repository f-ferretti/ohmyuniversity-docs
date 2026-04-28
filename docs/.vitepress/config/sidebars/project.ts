import type { DefaultTheme } from 'vitepress';
import { PROJECT_DOCS, COMMON_LINKS, COMMON_TITLES } from '../../constants';

// ================================
// SHARED BACK LINK
// ================================
const backToProjectDocs: DefaultTheme.SidebarItem = {
  text: '< Project Docs',
  link: `${PROJECT_DOCS.BASE_URL}/${COMMON_LINKS.OVERVIEW}`,
};

export const projectSidebar: DefaultTheme.SidebarMulti = {
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
    backToProjectDocs,
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
    backToProjectDocs,
    {
      text: PROJECT_DOCS.SDD,
      items: [
        {
          text: 'Overview',
          link: `${PROJECT_DOCS.BASE_URL}/sdd/${COMMON_LINKS.OVERVIEW}`,
        },
        {
          text: 'Changelog',
          link: `${PROJECT_DOCS.BASE_URL}/sdd/${COMMON_LINKS.CHANGELOG}`,
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
    backToProjectDocs,
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
  // TESTING
  // ================================
  '/project/testing/': [
    backToProjectDocs,
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
    backToProjectDocs,
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
};
