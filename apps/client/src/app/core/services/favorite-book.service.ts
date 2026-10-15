import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '@knigolub/shared';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class FavoriteBookService {
  private http = inject(HttpClient);

  public getFavorites(): Observable<Book[]> {
    return this.http.get<Book[]>(`${BASE_URL}/${APIRoute.FAVORITES_LIST}`);
  }

  public toggleFavorite(bookId: string): Observable<Book> {
    return this.http.post<Book>(`${BASE_URL}/${APIRoute.FAVORITES_TOGGLE}`, {bookId});
  }
}
