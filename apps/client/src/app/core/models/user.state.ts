import { AuthStatus } from '../constants/const';
import { ErrorResponse, User } from '@knigolub/shared';
import { UpdateUserStatus } from '../types/udate-user-status.type';

export interface UserState {
  authStatus: AuthStatus;
  user: User | null;
  error: ErrorResponse | null;
  isLoading: boolean;
  updateStatus: UpdateUserStatus;
}
