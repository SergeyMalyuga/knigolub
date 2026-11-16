import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from '../../../core/services/message.service';
import * as MessageActions from '../actions/message.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { normalizeError } from '../../../core/utils/error.utils';

@Injectable({
  providedIn: 'root',
})
export class MessageEffects {
  private actions$ = inject(Actions);
  private messageService = inject(MessageService);

  public createMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.createMessage),
      exhaustMap(({ text }) =>
        this.messageService.createMessage(text).pipe(
          map((message) => MessageActions.createMessageSuccess({ message })),
          catchError((error: HttpErrorResponse) =>
            of(MessageActions.createMessageFailure({ error: normalizeError(error.error) })),
          ),
        ),
      ),
    ),
  );
}
