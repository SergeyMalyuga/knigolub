import {createEntityAdapter} from '@ngrx/entity';
import {ClubReview} from '@knigolub/shared';
import {combineReducers, createReducer} from '@ngrx/store';

export const clubReviewAdapter = createEntityAdapter<ClubReview>();

const initialState = clubReviewAdapter.getInitialState({
  isLoading: false,
  error: null,
});

export const clubReviewReducer = createReducer(initialState);

