import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadTrends } from '../store/actions/trends-list-page.actions';
import { selectTrendsByProvider } from '../store/selectors';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-trends-list',
    template: `
    <article class="trend" *ngFor="let trend of trends$ | async">
      <a class="trend__link" routerLink="/trends/{{ trend.id }}">
        <figure class="trend__figure">
          <img class="trend__image" [src]="trend.image" [alt]="trend.title" />
          <figcaption class="trend__title">
            <h2>{{ trend.title }}</h2>
          </figcaption>
        </figure>
        <p class="trend__excerpt">{{ trend.body[0] }}</p>
      </a>
    </article>
  `,
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
