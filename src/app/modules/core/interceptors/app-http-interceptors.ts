import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppHttpLoaderInterceptor } from './app-http-loader-interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpLoaderInterceptor,
    multi: true,
  },
];
