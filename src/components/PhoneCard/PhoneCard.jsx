import { Link } from 'react-router-dom'

export default function PhoneCard({ id, brand, name, basePrice, imageUrl }) {
  return (
    <Link to={`/phone/${id}`} className="phone-card">
      <article>
        <img src={imageUrl} alt={`${brand} ${name}`} />
        <div className="phone-card__info">
          <span className="phone-card__brand">{brand}</span>
          <span className="phone-card__name">{name}</span>
          <span className="phone-card__price">{basePrice} EUR</span>
        </div>
      </article>
    </Link>
  )
}
