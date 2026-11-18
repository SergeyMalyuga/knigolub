import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, map, Observable, switchMap} from 'rxjs';
import {Message, SOCKET_SERVER_EVENTS} from '@knigolub/shared';
import {ChatGatewayService} from '../../../core/services/chat-gateway.service';
import {createMessageSuccess} from '../../message/actions/message.actions';
import * as UserActions from '../../user/actions/user.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectUserId} from '../../user/selectors/user.selectors';

@Injectable()
export class MessageSocketEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);
  private userId = this.store.selectSignal(selectUserId);
  private chatGateway = inject(ChatGatewayService)

  public newMessageFromSocket$ =
    createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess, UserActions.checkAuthSuccess, UserActions.registerUserSuccess),
        switchMap(() =>
          new Observable<Message>(subscriber => {
            const io = this.chatGateway.getSocket();
            const handler = (message: Message) => subscriber.next(message);

            io.on(SOCKET_SERVER_EVENTS.NEW_MESSAGE, handler);
            return () => io.off(SOCKET_SERVER_EVENTS.NEW_MESSAGE, handler);
          })),
        filter(message => {
          const currentUserId = this.userId();
          return !!currentUserId && currentUserId !== message.author.id;
        }), map(message => createMessageSuccess({message}))));
}
