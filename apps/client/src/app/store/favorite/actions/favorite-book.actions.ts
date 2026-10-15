import {createAction, props} from '@ngrx/store';
import {Book, ErrorResponse} from '@knigolub/shared';

export const loadFavoriteBooks = createAction('[App Component] Load Favorite Books');
export const loadFavoriteBooksSuccess = createAction('[App Component] Load Favorite Books Success',
  props<{ books: Book[] }>());
export const loadFavoriteBooksFailure = createAction('[App Component] Load Favorite Books Failure',
  props<{ error: ErrorResponse }>());

export const toggleFavoriteBook = createAction('[Book Card Component] Toggle Favorite Book',
  props<{ bookId: string }>());
export const toggleFavoriteBookSuccess = createAction('[Book Card Component] Toggle Favorite Book Success',
  props<{ book: Book }>());
export const toggleFavoriteBookFailure = createAction('[Book Card Component] Toggle Favorite Book Failure',
  props<{ error: ErrorResponse }>());
