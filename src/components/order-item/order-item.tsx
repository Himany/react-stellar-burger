import { FC } from "react";
import styles from "./order-item.module.css";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, TOrderItem } from '../../services/types/type';

const OrderItem: FC<TOrderItem> = ({type, id}) => {
  const data = useAppSelector(state => state[type]);
  const items = useAppSelector(state => state.ingredients.items);
  if (!data.wsConnected || !data.orders || !items) {return(null)};

  const order = data.orders.orders.find((item) => (item._id === id));
  if (!order) {return(null)};

  const orderNumber = order.number;
  const orderDate = new Date(order.createdAt);
  const orderName =  order.name;
  const orderStatus = order.status === 'done' ? "Готов" : "Создан";
  let orderPrice = 0;
  const ingridients = order.ingredients.map((item) => {
    const ingObject = items.find((ing) => (item === ing._id));
    if (ingObject) {orderPrice += ingObject.price;}
    return(ingObject);
  });

  return(
    <article className={styles.order}>
      <div className={styles.orderTopContainer}>
        <p className="text text_type_digits-default">#{orderNumber}</p>
        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={orderDate} /></p>
      </div>
      <div className={styles.orderMidContainer}>
        <p className="text text_type_main-medium">{orderName}</p>
        {(type === 'uOrders') &&
          <p className={`text text_type_main-small mt-2 ${styles.orderStatus}`}>{orderStatus}</p>
        }
      </div>
      <div className={styles.orderBotContainer}>
        <ul className={styles.imagesContainer}>
          {
            ingridients.slice(0,6).reverse().map((item, index, array) => {
              if (!item) {return(null)};
              return(
                <li className={styles.imageContainer} key={index}>
                  <img className={styles.image} src={item.image}/>
                  { ((ingridients.length > 6) && (index === 0)) &&
                    <div className={styles.imageOverlay}>
                      <p className={`text text_type_main-small ${styles.imageText}`}>+{ingridients.length - 6}</p>
                    </div>
                  }
                </li>
              );
            })
          }
        </ul>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
}

export default OrderItem;