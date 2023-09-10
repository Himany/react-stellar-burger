import { 
  FORGOT_PAS_REQUEST,
  FORGOT_PAS_SUCCESS,
  FORGOT_PAS_FAILED,
    
  RESET_PAS_REQUEST,
  RESET_PAS_SUCCESS,
  RESET_PAS_FAILED,

  RESET_FORGOT_PAS_DATA,
  RESET_RESET_PAS_DATA,
  RESET_ALL_PAS_DATA
} from "../actions/resetPassword";

const initialState = {
  forgotPasData: {},
  resetPasData: {},
  errorData: {},
  forgotPasRequest: false,
  forgotPasFailed: false,
  resetPasRequest: false,
  resetPasFailed: false
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    //forgot password
    case FORGOT_PAS_REQUEST: {
      return {
        ...state,
        forgotPasRequest: true
      };
    }
    case FORGOT_PAS_SUCCESS: {
      return { ...state, forgotPasFailed: false, forgotPasRequest: false, forgotPasData: action.payload };
    }
    case FORGOT_PAS_FAILED: {
      return { ...state, forgotPasFailed: true, forgotPasRequest: false, errorData: action.payload };
    }
    //reset password
    case RESET_PAS_REQUEST: {
      return {
        ...state,
        resetPasRequest: true
      };
    }
    case RESET_PAS_SUCCESS: {
      return { 
        ...initialState,
        resetPasData: action.payload 
      };
    }
    case RESET_PAS_FAILED: {
      return { ...state, resetPasFailed: true, resetPasRequest: false, errorData: action.payload };
    }
    //all
    case RESET_FORGOT_PAS_DATA: {
      return { ...state, forgotPasFailed: false, forgotPasRequest: false, forgotPasData: {}, errorData: {} };
    }
    case RESET_RESET_PAS_DATA: {
      return { ...state, resetPasFailed: false, resetPasRequest: false, resetPasData: {}, errorData: {} };
    }
    case RESET_ALL_PAS_DATA: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};