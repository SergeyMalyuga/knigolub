import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Book} from '@knigolub/shared';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  @Input({required: true}) book!: Book;
}
