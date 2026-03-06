import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { CartProvider, useCart } from './CartContext'

function TestConsumer() {
  const { cart, addItem, removeItem } = useCart()
  return (
    <div>
      <span data-testid="count">{cart.length}</span>
      <button onClick={() => addItem({ cartId: 'phone-1', name: 'Phone A', price: 999 })}>
        Add A
      </button>
      <button onClick={() => addItem({ cartId: 'phone-1', name: 'Phone A', price: 999 })}>
        Add A again
      </button>
      <button onClick={() => removeItem('phone-1')}>Remove A</button>
    </div>
  )
}

function renderCart() {
  return render(
    <CartProvider>
      <TestConsumer />
    </CartProvider>
  )
}

describe('CartContext', () => {
  beforeEach(() => localStorage.clear())

  it('starts empty', () => {
    renderCart()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('adds an item', () => {
    renderCart()
    fireEvent.click(screen.getByText('Add A'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('does not add duplicate cartIds', () => {
    renderCart()
    fireEvent.click(screen.getByText('Add A'))
    fireEvent.click(screen.getByText('Add A again'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('removes an item', () => {
    renderCart()
    fireEvent.click(screen.getByText('Add A'))
    fireEvent.click(screen.getByText('Remove A'))
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('persists cart to localStorage', () => {
    renderCart()
    fireEvent.click(screen.getByText('Add A'))
    const stored = JSON.parse(localStorage.getItem('cart'))
    expect(stored).toHaveLength(1)
    expect(stored[0].cartId).toBe('phone-1')
  })

  it('loads cart from localStorage on init', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ cartId: 'saved-1', name: 'Saved Phone', price: 500 }])
    )
    renderCart()
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })
})
