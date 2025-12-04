const SelectField = ({ label, name, register, options = [], errors, ...rest }) => (
  <label className="form-field">
    <span>{label}</span>
    <select {...register(name)} {...rest}>
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
    {errors?.[name] && <small>{errors[name].message}</small>}
  </label>
);

export default SelectField;


