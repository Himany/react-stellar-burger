import styles from "./not-found.module.css";

import { useNavigate } from "react-router-dom";

import Preloader from "../../components/preloader/preloader";
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function NotFound() {
  const navigate = useNavigate();
  function goToMain() {
    navigate('/');
  }
  return(
    <main className={styles.container}>
      <p className="text text_type_main-medium mb-20">Ого, похоже твой корабль попал в дальний космос</p>
      <Preloader />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-20" onClick={goToMain}>Вернуться на главную страницу</Button>
    </main>
  );
}

export default NotFound;