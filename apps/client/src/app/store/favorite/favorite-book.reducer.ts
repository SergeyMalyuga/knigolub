import {createEntityAdapter} from '@ngrx/entity';
import {Book} from '@knigolub/shared';
import {FavoriteBookState} from '../../core/models/favorite-book.state';
import {createReducer, on} from '@ngrx/store';
import {
  loadFavoriteBooks,
  loadFavoriteBooksFailure,
  loadFavoriteBooksSuccess,
  toggleFavoriteBook, toggleFavoriteBookFailure, toggleFavoriteBookSuccess
} from './actions/favorite-book.actions';
import {logout} from '../user/actions/user.actions';

export const favoriteBookAdapter = createEntityAdapter<Book>();

const initialState: FavoriteBookState = favoriteBookAdapter.getInitialState({
  isLoading: false,
  error: null,
  togglingBookId: null
});

export const favoriteBookReducer = createReducer(
  initialState,

  on(loadFavoriteBooks, (state) => ({
    ...state, isLoading: true, error: null,
  })),
  on(loadFavoriteBooksSuccess, (state, {books}) =>
    favoriteBookAdapter.setAll(books, {...state, isLoading: false, error: null})),
  on(loadFavoriteBooksFailure, (state, {error}) => ({
    ...state, isLoading: false, error,
  })),

  on(toggleFavoriteBook, (state, {bookId}) => ({
    ...state, togglingBookId: bookId, error: null,
  })),
  on(toggleFavoriteBookSuccess, (state, {book}) => {
    if (book.isFavorite) {
      return favoriteBookAdapter.setOne(book, {...state, togglingBookId: null, error: null});
    }
    return favoriteBookAdapter.removeOne(book.id, {...state, togglingBookId: null, error: null});
  }),
  on(toggleFavoriteBookFailure, (state, {error}) => ({
    ...state, togglingBookId: null, error,
  })),

  on(logout, state =>
    favoriteBookAdapter.removeAll(state) )
);
