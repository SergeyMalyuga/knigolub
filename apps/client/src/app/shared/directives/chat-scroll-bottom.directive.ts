import {afterRenderEffect, DestroyRef, Directive, ElementRef, inject, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectMessages} from '../../store/message/selectors/message.selectors';
import {NEAR_BOTTOM_THRESHOLD, SCROLL_DEBOUNCE_MS} from '../../core/constants/const';

@Directive({
  selector: '[appChatScrollBottom]',
})
export class ChatScrollBottomDirective {
  private readonly elementRef = inject<ElementRef<HTMLUListElement>>(ElementRef);
  private readonly store = inject(Store<AppState>);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messages = this.store.selectSignal(selectMessages);

  public isNearBottom = signal<boolean>(true);
  private scrollTimeout: ReturnType<typeof setTimeout> | null = null;
  private isFirstRender = true;

  constructor() {
    const target = this.elementRef.nativeElement;

    target.addEventListener('scroll', this.onScroll);

    this.destroyRef.onDestroy(() => {
      target.removeEventListener('scroll', this.onScroll);
      if (this.scrollTimeout !== null) {
        clearTimeout(this.scrollTimeout);
      }
    });

    afterRenderEffect(() => {
        this.messages();

        if (this.isNearBottom()) {
          target.scrollTo({top: target.scrollHeight, behavior: this.isFirstRender ? 'auto' : 'smooth'});
        }

        if (this.isFirstRender) {
          this.isFirstRender = false;
        }
      }
    )
  }

  private onScroll = (): void => {
    if (this.scrollTimeout !== null) {
      clearTimeout(this.scrollTimeout);
    }

    const target = this.elementRef.nativeElement;

    this.scrollTimeout = setTimeout(() => {
      const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
      this.isNearBottom.set(distanceToBottom < NEAR_BOTTOM_THRESHOLD);
      this.scrollTimeout = null;
    }, SCROLL_DEBOUNCE_MS);
  }

  public scrollBottom(): void {
    const target = this.elementRef.nativeElement;
    target.scrollTo({top: target.scrollHeight, behavior: 'smooth'});
  }
}
