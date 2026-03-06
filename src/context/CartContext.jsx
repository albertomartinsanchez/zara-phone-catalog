import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.find((item) => item.cartId === action.payload.cartId)
      if (exists) return state
      return [...state, action.payload]
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.cartId !== action.payload)
    default:
      return state
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addItem(item) {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  function removeItem(cartId) {
    dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  }

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
