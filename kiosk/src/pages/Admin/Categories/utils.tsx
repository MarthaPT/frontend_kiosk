import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { CategoryService } from "@/resources/adminCategories";

export const useCategories = () => {
  interface Category {
    id: number;
    name: string;
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getCategories();
        // Map over categories to extract id and name
        const mappedCategories = data.map((category) => ({
          id: category.id,
          name: category.name,
        }));
        setCategories(mappedCategories);
      } catch (error) {
        enqueueSnackbar("Cannot fetch categories", { variant: "error" });
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
