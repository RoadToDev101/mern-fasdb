import { FormRow, FormRowMultiSelect } from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";
import { useState, useMemo } from "react";

//TODO: Search by features, applications, materials, coatings, etc.
//TODO: Convert to multi select checkbox
const ProductSearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    productLineSearch,
    companySearch,
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
          <FormRow
            labelText="Product Name"
            name="productNameSearch"
            value={localSearch}
            onChange={optimizedDebounce}
          />
          <FormRowMultiSelect
            labelText="product Line"
            name="productLineSearch"
            value={productLineSearch}
            onChange={handleChange}
            options={[
              { _id: 1, value: "Screw" },
              { _id: 2, value: "Nail" },
              { _id: 3, value: "Anchor" },
            ]}
          />
          <FormRowMultiSelect
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
          <FormRowMultiSelect
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
