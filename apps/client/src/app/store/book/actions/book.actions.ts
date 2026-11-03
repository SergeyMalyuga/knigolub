import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Book, PaginationMeta } from '@knigolub/shared';

export const loadBooks = createAction('[Book] Load Books', props<{ page: number }>());
export const loadBooksSuccess = createAction(
  '[Book Effects] Load Books Success',
  props<{ books: Book[]; pagination: PaginationMeta }>(),
);
export const loadBooksFailure = createAction(
  '[Book Effects] Load Books Failure',
  props<{ error: HttpErrorResponse }>(),
);
