import { createAction, props } from '@ngrx/store';
import { TrendActionEnum } from '../../enums/trend-acions.enum';

export const loadTrends = createAction('[Trends List Page] Enter');

export const updateLoaderUpdateState = createAction(
    '[Loader] Update loader update state',
    props<{ isLoadingUpdate: boolean }>()
);
export const updateMessageTrendState = createAction(
  '[Loader] Msg state',
  props<{ msg: string }>()
);
export const actionRequireTrendEditState = createAction(
  '[Loader] Close menu trend edit state',
  props<{ action: TrendActionEnum }>()
);