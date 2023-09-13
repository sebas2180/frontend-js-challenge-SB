import { createAction, props } from '@ngrx/store';
import { TrendActionEnum } from '../../enums/trend-actions.enum';
import { TrendMsgActionEnum } from '../../enums/trend-msg-actions.enum';
import { TrendMsgAction } from '../../models/trend-msg-action.model';

export const loadTrends = createAction('[Trends List Page] Enter');

export const updateLoaderUpdateState = createAction(
    '[Loader] Update loader update state',
    props<{ isLoadingUpdate: boolean }>()
);
export const updateMessageTrendState = createAction(
  '[Loader] Msg state',
  props<{ msg: TrendMsgAction }>()
);
export const actionRequireTrendEditState = createAction(
  '[Loader] Close menu trend edit state',
  props<{ action: TrendActionEnum }>()
);