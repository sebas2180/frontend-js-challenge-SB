import { createAction, props } from '@ngrx/store';
import { TrendRequest } from '../../models/trend-request.model';


export const deleteOneTrend = createAction(
  '[Trends CRUD] Delete one trend',
  props<{ trendId: string }>()
);

export const createOneTrend = createAction(
  '[Trends CRUD] Create one trend',
  props<{ trend: TrendRequest }>()
);

export const updateOneTrend = createAction(
  '[Trends/CRUD] Update One Trend',
  props<{ trend: TrendRequest, id: string }>()
);