import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from '../../components/CartItem/CartItem'

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
      <ul className="cart__list">
        {cart.map((item) => (
          <CartItem key={item.cartId} item={item} onRemove={removeItem} />
        ))}
      </ul>

      <div className="cart__footer">
        <p className="cart__total">
          Total: <strong>{total} EUR</strong>
        </p>
        <Link to="/" className="cart__continue">
          Continue shopping
        </Link>
      </div>
    </div>
  )
}
