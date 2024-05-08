import { Outlet} from "react-router-dom";
import '../index.css';
import Header from "../components/header";
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;