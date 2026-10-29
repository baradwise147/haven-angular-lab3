import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideRouter, withComponentInputBinding, withInMemoryScrolling} from '@angular/router';
import {AppComponent} from './app/app.component';
import {routes} from './app/app.routes';
import {loggingInterceptor} from './app/core/logging.interceptor';

registerLocaleData(localeUk);
bootstrapApplication(AppComponent, {
    providers: [{
        provide: LOCALE_ID,
        useValue: 'uk'
    }, provideHttpClient(withInterceptors([loggingInterceptor])), provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({scrollPositionRestoration: 'enabled'}))]
}).catch(console.error);
