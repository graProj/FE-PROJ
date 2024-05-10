import { Outlet, Navigate, useLocation} from "react-router-dom";
import '../index.css';
import Header from "../components/header";

const ProtectedRoutes = () => {
  const location = useLocation();
  const localStorageToken = localStorage.getItem("token");
  if (localStorageToken === undefined) {
    return null; 
  }
  if (localStorageToken) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Navigate to="/auth" replace state={{ from: location }} />
      </>
    );
  }
};

export default ProtectedRoutes;