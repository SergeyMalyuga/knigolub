import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {
  selectCurrentPage, selectHasNextPage, selectHasPreviousPage,
  selectShown,
  selectTotalCount,
  selectTotalPages
} from '../../../../store/book/selectors/book.selectors';
import {PaginationItem} from '../../../core/models/pagination-item';
import {PaginationType} from '../../../core/constants/const';
import {PaginationPage} from '../../../core/models/pagination-page';
import {NgClass} from '@angular/common';
import {loadBooks} from '../../../../store/book/actions/book.actions';

@Component({
  selector: 'app-pagination',
  imports: [
    NgClass
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  private store = inject(Store<AppState>);
  private totalPages = this.store.selectSignal(selectTotalPages)

  public currentPage = this.store.selectSignal(selectCurrentPage);
  public totalCount = this.store.selectSignal(selectTotalCount);
  public hasNextPage = this.store.selectSignal(selectHasNextPage);
  public hasPrevPage = this.store.selectSignal(selectHasPreviousPage);
  public shown = this.store.selectSignal(selectShown);

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

    return items;
  })

  public changePageToNext() {
    this.store.dispatch(loadBooks({page: this.currentPage() + 1}));
  }

  public changePageToPrev() {
    this.store.dispatch(loadBooks({page: this.currentPage() - 1}));
  }

  public changePage(page: number) {
    this.store.dispatch(loadBooks({page}));
  }

  public isPage(item: PaginationItem): item is PaginationPage {
    return item.type === PaginationType.PAGE;
  }
}
