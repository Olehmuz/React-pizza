import React from "react";
import "./pagination.scss";
import PizzaBlock from "../Pizza-block/pizza-block";
import Categories from "../Categories/categories";
import Sort from "../Sort/sort";
import { Skeleton } from "./skeleton";
import ReactPaginate from "react-paginate";
import { InputValueContext } from "../../App";
import { lists } from "../Sort/sort";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  setSort,
} from "./../../redux/slices/filterSlice";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { fetchPizzas } from "../../redux/slices/pizzaSlice";

const Content = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { sort, categoryId, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const { items, loadingStatus } = useSelector((state) => state.pizzaSlice);
  const { inputValue } = React.useContext(InputValueContext);
  const [isLoading, upadateIsLoading] = React.useState(true);

  const pageLimit = 4;
  const dispatch = useDispatch();
  const onCategoryIdChange = (id) => {
    dispatch(setCategoryId(id));
  };
  const onSortChange = (obj) => {
    dispatch(setSort(obj));
  };
  const onCurrentPageChange = (number) => {
    dispatch(setCurrentPage(number));
    console.log(number);
  };

  const [searchParams, setSearchParams] = useSearchParams({});
  // Work with first render
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
        inputValue,
        currentPage,
      };
      setSearchParams(params);
    }
    isMounted.current = true;
  }, [categoryId, sort, inputValue, currentPage, setSearchParams]);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const order = `&order=${sort.sortType.includes("-") ? "asc" : "desc"}`;
    const sortBy = `&sortBy=${sort.sortType.replace("-", "")}`;
    const search = inputValue ? `&search=${inputValue}` : "";
    const page = `&page=${currentPage + 1}&limit=${pageLimit}`;
    upadateIsLoading(true);

    dispatch(fetchPizzas({ category, page, sortBy, order, search }));

    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, inputValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} updateValue={onCategoryIdChange} />
        <Sort value={sort} updateValue={onSortChange} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {loadingStatus === 'error' && <div className="content__error-info">
        <h2>Сталась помилка 😕</h2>
        <p>На жаль, пітц німа. Спробуйте повторити спробу пізніше.</p>
      </div>}
      <div className="content__items">
        {loadingStatus === 'loading'
          ? [...new Array(4)].map((el, ind) => <Skeleton key={ind} />)
          : items.map((el) => {
              return <PizzaBlock key={el.id} {...el} />;
            })
        }
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
