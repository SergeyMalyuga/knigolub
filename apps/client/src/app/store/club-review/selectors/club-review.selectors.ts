import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';

const selectClubReviewState = createFeatureSelector<AppState['clubReview']>('clubReview');

export const selectClubReviewStatus = createSelector(
  selectClubReviewState,
  (state) => state.status,
);

export const selectUserClubReview = createSelector(
  selectClubReviewState,
  (state) => state.userReview,
);

export const selectClubReviewActiveOperation = createSelector(
  selectClubReviewState,
  state => state.activeOperation,
)
