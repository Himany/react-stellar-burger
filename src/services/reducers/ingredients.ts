import { TIngredientsActions, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../actions/ingredients";
import { TIngredient } from '../types/type'

type TIngredientsState = {
  items: TIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
}

const initialState: TIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
};