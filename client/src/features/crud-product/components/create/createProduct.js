import {
  FormRow,
  FormRowSelect,
  FormRowMultiSelectCheckbox,
  Alert,
} from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";
import applicationList from "@data/application";

const CreateProduct = () => {
  const {
    showAlert,
    // displayAlert,
    isLoading,
    productLine,
    company,
    modelName,
    application,
    handleChange,
    clearValues,
    createProduct,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct();
  };

  const handleProductInput = (e) => {
    handleChange(e);
    console.log(e.target.value);
  };

  return (
    <Wrapper>
      <form className="form">
        {showAlert && <Alert />}
        <div className="form-center">
          <div className="form-section">
            <label>General Info</label>
            <FormRowSelect
              labelText="product Line"
              name="productLine"
              value={productLine}
              onChange={handleProductInput}
              options={[
                { _id: 1, value: "Screw" },
                { _id: 2, value: "Nail" },
                { _id: 3, value: "Anchor" },
              ]}
            />
          </div>
          <div className="form-section">
            <FormRowMultiSelectCheckbox
              labelText="Application"
              name="application"
              value={application}
              onChange={handleProductInput}
              //Get the options from the application.json file
              options={applicationList}
            />
          </div>
          <div className="form-section">
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
          </div>
          <div className="form-section">
            <FormRow
              labelText="Model Name"
              name="modelName"
              value={modelName}
              onChange={handleProductInput}
            />
          </div>
        </div>
      </form>
      {productLine && (
        <div className="btn-container">
          <button
            type="submit"
            className="btn btn-block submit-btn"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Add
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
    </Wrapper>
  );
};

export default CreateProduct;