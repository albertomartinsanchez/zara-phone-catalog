import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePhone } from '../../hooks/usePhone'
import { useCart } from '../../context/CartContext'
import ColorSelector from '../../components/ColorSelector/ColorSelector'
import StorageSelector from '../../components/StorageSelector/StorageSelector'
import SpecsTable from '../../components/SpecsTable/SpecsTable'
import PhoneCard from '../../components/PhoneCard/PhoneCard'
import './PhoneDetail.css'

export default function PhoneDetail() {
  const { id } = useParams()
  const { phone, loading, error } = usePhone(id)
  const { addItem } = useCart()

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedStorage, setSelectedStorage] = useState(null)

  useEffect(() => {
    setSelectedColor(null)
    setSelectedStorage(null)
  }, [id])

  if (loading) return <p className="detail__status">Loading...</p>
  if (error) return <p className="detail__status detail__status--error">Phone not found.</p>
  if (!phone) return null

  const currentPrice = selectedStorage?.price ?? phone.basePrice
  const canAddToCart = selectedColor !== null && selectedStorage !== null
  const currentImage = selectedColor?.imageUrl ?? phone.colorOptions[0]?.imageUrl

  function handleAddToCart() {
    addItem({
      cartId: `${phone.id}-${selectedStorage.capacity}-${selectedColor.name}`,
      id: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: currentImage,
      color: selectedColor.name,
      storage: selectedStorage.capacity,
      price: currentPrice,
    })
  }

  return (
    <>
      <Link to="/" className="detail__back">
        ← Back
      </Link>

      <div className="detail">
        <section className="detail__main">
          <img
            className="detail__image"
            src={currentImage}
            alt={`${phone.brand} ${phone.name} in ${selectedColor?.name ?? 'default color'}`}
          />

          <div className="detail__info">
            <div className="detail__title-group">
              <p className="detail__brand">{phone.brand}</p>
              <h1 className="detail__name">{phone.name}</h1>
              <p className="detail__price">{currentPrice} EUR</p>
            </div>

            <div className="detail__selectors">
              <StorageSelector
                options={phone.storageOptions}
                selected={selectedStorage}
                onChange={setSelectedStorage}
              />
              <ColorSelector
                options={phone.colorOptions}
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </div>

            <button
              className="detail__add-to-cart"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              aria-label={
                canAddToCart
                  ? `Add ${phone.name} to cart`
                  : 'Select color and storage to add to cart'
              }
            >
              Add to cart
            </button>
          </div>
        </section>

        <section className="detail__specs">
          <SpecsTable specs={phone.specs} />
        </section>

        {phone.similarProducts?.length > 0 && (
          <section className="detail__similar">
            <h2>Similar items</h2>
            <ul className="detail__similar-carousel">
              {phone.similarProducts.map((p) => (
                <li key={p.id}>
                  <PhoneCard {...p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  )
}
