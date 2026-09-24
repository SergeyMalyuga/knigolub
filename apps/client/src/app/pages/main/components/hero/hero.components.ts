import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.components.html',
  styleUrl: './hero.components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponents {
  public currentDate = signal<number>(new Date().getFullYear());
}
