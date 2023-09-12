import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GetOneTrendResponse } from '../models/get-one-trend-response.model';
import { Trend } from '../models/trend.model';
import { GetAllTrendsResponse } from '../models/get-all-trends-response.model';
import { TrendResponse } from '../models/trend-response.model';
import { TrendProvider } from '../models/trend-provider.model';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;



  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(environment.getAllUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    console.log("id: ", id);
    const url = `${environment.getAllUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  public deleteOne(trendId: string): Observable<any> {
    const url = `${environment.deleteTrend}/${trendId}`;
    return this.httpClient.delete<GetOneTrendResponse>(url)
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
}
