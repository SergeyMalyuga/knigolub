import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { Emoji, EmojiPickerComponent } from '@nicematic/emoji-picker';

@Component({
  selector: 'app-emoji-picker',
  imports: [EmojiPickerComponent],
  templateUrl: './emoji.component.html',
  styleUrl: './emoji.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmojiComponent {
  @Output() emojiSelected = new EventEmitter<Emoji>();

  public isOpen = signal<boolean>(false);
  public isHover = signal<boolean>(false);

  public toggleMenu() {
    this.isOpen.set(!this.isOpen());
  }

  public closeMenu() {
    if (!this.isHover()) {
      this.isOpen.set(false);
    }
  }

  public onEmojiSelect(emoji: Emoji) {
    this.closeMenu();
    this.emojiSelected.emit(emoji);
  }
}
