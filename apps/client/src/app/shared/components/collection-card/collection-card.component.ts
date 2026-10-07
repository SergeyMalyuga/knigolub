import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CollectionCard} from '@knigolub/shared';
import {NgOptimizedImage} from '@angular/common';
import {AuthorBlockComponent} from '../author-block/author-block.component';

@Component({
  selector: 'app-collection-card',
  imports: [
    NgOptimizedImage,
    AuthorBlockComponent
  ],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent {
  @Input({required: true}) card!: CollectionCard;
}
