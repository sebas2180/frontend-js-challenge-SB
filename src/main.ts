import { enableProdMode, LOCALE_ID, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app/store/reducers';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { AppTrendsModule } from './app/modules/trends';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { httpInterceptorProviders } from './app/app-http-interceptors';
import { CustomBreakpointObserver } from './app/layout';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
          CustomBreakpointObserver,
          importProvidersFrom(
          BrowserModule, 
          AppTrendsModule, 
          AppRoutingModule, 
          StoreModule.forRoot(reducers), StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }), EffectsModule.forRoot([]), StoreRouterConnectingModule.forRoot()),
        { 
          provide: LOCALE_ID, useValue: 'es'
         }, 
        httpInterceptorProviders,
      
        provideAnimations(),
    ]
})
  .catch((err) => console.error(err));
