import './StorageSelector.css'

export default function StorageSelector({ options, selected, onChange }) {
  return (
    <div className="storage-selector">
      <p className="storage-selector__label">
        Storage: <span>{selected?.capacity ?? 'Select storage'}</span>
      </p>
      <div className="storage-selector__options" role="radiogroup" aria-label="Select storage">
        {options.map((option) => (
          <button
            key={option.capacity}
            type="button"
            role="radio"
            aria-checked={selected?.capacity === option.capacity}
            className={`storage-selector__option ${selected?.capacity === option.capacity ? 'storage-selector__option--active' : ''}`}
            onClick={() => onChange(option)}
          >
            {option.capacity}
          </button>
        ))}
      </div>
    </div>
  )
}
