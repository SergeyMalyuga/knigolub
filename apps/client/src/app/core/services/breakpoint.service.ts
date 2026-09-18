import {DOCUMENT, inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BREAKPOINTS} from '../constants/const';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  private readonly tabletQuery?: MediaQueryList;
  private readonly mobileQuery?: MediaQueryList;
  private readonly miniMobileQuery?: MediaQueryList;

  public readonly isTablet = signal<boolean>(false);
  public readonly isMobile = signal<boolean>(false);
  public readonly isMiniMobile = signal<boolean>(false);


  public constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.tabletQuery = this.document.defaultView?.matchMedia(BREAKPOINTS.TABLET);
      this.mobileQuery = this.document.defaultView?.matchMedia(BREAKPOINTS.MOBILE);
      this.miniMobileQuery = this.document.defaultView?.matchMedia(BREAKPOINTS.MINI_MOBILE);
        this.listen(this.tabletQuery, this.isTablet);
        this.listen(this.mobileQuery, this.isMobile);
        this.listen(this.miniMobileQuery, this.isMiniMobile);
    }
  }

  private listen(query: MediaQueryList | undefined, signal: WritableSignal<boolean>) {
    if (query) {
      signal.set(query.matches);
      const handler = (evt: MediaQueryListEvent) => signal.set(evt.matches);
      query.addEventListener('change', handler);
    }
  }
}
