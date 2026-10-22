import { UserState } from '../../core/models/user.state';
import { AuthStatus, DEFAULT_USER, UpdateUserStatus } from '../../core/constants/const';
import { createReducer, on } from '@ngrx/store';
import {
  checkAuth,
  checkAuthFailure,
  checkAuthNoToken,
  checkAuthSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  registerUser,
  registerUserFailure,
  registerUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  uploadUserAvatar,
  uploadUserAvatarFailure,
  uploadUserAvatarSuccess,
} from './actions/user.actions';

const initialState: UserState = {
  authStatus: AuthStatus.UNKNOWN,
  user: DEFAULT_USER,
  error: null,
  isLoading: false,
  updateStatus: UpdateUserStatus.IDLE,
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
    authStatus: AuthStatus.UN_AUTH,
    error,
    isLoading: false,
  })),

  on(login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loginSuccess, (state, { userDto }) => ({
    ...state,
    authStatus: AuthStatus.AUTH,
    user: userDto.user,
    isLoading: false,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    authStatus: AuthStatus.UN_AUTH,
  })),

  on(checkAuth, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(checkAuthSuccess, (state, { user }) => ({
    ...state,
    authStatus: AuthStatus.AUTH,
    user,
    isLoading: false,
    error: null,
  })),
  on(checkAuthFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    authStatus: AuthStatus.UN_AUTH,
    error,
  })),
  on(checkAuthNoToken, (state) => ({
    ...state,
    isLoading: false,
    authStatus: AuthStatus.UN_AUTH,
  })),

  on(logout, (state) => ({
    ...state,
    authStatus: AuthStatus.UN_AUTH,
    user: DEFAULT_USER,
  })),

  on(uploadUserAvatar, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(uploadUserAvatarSuccess, (state, { response }) => ({
    ...state,
    user: state.user ? { ...state.user, avatarUrl: response.avatarUrl } : state.user,
    isLoading: false,
    error: null,
  })),
  on(uploadUserAvatarFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(updateUser, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    updateStatus: UpdateUserStatus.LOADING,
  })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false,
    error: null,
    updateStatus: UpdateUserStatus.SUCCESS,
  })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    updateStatus: UpdateUserStatus.ERROR,
  })),
);
