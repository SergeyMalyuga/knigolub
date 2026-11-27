import { ActionReducerMap } from '@ngrx/store';
import { bookReducer } from '../book/book.reducer';
import { AppState } from '../../core/models/app.state';
import { userReducer } from '../user/user.reducer';
import { favoriteBookReducer } from '../favorite/favorite-book.reducer';
import { clubReviewReducer } from '../club-review/club-review.reducer';
import { messageReducer } from '../message/message.reducer';
import { onlineUserReducer } from '../online-user/online-user.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  book: bookReducer,
  user: userReducer,
  favoriteBook: favoriteBookReducer,
  clubReview: clubReviewReducer,
  message: messageReducer,
  onlineUsers: onlineUserReducer,
};
