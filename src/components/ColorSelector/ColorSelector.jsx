import './ColorSelector.css'

export default function ColorSelector({ options, selected, onChange }) {
  return (
    <div className="color-selector">
      <p className="color-selector__label">
        Color: <span>{selected?.name ?? 'Select a color'}</span>
      </p>
      <div className="color-selector__options" role="radiogroup" aria-label="Select color">
        {options.map((option) => (
          <button
            key={option.name}
            type="button"
            role="radio"
            aria-checked={selected?.name === option.name}
            aria-label={option.name}
            className={`color-selector__swatch ${selected?.name === option.name ? 'color-selector__swatch--active' : ''}`}
            style={{ backgroundColor: option.hexCode }}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  )
}
