import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constants/const';
import {BookResponse} from '@knigolub/shared';


@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  public getBooks(page: number): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${BASE_URL}/books?page=${page}&limit=20`);
  }
}
