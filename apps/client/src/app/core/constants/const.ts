import { CategoryKey } from '../types/category-key';
import { ViewKey } from '../types/view-key';
import { PaginationMeta } from '@knigolub/shared';
import { UserEdit } from '../models/user-edit.model';

export enum AppRoute {
  MAIN = '',
  LOGIN = 'login',
  PROFILE = 'profile',
  FAVORITE = 'favorite',
}

export enum APIRoute {
  USER_REGISTER = 'users/register',
  USER_LOGIN = 'users/login',
  USER_UPDATE_AVATAR = 'users/avatar',
  PROFILE = 'users/profile',
  PROFILE_UPDATE = 'users/profile/update',
  FAVORITES_TOGGLE = 'favorites/toggle',
  FAVORITES_LIST = 'favorites',
}

export const BASE_URL = 'http://localhost:3000';

export enum Section {
  MAIN = 'main',
  CATALOG = 'catalog',
  COLLECTION = 'collection',
  COMMUNITY = 'community',
  REVIEWS = 'reviews',
  SUBSCRIBE = 'subscribe',
}

export const BREAKPOINTS = {
  TABLET: '(max-width: 980px)',
  MOBILE: '(max-width: 855px)',
  UPDATE_ACCORDION: '(max-width: 767px)',
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
  shown: 0,
};

export enum PaginationType {
  PAGE = 'page',
  ELLIPSIS = 'ellipsis',
}

export enum AuthFormType {
  Login = 'login',
  Register = 'register',
}

export enum AuthStatus {
  AUTH = 'authenticated',
  UN_AUTH = 'unauthorized',
  UNKNOWN = 'unknown',
}

export const AVATAR_ERROR = {
  SIZE: 'Файл большой (максимум 5 МБ)',
  FORMAT: 'Только изображения',
} as const;

export enum FileType {
  IMAGE = 'image',
}

export const UpdateUserStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export const AVATAR_MAX_SIZE = 5 * 1024 * 1024;

export const DEFAULT_USER = null;

export const AUTH_TOKEN_KEY_NAME = 'auth-token';

export const DEFAULT_AVATAR_URL = '/assets/images/vector/avatar.svg';

export const MAX_BIO_LENGTH = 450;
