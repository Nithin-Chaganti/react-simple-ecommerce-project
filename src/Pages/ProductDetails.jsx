
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getProductById } from "../data/products.js"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import CartContext from "../context/cart-context.jsx"
const ProductDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const product = getProductById(id)
  const { addToCart, isInCart } = useContext(CartContext)
  const productInCart = product ? isInCart(product.id) : false

    useEffect(() => {
    if (!product) {
        alert('Product not found')
        navigate('/', { replace: true })
    }
}, [id, navigate, product])


if(!product){
  return <div className="page"><div className="container"><p>Loading...</p></div></div>
}



  return (
    <div className="page">
        <div className="container">
          <div className="product-detail">
            <div className="product-detail-image">
                <img src={product?.image} alt={product?.name} />
            </div>
            <div className="product-detail-content">
                <h1 className="product-detail-name">{product?.name}</h1>
                {productInCart && <span className="product-in-cart-badge product-in-cart-badge-detail">In cart</span>}
                <p className="product-detail-description">{product?.description}</p>
                <p className="product-detail-price">${product?.price.toFixed(2)}</p>
              <button className="btn btn-primary" onClick={() => addToCart(product)}>
                {productInCart ? 'Add Again' : 'Add to Cart'}
              </button>

            </div>
            </div>
        </div>
    </div>
    )
}

export default ProductDetails