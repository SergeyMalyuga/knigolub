import { BookState } from './book.state';
import { UserState } from './user.state';
import { FavoriteBookState } from './favorite-book.state';

export interface AppState {
  book: BookState;
  user: UserState;
  favoriteBook: FavoriteBookState;
}
