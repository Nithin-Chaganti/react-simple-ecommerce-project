import { useContext } from "react"
import CartContext from "../context/cart-context.jsx"

const Checkout = () => {
  const {
    cartItems,
    cartTotal,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext)

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="order-success">
            <h2 className="order-success-title">Your cart is empty</h2>
            <p className="order-success-message">Add products to your cart to see them here.</p>
          </div>
        ) : (
          <div className="checkout-container">
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img className="checkout-item-image" src={item.image} alt={item.name} />
                  <div className="checkout-item-details">
                    <h2 className="checkout-item-name">{item.name}</h2>
                    <p className="checkout-item-price">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="checkout-item-controls">
                    <div className="quantity-controls">
                      <button className="quantity-btn" type="button" onClick={() => decrementQuantity(item.id)}>-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-btn" type="button" onClick={() => incrementQuantity(item.id)}>+</button>
                    </div>
                    <p className="checkout-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                    <button className="btn btn-secondary btn-small" type="button" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary">
              <div className="checkout-total">
                <span className="checkout-total-label">Total</span>
                <span className="checkout-total-value checkout-total-final">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary btn-block" type="button" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout