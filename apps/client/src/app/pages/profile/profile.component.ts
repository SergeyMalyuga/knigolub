import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {SelectFileDirective} from '../../shared/directives/select-file.directive';
import {AvatarError} from '../../core/types/avatar-error.type';
import {AVATAR_ERROR, AVATAR_MAX_SIZE, DEFAULT_AVATAR_URL, FileType,} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectRegistrationDate, selectUserInfo} from '../../store/user/selectors/user.selectors';
import {uploadUserAvatar} from '../../store/user/actions/user.actions';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {dateValidator} from '../../shared/validators/date.validator';
import {form, FormField, pattern, validate} from '@angular/forms/signals';
import {UserEdit} from '../../core/models/user-edit.model';
import {formatDistanceToNow} from 'date-fns';
import {ru} from 'date-fns/locale';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent, NgOptimizedImage, SelectFileDirective, MatDatepickerModule, MatInput, MatFormField, MatLabel, MatSuffix, MatIcon, ReactiveFormsModule, MatError, FormField, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private store = inject(Store<AppState>);

  protected readonly DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;

  public avatarError = signal<AvatarError | null>(null);
  public userInfo = this.store.selectSignal(selectUserInfo);
  public registrationDate = this.store.selectSignal(selectRegistrationDate);

  public regTimeAgo = computed(() => {
    const date = this.registrationDate();
    if (!date) return '0 дней'
    return formatDistanceToNow(date, {locale: ru});
  })

  private editModel = signal<UserEdit>({
    lastName: '',
    firstName: '',
    birthday: '',
  })

  public editForm = form(this.editModel, (fieldPath) => {
    pattern(fieldPath.lastName, /^[A-Za-zА-Яа-яЁё]+$/, {message: 'Только буквы'}),
      pattern(fieldPath.firstName, /^[A-Za-zА-Яа-яЁё]+$/, {message: 'Только буквы'}),
      validate(fieldPath.birthday, (ctx) => dateValidator(ctx.value()))
  });

  public isFormEmpty = computed(() => {
    const value = this.editForm().value();

    return Object.values(value).every(fieldValue => fieldValue === null || fieldValue === undefined || fieldValue === '');
  })

  public onAvatarSelected(file: File) {
    if (!file.type.startsWith(FileType.IMAGE)) {
      this.avatarError.set(AVATAR_ERROR.FORMAT);
    }

    if (file.size > AVATAR_MAX_SIZE) {
      this.avatarError.set(AVATAR_ERROR.SIZE);
      return;
    }
    this.store.dispatch(uploadUserAvatar({file}));
  }

  public onSubmit(): void {
    if (this.editForm().valid()) {
      const {lastName, firstName, birthday} = this.editForm().value()
      console.log(lastName, firstName, birthday);
    }
  }
}
