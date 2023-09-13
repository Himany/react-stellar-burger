import { getOderDataApi, checkResponse } from '../../utils/api';

export const GET_ORDER_DATA_REQUEST = 'GET_ORDER_DATA_REQUEST';
export const GET_ORDER_DATA_SUCCESS = 'GET_ORDER_DATA_SUCCESS';
export const GET_ORDER_DATA_FAILED = 'GET_ORDER_DATA_FAILED';

export function getOrderData(data) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_DATA_REQUEST
    });
    getOderDataApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_DATA_SUCCESS,
            payload: res
          });
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
        console.log("Error loading data...");
        console.log(error);
      });
  };
}