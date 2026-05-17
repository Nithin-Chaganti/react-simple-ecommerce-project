import ProductCard from "../Components/ProductCard"
import { getProducts } from "../data/products"




const Home = () => {
    const products=getProducts()
    return (
        <div className="page">
          <div className='home-hero'>
            <h1 className="home-title">Welcome to ShopX</h1>
            <p className="home-subtitle">Discover the best products at the best prices</p>
          </div>
          <div className="container">
            <h2 className="page-title">Featured Products</h2>
            <div className="product-grid">
                { products.map((product)=>(
                    <ProductCard    key={product.id} product={product} />
                ))}
            </div>

          </div>
        </div>
    )
}

export default Home