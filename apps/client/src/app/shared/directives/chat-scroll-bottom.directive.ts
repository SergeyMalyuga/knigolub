import {afterRenderEffect, AfterViewInit, Directive, ElementRef, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectMessages} from '../../store/message/selectors/message.selectors';

@Directive({
  selector: '[appChatScrollBottom]',
})
export class ChatScrollBottomDirective implements AfterViewInit {
  private elementRef = inject<ElementRef<HTMLUListElement>>(ElementRef);
  private store = inject(Store<AppState>);
  public messages = this.store.selectSignal(selectMessages);

  constructor() {
    afterRenderEffect(() => {
        this.messages();
        const target = this.elementRef.nativeElement;

      const threshold = 50;

      const isNearBottom = target.scrollHeight - target.scrollTop - target.clientHeight < threshold;

      if (isNearBottom) {
        target.scrollTo({top: target.scrollHeight, behavior: 'smooth'});
      }
      }
    )
  }

  ngAfterViewInit(): void {
    const target = this.elementRef.nativeElement;
    target.scrollTo({top: target.scrollHeight, behavior: 'smooth'});
    }
}
