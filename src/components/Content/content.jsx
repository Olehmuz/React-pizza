import React from 'react'

import PizzaBlock from "../Pizza-block/pizza-block";
import Categories from "../Categories/categories";
import Sort from "../Sort/sort";
import { Skeleton } from './skeleton';

const Content = () => {
  const [pizzaList, updatePizzaList] = React.useState([]);
  const [isLoading, upadateIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://62c5bbc4a361f725128d123e.mockapi.io/items")
      .then((res) => res.json())
      .then((res) => {
        updatePizzaList(res);
        upadateIsLoading(false);
      });
      window.scrollTo(0, 0);
  }, []);


  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {
        isLoading ? [...new Array(12)].map((el, ind) => <Skeleton key={ind} />) :
        pizzaList.map((el) => {
          return <PizzaBlock key={el.id} {...el} />;
        })
        }
      </div>
    </>
  );
};
export default Content;
