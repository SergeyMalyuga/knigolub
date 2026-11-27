import {createFeatureSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {userOnlineAdapter} from '../user-online.reducer';

const selectUserOnlineState =
  createFeatureSelector<AppState['onlineUsers']>('onlineUsers');

const userOnlineSelectors = userOnlineAdapter.getSelectors(selectUserOnlineState);

export const selectUsersOnline = userOnlineSelectors.selectAll;
export const selectUsersOnlineTotal = userOnlineSelectors.selectTotal;
