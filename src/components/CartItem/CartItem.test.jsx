import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CartItem from './CartItem'

const item = {
  cartId: 'phone-1-128GB-Black',
  id: 'phone-1',
  name: 'Galaxy S24',
  brand: 'Samsung',
  imageUrl: 'http://example.com/phone.jpg',
  color: 'Black',
  storage: '128 GB',
  price: 999,
}

describe('CartItem', () => {
  it('renders name, brand, specs and price', () => {
    render(<CartItem item={item} onRemove={() => {}} />)
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText('128 GB · Black')).toBeInTheDocument()
    expect(screen.getByText('999 EUR')).toBeInTheDocument()
  })

  it('renders the phone image with alt text', () => {
    render(<CartItem item={item} onRemove={() => {}} />)
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Samsung Galaxy S24')
  })

  it('calls onRemove with the cartId when remove is clicked', () => {
    const onRemove = vi.fn()
    render(<CartItem item={item} onRemove={onRemove} />)
    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24/i }))
    expect(onRemove).toHaveBeenCalledWith('phone-1-128GB-Black')
  })
})
