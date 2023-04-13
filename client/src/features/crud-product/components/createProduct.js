import { FormRow, FormRowSelect, Alert } from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";
import { CreateScrew } from "./create/createScrew.js";

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
    createProduct,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productType || !company || !modelName) {
      displayAlert();
    }
    createProduct();
    // console.log("submit");
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
            <label className="form-label-section">Product Info</label>
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

          {productType === "Screw" && <CreateScrew />}
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
