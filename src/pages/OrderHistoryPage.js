// src/pages/OrderHistoryPage.js

import React, { useState, useEffect } from 'react';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch order history from an API or context
    setOrders([
      { id: 1, totalAmount: 199.99, status: 'completed' },
      { id: 2, totalAmount: 89.99, status: 'pending' },
    ]);
  }, []);

  return (
    <div className="container">
      <h1>Your Order History</h1>
      <ul className="list-group">
        {orders.map(order => (
          <li className="list-group-item" key={order.id}>
            <h5>Order #{order.id}</h5>
            <p>Total: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistoryPage;
