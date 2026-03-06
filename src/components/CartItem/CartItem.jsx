export default function CartItem({ item, onRemove }) {
  return (
    <li className="cart-item">
      <img className="cart-item__image" src={item.imageUrl} alt={`${item.brand} ${item.name}`} />
      <div className="cart-item__details">
        <p className="cart-item__name">{item.name}</p>
        <p className="cart-item__brand">{item.brand}</p>
        <p className="cart-item__specs">
          {item.storage} · {item.color}
        </p>
        <p className="cart-item__price">{item.price} EUR</p>
      </div>
      <button
        className="cart-item__remove"
        onClick={() => onRemove(item.cartId)}
        aria-label={`Remove ${item.name} from cart`}
      >
        ✕
      </button>
    </li>
  )
}
