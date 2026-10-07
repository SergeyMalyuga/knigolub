import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Section } from '../../../../core/constants/const';
import { COLLECTION_CARDS_MOCK } from '../../../../shared/components/collection-card/mock/collection-cards.mock';
import { CollectionCardComponent } from '../../../../shared/components/collection-card/collection-card.component';

@Component({
  selector: 'app-collection',
  imports: [CollectionCardComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  protected readonly Section = Section;
  protected readonly COLLECTION_CARDS_MOCK = COLLECTION_CARDS_MOCK;
}
