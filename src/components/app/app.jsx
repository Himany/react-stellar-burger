import React from "react";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { getIngredients } from "../../utils/api";

import { BurgerConstructorContext, reducer } from "../../services/appContext";

const initialData = {
  data: [], 
  burgerData: [], 
  orderData: {
    statusLoading: true,
    statusError: false,
    data: {
      "name": "",
      "order": {
        "number": -1
      },
      "success": false
    }
  }
}

function App() {
  const [state, setState] = React.useReducer(reducer, initialData, undefined);

  React.useEffect(() => {
    getIngredients(state, setState);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerConstructorContext.Provider value={{state, setState}}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerConstructorContext.Provider>
      </main>
    </div>
  );
}

export default App;
