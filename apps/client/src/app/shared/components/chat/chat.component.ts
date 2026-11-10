import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ChatService} from '../../../core/services/chat.service';
import {ChatDragConstraintDirective} from '../../directives/chat-drag-constraint.directive';

@Component({
  selector: 'app-chat',
  imports: [
    CdkDrag,
    MatIconButton,
    MatIcon,
    CdkDragHandle,
    ChatDragConstraintDirective
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  private chatService = inject(ChatService);

  public onCloseChat(): void {
    this.chatService.closeChat();
  }
}
