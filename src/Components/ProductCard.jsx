import { Link } from "react-router-dom"
import { useContext } from "react"
import CartContext from "../context/cart-context.jsx"

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useContext(CartContext)
  const productInCart = isInCart(product.id)

    return(
        <div className="product-card" key={product.id}>
                        <img src={product.image} className="product-card-image" alt={product.name} loading="lazy" />
                      <div className="product-content">
                        <h3 className="product-card-name">{product.name}</h3>
            {productInCart && <span className="product-in-cart-badge">In cart</span>}
                        <p className="product-card-price">${product.price.toFixed(2)}</p>
                        <div className="product-card-actions">
                            <Link  to={`/products/${product.id}`} className="btn btn-secondary">View Details</Link>
              <button type="button" className="btn btn-primary" onClick={() => addToCart(product)}>
                {productInCart ? 'Add Again' : 'Add to Cart'}
              </button>
                        </div>
                      </div>
                    </div>
    )
}