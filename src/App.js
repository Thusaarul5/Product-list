import React, { useState, useEffect } from "react";
import productsData from "./read.json";
import "./style.css"; // Import CSS file

function ProductSlider() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initially display 8 products
    setDisplayedProducts(productsData.slice(0, 8));
    setLoading(true); // Start loading more products initially
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming each product has 3 photos
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loading && displayedProducts.length < productsData.length) {
      // Simulate loading delay
      const timer = setTimeout(() => {
        // Load additional 4 products
        const nextBatch = productsData.slice(
          displayedProducts.length,
          displayedProducts.length + 4
        );
        setDisplayedProducts((prevProducts) => [...prevProducts, ...nextBatch]);
        setLoading(false);
      }, 4000); // Adjust the delay time as needed
      return () => clearTimeout(timer);
    }
  }, [loading, displayedProducts]);

  useEffect(() => {
    if (!loading && displayedProducts.length >= 8) {
      // Automatically load more products after the first 8 products have been loaded
      setLoading(true);
    }
  }, [loading, displayedProducts]);

  return (
    <>
      <div>
        <h1>Product List</h1>
      </div>
      <div className="product-slider">
        <div className="products-container">
          {displayedProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <img
                src={product.photos[currentPhotoIndex]}
                alt={`Product ${product.name}`}
                className="product-image"
              />
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      {loading && displayedProducts.length >= 8 && (
        <div className="loading-animation">
          <div>Loading...</div>
        </div>
      )}
    </>
  );
}

export default ProductSlider;
