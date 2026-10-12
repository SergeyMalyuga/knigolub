import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app/app.reducer';
import { BookEffects } from './store/book/effects/book.effects';
import { UserEffects } from './store/user/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(appReducer),
    provideHttpClient(withInterceptorsFromDi()),
    provideEffects(BookEffects, UserEffects),
  ],
};
