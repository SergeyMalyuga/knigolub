import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ReviewCard} from '@knigolub/shared';
import {AuthorBlockComponent} from '../author-block/author-block.component';

@Component({
  selector: 'app-review-card',
  imports: [
    AuthorBlockComponent
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewCardComponent {
  @Input({required: true}) card!: ReviewCard;
}
