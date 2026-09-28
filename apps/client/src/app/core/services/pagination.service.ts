import {computed, inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../models/app.state';
import {selectCurrentPage, selectTotalPages} from '../../../store/book/selectors/book.selectors';
import {PaginationItem} from '../models/pagination-item';
import {PaginationType} from '../constants/const';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PaginationService {
  private store = inject(Store<AppState>);

  private totalPages = this.store.selectSignal(selectTotalPages);
  private currentPage = this.store.selectSignal(selectCurrentPage);

  public pages = computed<PaginationItem[]>(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    const items: PaginationItem[] = [];
    if (total <= 7) {
      return Array.from({length: this.totalPages()}, (_, i) => ({
        type: PaginationType.PAGE,
        value: i + 1,
      }));
    }

    items.push({type: PaginationType.PAGE, value: 1});

    if (start > 2) {
      items.push({type: PaginationType.ELLIPSIS});
    }

    for (let i = start; i <= end; i++) {
      items.push({type: PaginationType.PAGE, value: i});
    }
    if (end < total - 1) {
      items.push({type: PaginationType.ELLIPSIS});
    }
    items.push({type: PaginationType.PAGE, value: total});

    console.log(items)
    return items;
  })
}
