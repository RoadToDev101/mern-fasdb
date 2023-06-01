import * as React from "react";
import TextField from "@mui/material/TextField";

const FormTextField = ({
  type,
  id,
  name,
  required,
  value,
  onChange,
  labelText,
  placeholder,
  autoComplete,
  variant,
}) => {
  return (
    <div className="form-row">
      <TextField
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        className="form-input"
        onChange={onChange}
        label={labelText}
        placeholder={placeholder}
        autoComplete={autoComplete}
        variant={!variant ? "outlined" : variant} // Set the desired variant (outlined, filled, standard)
      />
    </div>
  );
};

export default FormTextField;
