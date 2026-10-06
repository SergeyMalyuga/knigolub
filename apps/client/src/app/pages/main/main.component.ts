import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponents } from './components/hero/hero.components';
import { CatalogComponent } from './components/catalog/catalog.component';
import {CollectionComponent} from './components/collection/collection.component';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, HeroComponents, CatalogComponent, CollectionComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
