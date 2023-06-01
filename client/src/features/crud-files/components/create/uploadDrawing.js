import { FormRow, Alert } from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";

const UploadDrawing = () => {
  const {
    showAlert,
    drawingName,
    version,
    revisedDate,
    modelName,
    handleChange,
    handleFileChange,
    uploadDrawing,
  } = useAppContext();

  return (
    <Wrapper>
      <form className="form">
        <h4>Drawing Info</h4>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="Drawing Name"
            name="drawingName"
            value={drawingName}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="Version"
            name="version"
            value={version}
            onChange={handleChange}
          />
          <FormRow
            type="date"
            labelText="Revised Date"
            name="revisedDate"
            value={revisedDate}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="Model Name"
            name="modelName"
            value={modelName}
            onChange={handleChange}
          />
          <FormRow
            type="file"
            labelText="File"
            name="file"
            onChange={handleFileChange}
          />
          <button type="submit" className="btn" onClick={uploadDrawing}>
            Upload
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UploadDrawing;
