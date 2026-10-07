import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CollectionCard} from '@knigolub/shared';
import {InitialsPipe} from '../../pipes/initials.pipe';
import {PluralizePipe} from '../../pipes/pluralize.pipe';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-collection-card',
  imports: [
    InitialsPipe,
    PluralizePipe,
    NgOptimizedImage
  ],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionCardComponent {
  @Input({required: true}) card!: CollectionCard;
}
