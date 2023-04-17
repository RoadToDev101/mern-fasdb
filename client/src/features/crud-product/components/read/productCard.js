import moment from "moment";
import { Link } from "react-router-dom";
import ProductInfo from "./productCardInfo";
import { useAppContext } from "@context/appContext";
import Wrapper from "@wrappers/productCard";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaCalendarAlt,
  FaCheck,
  FaMinusCircle,
} from "react-icons/fa";
import { BsFillHouseGearFill } from "react-icons/bs";

const ProductCard = ({
  _id,
  productType,
  active,
  modelName,
  company,
  updatedAt,
}) => {
  const { viewProduct, setEditProduct, deleteProduct } = useAppContext();

  let date = moment(updatedAt).format("MMMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        {/*TODO: Replace product picture in the future */}
        <div className="main-icon">{productType.charAt(0)}</div>
        <div className="info">
          <h5>{modelName}</h5>
          <p>{productType}</p>
        </div>
      </header>
      <div className="content">
        {/* TODO: Check this active/inactive color */}
        <div className={`status ${active}`}>
          <ProductInfo
            icon={active ? <FaCheck /> : <FaMinusCircle />}
            text={active ? "Active" : "Inactive"}
          />
        </div>
        <ProductInfo icon={<BsFillHouseGearFill />} text={company} />
        <ProductInfo icon={<FaCalendarAlt />} text={date} />

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
