import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import {
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_GET_MESSAGE,
  FEED_WS_SEND_MESSAGE,

  UORDER_WS_CONNECTION_CLOSED,
  UORDER_WS_CONNECTION_ERROR,
  UORDER_WS_CONNECTION_START,
  UORDER_WS_CONNECTION_SUCCESS,
  UORDER_WS_GET_MESSAGE,
  UORDER_WS_SEND_MESSAGE
} from './services/actions/wsActions';

import { getCookie } from './utils/cookie';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const feedWsActions = {
  wsInit: FEED_WS_CONNECTION_START,
  wsSendMessage: FEED_WS_SEND_MESSAGE,
  onOpen: FEED_WS_CONNECTION_SUCCESS,
  onClose: FEED_WS_CONNECTION_CLOSED,
  onError: FEED_WS_CONNECTION_ERROR,
  onMessage: FEED_WS_GET_MESSAGE
};
const uOrderWsActions = {
  wsInit: UORDER_WS_CONNECTION_START,
  wsSendMessage: UORDER_WS_SEND_MESSAGE,
  onOpen: UORDER_WS_CONNECTION_SUCCESS,
  onClose: UORDER_WS_CONNECTION_CLOSED,
  onError: UORDER_WS_CONNECTION_ERROR,
  onMessage: UORDER_WS_GET_MESSAGE
};

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const enhancer = composeEnhancers(applyMiddleware(
    thunk, 
    socketMiddleware(`${wsUrl}/all`,feedWsActions), 
    socketMiddleware(wsUrl,uOrderWsActions)
));
const store = createStore(
  rootReducer, 
  enhancer
);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
