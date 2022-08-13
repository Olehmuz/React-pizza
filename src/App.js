import "./scss/app.scss";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";

import PageNotFound from "./pages/PageNotFound";
import ContentPage from "./pages/ContentPage";
import Cart from "./pages/Cart";
function App() {

  return (
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<ContentPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;
