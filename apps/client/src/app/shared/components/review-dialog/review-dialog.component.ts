import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {DialogRef} from '@angular/cdk/dialog';
import {RATING_STARS_AMOUNT, STAR_RATING} from '../../../core/constants/const';
import {NgClass} from '@angular/common';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'review-dialog',
  imports: [
    NgClass,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDialogComponent {
  protected readonly STAR_RATING = STAR_RATING;

  public dialogRef = inject(DialogRef);

  public currentRating = signal<number>(0);
  public hoverRating = signal<number>(0);
  protected readonly RATING_STARS_AMOUNT = RATING_STARS_AMOUNT;
}
