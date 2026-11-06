import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClubReview } from '@knigolub/shared';
import { APIRoute, BASE_URL } from '../constants/const';
import { buildParams } from '../utils/build-params.util';
import { GetClubReviewsParams } from '../types/review.type';
import { CreateClubReviewInput } from '../types/create-club-review-input.type';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  /**
   * Получает список отзывов о клубе с пагинацией.
   *
   * @param params - Объект с данными пагинации.
   * @param params.page - Номер страницы (число). Если не передан, сервер применит свой дефолт.
   * @param params.limit - Количество отзывов на странице (число). Если не передан, сервер применит свой дефолт.
   * @returns Список отзывов о клубе.
   */
  public getClubReviews(params?: GetClubReviewsParams): Observable<ClubReview[]> {
    return this.http.get<ClubReview[]>(`${BASE_URL}/${APIRoute.CLUB_REVIEWS}`, {
      params: buildParams(params),
    });
  }

  /**
   * Создаёт отзыв о клубе.
   *
   * @param input - Объект с данными об отзыве.
   * @param input.rating - Оценка клуба.
   * @param input.text - Текст отзыва
   * @returns Созданный отзыв с данными автора.
   */
  public createClubReview(input: CreateClubReviewInput): Observable<ClubReview> {
    return this.http.post<ClubReview>(`${BASE_URL}/${APIRoute.CLUB_REVIEWS}`, input);
  }

  /**
   * Получает отзыв пользователя о клубе или null, если отзыва нет.
   */
  public getUserClubReview(): Observable<ClubReview | null> {
    return this.http.get<ClubReview | null>(`${BASE_URL}/${APIRoute.CLUB_REVIEWS_USER}`);
  }
}
