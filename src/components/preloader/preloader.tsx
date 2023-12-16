import { FC } from "react";
import styles from "./preloader.module.css";

const Preloader: FC = () => {
  return(
    <span className={styles.loader}></span>
  );
}

export default Preloader;