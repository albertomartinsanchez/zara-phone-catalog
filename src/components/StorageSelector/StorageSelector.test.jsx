import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import StorageSelector from './StorageSelector'

const options = [
  { capacity: '128 GB', price: 999 },
  { capacity: '256 GB', price: 1099 },
]

describe('StorageSelector', () => {
  it('renders all storage options', () => {
    render(<StorageSelector options={options} selected={null} onChange={() => {}} />)
    expect(screen.getAllByRole('radio')).toHaveLength(2)
    expect(screen.getByText('128 GB')).toBeInTheDocument()
    expect(screen.getByText('256 GB')).toBeInTheDocument()
  })

  it('calls onChange with the selected option', () => {
    const onChange = vi.fn()
    render(<StorageSelector options={options} selected={null} onChange={onChange} />)
    fireEvent.click(screen.getByRole('radio', { name: '256 GB' }))
    expect(onChange).toHaveBeenCalledWith(options[1])
  })

  it('marks the selected option as checked', () => {
    render(<StorageSelector options={options} selected={options[0]} onChange={() => {}} />)
    expect(screen.getByRole('radio', { name: '128 GB' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: '256 GB' })).toHaveAttribute('aria-checked', 'false')
  })

  it('shows fallback text when no storage is selected', () => {
    render(<StorageSelector options={options} selected={null} onChange={() => {}} />)
    expect(screen.getByText('Select storage')).toBeInTheDocument()
  })
})
