import styles from "./feed-id.module.css";

import React, { FC } from "react";
import { useParams } from "react-router-dom";

import Preloader from "../../components/preloader/preloader";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderData } from '../../services/actions/order-data'

import { useAppSelector, useAppDispatch, TFeedId } from '../../services/types/type';

const FeedId: FC<TFeedId> = ({ isPage }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();

  React.useEffect(()=> {
    if (id) {
      dispatch(getOrderData(id));
    }
  }, [])

  const orderData = useAppSelector(state => state.orderData);
  const items = useAppSelector(state => state.ingredients.items);

  if (orderData.orderRequest) {return(<Preloader />)};
  if (orderData.orderFailed) {return(<p className="text text_type_main-medium">Ошибка загрузки данных</p>)};
  if (!orderData.data || !items) {return(<Preloader />)};
  if (!orderData.data.orders) {return(<Preloader />)};
  if (orderData.data.orders.length === 0) {return(<Preloader />)};

  const order = orderData.data.orders[0];

  const orderNumber = order.number;
  const orderDate = new Date(order.createdAt);
  const orderName =  order.name;
  const orderStatus = order.status === 'done' ? "Выполнен" : "В работе";
  let orderPrice = 0;
  const preIngridients: { id: string; count: number }[] = [];
  order.ingredients.forEach((item) => {
    const count = order.ingredients.reduce((count, element) => (element === item ? count += 1 : 1), 0);
    const ingObject = preIngridients.find((ing) => (ing.id === item));
    if (!ingObject && item) {
      preIngridients.push({id: item, count: count});
    }
  });
  const ingridients = preIngridients.map((item) => {
    const ingObject = items.find((ing) => (item.id === ing._id));
    if (ingObject) {
      orderPrice += ingObject.price * item.count;
    }
    return({...ingObject, count: item.count});
  });

  return(
    <main className={`${styles.main} ${isPage ? 'mt-30' : ''}`}>
      <p className={`text text_type_digits-default ${styles.orderNumber}`}>#{orderNumber}</p>
      <p className="text text_type_main-medium mt-10">{orderName}</p>
      <p className={`text text_type_main-small mt-3 ${styles.orderStatus}`}>{orderStatus}</p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <div className={`${styles.ingsContainer} custom-scroll`}>
        {
          ingridients.map((item, index) => {
            return(
              <article className={styles.ingContainer} key={index} >
                <div className={styles.imageContainer}>
                  <img className={styles.image} src={item.image}/>
                </div>
                <p className={`text text_type_main-small ${styles.ingName}`}>{item.name}</p>
                <div className={styles.priceContainer}>
                  <p className="text text_type_digits-default">{item.count} x {item.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </article>
            );
          })
        }
      </div>
      <div className={styles.bottomContainer}>
        <p className="text text_type_main-default text_color_inactive"><FormattedDate date={orderDate} /></p>
        <div className={styles.priceContainer}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </main>
  );
}

export default FeedId;