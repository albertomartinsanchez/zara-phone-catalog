import { Link } from 'react-router-dom'
import './PhoneCard.css'

export default function PhoneCard({ id, brand, name, basePrice, imageUrl }) {
  return (
    <Link to={`/phone/${id}`} className="phone-card">
      <img className="phone-card__image" src={imageUrl} alt={`${brand} ${name}`} />
      <div className="phone-card__info">
        <div className="phone-card__text">
          <span className="phone-card__brand">{brand}</span>
          <span className="phone-card__name">{name}</span>
        </div>
        <span className="phone-card__price">{basePrice} EUR</span>
      </div>
    </Link>
  )
}
