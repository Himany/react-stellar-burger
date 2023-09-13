import { GET_ORDER_DATA_REQUEST, GET_ORDER_DATA_SUCCESS, GET_ORDER_DATA_FAILED } from "../actions/order-data";

const initialState = {
  data: {},
  orderRequest: false,
  orderFailed: false
}

export const orderDataReducer = (state = initialState, action) => {
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