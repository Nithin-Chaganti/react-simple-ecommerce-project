
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home.jsx'
import Auth from './Pages/Auth.jsx'
import Checkout from './Pages/Checkout.jsx'
import Navbar from './Components/Navbar.jsx'

function App() {

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>

</div>
  )
}

export default App
