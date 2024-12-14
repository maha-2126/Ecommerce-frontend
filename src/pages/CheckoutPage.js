import React, { useState } from "react";

const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Handle order confirmation
  const handleOrderConfirm = (e) => {
    e.preventDefault();
    if (
      userInfo.name &&
      userInfo.email &&
      userInfo.address &&
      userInfo.city &&
      userInfo.postalCode &&
      userInfo.phone
    ) {
      setOrderConfirmed(true);
      localStorage.removeItem("cart"); // Clear cart after confirming order
      localStorage.setItem("userOrder", JSON.stringify(userInfo)); // Store user order
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {orderConfirmed ? (
        <div className="order-confirmation">
          <h2>Thank you for your order, {userInfo.name}!</h2>
          <p>Your order has been confirmed and is on its way!</p>
        </div>
      ) : (
        <form onSubmit={handleOrderConfirm} className="checkout-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userInfo.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userInfo.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={userInfo.address}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={userInfo.city}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              value={userInfo.postalCode}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={userInfo.phone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="confirm-btn">
            Confirm Order
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
