import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectors } from '@ngrx/router-store';

import * as fromTrendsReducer from '../reducers';

const { selectRouteParams } = getSelectors();

export const selectTrendsState = createFeatureSelector<fromTrendsReducer.State>(
  fromTrendsReducer.trendsFeatureKey
);

export const selectTrendIds = createSelector(
  selectTrendsState,
  fromTrendsReducer.selectTrendIds
);

export const selectTrendEntities = createSelector(
  selectTrendsState,
  fromTrendsReducer.selectTrendEntities
);

export const selectAllTrends = createSelector(
  selectTrendsState,
  fromTrendsReducer.selectAllTrends
);

export const selectTrendsByProvider = createSelector(
  selectAllTrends,
  selectRouteParams,
  (trends, { provider }) =>
    provider ? trends.filter((trend) => trend.provider === provider) : trends
);

export const selectTrendsTotal = createSelector(
  selectTrendsState,
  fromTrendsReducer.selectTrendTotal
);

export const selectSelectedTrend = createSelector(
  selectTrendsState,
  fromTrendsReducer.selectSelectedTrend
);
