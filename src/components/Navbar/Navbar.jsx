import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { cart } = useCart()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo" aria-label="Go to home">
        Zara
      </Link>
      <Link to="/cart" className="navbar__cart" aria-label={`Cart, ${cart.length} items`}>
        <svg
          className="navbar__cart-icon"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 1h2.5l1.6 8h9l2-6H5"
            stroke="#000"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7.5" cy="15.5" r="1" fill="#000" />
          <circle cx="13.5" cy="15.5" r="1" fill="#000" />
        </svg>
        {cart.length > 0 && (
          <span className="navbar__cart-count" aria-hidden="true">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  )
}
