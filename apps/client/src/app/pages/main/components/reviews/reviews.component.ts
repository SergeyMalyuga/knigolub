import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {REVIEW_TYPES, Section} from '../../../../core/constants/const';
import {REVIEW_CARDS_MOCK} from '../../../../shared/components/review-card/mock/review-cards.mock';
import {ReviewCardComponent} from '../../../../shared/components/review-card/review-card.component';
import {ReviewDialogService} from '../../../../core/services/review-dialog.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/models/app.state';
import {selectUserClubReview} from '../../../../store/club-review/selectors/club-review.selectors';

@Component({
  selector: 'app-reviews',
  imports: [ReviewCardComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
  private reviewDialogService = inject(ReviewDialogService);
  private store = inject(Store<AppState>);

  protected readonly Section = Section;
  protected readonly REVIEW_CARDS_MOCK = REVIEW_CARDS_MOCK;

  public userReviewClub = this.store.selectSignal(selectUserClubReview);

  public onAddReview(): void {
    this.reviewDialogService.openReviewDialog({reviewType: REVIEW_TYPES.CLUB, book: null});
  }
}
