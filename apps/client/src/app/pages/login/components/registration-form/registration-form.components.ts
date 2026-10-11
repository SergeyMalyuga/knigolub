import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthFormType} from '../../../../core/constants/const';

@Component({
  selector: 'app-registration-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registration-form.components.html',
  styleUrl: './registration-form.components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponents {
  @Output() clicked = new EventEmitter<AuthFormType>();

  private fb = inject(FormBuilder);

  public isPasswordVisible = signal<boolean>(false);

  public loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$')]],
  });

  public get usernameControl() {
    return this.loginForm.get('username');
  }

  public get emailControl() {
    return this.loginForm.get('email');
  }

  public get passwordControl() {
    return this.loginForm.get('password');
  }

  public togglePassword(): void {
    this.isPasswordVisible.set(!this.isPasswordVisible())
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
  }

  public onClick(): void {
    this.clicked.emit(AuthFormType.Login);
  }
}
