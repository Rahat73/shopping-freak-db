// import React from 'react';
import "./ReviewItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ item, handleDelete }) => {
  const { id, name, price, quantity, img } = item;

  return (
    <div className="review-item">
      <div className="item-details">
        <img src={img} alt="" />
        <div className="">
          <h4>{name}</h4>
          <p>Price: ${price}</p>
          <p>Quantity: {quantity}</p>
        </div>
      </div>

      <button className="delete-button" onClick={() => handleDelete(id)}>
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </button>
    </div>
  );
};

export default ReviewItem;
