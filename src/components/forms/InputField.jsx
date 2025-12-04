const InputField = ({ label, name, type = 'text', register, errors, ...rest }) => (
  <label className="form-field">
    <span>{label}</span>
    <input type={type} {...register(name)} {...rest} />
    {errors?.[name] && <small>{errors[name].message}</small>}
  </label>
);

export default InputField;


