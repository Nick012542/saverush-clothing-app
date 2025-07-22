import React, { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import HeroSlider from "../components/HeroSlider";
import Footer from "../components/Footer";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(productsData.products);
  }, []);

  const quickAdd = (product) => {
    addToCart(product, "M", 1);
  };

  return (
    <div>
      
      <div className="homepage">
        <HeroSlider/>
        
        {/* Quick Actions */}
        <section className="quick-actions">
          <div className="container">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <div className="action-card">
                <i className="fas fa-tshirt" />
                <span>T-Shirts</span>
              </div>
              <div className="action-card">
                <i className="fas fa-female" />
                <span>Dresses</span>
              </div>
              <div className="action-card">
                <i className="fas fa-male" />
                <span>Jeans</span>
              </div>
              <div className="action-card">
                <i className="fas fa-heart" />
                <span>Wishlist</span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Cards*/}
        <section className="featured-products">
          <div className="container">
            <h3>Featured Products</h3>

            <div className="products-grid">
              {products.map((product, index) => (
                <div
                  className="product-card"
                  key={product.productId}
                >
                  <div className="product-image-homegae">
                    {!product.inStock && (
                      <div className="sold-out-tag">
                        SOLD OUT
                      </div>
                    )}
                    <Link to={`/product/${product.productId || product.id}`}>
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="cursor-pointer main-image"
                      />
                      {/* Hover image for slide effect */}
                      {product.images?.[1] && (
                        <img
                          src={product.images[1]}
                          alt={`${product.name} - alternate view`}
                          className="cursor-pointer hover-image"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-price">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <button
                      className={`quick-add-btn ${!product.inStock ? 'disabled' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.inStock) {
                          quickAdd(product);
                        }
                      }}
                      disabled={!product.inStock}
                    >
                      {!product.inStock ? 'Sold Out' : 'Quick Add'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default HomePage;
