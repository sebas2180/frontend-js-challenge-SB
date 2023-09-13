import { createAction, props } from '@ngrx/store';
import { Trend } from '../../models/trend.model';

export const loadTrendsSuccess = createAction(
  '[Trends/CRUD] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const loadTrendsError = createAction('[Trends/CRUD] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/CRUD] Load One Trend Success',
  props<{ trend: Trend }>()
);

export const loadOneTrendError = createAction(
  '[Trends/CRUD] Load One Trend Error'
);
export const deleteOneTrendSuccess = createAction(
  '[Trends/CRUD] Delete One Trend Success',
  props<{ response: any }>()
);
export const deleteOneTrendError = createAction(
  '[Trends/CRUD] Delete One Trend Error',
  props<{ error: any }>()
);
export const createOneTrendSuccess = createAction(
  '[Trends/CRUD] Create One Trend Success',
  props<{ response: any }>()
);
export const createOneTrendError = createAction(
  '[Trends/CRUD] Create One Trend Error',
  props<{ error: any }>()
);
export const updateOneTrendSuccess = createAction(
  '[Trends/CRUD] Update One Trend Success',
  props<{ response: any }>()
);
export const updateOneTrendError = createAction(
  '[Trends/CRUD] Update One Trend Error',
  props<{ error: any }>()
);