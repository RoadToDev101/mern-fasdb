import {
  FormRow,
  FormRowSelect,
  // FormRowMultiSelectCheckbox,
  Alert,
} from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";

const UpdateProduct = () => {
  const {
    showAlert,
    isLoading,
    productLine,
    company,
    modelName,
    isActive,
    handleChange,
    editProduct,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct();
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
            {/* <label className="form-label-section">General Info</label> */}
            {/* Info section */}
            <FormRowSelect
              labelText="Product Status"
              name="isActive"
              value={isActive}
              onChange={handleProductInput}
              options={[
                { _id: 1, value: true, display: "Active" },
                { _id: 2, value: false, display: "Inactive" },
              ]}
            />
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

            {/* Applications section */}
            {/* <FormRowMultiSelectCheckbox
              labelText="Applications"
              name="applications"
              value={applications}
              onChange={handleProductInput}
              options={[
                { _id: 1, value: "Wood" },
                { _id: 2, value: "Concrete" },
                { _id: 3, value: "Steel" },
              ]}
            /> */}
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
            Update
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default UpdateProduct;
