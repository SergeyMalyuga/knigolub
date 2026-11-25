import {createEntityAdapter} from '@ngrx/entity';
import {OnlineUser} from '@knigolub/shared';
import {UserOnlineState} from '../../core/models/user-online.state';
import {createReducer, on} from '@ngrx/store';
import {loadOnlineUsers} from './actions/user-online.actions';

export const onlineUserAdapter = createEntityAdapter<OnlineUser>();

const initialState: UserOnlineState = onlineUserAdapter.getInitialState();

export const userOnlineReducer = createReducer(
  initialState,
  on(loadOnlineUsers, (state, {onlineUsers}) =>
    onlineUserAdapter.setAll(onlineUsers, state))
  );
