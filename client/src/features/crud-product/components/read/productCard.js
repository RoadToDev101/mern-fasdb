import moment from "moment";
import { Link } from "react-router-dom";
import ProductInfo from "./productCardInfo";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/card";
import { FaEdit, FaTrash, FaSearch, FaCalendarAlt } from "react-icons/fa";
import { BsFillHouseGearFill } from "react-icons/bs";

const ProductCard = ({
  _id,
  productLine,
  modelName,
  company,
  isActive,
  updatedAt,
}) => {
  const { viewProduct, setEditProduct, deleteProduct } = useAppContext();

  let date = moment(updatedAt).format("MMMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{productLine.charAt(0)}</div>
        {/*TODO: Replace with product picture or carousel */}
        <div className="info">
          <h5>{modelName}</h5>
          <p>{productLine}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProductInfo icon={<BsFillHouseGearFill />} text={company} />
          <ProductInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${isActive ? "active" : "inactive"}`}>
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="product-details"
              className="btn view-btn"
              onClick={() => viewProduct(_id)}
            >
              <FaSearch />
            </Link>
            <Link
              to="update-product"
              className="btn edit-btn"
              onClick={() => setEditProduct(_id)}
            >
              <FaEdit />
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteProduct(_id)}
            >
              <FaTrash />
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default ProductCard;
