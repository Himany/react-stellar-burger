import PropTypes from 'prop-types';
import styles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types.js";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

function Ingredient(props) {
  const { data, count } = props;

  const [{ isDragging }, ref] = useDrag({
    type: 'items',
    item: data,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return(
    <div className={`${styles.elementContainer} mt-6`} onClick={() => {props.view(data)}} ref={ref}>
      <img className={`${styles.img} ${isDragging ? styles.isDragging : ''}`} src={data.image} alt={data.name} />
      <div className={`${styles.priceContainer} mt-1`}>
        <p className="text text_type_digits-default">{data.price}</p><CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.elementName} mt-1`}>{data.name}</p>
      { (count > 0) && 
        <Counter count={count} size="default" />
      }
    </div>
  );
}

Ingredient.propTypes = {
  data:ingredientPropType.isRequired,
  count:PropTypes.number.isRequired,
  view:PropTypes.func.isRequired
};

export default Ingredient;