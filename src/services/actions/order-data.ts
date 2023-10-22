import { getOderDataApi, checkResponse } from '../../utils/api';
import { AppThunk, TOrderData } from '../types/type.js'

export const GET_ORDER_DATA_REQUEST: 'GET_ORDER_DATA_REQUEST' = 'GET_ORDER_DATA_REQUEST';
export const GET_ORDER_DATA_SUCCESS: 'GET_ORDER_DATA_SUCCESS' = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED: 'GET_ORDER_DATA_FAILED' = 'GET_ORDER_DATA_FAILED';


export interface IGetOrderDataRequest {
  readonly type: typeof GET_ORDER_DATA_REQUEST;
}
export interface IGetOrderDataSuccess {
  readonly type: typeof GET_ORDER_DATA_SUCCESS;
  readonly payload: TOrderData;
}
export interface IGetOrderDataFailed {
  readonly type: typeof GET_ORDER_DATA_FAILED;
}

export type TGetOrderDataActions =
  | IGetOrderDataRequest
  | IGetOrderDataSuccess
  | IGetOrderDataFailed;

export const getOrderDataSuccess = (payload: TOrderData): IGetOrderDataSuccess => ({
  type: GET_ORDER_DATA_SUCCESS,
  payload: payload
})

export const getOrderData = (data: string): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_DATA_REQUEST
    });
    getOderDataApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getOrderDataSuccess(res));
        } else {
          dispatch({
            type: GET_ORDER_DATA_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_DATA_FAILED
        });
        console.log("Error loading data (getOrderData)...");
        console.log(error);
      });
  };
}