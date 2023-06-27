import React from "react";
import styles from "./modal-overlay.module.css";
import * as ReactDOM from 'react-dom';

const modalRoot = document.getElementById("react-modals");

function ModalOverlay(props) {
  function handleEscapeClick(event) {
    if (event.key === 'Escape') {
      props.closeAction();
    }
  };
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      props.closeAction();
    }
  };
  React.useEffect(() => {
    window.addEventListener('keyup', handleEscapeClick)
    return () => window.removeEventListener('keyup', handleEscapeClick)
  }, []);
  return ReactDOM.createPortal(
    (
      <div className={styles.overlay} onClick={handleOverlayClick}>
          {props.children}
      </div>
    ), 
    modalRoot
  );
};

export default ModalOverlay;