import { TGetOrderActions, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/order";
import { TOrderMain } from '../types/type.js'

type TOrderState = {
  data: TOrderMain;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TOrderState = {
  data: {
    success: false,
    name: '',
    order: null
  },
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialState, action: TGetOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderFailed: false, data: action.order, orderRequest: false };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
};