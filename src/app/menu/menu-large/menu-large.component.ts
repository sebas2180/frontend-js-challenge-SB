import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTrendsTotal } from 'src/app/modules/trends/store/selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
    selector: 'app-menu-large',
    templateUrl: './menu-large.component.html',
    styleUrls: ['./menu-large.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        AsyncPipe,
    ],
})
export class MenuLargeComponent {
  protected trendsTotal$ = this.store.select(selectTrendsTotal);

  constructor(private store: Store) {}
}
