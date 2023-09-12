import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { selectIsLoadingState } from './store/selectors';
import { Subscription, delay } from 'rxjs';
import { CustomBreakpointObserver } from './layout';
import { Store } from '@ngrx/store';
import { SidenavEndService } from './modules/sidenav-end/services/sidenav-end.service';
import { Overlay } from './modules/sidenav-end/enums/overlay.enum';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentDate = Date.now();
  isSmallScreen$ = this.breakpointsObserver?.isSmall$;
  isSmallScreen!: boolean;
  isMediumScreen$ = this.breakpointsObserver?.isMedium$;
  isMediumScreen!: boolean;
  isLargeScreen$ = this.breakpointsObserver?.isLarge$;
  isLargeScreen!: boolean;
  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$ = this.store.select(selectIsLoadingState).pipe(delay(0));
  openedSidenavEnd!: boolean;

  subscriptions: Subscription[] = [];
  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store,
    private cdRef: ChangeDetectorRef,
    private _sidenavEndService: SidenavEndService,
  ) {
    this.initSubscriptions();
    this.setColors();
  }
  ngOnDestroy(): void {
    this.subscriptions?.map((subs: Subscription) => subs.unsubscribe());
  }

  createTrend() {
    this._sidenavEndService.overlayActionSource.next({
      action: 'open',
      component: Overlay.EDIT_TREND,
      closeFirstLevel: true,
      isFirstLevel: true,
    });

  }
  actionOverlay(mode: boolean) {
    console.log("mode: ", mode);
    this.openedSidenavEnd = mode;
    this.cdRef.detectChanges();
  }
  closeSidenavEnd() {
    this._sidenavEndService.overlayActionSource.next({
      action: 'remove',
      closeFirstLevel: true,
    });
  }
  onBackdropClick() {
    this._sidenavEndService.overlayActionSource.next({
      action: 'remove',
      component: Overlay.ALL,
      closeFirstLevel: true,
    });
  }
  private initSubscriptions(): void {
    this.subscriptions.push(
      this.isLargeScreen$?.subscribe((isLargeScreen: boolean) => {
        this.isLargeScreen = isLargeScreen;
        setTimeout(() => {
          this.cdRef.detectChanges();
        }, 10);
      }),
      this.isMediumScreen$?.subscribe((isMediumScreen: boolean) => {
        this.isMediumScreen = isMediumScreen;
        setTimeout(() => {
          this.cdRef.detectChanges();
        }, 10);
      }),
      this.isSmallScreen$?.subscribe((isSmallScreen: boolean) => {
        this.isSmallScreen= isSmallScreen;
        setTimeout(() => {
          this.cdRef.detectChanges();
        }, 10);
      }),
    )
  }
  private setColors(): void {
    const root = document.documentElement;
    root.style.setProperty('--color-client', environment.color);
    console.log("environment.color: ", environment.color);
    root.style.setProperty('--color-client-400', this.LightenDarkenColor(environment.color, 10));
    root.style.setProperty('--color-client-transparency', environment.color + '19');
  }
  private LightenDarkenColor(col: string, amt: number): string {
    let usePound = false;
    if (col[0] == '#') {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = (num & 0x0000ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = ((num >> 8) & 0x00ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + ('00000' + (b | (g << 8) | (r << 16)).toString(16)).slice(-6);
  }
}
