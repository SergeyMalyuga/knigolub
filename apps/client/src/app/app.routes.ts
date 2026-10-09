import { Routes } from '@angular/router';
import { AppRoute } from './core/constants/const';

export const routes: Routes = [
  {
    path: AppRoute.MAIN,
    title: 'Главная страница',
    loadComponent: () => import('./pages/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: '**',
    title: '404 Not Found',
    loadComponent: () => import('./pages/404/404.component').then((m) => m.NotFoundComponent),
  }
];
