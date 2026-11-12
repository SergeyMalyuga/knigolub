import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ChatService} from '../../../core/services/chat.service';
import {ChatDragConstraintDirective} from '../../directives/chat-drag-constraint.directive';
import {CloseOnEscapeDirective} from '../../directives/close-on-escape.directive';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectChatUser} from '../../../store/user/selectors/user.selectors';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgClass} from '@angular/common';
import {CHAT_STATUS_CONFIG, ChatStatus} from '@knigolub/shared';

@Component({
  selector: 'app-chat',
  imports: [
    CdkDrag,
    MatIconButton,
    MatIcon,
    CdkDragHandle,
    ChatDragConstraintDirective,
    CloseOnEscapeDirective,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    NgClass,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  private store = inject(Store<AppState>);
  private chatService = inject(ChatService);

  protected readonly CHAT_STATUS_CONFIG = CHAT_STATUS_CONFIG;

  public user = this.store.selectSignal(selectChatUser);
  public chatStatus = signal<ChatStatus>(CHAT_STATUS_CONFIG.OFFLINE.value)

  public closeChat(): void {
    this.chatService.closeChat();
  }

  public selectChatStatus(status: ChatStatus): void {
    this.chatStatus.set(status);
  }
}
