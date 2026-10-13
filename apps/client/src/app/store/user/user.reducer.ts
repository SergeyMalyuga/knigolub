import { UserState } from '../../core/models/user.state';
import { AuthStatus, USER_DEFAULT } from '../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailure,
  loginSuccess,
  registerUser,
  registerUserFailure,
  registerUserSuccess
} from './actions/user.actions';

const initialState: UserState = {
  authStatus: AuthStatus.UNKNOWN,
  user: USER_DEFAULT,
  error: null,
  isLoading: false,
};

export const userReducer = createReducer(
  initialState,
  on(registerUser, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(registerUserSuccess, (state, { userDto }) => ({
    ...state,
    authStatus: AuthStatus.AUTH,
    user: userDto.user,
    error: null,
    isLoading: false,
  })),
  on(registerUserFailure, (state, { error }) => ({
    ...state,
    authStatus: AuthStatus.UNKNOWN,
    error,
    isLoading: false,
  })),

  on(login, state => ({
    ...state, isLoading: true, error: null,
  })),
  on(loginSuccess, (state, {userDto}) => ({
    ...state, authStatus: AuthStatus.AUTH, user: userDto.user, isLoading: false, error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state, isLoading: false, error,
  }))
);
