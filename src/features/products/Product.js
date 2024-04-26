import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Product.css";
import { fetchAysnc } from "./productsSlice";
import { addAysnc } from "../cart/CartsSlice";

export function Product() {
  const productData = useSelector((state) => state.product.products);
  console.log(productData);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAysnc())}
        >
          fetch products
        </button>
        {productData.map((item, index) => (
          <div className="card" key={index}>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{ width: "100%" }}
            />
            <h1>{item.title}</h1>
            <p className="price">{item.price}</p>
            <p>{item.description}</p>
            <p>
              <button onClick={()=>dispatch(addAysnc(item))}>Add to Cart</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
