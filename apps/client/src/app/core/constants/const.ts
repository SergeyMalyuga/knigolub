import {CategoryKey} from '../types/category-key';

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
  MINI_MOBILE: '(max-width: 680px)',
} as const;

export enum CategoryType {
  ALL = 'all',
  PROSE = 'prose',
  NON_FICTION = 'non‑fiction',
  FANTASTIC = 'fantastic',
  DETECTIVES = 'detectives',
  CLASSIC = 'classic',
  POETRY = 'poetry',
  CHILDREN = 'children'
}

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  [CategoryType.ALL]: 'Все книги',
  [CategoryType.PROSE]: 'Современная проза',
  [CategoryType.NON_FICTION]: 'Нон-фикшн',
  [CategoryType.FANTASTIC]: 'Фантастика',
  [CategoryType.DETECTIVES]: 'Детективы',
  [CategoryType.CLASSIC]: 'Классика',
  [CategoryType.POETRY]: 'Поэзия',
  [CategoryType.CHILDREN]: 'Детям',
}
