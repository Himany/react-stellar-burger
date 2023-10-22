import { FC } from "react";
import styles from "./link.module.css";
import { NavLink } from "react-router-dom";
import { TLink } from "../../services/types/type";

const Link: FC<TLink> = ({to, icon, text}) => {
  const IconComponent = icon;
  return(
    <NavLink to={to} className={`${styles.link} ${styles.li}`}>
      {({ isActive }) => (
        <>
          <IconComponent type={isActive ? "primary" : "secondary"} />
          <span className={`text text_type_main-default ${isActive ? styles.linkActive : ''}`}>{text}</span>
        </>
      )}
    </NavLink>
  );
}

export default Link;