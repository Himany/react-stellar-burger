import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./ingredient-details.module.css";
import { REMOVE_VIEW_ING_ITEM } from '../../services/actions/viewIngredient'

function IngredientDetails(props) {
  const { item } = useSelector(state => state.viewIngredient);
  const dispatch = useDispatch();
  
  React.useEffect(()=> {
    return (() => {
      dispatch({ type: REMOVE_VIEW_ING_ITEM });
    });
  }, [])

  return(
    <>
      <img className={styles.img} src={item.image} alt={item.name} />
      <p className={`text text_type_main-medium ${styles.subTitle} mt-4`}>{item.name}</p>
      <div className={`${styles.dataContainer} mt-8`}>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
        </div>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
        </div>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
        </div>
        <div className={`${styles.dataSubContainer}`}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {};

export default IngredientDetails;