import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appCloseOnEscape]',
})
export class CloseOnEscapeDirective {
  @Output() closed = new EventEmitter();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closed.emit();
  }
}
