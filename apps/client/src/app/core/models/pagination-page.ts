import { PaginationType } from '../constants/const';

export interface PaginationPage {
  type: PaginationType.PAGE;
  value: number;
}
