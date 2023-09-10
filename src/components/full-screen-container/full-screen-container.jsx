import styles from "./full-screen-container.module.css";

function FullScreenContainer(props) {
  return(
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

export default FullScreenContainer;