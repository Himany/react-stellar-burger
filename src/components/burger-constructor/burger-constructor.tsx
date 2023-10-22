import React from 'react';
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDrop } from 'react-dnd';
import { addBurgerItem } from '../../services/actions/burgerIng';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector, useAppDispatch, TIngredient } from '../../services/types/type';

function BurgerConstructor() {
  const [isShowOrder, setIsShowOrder] = React.useState(false);

  const { items, bun } = useAppSelector(state => state.burgetIng);
  const { userData, errorData, requestType, request, failed, isAuth } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getTotalPrice = (data: TIngredient[]) => {
    return(data.reduce(((result, item, index, array) => result + item.price), 0) + ((bun) ? bun.price * 2 : 0));
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'items',
    drop(data: TIngredient) {
      dispatch(addBurgerItem(data, uuidv4()));
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  function showOrder() {
    if (isAuth) {
      setIsShowOrder(true);
    } else {
      navigate('/login');
    }
  }

  return(
    <section className={`${styles.section} mt-25`}>
      <ul className={`${styles.elementsContainer} custom-scroll ml-4 mr-4 ${isHover ? styles.onHover : ''}`} ref={dropTarget}>
          {!bun ? (
            <li className={`${styles.elementContainer}`} >
              <ConstructorElement type={'top'} isLocked={true} text={`Добавьте булочку из списка слева (Верх)`} price={0} thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
            </li>
          ) : (
            <li className={`${styles.elementContainer}`} >
              <ConstructorElement type={'top'} isLocked={true} text={`${bun.name} (Верх)`} price={bun.price} thumbnail={bun.image} />
            </li>
          )}
         {
            items.map((item, index, array) => {
              return(
                <BurgerIngredient item={item} type={undefined} index={index} key={item.elementId} />
              )
            })
          }
          {!bun ? (
            <li className={`${styles.elementContainer}`} >
              <ConstructorElement type={'bottom'} isLocked={true} text={`Добавьте булочку из списка слева (Верх)`} price={0} thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'} />
            </li>
          ) : (
            <li className={`${styles.elementContainer}`} >
              <ConstructorElement type={'bottom'} isLocked={true} text={`${bun.name} (Низ)`} price={bun.price} thumbnail={bun.image} />
            </li>
          )}
      </ul>
      <div className={`${styles.orderContainer} mt-10`}>
        <p className={`text text_type_digits-medium mr-10`}>{getTotalPrice(items)} <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large" onClick={showOrder}>Оформить заказ</Button>
      </div>
      
      { isShowOrder && 
        <Modal extraClasses="pb-30 pt-10" closeAction={setIsShowOrder} title="" >
          <OrderDetails  />
        </Modal>
      }
      
    </section>
  );
};

BurgerConstructor.propTypes = {};

export default BurgerConstructor;