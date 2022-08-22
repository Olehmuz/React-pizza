import React from "react";
import "./pagination.scss";
import PizzaBlock from "../Pizza-block/pizza-block";
import Categories from "../Categories/categories";
import Sort from "../Sort/sort";
import { Skeleton } from "./skeleton";
import ReactPaginate from "react-paginate";
import { lists } from "../Sort/sort";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/slices/filterSlice";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { fetchPizzas, selectPizza } from "../../redux/slices/pizzaSlice";

const Content:React.FC = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { sort, categoryId, currentPage } = useSelector(selectFilter);

  const { items, loadingStatus, searchValue } = useSelector(selectPizza);

  const pageLimit = 4;
  const dispatch = useDispatch();

  const onCategoryIdChange = (id: number) => {
    dispatch(setCategoryId(id));
  };
  
  const onCurrentPageChange = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const [searchParams, setSearchParams] = useSearchParams({});
  

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const newSort = lists.find((obj) => obj.sortType === params.sort);
      const newParams = {
        categoryId: params.categoryId,
        currentPage: params.currentPage,
        sort: newSort,
      };
      dispatch(
        setFilters({
          ...newParams,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId,
        sort: sort.sortType,
        searchValue,
        currentPage,
      };
      setSearchParams(params);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage, setSearchParams]);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = `&order=${sort.sortType.includes("-") ? "asc" : "desc"}`;
    const sortBy = `&sortBy=${sort.sortType.replace("-", "")}`;
    const search = searchValue ? `&search=${searchValue}` : "";
    const page = `&page=${currentPage + 1}&limit=${pageLimit}`;
    // @ts-ignore
    dispatch(fetchPizzas({ category, page, sortBy, order, search }));

    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} updateValue={onCategoryIdChange} />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {loadingStatus === "error" && (
        <div className="content__error-info">
          <h2>Сталась помилка 😕</h2>
          <p>На жаль, пітц німа. Спробуйте повторити спробу пізніше.</p>
        </div>
      )}
      <div className="content__items">
        {loadingStatus === "loading"
          ? [...new Array(4)].map((el, ind) => <Skeleton key={ind} />)
          : items.map((el: any) => {
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
      />
    </>
  );
};
export default Content;
