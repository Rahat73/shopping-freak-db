import { getShoppingCart } from "../assets/fakedb";

const cartProductLoader = async () => {
  // if cart data is in database, then we have to use async await
  const storedCart = getShoppingCart();
  const ids = Object.keys(storedCart);
  const savedCart = [];

  const loadedProducts = await fetch("http://localhost:5000/productsByIds", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  const products = await loadedProducts.json();

  for (const id in storedCart) {
    const addedProduct = products.find((product) => product._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }

  return savedCart;
};

export default cartProductLoader;
