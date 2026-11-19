import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Message} from '@knigolub/shared';

@Component({
  selector: 'app-message-card',
  imports: [],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageCardComponent {
  @Input({required: true}) message!: Message;
}
