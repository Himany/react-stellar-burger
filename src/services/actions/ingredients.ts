import { getIngredientsApi, checkResponse } from '../../utils/api';
import { AppThunk, TIngredient } from '../types/type.js'

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: TIngredient[];
}
export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed;

export const getItemsSuccess = (items: TIngredient[]): IGetItemsSuccess => ({
  type: GET_ITEMS_SUCCESS,
  items: items
})

export const getItems = (): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredientsApi()
      .then(checkResponse)
      .then(res => {
        dispatch(getItemsSuccess(res.data));
      })
      .catch(error => {
        dispatch({
          type: GET_ITEMS_FAILED
        });
        console.log("Error loading data (getItems)...");
        console.log(error);
      });
  };
}