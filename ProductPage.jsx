import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import "../styles/productPage.css";
import Header from "../components/Header";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";
import Footer from "../components/Footer";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState();

  const { addToCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = "auto";
    const found = productsData.products.find(
      (p) =>
        p.productId?.toString() === productId || p.id?.toString() === productId
    );
    if (found) {
      setProduct(found);
      setSelectedImage(found.images?.[0]);
    }
  }, [productId]);

  if (!product) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowToast(true);
      setMessage("Please select a size.");
      setColor("#3B82F6");
    } else {
      addToCart(product, selectedSize, quantity);
      setShowToast(true);
      setMessage("Item added to the Cart!");
      setColor("#10B981");
    }

    setTimeout(() => {
      setShowToast(false);
      setMessage("");
      setColor("");
    }, 2000);
  };

  return (
    <div>
      {/* To show the pop up */}
      <Toast show={showToast} message={message} color={color} />
      {/* Product Details */}
      <div className="modal-body">
        {/* Product images */}
        <div className="product-image-gallery">
          <div className="thumbnails overflow-x-scroll scrollbar-hide ">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`/${img}`}
                alt={`Thumbnail ${index}`}
                onMouseEnter={() => setSelectedImage(img)}
                onClick={() => setSelectedImage(img)}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={`/${selectedImage}`} alt={product.name} />
          </div>
        </div>
            
            {/* Product details */}
        <div className="product-details">
          <h2 className="font-medium">{product.name}</h2>
          <p className="price">₹{product.price.toLocaleString()}</p>
            
          {!product.inStock && <div className="sold-out">Sold Out</div>}

          <div className="size-selector">
            <label>Size:</label>
            <div className="size-options">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="text-gray-500">{quantity}</span>
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
          </div>

          <div className="tab-buttons  ">
            <button
              className={`tab-btn ${
                activeTab === "description" ? "active" : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
          </div>

          <div className="tab-content h-40 overflow-y-scroll scrollbar-hide">
            {activeTab === "description" ? (
              <p className="description">{product.description}</p>
            ) : (
              <div className="details ">
                <h5 className="subtitle">{product.subtitle}</h5>

                <div className="product-meta-row">
                  <h6>Color:</h6>
                  <span>{product.color}</span>
                </div>

                <div className="product-meta-row">
                  <h6>Material:</h6>
                  <span>{product.material}</span>
                </div>

                <div className="product-meta-row">
                  <h6>Styling Tip:</h6>
                  <span>{product.stylingTip}</span>
                </div>

                <div className="product-meta-row">
                  <h6>Care:</h6>
                  <span>{product.care}</span>
                </div>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button
              className={`add-to-cart-btn ${
                !product.inStock ? "sold-out-btn " : ""
              }`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Sold Out"}
            </button>

            <button
              className={`buy-now-btn ${!product.inStock ? "sold-out-btn " : ""}`}
              disabled={!product.inStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* May also like section */}
      <div className="likeProducts">
        <YouMayAlsoLike currentProductId={product.productId} />
      </div>
    </div>
  );
};

export default ProductPage;
