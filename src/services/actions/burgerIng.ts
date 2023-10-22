import { TIngredient } from '../types/type'

export const ADD_BURGER_ITEM: 'ADD_BURGER_ITEM' = 'ADD_BURGER_ITEM';
export const REMOVE_BURGER_ITEM: 'REMOVE_BURGER_ITEM' = 'REMOVE_BURGER_ITEM';
export const CHANGE_BURGER_ING_INDEX: 'CHANGE_BURGER_ING_INDEX' = 'CHANGE_BURGER_ING_INDEX';
export const REMOVE_ALL_BURGER_ITEM: 'REMOVE_ALL_BURGER_ITEM' = 'REMOVE_ALL_BURGER_ITEM';

export interface IAddBurgerItem {
  readonly type: typeof ADD_BURGER_ITEM;
  readonly item: TIngredient;
  readonly elementId: string;
}
export interface IRemoveBurgerItem {
  readonly type: typeof REMOVE_BURGER_ITEM;
  readonly index: number;
}
export interface IChangeBurgerIngIndex {
  readonly type: typeof CHANGE_BURGER_ING_INDEX;
  readonly oldIndex: number;
  readonly newIndex: number;
}
export interface IRemoveAllBurgerItem {
  readonly type: typeof REMOVE_ALL_BURGER_ITEM;
}

export type TBurgerIngActions =
  | IAddBurgerItem
  | IRemoveBurgerItem
  | IChangeBurgerIngIndex
  | IRemoveAllBurgerItem;

export const addBurgerItem = (item: TIngredient, elementId: string): IAddBurgerItem => ({
  type: ADD_BURGER_ITEM,
  item: item,
  elementId: elementId
})

export const removeBurgerItem = (index: number): IRemoveBurgerItem => ({
  type: REMOVE_BURGER_ITEM,
  index: index
})

export const changeBurgerIngIndex = (oldIndex: number, newIndex: number): IChangeBurgerIngIndex => ({
  type: CHANGE_BURGER_ING_INDEX,
  oldIndex: oldIndex,
  newIndex: newIndex
})