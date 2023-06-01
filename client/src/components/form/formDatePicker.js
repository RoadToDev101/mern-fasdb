import * as React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const FormDatePicker = ({
  id,
  name,
  value,
  onChange,
  labelText,
  placeholder,
  variant,
}) => {
  const handleDateChange = (date) => {
    onChange({
      target: {
        name,
        value: date,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        id={id}
        name={name}
        value={value}
        onChange={handleDateChange}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <TextField
            {...inputProps}
            inputRef={inputRef}
            label={labelText}
            placeholder={placeholder}
            variant={!variant ? "outlined" : variant}
            {...InputProps}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormDatePicker;
