import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ChatService} from '../../../core/services/chat.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-chat-button',
  imports: [
    NgClass
  ],
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatButtonComponent {
  private chatService = inject(ChatService);

  public isOpen = this.chatService.isOpen;

  onOpenChat() {
    this.chatService.openChat();
  }
}
