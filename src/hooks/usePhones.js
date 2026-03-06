import { useState, useEffect } from 'react'
import { getPhones } from '../api/phones'
import { useDebounce } from './useDebounce'

export function usePhones(search) {
  const [phones, setPhones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getPhones({ search: debouncedSearch, limit: 20 })
      .then(setPhones)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [debouncedSearch])

  return { phones, loading, error }
}
