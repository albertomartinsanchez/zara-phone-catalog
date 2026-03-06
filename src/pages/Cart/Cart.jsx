import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from '../../components/CartItem/CartItem'
import './Cart.css'

export default function Cart() {
  const { cart, removeItem } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  if (cart.length === 0) {
    return (
      <div className="cart cart--empty">
        <p>Your cart is empty.</p>
        <Link to="/" className="cart__continue">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <h1 className="cart__title">Cart ({cart.length})</h1>

      <ul className="cart__list">
        {cart.map((item) => (
          <CartItem key={item.cartId} item={item} onRemove={removeItem} />
        ))}
      </ul>

      <div className="cart__footer">
        <Link to="/" className="cart__continue">
          Continue shopping
        </Link>
        <div className="cart__total-group">
          <span className="cart__total-label">Total</span>
          <span className="cart__total-amount">{total} EUR</span>
        </div>
      </div>
    </div>
  )
}
