import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute, Section} from '../../../core/constants/const';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly AppRoute = AppRoute;
  protected readonly Section = Section;

  public activeSection = signal<Section>(Section.MAIN);

  public isActive(section: Section): boolean {
    return this.activeSection() === section;
  }

  public selectSection(section: Section): void {
    this.activeSection.set(section);
  }
}
