import { Link } from "react-router-dom"
export default function ProductCard({ product }) {
    return(
        <div className="product-card" key={product.id}>
                        <img src={product.image} className="product-card-image" alt={product.name} />
                      <div className="product-content">
                        <h3 className="product-card-name">{product.name}</h3>
                        <p className="product-card-price">${product.price.toFixed(2)}</p>
                        <div className="product-card-actions">
                            <Link  to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                      </div>
                    </div>
    )
}