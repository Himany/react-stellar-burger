import { FC } from "react";
import styles from "./full-screen-container.module.css";

const FullScreenContainer: FC = (props) => {
  return(
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

export default FullScreenContainer;