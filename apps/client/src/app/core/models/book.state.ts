import {EntityState} from '@ngrx/entity';
import {Book, PaginationMeta} from '@knigolub/shared';
import {HttpErrorResponse} from '@angular/common/http';

export interface BookState extends EntityState<Book> {
  pagination: PaginationMeta;
  isLoading: boolean;
  error: HttpErrorResponse | string | null;
}
