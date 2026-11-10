import { createAction, props } from '@ngrx/store';
import { CreateClubReviewInput } from '../../../core/types/create-club-review-input.type';
import { ClubReview, ErrorResponse } from '@knigolub/shared';
import { UpdateClubReviewInput } from '../../../core/types/update-club-review-input.type';

export const loadClubReviews = createAction('[App Component] Load Club Reviews');
export const loadClubReviewsSuccess = createAction(
  '[Club Review Effects] Load Club Reviews Success',
  props<{ clubReviews: ClubReview[] }>(),
);
export const loadClubReviewsFailure = createAction(
  '[Club Review Effects] Load Club Review Failure',
  props<{ error: ErrorResponse }>(),
);

export const loadUserClubReview = createAction('[User Effects] Load User Club Review');
export const loadUserClubReviewSuccess = createAction(
  '[User Effects] Load User Club Review Success',
  props<{ clubReview: ClubReview | null }>(),
);
export const loadUserClubReviewFailure = createAction(
  '[User Effects] Load User Club Review Failure',
  props<{ error: ErrorResponse }>(),
);

export const createClubReview = createAction(
  '[Review Dialog Component] Create Club Review',
  props<{ input: CreateClubReviewInput }>(),
);
export const createClubReviewSuccess = createAction(
  '[Club Review Effects] Create Club Review Success',
  props<{ clubReview: ClubReview }>(),
);
export const createClubReviewFailure = createAction(
  '[Club Review Effects] Create Club Review Failure',
  props<{ error: ErrorResponse }>(),
);

export const updateUserClubReview = createAction(
  '[Review Dialog Component] Update Club Review',
  props<{ input: UpdateClubReviewInput; reviewId: string }>(),
);
export const updateUserClubReviewSuccess = createAction(
  '[Club Review Effects] Update Club Review Success',
  props<{ clubReview: ClubReview }>(),
);
export const updateUserClubReviewFailure = createAction(
  '[Club Review Effects] Update Club Review Failure',
  props<{ error: ErrorResponse }>(),
);

export const resetClubReviewStatus = createAction(
  '[Review Dialog Component] Reset Club Review Status',
);

export const resetClubReviewActiveOperation = createAction(
  '[Review Dialog Component] Reset Club Review Active Operation]',
);
