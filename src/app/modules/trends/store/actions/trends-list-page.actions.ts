import { createAction, props } from '@ngrx/store';

export const loadTrends = createAction('[Trends List Page] Enter');

export const updateLoaderUpdateState = createAction(
    '[Loader] Update loader update state',
    props<{ isLoadingUpdate: boolean }>()
);
export const updateMessageTrendState = createAction(
  '[Loader] Msg state',
  props<{ msg: string }>()
);