import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthFormType } from '../../core/constants/const';
import { RegistrationFormComponents } from './components/registration-form/registration-form.components';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FooterComponent, LoginFormComponent, RegistrationFormComponents],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public formMode = signal<AuthFormType>(AuthFormType.Login);

  public setFormMode(newMode: AuthFormType): void {
    this.formMode.set(newMode);
  }

  protected readonly AuthFormType = AuthFormType;
}
