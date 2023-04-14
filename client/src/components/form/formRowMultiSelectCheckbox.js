import { useState } from "react";

const FormRowMultiSelectCheckbox = ({
  labelText,
  name,
  value,
  onChange,
  options,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    let newSelectedValues = [];
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter((v) => v !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }
    setSelectedValues(newSelectedValues);
    onChange({ target: { name, value: newSelectedValues } }); // Pass selectedValues as parameter
  };

  const checkboxOptions = options.map((option) => ({
    value: option.value,
    label: option.display || option.value,
  }));

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <div className="checkbox-options">
        {checkboxOptions.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={handleCheckboxChange}
            />
            {option.label}
          </label>
        ))}
      </div>
      <input type="hidden" name={name} value={selectedValues.join(",")} />
    </div>
  );
};

export default FormRowMultiSelectCheckbox;
