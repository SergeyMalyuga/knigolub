import {REVIEW_TYPES} from '../constants/const';
import {QueryParamsKeys} from './query-params-keys.type';

export type ReviewType = (typeof REVIEW_TYPES)[keyof typeof REVIEW_TYPES];

export type GetClubReviewsParams = Partial<Record<QueryParamsKeys, number>>;
