import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {favoriteBookAdapter} from '../favorite-book.reducer';

const selectFavoriteBookState = createFeatureSelector<AppState['favoriteBook']>('favoriteBook');
const favoriteBookSelectors = favoriteBookAdapter.getSelectors(selectFavoriteBookState);

export const selectFavoriteBooks = favoriteBookSelectors.selectAll;
export const selectFavoriteBooksTotal = favoriteBookSelectors.selectTotal;
export const selectTogglingBookId = createSelector(
  selectFavoriteBookState,
  state => state.togglingBookId
)
