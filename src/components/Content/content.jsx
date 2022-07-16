import React from "react";
import './pagination.scss';
import PizzaBlock from "../Pizza-block/pizza-block";
import Categories from "../Categories/categories";
import Sort from "../Sort/sort";
import { Skeleton } from "./skeleton";
import ReactPaginate from "react-paginate";
import { InputValueContext } from "../../App";

const Content = () => {
  const {inputValue} = React.useContext(InputValueContext);
  const [pizzaList, updatePizzaList] = React.useState([]);
  const [isLoading, upadateIsLoading] = React.useState(true);
  const [activeIndex, updateActiveIndex] = React.useState(0);
  const [activePage, updateActivePage] = React.useState(0);
  const [selectedList, selectList] = React.useState({
    name: "популярності(за спаданням)",
    sortType: "rating",
  });
  const pageLimit = 4;
  React.useEffect(() => {
    
    const category = activeIndex > 0 ? `category=${activeIndex}` : "";
    const order = `&order=${
      selectedList.sortType.includes("-") ? "asc" : "desc"
    }`;
    const sortBy = `&sortBy=${selectedList.sortType.replace("-", "")}`;
    const search = inputValue ? `&search=${inputValue}` : "";
    const page = `&page=${activePage+1}&limit=${pageLimit}`;
    upadateIsLoading(true);
    fetch(
      `https://62c5bbc4a361f725128d123e.mockapi.io/items?${category}${page}${sortBy}${order}${search}`
    )
      .then((res) => res.json())
      .then((res) => {
        updatePizzaList(res);
        upadateIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeIndex, selectedList, inputValue, activePage]);


  return (
    <>
      <div className="content__top">
        <Categories value={activeIndex} updateValue={updateActiveIndex} />
        <Sort value={selectedList} updateValue={selectList} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(12)].map((el, ind) => <Skeleton key={ind} />)
          : pizzaList.map((el) => {
              return <PizzaBlock key={el.id} {...el} />;
            })}
      </div>

      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => updateActivePage(e.selected)}
        pageRangeDisplayed={pageLimit}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
export default Content;
