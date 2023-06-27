import React from "react";
import PropTypes from 'prop-types';
import styles from "./order-details.module.css";
import imgDone from "../../images/graphics.svg";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails(props) {
  return(
    <>
      <div className={styles.close}>
        <CloseIcon type="primary" onClick={() => {props.closeAction(false)}} />
      </div>
      <p className={`text text_type_digits-large ${styles.idOrder}`}>034536</p>
      <p className={`text text_type_main-medium ${styles.idOrderTitle} mt-8`}>Идентификатор заказа</p>
      <img src={imgDone} alt="Заказ уже готовят" className={`${styles.image} mt-15`}/>
      <p className={`text text_type_main-small ${styles.orderText} mt-15`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive ${styles.orderSubText} mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

OrderDetails.propTypes = {
  closeAction:PropTypes.func.isRequired
};

export default OrderDetails;