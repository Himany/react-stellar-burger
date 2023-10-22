import { fetchProfile, getOrdeApi, checkResponse } from '../../utils/api';
import { REMOVE_ALL_BURGER_ITEM } from './burgerIng';
import { AppThunk, TGetOrderData, TOrderMain } from '../types/type.js'

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrderMain;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TGetOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed;

export const getOrderSuccess = (order: TOrderMain): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  order: order
})

export const getOrder = (data: TGetOrderData): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    fetchProfile(getOrdeApi,data)
      .then(checkResponse)
      .then((res: TOrderMain) => {
        if (res && res.success) {
          dispatch(getOrderSuccess(res));
          dispatch({type: REMOVE_ALL_BURGER_ITEM});
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      })
      .catch((error: any) => {
        dispatch({
          type: GET_ORDER_FAILED
        });
        console.log("Error loading data (getOrder)...");
        console.log(error);
      });
  };
}