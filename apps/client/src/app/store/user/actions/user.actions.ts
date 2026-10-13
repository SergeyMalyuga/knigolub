import {createAction, props} from '@ngrx/store';
import {Credential, ErrorResponse, NewUser, User, UserDto} from '@knigolub/shared';

export const registerUser = createAction(
  '[Auth Component] Register User',
  props<{ newUser: NewUser }>(),
);
export const registerUserSuccess = createAction(
  '[User Effects] Register Success',
  props<{ userDto: UserDto }>(),
);
export const registerUserFailure = createAction(
  '[User Effects] Register Failure',
  props<{ error: ErrorResponse }>(),
);

export const login = createAction('[Login Component] Login',
  props<{ credential: Credential }>());
export const loginSuccess = createAction('[User Effects] Login Success',
  props<{ userDto: UserDto }>());
export const loginFailure = createAction('[User Effects] Login Failure',
  props<{ error: ErrorResponse }>());


export const checkAuth = createAction('[App Component] Check Auth');
export const checkAuthSuccess = createAction('[App Component] Check Auth Success',
  props<{ user: User }>());
export const checkAuthFailure = createAction('[App Component] Check Auth Failure',
  props<{ error: ErrorResponse }>());

export const logout = createAction('[Header Component] Logout');

