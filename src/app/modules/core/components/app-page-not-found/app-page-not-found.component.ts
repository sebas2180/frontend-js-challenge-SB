import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-app-page-not-found',
    templateUrl: './app-page-not-found.component.html',
    styleUrls: ['./app-page-not-found.component.scss'],
})
export class AppPageNotFoundComponent {
  constructor(private router: Router) {
    let routerStateSnapshot = this.router.routerState.snapshot;
  }
  comeback() {
    this.router.navigate(['/']);
  }
}
