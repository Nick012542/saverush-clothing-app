import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/cartSidebar.css";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleDecrease = (productId, size, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(productId, size, currentQty - 1);
    }
  };

  const handleIncrease = (productId, size, currentQty) => {
    updateQuantity(productId, size, currentQty + 1);
  };
  

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="close-cart" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item " key={index}>
              <img src={`/${item.images?.[0]}`} alt={item.name} />
              <div className="cart-item-info ">
                <h5>{item.name}</h5>
                <div className="flex justify-between">
                  <p>Size: {item.selectedSize}</p>
                  <p className="price-line">₹{item.price * item.quantity}</p>
                </div>

                <div className="flex justify-between">
                  <div className="quantity-controls ">
                  <button
                    onClick={() =>
                      handleDecrease(
                        item.productId,
                        item.selectedSize,
                        item.quantity
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncrease(
                        item.productId,
                        item.selectedSize,
                        item.quantity
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.productId, item.selectedSize)
                  }
                >
                  Remove
                </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">Total: ₹{total.toLocaleString()}</div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
