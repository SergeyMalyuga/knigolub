import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { onlineUserAdapter } from '../online-user.reducer';

const selectUserOnlineState = createFeatureSelector<AppState['onlineUsers']>('onlineUsers');

const onlineUserSelectors = onlineUserAdapter.getSelectors(selectUserOnlineState);

export const selectUsersOnline = onlineUserSelectors.selectAll;
export const selectUsersOnlineTotal = onlineUserSelectors.selectTotal;
