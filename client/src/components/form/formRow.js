const FormRow = ({
  type,
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  autoComplete,
}) => {
  return (
    <div className="form-control form-row">
      <label className="form-label" htmlFor={id}>
        {label}
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
