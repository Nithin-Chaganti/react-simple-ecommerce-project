
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AuthProvider from './context/auth-provider.jsx'
import CartProvider from './context/cart-provider.jsx'
import './App.css'
import Home from './Pages/Home.jsx'
import Auth from './Pages/Auth.jsx'
import Checkout from './Pages/Checkout.jsx'
import Navbar from './Components/Navbar.jsx'
import ProductDetails from './Pages/ProductDetails.jsx'

function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth key={location.key} />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/products/:id' element={<ProductDetails />} />
        </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
