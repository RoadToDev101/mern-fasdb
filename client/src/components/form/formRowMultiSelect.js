import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormRowMultiSelectCheckbox = ({
  labelText,
  name,
  value,
  onChange,
  options,
  disabled,
}) => {
  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(value) ? value : []
  );

  const handleCheckboxChange = (event, values) => {
    const newSelectedValues = values.map((value) => value.value);
    setSelectedValues(newSelectedValues);
    onChange({ target: { name, value: newSelectedValues } });
  };

  return (
    <div className="form-row">
      <Autocomplete
        multiple
        id={name}
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => option.display || option.value}
        value={options.filter((option) =>
          selectedValues.includes(option.value)
        )}
        onChange={handleCheckboxChange}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.display || option.value}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={labelText}
            placeholder={`Select ${labelText}`}
          />
        )}
        disabled={disabled}
      />
      <input
        type="hidden"
        name={name}
        value={Array.isArray(selectedValues) ? selectedValues.join(",") : ""}
      />
    </div>
  );
};

export default FormRowMultiSelectCheckbox;
