import { combineReducers } from 'redux';

import { burgetIngReducer } from './burgerIng';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { resetPasswordReducer } from './resetPassword';
import { feedWsReducer, uOrderWsReducer } from './wsReducer';
import { orderDataReducer } from './order_data';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgetIng: burgetIngReducer,
  order: orderReducer,
  user: userReducer,
  resetPassword: resetPasswordReducer,
  feed: feedWsReducer,
  uOrders: uOrderWsReducer,
  orderData: orderDataReducer
});