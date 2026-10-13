import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Input,
  signal,
} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthStatus, DEFAULT_AVATAR_URL, Section} from '../../../core/constants/const';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {BreakpointService} from '../../../core/services/breakpoint.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectAuthStatus, selectUserAvatar, selectUserName} from '../../../store/user/selectors/user.selectors';
import {logout} from '../../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isMiniLayout = false;

  private breakpointService = inject(BreakpointService);
  private store = inject(Store<AppState>);

  protected readonly AuthStatus = AuthStatus;
  protected readonly AppRoute = AppRoute;
  protected readonly Section = Section;

  public isMobile = computed(() => this.breakpointService.isMobile());
  public activeSection = signal<Section>(Section.MAIN);
  public isMenuOpen = signal<boolean>(true);
  public authStatus = this.store.selectSignal(selectAuthStatus);
  public userName = this.store.selectSignal(selectUserName);
  public userAvatar = this.store.selectSignal(selectUserAvatar);

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

  public logout(): void {
    this.store.dispatch(logout());
  }

  protected readonly DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;
}
