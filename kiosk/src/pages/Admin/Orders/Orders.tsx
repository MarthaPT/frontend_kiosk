import { useOrders } from "@/resources/orders";
import Loader from "@/components/loader/Loader";
import { enqueueSnackbar } from "notistack";
import OrderList from "@/components/customAccordion/OrderList";

import { useEffect, useState } from "react";


const Orders = () => {
  const { data: orders, isLoading, isError } = useOrders();
  const [search, setSearch] = useState("");


  if (isLoading) return <Loader />;
  if (isError) {
    enqueueSnackbar({
      variant: "error",
      message: "An error occurred while loading",
    });
    return null;
  }

    const filteredOrders = orders.filter(order =>
      order.products.some(p =>
        p.product?.name?.toLowerCase().includes(search.toLowerCase())
      ) ||
      order.id?.toString().toLowerCase().includes(search.toLowerCase())
    );
  return <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
    <input
            type="text"
            placeholder="Caută produs sau nr.comanda..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginBottom: 16, padding: 8, width: "100%" }}
          />
  <OrderList orders={filteredOrders} />
</div>;
};

export default Orders;
