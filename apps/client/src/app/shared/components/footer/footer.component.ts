import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {BreakpointService} from '../../../core/services/breakpoint.service';

@Component({
  selector: 'app-footer',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private breakpointService = inject(BreakpointService);

  public readonly IsAccordionMode = computed(() => this.breakpointService.updateAccordion());
}
