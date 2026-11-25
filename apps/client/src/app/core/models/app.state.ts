import {BookState} from './book.state';
import {UserState} from './user.state';
import {FavoriteBookState} from './favorite-book.state';
import {ClubReviewState} from './club-review.state';
import {MessageState} from './message.state';
import {UserOnlineState} from './user-online.state';

export interface AppState {
  book: BookState;
  user: UserState;
  favoriteBook: FavoriteBookState;
  clubReview: ClubReviewState;
  message: MessageState;
  onlineUsers: UserOnlineState;
}
