import {
  Component,
  OnInit,
  ViewChild,
  ComponentRef,
  SimpleChange,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { SidenavEndDirective } from '../../directives/sidenav-end.directive';
import { Overlay } from '../../enums/overlay.enum';
import { SidenavEndService } from '../../services/sidenav-end.service';
import { TrendEditComponent } from 'src/app/modules/trends/trend-edit/trend-edit.component';
import { PayloadSidenavEnd } from '../../model/sidenav-end.model';

@Component({
  selector: 'app-sidenav-end',
  templateUrl: './sidenav-end.component.html',
  styleUrls: ['./sidenav-end.component.scss'],
})
export class SidenavEndComponent implements OnInit, OnDestroy {
  @ViewChild(SidenavEndDirective) overlay: SidenavEndDirective;
  @Output() overlayAction = new EventEmitter();
  overlaySelected = null;
  ref: ComponentRef<any>;
  overlayComponent: number;
  openComponents: Array<{ component: Overlay; position: number; isFirstLevel: boolean }> = [];
  constructor(
    private _sidenavEndService: SidenavEndService,
    private cdRef: ChangeDetectorRef
  ) {
    this.onOverlay();
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  private onOverlay() {
    this._sidenavEndService.onOverlayAction.subscribe((overlay) => {
      switch (overlay.action) {
        case 'open':
          setTimeout(() => {
            this.onOpenAction(overlay);
          }, 100);
          break;
        case 'update':
          this.updateRef(overlay.data);
          break;
        case 'hidden':
          if (this.openComponents[this.openComponents.length - 1].isFirstLevel) this.overlayAction.emit(false);
          this.onCloseAction(overlay);
          break;
        case 'remove':
          if (overlay.component === Overlay.ALL) {
            this.openComponents?.map((component, index) => {
              this.openComponents.pop();
              this.overlay.viewContainer.remove(index);
            });
            this.overlayAction.emit(false);
            this.onCloseAction(overlay);
            return;
          }
          this.overlayAction.emit(false);
          this.onCloseAction(overlay);
          break;
      }
    });
  }

  private updateRef(data: any) {
    (<any>this.ref.instance).data = data;
    const changes = {
      data: new SimpleChange((<any>this.ref.instance).data, data, false),
    };
    try {
      (<any>this.ref.instance).ngOnChanges(changes);
    } catch (error) {}
  }

  private onOpenAction(overlay: PayloadSidenavEnd) {
    console.log(overlay);
    this.overlaySelected = overlay.component;
    const viewContainerRef = this.overlay.viewContainer;
    this.overlayAction.emit(true);
    switch (overlay.component) {
      case Overlay.EDIT_TREND:
        this.ref = viewContainerRef.createComponent(TrendEditComponent);
        break;
      default:
        break;
    }

    this.openComponents.push({
      component: overlay.component,
      position: this.openComponents.length,
      isFirstLevel: overlay.isFirstLevel,
    });

    if (overlay.data) {
      console.log('aqui');
      this.ref.instance.data = overlay.data;
      console.log(' this.ref', this.ref);
      //this.updateRef(overlay.data);
      //this.ref.setInput('data', overlay.data);
        this.cdRef.detectChanges();
    }
    this.cdRef.detectChanges();
  }


  private onCloseAction(overlay) {
    this.openComponents.map((component, index) => {
      if (overlay.component === component.component) {
        this.openComponents =  this.openComponents.filter((item) => item !== component);
        this.overlay.viewContainer.remove(index);

      }
    });
  }
}
