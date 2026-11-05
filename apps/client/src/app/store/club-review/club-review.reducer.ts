import {createEntityAdapter} from '@ngrx/entity';
import {ClubReview} from '@knigolub/shared';
import {createReducer, on} from '@ngrx/store';
import {
  createClubReview,
  createClubReviewFailure,
  createClubReviewSuccess, loadClubReviews, loadClubReviewsFailure, loadClubReviewsSuccess, loadUserClubReview,
  loadUserClubReviewFailure,
  loadUserClubReviewSuccess,
  resetClubReviewStatus,
} from './actions/club-review.actions';
import {ClubReviewState} from '../../core/models/club-review.state';
import {ACTIVE_OPERATION, OPERATION_STATUS} from '../../core/constants/const';
import {logout} from '../user/actions/user.actions';

export const clubReviewAdapter = createEntityAdapter<ClubReview>();

const initialState: ClubReviewState = clubReviewAdapter.getInitialState({
  activeOperation: ACTIVE_OPERATION.IDLE,
  userReview: null,
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
  on(createClubReviewSuccess, (state, {clubReview}) =>
    clubReviewAdapter.addOne(clubReview, {
      ...state,
      activeOperation: ACTIVE_OPERATION.IDLE,
      status: OPERATION_STATUS.SUCCESS,
      userReview: clubReview,
      error: null,
    }),
  ),
  on(createClubReviewFailure, (state, {error}) => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.IDLE,
    status: OPERATION_STATUS.ERROR,
    error,
  })),

  on(loadClubReviews, state => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.LOAD,
    status: OPERATION_STATUS.LOADING,
    error: null,
  })),
  on(loadClubReviewsSuccess, (state, {clubReviews}) =>
    clubReviewAdapter.setAll(clubReviews, {
      ...state,
      error: null,
      activeOperation: ACTIVE_OPERATION.IDLE,
      status: OPERATION_STATUS.IDLE
    })
  ),
  on(loadClubReviewsFailure, (state, {error}) => ({
    ...state,
    error, activeOperation: ACTIVE_OPERATION.IDLE,
    status: OPERATION_STATUS.ERROR,
  })),

  on(loadUserClubReview, state => ({
    ...state,
    activeOperation: ACTIVE_OPERATION.LOAD,
    status: OPERATION_STATUS.LOADING,
    error: null,
  })),
  on(loadUserClubReviewSuccess, (state, {clubReview}) => ({
    ...state,
    userReview: clubReview,
    activeOperation: ACTIVE_OPERATION.IDLE,
    status: OPERATION_STATUS.IDLE,
    error: null,
  })),
  on(loadUserClubReviewFailure, (state, {error}) => ({
    ...state,
    error,
    activeOperation: ACTIVE_OPERATION.IDLE,
    status: OPERATION_STATUS.ERROR,
  })),

  on(resetClubReviewStatus, (state) => ({
    ...state,
    status: OPERATION_STATUS.IDLE,
  })),

  on(logout, state => ({...state, userReview: null}))
);
