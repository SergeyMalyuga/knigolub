import {Routes} from '@angular/router';
import {AppRoute} from './core/constants/const';

export const routes: Routes = [
  {
    path: AppRoute.MAIN,
    title: 'Главная страница',
    loadComponent: () => import('./pages/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: AppRoute.LOGIN,
    title: 'Войти в клуб',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: AppRoute.PROFILE,
    title: 'Профиль',
    loadComponent: () =>
      import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: AppRoute.FAVORITES,
    title: 'Избранное',
    loadComponent: () => import('./pages/favorites/favorites.component').then((m) => m.FavoritesComponent),
  },
  {
    path: '**',
    title: '404 Not Found',
    loadComponent: () => import('./pages/404/404.component').then((m) => m.NotFoundComponent),
  },
];
