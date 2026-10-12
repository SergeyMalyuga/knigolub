import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';

const selectUserState = createFeatureSelector<AppState['user']>('user');

export const selectUserError = createSelector(selectUserState, (state) => state.error);

export const selectAuthStatus = createSelector(selectUserState, (state) => state.authStatus);
