import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadTrends } from '../store/actions/trends-list-page.actions';
import { selectTrendsByProvider } from '../store/selectors';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-trends-list',
    templateUrl: './trend.list.component.html',
    styleUrls: ['./trends-list.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        RouterLink,
        AsyncPipe,
    ],
})
export class TrendsListComponent implements OnInit {
  protected trends$ = this.store.select(selectTrendsByProvider);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTrends());
  }
}
