import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import {checkAuthFailure, checkAuthNoToken, checkAuthSuccess} from '../actions/user.actions';
import {catchError, concatMap, exhaustMap, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {AppRoute, DEFAULT_PAGE} from '../../../core/constants/const';
import {loadFavoriteBooks, loadFavoriteBooksSuccess} from '../../favorite/actions/favorite-book.actions';
import {loadBooks} from '../../book/actions/book.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      exhaustMap(({newUser}) =>
        this.userService.registerUser(newUser).pipe(
          tap((userDto) => this.authService.setToken(userDto.token)),
          map((userDto) => UserActions.registerUserSuccess({userDto})),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.registerUserFailure({error: error.error})),
          ),
        ),
      ),
    ),
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({credential}) =>
        this.userService.login(credential).pipe(
          tap((userDto) => this.authService.setToken(userDto.token)),
          map((userDto) => UserActions.loginSuccess({userDto})),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.loginFailure({error: error.error})),
          ),
        ),
      ),
    ),
  );

  public loginSuccessLoadData$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.loginSuccess), concatMap(() =>
      [loadBooks({page: DEFAULT_PAGE}), loadFavoriteBooks()])))

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuth),
      switchMap(() => {
        const token = this.authService.getToken();
        if (token) {
          return this.userService.getCurrentUser().pipe(
            map((user) => UserActions.checkAuthSuccess({user})),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.checkAuthFailure({error: error.error})),
            ),
          );
        }
        return of(UserActions.checkAuthNoToken());
      }),
    ),
  );

  public authSuccessLoadFavoriteBook$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.checkAuthSuccess),
      map(() => loadFavoriteBooks())));

  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logout),
        tap(() => {
          this.authService.removeToken();
          this.router.navigate([AppRoute.LOGIN]);
        }),
      ),
    {dispatch: false},
  );
}
