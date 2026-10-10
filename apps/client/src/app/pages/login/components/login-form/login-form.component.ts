import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public isPasswordVisible = signal<boolean>(false);

  public togglePassword(): void {
    this.isPasswordVisible.set(!this.isPasswordVisible())
  }
}
