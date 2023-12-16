import { FC, useRef } from "react";
import styles from "./burger-ingredient.module.css";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { removeBurgerItem, changeBurgerIngIndex } from '../../services/actions/burgerIng';
import { useAppDispatch, TBurgerIngredient } from '../../services/types/type';

const BurgerIngredient: FC<TBurgerIngredient> = ({ item, index, type }) => {
  const dispatch = useAppDispatch();

  const deleteItem = (index: number) => {
    dispatch(removeBurgerItem(index))
  }

  const ref = useRef<HTMLLIElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'burgerItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {return};

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {return};
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset ? clientOffset.y : 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {return};
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {return};
      dispatch(changeBurgerIngIndex(dragIndex, hoverIndex));
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

export default BurgerIngredient;