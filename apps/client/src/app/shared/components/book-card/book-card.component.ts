import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {Book} from '@knigolub/shared';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-book-card',
  imports: [
    NgClass
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  @Input({required: true}) book!: Book;

  public currentDate = signal<number>(new Date().getFullYear());
}
