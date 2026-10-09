import {ChangeDetectionStrategy, Component, computed, inject, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {BreakpointService} from '../../../core/services/breakpoint.service';
import {isNotFound} from '@angular/core/primitives/di';

@Component({
  selector: 'app-footer',
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() isMiniLayout = false;

  private breakpointService = inject(BreakpointService);

  public readonly IsAccordionMode = computed(() => this.breakpointService.updateAccordion());
  protected readonly isNotFound = isNotFound;
}
