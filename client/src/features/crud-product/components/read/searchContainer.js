import {
  FormRow,
  FormRowSelect,
  // FormRowMultiSelectCheckbox,
} from "@components/index";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/dashboardFormPage";

const SearchContainer = () => {
  const {
    isLoading,
    productTypeSearch,
    companySearch,
    modelNameSearch,
    sortBy,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange(e);
    console.log(e.target.name, e.target.value);
  };

  const handelClearFilters = (e) => {
    e.preventDefault();
    // setLocalSearch('');
    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Search</h4>
        <div className="form-center">
          <FormRow
            labelText="Model Name"
            name="modelNameSearch"
            value={modelNameSearch}
            onChange={handleSearch}
          />
          <FormRowSelect
            labelText="Product Type"
            name="productTypeSearch"
            value={productTypeSearch}
            onChange={handleSearch}
            options={[
              { _id: 1, value: "Screw" },
              { _id: 2, value: "Nail" },
              { _id: 3, value: "Anchor" },
              { _id: 4, value: "all", display: "All Product Types" },
            ]}
          />
          <FormRowSelect
            labelText="Company"
            name="companySearch"
            value={companySearch}
            onChange={handleSearch}
            options={[
              { _id: 1, value: "Simpson Strong-Tie" },
              { _id: 2, value: "Hilti" },
              { _id: 3, value: "DeWalt" },
              { _id: 4, value: "all", display: "All Companies" },
            ]}
          />
          <FormRowSelect
            labelText="Sort by"
            name="sortBy"
            value={sortBy}
            onChange={handleSearch}
            options={[
              { _id: 1, value: "a-z", display: "Model Name (A-Z)" },
              { _id: 2, value: "z-a", display: "Model Name (Z-A)" },
              { _id: 3, value: "latest", display: "Latest update" },
              { _id: 4, value: "oldest", display: "Oldest update" },
            ]}
          />
          <button
            className="btn btn-block clear-btn"
            onClick={handelClearFilters}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
