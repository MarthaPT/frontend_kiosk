import { Routes } from "../types/routes";
import Categories from "@/pages/User/Menu/Categories/Categories";

export const CategoriesRoute: Routes = [
  {
    path: "/:id",
    element: <Categories />,
  },
];
