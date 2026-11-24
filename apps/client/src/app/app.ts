import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from './core/models/app.state';
import {DEFAULT_PAGE} from './core/constants/const';
import {loadBooks} from './store/book/actions/book.actions';
import {checkAuth} from './store/user/actions/user.actions';
import {loadClubReviews} from './store/club-review/actions/club-review.actions';
import {ChatButtonComponent} from './shared/components/chat-button/chat-button.component';
import {IconRegistryService} from './core/services/icon-registry.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private store = inject(Store<AppState>);
  private iconRegistry = inject(IconRegistryService);

  ngOnInit(): void {
    this.iconRegistry.registerAll();
    this.store.dispatch(checkAuth());
    this.store.dispatch(loadBooks({page: DEFAULT_PAGE}));
    this.store.dispatch(loadClubReviews());
  }
}
