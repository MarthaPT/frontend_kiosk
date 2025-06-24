import { Api } from "@/common/utils/httpsinterceptor";
import useSWR, { SWRConfiguration } from "swr";

const service = import.meta.env.VITE_ENV_SERVICE;
const route = "/subcategories";

export interface SubCategoriesInterface {
  id: number;
  name: string;
  category_name: string;
}

export interface SubCategories {
  getSubCategory: () => Promise<SubCategoriesInterface[]>;
  createSubCategory: (
    data: Omit<SubCategoriesInterface, "id">
  ) => Promise<SubCategoriesInterface>;
  update: (
    id: number,
    data: SubCategoriesInterface
  ) => Promise<SubCategoriesInterface>;
  deleteOne: (id: number) => Promise<SubCategoriesInterface>;
}

export const SubCategoriesService: SubCategories = {
  getSubCategory: () => Api(service).get(route),
  createSubCategory: (data) => Api(service).post(route, data),
  update: (id, data) => Api(service).patch(`${route}/${id}`, data),
  deleteOne: (id) => Api(service).delete(`${route}/${id}`),
};

const config: SWRConfiguration<SubCategoriesInterface[], any> = {
  fallbackData: [],
};


export const useSubCategory = ({ onError = () => {} }) => {
  const { data, mutate, error, isLoading } = useSWR(
    route,
    SubCategoriesService.getSubCategory,
    {
      onError,
      ...config,
    }
  );

  return {
    products: data ?? [], // This will contain the product data once fetched
    loading: isLoading, // This is true while the data is being fetched
    isError: error, // If there is an error, it will be captured here
    mutate,
    create: SubCategoriesService.createSubCategory,
    deleteOne: SubCategoriesService.deleteOne,
    update: SubCategoriesService.update,
  };
};
