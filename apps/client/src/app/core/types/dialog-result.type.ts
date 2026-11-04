import {DIALOG_RESULT} from '../constants/const';

export type DialogResult = typeof DIALOG_RESULT[keyof typeof DIALOG_RESULT];
