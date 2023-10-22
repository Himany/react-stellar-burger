import { FC } from "react";
import styles from "./profile-nav.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { getCookie } from '../../utils/cookie';
import { logout } from "../../services/actions/user";

const ProfileNav: FC = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logout({token: refreshToken}))
  };

  return(
    <div className={`mr-15 ${styles.navContainer}`}>
      <NavLink to="/profile" className={styles.navLink} end>
        {({ isActive }) => (
          <span className={`text text_type_main-medium ${styles.link} ${isActive ? styles.linkActive : ''}`}>Профиль</span>
        )}
      </NavLink>
      <NavLink to="/profile/orders" className={styles.navLink} end>
        {({ isActive }) => (
          <span className={`text text_type_main-medium ${styles.link} ${isActive ? styles.linkActive : ''}`}>История заказов</span>
        )}
      </NavLink>
      <p className={`text text_type_main-medium text_color_inactive ${styles.navLink} ${styles.link}`} onClick={logOut}>Выход</p>
      <p className={`text text_type_main-small text_color_inactive mt-20 ${styles.profileDescription}`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  );
}

export default ProfileNav;