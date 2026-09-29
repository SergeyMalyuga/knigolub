import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {Section} from "../../../../core/constants/const";

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.components.html',
  styleUrl: './hero.components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponents {
  public currentDate = signal<number>(new Date().getFullYear());
    protected readonly Section = Section;
}
