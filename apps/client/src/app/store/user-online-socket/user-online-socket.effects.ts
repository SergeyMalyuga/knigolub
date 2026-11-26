import {inject, Injectable} from '@angular/core';
import {createEffect} from '@ngrx/effects';
import {filter, map} from 'rxjs';
import {ChatGatewayService} from '../../core/services/chat-gateway.service';
import {loadOnlineUsers, userWentOffline, userWentOnline} from '../online-user/actions/user-online.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectUserId} from '../user/selectors/user.selectors';


@Injectable()
export class UserOnlineSocketEffects {
  private chatGateway = inject(ChatGatewayService);
  private store = inject(Store<AppState>);
  private currentUserId = this.store.selectSignal(selectUserId);

  loadOnlineUsersFromSocket$ = createEffect(() =>
    this.chatGateway.presenceSnapshot$.pipe(map(onlineUsers => loadOnlineUsers({onlineUsers}))));

  userWentOfflineSocket$ = createEffect(() =>
    this.chatGateway.userOffline$.pipe(
      filter(userId => userId !== this.currentUserId()),
      map(userId => userWentOffline({userId}))));

  userWentOnlineSocket$ = createEffect(() =>
    this.chatGateway.userOnline$.pipe(
      filter(user => user.id !== this.currentUserId()),
      map(user => userWentOnline({user}))));
}
