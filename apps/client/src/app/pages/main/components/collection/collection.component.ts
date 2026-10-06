import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Section } from '../../../../core/constants/const';

@Component({
  selector: 'app-collection',
  imports: [],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  protected readonly Section = Section;
}
