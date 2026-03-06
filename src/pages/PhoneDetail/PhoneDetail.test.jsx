import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import PhoneDetail from './PhoneDetail'
import * as phonesApi from '../../api/phones'

vi.mock('../../api/phones')

const SPECS = {
  screen: '6.1"',
  resolution: '1080x2400',
  processor: 'Test CPU',
  mainCamera: '12MP',
  selfieCamera: '10MP',
  battery: '4000mAh',
  os: 'Android 14',
  screenRefreshRate: '120Hz',
}

const phone1 = {
  id: 'phone-1',
  brand: 'Samsung',
  name: 'Galaxy Phone 1',
  description: 'Test phone',
  basePrice: 999,
  rating: 4.5,
  specs: SPECS,
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: 'http://example.com/phone1-black.jpg' },
    { name: 'White', hexCode: '#FFFFFF', imageUrl: 'http://example.com/phone1-white.jpg' },
  ],
  storageOptions: [
    { capacity: '128 GB', price: 999 },
    { capacity: '256 GB', price: 1099 },
  ],
  similarProducts: [
    {
      id: 'phone-2',
      brand: 'Apple',
      name: 'iPhone Test',
      basePrice: 899,
      imageUrl: 'http://example.com/phone2.jpg',
    },
  ],
}

const phone2 = {
  id: 'phone-2',
  brand: 'Apple',
  name: 'iPhone Test',
  description: 'Test phone 2',
  basePrice: 899,
  rating: 4.8,
  specs: SPECS,
  colorOptions: [
    { name: 'Silver', hexCode: '#C0C0C0', imageUrl: 'http://example.com/phone2-silver.jpg' },
  ],
  storageOptions: [{ capacity: '128 GB', price: 899 }],
  similarProducts: [],
}

function renderDetail(initialPath = '/phone/phone-1') {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/phone/:id" element={<PhoneDetail />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  )
}

describe('PhoneDetail', () => {
  beforeEach(() => {
    localStorage.clear()
    phonesApi.getPhone.mockImplementation((id) =>
      Promise.resolve(id === 'phone-1' ? phone1 : phone2)
    )
  })

  it('renders phone name and brand', async () => {
    renderDetail()
    await screen.findByText('Galaxy Phone 1')
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })

  it('shows the first color image by default', async () => {
    renderDetail()
    await screen.findByText('Galaxy Phone 1')
    expect(screen.getByRole('img', { name: /galaxy phone 1/i })).toHaveAttribute(
      'src',
      'http://example.com/phone1-black.jpg'
    )
  })

  it('updates image when a color is selected', async () => {
    renderDetail()
    await screen.findByText('Galaxy Phone 1')
    fireEvent.click(screen.getByRole('radio', { name: 'White' }))
    expect(screen.getByRole('img', { name: /galaxy phone 1/i })).toHaveAttribute(
      'src',
      'http://example.com/phone1-white.jpg'
    )
  })

  it('updates price when a storage option is selected', async () => {
    renderDetail()
    await screen.findByText('Galaxy Phone 1')
    expect(screen.getByText('999 EUR')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('radio', { name: '256 GB' }))
    expect(screen.getByText('1099 EUR')).toBeInTheDocument()
  })

  it('disables Add to cart until both color and storage are selected', async () => {
    renderDetail()
    await screen.findByText('Galaxy Phone 1')
    const button = screen.getByRole('button', { name: /add to cart/i })
    expect(button).toBeDisabled()
    fireEvent.click(screen.getByRole('radio', { name: 'Black' }))
    expect(button).toBeDisabled()
    fireEvent.click(screen.getByRole('radio', { name: '128 GB' }))
    expect(button).not.toBeDisabled()
  })

  it('resets color when navigating to a similar product', async () => {
    renderDetail()
    await screen.findByText('Galaxy Phone 1')

    // Select a non-default color on phone 1
    fireEvent.click(screen.getByRole('radio', { name: 'White' }))
    expect(screen.getByRole('img', { name: /galaxy phone 1/i })).toHaveAttribute(
      'src',
      'http://example.com/phone1-white.jpg'
    )

    // Navigate to the similar product
    fireEvent.click(screen.getByRole('link', { name: /iphone test/i }))

    // Wait for phone 2 to load
    await screen.findByText('iPhone Test')

    // Image must be phone 2's default — NOT phone 1's white image
    expect(screen.getByRole('img', { name: /iphone test/i })).toHaveAttribute(
      'src',
      'http://example.com/phone2-silver.jpg'
    )
  })
})
