import { FormTextField, FormMultiSelect, FormSelect } from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";
import { useState, useMemo } from "react";
import {
  application,
  driveType,
  headType,
  pointType,
  shankType,
  threadType,
  coating,
  material,
} from "@data/index";

const ProductSearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    productLineSearch,
    companySearch,
    materialSearch,
    corrosionResistanceSearch,
    coatingSearch,
    applicationSearch,
    shankTypeSearch,
    pointTypeSearch,
    headTypeSearch,
    driveTypeSearch,
    threadTypeSearch,
    sortBy,
    handleChange,
    clearFilters,
  } = useAppContext();

  let timeoutID;

  const handleClearFilters = (e) => {
    e.preventDefault();
    setLocalSearch("");
    clearFilters();
  };

  const debounce = () => {
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange(e);
      }, 1000);
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h4>Search</h4>
        <div className="form-center">
          <FormTextField
            type="text"
            id="productName"
            name="productNameSearch"
            labelText="Product Name"
            value={localSearch}
            onChange={optimizedDebounce}
          />
          <FormMultiSelect
            labelText="Product Line"
            name="productLineSearch"
            value={productLineSearch}
            onChange={handleChange}
            options={[
              { _id: 1, value: "Screw" },
              { _id: 2, value: "Nail" },
              { _id: 3, value: "Anchor" },
            ]}
          />
          <FormMultiSelect
            labelText="Company"
            name="companySearch"
            value={companySearch}
            onChange={handleChange}
            options={[
              { _id: 1, value: "Simpson Strong-Tie" },
              { _id: 2, value: "Hilti" },
              { _id: 3, value: "DeWalt" },
            ]}
          />
          <FormMultiSelect
            labelText="Material"
            name="materialSearch"
            value={materialSearch}
            onChange={handleChange}
            options={material}
          />
          <FormMultiSelect
            labelText="Corrosion Resistance"
            name="corrosionResistanceSearch"
            value={corrosionResistanceSearch}
            onChange={handleChange}
            options={[
              { _id: 1, value: "Low" },
              { _id: 2, value: "Medium" },
              { _id: 3, value: "High" },
              { _id: 4, value: "Severe" },
            ]}
          />
          <FormMultiSelect
            labelText="Coating"
            name="coatingSearch"
            value={coatingSearch}
            onChange={handleChange}
            options={coating}
          />
          <FormMultiSelect
            labelText="Application"
            name="applicationSearch"
            value={applicationSearch}
            onChange={handleChange}
            options={application}
          />
          <FormMultiSelect
            labelText="Shank Type"
            name="shankTypeSearch"
            value={shankTypeSearch}
            onChange={handleChange}
            options={shankType}
          />
          <FormMultiSelect
            labelText="Point Type"
            name="pointTypeSearch"
            value={pointTypeSearch}
            onChange={handleChange}
            options={pointType}
          />
          <FormMultiSelect
            labelText="Head Type"
            name="headTypeSearch"
            value={headTypeSearch}
            onChange={handleChange}
            options={headType}
          />
          <FormMultiSelect
            labelText="Drive Type"
            name="driveTypeSearch"
            value={driveTypeSearch}
            onChange={handleChange}
            options={driveType}
          />
          <FormMultiSelect
            labelText="Thread Type"
            name="threadTypeSearch"
            value={threadTypeSearch}
            onChange={handleChange}
            options={threadType}
          />
          <FormSelect
            labelText="Sort by"
            name="sortBy"
            value={sortBy}
            onChange={handleChange}
            options={[
              { _id: 1, value: "a-z", display: "Model Name (A-Z)" },
              { _id: 2, value: "z-a", display: "Model Name (Z-A)" },
              { _id: 3, value: "latest", display: "Latest update" },
              { _id: 4, value: "oldest", display: "Oldest update" },
            ]}
          />
          <button
            className="btn btn-block clear-btn"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ProductSearchContainer;
