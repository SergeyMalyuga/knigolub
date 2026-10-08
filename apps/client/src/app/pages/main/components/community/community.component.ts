import { ChangeDetectionStrategy, Component } from '@angular/core';
import {Section} from '../../../../core/constants/const';

@Component({
  selector: 'app-community',
  imports: [],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityComponent {
  protected readonly Section = Section;
}
