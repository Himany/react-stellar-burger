import React from "react";
import PropTypes from 'prop-types';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal(props) {
  function handleEscapeClick(event) {
    if (event.key === 'Escape') {
      props.closeAction(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener('keyup', handleEscapeClick)
    return () => window.removeEventListener('keyup', handleEscapeClick)
  }, []);
  return(
    <ModalOverlay closeAction={props.closeAction}>
      <div className={`${styles.container} ${props.extraClasses}`}>
      <div className={`${styles.titleContainer} pr-10 pl-10`}>
        <p className={`text text_type_main-large ${styles.title}`}>{props.title}</p>
        <div className={styles.close}>
          <CloseIcon type="primary" onClick={() => {props.closeAction(false)}} />
        </div>
      </div>
        {props.children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  extraClasses: PropTypes.string.isRequired,
  closeAction:PropTypes.func.isRequired,
  title:PropTypes.string.isRequired
};

export default Modal;