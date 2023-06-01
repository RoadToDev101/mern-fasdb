import * as React from "react";
import TextField from "@mui/material/TextField";

const FormRow = ({
  type,
  id,
  name,
  value,
  onChange,
  labelText,
  placeholder,
  autoComplete,
}) => {
  return (
    <div className="form-row">
      <TextField
        type={type}
        id={id}
        name={name}
        value={value}
        className="form-input"
        onChange={onChange}
        label={labelText}
        placeholder={placeholder}
        autoComplete={autoComplete}
        variant="outlined" // Set the desired variant (outlined, filled, standard)
      />
    </div>
  );
};

export default FormRow;
