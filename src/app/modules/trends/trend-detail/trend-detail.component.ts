import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Overlay } from 'src/app/modules/sidenav-end/enums/overlay.enum';
import { SidenavEndService } from 'src/app/modules/sidenav-end/services/sidenav-end.service';
import { selectSelectedTrend } from '../store/selectors';
import { Trend } from '../models/trend.model';
import { deleteOneTrend } from '../store/actions/trend-crud.actions';
import { selectMessageState, selectactionRequireTrendState } from '../store/reducers';
import { TrendActionEnum } from '../enums/trend-actions.enum';
import { actionRequireTrendEditState, updateMessageTrendState } from '../store/actions/trends-list-page.actions';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/components/confirm-dialog/confirm-dialog.component';
import { TrendMsgAction } from '../models/trend-msg-action.model';
import { TrendService } from '../services/trend.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

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
        MatDialogModule,
        MatSnackBarModule,
    ],
})
export class TrendDetailComponent implements OnInit, OnDestroy{
  protected trend$ = this.store.select(selectSelectedTrend);
  actionRequire$ = this.store.select(selectactionRequireTrendState);
  messageState$ = this.store.select(selectMessageState);

  subscriptions: Subscription[] = [];

  // Assets
  srcDefault = environment.default_image;
  constructor(
    private store: Store,
    private _sidenavEndService: SidenavEndService,
    private router: Router,
    private dialog: MatDialog,
    private _trendService: TrendService,
    ) {}
  ngOnDestroy(): void {
    this.subscriptions?.map((subs: Subscription) => subs.unsubscribe());
  }
  ngOnInit(): void {}

  deleteTrend(trend: Trend) {
    const dialogDelete = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: '¿Seguro que quieres eliminar la noticia?',
        accept_label: 'Eliminar',
        dismiss_label: 'Cancelar'
      }
    })
    dialogDelete.componentInstance.onResult.subscribe((confirm) => {
      if (confirm) {
        this.initSubscriptions();
        this.store.dispatch(deleteOneTrend({trendId: trend.id}));
      }
    }
    );
    dialogDelete.afterClosed().subscribe((_) => {
      this.subscriptions?.map((subs: Subscription) => subs.unsubscribe());
      dialogDelete.componentInstance.onResult.unsubscribe()
    });
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
          // AL eliminar un trend, navego al home
          this.router.navigate(['/']);
        }
      }),
      this.messageState$.subscribe((message: TrendMsgAction) => {
        if (message) {
        this.store.dispatch(updateMessageTrendState({ msg: null }));
        this._trendService.manageTrendAction(message);
        }
      }),
    );
  }
  doSomethingOnError(evt: any) {
    evt.target.src = this.srcDefault;
  }
}
