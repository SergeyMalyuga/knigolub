import {createEntityAdapter} from '@ngrx/entity';
import {OnlineUser} from '@knigolub/shared';
import {UserOnlineState} from '../../core/models/user-online.state';
import {createReducer, on} from '@ngrx/store';
import {loadOnlineUsers, userWentOffline, userWentOnline} from './actions/user-online.actions';

export const userOnlineAdapter = createEntityAdapter<OnlineUser>();

const initialState: UserOnlineState = userOnlineAdapter.getInitialState();

export const userOnlineReducer = createReducer(
  initialState,
  on(loadOnlineUsers, (state, {onlineUsers}) =>
    userOnlineAdapter.setAll(onlineUsers, state)),
  on(userWentOnline, (state, {user}) =>
    userOnlineAdapter.setOne(user, state)),
  on(userWentOffline, (state, {userId}) =>
    userOnlineAdapter.removeOne(userId, state)));
