import React from 'react'

import PizzaBlock from "../Pizza-block/pizza-block";
import Categories from "../Categories/categories";
import Sort from "../Sort/sort";
import { Skeleton } from './skeleton';

const Content = () => {
  const [pizzaList, updatePizzaList] = React.useState([]);
  const [isLoading, upadateIsLoading] = React.useState(true);
  const [activeIndex, updateActiveIndex] = React.useState(0);
  const [selectedList, selectList] = React.useState({name: 'популярності(за спаданням)', sortType: 'rating'});

  React.useEffect(() => {
    const category = activeIndex > 0 ? `category=${activeIndex}` : '';
    const order = `&order=${selectedList.sortType.includes("-") ? "asc" : "desc"}`;
    const sortBy = `&sortBy=${selectedList.sortType.replace("-","")}`;
    upadateIsLoading(true);
    fetch(`https://62c5bbc4a361f725128d123e.mockapi.io/items?${category}${sortBy}${order}`)
      .then((res) => res.json())
      .then((res) => {
        updatePizzaList(res);
        upadateIsLoading(false);
      });
      window.scrollTo(0, 0);
  }, [activeIndex, selectedList]);

  console.log(activeIndex, selectedList);
  return (
    <>
      <div className="content__top">
        <Categories value={activeIndex} updateValue={updateActiveIndex} />
        <Sort value={selectedList} updateValue={selectList}/>
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
