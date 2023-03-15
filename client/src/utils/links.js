import {
  FaList,
  FaPlus,
  FaEdit,
  FaFilePdf,
  FaFileImport,
  FaCalculator,
} from "react-icons/fa";

const Links = [
  { id: 1, text: "products", path: "/", icon: <FaList /> },
  { id: 2, text: "new product", path: "create-products", icon: <FaPlus /> },
  { id: 3, text: "update product", path: "update-products", icon: <FaEdit /> },
  { id: 4, text: "files", path: "show-files", icon: <FaFilePdf /> },
  { id: 5, text: "add file", path: "add-file", icon: <FaFileImport /> },
  {
    id: 6,
    text: "calculate & compare",
    path: "compare-products",
    icon: <FaCalculator />,
  },
];

export default Links;
