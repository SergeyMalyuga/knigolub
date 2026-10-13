import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import {catchError, exhaustMap, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  public registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      exhaustMap(({ newUser }) =>
        this.userService.registerUser(newUser).pipe(
          tap((userDto) => this.authService.setToken(userDto.token)),
          map((userDto) => UserActions.registerUserSuccess({ userDto })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.registerUserFailure({ error: error.error })),
          ),
        ),
      ),
    ),
  );

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(ofType(UserActions.login),
      switchMap(({credential}) =>
          this.userService.login(credential)
            .pipe(map(userDto => UserActions.loginSuccess({ userDto })),
              catchError((error: HttpErrorResponse) => of(UserActions.loginFailure({ error: error.error })))))));
      }

