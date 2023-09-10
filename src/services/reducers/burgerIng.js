import { ADD_BURGER_ITEM, REMOVE_BURGER_ITEM, CHANGE_BURGER_ING_INDEX, REMOVE_ALL_BURGER_ITEM } from "../actions/burgerIng";

const initialState = {
  items: [],
  bun: {}
}

export const burgetIngReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_ITEM: {
      const item = { 
        ...action.item,
        elementId: action.elementId
       }
      if (action.item.type === 'bun') {
        return { ...state, bun: item };
      } else {
        return { ...state, items: [...state.items, item] };
      };
    }
    case REMOVE_BURGER_ITEM: {
      const newItems = state.items.slice();
      newItems.splice(action.index, 1);
      return { ...state, items: newItems };
    }
    case CHANGE_BURGER_ING_INDEX: {
      const oldIndex = (action.oldIndex <= 0) ? 0 : action.oldIndex;
      const newIndex = (action.newIndex <= 0) ? 0 : action.newIndex;
      
      const newItems = state.items.slice();
      const item = state.items[oldIndex];

      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, item);
      return { ...state, items: newItems };
    }
    case REMOVE_ALL_BURGER_ITEM: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};