import { createAction, props } from '@ngrx/store';
import { Book } from '@knigolub/shared/src/models/book';
import { PaginationMeta } from '@knigolub/shared/src/models/pagination-meta';
import { HttpErrorResponse } from '@angular/common/http';

export const loadBooks = createAction('[Book] Load Books', props<{ page: number }>());
export const loadBooksSuccess = createAction(
  '[Book Effects] Load Books Success',
  props<{ books: Book[]; pagination: PaginationMeta }>(),
);
export const loadBooksFailure = createAction(
  '[Book Effects] Load Books Failure',
  props<{ error: HttpErrorResponse }>(),
);
