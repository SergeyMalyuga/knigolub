import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';

const selectClubReviewState =
  createFeatureSelector<AppState['clubReview']>('clubReview');

export const selectClubReviewStatus = createSelector(
  selectClubReviewState,
  state => state.status
);
