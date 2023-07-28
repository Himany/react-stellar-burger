import React from "react";

export const BurgerConstructorContext = React.createContext(null);

export function reducer(state, action) {
  switch (action.type) {
    case "setData":
      return { ...state, data: action.payload };
    case "setBurger":
      return { ...state, burgerData: action.payload };
    case "addBurgerIng":
      const addPreArray = (object, item) => {
        if (item.type === 'bun') {
          object.bun.push(item);
        } else {
          object.ing.push(item);
        };
      };
      const objectData = {
        bun: [],
        ing: [],
        render: []
      };

      state.burgerData.forEach((item, index, array) => {addPreArray(objectData, item)});
      addPreArray(objectData, action.payload);

      switch(objectData.bun.length) {
        case 0:
          objectData.ing.forEach((item, index, array) => {objectData.render.push(item)});
          break;
      
        case 1:
          objectData.render.push(objectData.bun[0]);
          objectData.ing.forEach((item, index, array) => {objectData.render.push(item)});
          break;
      
        default:
          objectData.render.push(objectData.bun[0]);
          objectData.ing.forEach((item, index, array) => {objectData.render.push(item)});
          objectData.render.push(objectData.bun[1]);
          break;
      }
      return { ...state, burgerData: objectData.render };
    case "setOrderData":
      return { ...state, orderData: {...state.orderData, data: action.payload} };
    case "setOrderLoading":
      return { ...state, orderData: {...state.orderData, statusLoading: action.payload } };
    case "setOrderError":
      return { ...state, orderData: {...state.orderData, statusError: action.payload } };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
} 