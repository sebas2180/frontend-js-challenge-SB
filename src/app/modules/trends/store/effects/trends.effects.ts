import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendsCrudActions from '../actions/trend-crud.actions';
import { TrendService } from '../../services/trend.service';


@Injectable()
export class TrendsEffects {
  constructor(private actions$: Actions, private trendService: TrendService) {}

  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.url.toString().split('/trends/')[1]),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  deleteOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsCrudActions.deleteOneTrend),
      switchMap((payload) =>
      this.trendService.deleteOne(payload.trendId).pipe(
      map((response) => TrendsApiActions.deleteOneTrendSuccess({ response })),
      )
    )
    );
  });

  createOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsCrudActions.createOneTrend),
      switchMap((payload) =>
      this.trendService.createOne(payload.trend).pipe(
      map((response) => TrendsApiActions.createOneTrendSuccess({ response })),
      )
    )
    );
  });
  updateOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsCrudActions.updateOneTrend),
      switchMap((payload) =>
      this.trendService.updateOne(payload.trend, payload.id).pipe(
      map((response) => TrendsApiActions.updateOneTrendSuccess({ response })),
      catchError((err) => of(TrendsApiActions.updateOneTrendError(err)))
      )
    )
    );
  });


}
