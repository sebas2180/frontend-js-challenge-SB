
import { NgModule } from '@angular/core';;
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { ButtonPlusComponent } from './components/app-button-plus/app-button-plus.component';
import { AppProgressBarComponent } from './components/app-progress-bar/app-progress-bar.component';
import { AppPageNotFoundComponent } from './components/app-page-not-found/app-page-not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppButtonComponent,
    ButtonPlusComponent,
    AppPageNotFoundComponent,
    AppProgressBarComponent,
  ],
  imports: [ 
    CommonModule,
    MatProgressSpinnerModule,      
  ],
  exports: [
    AppButtonComponent,
    ButtonPlusComponent,
    AppProgressBarComponent,
  ],
})
export class CoreModule {}
