import React from "react";
import './pagination.scss';
import PizzaBlock from "../Pizza-block/pizza-block";
import Categories from "../Categories/categories";
import Sort from "../Sort/sort";
import { Skeleton } from "./skeleton";
import ReactPaginate from "react-paginate";
import { InputValueContext } from "../../App";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage, setSort } from "./../../redux/slices/filterSlice";
import { useSearchParams } from "react-router-dom";



const Content = () => {

  const {sort, categoryId, currentPage} = useSelector(state => state.filterSlice)
  
  const {inputValue} = React.useContext(InputValueContext);
  const [pizzaList, updatePizzaList] = React.useState([]);
  const [isLoading, upadateIsLoading] = React.useState(true);
  
  const pageLimit = 4;
  const dispatchFilter = useDispatch();
  const onCategoryIdChange = (id) => {
    dispatchFilter(setCategoryId(id));
  }
  const onSortChange = (obj) => {
    dispatchFilter(setSort(obj));
  }
  const onCurrentPageChange = (number) => {
    dispatchFilter(setCurrentPage(number))
    console.log(number);
  };

  const [searchParams, setSearchParams] = useSearchParams({});

  React.useEffect(() => {
    const params = {categoryId, sort: sort.sortType, inputValue, currentPage};
    setSearchParams(params);
  },[categoryId, sort, inputValue, currentPage, setSearchParams])

  React.useEffect(() => {
    
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = `&order=${
      sort.sortType.includes("-") ? "asc" : "desc"
    }`;
    const sortBy = `&sortBy=${sort.sortType.replace("-", "")}`;
    const search = inputValue ? `&search=${inputValue}` : "";
    const page = `&page=${currentPage+1}&limit=${pageLimit}`;
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
  }, [categoryId, sort, inputValue, currentPage]);


  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} updateValue={onCategoryIdChange} />
        <Sort value={sort} updateValue={onSortChange} />
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
        forcePage={currentPage}
        onPageChange={(e) => onCurrentPageChange(e.selected)}
        pageRangeDisplayed={pageLimit}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
export default Content;
