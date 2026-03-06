const SPEC_LABELS = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  mainCamera: 'Main camera',
  selfieCamera: 'Selfie camera',
  battery: 'Battery',
  os: 'Operating system',
  screenRefreshRate: 'Refresh rate',
}

export default function SpecsTable({ specs }) {
  return (
    <table className="specs-table">
      <caption className="specs-table__caption">Technical specifications</caption>
      <tbody>
        {Object.entries(specs).map(([key, value]) => (
          <tr key={key} className="specs-table__row">
            <th className="specs-table__key" scope="row">
              {SPEC_LABELS[key] ?? key}
            </th>
            <td className="specs-table__value">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
