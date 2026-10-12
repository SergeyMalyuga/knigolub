import { ActionReducerMap } from '@ngrx/store';
import { bookReducer } from '../book/book.reducer';
import {AppState} from '../../core/models/app.state';

export const appReducer: ActionReducerMap<AppState> = {
  book: bookReducer,
};
