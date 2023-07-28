import React from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { ingredientPropType } from "../../utils/prop-types.js";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { BurgerConstructorContext } from "../../services/appContext";

function BurgerIngredients(props) {
  const [isShowIngredient, setIsShowIngredient] = React.useState(false);
  const [ingredientData, setIngredientData] = React.useState({});
  const [current, setCurrent] = React.useState('bun');

  const { state, setState } = React.useContext(BurgerConstructorContext);

  function ingredientView(in_data) {
    /*
    setIngredientData(in_data);
    setIsShowIngredient(true);
    */
    setState({
      type: 'addBurgerIng',
      payload: in_data
    });
  }

  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const bun = [];
  const sauce = [];
  const main = [];

  state.data.forEach((item) => {
    switch (item.type) {
      case 'bun':
        bun.push(item);
        break;
      case 'sauce':
        sauce.push(item);
        break;
      default:
        main.push(item);
    }
  });

  const executeScroll = (value) => {
    const scrollAnim = {
      block: 'start',
      behavior: 'smooth',
    };

    switch (value) {
      case 'bun':
        bunRef.current.scrollIntoView(scrollAnim);
        break;
      case 'sauce':
        sauceRef.current.scrollIntoView(scrollAnim);
        break;
      default:
        mainRef.current.scrollIntoView(scrollAnim);
    }
    setCurrent(value);
  };

  return(
    <section className={`${styles.section} mt-10`}>
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={`${styles.tab} mt-5`}>
        <Tab value="bun" active={current === 'bun'} onClick={() => {executeScroll('bun')}}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => {executeScroll('sauce')}}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={() => {executeScroll('main')}}>Начинки</Tab>
      </div>
      <div className={`${styles.ingredientContainer} custom-scroll`}>
        <p className="text text_type_main-medium pt-10" ref={bunRef}>Булки</p>
        <div className={`${styles.elementsContainer} ml-4`}>
          {
            bun.map((item) => {
              return(
                <Ingredient data={item} count={0} key={item._id} view={ingredientView} />
              );
            })
          }
        </div>
        <p className="text text_type_main-medium pt-10" ref={sauceRef}>Соусы</p>
        <div className={`${styles.elementsContainer} ml-4`}>
          {
            sauce.map((item) => {
              return(
                <Ingredient data={item} count={0} key={item._id} view={ingredientView} />
              );
            })
          }
        </div>
        <p className="text text_type_main-medium pt-10" ref={mainRef}>Начинки</p>
        <div className={`${styles.elementsContainer} ml-4`}>
          {
            main.map((item) => {
              return(
                <Ingredient data={item} count={0} key={item._id} view={ingredientView}/>
              );
            })
          }
        </div>
      </div>
      { isShowIngredient && 
        <Modal extraClasses="pb-15 pt-10" closeAction={setIsShowIngredient} title="Детали ингредиента">
          <IngredientDetails data={ingredientData} />
        </Modal>
      }
    </section>
  );
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;