import React from "react";
import PropTypes from 'prop-types';
import styles from "./modal.module.css";

function Modal(props) {
  return(
    <div className={`${styles.container} ${props.extraClasses}`}>
      {props.children}
    </div>
  );
};

Modal.propTypes = {
  extraClasses: PropTypes.string.isRequired
};

export default Modal;