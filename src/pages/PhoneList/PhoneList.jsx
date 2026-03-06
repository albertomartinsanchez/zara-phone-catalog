import { useState } from 'react'
import { usePhones } from '../../hooks/usePhones'
import PhoneCard from '../../components/PhoneCard/PhoneCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import './PhoneList.css'

export default function PhoneList() {
  const [search, setSearch] = useState('')
  const { phones, loading, error } = usePhones(search)

  return (
    <div className="phone-list">
      <SearchBar value={search} onChange={setSearch} resultCount={phones.length} />

      {loading && <p className="phone-list__status">Loading...</p>}
      {error && (
        <p className="phone-list__status phone-list__status--error">
          Something went wrong. Please try again.
        </p>
      )}

      {!loading && !error && (
        <ul className="phone-list__grid">
          {phones.map((phone) => (
            <li key={phone.id}>
              <PhoneCard {...phone} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
