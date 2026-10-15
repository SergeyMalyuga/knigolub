import { ActionReducerMap } from '@ngrx/store';
import { bookReducer } from '../book/book.reducer';
import { AppState } from '../../core/models/app.state';
import { userReducer } from '../user/user.reducer';
import {favoriteBookReducer} from '../favorite/favorite-book.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  book: bookReducer,
  user: userReducer,
  favoriteBook: favoriteBookReducer,
};
