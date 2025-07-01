import Products from "@/pages/Admin/Products/Products";
import { Routes } from "../types/routes";
import AdminMenu from "@/pages/Admin/AdminMenu";
import Categories from "@/pages/Admin/Categories/Categories";
import History from "@/pages/Admin/History/History"; 
import LoginAdmin from "@/pages/Admin/LoginAdmin";

const Admin_Routes: Routes = [
  {
    path: "/loginadmin",
    element: <LoginAdmin />,
  },
  {
    path: "/admin",
    element: <AdminMenu />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/history",
    element: <History />,
  },
];

export default Admin_Routes;
