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

  const handleProductInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>Add Product</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRowSelect
            labelText="Product Type"
            name="productType"
            value={productType}
            onChange={handleProductInput}
            options={[
              { id: 1, value: "Screw" },
              { id: 2, value: "Nail" },
              { id: 3, value: "Anchor" },
            ]}
          />
          <FormRowSelect
            labelText="Company"
            name="company"
            value={company}
            onChange={handleProductInput}
            options={[
              { id: 1, value: "Simpson Strong-Tie" },
              { id: 2, value: "Hilti" },
              { id: 3, value: "DeWalt" },
            ]}
          />
          <FormRow
            labelText="Model Name"
            name="modelName"
            value={modelName}
            onChange={handleProductInput}
          />
          <FormRowSelect
            labelText="Thread Type"
            name="threadType"
            onChange={handleProductInput}
            options={threadTypes.map((threadType) => ({
              id: threadType._id,
              value: threadType.threadTypeName,
            }))}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateProduct;
