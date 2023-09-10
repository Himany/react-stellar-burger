import styles from "./orders.module.css";

import ProfileNav from '../../components/profile-nav/profile-nav';

function Orders() {
  return(
    <main className={styles.container}>
      <ProfileNav />
    </main>
  );
}

export default Orders;