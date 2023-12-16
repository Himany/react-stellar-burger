import { ReactNode, FC, ReactElement } from "react";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../reducers/index';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import { TBurgerIngActions } from '../actions/burgerIng';
import { TIngredientsActions } from '../actions/ingredients';
import { TGetOrderDataActions } from '../actions/order-data';
import { TGetOrderActions } from '../actions/order';
import { TResetPasswordActions } from '../actions/resetPassword';
import { TUserActions } from '../actions/user';
import { TFeedWsActions, TUOrderWsActions } from '../actions/wsActions';

import {
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_CLOSED,
  FEED_WS_GET_MESSAGE,
  FEED_WS_SEND_MESSAGE,

  UORDER_WS_CONNECTION_START,
  UORDER_WS_CONNECTION_SUCCESS,
  UORDER_WS_CONNECTION_ERROR,
  UORDER_WS_CONNECTION_CLOSED,
  UORDER_WS_GET_MESSAGE,
  UORDER_WS_SEND_MESSAGE
} from '../actions/wsActions';

export type AppState = ReturnType<typeof rootReducer>;

type AppActions =
  | TBurgerIngActions
  | TIngredientsActions
  | TGetOrderDataActions
  | TGetOrderActions
  | TResetPasswordActions
  | TUserActions
  | TFeedWsActions
  | TUOrderWsActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  AppActions
>;

export type AppDispatch = ThunkDispatch<AppState, never, AppActions>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;


export type TWsActions = {
  wsInit: typeof FEED_WS_CONNECTION_START | typeof UORDER_WS_CONNECTION_START;
  wsSendMessage: typeof FEED_WS_SEND_MESSAGE | typeof UORDER_WS_SEND_MESSAGE;
  onOpen: typeof FEED_WS_CONNECTION_SUCCESS | typeof UORDER_WS_CONNECTION_SUCCESS;
  onClose: typeof FEED_WS_CONNECTION_CLOSED | typeof UORDER_WS_CONNECTION_CLOSED;
  onError: typeof FEED_WS_CONNECTION_ERROR | typeof UORDER_WS_CONNECTION_ERROR;
  onMessage: typeof FEED_WS_GET_MESSAGE | typeof UORDER_WS_GET_MESSAGE;
};

export type TBurgerIngredient = {
  item: TIngredient;
  index: number;
  type: 'bottom' | 'top' | undefined;
}

export type TIngredientDetails = {
  isPage: boolean
}

export type TOrderItem = {
  type: 'uOrders' | 'feed';
  id: string;
}

export type TProtectedRoute = {
  element: ReactElement;
  anonymous?: boolean;
}

export type TFeedId = {
  isPage: boolean
}

export type TModal = {
  children: ReactNode;
  extraClasses?: string;
  closeAction: (argument: boolean) => void;
  title: string;
}

export type TModalOverlay = {
  children: ReactNode;
  closeAction: (argument: boolean) => void;
}

export type TLink = {
  to: string;
  icon: FC<TIcon>;
  text: string;
}

type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

type TIcon = {
  type: TIconTypes;
  onClick?: (() => void) | undefined;
}

export type TIngredientFC = {
  data: TIngredient;
  count: number;
}

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  elementId?: string;
};

export type TGetOrderData = {
  ingredients: string[]
} | null | undefined;

export type TOrderDataOrder = {
  createdAt: string;
  ingredients: Array<string | null>;
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type TOrderData = {
  success: boolean;
  orders: TOrderDataOrder[];
};

export type TOrderOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: TOrderOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};
export type TOrderMain = {
  name: string;
  success: boolean;
  order: TOrder | null;
};

export type TForgotPassword = {
  success?: boolean;
  message?: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TAuthData = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUser;
};

export type TGetUser = {
  success: boolean;
  user: TUser;
};

export type TLogOutData = TForgotPassword;

export type TWsOrder = {
  createdAt: string;
  ingredients: Array<string | null>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TWsMessage = {
  orders: TWsOrder[];
  total: number;
  totalToday: number;
};

export type TOnChangeForm = {
  target: { 
    name: string; 
    value: string; 
  };
}

export type TUserError = {
  success: boolean;
  message: string;
}

export type TCookie = {
  expires?: any;
  [key: string]: string | number | boolean;
}