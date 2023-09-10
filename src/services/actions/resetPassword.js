import { forgotPasswordApi, resetPasswordApi, checkResponse } from '../../utils/api.js';

export const FORGOT_PAS_REQUEST = 'FORGOT_PAS_REQUEST';
export const FORGOT_PAS_SUCCESS = 'FORGOT_PAS_SUCCESS';
export const FORGOT_PAS_FAILED = 'FORGOT_PAS_FAILED';

export const RESET_PAS_REQUEST = 'RESET_PAS_REQUEST';
export const RESET_PAS_SUCCESS = 'RESET_PAS_SUCCESS';
export const RESET_PAS_FAILED = 'RESET_PAS_FAILED';

export const RESET_FORGOT_PAS_DATA = 'RESET_FORGOT_PAS_DATA';
export const RESET_RESET_PAS_DATA = 'RESET_RESET_PAS_DATA';
export const RESET_ALL_PAS_DATA = 'RESET_ALL_PAS_DATA';

export function forgotPassword(data) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PAS_REQUEST
    });
    forgotPasswordApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PAS_SUCCESS,
            payload: res
          });
        } else {
          dispatch({
            type: FORGOT_PAS_FAILED,
            payload: res
          });
        }
      })
      .catch(error => {
        dispatch({
          type: FORGOT_PAS_FAILED,
          payload: error
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}

export function resetPassword(data) {
  return function(dispatch) {
    dispatch({
      type: RESET_PAS_REQUEST
    });
    resetPasswordApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: RESET_PAS_SUCCESS,
            payload: res
          });
        } else {
          dispatch({
            type: RESET_PAS_FAILED,
            payload: res
          });
        }
      })
      .catch(error => {
        dispatch({
          type: RESET_PAS_FAILED,
          payload: error
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}