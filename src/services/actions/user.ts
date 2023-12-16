import { authApi, logoutApi, registerApi, getUserApi, fetchProfile, updateUserDataApi, checkResponse } from '../../utils/api';
import { AppThunk, TAuthData, TGetUser, TLogOutData, TUserError } from '../types/type.js'

export const AUTH_REQUEST: 'AUTH_REQUEST' = 'AUTH_REQUEST';
export const AUTH_SUCCESS: 'AUTH_SUCCESS' = 'AUTH_SUCCESS';
export const AUTH_FAILED: 'AUTH_FAILED' = 'AUTH_FAILED';

export const AUTH_LOGOUT_REQUEST: 'AUTH_LOGOUT_REQUEST' = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS' = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_FAILED: 'AUTH_LOGOUT_FAILED' = 'AUTH_LOGOUT_FAILED';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const USER_REQUEST: 'USER_REQUEST' = 'USER_REQUEST';
export const USER_SUCCESS: 'USER_SUCCESS' = 'USER_SUCCESS';
export const USER_FAILED: 'USER_FAILED' = 'USER_FAILED';

export const USER_DROPFAILED: 'USER_DROPFAILED' = 'USER_DROPFAILED';

export interface IAuthRequest {
  readonly type: typeof AUTH_REQUEST;
}
export interface IAuthSuccess {
  readonly type: typeof AUTH_SUCCESS;
  readonly payload: TAuthData;
}
export interface IAuthFailed {
  readonly type: typeof AUTH_FAILED;
  readonly payload: TUserError;
}

export interface IAuthLogoutRequest {
  readonly type: typeof AUTH_LOGOUT_REQUEST;
}
export interface IAuthLogoutSuccess {
  readonly type: typeof AUTH_LOGOUT_SUCCESS;
  readonly payload: TLogOutData;
}
export interface IAuthLogoutFailed {
  readonly type: typeof AUTH_LOGOUT_FAILED;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TAuthData;
}
export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
  readonly payload: TUserError;
}

export interface IUserRequest {
  readonly type: typeof USER_REQUEST;
}
export interface IUserSuccess {
  readonly type: typeof USER_SUCCESS;
  readonly payload: TGetUser;
}
export interface IUserFailed {
  readonly type: typeof USER_FAILED;
  readonly payload: TUserError;
}

export interface IUserDropFailed {
  readonly type: typeof USER_DROPFAILED;
}

export type TUserActions =
  | IAuthRequest
  | IAuthSuccess
  | IAuthFailed
  | IAuthLogoutRequest
  | IAuthLogoutSuccess
  | IAuthLogoutFailed
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFailed
  | IUserRequest
  | IUserSuccess
  | IUserFailed
  | IUserDropFailed;

export const authSuccess = (payload: TAuthData): IAuthSuccess => ({
  type: AUTH_SUCCESS,
  payload: payload
})
export const authFailed = (payload: TUserError): IAuthFailed => ({
  type: AUTH_FAILED,
  payload: payload
})
export const authLogoutSuccess = (payload: TLogOutData): IAuthLogoutSuccess => ({
  type: AUTH_LOGOUT_SUCCESS,
  payload: payload
})
export const registerSuccess = (payload: TAuthData): IRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  payload: payload
})
export const registerFailed = (payload: TUserError): IRegisterFailed => ({
  type: REGISTER_FAILED,
  payload: payload
})
export const userSuccess = (payload: TGetUser): IUserSuccess => ({
  type: USER_SUCCESS,
  payload: payload
})
export const userFailed = (payload: TUserError): IUserFailed => ({
  type: USER_FAILED,
  payload: payload
})

export const auth = (data: { email: string, password: string }): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    authApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(authSuccess(res));
        } else {
          dispatch(authFailed({success: false, message: 'Error: authApi'}));
        }
      })
      .catch(error => {
        dispatch(authFailed(error));
        console.log("Error loading data (auth)...");
        console.log(error);
      });
  };
}

export const register = (data: { name: string, email: string, password: string }): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    registerApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(registerSuccess(res));
        } else {
          dispatch(registerFailed({success: false, message: 'Error: registerApi'}));
        }
      })
      .catch(error => {
        dispatch(registerFailed(error));
        console.log("Error loading data (register)...");
        console.log(error);
      });
  };
}

export const logout = (data: {token: string | undefined}): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: AUTH_LOGOUT_REQUEST
    });
    logoutApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch(authLogoutSuccess(res));
        } else {
          dispatch({
            type: AUTH_LOGOUT_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: AUTH_LOGOUT_FAILED
        });
        console.log("Error loading data (logout)...");
        console.log(error);
      });
  };
}

export const getUser = (): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetchProfile(getUserApi)
      .then(checkResponse)
      .then((res: TGetUser) => {
        if (res && res.success) {
          dispatch(userSuccess(res));
        } else {
          dispatch(userFailed({success: false, message: 'Error: getUser'}));
        }
      })
      .catch((error: TUserError) => {
        dispatch(userFailed(error));
        console.log("Error loading data (getUser)...");
        console.log(error);
      });
  };
}

export const updateUserData = (data: { name: string, email: string, password: string }): AppThunk => {
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetchProfile(updateUserDataApi,data)
      .then(checkResponse)
      .then((res: TGetUser) => {
        if (res && res.success) {
          dispatch(userSuccess(res));
        } else {
          dispatch(userFailed({success: false, message: 'Error: updateUserData'}));
        }
      })
      .catch((error: TUserError) => {
        dispatch(userFailed(error));
        console.log("Error loading data (updateUserData)...");
        console.log(error);
      });
  };
}