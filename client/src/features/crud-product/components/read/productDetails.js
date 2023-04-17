import { Loading } from "@components/index";
import { useAppContext } from "@context/appContext";

const ProductDetails = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <div>
      <h1>Product Details</h1>
    </div>
  );
};

export default ProductDetails;
