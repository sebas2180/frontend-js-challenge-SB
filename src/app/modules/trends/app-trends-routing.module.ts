import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const trendsRoutes: Route[] = [
  { 
    path: 'trends', 
    loadComponent: () => import('./trends-list/trends-list.component').then((x) => x.TrendsListComponent) 
  },
  { 
    path: 'trends/:id', 
    loadComponent: () => import('./trend-detail/trend-detail.component').then((x) => x.TrendDetailComponent) 
},
];

@NgModule({
  imports: [RouterModule.forChild(trendsRoutes)],
  exports: [RouterModule],
})
export class AppTrendsRoutingModule {}
