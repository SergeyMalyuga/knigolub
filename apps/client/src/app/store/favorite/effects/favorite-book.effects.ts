import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteBookService } from '../../../core/services/favorite-book.service';
import * as FavoriteActions from '../actions/favorite-book.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteBookEffects {
  private actions$ = inject(Actions);
  private favoriteBookService = inject(FavoriteBookService);

  public loadFavoriteBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavoriteBooks),
      switchMap(() =>
        this.favoriteBookService.getFavorites().pipe(
          map((books) => FavoriteActions.loadFavoriteBooksSuccess({ books })),
          catchError((error: HttpErrorResponse) =>
            of(FavoriteActions.loadFavoriteBooksFailure({ error: { message: error.message } })),
          ),
        ),
      ),
    ),
  );

  public toggleFavoriteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.toggleFavoriteBook),
      switchMap(({ bookId }) =>
        this.favoriteBookService.toggleFavorite(bookId).pipe(
          map((book) => FavoriteActions.toggleFavoriteBookSuccess({ book })),
          catchError((error: HttpErrorResponse) =>
            of(FavoriteActions.toggleFavoriteBookFailure({ error: { message: error.message } })),
          ),
        ),
      ),
    ),
  );
}
