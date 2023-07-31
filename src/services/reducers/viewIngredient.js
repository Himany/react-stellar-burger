import { SET_VIEW_ING_ITEM, REMOVE_VIEW_ING_ITEM } from "../actions/viewIngredient";

const initialState = {
  item: {}
}

export const viewIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW_ING_ITEM: {
      return { ...state, item: action.item };
    }
    case REMOVE_VIEW_ING_ITEM: {
      return { ...state, item: initialState.item };
    }
    default: {
      return state;
    }
  }
};