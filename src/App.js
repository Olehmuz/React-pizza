import "./scss/app.scss";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/header";

import PageNotFound from "./pages/PageNotFound";
import ContentPage from "./pages/ContentPage";

function App() {
  
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<ContentPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
