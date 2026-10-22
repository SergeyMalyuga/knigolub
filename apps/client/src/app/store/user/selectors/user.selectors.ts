import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { UserEdit } from '../../../core/models/user-edit.model';

const selectUserState = createFeatureSelector<AppState['user']>('user');

export const selectUserError = createSelector(selectUserState, (state) => state.error);

export const selectAuthStatus = createSelector(selectUserState, (state) => state.authStatus);

export const selectUserAvatar = createSelector(selectUserState, (state) => state.user?.avatarUrl);

export const selectUserName = createSelector(selectUserState, (state) => state.user?.username);

export const selectRegistrationDate = createSelector(
  selectUserState,
  (state) => state.user?.registrationAt,
);

export const selectUpdateUserStatus = createSelector(
  selectUserState,
  (state) => state.updateStatus,
);

export const selectUserInfo = createSelector(selectUserState, (state) => {
  return {
    username: state.user?.username,
    email: state.user?.email,
    avatarUrl: state.user?.avatarUrl,
  };
});

export const selectUserPersonalInfo = createSelector(selectUserState, (state): UserEdit => {
  return {
    lastName: state.user?.lastName ?? '',
    firstName: state.user?.firstName ?? '',
    birthday: state.user?.birthday?.toString() ?? '',
    bio: state.user?.bio ?? '',
  };
});
