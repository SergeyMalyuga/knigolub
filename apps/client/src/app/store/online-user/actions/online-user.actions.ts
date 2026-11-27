import {createAction, props} from '@ngrx/store';
import {OnlineUser} from '@knigolub/shared';

export const loadOnlineUsers = createAction(
  '[User Online Socket Effects] Load Online Users', props<{ onlineUsers: OnlineUser[] }>())

export const userWentOnline = createAction(
  '[User Online  Socket] User Went Online',
  props<{ user: OnlineUser }>(),
);

export const userWentOffline = createAction(
  '[User Online  Socket] User Went Offline',
  props<{ userId: string }>(),
);
