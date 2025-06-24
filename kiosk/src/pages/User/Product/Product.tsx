import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProducts } from "@/resources/userProduct";
import UserSidebar from "../Menu/sideBar/UserSidebar";
import Cart from "../Cart/Cart";
// import { useCart } from "../Cart/CartContex";
import { slugify } from "@/common/utils/urlCleaner";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlices";

const Product = () => {
  const { id } = useParams();
  const { products, isError, isLoading } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading products.</Typography>;
  }

  if (!products) {
    return <Typography>No products available.</Typography>;
  }
  const product = products.find((p) => slugify(p.name) === slugify(id));

  console.log("Product:", product?.name);
  console.log("ID from params:", id);

  if (!product) {
    return <Typography>Product not found.</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <Grid container spacing={6}>
        {/* Left Side - UserSidebar */}
        <Grid item xs={12} sm={1} sx={{ border: "6px", borderColor: "red" }}>
          <UserSidebar />
        </Grid>

        {/* Middle - Product Details */}
        <Grid item xs={12} sm={8}>
          {product ? (
            <>
              <Grid container spacing={4}>
                {/* Left Side of Middle - Product Image */}
                <Grid item xs={12} md={5}>
                  <img
                    src={product.image_url || "https://via.placeholder.com/300"}
                    alt={product.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Grid>

                {/* Right Side of Middle - Product Info and Card */}
                <Grid item xs={12} md={7}>
                  {/* Product Information */}
                  <Box sx={{ mb: 3 }}>
                    {/* Product Category */}
                    <Typography variant="subtitle1" color="textSecondary">
                      {product.category_name}
                    </Typography>

                    {/* Product Title */}
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {product.name}
                    </Typography>

                    {/* Product Brand */}
                    <Typography variant="subtitle1" gutterBottom>
                      Brand:{" "}
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {product.producer}
                      </Typography>
                    </Typography>

                    {/* Product Stock */}
                    {product.stock > 0 ? (
                      <Typography variant="h6" gutterBottom color="green">
                        In stock
                      </Typography>
                    ) : (
                      <Typography variant="h6" gutterBottom color="red">
                        Out of stock
                      </Typography>
                    )}
                  </Box>

                  {/* Card for Price, Quantity, and Add to Cart */}
                  <Card
                    variant="outlined"
                    sx={{
                      padding: "25px",
                      borderRadius: "15px",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      maxWidth: "500px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h3"
                        color="error"
                        sx={{ fontWeight: "bold" }}
                      >
                        {product.price} RON
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                        sx={{ marginBottom: "15px" }}
                      >
                        Pret / BUC: {product.price} RON
                      </Typography>

                      {/* Quantity and Add to Cart Inline */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                          width: "100%",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        {/* Quantity Selector */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() =>
                              setQuantity((prev) => Math.max(1, prev - 1))
                            }
                            sx={{ minWidth: "40px" }}
                          >
                            -
                          </Button>
                          <TextField
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            inputProps={{ min: 1 }}
                            sx={{ width: "60px", mx: 1 }}
                            size="small"
                          />
                          <Button
                            variant="outlined"
                            onClick={() => setQuantity((prev) => prev + 1)}
                            sx={{ minWidth: "40px" }}
                          >
                            +
                          </Button>
                        </Box>

                        {/* Add to Cart Button */}
                        <Button
                          variant="contained"
                          size="large"
                          disabled={product.stock <= 0}
                          sx={{
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "10px 30px",
                            flexGrow: 1,
                            fontWeight: "bold",
                          }}
                          // @ts-ignore
                          onClick={() => dispatch(addToCart({ product, quantity }))}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Divider between the upper and lower part */}
              <Divider sx={{ marginTop: "40px", marginBottom: "20px" }} />

              {/* Product Description */}
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.description}
                </Typography>
              </Box>
            </>
          ) : (
            <Typography variant="h6">Product not found.</Typography>
          )}
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: 3,
            alignSelf: "stretch",
            borderColor: "grey.300",
            height: "963px",
            overflowY: "hidden",
          }}
        />

        {/* Right Side - Cart */}
        <Grid item xs={12} sm={1}>
          <Cart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
