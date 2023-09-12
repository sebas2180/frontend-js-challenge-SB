import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PayloadSidenavEnd } from '../model/sidenav-end.model';

@Injectable({
  providedIn: 'root',
})
export class SidenavEndService {
  overlayActionSource = new Subject<PayloadSidenavEnd>();
  onOverlayAction = this.overlayActionSource.asObservable();

  overlayOnCloseSource = new Subject<any>();
  overlayOnClose = this.overlayOnCloseSource.asObservable();

  onClose() {
    return this.overlayOnClose;
  }
}
