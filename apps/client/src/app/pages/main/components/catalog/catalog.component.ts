import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
  CATEGORY_LABELS,
  CategoryType,
  Section,
  View,
  VIEW_LABELS,
} from '../../../../core/constants/const';
import {CategoryKey} from '../../../../core/types/category-key';
import {NgClass} from '@angular/common';
import {ViewKey} from '../../../../core/types/view-key';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../models/app.state';
import {selectAllBooks} from '../../../../../store/book/selectors/book.selectors';
import {BookCardComponent} from '../../../../shared/components/book-card/book-card.component';

@Component({
  selector: 'app-catalog',
  imports: [NgClass, BookCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  private store = inject(Store<AppState>);

  protected readonly Section = Section;
  protected readonly View = View;

  public currentCategory = signal<CategoryType>(CategoryType.ALL);
  public currentView = signal<View>(View.GRID);
  public books = this.store.selectSignal(selectAllBooks);

  public categories: CategoryKey[] = Object.values(CategoryType);
  public views: ViewKey[] = Object.values(View);

  public getCategoryLabel(categoryKey: CategoryKey): string {
    return CATEGORY_LABELS[categoryKey];
  }

  public getViewLabel(viewKey: ViewKey) {
    return VIEW_LABELS[viewKey];
  }

  public isActiveCategory(category: CategoryType) {
    return this.currentCategory() === category;
  }

  public isActiveView(view: View) {
    return this.currentView() === view;
  }

  public selectCategory(category: CategoryType) {
    this.currentCategory.set(category);
  }

  public selectView(view: View) {
    this.currentView.set(view);
  }
}
