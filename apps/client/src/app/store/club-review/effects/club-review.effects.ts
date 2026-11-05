import {inject, Injectable} from '@angular/core';
import {ReviewService} from '../../../core/services/review.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as ClubReviewActions from '../actions/club-review.actions';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {normalizeError} from '../../../core/utils/error.utils';

@Injectable({
  providedIn: 'root',
})
export class ClubReviewEffects {
  private actions$ = inject(Actions);
  private reviewService = inject(ReviewService);

  createClubReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClubReviewActions.createClubReview),
      exhaustMap(({input}) =>
        this.reviewService.createClubReview(input).pipe(
          map((clubReview) =>
            ClubReviewActions.createClubReviewSuccess({clubReview})),
          catchError((error: HttpErrorResponse) =>
            of(ClubReviewActions.createClubReviewFailure({error: normalizeError(error.error)}))
          ),
        ),
      ),
    ),
  );

  loadClubReview$ = createEffect(() =>
    this.actions$.pipe(ofType(ClubReviewActions.loadClubReviews),
      switchMap(() => this.reviewService.getClubReviews()
        .pipe(map(clubReviews => ClubReviewActions.loadClubReviewsSuccess({clubReviews})),
          catchError((error: HttpErrorResponse) =>
            of(ClubReviewActions.loadClubReviewsFailure({error: normalizeError(error.error)})))))));
}
