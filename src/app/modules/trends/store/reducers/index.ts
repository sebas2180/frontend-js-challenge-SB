import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendsApiActions from '../actions/trends-api.actions';
import { Trend } from '../../models/trend.model';
import { TrendActionEnum } from '../../enums/trend-acions.enum';

export const trendsFeatureKey = 'trends';

export interface State extends EntityState<Trend> {
  selectedTrend: Trend | null;
  loaderUpdate: boolean,
  message: string,
  actionRequire: TrendActionEnum;
}


export const adapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = adapter.getInitialState({
  selectedTrend: null,
  loaderUpdate: false,
  message: null,
  actionRequire: null,
});

export const trendsReducer = createReducer(
  initialState,
  on(TrendsApiActions.loadTrendsSuccess, (state, { trends }) => {
    return adapter.setAll(trends, state);
  }),
  on(TrendsApiActions.loadTrendsError, (state) => {
    return adapter.removeAll(state);
  }),
  on(
    TrendsApiActions.loadOneTrendSuccess,
    (state, { trend: selectedTrend }): State => {
      return { ...state, selectedTrend };
    }
  ),
  on(TrendsApiActions.loadOneTrendError, (state): State => {
    return { ...state, selectedTrend: null };
  }),
  on(TrendsApiActions.createOneTrendSuccess, (state, { response }): State => {
      const msg = 'Creación exitosa';
      return { ...state, selectedTrend: response, message: msg, actionRequire: TrendActionEnum.CLOSE_DIALOG };
  }),
  on(TrendsApiActions.deleteOneTrendSuccess, (state, { response }): State => {
    if (response.success) {
      const msg = 'Eliminado exitoso';
      return { ...state, selectedTrend: null, message: msg, actionRequire: TrendActionEnum.NAV_HOME };
    } else {
      const msg = 'Error al eliminar el elemento';
      return { ...state, loaderUpdate: false, message: msg};
    }
  }),
  on(TrendsApiActions.updateOneTrendError, (state, { error }): State => {
      const msg = 'Error al actualizar';
      return { ...state, loaderUpdate: false, message: msg };
  }),
  on(TrendsApiActions.updateOneTrendSuccess, (state, { response }): State => {
    if (response?.modified === 1) {
      const msg = 'Actualización exitosa';
      return { ...state, loaderUpdate: false, message: msg, actionRequire: TrendActionEnum.CLOSE_DIALOG};
    } else {
      const msg = 'Error al actualizar';
      return { ...state, loaderUpdate: false, message: msg };
    }
  }),
  on(
    TrendsListPageActions.updateLoaderUpdateState,
    (state, { isLoadingUpdate: loaderUpdate}): State => {
      return ({ ...state, loaderUpdate})
    }
  ),
  on(
    TrendsListPageActions.updateMessageTrendState,
    (state, { msg: message}): State => {
      return ({ ...state, message })
    }
  ),
  on(
    TrendsListPageActions.actionRequireTrendEditState,
    (state, { action: actionRequire}): State => {
      return  ({ ...state, actionRequire })
    }
  )
);

export const selectSelectedTrend = (state: State) => state.selectedTrend;

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of trend ids
export const selectTrendIds = selectIds;

// select the dictionary of trend entities
export const selectTrendEntities = selectEntities;

// select the array of trends
export const selectAllTrends = selectAll;

// select the total trend count
export const selectTrendTotal = selectTotal;


// select loader trend state
export const selectIsLoadingUpdateState = (state: State) => {
  return state['trends'].loaderUpdate
};

// select loader trend state
export const selectMessageState = (state: State) => {
  console.log(state);
  return state['trends'].message
};

// Close menu edit trend state
export const selectactionRequireTrendState = (state: State) => {
  console.log(state);
  return state['trends'].actionRequire
};