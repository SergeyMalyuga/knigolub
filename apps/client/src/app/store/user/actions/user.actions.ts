import { createAction, props } from '@ngrx/store';
import {
  AvatarResponse,
  Credential,
  ErrorResponse,
  NewUser,
  UpdateUser,
  User,
  UserDto,
} from '@knigolub/shared';
import { updateUserDto } from '../../../core/models/update-user.dto';

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

export const login = createAction('[Login Component] Login', props<{ credential: Credential }>());
export const loginSuccess = createAction(
  '[User Effects] Login Success',
  props<{ userDto: UserDto }>(),
);
export const loginFailure = createAction(
  '[User Effects] Login Failure',
  props<{ error: ErrorResponse }>(),
);

export const checkAuth = createAction('[App Component] Check Auth');
export const checkAuthSuccess = createAction(
  '[App Component] Check Auth Success',
  props<{ user: User }>(),
);
export const checkAuthFailure = createAction(
  '[App Component] Check Auth Failure',
  props<{ error: ErrorResponse }>(),
);
export const checkAuthNoToken = createAction('[Auth] Check Auth — No Token');

export const logout = createAction('[Header Component] Logout');

export const uploadUserAvatar = createAction('[User] Upload Avatar', props<{ file: File }>());
export const uploadUserAvatarSuccess = createAction(
  '[User Effects] Upload Avatar Success',
  props<{ response: AvatarResponse }>(),
);
export const uploadUserAvatarFailure = createAction(
  '[User Effects] Upload Avatar Failure',
  props<{ error: ErrorResponse }>(),
);

export const updateUser = createAction(
  '[Profile Component] Update User',
  props<{ updateUserDto: updateUserDto }>(),
);
export const updateUserSuccess = createAction(
  '[User Effects] Update User Success',
  props<{ user: User }>(),
);
export const updateUserFailure = createAction(
  '[User Effects] Update User Failure',
  props<{ error: ErrorResponse }>(),
);
