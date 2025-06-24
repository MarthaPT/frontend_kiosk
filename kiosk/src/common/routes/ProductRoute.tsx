import Product from "@/pages/User/Product/Product";
import { Routes } from "../types/routes";

export const ProductRoute: Routes = [
    {
      path: "product/:id",
      element: <Product />,
    },
  ];