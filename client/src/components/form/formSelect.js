import { useState } from "react";
// import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FormSelect = ({
  labelText,
  name,
  value,
  onChange,
  options,
  disabled,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange({ target: { name, value } });
  };

  return (
    <div className="form-row">
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{labelText || name}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          name={name}
          value={selectedValue}
          label={labelText || name}
          onChange={handleSelectChange}
          disabled={disabled}
        >
          <MenuItem value="">
            <em>Select {labelText || name}</em>
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value} display={option.display}>
              {option.display || option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <input type="hidden" name={name} value={selectedValue} />
    </div>
  );
};

export default FormSelect;
