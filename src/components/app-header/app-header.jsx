import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Link(props) {
  return(
    <a className={`${styles.link} ${styles.li}`} href='#'>
      {props.icon}
      <span className="text text_type_main-default">{props.text}</span>
    </a>
  );
}

function AppHeader() {
  return(
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={<BurgerIcon type="secondary" />} text="Конструктор" /></li>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={<ListIcon type="secondary" />} text="Лента заказов" /></li>
          <li className={`${styles.li} ${styles.logo}`}><Logo /></li>
          <li className='pt-4 pb-4 pl-5 pr-5'><Link icon={<ProfileIcon type="secondary" />} text="Личный кабинет" /></li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;