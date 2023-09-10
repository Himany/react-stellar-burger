import { useSelector } from 'react-redux';
import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

function IngredientDetails({isPage}) {
  const items = useSelector(state => state.ingredients.items);
  const { id } = useParams();
  
  const item = items.find(({_id}) => (id === _id));

  if (!item) {return(null)};
  
  return(
    <>
      {isPage &&
        <p className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</p>
      }
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

IngredientDetails.propTypes = {
  isPage: PropTypes.bool.isRequired
};

export default IngredientDetails;