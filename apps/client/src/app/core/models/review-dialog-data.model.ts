import {ReviewType} from '../types/review.type';
import {Book} from '@knigolub/shared';

export interface ReviewDialogData {
  reviewType: ReviewType;
  book: Book | null;
}
