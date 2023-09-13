import { Component, Input, ChangeDetectorRef, OnInit, OnDestroy, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Overlay } from 'src/app/modules/sidenav-end/enums/overlay.enum';
import { SidenavEndService } from 'src/app/modules/sidenav-end/services/sidenav-end.service';
import { createOneTrend, updateOneTrend } from '../store/actions/trend-crud.actions';
import { TrendRequest } from '../models/trend-request.model';
import { Trend } from '../models/trend.model';
import { actionRequireTrendEditState, updateLoaderUpdateState, updateMessageTrendState } from '../store/actions/trends-list-page.actions';
import { Subscription } from 'rxjs';
import { selectactionRequireTrendState, selectIsLoadingUpdateState, selectMessageState } from '../store/reducers';
import { TrendActionEnum } from '../enums/trend-actions.enum';
import { AppProgressBarComponent } from '../../core/components/app-progress-bar/app-progress-bar.component';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';
import { AppButtonComponent } from '../../core/components/app-button/app-button.component';
import { TrendMsgAction } from '../models/trend-msg-action.model';
import { TrendMsgActionEnum } from '../enums/trend-msg-actions.enum';
import { InformationSnackBarComponent } from '../../dialogs/components/information-snack-bar/information-snack-bar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

/*
  He generado el formulario de forma estática, pero para con un poco más de tiempo se puede levantar las opciones del formGroup de un json/api,
  Luego con esto podemos pintar los inputs, con sus correspondientes configuraciones. Con esto logramos que podamos reutilizar los componentes.
*/

@Component({
    selector: 'app-trend-edit',
    templateUrl: './trend-edit.component.html',
    styleUrls: ['./trend-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AppButtonComponent,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgClass,
        AppProgressBarComponent,
        AsyncPipe,
        MatSnackBarModule,
    ],
})
export class TrendEditComponent implements OnInit, OnDestroy {
  @Input() data: {trend: Trend};
  isEditTrend = false;

  trendEditionGroup: FormGroup= new FormGroup({
    url: new FormControl(null),
    provider: new FormControl(null),
    title: new FormControl(null),
    body: new FormControl(null),
  })

  messageState$ = this.store.select(selectMessageState);

  actionRequire$ = this.store.select(selectactionRequireTrendState);

  isLoadingUpdate$ = this.store.select(selectIsLoadingUpdateState);
  isLoadingUpdate!: boolean;

  subscriptions: Subscription[] = [];
  constructor(
    private _sidenavEndService : SidenavEndService,
    private store: Store,
    private cdRef: ChangeDetectorRef,
    private snack: MatSnackBar,
    private zone: NgZone,
    ) {}
  ngOnDestroy(): void {
    this.subscriptions?.map((subs: Subscription) => subs.unsubscribe());
  }
  ngOnInit(): void {
    this.setForm();
    this.initSubscriptions();
    this.cdRef.detectChanges();
  }
  close(): void {
    this._sidenavEndService.overlayActionSource.next({
      action: 'remove',
      component: Overlay.EDIT_TREND,
    });
  }
  saveTrend(): void {
    if (this.isLoadingUpdate) return;
    if (this.trendEditionGroup.invalid) {
      this.trendEditionGroup.markAllAsTouched();
      this.cdRef.detectChanges();
      return;
    }
    
    this.store.dispatch(updateLoaderUpdateState({ isLoadingUpdate: true }));

    if (!this.isEditTrend) {
      let newTrend: TrendRequest = {
        url: this.trendEditionGroup.get('url').value,
        provider: this.trendEditionGroup.get('provider').value,
        body: this.trendEditionGroup.get('body').value,
        title: this.trendEditionGroup.get('title').value
      };
      this.store.dispatch(createOneTrend({trend: newTrend}));
    } else {
      let editedTrend: TrendRequest = {};
      if (this.trendEditionGroup.get('url').value !== this.data.trend.url) editedTrend.url= this.trendEditionGroup.get('url').value;
      if (this.trendEditionGroup.get('provider').value !== this.data.trend.provider) editedTrend.provider= this.trendEditionGroup.get('provider').value;
      if (this.trendEditionGroup.get('body').value !== this.data.trend.body) editedTrend.body= this.trendEditionGroup.get('body').value;
      if (this.trendEditionGroup.get('title').value !== this.data.trend.title) editedTrend.title= this.trendEditionGroup.get('title').value;
      this.store.dispatch(updateOneTrend({trend: editedTrend, id: this.data.trend.id}));
    }
    this.cdRef.detectChanges();
  }
  private setForm(): void {
    this.isEditTrend = this.data && this.data['trend'] !== undefined;
    !this.isEditTrend ? this.addControls() : this.setValues();
  }

  private addControls(): void {
    this.trendEditionGroup.get('url').addValidators(Validators.required);
    this.trendEditionGroup.get('title').addValidators(Validators.required);
    this.trendEditionGroup.get('provider').addValidators(Validators.required);
    this.trendEditionGroup.get('body').addValidators(Validators.required);
  }
  private setValues(): void {
    if (this.data.trend.url) this.trendEditionGroup.get('url').setValue(this.data.trend.url);
    if (this.data.trend.provider) this.trendEditionGroup.get('provider').setValue(this.data.trend.provider);
    if (this.data.trend.body) this.trendEditionGroup.get('body').setValue(this.data.trend.body);
    if (this.data.trend.title) this.trendEditionGroup.get('title').setValue(this.data.trend.title);
  }
  private initSubscriptions() : void {
    this.subscriptions.push(
      this.isLoadingUpdate$.subscribe((loader: boolean) => {
        this.isLoadingUpdate = loader;
      }),
      this.messageState$.subscribe((message: TrendMsgAction) => {
        console.log('(state);', message);
        if (message) {
        this.store.dispatch(updateMessageTrendState({ msg: null }));
        this.manageTrendAction(message);
        }
      }),
      this.actionRequire$.subscribe((actionRequire: TrendActionEnum) => {
        if (actionRequire === TrendActionEnum.CLOSE_DIALOG) {
          this.store.dispatch(actionRequireTrendEditState({action: null}));
          this.close();
        }
      })
    );
  }
  private manageTrendAction(message: TrendMsgAction): void {
    switch(message.type) {
      case TrendMsgActionEnum.SNACKBAR:
      case TrendMsgActionEnum.SUCCESS_DIALOG:
        console.log('entra aqui...');
        // Los TrendMsgActionEnum.SUCCESS_DIALOG hay que separarlo en otro case, y mostrarlo como MatDialog.

          this.snack.open(
            message.message, 'success',
            {duration: 100000,  horizontalPosition: 'center', verticalPosition: 'bottom'},
          );
        break;
    }
  }
}
