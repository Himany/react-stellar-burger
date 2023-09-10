import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Link from "../link/link";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return(
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={BurgerIcon} text="Конструктор" to="/" /></li>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={ListIcon} text="Лента заказов" to="/feed" /></li>
          <li className={`${styles.li} ${styles.logo}`}><NavLink to="/" className={styles.link}><Logo /></NavLink></li>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={ProfileIcon} text="Личный кабинет" to="/profile" /></li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;