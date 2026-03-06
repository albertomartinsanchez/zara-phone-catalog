import { useState, useEffect } from 'react'
import { getPhone } from '../api/phones'

export function usePhone(id) {
  const [phone, setPhone] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getPhone(id)
      .then(setPhone)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])

  return { phone, loading, error }
}
