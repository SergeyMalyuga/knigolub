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
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AppRoute, AuthFormType, AuthStatus} from '../../../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../core/models/app.state';
import {login} from '../../../../store/user/actions/user.actions';
import {Credential} from '@knigolub/shared';
import {selectAuthStatus, selectUserError} from '../../../../store/user/selectors/user.selectors';
import {first} from 'rxjs';
import {Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: '../styles/auth-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  @Output() clicked = new EventEmitter<AuthFormType>();

  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public isPasswordVisible = signal<boolean>(false);
  public userError = this.store.selectSignal(selectUserError);

  public ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(first(status => status === AuthStatus.AUTH),
      takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loginForm.reset();
        this.router.navigate([AppRoute.MAIN]);
      })
  }

  public loginForm: FormGroup = this.fb.group({
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

  public get emailControl() {
    return this.loginForm.get('email');
  }

  public get passwordControl() {
    return this.loginForm.get('password');
  }

  public togglePassword(): void {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      const {email, password} = this.loginForm.value;
      const credential: Credential = {email, password};
      this.store.dispatch(login({credential}));
    }
  }

  public onClick(): void {
    this.clicked.emit(AuthFormType.Register);
  }
}
