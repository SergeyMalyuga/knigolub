import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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
import {CHAT_STATUS_CONFIG} from './constants/const';

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
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  private store = inject(Store<AppState>);
  private chatService = inject(ChatService);

  public user = this.store.selectSignal(selectChatUser);

  public closeChat(): void {
    this.chatService.closeChat();
  }

  protected readonly CHAT_STATUS_CONFIG = CHAT_STATUS_CONFIG;
}
