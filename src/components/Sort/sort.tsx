import React from "react";
import { useSelector } from "react-redux";
import { selectFilter, setSort } from "../../redux/slices/filterSlice";
import { useAppDispatch } from "../../redux/store";
type SortType = {
  name: string;
  sortType: string;
}
export const lists: SortType[] = [
  { name: "популярності (За спаданням)", sortType: "rating" },
  { name: "популярности (За збільшенням)", sortType: "-rating" },
  { name: "ціні (За спаданням)", sortType: "price" },
  { name: "ціні (За збільшенням)", sortType: "-price" },
  { name: "алфавіту (Від А до Я)", sortType: "-title" },
  { name: "алфавіту (Від Я до А)", sortType: "title" },
];

const Sort:React.FC = () => {
  const [activePopUp, ToggleActivePopUp] = React.useState(false);
  const { sort } = useSelector(selectFilter);

  const dispatch = useAppDispatch();
  const onSortChange = (obj:SortType) => {
    dispatch(setSort(obj));
  };

  const popUp = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handlerClick = (e:MouseEvent) => {
      if (popUp.current && !e.composedPath().includes(popUp.current)) {
        ToggleActivePopUp(false);
      }
    };
    document.body.addEventListener("click", handlerClick);
    return () => {
      document.body.removeEventListener("click", handlerClick);
    };
  }, []);

  const toggleActiveList = (obj: SortType) => {
    onSortChange(obj);
    ToggleActivePopUp(false);
  };
  return (
    <div className="sort" ref={popUp}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => ToggleActivePopUp(!activePopUp)}>
          {sort.name}
        </span>
      </div>
      {activePopUp && (
        <div className="sort__popup">
          <ul>
            {lists.map((el, ind) => (
              <li
                key={ind}
                onClick={() => toggleActiveList(el)}
                className={sort.sortType === el.sortType ? "active" : ''}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;
