// ProtectedRoutes.js

import { Outlet, useLocation } from "react-router-dom"; // Added useLocation
import '../index.css';
import Header from "../components/header";


const ProtectedRoutes = () => {
  const location = useLocation(); // Added useLocation

  

  return (
    <>
      {!/^\/home\/room\/.*$/.test(location.pathname) && <Header />}
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;