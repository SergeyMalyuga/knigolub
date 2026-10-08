import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Section} from '../../../../core/constants/const';

@Component({
  selector: 'app-subscribe',
  imports: [],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribeComponent {
  protected readonly Section = Section;
}
