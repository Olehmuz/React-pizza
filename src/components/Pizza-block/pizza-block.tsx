import React from "react";
import { addItem } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
type PizzaBlockProps = {
  id: string;
  title: string;
  imageUrl: string;
  types: [];
  sizes: [];
  price: number;
  category: number;
  rating: number;
};
const PizzaBlock:React.FC<PizzaBlockProps> = ({
  id,
  title,
  imageUrl,
  types,
  sizes,
  price,
  category,
  rating,
}) => {
  const pizzaTypes = ["Тонка", "Традиційна"];
  const sizeType = [26, 30, 40];
  const [activeType, ChangeActiveType] = React.useState(0);
  const [activeSize, ChangeActiveSize] = React.useState(0);
  const dispatch = useAppDispatch();
  // @ts-ignore
  const { items } = useSelector((state) => state.cartSlice);
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map((type, ind) => (
            <li
              key={ind}
              onClick={() => ChangeActiveType(ind)}
              className={activeType === ind ? "active" : ''}
            >
              {pizzaTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, ind) => {
            return (
              <li
                key={ind}
                onClick={() => ChangeActiveSize(ind)}
                className={activeSize === ind ? "active" : ''}
              >
                {size} см.
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">Від {price} ₴</div>
        <div
          onClick={() =>
            dispatch(
              addItem({
                id,
                title,
                imageUrl,
                price,
                size: sizeType[activeSize],
                type: pizzaTypes[activeType],
              })
            )
          }
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>
            {items.find((obj:PizzaBlockProps) => obj.id === id)
              ? items.find((obj:PizzaBlockProps) => obj.id === id).count
              : 0}
          </i>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
