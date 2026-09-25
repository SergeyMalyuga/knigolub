import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app.state';
import { loadBooks } from '../store/book/actions/book.actions';
import { DEFAULT_PAGE } from './core/constants/const';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private store = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.dispatch(loadBooks({ page: DEFAULT_PAGE }));
  }
}
