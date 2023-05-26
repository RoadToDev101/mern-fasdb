import { useState } from "react";

const FormRowMultiSelectCheckbox = ({
  labelText,
  name,
  value,
  onChange,
  options,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(value) ? value : []
  );

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    let newSelectedValues = [];
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter((v) => v !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }
    setSelectedValues(newSelectedValues);
    onChange({ target: { name, value: newSelectedValues } });
  };

  //TODO: Check this function, it's currently refresh the page
  const handleEraseAll = () => {
    setSelectedValues([]);
    onChange({ target: { name, value: [] } });
  };

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <div className="dropdown-container">
        <div className={`dropdown ${isOpen ? "open" : ""}`}>
          <div className="dropdown-toggle" onClick={handleDropdownToggle}>
            {selectedValues.length > 0 ? (
              <span>{selectedValues.length} selected</span>
            ) : (
              <span>Select options</span>
            )}
            <i className="arrow-icon"></i>
          </div>
          {isOpen && (
            <div className="dropdown-menu">
              <button className="erase-all-btn" onClick={handleEraseAll}>
                Erase All
              </button>
              {options.map((option, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name={name}
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                    onChange={handleCheckboxChange}
                    disabled={disabled}
                  />
                  {option.display ? option.display : option.value}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <input
        type="hidden"
        name={name}
        value={Array.isArray(selectedValues) ? selectedValues.join(",") : ""}
      />
    </div>
  );
};

export default FormRowMultiSelectCheckbox;
