import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {RATING_STARS_AMOUNT, REVIEW_ERRORS_MESSAGES, REVIEW_TYPES, STAR_RATING} from '../../../core/constants/const';
import {NgClass} from '@angular/common';
import {MatError, MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ReviewDialogData} from '../../../core/models/review-dialog-data.model';
import {ReviewCreateDto} from '../../../core/models/review-create.dto';
import {form, FormField, minLength, required} from '@angular/forms/signals';

@Component({
  selector: 'review-dialog',
  imports: [NgClass, MatFormField, MatLabel, MatInput, MatIconButton, MatIcon, MatHint, FormField, MatError],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDialogComponent {
  private data = inject<ReviewDialogData>(DIALOG_DATA);

  protected readonly REVIEW_TYPES = REVIEW_TYPES;
  protected readonly STAR_RATING = STAR_RATING;
  protected readonly RATING_STARS_AMOUNT = RATING_STARS_AMOUNT;
  protected readonly reviewType = this.data.reviewType;
  protected readonly book = this.data.book;

  public dialogRef = inject(DialogRef);

  public currentRating = signal<number>(0);
  public hoverRating = signal<number>(0);

  private reviewModel = signal<ReviewCreateDto>({
    rating: '',
    text: ''
  });

  public reviewForm = form(this.reviewModel, (fieldPath) => {
    required(fieldPath.rating, {message: REVIEW_ERRORS_MESSAGES.rating.required}),
      required(fieldPath.text, {message: REVIEW_ERRORS_MESSAGES.text.required}),
      minLength(fieldPath.text, 50, {message: REVIEW_ERRORS_MESSAGES.text.minLength})
  });

  public ratingErrorVisible = computed(() => {
    const field = this.reviewForm.rating();
    return field.invalid() && (field.touched() || field.dirty());
  })

  public textErrorVisible = computed(() => {
    const field = this.reviewForm.text();
    return field.invalid() && (field.touched() || field.dirty());
  })
}
