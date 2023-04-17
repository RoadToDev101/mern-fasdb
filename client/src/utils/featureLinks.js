import {
  FaListUl,
  FaPlus,
  FaEdit,
  FaFilePdf,
  FaFileImport,
  FaTools,
  FaQuestion,
} from "react-icons/fa";

const FeatureLinks = [
  {
    id: 1,
    text: "products",
    title: "all products",
    path: "/",
    icon: <FaListUl />,
  },
  {
    id: 2,
    text: "new product",
    title: "add a new product",
    path: "/create-product",
    icon: <FaPlus />,
  },
  {
    id: 3,
    text: "update product",
    title: "update product",
    path: "/update-product",
    icon: <FaEdit />,
  },
  {
    id: 4,
    text: "tools",
    title: "all tools",
    path: "/tools",
    icon: <FaTools />,
  },
  {
    id: 5,
    text: "files",
    title: "all files",
    path: "/show-files",
    icon: <FaFilePdf />,
  },
  {
    id: 6,
    text: "add file",
    title: "add a new file",
    path: "/add-file",
    icon: <FaFileImport />,
  },
  {
    id: 7,
    text: "Guide",
    title: "User guide",
    path: "/guide",
    icon: <FaQuestion />,
  },
];

export default FeatureLinks;
