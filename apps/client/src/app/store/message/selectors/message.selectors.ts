import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {messageAdapter} from '../message.reducer';

const selectMessageState = createFeatureSelector<AppState['message']>('message');
const messageSelectors = messageAdapter.getSelectors(selectMessageState);

export const selectMessageStatus = createSelector(selectMessageState, (state) => state.status);
export const selectMessages = messageSelectors.selectAll;
