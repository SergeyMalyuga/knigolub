import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoute, AuthFormType, AuthStatus } from '../../../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/models/app.state';
import { registerUser } from '../../../../store/user/actions/user.actions';
import { selectAuthStatus, selectUserError } from '../../../../store/user/selectors/user.selectors';
import { UserErrorField } from '@knigolub/shared';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registration-form',
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.components.html',
  styleUrl: '../styles/auth-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponents implements OnInit {
  @Output() clicked = new EventEmitter<AuthFormType>();

  private fb = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  protected readonly UserErrorField = UserErrorField;

  public isPasswordVisible = signal<boolean>(false);
  public userError = this.store.selectSignal(selectUserError);

  public ngOnInit(): void {
    this.store
      .select(selectAuthStatus)
      .pipe(
        first((status) => status === AuthStatus.AUTH),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.registerForm.reset();
        this.router.navigate([AppRoute.MAIN]);
      });
  }

  public registerForm: FormGroup = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z0-9_]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$'),
      ],
    ],
  });

  public get usernameControl() {
    return this.registerForm.get('username');
  }

  public get emailControl() {
    return this.registerForm.get('email');
  }

  public get passwordControl() {
    return this.registerForm.get('password');
  }

  public togglePassword(): void {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }

  public onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      const { username, email, password } = this.registerForm.value;
      const newUser = { username, email, password };
      this.store.dispatch(registerUser({ newUser }));
    }
  }

  public onClick(): void {
    this.clicked.emit(AuthFormType.Login);
  }
}
