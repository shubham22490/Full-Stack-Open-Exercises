const Filter = ({filterLabel, handlechangeFilter}) =>
  <div>
    filter shown with: <input value={filterLabel} onChange={handlechangeFilter} />
  </div>

export default Filter