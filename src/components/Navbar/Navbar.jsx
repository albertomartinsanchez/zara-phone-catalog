import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__home" aria-label="Go to home">
        ⌂
      </Link>
      <Link to="/cart" className="navbar__cart" aria-label={`Cart, ${cart.length} items`}>
        ⊞
        {cart.length > 0 && (
          <span className="navbar__cart-count" aria-hidden="true">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  )
}
