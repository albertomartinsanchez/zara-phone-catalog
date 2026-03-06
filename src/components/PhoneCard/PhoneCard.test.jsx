import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import PhoneCard from './PhoneCard'

const phone = {
  id: 'TEST-1',
  brand: 'Samsung',
  name: 'Galaxy Test',
  basePrice: 999,
  imageUrl: 'http://example.com/phone.jpg',
}

function renderCard() {
  return render(
    <MemoryRouter>
      <PhoneCard {...phone} />
    </MemoryRouter>
  )
}

describe('PhoneCard', () => {
  it('renders brand, name and price', () => {
    renderCard()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText('Galaxy Test')).toBeInTheDocument()
    expect(screen.getByText('999 EUR')).toBeInTheDocument()
  })

  it('renders the phone image with alt text', () => {
    renderCard()
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'http://example.com/phone.jpg')
    expect(img).toHaveAttribute('alt', 'Samsung Galaxy Test')
  })

  it('links to the phone detail page', () => {
    renderCard()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/phone/TEST-1')
  })
})
