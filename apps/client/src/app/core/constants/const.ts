export enum AppRoute {
  MAIN = ''
}

export enum Section {
  MAIN = 'main',
  CATALOG = 'catalog',
  COLLECTION = 'collection',
  COMMUNITY = 'community',
  REVIEWS = 'reviews',
}

export const BREAKPOINTS = {
  TABLET: '(max-width: 980px)',
  MOBILE: '(max-width: 855px)',
} as const;
