import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPageNotFoundComponent } from './modules/core/components/app-page-not-found/app-page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/trends', pathMatch: 'full' },
  { path: '**', component: AppPageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
