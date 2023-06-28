import React from "react";
import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";
import * as ReactDOM from 'react-dom';

const modalRoot = document.getElementById("react-modals");

function ModalOverlay(props) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      props.closeAction(false);
    }
  };
  return ReactDOM.createPortal(
    (
      <div className={styles.overlay} onClick={handleOverlayClick}>
          {props.children}
      </div>
    ), 
    modalRoot
  );
};

ModalOverlay.propTypes = {
  closeAction:PropTypes.func.isRequired
};

export default ModalOverlay;