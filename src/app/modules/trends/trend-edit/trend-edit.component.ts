import { Component, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Overlay } from 'src/app/modules/sidenav-end/enums/overlay.enum';
import { SidenavEndService } from 'src/app/modules/sidenav-end/services/sidenav-end.service';
import { createOneTrend, updateOneTrend } from '../store/actions/trend-crud.actions';
import { TrendRequest } from '../models/trend-request.model';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { Trend } from '../models/trend.model';
import { actionRequireTrendEditState, updateLoaderUpdateState, updateMessageTrendState } from '../store/actions/trends-list-page.actions';
import { Subscription, } from 'rxjs';
import { selectactionRequireTrendState, selectIsLoadingUpdateState, selectMessageState } from '../store/reducers';
import { TrendActionEnum } from '../enums/trend-actions.enum';
import { AppProgressBarComponent } from '../../core/components/app-progress-bar/app-progress-bar.component';
import { NgIf, NgClass, AsyncPipe, NgFor } from '@angular/common';
import { AppButtonComponent } from '../../core/components/app-button/app-button.component';
import { TrendMsgAction } from '../models/trend-msg-action.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TrendService } from '../services/trend.service';
import { MatOptionModule } from '@angular/material/core';
import { TrendProvider } from '../models/trendProvider.model';

/*
  He generado el formulario de forma estática, pero para con un poco más de tiempo se puede levantar las opciones del formGroup de un json/api,
  Luego con esto podemos pintar los inputs, con sus correspondientes configuraciones. Con esto logramos que podamos reutilizar los componentes.
*/

@Component({
    selector: 'app-trend-edit',
    templateUrl: './trend-edit.component.html',
    styleUrls: ['./trend-edit.component.scss'],
    standalone: true,
    imports: [
        AppButtonComponent,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        NgFor,
        NgClass,
        AppProgressBarComponent,
        AsyncPipe,
        MatSnackBarModule,
        MatOptionModule,
        MatSelectModule
    ],
})
export class TrendEditComponent implements OnInit, OnDestroy {
  @Input() data: {trend: Trend};
  isEditTrend = false;

  trendEditionGroup: FormGroup= new FormGroup({
    url: new FormControl(null, Validators.compose([Validators.required])),
    provider: new FormControl(null, Validators.compose([Validators.required])),
    title: new FormControl(null, Validators.compose([Validators.required])),
    body: new FormControl(null, Validators.compose([Validators.required])),
    image: new FormControl(null, Validators.compose([Validators.required])),
  })

  messageState$ = this.store.select(selectMessageState);

  actionRequire$ = this.store.select(selectactionRequireTrendState);

  isLoadingUpdate$ = this.store.select(selectIsLoadingUpdateState);
  isLoadingUpdate!: boolean;

  subscriptions: Subscription[] = [];

  providerOptions: TrendProvider[] = [
    { id: 'elpais', svg: 'assets/Logos/El_Pais.svg', name: 'El País'},
    { id: 'elmundo', svg: 'assets/Logos/El_Mundo.svg', name: 'El Mundo'},
  ];
  trendProviderSelected: TrendProvider = null;

  constructor(
    private _sidenavEndService : SidenavEndService,
    private store: Store,
    private _trendService: TrendService,
    ) {}
  ngOnDestroy(): void {
    this.subscriptions?.map((subs: Subscription) => subs.unsubscribe());
  }
  ngOnInit(): void {
    this.setForm();
    this.initSubscriptions();
  }
  close(): void {
    this._sidenavEndService.overlayActionSource.next({
      action: 'remove',
      component: Overlay.EDIT_TREND,
    });
  }
  changeProvider(event: MatSelectChange) {
    if (event?.value) this.setProviderItem(event.value);
  }
  saveTrend(): void {
    if (this.isLoadingUpdate) return;
    if (this.trendEditionGroup.invalid) {
      this.trendEditionGroup.markAllAsTouched();
      return;
    }

    this.store.dispatch(updateLoaderUpdateState({ isLoadingUpdate: true }));

    if (!this.isEditTrend) {
      let newTrend: TrendRequest = {
        url: this.trendEditionGroup.get('url').value,
        provider: this.trendEditionGroup.get('provider').value,
        body: this.trendEditionGroup.get('body').value,
        title: this.trendEditionGroup.get('title').value,
        image: this.trendEditionGroup.get('image').value,
      };
      this.store.dispatch(createOneTrend({trend: newTrend}));
    } else {
      let editedTrend: TrendRequest = {};
      if (this.trendEditionGroup.get('url').value !== this.data.trend.url) editedTrend.url= this.trendEditionGroup.get('url').value;
      if (this.trendEditionGroup.get('provider').value !== this.data.trend.provider) editedTrend.provider= this.trendEditionGroup.get('provider').value;
      if (this.trendEditionGroup.get('body').value !== this.data.trend.body) editedTrend.body= this.trendEditionGroup.get('body').value;
      if (this.trendEditionGroup.get('title').value !== this.data.trend.title) editedTrend.title= this.trendEditionGroup.get('title').value;
      if (this.trendEditionGroup.get('title').value !== this.data.trend.image) editedTrend.image= this.trendEditionGroup.get('image').value;
      this.store.dispatch(updateOneTrend({trend: editedTrend, id: this.data.trend.id}));
    }
  }
  openImage() {
    window.open(this.trendEditionGroup.get('image').value, '_blank');
  }
  removeImage() {
    this.trendEditionGroup.get('image').setValue(null);
  }
  private setForm(): void {
    this.isEditTrend = this.data && this.data['trend'] !== undefined;
    if (this.isEditTrend) this.setValues();
  }
  private setValues(): void {
    if (this.data.trend.url) this.trendEditionGroup.get('url').setValue(this.data.trend.url);
    if (this.data.trend.provider) {
      this.trendEditionGroup.get('provider').setValue(this.data.trend.provider);
      this.setProviderItem(this.data.trend.provider);
    }
    if (this.data.trend.body) this.trendEditionGroup.get('body').setValue(this.data.trend.body);
    if (this.data.trend.title) this.trendEditionGroup.get('title').setValue(this.data.trend.title);
    if (this.data.trend.image) this.trendEditionGroup.get('image').setValue(this.data.trend.image);
  }
  private setProviderItem(id: string): void {
    this.trendProviderSelected = this.providerOptions.find((provider: TrendProvider) => provider.id === id);
  }
  private initSubscriptions() : void {
    this.subscriptions.push(
      this.isLoadingUpdate$.subscribe((loader: boolean) => {
        // Si está cargando, bloqueo el formulario
        loader ? this.trendEditionGroup.disable() : this.trendEditionGroup.enable();

        this.isLoadingUpdate = loader;
      }),
      this.messageState$.subscribe((message: TrendMsgAction) => {
        if (message) {
        this.store.dispatch(updateMessageTrendState({ msg: null }));
        this._trendService.manageTrendAction(message);
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

}
