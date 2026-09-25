import { CategoryKey } from '../types/category-key';
import { ViewKey } from '../types/view-key';
import { PaginationMeta } from '@knigolub/shared/src/models/pagination-meta';

export enum AppRoute {
  MAIN = '',
}

export const BASE_URL = 'http://localhost:3000';

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
  CHILDREN = 'children',
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
};

export enum View {
  GRID = 'grid',
  LIST = 'list',
  SLIDER = 'slider',
}

export const VIEW_LABELS: Record<ViewKey, string> = {
  [View.GRID]: 'Сетка',
  [View.LIST]: 'Список',
  [View.SLIDER]: 'Слайдер',
};

export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGINATION: PaginationMeta = {
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  hasNextPage: false,
  hasPrevPage: false,
};
