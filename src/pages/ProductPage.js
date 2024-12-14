import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams(); // Get the product ID from the route
  const navigate = useNavigate(); // For redirecting to other pages
  const [product, setProduct] = useState(null); // Product details state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [quantity, setQuantity] = useState(1); // Quantity state

  // Fetch product details from the backend API
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Error fetching product details: ${error.message}`);
        setLoading(false);
      });
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value));
    setQuantity(value);
  };

  // Add product to the cart and save to localStorage
  const handleAddToCart = () => {
    if (quantity > product.stock) {
      alert('Quantity exceeds available stock!');
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = storedCart.findIndex((item) => item._id === product._id);

    if (existingItemIndex > -1) {
      // Update the quantity if the product is already in the cart
      storedCart[existingItemIndex].quantity += quantity;
      if (storedCart[existingItemIndex].quantity > product.stock) {
        alert('Quantity exceeds available stock!');
        storedCart[existingItemIndex].quantity = product.stock; // Adjust to max stock
      }
    } else {
      // Add new product to the cart
      storedCart.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(storedCart));
    alert(`${quantity} ${product.name}(s) added to the cart!`);
    navigate('/cart'); // Redirect to the cart page after adding
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Show error message if there's an issue fetching the product
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="product-page container mt-5">
      <h1>{product.name}</h1>
      <div className="product-details row mt-4">
        {/* Product Image */}
        <div className="product-image col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>

        {/* Product Information */}
        <div className="product-info ms-4 col-md-6">
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock} available
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <label htmlFor="quantity" className="form-label">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stock}
              className="form-control w-25"
            />
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className="btn btn-success">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
