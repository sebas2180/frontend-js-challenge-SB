import { createReducer, on } from '@ngrx/store';

import * as LoaderActions from '../actions/loader.actions';

export interface State {
  isLoading: boolean;
  isLoadingUpdate: boolean;
}

export const initialState: State = {
  isLoading: false,
  isLoadingUpdate: false,
};

export const reducer = createReducer(
  initialState,
  on(
    LoaderActions.updateLoaderState,
    (state, { isLoading }): State => ({ ...state, isLoading })
  ),
);

export const selectIsLoadingState = (state: State) => state.isLoading;
