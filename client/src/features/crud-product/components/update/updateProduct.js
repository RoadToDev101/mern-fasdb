import {
  FormTextField,
  FormSelect,
  FormMultiSelect,
  Alert,
} from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";
import applicationList from "@data/application";
const UpdateProduct = () => {
  const {
    showAlert,
    isLoading,
    productLine,
    company,
    modelName,
    application,
    isActive,
    handleChange,
    editProduct,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct();
  };

  return (
    <Wrapper>
      <form className="form">
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
          <FormSelect
            labelText="Status"
            name="isActive"
            value={isActive}
            onChange={handleChange}
            options={[
              { _id: 1, value: true, display: "Active" },
              { _id: 2, value: false, display: "Inactive" },
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
            options={applicationList}
          />
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
        </div>
      </form>
    </Wrapper>
  );
};

export default UpdateProduct;
