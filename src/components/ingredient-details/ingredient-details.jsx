import React from "react";
import PropTypes from 'prop-types';
import styles from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types.js";

function IngredientDetails(props) {
  return(
    <>
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
  data: ingredientPropType.isRequired
};

export default IngredientDetails;