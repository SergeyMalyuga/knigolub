import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookActions from '../actions/book.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {BookService} from '../../../core/services/book.service';

@Injectable({
  providedIn: 'root',
})
export class BookEffects {
  private actions$ = inject(Actions);
  private bookService = inject(BookService);

  public loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      switchMap(({ page }) =>
        this.bookService.getBooks(page).pipe(
          map(({ books, pagination }) => BookActions.loadBooksSuccess({ books, pagination })),
          catchError((error: HttpErrorResponse) => of(BookActions.loadBooksFailure({ error }))),
        ),
      ),
    ),
  );
}
