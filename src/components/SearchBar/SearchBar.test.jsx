import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar value="" onChange={() => {}} resultCount={0} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} resultCount={0} />)
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Samsung' } })
    expect(onChange).toHaveBeenCalledWith('Samsung')
  })

  it('displays the result count', () => {
    render(<SearchBar value="" onChange={() => {}} resultCount={5} />)
    expect(screen.getByText('5 results')).toBeInTheDocument()
  })

  it('uses singular "result" for 1 result', () => {
    render(<SearchBar value="" onChange={() => {}} resultCount={1} />)
    expect(screen.getByText('1 result')).toBeInTheDocument()
  })
})
