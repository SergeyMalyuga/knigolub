import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app/app.reducer';
import { BookEffects } from './store/book/effects/book.effects';
import { UserEffects } from './store/user/effects/user.effects';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { FavoriteBookEffects } from './store/favorite/effects/favorite-book.effects';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,  withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })),
    provideStore(appReducer),
    provideHttpClient(withInterceptorsFromDi()),
    provideEffects(BookEffects, UserEffects, FavoriteBookEffects),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
};
