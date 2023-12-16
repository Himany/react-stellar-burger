import { TGetOrderDataActions, GET_ORDER_DATA_REQUEST, GET_ORDER_DATA_SUCCESS, GET_ORDER_DATA_FAILED } from "../actions/order-data";
import { TOrderData } from '../types/type.js'

type TOrderDataState = {
  data: TOrderData;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: TOrderDataState = {
  data: { 
    success: false,
    orders: []
  },
  orderRequest: false,
  orderFailed: false
}

export const orderDataReducer = (state = initialState, action: TGetOrderDataActions): TOrderDataState => {
  switch (action.type) {
    case GET_ORDER_DATA_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_DATA_SUCCESS: {
      return { ...state, orderFailed: false, data: action.payload, orderRequest: false };
    }
    case GET_ORDER_DATA_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
};