import {createEntityAdapter} from '@ngrx/entity';
import {Book} from '@knigolub/shared/src/models/book';
import {BookState} from '../../models/book.state';
import {DEFAULT_PAGINATION} from '../../app/core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {loadBooks, loadBooksFailure, loadBooksSuccess} from './actions/book.actions';

export const bookAdapter = createEntityAdapter<Book>();

const initialState: BookState = bookAdapter.getInitialState(
  {
    pagination: DEFAULT_PAGINATION,
    isLoading: false,
    error: null,
  }
);

export const bookReducer = createReducer(
  initialState,
  on(loadBooks, state => ({
    ...state, isLoading: true
  })),
  on(loadBooksSuccess, (state, {books, pagination}) =>
    bookAdapter.setAll(books, {...state, pagination, isLoading: false, error: null})
  ),
  on(loadBooksFailure, (state, {error}) => ({
    ...state, isLoading: false, error
  }))
);
