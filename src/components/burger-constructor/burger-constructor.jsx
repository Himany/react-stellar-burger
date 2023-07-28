import React from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import { ingredientPropType } from "../../utils/prop-types.js";
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { BurgerConstructorContext } from "../../services/appContext";

function BurgerConstructor(props) {
  const [isShowOrder, setIsShowOrder] = React.useState(false);
  const { state } = React.useContext(BurgerConstructorContext);
  const getTotalPrice = (data) => {
    return(data.reduce(((result, item, index, array) => result + item.price), 0));
  }

  const fakeConfig = {
    top: true,
    middle: true,
    bottom: true
  }
  state.burgerData.forEach((item, index, array) => {
    if ((index === 0) && (item.type === 'bun')) {fakeConfig.top = false};
    if (item.type != 'bun') {fakeConfig.middle = false};
    if ((index != 0) && (index === (array.length - 1)) && (item.type === 'bun')) {fakeConfig.bottom = false};
  });
  
  let renderIng = [];
  if (fakeConfig.top) {renderIng.push({fake: true, name: 'Добавьте булочку из списка слева', price: 0, image: 'https://code.s3.yandex.net/react/code/bun-02.png'});};
  if (fakeConfig.middle) {
    if (!fakeConfig.top) {renderIng.push(state.burgerData[0])};
    renderIng.push({fake: true, name: 'Добавьте ингридиент из списка слева', price: 0, image: 'https://code.s3.yandex.net/react/code/meat-01.png'});
    state.burgerData.forEach((item, index, array) => {if (index >= 1) {renderIng.push(item)}});
  } else {
    renderIng = [...renderIng, ...state.burgerData];
  }
  if (fakeConfig.bottom) {
    renderIng.push({fake: true, name: 'Добавьте булочку из списка слева', price: 0, image: 'https://code.s3.yandex.net/react/code/bun-02.png'});
  };

  return(
    <section className={`${styles.section} mt-25`}>
      <ul className={`${styles.elementsContainer}  custom-scroll ml-4 mr-4`}>
         {
            renderIng.map((item, index, array) => {
              const type = (index > 0) ? ((index === (array.length - 1)) ? 'bottom' : undefined) : 'top';

              return(
                <li className={styles.elementContainer} key={`container_${index}`} >
                  { !((type === 'top') || (type === 'bottom')) && (!item.fake) &&
                    <DragIcon type="primary" />
                  }
                  <ConstructorElement type={type} isLocked={((type === 'top') || (type === 'bottom') || item.fake)} text={((type === 'top') ? `${item.name} (Верх)` : ((type === 'bottom') ? `${item.name} (Низ)` : item.name))} price={item.price} thumbnail={item.image} />
                </li>
              )
            })
          }
      </ul>
      <div className={`${styles.orderContainer} mt-10`}>
        <p className={`text text_type_digits-medium mr-10`}>{getTotalPrice(state.burgerData)} <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large" onClick={() => {setIsShowOrder(true)}}>Оформить заказ</Button>
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