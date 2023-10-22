import styles from "./feed.module.css";

import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import Preloader from "../../components/preloader/preloader";
import OrderItem from "../../components/order-item/order-item";
import { FEED_WS_CONNECTION_START, FEED_WS_CONNECTION_CLOSED } from "../../services/actions/wsActions";

import { useAppSelector, useAppDispatch } from '../../services/types/type';

const Feed:FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const feed = useAppSelector(state => state.feed);

  React.useEffect(()=> {
    dispatch({type: FEED_WS_CONNECTION_START, payload: ""});
    return () => {
      dispatch({type: FEED_WS_CONNECTION_CLOSED});
    };
  }, [])

  const ordersReadyNumber: number[] = [];
  const ordersWorkNumber: number[] = [];

  if (feed.orders) {
    feed.orders.orders.forEach((item) => {
      if (item.status === 'done') {
        ordersReadyNumber.push(item.number);
      } else {
        ordersWorkNumber.push(item.number);
      }
    });
  }

  return(
    <main className={styles.main}>
      {(!feed.wsConnected || feed.wsError) ? (
        <>
          {feed.wsError ? (
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
        <>
          <p className="text text_type_main-large">Лента заказов</p>
          <div className={styles.container}>
            <div className={`${styles.ordersContainer} custom-scroll`}>
              {(feed.orders) && 
                feed.orders.orders.map((item) => {
                  return(
                    <Link
                      className={styles.link}
                      key={item._id}
                      to={`/feed/${item.number}`}
                      state={{ background: location }}
                    >
                      <OrderItem type="feed" id={item._id} />
                    </Link>
                  )
                })
              }
            </div>
            <div className={styles.statisticsContainer}>
              <div className={styles.ordersNumberContainer}>
                <div>
                  <p className="text text_type_main-medium mb-6">Готовы:</p>
                  <div className={styles.ordersReadyContainer}>
                    {
                      ordersReadyNumber.slice(0,10).map((item) => {
                        return(<p className="text text_type_digits-default" key={`feed_ready_num_${item}`}>{item}</p>)
                      })
                    }
                  </div>
                </div>
                <div>
                  <p className="text text_type_main-medium mb-6">В работе:</p>
                  <div className={styles.ordersOnWorkContainer}>
                    {
                      ordersWorkNumber.slice(0,10).map((item) => {
                        return(<p className="text text_type_digits-default" key={`feed_work_num_${item}`}>{item}</p>)
                      })
                    }
                  </div>
                </div>
              </div>
              <div>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={`text text_type_digits-large ${styles.textShadow}`}>{(feed.orders) ? feed.orders.total : '-'}</p>
              </div>
              <div>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={`text text_type_digits-large ${styles.textShadow}`}>{(feed.orders) ? feed.orders.totalToday : '-'}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Feed;