import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ChatService } from '../../../core/services/chat.service';
import { ChatDragConstraintDirective } from '../../directives/chat-drag-constraint.directive';
import { CloseOnEscapeDirective } from '../../directives/close-on-escape.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import {
  selectChatUser,
  selectUpdateUserStatus,
} from '../../../store/user/selectors/user.selectors';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { NgClass } from '@angular/common';
import { CHAT_STATUS_CONFIG, ChatStatus, Message } from '@knigolub/shared';
import {
  resetUserUpdateStatus,
  updateUserChatStatus,
} from '../../../store/user/actions/user.actions';
import { filter } from 'rxjs';
import {
  ICONS,
  MESSAGE_ERRORS_MESSAGES,
  OPERATION_STATUS,
  UpdateUserStatus,
} from '../../../core/constants/const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmojiComponent } from '../emoji-picker/emoji.component';
import { InsertEmojiDirective } from '../../directives/insert-emoji.directive';
import { Emoji } from '@nicematic/emoji-picker';
import { MessageCreateDto } from '../../../core/types/message-create.dto';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { messageValidator } from '../../validators/message.validator';
import { FormsModule } from '@angular/forms';
import {
  selectMessages,
  selectMessageStatus,
} from '../../../store/message/selectors/message.selectors';
import { createMessage, resetMessageStatus } from '../../../store/message/actions/message.actions';
import { MessageCardComponent } from '../message-card/message-card.component';
import { ChatScrollBottomDirective } from '../../directives/chat-scroll-bottom.directive';
import {
  selectUsersOnline,
  selectUsersOnlineTotal,
} from '../../../store/online-user/selectors/online-user.selectors';
import { OnlineUserComponent } from '../online-user/online-user.component';

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
    MessageCardComponent,
    ChatScrollBottomDirective,
    OnlineUserComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  private readonly store = inject(Store<AppState>);
  private readonly chatService = inject(ChatService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly emojiDirective = viewChild.required(InsertEmojiDirective);
  private readonly chatScrollDirective = viewChild.required(ChatScrollBottomDirective);
  private readonly messageModel = signal<MessageCreateDto>({ text: '' });

  protected readonly CHAT_STATUS_CONFIG = CHAT_STATUS_CONFIG;
  protected readonly showScrollButton = computed(() => !this.chatScrollDirective().isNearBottom());

  public user = this.store.selectSignal(selectChatUser);
  public chatStatus = computed<ChatStatus>(() => this.user().chatStatus);
  public messages = this.store.selectSignal(selectMessages);
  public usersOnlineTotal = this.store.selectSignal(selectUsersOnlineTotal);
  public usersOnline = this.store.selectSignal(selectUsersOnline);

  public messageForm = form(this.messageModel, (fieldPath) => {
    required(fieldPath.text, { message: MESSAGE_ERRORS_MESSAGES.message.required });
    minLength(fieldPath.text, 1, { message: MESSAGE_ERRORS_MESSAGES.message.minLength });
    validate(fieldPath.text, (ctx) => messageValidator(ctx.value()));
  });

  ngOnInit(): void {
    this.store
      .select(selectUpdateUserStatus)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(
          (status) => status === UpdateUserStatus.SUCCESS || status === UpdateUserStatus.ERROR,
        ),
      )
      .subscribe(() => this.store.dispatch(resetUserUpdateStatus()));

    this.store
      .select(selectMessageStatus)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(
          (status) => status === OPERATION_STATUS.SUCCESS || status === OPERATION_STATUS.ERROR,
        ),
      )
      .subscribe(() => {
        this.messageForm().reset({ text: '' });
        this.store.dispatch(resetMessageStatus());
      });
  }

  public closeChat(): void {
    this.chatService.closeChat();
  }

  public selectChatStatus(status: ChatStatus): void {
    this.store.dispatch(updateUserChatStatus({ chatStatus: status }));
  }

  public onEmojiSelected(emoji: Emoji) {
    this.emojiDirective().insert(emoji);
  }

  public shouldShowHeader(index: number, messages: Message[]) {
    if (index === 0) return true;

    const prevMessage = messages[index - 1];
    const currentMessage = messages[index];

    return prevMessage.author.id !== currentMessage.author.id;
  }

  public hasNextFromSameAuthor(index: number, messages: Message[]) {
    if (index + 1 >= messages.length) return false;

    const currentMsg = messages[index];
    const nextMsg = messages[index + 1];

    return currentMsg.author.id === nextMsg.author.id;
  }

  public scrollDown(): void {
    this.chatScrollDirective().scrollBottom();
  }

  public onSubmit() {
    if (this.messageForm().valid()) {
      const { text } = this.messageForm().value();
      this.store.dispatch(createMessage({ text }));
    }
  }

  protected readonly ICONS = ICONS;
}
