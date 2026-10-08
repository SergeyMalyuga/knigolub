import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponents } from './components/hero/hero.components';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import {CommunityComponent} from './components/community/community.component';
import {SubscribeComponent} from './components/subscribe/subscribe.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    HeroComponents,
    CatalogComponent,
    CollectionComponent,
    ReviewsComponent,
    CommunityComponent,
    SubscribeComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
