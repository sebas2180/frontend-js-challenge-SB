import { createAction, props } from '@ngrx/store';
import { Trend } from '../../models/trend.model';


export const deleteOneTrend = createAction(
  '[Trends CRUD] Delete one trend',
  props<{ trendiId: string }>()
);
