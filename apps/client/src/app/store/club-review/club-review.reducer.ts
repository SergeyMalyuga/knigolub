import { createEntityAdapter } from '@ngrx/entity';
import { ClubReview } from '@knigolub/shared';
import { createReducer, on } from '@ngrx/store';
import {
  createClubReview,
  createClubReviewFailure,
  createClubReviewSuccess,
  resetClubReviewStatus,
} from './actions/club-review.actions';
import { ClubReviewState } from '../../core/models/club-review.state';
import { ACTIVE_OPERATION, OPERATION_STATUS } from '../../core/constants/const';

export const clubReviewAdapter = createEntityAdapter<ClubReview>();

const initialState: ClubReviewState = clubReviewAdapter.getInitialState({
  activeOperation: ACTIVE_OPERATION.IDLE,
  status: OPERATION_STATUS.IDLE,
  error: null,
});

export const clubReviewReducer = createReducer(
  initialState,
  on(createClubReview, (state) => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.CREATE,
    status: OPERATION_STATUS.LOADING,
    error: null,
  })),
  on(createClubReviewSuccess, (state, { clubReview }) =>
    clubReviewAdapter.addOne(clubReview, {
      ...state,
      activeOperation: ACTIVE_OPERATION.IDLE,
      status: OPERATION_STATUS.SUCCESS,
      error: null,
    }),
  ),
  on(createClubReviewFailure, (state, { error }) => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.IDLE,
    status: OPERATION_STATUS.ERROR,
    error,
  })),

  on(resetClubReviewStatus, (state) => ({
    ...state,
    status: OPERATION_STATUS.IDLE,
  })),
);
