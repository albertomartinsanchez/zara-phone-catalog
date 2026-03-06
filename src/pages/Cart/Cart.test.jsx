import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import Cart from './Cart'

const item1 = {
  cartId: 'phone-1-128GB-Black',
  id: 'phone-1',
  name: 'Galaxy S24',
  brand: 'Samsung',
  imageUrl: 'http://example.com/s24.jpg',
  color: 'Black',
  storage: '128 GB',
  price: 999,
}

const item2 = {
  cartId: 'phone-2-256GB-Silver',
  id: 'phone-2',
  name: 'iPhone 15',
  brand: 'Apple',
  imageUrl: 'http://example.com/iphone.jpg',
  color: 'Silver',
  storage: '256 GB',
  price: 1199,
}

function renderCart(initialCart = []) {
  localStorage.setItem('cart', JSON.stringify(initialCart))
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Cart', () => {
  beforeEach(() => localStorage.clear())

  it('shows empty state when cart is empty', () => {
    renderCart()
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Continue shopping' })).toBeInTheDocument()
  })

  it('renders all items in the cart', () => {
    renderCart([item1, item2])
    expect(screen.getByText('Galaxy S24')).toBeInTheDocument()
    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
  })

  it('shows the correct total price', () => {
    renderCart([item1, item2])
    expect(screen.getByText('2198 EUR')).toBeInTheDocument()
  })

  it('removes an item when the remove button is clicked', () => {
    renderCart([item1, item2])
    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24/i }))
    expect(screen.queryByText('Galaxy S24')).not.toBeInTheDocument()
    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
  })

  it('shows empty state after removing the last item', () => {
    renderCart([item1])
    fireEvent.click(screen.getByRole('button', { name: /remove galaxy s24/i }))
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })

  it('has a continue shopping link pointing to home', () => {
    renderCart()
    expect(screen.getByRole('link', { name: 'Continue shopping' })).toHaveAttribute('href', '/')
  })
})
