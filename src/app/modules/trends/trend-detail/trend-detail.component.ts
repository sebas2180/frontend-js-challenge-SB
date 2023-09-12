import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Overlay } from 'src/app/modules/sidenav-end/enums/overlay.enum';
import { SidenavEndService } from 'src/app/modules/sidenav-end/services/sidenav-end.service';
import { selectSelectedTrend } from '../store/selectors';
import { Trend } from '../models/trend.model';
import { deleteOneTrend } from '../store/actions/trend-crud.actions';

@Component({
    selector: 'app-trend-detail',
    templateUrl: './trend-detail.component.html',
    styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  constructor(
    private store: Store,
    private _sidenavEndService: SidenavEndService,
    ) {
  }

  deleteTrend(trend: Trend) {
    console.log("trend: ", trend);
    this.store.dispatch(deleteOneTrend({trendId: trend.id}));
  }
  editTrend(trend: Trend) {
    this._sidenavEndService.overlayActionSource.next({
      action: 'open',
      component: Overlay.EDIT_TREND,
      data: {
        trend: trend
      },
    });
  }
}
