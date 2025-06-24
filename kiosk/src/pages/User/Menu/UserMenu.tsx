import { Box, Container, Grid, Typography } from "@mui/material";

import TopCategories from "./topCategories/TopCategories";
import UserSidebar from "./sideBar/UserSidebar";
import CarouselProducts from "./Carousel/Carousel";
import SearchBar from "./SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import { CartProvider } from "../Cart/CartContex";
import { useParams } from "react-router-dom";

const UserMenu = () => {
  const { id } = useParams();
  console.log('here', id)

  return (
    <Container maxWidth="xl" sx={{ display: "flex", height: "100%" }}>
      <CartProvider>
        <Grid container spacing={2}>
          {/* Left Side - User Sidebar */}
          <Grid item xs={1}>
            <UserSidebar />
          </Grid>

            {/* Middle - SearchBar (floating), TopCategories, CarouselProducts */}
            <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              marginRight: 10,
              overflowY: "auto",
              maxHeight: "100vh",
              position: "relative",
            }}
            >
            {/* Floating SearchBar */}
            <Box
              sx={{
              width: "100%",
              position: "sticky",
              top: 0,
              zIndex: 2,
              backgroundColor: "background.paper",
              boxShadow: 1,
              pb: 1,
              }}
            >
              <SearchBar />
            </Box>
            <Box
              sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              marginTop: 1,
              marginBottom: 3,
              width: "100%",
              }}
            >
              <TopCategories />
            </Box>

            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Top Produse
            </Typography>
            <Box sx={{ width: "80%" }}>
              <CarouselProducts />
            </Box>
          </Grid>

          {/* Right Side - Cart */}
          <Grid
            item
            xs={2} // Adjusted to make it narrower
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
      </CartProvider>
    </Container>
  );
};

export default UserMenu;
