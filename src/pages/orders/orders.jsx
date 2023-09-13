import styles from "./orders.module.css";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from "react-router-dom";

import Preloader from "../../components/preloader/preloader";
import OrderItem from "../../components/order-item/order-item";
import ProfileNav from '../../components/profile-nav/profile-nav';
import { UORDER_WS_CONNECTION_START, UORDER_WS_CONNECTION_CLOSED } from "../../services/actions/wsActions";

function Orders() {
  const dispatch = useDispatch();
  const location = useLocation();

  const uOrders = useSelector(state => state.uOrders);

  React.useEffect(()=> {
    dispatch({type: UORDER_WS_CONNECTION_START});
    return () => {
      dispatch({type: UORDER_WS_CONNECTION_CLOSED});
    };
  }, [])


  return(
    <main className={styles.container}>
      <ProfileNav />
      {(!uOrders.wsConnected || uOrders.wsError) ? (
        <>
          {uOrders.wsError ? (
            <div className={styles.centerContainer}>
              <p className="text text_type_main-large">Произошла ошибка при соединении с сервером</p>
            </div>
          ) : (
            <div className={styles.centerContainer}>
              <Preloader />
            </div>
          )}
        </>
      ) : (
        <div className={`${styles.ordersContainer} custom-scroll`}>
          {(uOrders.orders.orders) && 
            uOrders.orders.orders.map((item) => {
              return(
                <Link
                  className={styles.link}
                  key={item._id}
                  to={`/profile/orders/${item.number}`}
                  state={{ background: location }}
                >
                  <OrderItem type="uOrders" id={item._id} />
                </Link>
              )
            })
          }
        </div>
      )}
    </main>
  );
}

export default Orders;