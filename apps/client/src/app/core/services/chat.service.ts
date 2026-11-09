import {inject, Injectable, signal} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {ChatComponent} from '../../shared/components/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private overlay = inject(Overlay);
  private overlayRef = this.overlay.create({
    positionStrategy: this.overlay.position().global().right('20px').bottom('20px'),
    hasBackdrop: false,
    scrollStrategy: this.overlay.scrollStrategies.noop()
  });

  public isOpen = signal<boolean>(false)

  public openChat() {
    if (this.overlayRef.hasAttached()) {
      return;
    }

    this.overlayRef.attach(new ComponentPortal(ChatComponent));
    this.isOpen.set(true);
  }

  public closeChat() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.isOpen.set(false);
    }
  }
}
