import { TWsMessage } from '../types/type';
//feed
export const FEED_WS_CONNECTION_START: 'FEED_WS_CONNECTION_START' = 'FEED_WS_CONNECTION_START';
export const FEED_WS_CONNECTION_SUCCESS: 'FEED_WS_CONNECTION_SUCCESS' = 'FEED_WS_CONNECTION_SUCCESS';
export const FEED_WS_CONNECTION_ERROR: 'FEED_WS_CONNECTION_ERROR' = 'FEED_WS_CONNECTION_ERROR';
export const FEED_WS_CONNECTION_CLOSED: 'FEED_WS_CONNECTION_CLOSED' = 'FEED_WS_CONNECTION_CLOSED';
export const FEED_WS_GET_MESSAGE: 'FEED_WS_GET_MESSAGE' = 'FEED_WS_GET_MESSAGE';
export const FEED_WS_SEND_MESSAGE: 'FEED_WS_SEND_MESSAGE' = 'FEED_WS_SEND_MESSAGE';

//user orders
export const UORDER_WS_CONNECTION_START: 'UORDER_WS_CONNECTION_START' = 'UORDER_WS_CONNECTION_START';
export const UORDER_WS_CONNECTION_SUCCESS: 'UORDER_WS_CONNECTION_SUCCESS' = 'UORDER_WS_CONNECTION_SUCCESS';
export const UORDER_WS_CONNECTION_ERROR: 'UORDER_WS_CONNECTION_ERROR' = 'UORDER_WS_CONNECTION_ERROR';
export const UORDER_WS_CONNECTION_CLOSED: 'UORDER_WS_CONNECTION_CLOSED' = 'UORDER_WS_CONNECTION_CLOSED';
export const UORDER_WS_GET_MESSAGE: 'UORDER_WS_GET_MESSAGE' = 'UORDER_WS_GET_MESSAGE';
export const UORDER_WS_SEND_MESSAGE: 'UORDER_WS_SEND_MESSAGE' = 'UORDER_WS_SEND_MESSAGE';

export interface IFeedWsConnectionStart {
  readonly type: typeof FEED_WS_CONNECTION_START;
}
export interface IFeedWsConnectionSuccess {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS;
}
export interface IFeedWsConnectionError {
  readonly type: typeof FEED_WS_CONNECTION_ERROR;
}
export interface IFeedWsConnectionClosed {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED;
}
export interface IFeedWsGetMessage {
  readonly type: typeof FEED_WS_GET_MESSAGE;
  readonly payload: TWsMessage;
}
export interface IFeedWsSendMessage {
  readonly type: typeof FEED_WS_SEND_MESSAGE;
}

export type TFeedWsActions =
  | IFeedWsConnectionStart
  | IFeedWsConnectionSuccess
  | IFeedWsConnectionError
  | IFeedWsConnectionClosed
  | IFeedWsGetMessage
  | IFeedWsSendMessage;

export interface UOrdedWsConnectionStart {
  readonly type: typeof UORDER_WS_CONNECTION_START;
}
export interface UOrdedWsConnectionSuccess {
  readonly type: typeof UORDER_WS_CONNECTION_SUCCESS;
}
export interface UOrdedWsConnectionError {
  readonly type: typeof UORDER_WS_CONNECTION_ERROR;
}
export interface UOrdedWsConnectionClosed {
  readonly type: typeof UORDER_WS_CONNECTION_CLOSED;
}
export interface UOrdedWsGetMessage {
  readonly type: typeof UORDER_WS_GET_MESSAGE;
  readonly payload: TWsMessage;
}
export interface UOrdedWsSendMessage {
  readonly type: typeof UORDER_WS_SEND_MESSAGE;
}

export type TUOrderWsActions =
  | UOrdedWsConnectionStart
  | UOrdedWsConnectionSuccess
  | UOrdedWsConnectionError
  | UOrdedWsConnectionClosed
  | UOrdedWsGetMessage
  | UOrdedWsSendMessage;