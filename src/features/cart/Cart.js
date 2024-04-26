import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Cart.css";
import { deleteAysnc, fetchAysnc, updateAysnc } from "./CartsSlice";


export default function Cart() {
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAysnc());
  }, []);

  const handleChange = (e, id) => {
    dispatch(updateAysnc({ id, change: { quantity: e.target.value } }));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          border: "1px solid black",
          height: "auto",
          gap: "20px",
        }}
      >
        {items.map((item, index) => (
          <div className="cart-item" key={index}>
            <img src={item.thumbnail} alt={item.title} className="img-fluid" />
            <div className="description">
              <p>{item.title}</p>
              <span>{item.brand}</span>
              <strong>${item.price}</strong>
            </div>
            <div className="quantity">
              <select
                name=""
                id=""
                value={item.quantity}
                onChange={(e) => handleChange(e, item.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
            <div className="close">
              <button onClick={() => dispatch(deleteAysnc(item))}>X</button>
            </div>
          </div>
        ))}
      </div>
      <h1>Total Sum : {items.reduce((acc,item)=>item.price*item.quantity+acc,0)}</h1>
    </div>
  );
}
