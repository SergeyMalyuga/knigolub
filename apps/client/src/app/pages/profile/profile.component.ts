import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {NgOptimizedImage} from '@angular/common';
import {SelectFileDirective} from '../../shared/directives/select-file.directive';
import {AvatarError} from '../../core/types/avatar-error.type';
import {
  AVATAR_ERROR,
  AVATAR_MAX_SIZE,
  DEFAULT_AVATAR_URL,
  FileType,
  MAX_BIO_LENGTH,
  UpdateUserStatus,
} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {
  selectRegistrationDate,
  selectUpdateUserStatus,
  selectUserInfo,
  selectUserPersonalInfo
} from '../../store/user/selectors/user.selectors';
import {updateUser, uploadUserAvatar} from '../../store/user/actions/user.actions';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatError, MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {dateValidator} from '../../shared/validators/date.validator';
import {form, FormField, maxLength, pattern, validate} from '@angular/forms/signals';
import {UserEdit} from '../../core/models/user-edit.model';
import {formatDistanceToNow} from 'date-fns';
import {ru} from 'date-fns/locale';
import {NotificationService} from '../../core/services/notification.service';
import {filter} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {formatDate} from '../../core/utils/format-date.util';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent, NgOptimizedImage, SelectFileDirective, MatDatepickerModule, MatInput, MatFormField, MatLabel, MatSuffix, MatIcon, ReactiveFormsModule, MatError, FormField, FormsModule, MatHint],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private store = inject(Store<AppState>);
  private notificationService = inject(NotificationService);
  private destroyRef = inject(DestroyRef);

  protected readonly DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;
  protected readonly UpdateUserStatus = UpdateUserStatus;
  protected readonly MAX_BIO_LENGTH = MAX_BIO_LENGTH;

  public avatarError = signal<AvatarError | null>(null);
  public userInfo = this.store.selectSignal(selectUserInfo);
  public registrationDate = this.store.selectSignal(selectRegistrationDate);
  public updateUserStatus = this.store.selectSignal(selectUpdateUserStatus);
  public userPersonalInfo = this.store.selectSignal(selectUserPersonalInfo);

  ngOnInit(): void {
    this.store.select(selectUpdateUserStatus)
      .pipe(filter(status => status === UpdateUserStatus.SUCCESS),
        takeUntilDestroyed(this.destroyRef))
      .subscribe(() =>
        this.notificationService.showSuccessMessage('Профиль успешно обновлён'))
  }

  public regTimeAgo = computed(() => {
    const date = this.registrationDate();
    if (!date) return '0 дней'
    return formatDistanceToNow(date, {locale: ru});
  })

  private editModel = signal<UserEdit>({
    lastName: this.userPersonalInfo().lastName ?? '',
    firstName: this.userPersonalInfo().firstName ?? '',
    birthday: this.userPersonalInfo().birthday?.toString() ?? '',
    bio: this.userPersonalInfo().bio ?? ''
  })

  public isSimilarUserData = computed(() => {
    const orig = this.userPersonalInfo();
    const edit = this.editModel();

    return orig.firstName === edit.firstName &&
      orig.lastName === edit.lastName &&
      orig.bio === edit.bio &&
      formatDate(orig.birthday) === formatDate(edit.birthday);
  })

  public editForm = form(this.editModel, (fieldPath) => {
    pattern(fieldPath.lastName, /^[A-Za-zА-Яа-яЁё]+$/, {message: 'Только буквы'}),
      pattern(fieldPath.firstName, /^[A-Za-zА-Яа-яЁё]+$/, {message: 'Только буквы'}),
      validate(fieldPath.birthday, (ctx) => dateValidator(ctx.value())),
      maxLength(fieldPath.bio, MAX_BIO_LENGTH, {message: `Максимум ${MAX_BIO_LENGTH} символов`})
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
      const {lastName, firstName, birthday, bio} = this.editForm().value();
      const formatted = formatDate(birthday);
      this.store.dispatch(updateUser({
        updateUserDto: {
          lastName,
          firstName,
          birthday: formatted,
          bio
        }
      }));
    }
  }
}
