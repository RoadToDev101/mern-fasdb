import {
  FormTextField,
  FormSelect,
  FormMultiSelect,
  Alert,
} from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";
import applicationList from "@data/application";

const CreateProduct = () => {
  const {
    showAlert,
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

  return (
    <Wrapper>
      <form className="form">
        <h4>General Info</h4>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormSelect
            labelText="Product Line"
            name="productLine"
            value={productLine}
            onChange={handleChange}
            options={[
              { _id: 1, value: "Screw" },
              { _id: 2, value: "Nail" },
              { _id: 3, value: "Anchor" },
            ]}
          />
          <FormSelect
            labelText="Company"
            name="company"
            value={company}
            onChange={handleChange}
            options={[
              { _id: 1, value: "Simpson Strong-Tie" },
              { _id: 2, value: "Hilti" },
              { _id: 3, value: "DeWalt" },
            ]}
          />
          <FormTextField
            labelText="Model Name"
            name="modelName"
            required
            value={modelName}
            onChange={handleChange}
          />
          <FormMultiSelect
            labelText="Application"
            name="application"
            value={application}
            onChange={handleChange}
            options={applicationList} //Get the options from the application.json file
          />
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
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateProduct;
