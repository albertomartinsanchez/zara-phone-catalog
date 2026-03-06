export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or brand..."
        aria-label="Search phones"
      />
      <p className="search-bar__count" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'result' : 'results'}
      </p>
    </div>
  )
}
