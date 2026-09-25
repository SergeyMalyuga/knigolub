import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookService } from '../../../app/core/services/book.service';
import * as BookActions from '../actions/book.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
