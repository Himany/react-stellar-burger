import PropTypes from 'prop-types';
import styles from "./link.module.css";

function Link(props) {
  return(
    <a className={`${styles.link} ${styles.li}`} href={props.href}>
      {props.icon}
      <span className="text text_type_main-default">{props.text}</span>
    </a>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
};

export default Link;