import PropTypes from 'prop-types';
import styles from "./link.module.css";
import { NavLink } from "react-router-dom";

function Link(props) {
  return(
    <NavLink to={props.to} className={`${styles.link} ${styles.li}`}>
      {({ isActive }) => (
        <>
          <props.icon type={isActive ? "primary" : "secondary"} />
          <span className={`text text_type_main-default ${isActive ? styles.linkActive : ''}`}>{props.text}</span>
        </>
      )}
    </NavLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Link;