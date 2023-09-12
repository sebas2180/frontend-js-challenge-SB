import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TrendDetailComponent } from './trend-detail/trend-detail.component';
import { TrendsListComponent } from './trends-list/trends-list.component';

const trendsRoutes: Route[] = [
  { path: 'trends', component: TrendsListComponent },
  { path: 'trends/:id', component: TrendDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(trendsRoutes)],
  exports: [RouterModule],
})
export class AppTrendsRoutingModule {}
