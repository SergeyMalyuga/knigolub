import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {SelectFileDirective} from '../../shared/directives/select-file.directive';
import {AvatarError} from '../../core/types/avatar-error.type';
import {AVATAR_ERROR, AVATAR_MAX_SIZE, DEFAULT_AVATAR_URL, FileType} from '../../core/constants/const';
import {UserService} from '../../core/services/user.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectUserAvatar} from '../../store/user/selectors/user.selectors';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent, NgOptimizedImage, SelectFileDirective],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private userService = inject(UserService);
  private store = inject(Store<AppState>);

  public avatarError = signal<AvatarError | null>(null);
  public userAvatar = this.store.selectSignal(selectUserAvatar);

  public onAvatarSelected(file: File) {
    //TODO создать эффекты. Удалить прямой вызов userService.updateAvatar
    if (file.type.startsWith(FileType.IMAGE)) {
      if (file.size > AVATAR_MAX_SIZE) {
        this.avatarError.set(AVATAR_ERROR.SIZE);
        return;
      }
    } else {
      this.avatarError.set(AVATAR_ERROR.FORMAT);
      return;
    }
    const formData = new FormData();
    formData.append('avatarUrl', file);
    this.userService.updateAvatar(formData).subscribe();
  }

  protected readonly DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;
}
