import { Grid } from "@mui/material";
import { ProductCard } from "@/components/GridProducts/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/common/utils/urlCleaner";
import { useProducts } from "@/resources/userProduct";
import Loader from "@/components/loader/Loader";
// import { useCart } from "../../Cart/CartContex";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlices";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CarouselProducts = () => {
  const { products, isLoading, isError } = useProducts();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleClick = (id) => {
    const slug = slugify(id);
    navigate(`/product/${slug}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>Error loading products...</p>; // Display error state if fetch fails
  }

  if (!products || products.length === 0) {
    return <p>No products available.</p>; // Handle empty products array or undefined products
  }

  return (
    <Grid
      container
      sx={{
        width: "100%",
        //overflow: "hidden",
      }}
    >
      <Grid
    container
    spacing={4}
    sx={{
      width: "100%",
      justifyContent: "center",
    }}
  >
    {products.map((product, index) => (
      <Grid
        item
        key={index}
        xs={12}
        sm={6}
        md={4} // 3 pe rând la ecran mare
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
              <ProductCard
                product={product}
                onClick={() => handleClick(product.name)}
                // @ts-ignore
                addToCart={() => dispatch(addToCart({ product, quantity: 1 }))}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default CarouselProducts;
