const FormRowSelect = ({
  labelText,
  name,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
        disabled={disabled}
      >
        <option value="">Select {labelText}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value} display={option.display}>
            {option.display ? option.display : option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
