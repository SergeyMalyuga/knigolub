import {createAction, props} from '@ngrx/store';
import {CreateClubReviewInput} from '../../../core/types/create-club-review-input.type';
import {ClubReview, ErrorResponse} from '@knigolub/shared';

export const createClubReview =
  createAction('[Review Dialog Component] Create Club Review', props<{ input: CreateClubReviewInput }>());
export const createClubReviewSuccess =
  createAction('[Club Review Effects] Create Club Review Success', props<{ clubReview: ClubReview }>());
export const createClubReviewFailure =
  createAction('[Club Review Effects] Create Club Review Failure', props<{ error: ErrorResponse }>());
