import {
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_GET_MESSAGE,

  UORDER_WS_CONNECTION_SUCCESS,
  UORDER_WS_CONNECTION_ERROR,
  UORDER_WS_CONNECTION_CLOSED,
  UORDER_WS_GET_MESSAGE
} from '../actions/wsActions';

const feedInitialState = {
  wsConnected: false,
  wsError: false,
  wsErrorData: {},
  orders: {}
};

export const feedWsReducer = (state = feedInitialState, action) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: false,
        wsErrorData: {}
      };

    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
        wsErrorData: { ...action.payload }
      };

    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false,
        wsErrorData: {}
      };

    case FEED_WS_GET_MESSAGE:
      return {
        ...state,
        orders: { ...action.payload }
      };

    default:
      return state;
  }
};

const uOrderInitialState = {
  wsConnected: false,
  wsError: false,
  wsErrorData: {},
  orders: {}
};

export const uOrderWsReducer = (state = uOrderInitialState, action) => {
  switch (action.type) {
    case UORDER_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: false,
        wsErrorData: {}
      };

    case UORDER_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true,
        wsErrorData: { ...action.payload }
      };

    case UORDER_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false,
        wsErrorData: {}
      };

    case UORDER_WS_GET_MESSAGE:
      return {
        ...state,
        orders: { ...action.payload }
      };

    default:
      return state;
  }
};