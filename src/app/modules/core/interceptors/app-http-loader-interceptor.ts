import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';
import { updateLoaderState } from '../../../store/actions/loader.actions';


@Injectable()
export class AppHttpLoaderInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.dispatch(updateLoaderState({ isLoading: true }));
    return next
      .handle(req)
      .pipe(
        finalize(() =>
          this.store.dispatch(updateLoaderState({ isLoading: false }))
        )
      );
  }
}
