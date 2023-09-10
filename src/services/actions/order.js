import { getOrdeApi, checkResponse } from '../../utils/api';
import { REMOVE_ALL_BURGER_ITEM } from './burgerIng';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrder(data) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrdeApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res
          });
          dispatch({type: REMOVE_ALL_BURGER_ITEM});
        } else {
          dispatch({
            type: GET_ORDER_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_FAILED
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}