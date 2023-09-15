import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
  const { img, name, seller, ratings, price } = props.product;
  const handleAddToCart = props.handleAddToCart;
  return (
    <div className="product">
      <img src={img} alt="" />
      <div className="product-details">
        <h4>{name}</h4>
        <p>Seller: {seller}</p>
        <p>rating: {ratings} stars</p>
        <p>Price: {price}</p>
      </div>
      <button
        className="add-btn"
        onClick={() => handleAddToCart(props.product)}
      >
        Add to cart <FontAwesomeIcon icon={faShoppingCart} />
      </button>
    </div>
  );
};

export default Product;
