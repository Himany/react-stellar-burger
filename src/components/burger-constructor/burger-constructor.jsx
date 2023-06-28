import React from "react";
import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import { ingredientPropType } from "../../utils/prop-types.js";
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";

function BurgerConstructor(props) {
  const [isShowOrder, setIsShowOrder] = React.useState(false);
  return(
    <section className={`${styles.section} mt-25`}>
      <ul className={`${styles.elementsContainer}  custom-scroll ml-4 mr-4`}>
         {
            props.data.map((item, index, array) => {
              const type = (index > 0) ? ((index === (array.length - 1)) ? 'bottom' : undefined) : 'top';
              return(
                <li className={styles.elementContainer} key={`container_${item._id}`} >
                  { !((type === 'bottom') || (type === 'top')) &&
                    <DragIcon type="primary" />
                  }
                  <ConstructorElement type={type} isLocked={((type === 'bottom') || (type === 'top'))} text={item.name} price={item.price} thumbnail={item.image} />
                </li>
              )
            })
          }
      </ul>
      <div className={`${styles.orderContainer} mt-10`}>
        <p className={`text text_type_digits-medium mr-10`}>610 <CurrencyIcon type="primary" /></p>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
};

export default BurgerConstructor;