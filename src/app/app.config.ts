import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';
import { routes } from './app.routes';
import { authInterceptor } from '../interceptor/auth.interceptor';

// 1. Register the Indian locale data
registerLocaleData(localeIn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    
    // 2. Properly wrap the locale provider in curly braces
    { provide: LOCALE_ID, useValue: 'en-IN' }
  ]
};
