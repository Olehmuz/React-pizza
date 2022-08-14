import "./scss/app.scss";
import React from "react";
import { Route, Routes } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import ContentPage from "./pages/ContentPage";
import Cart from "./pages/Cart";
import PizzaInfo from "./components/pizzaInfo/PizzaInfo";
import MainLayout from "./layout/MainLayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<ContentPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaInfo />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
