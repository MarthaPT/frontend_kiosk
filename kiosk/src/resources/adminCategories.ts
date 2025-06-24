import { Api } from "@/common/utils/httpsinterceptor";
import useSWR, { SWRConfiguration } from "swr";
import { SubCategories } from "./subCategory";

const service = import.meta.env.VITE_ENV_SERVICE;
const route = "/categories";

export interface CategoryIn {
  id: number;
  name: string;
  description: string;
  is_top_category: boolean;
  image?: File;
}
interface CategoryWithSubcategories {
  id: number;
  name: string;
  category_name: string;
}

export interface CategoryOut extends Omit<CategoryIn, "image"> {
  image_url?: string | null;
  subcategories?: SubCategories[];
}

export interface Category {
  getCategories: () => Promise<CategoryOut[]>;
  createCategories: (data: Omit<CategoryIn, "id">) => Promise<CategoryOut>;
  update: (id: number, data: CategoryIn) => Promise<CategoryOut>;
  getSubcategories: (id: number) => Promise<CategoryWithSubcategories[]>;
  deleteOne: (id: number) => Promise<CategoryIn>;
}

export const CategoryService: Category = {
  getCategories: () => Api(service).get(route),
  createCategories: (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] != null && key !== "image_url") {
        formData.append(key, data[key].toString());
      }
    }
    if (data.image) {
      formData.append("image", data.image); // Append the image file
    }

    return Api(service).post(route, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] != null && key !== "image") {
        formData.append(key, data[key].toString());
      }
    }
    if (data.image) {
      formData.append("image", data.image); // Append the image file
    }

    return Api(service).patch(`${route}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getSubcategories: (id) => Api(service).get(`${route}/${id}/subcategories`),
  deleteOne: (id) => Api(service).delete(`${route}/${id}`), // Corrected to use DELETE instead of POST
};

const config: SWRConfiguration<CategoryIn[], any> = {
  fallbackData: [],
};

export const useCategories = ({ onError = () => {} }) => {
  const { data, mutate, error, isLoading } = useSWR(
    route,
    CategoryService.getCategories,
    {
      onError,
      ...config,
    }
  );

  return {
    categories: data ?? [],
    loading: isLoading,
    isError: error,
    mutate,
    create: CategoryService.createCategories,
    deleteOne: CategoryService.deleteOne,
    getSubcategories: CategoryService.getSubcategories,
    update: CategoryService.update,
  };
};
