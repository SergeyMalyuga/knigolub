import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {HeroComponents} from './components/hero/hero.components';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    HeroComponents
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
