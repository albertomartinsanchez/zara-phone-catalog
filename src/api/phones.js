const BASE_URL = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'
const API_KEY = '87909682e6cd74208f41a6ef39fe4191'

const headers = {
  'x-api-key': API_KEY,
}

export async function getPhones({ search = '', limit = 20, offset = 0 } = {}) {
  const params = new URLSearchParams({ limit, offset })
  if (search) params.set('search', search)

  const res = await fetch(`${BASE_URL}/products?${params}`, { headers })
  if (!res.ok) throw new Error('Failed to fetch phones')
  return res.json()
}

export async function getPhone(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, { headers })
  if (!res.ok) throw new Error('Failed to fetch phone')
  return res.json()
}
