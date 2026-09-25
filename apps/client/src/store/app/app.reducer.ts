import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../models/app.state';
import { bookReducer } from '../book/book.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  book: bookReducer,
};
