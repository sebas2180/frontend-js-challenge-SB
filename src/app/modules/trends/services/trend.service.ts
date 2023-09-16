import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GetOneTrendResponse } from '../models/get-one-trend-response.model';
import { Trend } from '../models/trend.model';
import { GetAllTrendsResponse } from '../models/get-all-trends-response.model';
import { TrendResponse } from '../models/trend-response.model';
import { TrendProvider } from '../models/trend-provider.model';
import { TrendRequest } from '../models/trend-request.model';
import { TrendMsgAction } from '../models/trend-msg-action.model';
import { TrendMsgActionEnum } from '../enums/trend-msg-actions.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SidenavEndService } from '../../sidenav-end/services/sidenav-end.service';
import { Overlay } from '../../sidenav-end/enums/overlay.enum';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;



  constructor(
    private httpClient: HttpClient,
    private snack: MatSnackBar,
    private _sidenavEndService: SidenavEndService,
    
    ) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(environment.trendApi)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    const url = `${environment.trendApi}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  public deleteOne(trendId: string): Observable<any> {
    const url = `${environment.trendApi}/${trendId}`;
    return this.httpClient.delete<GetOneTrendResponse>(url)
  }
  public createOne(trend: TrendRequest): Observable<any> {
    const url = `${environment.trendApi}`;
    return this.httpClient.post<TrendRequest>(url, trend)
  }
  public updateOne(trend: TrendRequest, trendId: string): Observable<any> {
    const url = `${environment.trendApi}/${trendId}`;
    return this.httpClient.put<TrendRequest>(url, trend)
  }

  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      id: trendResponse._id,
      body: trendResponse.body.split('\n\n'),
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }

   async manageTrendAction(message: TrendMsgAction): Promise<void> {
    switch(message.type) {
      case TrendMsgActionEnum.SNACKBAR:
        this.snack.open(
          message.message, null,
          {duration: 5000, verticalPosition: 'top'},
        );
        break;
      case TrendMsgActionEnum.SUCCESS_DIALOG:
        this.snack.open(
          message.message, null,
          {duration: 5000, verticalPosition: 'top'},
        );
        // Cierro el sidenav
        this._sidenavEndService.overlayActionSource.next({
          action: 'remove',
          component: Overlay.ALL,
          closeFirstLevel: true,
        });
        break;
    }
  }
}
