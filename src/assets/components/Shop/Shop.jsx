import { useState } from "react";
import "./Shop.css";
import { useEffect } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../fakedb";
import { Link, useLoaderData } from "react-router-dom";
import { number } from "prop-types";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { totalProducts } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const pageNumbers = [...Array(totalPages).keys()];

  useEffect(() => {
    fetch(
      `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((result) => result.json())
      .then((cartProducts) => {
        //getting id of stored products in local storage
        for (const id in storedCart) {
          //getting the products from db using the ids stored in local storage
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          //getting the quantity from local storage using the ids
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      }, []);
  });

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <>
      <div className="shop-container">
        <div>
          <h2>Total Products: {products.length}</h2>
          <div className="products-container">
            {products.map((product) => (
              <Product
                key={product._id}
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
      <div className="pagination">
        {pageNumbers.map((index) => (
          <button
            className={currentPage === index ? "selected" : ""}
            onClick={() => setCurrentPage(index)}
            key={number}
          >
            {index + 1}
          </button>
        ))}
        <select
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(0); // Reset to the first page when changing items per page
          }}
          value={itemsPerPage}
        >
          <option value={5}>5 </option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </>
  );
};

export default Shop;
