import React, { useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import { Product } from "./features/products/Product";
import Cart from "./features/cart/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);
  return (
    <div className="App">
      {/* <Product /> */}
      <button onClick={() => setShowCart(!showCart)}>toggleCart</button>
      {showCart ? <Cart /> : <Product />}
    </div>
  );
}

export default App;
