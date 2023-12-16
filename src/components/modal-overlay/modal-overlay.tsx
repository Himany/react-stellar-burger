import { FC, MouseEvent } from "react";
import styles from "./modal-overlay.module.css";
import * as ReactDOM from 'react-dom';
import { TModalOverlay } from '../../services/types/type'

const modalRoot = document.getElementById("react-modals") as HTMLElement;

const ModalOverlay: FC<TModalOverlay> = ({children, closeAction}) => {
  function handleOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      closeAction(false);
    }
  };
  return ReactDOM.createPortal(
    (
      <div className={styles.overlay} onClick={handleOverlayClick}>
          {children}
      </div>
    ), 
    modalRoot
  );
};

export default ModalOverlay;