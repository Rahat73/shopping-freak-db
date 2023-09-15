import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = (props) => {
  const { cart, handleClearCart, children } = props;

  let totalPrice = 0;
  let totalShipping = 0;
  let totalQuantity = 0;

  for (const item of cart) {
    //setting quantity to 1 bcz db has quantity 0, and quantity getting multiplied, so whole result becomes 0
    item.quantity = item.quantity || 1;

    totalPrice = totalPrice + item.price * item.quantity;
    totalShipping = totalShipping + item.shipping;
    totalQuantity = totalQuantity + item.quantity;
  }

  const tax = (totalPrice * 7) / 100;

  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="cart">
      <h2>Order Summery</h2>
      <div className="cart-details">
        <p>Selected items: {totalQuantity}</p>
        <p>Total price: ${totalPrice}</p>
        <p>Total Shipping: ${totalShipping}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h4>Grand total: ${grandTotal.toFixed(2)}</h4>
      </div>
      <div className="cart-buttons">
        <button className="clear-cart-btn" onClick={handleClearCart}>
          Clear cart <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Cart;
