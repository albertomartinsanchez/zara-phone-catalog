import './CartItem.css'

export default function CartItem({ item, onRemove }) {
  return (
    <li className="cart-item">
      <img className="cart-item__image" src={item.imageUrl} alt={`${item.brand} ${item.name}`} />
      <div className="cart-item__details">
        <div className="cart-item__info">
          <div className="cart-item__name-group">
            <span className="cart-item__brand">{item.brand}</span>
            <span className="cart-item__name">{item.name}</span>
          </div>
          <span className="cart-item__specs">
            {item.storage} · {item.color}
          </span>
          <span className="cart-item__price">{item.price} EUR</span>
        </div>
        <button
          className="cart-item__remove"
          onClick={() => onRemove(item.cartId)}
          aria-label={`Remove ${item.name} from cart`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}
