import React, {FC} from "react";
import styles from "./order-details.module.css";
import imgDone from "../../images/graphics.svg";
import { getOrder } from '../../services/actions/order'
import Preloader from "../preloader/preloader";
import { useAppSelector, useAppDispatch } from '../../services/types/type';

const OrderDetails: FC = () => {
  const { burgetIng, order } = useAppSelector(state => state);

  const { items, bun } = burgetIng;
  const { data, orderRequest, orderFailed } = order;
  
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const ingArrayId = [];
    if (bun) {ingArrayId.push(bun._id)};
    items.forEach((item) => {ingArrayId.push(item._id)});
    if (bun) {ingArrayId.push(bun._id)};
    if (ingArrayId.length !== 0) {dispatch(getOrder({ingredients: ingArrayId}));}
  }, []);

  if (
      (!bun) && 
      (burgetIng.items.length === 0) && 
      (!data.order) && 
      !((orderRequest) || (orderFailed))
    ) {
    return(
      <>
        <p className={`text text_type_main-medium ${styles.idOrder} mt-4`}>Ошибка</p>
        <p className={`text text_type_main-medium ${styles.idOrder} mt-4`}>Вы не выбрали ингредиенты для бургера</p>
      </>
    )
  }
  if (!data.order) {return(<Preloader />)};

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