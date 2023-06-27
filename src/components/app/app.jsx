import React from "react";
import PropTypes from 'prop-types';

import styles from "./app.module.css";

import { ingredientPropType } from "../../utils/prop-types.js"

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

import ModalOverlay from "../modal-overlay/modal-overlay.jsx";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  ingredientView:PropTypes.func.isRequired
};
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  submit:PropTypes.func.isRequired
};
ModalOverlay.propTypes = {
  closeAction:PropTypes.func.isRequired
};
OrderDetails.propTypes = {
  closeAction:PropTypes.func.isRequired
};
IngredientDetails.propTypes = {
  data: ingredientPropType.isRequired,
  closeAction:PropTypes.func.isRequired
};

function App() {
  const [isShowOrder, setIsShowOrder] = React.useState(false);
  const [isShowIngredient, setIsShowIngredient] = React.useState(false);
  const [ingredientData, setIngredientData] = React.useState({});
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  })

  React.useEffect(() => {
    getIngredients();
  }, []);

  function ingredientView(obj) {
    setIngredientData(obj);
    setIsShowIngredient(true);
  };

  const url = 'https://norma.nomoreparties.space/';

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(`${url}api/ingredients`)
      .then(res => res.json())
      .then(data => setState({ ...state, data: data.data, isLoading: false }))
      .catch(e => setState({ ...state, hasError: true, isLoading: false }));
  };

  const { data, isLoading, hasError } = state;
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} ingredientView={ingredientView} />
        <BurgerConstructor data={data} submit={setIsShowOrder} />
      </main>
      { isShowOrder && 
        <ModalOverlay closeAction={setIsShowOrder}>
          <Modal extraClasses="pb-30 pt-30">
            <OrderDetails closeAction={setIsShowOrder} />
          </Modal>
        </ModalOverlay>
      }
      { isShowIngredient && 
        <ModalOverlay closeAction={setIsShowIngredient}>
          <Modal extraClasses="pb-15 pt-10">
            <IngredientDetails data={ingredientData} closeAction={setIsShowIngredient} />
          </Modal>
        </ModalOverlay>
      }
    </div>
  );
}

export default App;
