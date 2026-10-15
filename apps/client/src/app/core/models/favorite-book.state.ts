import {EntityState} from '@ngrx/entity';
import {Book, ErrorResponse} from '@knigolub/shared';
import {HttpErrorResponse} from '@angular/common/http';

export interface FavoriteBookState extends EntityState<Book> {
  isLoading: boolean;
  togglingBookId: string | null;
  error: HttpErrorResponse| ErrorResponse | null;
}
