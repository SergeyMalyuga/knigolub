import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ChatService} from '../../../core/services/chat.service';
import {ChatDragConstraintDirective} from '../../directives/chat-drag-constraint.directive';
import {CloseOnEscapeDirective} from '../../directives/close-on-escape.directive';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectChatUser, selectUpdateUserStatus} from '../../../store/user/selectors/user.selectors';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgClass} from '@angular/common';
import {CHAT_STATUS_CONFIG, ChatStatus} from '@knigolub/shared';
import {resetUserUpdateStatus, updateUserChatStatus} from '../../../store/user/actions/user.actions';
import {filter} from 'rxjs';
import {MESSAGE_ERRORS_MESSAGES, UpdateUserStatus} from '../../../core/constants/const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EmojiComponent} from '../emoji-picker/emoji.component';
import {InsertEmojiDirective} from '../../directives/insert-emoji.directive';
import {Emoji} from '@nicematic/emoji-picker';
import {MessageCreateDto} from '../../../core/types/message-create.dto';
import {form, FormField, minLength, required, validate} from '@angular/forms/signals';
import {messageValidator} from '../../validators/message.validator';
import {FormsModule} from '@angular/forms';

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
    EmojiComponent,
    InsertEmojiDirective,
    FormField,
    FormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  private store = inject(Store<AppState>);
  private chatService = inject(ChatService);
  private destroyRef = inject(DestroyRef);
  private emojiDirective = viewChild.required(InsertEmojiDirective);
  private messageModel = signal<MessageCreateDto>({message: ''});

  protected readonly CHAT_STATUS_CONFIG = CHAT_STATUS_CONFIG;

  public user = this.store.selectSignal(selectChatUser);
  public chatStatus = computed<ChatStatus>(() => this.user().chatStatus)

  public messageForm = form(this.messageModel, (fieldPath) => {
    required(fieldPath.message, {message: MESSAGE_ERRORS_MESSAGES.message.required});
    minLength(fieldPath.message, 1, {message: MESSAGE_ERRORS_MESSAGES.message.minLength});
    validate(fieldPath.message, (ctx) => messageValidator(ctx.value()));
  })

  ngOnInit(): void {
    this.store.select(selectUpdateUserStatus).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(status => status === UpdateUserStatus.SUCCESS || status === UpdateUserStatus.ERROR))
      .subscribe(() => this.store.dispatch(resetUserUpdateStatus())
      );
  }

  public closeChat(): void {
    this.chatService.closeChat();
  }

  public selectChatStatus(status: ChatStatus): void {
    this.store.dispatch(updateUserChatStatus({chatStatus: status}))
  }

  public onEmojiSelected(emoji: Emoji) {
    this.emojiDirective().insert(emoji);
  }

  public onSubmit() {
    if (this.messageForm().valid()) {
      const {message} = this.messageForm().value();
      console.log(message.trim());
    }
  }
}
