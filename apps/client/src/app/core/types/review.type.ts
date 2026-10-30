import {REVIEW_TYPES} from '../constants/const';

export type ReviewType = typeof REVIEW_TYPES[keyof typeof REVIEW_TYPES];
