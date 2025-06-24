import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import UserSidebar from "../sideBar/UserSidebar";
import GridProducts from "@/components/GridProducts/GridProducts";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../../Cart/Cart";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlices";

const Categories = () => {
  const { id } = useParams();
  console.log(id, "Category");

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({product, quantity : 1}));
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex" }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={1}>
          <UserSidebar />
        </Grid>

        {/* Main Content */}
        <Grid
          item
          xs={8} // Make the main content larger to give more space for products
          sx={{
            display: "flex",
            flexDirection: "column",
            marginRight: 12,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <SearchBar />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bolder",
              marginTop: 4,
              marginBottom: 4,
              marginLeft: 9,
            }}
          >
            {id?.toUpperCase()}
          </Typography>

          <Box
            sx={{
              width: "100%",
            }}
          >
            <GridProducts addToCart={handleAddToCart} categoryId={id} />
          </Box>
        </Grid>

        {/* Cart */}
        <Grid
          item
          xs={2} // Make the cart slightly smaller to ensure it fits
          sx={{
            borderLeft: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Cart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Categories;
