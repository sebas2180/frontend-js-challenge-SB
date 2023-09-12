import { Component, Input } from '@angular/core';
import { Overlay } from 'src/app/modules/sidenav-end/enums/overlay.enum';
import { SidenavEndService } from 'src/app/modules/sidenav-end/services/sidenav-end.service';

@Component({
    selector: 'app-trend-edit',
    templateUrl: './trend-edit.component.html',
    styleUrls: ['./trend-edit.component.scss'],
})
export class TrendEditComponent {
  @Input() data: any;
  isNewTrend = false;

  constructor(
    private _sidenavEndService : SidenavEndService,
    ) {
    this.isNewTrend = this.data?.trend?.id;
  }
  close(): void {
    this._sidenavEndService.overlayActionSource.next({
      action: 'remove',
      component: Overlay.EDIT_TREND,
    });
  }
  saveTrend(): void {

  }
}
