import React from "react";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { getIngredients } from "../../utils/api";

function App() {
  const [state, setState] = React.useState({
    data: []
  })

  React.useEffect(() => {
    getIngredients(setState);
  }, []);

  const { data } = state;
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
