import { AuthStatus } from '../constants/const';
import { ErrorResponse, User } from '@knigolub/shared';

export interface UserState {
  authStatus: AuthStatus;
  user: User | null;
  error: ErrorResponse | null;
  isLoading: boolean;
}
