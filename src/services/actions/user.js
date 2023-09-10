import { authApi, logoutApi, registerApi, getUserApi, fetchProfile, updateUserDataApi, checkResponse } from '../../utils/api.js';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';

export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_FAILED = 'AUTH_LOGOUT_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export const USER_DROPFAILED = 'USER_DROPFAILED';

export function auth(data) {
  return function(dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    authApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_SUCCESS,
            payload: res
          });
        } else {
          dispatch({
            type: AUTH_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: AUTH_FAILED,
          payload: error
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}

export function register(data) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    registerApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res
          });
        } else {
          dispatch({
            type: REGISTER_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAILED,
          payload: error
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}

export function logout(data) {
  return function(dispatch) {
    dispatch({
      type: AUTH_LOGOUT_REQUEST
    });
    logoutApi(data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: AUTH_LOGOUT_SUCCESS,
            payload: res
          });
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
        console.log("Error loading data...");
        console.log(error);
      });
  };
}

export function getUser() {
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetchProfile(getUserApi)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: res
          });
        } else {
          dispatch({
            type: USER_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: USER_FAILED,
          payload: error
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}

export function updateUserData(data) {
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST
    });
    fetchProfile(updateUserDataApi,data)
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: res
          });
        } else {
          dispatch({
            type: USER_FAILED
          });
        }
      })
      .catch(error => {
        dispatch({
          type: USER_FAILED,
          payload: error
        });
        console.log("Error loading data...");
        console.log(error);
      });
  };
}