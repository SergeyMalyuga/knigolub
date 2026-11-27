import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from '@knigolub/shared';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-message-card',
  imports: [DatePipe, NgClass],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageCardComponent {
  @Input({ required: true }) message!: Message;
  @Input({ required: true }) isOwner!: boolean;
  @Input({ required: true }) shouldShowHeader!: boolean;

  protected readonly console = console;
}
