import { ACTIVE_OPERATION } from '../constants/const';

export type ActiveOperation = (typeof ACTIVE_OPERATION)[keyof typeof ACTIVE_OPERATION];
