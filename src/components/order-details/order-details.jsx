import React from "react";
import styles from "./order-details.module.css";
import imgDone from "../../images/graphics.svg";
import { getOrderId } from "../../utils/api"
import { BurgerConstructorContext } from "../../services/appContext";

function OrderDetails(props) {
  const { state, setState } = React.useContext(BurgerConstructorContext);

  React.useEffect(() => {
    const ingArrayId = [];
    state.burgerData.forEach((item) => {ingArrayId.push(item._id)});
    getOrderId({"ingredients": ingArrayId}, setState);
  }, []);

  return(
    <>
      {((state.orderData.statusLoading) || (state.orderData.statusError)) ? (
        <p className={`text text_type_main-medium ${styles.idOrder} mt-4`}>{(state.orderData.statusLoading) ? 'Загрузка...' : 'Ошибка загрузки'}</p>
      ) : (
        <p className={`text text_type_digits-large ${styles.idOrder} mt-4`}>{state.orderData.data.order.number}</p>
      )}
      <p className={`text text_type_main-medium ${styles.idOrderTitle} mt-8`}>Идентификатор заказа</p>
      <img src={imgDone} alt="Заказ уже готовят" className={`${styles.image} mt-15`}/>
      <p className={`text text_type_main-small ${styles.orderText} mt-15`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive ${styles.orderSubText} mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

export default OrderDetails;