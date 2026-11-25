import {inject, Injectable} from '@angular/core';
import {createEffect} from '@ngrx/effects';
import {map} from 'rxjs';
import {ChatGatewayService} from '../../core/services/chat-gateway.service';
import {loadOnlineUsers, userWentOffline, userWentOnline} from '../online-user/actions/user-online.actions';


@Injectable()
export class UserOnlineSocketEffects {
  private chatGateway = inject(ChatGatewayService);

  loadOnlineUsersFromSocket$ = createEffect(() =>
    this.chatGateway.presenceSnapshot$.pipe(map(onlineUsers => loadOnlineUsers({onlineUsers}))));

  userWentOfflineSocket$ = createEffect(() =>
    this.chatGateway.userOffline$.pipe(map(userId => userWentOffline({userId}))));

  userWentOnlineSocket$ = createEffect(() =>
    this.chatGateway.userOnline$.pipe(map(user => userWentOnline({user}))));
}
