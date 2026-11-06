import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  DIALOG_RESULT,
  MIN_REVIEW_LENGTH,
  NOTIFICATION_MESSAGE,
  OPERATION_STATUS,
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
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import {
  createClubReview,
  resetClubReviewStatus,
} from '../../../store/club-review/actions/club-review.actions';
import { FormsModule } from '@angular/forms';
import {
  selectClubReviewStatus,
  selectUserClubReview,
} from '../../../store/club-review/selectors/club-review.selectors';
import { NotificationService } from '../../../core/services/notification.service';
import { first, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogResult } from '../../../core/types/dialog-result.type';

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
    FormsModule,
  ],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewDialogComponent implements OnInit {
  private data = inject<ReviewDialogData>(DIALOG_DATA);
  private destroyRef = inject(DestroyRef);
  private store = inject(Store<AppState>);
  private notificationService = inject(NotificationService);

  protected readonly STAR_RATING = STAR_RATING;
  protected readonly RATING_STARS_AMOUNT = RATING_STARS_AMOUNT;
  protected readonly reviewType = this.data.reviewType;
  protected readonly MIN_REVIEW_LENGTH = MIN_REVIEW_LENGTH;
  protected readonly book = this.data.book;

  public dialogRef = inject(DialogRef);

  public reviewStatus = this.store.selectSignal(selectClubReviewStatus);
  public userClubReview = this.store.selectSignal(selectUserClubReview);
  public currentRating = signal<number>(this.userClubReview()?.rating ?? 0);
  public hoverRating = signal<number>(0);

  private reviewModel = signal<ReviewCreateDto>({
    rating: this.userClubReview()?.rating.toString() ?? '',
    text: this.userClubReview()?.text ?? '',
  });

  public isSimilarReviewData = computed(() => {
    const rating = this.userClubReview()?.rating;
    const text = this.userClubReview()?.text;
    return rating?.toString() === this.reviewModel().rating && text === this.reviewModel().text
  })

  public isSubmitting = computed(() => {
    return this.reviewStatus() === OPERATION_STATUS.LOADING;
  });

  ngOnInit(): void {
    this.store
      .select(selectClubReviewStatus)
      .pipe(
        first((status) => status === OPERATION_STATUS.SUCCESS),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.store.dispatch(resetClubReviewStatus());
        this.reviewForm().reset();
        this.dialogRef.close(DIALOG_RESULT.SUCCESS);
      });

    this.dialogRef.closed.pipe(take(1)).subscribe((result: DialogResult) => {
      if (result === DIALOG_RESULT.SUCCESS) {
        this.notificationService.showSuccessMessage(NOTIFICATION_MESSAGE.review.create.SUCCESS);
      }
    });
  }

  public reviewForm = form(this.reviewModel, (fieldPath) => {
    required(fieldPath.rating, { message: REVIEW_ERRORS_MESSAGES.rating.required });
    required(fieldPath.text, { message: REVIEW_ERRORS_MESSAGES.text.required });
    minLength(fieldPath.text, 50, { message: REVIEW_ERRORS_MESSAGES.text.minLength });
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
    const actionText = this.userClubReview() ? 'Редактировать' : 'Оставить';

    return this.isClubReview
      ? `${actionText} отзыв о «Книголюбе»`
      : `${actionText} отзыв на «${this.book?.title}»`;
  }

  protected get ratingGroupLabel(): string {
    return this.isClubReview ? 'Оценка клуба' : `Оценка книги «${this.book?.title}»`;
  }

  public onSubmit() {
    if (this.reviewForm().invalid()) {
      return;
    }

    const { rating, text } = this.reviewForm().value();
    const validRating = Number(rating);

    if (Number.isFinite(validRating)) {
      this.store.dispatch(createClubReview({ input: { rating: validRating, text } }));
    }
  }
}
