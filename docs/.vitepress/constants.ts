export const ORGANIZATION = {
  NAME: 'OhMyOpenSource!',
  BASE_URL: 'https://github.com/ohmyopensource',
} as const;

export const REPOSITORY = {
  NAME: 'OhMyUniversity!',
  DESC: 'A comprehensive documentation project for the OhMyUniversity! application, covering all aspects of the software development lifecycle, including requirements analysis, system design, and object design.',
  URL: 'ohmyuniversity-docs',
  LICENSE: 'Released under the AGPL-3.0 License.',
} as const;

export const API_DOCS = {
  MAIN_TITLE: 'API Docs',
  BASE_URL: '/api',
  CINECA: 'ESSE3/CINECA',
  MIUR: 'MIUR',
  EUROPEAN: 'European Data Portal',
} as const;

export const PROJECT_DOCS = {
  MAIN_TITLE: 'Project Docs',
  BASE_URL: '/project',
  RAD: 'RAD - Requirements Analysis Document',
  SDD: 'SDD - System Design Document',
  ODD: 'ODD - Object Design Document',
} as const;

export const COMMON_TITLES = {
  GETTING_STARTED: 'Getting Started',
  ARCHITECTURE: 'App Architecture',
  OVERVIEW: 'Overview',
  GUIDES: 'Guides',
} as const;

export const COMMON_LINKS = {
  GETTING_STARTED: 'getting-started',
  ARCHITECTURE: 'architecture',
  OVERVIEW: 'overview',
  GUIDES: 'guides',
} as const;

export const CREDITS = {
  STREAMLINE:
    '<a href="https://streamlinehq.com" target="_blank" rel="noopener noreferrer">Streamline</a>',
} as const;
