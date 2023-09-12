import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendsApiActions from '../actions/trends-api.actions';
import { Trend } from '../../models/trend.model';

export const trendsFeatureKey = 'trends';

export interface State extends EntityState<Trend> {
  selectedTrend: Trend | null;
  loaderUpdate: boolean,
}


export const adapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = adapter.getInitialState({
  selectedTrend: null,
  loaderUpdate: false,
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
  on(TrendsApiActions.deleteOneTrendSuccess, (state, { response }): State => {
    if (response.success) {
      console.log('Se ha podido eliminar el elemento');
      return { ...state, selectedTrend: null };
    } else {
      console.log('No se ha podido eliminar el elemento');
      return { ...state, loaderUpdate: false };
    }
  }),
  on(TrendsApiActions.updateOneTrendError, (state, { error }): State => {
      console.error('Se ha podido actualizar el elemento');
      return { ...state, loaderUpdate: false };
  }),
  on(TrendsApiActions.updateOneTrendSuccess, (state, { response }): State => {
    console.log('Se actualizó el elemento con éxito.');
    return { ...state, loaderUpdate: false };
  }),
  on(
    TrendsListPageActions.updateLoaderUpdateState,
    (state, { isLoadingUpdate: loaderUpdate}): State => ({ ...state, loaderUpdate })
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