import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProductCard from "../ProductCard/ProductCard"; // Import the ProductCard component
import { useOrders } from "@/resources/orders";

const CustomAccordion = ({ order }) => {
  const { update } = useOrders();

  const handleCloseOrder = async () => {
    try {
      await update(order.id, true); // Mark the order as processed (closed)
      alert("Order has been closed successfully.");
    } catch (error) {
      console.error("Failed to close the order", error);
      alert("Failed to close the order. Please try again.");
    }
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">Order ID: {order.id}</Typography>
        <Typography sx={{ marginLeft: "auto", fontWeight: "bold" }}>
          {order.products.length} Items
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {order.products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard product={product.product} quantity={product.quantity} />
            </Grid>
          ))}
        </Grid>

        {/* Button to mark the order as closed */}
        {!order.processed && (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseOrder}
            >
              Inchide
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
