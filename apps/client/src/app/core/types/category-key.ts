import {CategoryType} from '../constants/const';

export type CategoryKey = typeof CategoryType[keyof typeof CategoryType];
