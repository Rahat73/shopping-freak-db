// import React from 'react';

import { Link, useLoaderData } from "react-router-dom";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
import { deleteShoppingCart, removeFromDb } from "../../fakedb";
import { useState } from "react";

const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleDelete = (id) => {
    const remaining = cart.filter((item) => item.id !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div>
      <div className="shop-container">
        <div className="review-container">
          {cart.map((item) => (
            <ReviewItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
            ></ReviewItem>
          ))}
        </div>

        <div className="order-cart">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/checkout">
              <button className="payment-btn">Proceed to payment</button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};

export default Orders;
