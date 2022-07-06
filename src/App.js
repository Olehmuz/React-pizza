import "./scss/app.scss";

import Header from "./components/Header/header";
import PizzaBlock from "./components/Pizza-block/pizza-block";
import Categories from "./components/Categories/categories";
import Sort from "./components/Sort/sort";
import DB from "./assets/pizzas.json";
function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Всі піци</h2>
            <div className="content__items">
              {DB.map((el) => {
                return <PizzaBlock key={el.id} {...el} />
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
