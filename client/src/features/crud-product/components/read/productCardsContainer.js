import { useEffect } from "react";
import { Loading, Pagination } from "@components/index";
import { useAppContext } from "@context/appContext";
import Product from "./productCard";
import Wrapper from "@wrappers/cardsContainer";

const ProductCardsContainer = () => {
  const {
    getProducts,
    products,
    isLoading,
    page,
    totalProducts,
    productNameSearch,
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
    productLineSearch,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productLineSearch,
    productNameSearch,
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
    page,
  ]);

  if (isLoading) {
    return <Loading center />;
  }

  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>Sorry, no products matched your search.</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalProducts} product{products.length > 1 && "s"} found. Page {page}{" "}
        of {Math.ceil(totalProducts / 10)}
      </h5>
      <div className="products">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
      {numOfPages > 1 && <Pagination />}
    </Wrapper>
  );
};

export default ProductCardsContainer;
