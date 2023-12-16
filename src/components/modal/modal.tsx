import React, { FC } from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModal } from '../../services/types/type';

const Modal: FC<TModal> = ({children, extraClasses, closeAction, title}) => {
  function handleEscapeClick(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeAction(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener('keyup', handleEscapeClick)
    return () => window.removeEventListener('keyup', handleEscapeClick)
  }, []);
  return(
    <ModalOverlay closeAction={closeAction}>
      <div className={`${styles.container} ${extraClasses}`}>
      <div className={`${styles.titleContainer} pr-10 pl-10`}>
        <p className={`text text_type_main-large ${styles.title}`}>{title}</p>
        <div className={styles.close}>
          <CloseIcon type="primary" onClick={() => {closeAction(false)}} />
        </div>
      </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;