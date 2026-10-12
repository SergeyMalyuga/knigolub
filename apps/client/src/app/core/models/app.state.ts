import { BookState } from './book.state';
import { UserState } from './user.state';

export interface AppState {
  book: BookState;
  user: UserState;
}
