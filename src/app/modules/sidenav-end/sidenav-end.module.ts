
import { NgModule } from '@angular/core';;
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { SidenavEndComponent } from './components/sidenav-end/sidenav-end.component';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    SidenavEndComponent,

  ],
  exports:[
    SidenavEndComponent,
  ],
  imports: [ 
    CommonModule,      
  ],
})
export class SidenavEndModule {}
