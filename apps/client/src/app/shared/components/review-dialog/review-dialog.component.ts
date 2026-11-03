import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  MIN_REVIEW_LENGTH,
  RATING_STARS_AMOUNT,
  REVIEW_ERRORS_MESSAGES,
  REVIEW_ERRORS_TYPES,
  REVIEW_TYPES,
  STAR_RATING,
} from '../../../core/constants/const';
import { NgClass } from '@angular/common';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ReviewDialogData } from '../../../core/models/review-dialog-data.model';
import { ReviewCreateDto } from '../../../core/models/review-create.dto';
import { form, FormField, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'review-dialog',
  imports: [
    NgClass,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconButton,
    MatIcon,
    MatHint,
    FormField,
    MatError,
  ],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDialogComponent {
  private data = inject<ReviewDialogData>(DIALOG_DATA);

  protected readonly STAR_RATING = STAR_RATING;
  protected readonly RATING_STARS_AMOUNT = RATING_STARS_AMOUNT;
  protected readonly reviewType = this.data.reviewType;
  protected readonly MIN_REVIEW_LENGTH = MIN_REVIEW_LENGTH;
  protected readonly book = this.data.book;

  public dialogRef = inject(DialogRef);

  public currentRating = signal<number>(0);
  public hoverRating = signal<number>(0);

  private reviewModel = signal<ReviewCreateDto>({
    rating: '',
    text: '',
  });

  public reviewForm = form(this.reviewModel, (fieldPath) => {
    (required(fieldPath.rating, { message: REVIEW_ERRORS_MESSAGES.rating.required }),
      required(fieldPath.text, { message: REVIEW_ERRORS_MESSAGES.text.required }),
      minLength(fieldPath.text, 50, { message: REVIEW_ERRORS_MESSAGES.text.minLength }));
  });

  public ratingErrorVisible = computed(() => {
    const field = this.reviewForm.rating();
    return field.invalid() && field.touched();
  });

  public textErrorVisible = computed(() => {
    const field = this.reviewForm.text();
    return field.invalid() && field.touched() && this.textRequiredError();
  });

  public textRequiredError = computed(() =>
    this.reviewForm
      .text()
      .errors()
      .find((e) => e.kind === REVIEW_ERRORS_TYPES.REQUIRED),
  );

  public textLength = computed(() => this.reviewForm.text().value().length);
  public counterSuccess = computed(() => this.textLength() >= MIN_REVIEW_LENGTH);

  protected get isClubReview(): boolean {
    return this.reviewType === REVIEW_TYPES.CLUB;
  }

  protected get dialogTitle(): string {
    return this.isClubReview
      ? 'Оставить отзыв о Книголюбе'
      : `Оставить отзыв на «${this.book?.title ?? ''}»`;
  }

  protected get ratingGroupLabel(): string {
    return this.isClubReview ? 'Оценка клуба' : `Оценка книги «${this.book?.title ?? ''}»`;
  }
}
