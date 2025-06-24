import { Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/common/utils/urlCleaner";
import { useProducts } from "@/resources/userProduct";

const GridProducts = ({ addToCart, categoryId }) => {
  const navigate = useNavigate();
  const { products } = useProducts();

  console.log(products, "Initial products list");

  // Filter products based on category
  const filteredProducts = products?.filter((product) => {
    if (!product?.category_name || !categoryId) {
      console.warn("Product without category name or missing categoryId", product);
      return false;
    }
    return slugify(product.category_name) === slugify(categoryId);
  });

  console.log(filteredProducts, "Filtered products");

  // Handle loading state
  if (!products) {
    return <div>Loading products...</div>;
  }

  // Handle case with no products found in the category
  if (filteredProducts?.length === 0) {
    return <div>No products found in this category.</div>;
  }

  // Handle click on a product
  const handleClick = (id) => {
    if (!id) {
      console.warn('Product ID is missing for handleClick');
      return;
    }
    const slug = slugify(id);
    navigate(`/product/${slug}`);
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: "flex-start",
        overflowY: "auto",
        height: "800px",
      }}
    >
      {filteredProducts?.map((product, index) => (
        <Grid item key={product.id ?? index}>
          <ProductCard
            product={product}
            onClick={() => handleClick(product.name)}
            addToCart={addToCart}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridProducts;