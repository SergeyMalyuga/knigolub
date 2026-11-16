import { Directive, ElementRef, inject } from '@angular/core';
import { Emoji } from '@nicematic/emoji-picker';

@Directive({
  selector: '[appInsertEmoji]',
})
export class InsertEmojiDirective {
  private elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  public insert(emoji: Emoji): void {
    const target = this.elementRef.nativeElement;

    target.focus();

    const start = target.selectionStart ?? target.value.length;
    const end = target.selectionEnd ?? target.value.length;

    target.setRangeText(emoji.char, start, end, 'end');

    target.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
