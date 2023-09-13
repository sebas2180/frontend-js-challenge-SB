import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Overlay } from 'src/app/modules/sidenav-end/enums/overlay.enum';
import { SidenavEndService } from 'src/app/modules/sidenav-end/services/sidenav-end.service';
import { selectSelectedTrend } from '../store/selectors';
import { Trend } from '../models/trend.model';
import { deleteOneTrend } from '../store/actions/trend-crud.actions';
import { selectactionRequireTrendState } from '../store/reducers';
import { TrendActionEnum } from '../enums/trend-acions.enum';
import { actionRequireTrendEditState } from '../store/actions/trends-list-page.actions';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-trend-detail',
    templateUrl: './trend-detail.component.html',
    styleUrls: ['./trend-detail.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgIf,
        NgFor,
        AsyncPipe,
    ],
})
export class TrendDetailComponent implements OnInit, OnDestroy{
  protected trend$ = this.store.select(selectSelectedTrend);
  actionRequire$ = this.store.select(selectactionRequireTrendState);

  subscriptions: Subscription[] = [];
  constructor(
    private store: Store,
    private _sidenavEndService: SidenavEndService,
    private router: Router,
    ) {}
  ngOnDestroy(): void {
    this.subscriptions?.map((subs: Subscription) => subs.unsubscribe());
  }
  ngOnInit(): void {
    this.initSubscriptions();
  }

  deleteTrend(trend: Trend) {
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
  private initSubscriptions() : void {
    this.subscriptions.push(
      this.actionRequire$.subscribe((actionRequire: TrendActionEnum) => {
        if (actionRequire === TrendActionEnum.NAV_HOME) {
          this.store.dispatch(actionRequireTrendEditState({action: null}));
          this.router.navigate(['/']);
        }
      })
    );
  }
}
