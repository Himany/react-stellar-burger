import {
  TFeedWsActions,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_GET_MESSAGE,

  TUOrderWsActions,
  UORDER_WS_CONNECTION_SUCCESS,
  UORDER_WS_CONNECTION_ERROR,
  UORDER_WS_CONNECTION_CLOSED,
  UORDER_WS_GET_MESSAGE
} from '../actions/wsActions';
import { TWsMessage } from '../types/type';

type TFeedInitialState = {
  wsConnected: boolean;
  wsError: boolean;
  orders: TWsMessage | null;
}

const feedInitialState: TFeedInitialState = {
  wsConnected: false,
  wsError: false,
  orders: null
};

export const feedWsReducer = (state = feedInitialState, action: TFeedWsActions): TFeedInitialState => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: false
      };

    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true
      };

    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false
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

type TUorderInitialState = {
  wsConnected: boolean;
  wsError: boolean;
  orders: TWsMessage | null;
}

const uOrderInitialState: TUorderInitialState = {
  wsConnected: false,
  wsError: false,
  orders: null
};

export const uOrderWsReducer = (state = uOrderInitialState, action: TUOrderWsActions): TUorderInitialState => {
  switch (action.type) {
    case UORDER_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: false
      };

    case UORDER_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: true
      };

    case UORDER_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsError: false
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