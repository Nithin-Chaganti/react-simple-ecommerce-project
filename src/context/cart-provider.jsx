import { useEffect, useRef, useState } from "react";
import CartContext from "./cart-context.jsx";

const CART_STORAGE_KEY = 'cartItems'

function readStoredItems() {
    try {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        return storedCart ? JSON.parse(storedCart) : []
    } catch {
        return []
    }
}

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(readStoredItems)
    const [toastMessage, setToastMessage] = useState('')
    const toastTimerRef = useRef(null)

    function showToast(message) {
        setToastMessage(message)
        window.clearTimeout(toastTimerRef.current)
        toastTimerRef.current = window.setTimeout(() => {
            setToastMessage('')
        }, 2200)
    }

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
        } catch {
            // Ignore storage failures so cart interactions still work in memory.
        }
    }, [cartItems])

    useEffect(() => () => window.clearTimeout(toastTimerRef.current), [])

    function addToCart(product) {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id)

            if (existingItem) {
                showToast(`${product.name} is already in cart. Quantity updated.`)
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }

            showToast(`${product.name} added to cart successfully.`)
            return [...currentItems, { ...product, quantity: 1 }]
        })
    }

    function removeFromCart(productId) {
        setCartItems((currentItems) => {
            const itemToRemove = currentItems.find((item) => item.id === productId)

            if (itemToRemove) {
                showToast(`${itemToRemove.name} removed from cart.`)
            }

            return currentItems.filter((item) => item.id !== productId)
        })
    }

    function incrementQuantity(productId) {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        )
    }

    function decrementQuantity(productId) {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    function clearCart() {
        if (cartItems.length > 0) {
            showToast('Cart cleared successfully.')
        }
        setCartItems([])
    }

    function isInCart(productId) {
        return cartItems.some((item) => item.id === productId)
    }

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                cartTotal,
                toastMessage,
                isInCart,
                addToCart,
                removeFromCart,
                incrementQuantity,
                decrementQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}