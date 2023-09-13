import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/trends', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    loadComponent: () => import('./modules/core/components/app-page-not-found/app-page-not-found.component')
    .then((x) => x.AppPageNotFoundComponent) 

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
