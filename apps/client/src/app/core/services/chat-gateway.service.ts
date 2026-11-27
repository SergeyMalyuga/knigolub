import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import {
  ClientToServerEvents,
  OnlineUser,
  ServerToClientEvents,
  SOCKET_SERVER_EVENTS,
} from '@knigolub/shared';
import { AUTH_TOKEN_KEY_NAME } from '../constants/const';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatGatewayService {
  private readonly snapshotSubject = new ReplaySubject<OnlineUser[]>(1);
  private readonly userOnlineSubject = new Subject<OnlineUser>();
  private readonly userOfflineSubject = new Subject<string>();

  public readonly presenceSnapshot$ = this.snapshotSubject.asObservable();
  public readonly userOnline$ = this.userOnlineSubject.asObservable();
  public readonly userOffline$ = this.userOfflineSubject.asObservable();

  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  public getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
    if (!this.socket) throw new Error('Сокет не инициализирован');
    return this.socket;
  }

  public connect() {
    if (this.socket?.connected) {
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        'x-token': token ?? '',
      },
      withCredentials: true,
    });

    this.socket.on('connect', () => console.log('Socket подключен:', this.socket?.id));
    this.socket.on('disconnect', () => console.log('Socket отключен'));
    this.socket.on('connect_error', (err) => console.error('Ошибка подключения:', err));

    this.socket.on(SOCKET_SERVER_EVENTS.PRESENCE_SNAPSHOT, (onlineUsers) =>
      this.snapshotSubject.next(onlineUsers),
    );
    this.socket.on(SOCKET_SERVER_EVENTS.PRESENCE_ONLINE, (onlineUser) =>
      this.userOnlineSubject.next(onlineUser),
    );
    this.socket.on(SOCKET_SERVER_EVENTS.PRESENCE_OFFLINE, (userId) =>
      this.userOfflineSubject.next(userId),
    );
  }

  public disconnect(): void {
    this.socket?.off();
    this.socket?.disconnect();
    this.socket = null;
  }
}
