import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ColorSelector from './ColorSelector'

const options = [
  { name: 'Black', hexCode: '#000000', imageUrl: 'http://example.com/black.jpg' },
  { name: 'White', hexCode: '#FFFFFF', imageUrl: 'http://example.com/white.jpg' },
]

describe('ColorSelector', () => {
  it('renders all color options', () => {
    render(<ColorSelector options={options} selected={null} onChange={() => {}} />)
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('calls onChange with the selected option', () => {
    const onChange = vi.fn()
    render(<ColorSelector options={options} selected={null} onChange={onChange} />)
    fireEvent.click(screen.getByRole('radio', { name: 'Black' }))
    expect(onChange).toHaveBeenCalledWith(options[0])
  })

  it('marks the selected color as checked', () => {
    render(<ColorSelector options={options} selected={options[0]} onChange={() => {}} />)
    expect(screen.getByRole('radio', { name: 'Black' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'White' })).toHaveAttribute('aria-checked', 'false')
  })

  it('shows the selected color name in the label', () => {
    render(<ColorSelector options={options} selected={options[1]} onChange={() => {}} />)
    expect(screen.getByText('White')).toBeInTheDocument()
  })

  it('shows fallback text when no color is selected', () => {
    render(<ColorSelector options={options} selected={null} onChange={() => {}} />)
    expect(screen.getByText('Select a color')).toBeInTheDocument()
  })
})
