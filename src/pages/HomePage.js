import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  // State to store products, search query, and filtered products
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState(''); // New state for price filter

  // Fetch products from the backend API
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')  // Replace with your backend URL
      .then(response => {
        setProducts(response.data);  // Store all products
        setFilteredProducts(response.data);  // Initially, show all products
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Filter products based on the search query, category, and price
  useEffect(() => {
    let result = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply category filter if set
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }

    // Apply price filter if set
    if (priceFilter) {
      switch (priceFilter) {
        case 'low':
          result = result.filter(product => product.price < 50);  // Price < 50
          break;
        case 'medium':
          result = result.filter(product => product.price >= 50 && product.price <= 150);  // Price between 50 and 150
          break;
        case 'high':
          result = result.filter(product => product.price > 150);  // Price > 150
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);  // Update filtered products
  }, [searchQuery, categoryFilter, priceFilter, products]);

  return (
    <div>
      <h1>Product Listings</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      />

      {/* Category Filter */}
      <select
        onChange={(e) => setCategoryFilter(e.target.value)}
        value={categoryFilter}
      >
        <option value="">Filter by Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Accessories">Accessories</option>
        {/* Add more categories as necessary */}
      </select>

      {/* Price Filter */}
      <select
        onChange={(e) => setPriceFilter(e.target.value)}
        value={priceFilter}
      >
        <option value="">Filter by Price</option>
        <option value="low">Under $50</option>
        <option value="medium">$50 - $150</option>
        <option value="high">Over $150</option>
      </select>

      {/* Display filtered products */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
