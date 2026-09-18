import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.components.html',
  styleUrl: './hero.components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponents {}
