import { Api } from "@/common/utils/httpsinterceptor";
import useSWR, { SWRConfiguration } from "swr";

const service = import.meta.env.VITE_ENV_SERVICE;
const route = "/products";

export interface ProductsInterface {
  quantity?: any;
  product?: any;
  id: number;
  name: string;
  producer: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  subcategory: string;
  is_top_product: boolean;
  image?: File;
  image_url?: string | null;
  category_name?: string;
  subcategory_name?: string;
}
interface Product {
  getProducts: () => Promise<ProductsInterface[]>;
  createProducts: (
    data: Omit<ProductsInterface, "id">
  ) => Promise<ProductsInterface>;
  update: (
    id: number,
    data: ProductsInterface
  ) => Promise<ProductsInterface>;
  deleteOne: (id: number) => Promise<ProductsInterface>;
}

export const ProductsService: Product = {
  getProducts: () => Api(service).get(route),
  createProducts: (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] != null && key !== "image_url") {
        if (key === "category_name") {
          // If category_name is an object, extract the name
          const categoryNameValue =
            typeof data[key] === "object" && data[key] !== null
            // @ts-ignore
              ? data[key].name // Extract the category name
              // @ts-ignore
              : data[key].toString();

          formData.append("category", categoryNameValue);
        } else {
          formData.append(key, data[key].toString());
        }
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

    // Append all non-file fields to FormData
    for (const key in data) {
      if (data[key] != null && key !== "image") {
        // Handle category specifically if it's an object
        if (
          key === "category_name" &&
          typeof data[key] === "object" &&
          data[key] !== null
        ) {
          // @ts-ignore
          formData.append("category", data[key].name); // Assuming backend expects category name
        } else {
          formData.append(key, data[key].toString());
        }
      }
    }

    for (let pair of formData.entries()) {
      console.log(`Update FormData entry - ${pair[0]}: ${pair[1]}`);
    }

    // Append the image file if it exists
    if (data.image) {
      formData.append("image", data.image); // Append the image file
    }

    // Make the patch request with FormData
    return Api(service).patch(`${route}/${id}`, formData, {
      headers: {
        // Allow FormData to automatically handle content type including boundaries
        // Removing manual setting of "Content-Type" is recommended
        // "Content-Type": "multipart/form-data", // Do NOT set manually
      },
    });
  },
  deleteOne: (id) => Api(service).delete(`${route}/${id}`), // Corrected to use DELETE instead of POST
};

const config: SWRConfiguration<ProductsInterface[], any> = {
  fallbackData: [],
};

export const useProducts = ({ onError = () => {} }) => {
  const { data, mutate, error, isLoading } = useSWR(
    route,
    ProductsService.getProducts,
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
    create: ProductsService.createProducts,
    deleteOne: ProductsService.deleteOne,
    update: ProductsService.update,
  };
};
