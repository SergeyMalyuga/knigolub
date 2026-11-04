import { inject, Injectable } from '@angular/core';
import { ReviewService } from '../../../core/services/review.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ClubReviewActions from '../actions/club-review.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClubReviewEffects {
  private actions$ = inject(Actions);
  private reviewService = inject(ReviewService);

  createClubReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClubReviewActions.createClubReview),
      exhaustMap(({ input }) =>
        this.reviewService.createClubReview(input).pipe(
          map((clubReview) => ClubReviewActions.createClubReviewSuccess({ clubReview })),
          catchError((error: HttpErrorResponse) =>
            of(ClubReviewActions.createClubReviewFailure({ error: error.error })),
          ),
        ),
      ),
    ),
  ); //TODO написать метод для проверки error
}
