import { useState } from "react";
import "./Shop.css";
import { useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../fakedb";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    //getting id of stored products in local storage
    for (const id in storedCart) {
      //getting the products from db using the ids stored in local storage
      const addedProduct = products.find((product) => product.id === id);
      //getting the quantity from local storage using the ids
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div>
        <h2>Total Products: {products.length}</h2>
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
      </div>
      <div className="order-cart">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/orders">
            <button className="review-order-btn">Review order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
