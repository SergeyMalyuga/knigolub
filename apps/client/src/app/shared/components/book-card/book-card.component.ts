import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { Book } from '@knigolub/shared';
import { NgClass } from '@angular/common';
import { View } from '../../../core/constants/const';

@Component({
  selector: 'app-book-card',
  imports: [NgClass],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  @Input({ required: true }) viewMode!: View;
  @Input({ required: true }) index!: number;

  public currentDate = signal<number>(new Date().getFullYear());
  public isFavorite = signal<boolean>(false); //TODO временно для проверки применения стилей

  protected readonly View = View;

  public toggleFavorite() {
    this.isFavorite.set(!this.isFavorite());
  }
}
