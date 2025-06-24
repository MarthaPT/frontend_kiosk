import { Grid, Typography } from "@mui/material";
import CustomAccordion from "./CustomAccordion"; // Import the OrderItemAccordion component

const OrderList = ({ orders }) => {
  return (
    <Grid container spacing={3}>
      {orders?.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            Nici o comanda
          </Typography>
        </Grid>
      ) : (
        orders?.map((order) => (
          <Grid item xs={12} key={order.id}>
            <CustomAccordion order={order} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default OrderList;