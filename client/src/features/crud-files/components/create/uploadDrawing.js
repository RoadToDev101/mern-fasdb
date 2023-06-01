import { FormTextField, Alert } from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";
import { DatePicker } from "@mui/x-date-pickers";

const UploadDrawing = () => {
  const {
    showAlert,
    drawingName,
    version,
    revisedDate,
    modelName,
    handleChange,
    handleDateChange,
    handleFileChange,

    uploadDrawing,
  } = useAppContext();

  return (
    <Wrapper>
      <form className="form">
        <h4>Drawing Info</h4>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormTextField
            type="text"
            labelText="Drawing Name"
            name="drawingName"
            value={drawingName}
            onChange={handleChange}
          />
          <FormTextField
            type="text"
            labelText="Version"
            name="version"
            value={version}
            onChange={handleChange}
          />
          {/* <FormDatePicker
            id="revisedDate"
            name="revisedDate"
            value={revisedDate}
            onChange={handleChange}
            labelText="Revised Date"
            placeholder="Revised Date"
          /> */}
          {/* <FormTextField
            type="date"
            labelText="Revised Date"
            name="revisedDate"
            value={revisedDate}
            onChange={handleChange}
          /> */}
          <DatePicker
            label="Revised Date"
            value={revisedDate}
            onChange={handleDateChange}
          />
          <FormTextField
            type="text"
            labelText="Model Name"
            name="modelName"
            value={modelName}
            onChange={handleChange}
          />
          <FormTextField type="file" name="file" onChange={handleFileChange} />
          <button type="submit" className="btn" onClick={uploadDrawing}>
            Upload
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UploadDrawing;
