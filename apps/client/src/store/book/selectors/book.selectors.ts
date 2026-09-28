import {createFeatureSelector, createSelector} from '@ngrx/store';
import { AppState } from '../../../models/app.state';
import { bookAdapter } from '../book.reducer';

const selectBookState = createFeatureSelector<AppState['book']>('book');
const bookSelectors = bookAdapter.getSelectors(selectBookState);

export const selectAllBooks = bookSelectors.selectAll;
export const selectTotalCount = createSelector(
  selectBookState,
  state => state.pagination.totalCount);
