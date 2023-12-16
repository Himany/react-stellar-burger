import { setCookie, deleteCookie } from "../../utils/cookie";
import { 
  TUserActions,

  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,

  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILED,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,

  USER_DROPFAILED
 } from "../actions/user";
 import { TUser, TUserError } from '../types/type.js'

type TUserState = {
  userData: TUser | null;
  errorData: TUserError;
  requestType: string;
  request: boolean;
  failed: boolean;
  isAuth: boolean;
}

const initialState: TUserState = {
  userData: null,
  errorData: {
    success: false,
    message: ''
  },
  requestType: '',
  request: false,
  failed: false,
  isAuth: false
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    //auth
    case AUTH_REQUEST: {
      return {
        ...state,
        request: true,
        requestType: 'auth',
        errorData: initialState.errorData
      };
    }
    case AUTH_SUCCESS: {
      const authToken = action.payload.accessToken.split('Bearer ')[1];
      setCookie('accessToken', authToken, { expires: 60 * 20 });
      setCookie('refreshToken', action.payload.refreshToken);

      return { 
        ...state, 
        failed: false, 
        request: false, 
        isAuth: true, 
        userData: action.payload.user
       };
    }
    case AUTH_FAILED: {
      return { 
        ...state, 
        failed: true, 
        request: false,
        errorData: action.payload
      };
    }
    //logout
    case AUTH_LOGOUT_REQUEST: {
      return {
        ...state,
        request: true,
        requestType: 'logout',
        errorData: initialState.errorData
      };
    }
    case AUTH_LOGOUT_SUCCESS: {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');

      return { 
        ...state, 
        failed: false, 
        request: false, 
        isAuth: false, 
        userData: null
        };
    }
    case AUTH_LOGOUT_FAILED: {
      return { 
        ...state, 
        failed: true, 
        request: false 
      };
    }
    //register
    case REGISTER_REQUEST: {
      return {
        ...state,
        request: true,
        requestType: 'register',
        errorData: initialState.errorData
      };
    }
    case REGISTER_SUCCESS: {
      const authToken = action.payload.accessToken.split('Bearer ')[1];
      setCookie('accessToken', authToken, { expires: 60 * 20 });
      setCookie('refreshToken', action.payload.refreshToken);

      return { 
        ...state, 
        failed: false, 
        request: false, 
        isAuth: true, 
        userData: action.payload.user
       };
    }
    case REGISTER_FAILED: {
      return { 
        ...state, 
        failed: true, 
        request: false,
        errorData: action.payload
      };
    }
    //user
    case USER_REQUEST: {
      return {
        ...state,
        request: true,
        requestType: 'user',
        errorData: initialState.errorData
      };
    }
    case USER_SUCCESS: {
      return { 
        ...state, 
        failed: false, 
        request: false, 
        isAuth: true, 
        userData: action.payload.user
       };
    }
    case USER_FAILED: {
      return { 
        ...state, 
        failed: true, 
        request: false,
        errorData: action.payload
      };
    }
    case USER_DROPFAILED: {
      return { 
        ...state, 
        failed: false
      };
    }
    default: {
      return state;
    }
  }
};