import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../app/core/models/app.state';
import { bookAdapter } from '../book.reducer';

const selectBookState = createFeatureSelector<AppState['book']>('book');
const bookSelectors = bookAdapter.getSelectors(selectBookState);

export const selectAllBooks = bookSelectors.selectAll;

export const selectTotalCount = createSelector(
  selectBookState,
  (state) => state.pagination.totalCount,
);

export const selectShown = createSelector(selectBookState, (state) => state.pagination.shown);

export const selectTotalPages = createSelector(
  selectBookState,
  (state) => state.pagination.totalPages,
);

export const selectCurrentPage = createSelector(
  selectBookState,
  (state) => state.pagination.currentPage,
);

export const selectHasNextPage = createSelector(
  selectBookState,
  (state) => state.pagination.hasNextPage,
);

export const selectHasPreviousPage = createSelector(
  selectBookState,
  (state) => state.pagination.hasPrevPage,
);
