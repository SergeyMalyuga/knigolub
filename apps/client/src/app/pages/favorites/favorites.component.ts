import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { selectFavoriteBooks } from '../../store/favorite/selectors/favorite-book.selectors';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { View } from '../../core/constants/const';
import { RouterLink } from '@angular/router';
import { BreakpointService } from '../../core/services/breakpoint.service';

@Component({
  selector: 'app-favorites',
  imports: [HeaderComponent, FooterComponent, BookCardComponent, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  private store = inject(Store<AppState>);
  private breakpointService = inject(BreakpointService);

  protected readonly View = View;

  constructor() {
    effect(() => {
      const isMiniMobile = this.breakpointService.isMiniMobile();
      if (isMiniMobile && this.viewMode() !== View.GRID) {
        this.viewMode.set(View.GRID);
      } else if (!isMiniMobile && this.viewMode() !== View.LIST) {
        this.viewMode.set(View.LIST);
      }
    });
  }

  public viewMode = signal<View>(View.LIST);
  public books = this.store.selectSignal(selectFavoriteBooks);
}
