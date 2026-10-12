import {createAction, props} from '@ngrx/store';
import {NewUser} from '../../../core/models/new-user';
import {ErrorResponse, UserDto} from '@knigolub/shared';

export const registerUser = createAction('[Auth Component] Register User',
  props<{ newUser: NewUser }>());
export const registerUserSuccess = createAction('[User Effects] Register Success',
  props<{ userDto: UserDto }>());
export const registerUserFailure = createAction('[User Effects] Register Failure',
  props<{ error: ErrorResponse }>());
