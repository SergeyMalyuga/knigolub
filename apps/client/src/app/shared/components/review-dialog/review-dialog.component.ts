import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { RATING_STARS_AMOUNT, REVIEW_TYPES, STAR_RATING } from '../../../core/constants/const';
import { NgClass } from '@angular/common';
import { MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ReviewDialogData } from '../../../core/models/review-dialog-data.model';

@Component({
  selector: 'review-dialog',
  imports: [NgClass, MatFormField, MatLabel, MatInput, MatIconButton, MatIcon, MatHint],
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
}
