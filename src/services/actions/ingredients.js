import { getIngredientsApi } from '../../utils/api.js';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredientsApi()
      .then(res => res.ok ? res.json() : res.json().then((error) => Promise.reject(error)))
      .then(res => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ITEMS_FAILED
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}