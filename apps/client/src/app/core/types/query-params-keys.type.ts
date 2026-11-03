import { QUERY_PARAMS_KEYS } from '../constants/const';

export type QueryParamsKeys = (typeof QUERY_PARAMS_KEYS)[keyof typeof QUERY_PARAMS_KEYS];
