import { forgotPasswordApi, resetPasswordApi, checkResponse } from '../../utils/api';
import { AppThunk, TForgotPassword } from '../types/type.js';

export const FORGOT_PAS_REQUEST: 'FORGOT_PAS_REQUEST' = 'FORGOT_PAS_REQUEST';
export const FORGOT_PAS_SUCCESS: 'FORGOT_PAS_SUCCESS' = 'FORGOT_PAS_SUCCESS';
export const FORGOT_PAS_FAILED: 'FORGOT_PAS_FAILED' = 'FORGOT_PAS_FAILED';

export const RESET_PAS_REQUEST: 'RESET_PAS_REQUEST' = 'RESET_PAS_REQUEST';
export const RESET_PAS_SUCCESS: 'RESET_PAS_SUCCESS' = 'RESET_PAS_SUCCESS';
export const RESET_PAS_FAILED: 'RESET_PAS_FAILED' = 'RESET_PAS_FAILED';

export const RESET_FORGOT_PAS_DATA: 'RESET_FORGOT_PAS_DATA' = 'RESET_FORGOT_PAS_DATA';
export const RESET_RESET_PAS_DATA: 'RESET_RESET_PAS_DATA' = 'RESET_RESET_PAS_DATA';
export const RESET_ALL_PAS_DATA: 'RESET_ALL_PAS_DATA' = 'RESET_ALL_PAS_DATA';

export interface IGetForgotPasRequest {
  readonly type: typeof FORGOT_PAS_REQUEST;
}
export interface IGetForgotPasSuccess {
  readonly type: typeof FORGOT_PAS_SUCCESS;
  readonly payload: TForgotPassword;
}
export interface IGetForgotPasFailed {
  readonly type: typeof FORGOT_PAS_FAILED;
  readonly payload: TForgotPassword;
}

export interface IResetPasRequest {
  readonly type: typeof RESET_PAS_REQUEST;
}
export interface IResetPasSuccess {
  readonly type: typeof RESET_PAS_SUCCESS;
  readonly payload: TForgotPassword;
}
export interface IResetPasFailed {
  readonly type: typeof RESET_PAS_FAILED;
  readonly payload: TForgotPassword;
}

export interface IResetForgotPasData {
  readonly type: typeof RESET_FORGOT_PAS_DATA;
}
export interface IResetResetPasData {
  readonly type: typeof RESET_RESET_PAS_DATA;
}
export interface IResetAllPasData {
  readonly type: typeof RESET_ALL_PAS_DATA;
}

export type TResetPasswordActions =
  | IGetForgotPasRequest
  | IGetForgotPasSuccess
  | IGetForgotPasFailed
  | IResetPasRequest
  | IResetPasSuccess
  | IResetPasFailed
  | IResetForgotPasData
  | IResetResetPasData
  | IResetAllPasData;

export const getForgotPasSuccess = (payload: TForgotPassword): IGetForgotPasSuccess => ({
  type: FORGOT_PAS_SUCCESS,
  payload: payload
})
export const getForgotPasFailed = (payload: TForgotPassword): IGetForgotPasFailed => ({
  type: FORGOT_PAS_FAILED,
  payload: payload
})
export const resetPasSuccess = (payload: TForgotPassword): IResetPasSuccess => ({
  type: RESET_PAS_SUCCESS,
  payload: payload
})
export const resetPasFailed = (payload: TForgotPassword): IResetPasFailed => ({
  type: RESET_PAS_FAILED,
  payload: payload
})

export const forgotPassword = (data: { email: string }): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PAS_REQUEST
    });
    forgotPasswordApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(getForgotPasSuccess(res));
        } else {
          dispatch(getForgotPasFailed(res));
        }
      })
      .catch(error => {
        dispatch(getForgotPasFailed(error));
        console.log("Error loading data (forgotPassword)...");
        console.log(error);
      });
  };
}

export const resetPassword = (data: { password: string, token: string }): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: RESET_PAS_REQUEST
    });
    resetPasswordApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(resetPasSuccess(res));
        } else {
          dispatch(resetPasFailed(res));
        }
      })
      .catch(error => {
        dispatch(resetPasFailed(error));
        console.log("Error loading data (resetPassword)...");
        console.log(error);
      });
  };
}