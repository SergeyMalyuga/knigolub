import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClubReview} from '@knigolub/shared';
import {APIRoute, BASE_URL} from '../constants/const';
import {buildParams} from '../utils/build-params.util';
import {GetClubReviewsParams} from '../types/review.type';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private http = inject(HttpClient);

  /**
   * Получить список отзывов о клубе с пагинацией.
   *
   * @param params - Объект с данными пагинации.
   * @param params.page - Номер страницы (число). Если не передан, сервер применит свой дефолт.
   * @param params.limit - Количество отзывов на странице (число). Если не передан, сервер применит свой дефолт.
   * @returns Возвращает список отзывов о клубе.
   */
  public getClubReviews(params?: GetClubReviewsParams): Observable<ClubReview[]> {
    return this.http.get<ClubReview[]>(`${BASE_URL}/${APIRoute.CLUB_REVIEWS}`,
      {params: buildParams(params)})
  }
}
