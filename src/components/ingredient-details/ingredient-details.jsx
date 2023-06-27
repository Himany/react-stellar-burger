import React from "react";
import PropTypes from 'prop-types';
import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types.js";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientDetails(props) {
  return(
    <>
      <div className={`${styles.titleContainer} pr-10 pl-10`}>
        <p className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</p>
        <div className={styles.close}><CloseIcon type="primary" onClick={() => {props.closeAction(false);}} /></div>
      </div>
      <img className={styles.img} src={props.data.image} alt={props.data.name} />
      <p className={`text text_type_main-medium ${styles.subTitle} mt-4`}>{props.data.name}</p>
      <div className={`${styles.dataContainer} mt-8`}>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.calories}</p>
        </div>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.proteins}</p>
        </div>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.fat}</p>
        </div>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.data.carbohydrates}</p>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  data: ingredientPropType.isRequired,
  closeAction:PropTypes.func.isRequired
};

export default IngredientDetails;