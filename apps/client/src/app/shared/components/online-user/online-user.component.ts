import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {OnlineUser} from '@knigolub/shared';
import {interval, map, startWith} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {formatDistanceToNow} from 'date-fns';
import {ru} from 'date-fns/locale';

@Component({
  selector: 'li[app-online-user]',
  imports: [],
  host: {class: 'online-user'},
  templateUrl: './online-user.component.html',
  styleUrl: './online-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnlineUserComponent {
  readonly onlineUser = input.required<OnlineUser>();

  private timer$ = interval(60000).pipe(
    startWith(0),
    map(() => Date.now())
  );
  private now = toSignal(this.timer$);

  protected readonly lastSeenAgo = computed(() => {
    this.now();
    return formatDistanceToNow(this.onlineUser().onlineSince, {
      locale: ru
    });
  });
}
