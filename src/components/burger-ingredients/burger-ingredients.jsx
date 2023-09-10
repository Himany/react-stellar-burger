import React from 'react';
import { useSelector } from 'react-redux';
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation } from "react-router-dom";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('bun');

  const items = useSelector(state => state.ingredients.items);
  const burgerData = useSelector(state => state.burgetIng);
  const location = useLocation();

  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  const [bunRefContainer, inViewBun] = useInView({ threshold: 0.3 });
  const [sauceRefContainer, inViewSause] = useInView({ threshold: 0.3 });
  const [mainRefContainer, inViewMain] = useInView({ threshold: 0.3 });
  
  React.useEffect(()=> {
    if (inViewBun) {setCurrent('bun')};
    if (inViewSause && !inViewBun) {setCurrent('sauce')};
    if (inViewMain && !inViewSause) {setCurrent('main')};
  }, [inViewBun, inViewSause, inViewMain])

  const bun = [];
  const sauce = [];
  const main = [];

  items.forEach((item) => {
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
  };

  const getCount = (item) => {
    if (item.type === 'bun') {
      return(burgerData.bun.hasOwnProperty('_id') ? ((burgerData.bun._id === item._id) ? 2 : 0) : 0);
    } else {
      return(burgerData.items.reduce(((result, burgerItem, burgerIndex, burgerArray) => {
        if (burgerItem._id === item._id) {
          return(result + 1);
        }
        return (result);
      }), 0));
    }
  }

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
        <div className={`${styles.elementsContainer} ml-4`} ref={bunRefContainer}>
          {
            bun.map((item) => {
              return(
                <Link
                  className={styles.link}
                  key={item._id}
                  to={`/ingredients/${item._id}`}
                  state={{ background: location }}
                >
                  <Ingredient data={item} count={getCount(item)}/>
                </Link>
              );
            })
          }
        </div>
        <p className="text text_type_main-medium pt-10" ref={sauceRef}>Соусы</p>
        <div className={`${styles.elementsContainer} ml-4`} ref={sauceRefContainer}>
          {
            sauce.map((item) => {
              return(
                <Link
                  className={styles.link}
                  key={item._id}
                  to={`/ingredients/${item._id}`}
                  state={{ background: location }}
                >
                  <Ingredient data={item} count={getCount(item)}/>
                </Link>
              );
            })
          }
        </div>
        <p className="text text_type_main-medium pt-10" ref={mainRef}>Начинки</p>
        <div className={`${styles.elementsContainer} ml-4`} ref={mainRefContainer}>
          {
            main.map((item) => {
              return(
                <Link
                  className={styles.link}
                  key={item._id}
                  to={`/ingredients/${item._id}`}
                  state={{ background: location }}
                >
                  <Ingredient data={item} count={getCount(item)}/>
                </Link>
              );
            })
          }
        </div>
      </div>
      {
      /*isShowIngredient && 
        <Modal extraClasses="pb-15 pt-10" closeAction={setIsShowIngredient} title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      */
      }
    </section>
  );
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;