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
import { PayloadSidenavEnd } from '../../model/sidenav-end.model';
import { TrendEditComponent } from 'src/app/modules/trends/trend-edit/trend-edit.component';

@Component({
    selector: 'app-sidenav-end',
    templateUrl: './sidenav-end.component.html',
    styleUrls: ['./sidenav-end.component.scss'],
})
export class SidenavEndComponent implements OnInit, OnDestroy {
  @ViewChild(SidenavEndDirective) overlay!: SidenavEndDirective;
  @Output() overlayAction = new EventEmitter();
  overlaySelected: any = null;
  ref!: ComponentRef<any>;
  overlayComponent!: number;
  openComponents: Array<{ component: any; position: number; isFirstLevel?: boolean }> = [];
  constructor(
    private _sidenavEndService: SidenavEndService,
    private cdRef: ChangeDetectorRef
  ) {
    console.log('pko');
    this.onOverlay();
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  private onOverlay() {
    this._sidenavEndService.onOverlayAction.subscribe((overlay) => {
      console.log("overlay: ", overlay);
      switch (overlay.action) {
        case 'open':
          if (overlay.closeFirstLevel) this.closeFirtsLevelComponents();
          setTimeout(() => {
            this.onOpenAction(overlay);
          }, 10);
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
          if (overlay.closeFirstLevel) this.closeFirtsLevelComponents();
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
    console.log("overlay: ", overlay);
    this.overlaySelected = overlay.component;
    const viewContainerRef = this.overlay.viewContainer;
    this.overlayAction.emit(true);
    switch (overlay.component) {
      case Overlay.EDIT_TREND:
        this.ref = viewContainerRef.createComponent(TrendEditComponent);
        console.log("this.ref: ", this.ref);
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
      this.ref.instance.data = overlay.data;
    }
    this.cdRef.detectChanges();
  }

  private closeFirtsLevelComponents() {
    return;
  }

  private onCloseAction(overlay: any) {
    this.openComponents.map((component, index) => {
      if (overlay.component === component.component) {
        this.openComponents =  this.openComponents.filter((item) => item !== component);
        this.overlay.viewContainer.remove(index);

      }
    });
  }
}
