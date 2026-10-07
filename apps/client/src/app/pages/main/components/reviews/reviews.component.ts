import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Section } from '../../../../core/constants/const';
import { REVIEW_CARDS_MOCK } from '../../../../shared/components/review-card/mock/review-cards.mock';
import { ReviewCardComponent } from '../../../../shared/components/review-card/review-card.component';

@Component({
  selector: 'app-reviews',
  imports: [ReviewCardComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
  protected readonly Section = Section;
  protected readonly REVIEW_CARDS_MOCK = REVIEW_CARDS_MOCK;
}
