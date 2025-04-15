import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import CartPage from "./pages/cartPage";
import ProductDetailsPage from "./pages/productDetailsPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route
          path="/product-details/:id"
          element={<ProductDetailsPage />}
        ></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
