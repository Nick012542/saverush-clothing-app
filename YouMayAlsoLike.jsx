import { Link } from "react-router-dom";
import productsData from "../data/products.json";
import "../styles/youMayAlsoLike.css";

const YouMayAlsoLike = ({ currentProductId }) => {
  const suggestions = productsData.products
    .filter((p) => p.productId !== currentProductId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <div className="you-may-also-like">
      <h3>You May Also Like</h3>
      <div className="suggestion-grid">
        {suggestions.map((product) => (
          <Link
            to={`/product/${product.productId}`}
            key={product.productId}
            className="suggestion-card"
          >
            <div className="suggestion-image">
              <img src={`/${product.images?.[0]}`} alt={product.name} />
            </div>

            <div className="suggestion-info">
              <h4 className="hover:text-purple-700 ">{product.name}</h4>
              <p className="price">₹{product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
