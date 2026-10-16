import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { Book } from '@knigolub/shared';
import { NgClass } from '@angular/common';
import { AppRoute, AuthStatus, View } from '../../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { selectAuthStatus } from '../../../store/user/selectors/user.selectors';
import { Router } from '@angular/router';
import { toggleFavoriteBook } from '../../../store/favorite/actions/favorite-book.actions';
import { selectTogglingBookId } from '../../../store/favorite/selectors/favorite-book.selectors';

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

  private store = inject(Store<AppState>);
  private router = inject(Router);

  protected readonly AuthStatus = AuthStatus;
  protected readonly View = View;

  public currentDate = signal<number>(new Date().getFullYear());
  public authStatus = this.store.selectSignal(selectAuthStatus);
  public togglingBookId = this.store.selectSignal(selectTogglingBookId);
  public isFavorite = signal<boolean>(false); //TODO временно для проверки применения стилей

  public toggleFavorite() {
    if (this.authStatus() !== AuthStatus.AUTH) {
      this.router.navigate([AppRoute.LOGIN]);
    } else {
      this.store.dispatch(toggleFavoriteBook({ bookId: this.book.id }));
    }
  }
}
