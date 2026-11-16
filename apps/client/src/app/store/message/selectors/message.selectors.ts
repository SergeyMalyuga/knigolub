import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';

const selectMessageState = createFeatureSelector<AppState['message']>('message');

export const selectMessageStatus = createSelector(selectMessageState, (state) => state.status);
