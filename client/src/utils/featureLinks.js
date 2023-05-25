import {
  FaListUl,
  FaPlus,
  //FaEdit,
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
    text: "tools",
    title: "all tools",
    path: "/tools",
    icon: <FaTools />,
  },
  {
    id: 4,
    text: "files",
    title: "all files",
    path: "/show-files",
    icon: <FaFilePdf />,
  },
  {
    id: 5,
    text: "upload file",
    title: "upload a new file",
    path: "/upload-file",
    icon: <FaFileImport />,
  },
  {
    id: 6,
    text: "Guide",
    title: "User guide",
    path: "/guide",
    icon: <FaQuestion />,
  },
];

export default FeatureLinks;
