const DateRangePicker = ({ value, onChange }) => (
  <div className="date-range">
    <label>
      <span>From</span>
      <input
        type="date"
        value={value.startDate || ''}
        onChange={(e) => onChange({ ...value, startDate: e.target.value })}
      />
    </label>
    <label>
      <span>To</span>
      <input
        type="date"
        value={value.endDate || ''}
        onChange={(e) => onChange({ ...value, endDate: e.target.value })}
      />
    </label>
  </div>
);

export default DateRangePicker;


