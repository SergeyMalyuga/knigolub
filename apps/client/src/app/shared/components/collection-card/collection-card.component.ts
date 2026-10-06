import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CollectionCard} from '@knigolub/shared';

@Component({
  selector: 'app-collection-card',
  imports: [],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent {
  @Input({required: true}) card!: CollectionCard;
}
