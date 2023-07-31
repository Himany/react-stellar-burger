import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./order-details.module.css";
import imgDone from "../../images/graphics.svg";
import { getOrder } from '../../services/actions/order'

function OrderDetails(props) {
  const { burgetIng, order } = useSelector(state => state);

  const { items } = burgetIng;
  const { data, orderRequest, orderFailed } = order;

  const dispatch = useDispatch();

  React.useEffect(() => {
    const ingArrayId = [];
    items.forEach((item) => {ingArrayId.push(item._id)});
    dispatch(getOrder({ingredients: ingArrayId}))
  }, []);

  if (Object.keys(data).length === 0) {return ''};

  return(
    <>
      {((orderRequest) || (orderFailed)) ? (
        <p className={`text text_type_main-medium ${styles.idOrder} mt-4`}>{(orderRequest) ? 'Загрузка...' : 'Ошибка загрузки'}</p>
      ) : (
        <p className={`text text_type_digits-large ${styles.idOrder} mt-4`}>{data.order.number}</p>
      )}
      <p className={`text text_type_main-medium ${styles.idOrderTitle} mt-8`}>Идентификатор заказа</p>
      <img src={imgDone} alt="Заказ уже готовят" className={`${styles.image} mt-15`}/>
      <p className={`text text_type_main-small ${styles.orderText} mt-15`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive ${styles.orderSubText} mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

export default OrderDetails;