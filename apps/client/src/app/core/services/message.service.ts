import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '@knigolub/shared';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);

  /**
   * Создаёт сообщение.
   *
   * @param text - Текст сообщения.
   * @returns Сообщение с данными автора.
   */
  public createMessage(text: string): Observable<Message> {
    return this.http.post<Message>(`${BASE_URL}/${APIRoute.MESSAGES}`, {text});
  }
}
