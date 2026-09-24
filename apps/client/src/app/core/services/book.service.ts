import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/const';
import { Book } from '@knigolub/shared/src/models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${BASE_URL}/books`);
  }
}
