import { EntityState } from '@ngrx/entity';
import { Book } from '@knigolub/shared/src/models/book';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationMeta } from '@knigolub/shared/src/models/pagination-meta';

export interface BookState extends EntityState<Book> {
  pagination: PaginationMeta;
  isLoading: boolean;
  error: HttpErrorResponse | string | null;
}
