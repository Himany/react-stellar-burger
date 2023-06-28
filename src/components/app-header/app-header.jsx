import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Link from "../link/link";

function AppHeader() {
  return(
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={<BurgerIcon type="secondary" />} text="Конструктор" href="#" /></li>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={<ListIcon type="secondary" />} text="Лента заказов" href="#" /></li>
          <li className={`${styles.li} ${styles.logo}`}><Logo /></li>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={<ProfileIcon type="secondary" />} text="Личный кабинет" href="#" /></li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;