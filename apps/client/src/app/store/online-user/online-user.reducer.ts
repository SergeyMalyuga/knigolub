import { createEntityAdapter } from '@ngrx/entity';
import { OnlineUser } from '@knigolub/shared';
import { OnlineUserState } from '../../core/models/online-user.state';
import { createReducer, on } from '@ngrx/store';
import { loadOnlineUsers, userWentOffline, userWentOnline } from './actions/online-user.actions';

export const onlineUserAdapter = createEntityAdapter<OnlineUser>();

const initialState: OnlineUserState = onlineUserAdapter.getInitialState();

export const onlineUserReducer = createReducer(
  initialState,
  on(loadOnlineUsers, (state, { onlineUsers }) => onlineUserAdapter.setAll(onlineUsers, state)),
  on(userWentOnline, (state, { user }) => onlineUserAdapter.setOne(user, state)),
  on(userWentOffline, (state, { userId }) => onlineUserAdapter.removeOne(userId, state)),
);
