import type { DefaultTheme } from 'vitepress';
import {
  ORGANIZATION,
  REPOSITORY,
  PROJECT_DOCS,
  API_DOCS,
  CREDITS,
} from '../constants';

export const socialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: 'github',
    link: `${ORGANIZATION.BASE_URL}/${REPOSITORY.URL}`,
  },
];

export const footer: DefaultTheme.Footer = {
  message: `${REPOSITORY.LICENSE} · Icons by ${CREDITS.STREAMLINE}`,
  copyright: `Copyright © 2026-present ${ORGANIZATION.NAME} - Guides, ${PROJECT_DOCS.MAIN_TITLE} & ${API_DOCS.MAIN_TITLE}`,
};

export const editLink: DefaultTheme.EditLink = {
  pattern: `${ORGANIZATION.BASE_URL}/${REPOSITORY.URL}/edit/main/docs/:path`,
  text: 'Edit this page on GitHub',
};

export const search: DefaultTheme.Config['search'] = {
  provider: 'local',
};

export const lastUpdated: DefaultTheme.LastUpdatedOptions = {
  text: 'Last updated',
  formatOptions: {
    dateStyle: 'medium',
    timeStyle: 'short',
  },
};

export const docFooter: DefaultTheme.DocFooter = {
  prev: 'Previous page',
  next: 'Next page',
};

export const outline: DefaultTheme.Outline = {
  label: 'On this page',
  level: [2, 3],
};
