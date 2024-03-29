import { Navigate } from "react-router-dom";
import { useAppContext } from "@context/appContext";
import { Loading } from "@components/index";

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();

  if (userLoading) {
    return <Loading />;
  } // show loading

  if (!user) {
    return <Navigate to="/landing" />;
  } // redirect to landing
  return children;
};

export default ProtectedRoute;
