import { FormRow, FormRowSelect, Alert } from "../../../components/index";
import { useAppContext } from "../../../context/appContext";
import Wrapper from "../../../assets/wrappers/dashboardFormPage";
import { useEffect, useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const {
    showAlert,
    displayAlert,
    isLoading,
    productType,
    company,
    modelName,
    handleChange,
    clearValues,
  } = useAppContext();

  const [threadTypes, setThreadTypes] = useState([]);
  const [headTypes, setHeadTypes] = useState([]);
  const [driveTypes, setDriveTypes] = useState([]);
  const [shankTypes, setShankTypes] = useState([]);
  const [pointTypes, setPointTypes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feature/get-all-features")
      .then((response) => {
        setThreadTypes(response.data.threadTypes);
        setHeadTypes(response.data.headTypes);
        setDriveTypes(response.data.driveTypes);
        setShankTypes(response.data.shankTypes);
        setPointTypes(response.data.pointTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productType || !company || !modelName) {
      displayAlert();
    }
    console.log("submit");
  };

  const handleProductInput = (e) => {
    handleChange(e);
  };

  return (
    <Wrapper>
      <form className="form">
        {showAlert && <Alert />}
        <div className="form-center">
          <div className="form-section">
            <label className="form-label-section">General Info</label>
            {/* Info section */}
            <FormRowSelect
              labelText="Product Type"
              name="productType"
              value={productType}
              onChange={handleProductInput}
              options={[
                { _id: 1, value: "Screw" },
                { _id: 2, value: "Nail" },
                { _id: 3, value: "Anchor" },
              ]}
            />
            <FormRowSelect
              labelText="Company"
              name="company"
              value={company}
              onChange={handleProductInput}
              options={[
                { _id: 1, value: "Simpson Strong-Tie" },
                { _id: 2, value: "Hilti" },
                { _id: 3, value: "DeWalt" },
              ]}
            />
            <FormRow
              labelText="Model Name"
              name="modelName"
              value={modelName}
              onChange={handleProductInput}
            />
          </div>

          {productType === "Screw" && (
            <div className="form-section">
              <label className="form-label-section">Features</label>
              {/* Features section*/}
              <FormRowSelect
                labelText="Thread Type"
                name="threadType"
                onChange={handleProductInput}
                options={threadTypes.map((threadType) => ({
                  key: threadType._id, // Add the key prop
                  value: threadType._id,
                  display: threadType.threadTypeName,
                }))}
              />
              <FormRowSelect
                labelText="Head Type"
                name="headType"
                onChange={handleProductInput}
                options={headTypes.map((headType) => ({
                  key: headType._id, // Add the key prop
                  value: headType._id,
                  display: headType.headTypeName,
                }))}
              />
              <FormRowSelect
                labelText="Drive Type"
                name="driveType"
                onChange={handleProductInput}
                options={driveTypes.map((driveType) => ({
                  key: driveType._id, // Add the key prop
                  value: driveType._id,
                  display: driveType.driveTypeName,
                }))}
              />
              <FormRowSelect
                labelText="Shank Type"
                name="shankType"
                onChange={handleProductInput}
                options={shankTypes.map((shankType) => ({
                  key: shankType._id, // Add the key prop
                  value: shankType._id,
                  display: shankType.shankTypeName,
                }))}
              />
              <FormRowSelect
                labelText="Point Type"
                name="pointType"
                onChange={handleProductInput}
                options={pointTypes.map((pointType) => ({
                  key: pointType._id, // Add the key prop
                  value: pointType._id,
                  display: pointType.pointTypeName,
                }))}
              />
            </div>
          )}
          {productType && (
            <div className="btn-container form-section">
              <button
                type="submit"
                className="btn btn-block submit-btn"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-block clear-btn"
                onClick={(e) => {
                  e.preventDefault();
                  clearValues();
                }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateProduct;
