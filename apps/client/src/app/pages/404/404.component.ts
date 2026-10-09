import {Component} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';

@Component({
  templateUrl: './404.component.html',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink
  ],
  styleUrl: './404.component.scss'
})
export class NotFoundComponent {

  protected readonly AppRoute = AppRoute;
}
