import { getOrdeApi } from '../../utils/api.js';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function getOrder(data) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrdeApi(data)
      .then(res => res.ok ? res.json() : res.json().then((error) => Promise.reject(error)))
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res
          });
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