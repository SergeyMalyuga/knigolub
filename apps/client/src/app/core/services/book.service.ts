import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';
import {BASE_URL} from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${BASE_URL}/books`);
  }
}
