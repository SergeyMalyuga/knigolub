import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CATEGORY_LABELS, CategoryType, Section} from '../../../../core/constants/const';
import {CategoryKey} from '../../../../core/types/category-key';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [
    NgClass
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  protected readonly Section = Section;

  public currentCategory = signal<CategoryType>(CategoryType.ALL);

  public categories: CategoryKey[] = Object.values(CategoryType);

  public getCategoryLabel(categoryKey: CategoryKey): string {
    return CATEGORY_LABELS[categoryKey];
  }

  public isActive(category: CategoryType) {
    return this.currentCategory() === category;
  }
}
