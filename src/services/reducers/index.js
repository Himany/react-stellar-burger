import { combineReducers } from 'redux';

import { burgetIngReducer } from './burgerIng';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { viewIngredientReducer } from './viewIngredient';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgetIng: burgetIngReducer,
  order: orderReducer,
  viewIngredient: viewIngredientReducer
});