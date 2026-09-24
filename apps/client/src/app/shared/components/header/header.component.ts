import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoute, Section } from '../../../core/constants/const';
import { NgClass } from '@angular/common';
import { BreakpointService } from '../../../core/services/breakpoint.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private breakpointService = inject(BreakpointService);

  protected readonly AppRoute = AppRoute;
  protected readonly Section = Section;

  public isMobile = computed(() => this.breakpointService.isMobile());
  public activeSection = signal<Section>(Section.MAIN);
  public isMenuOpen = signal<boolean>(true);

  constructor() {
    effect(() => {
      const miniMobile = this.breakpointService.isMiniMobile();
      if (miniMobile) {
        this.isMenuOpen.set(false);
      } else {
        this.isMenuOpen.set(true);
      }
    });
  }

  public isActive(section: Section): boolean {
    return this.activeSection() === section;
  }

  public selectSection(section: Section): void {
    this.activeSection.set(section);
  }

  public toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
