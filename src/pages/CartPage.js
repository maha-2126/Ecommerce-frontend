// CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // Cart state
  const navigate = useNavigate(); // Hook to navigate to the checkout page

  // Fetch cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  // Update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent negative or zero quantities
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  // Calculate the total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Navigate to checkout
  const handleCheckoutClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              {/* Product Image */}
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              {/* Product Details */}
              <div className="product-details">
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <div>
                  <label>Quantity: </label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                  />
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemoveItem(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="grand-total">
            <h3>Grand Total: ${calculateTotal()}</h3>
            <button onClick={handleCheckoutClick}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
