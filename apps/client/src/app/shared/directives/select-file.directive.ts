import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';

@Directive({
  selector: '[appSelectFile]',
})
export class SelectFileDirective {
  @Output() fileSelected = new EventEmitter<File>();

  private elementRef = inject(ElementRef);

  @HostListener('change')
  onFileChange(): void {
    const input = this.elementRef.nativeElement as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.fileSelected.emit(file);
    }
  }
}
