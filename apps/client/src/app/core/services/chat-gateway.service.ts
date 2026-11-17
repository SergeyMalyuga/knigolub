import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '@knigolub/shared';

@Injectable({
  providedIn: 'root',
})
export class ChatGatewayService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  public getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
    if (!this.socket) throw new Error('Сокет не инициализирован');
    return this.socket;
  }

  public connect() {
    if (this.socket?.connected) {
      return;
    }

    const token = localStorage.getItem('token');

    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        'x-token': token ?? '',
      },
      withCredentials: true,
    });

    this.socket.on('connect', () => console.log('Socket подключен:', this.socket?.id));
    this.socket.on('disconnect', () => console.log('Socket отключен'));
    this.socket.on('connect_error', (err) => console.error('Ошибка подключения:', err));
  }

  public disconnect(): void {
    this.socket?.off();
    this.socket?.disconnect();
    this.socket = null;
  }
}
