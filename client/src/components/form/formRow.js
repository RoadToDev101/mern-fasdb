const FormRow = ({
  type,
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  autoComplete,
  labelText,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input"
        placeholder={placeholder}
        label={label}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default FormRow;
