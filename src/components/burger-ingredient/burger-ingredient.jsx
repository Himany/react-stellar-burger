import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from "./burger-ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types.js";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { REMOVE_BURGER_ITEM, CHANGE_BURGER_ING_INDEX } from '../../services/actions/burgerIng';

function BurgerIngredient({item, index, type}) {
  const dispatch = useDispatch();

  const deleteItem = (index) => {
    dispatch({ type: REMOVE_BURGER_ITEM, index: index })
  }


  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'burgerItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {return};
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {return};
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {return};
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {return};
      dispatch({ type: CHANGE_BURGER_ING_INDEX, oldIndex: dragIndex, newIndex: hoverIndex });
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'burgerItem',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))


  return(
    <li className={`${styles.elementContainer}`} ref={ref}  style={{ opacity: isDragging ? 0 : 1 }}>
      { !((type === 'top') || (type === 'bottom')) &&
        <DragIcon type="primary" />
      }
      <ConstructorElement type={type} isLocked={(type === 'top') || (type === 'bottom')} text={((type === 'top') ? `${item.name} (Верх)` : ((type === 'bottom') ? `${item.name} (Низ)` : item.name))} price={item.price} thumbnail={item.image} handleClose={() => {deleteItem(index)}} />
    </li>
  );
};

BurgerIngredient.propTypes = {
  item: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string
};

export default BurgerIngredient;