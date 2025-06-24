import OrderList from "@/components/customAccordion/OrderList";
import Loader from "@/components/loader/Loader";
import { OrdersOut, useOrders } from "@/resources/orders";
import { Grid, Paper } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Sidebar from "../Dashboard/SideBar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const History = () => {
  const { getProcessed, isError, isLoading } = useOrders();
  const [processedOrders, setProcessedOrders] = useState<OrdersOut[]>([]);
  const [loading, setLoading] = useState(isLoading);
  const [error, setError] = useState(isError);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProcessedOrders = async () => {
      setLoading(true);
      try {
        const response = await getProcessed();
        setProcessedOrders(response);
      } catch (err) {
        console.error("Failed to fetch processed orders:", err);
        setError(true);
        enqueueSnackbar({
          variant: "error",
          message: "An error occurred while loading processed orders",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProcessedOrders();
  }, [getProcessed]);

  if (loading) return <Loader />;
  if (error) {
    return null;
  }


  console.log("salesData", processedOrders); const salesByWeek: { [week: string]: number } = {};

  // În loc de getWeekString, folosește data ca string:
  const salesByDay: { [day: string]: number } = {};

  processedOrders.forEach(order => {
    const dateStr = new Date(order.created_at).toLocaleDateString("ro-RO");
    const total = Array.isArray(order.products)
      ? order.products.reduce(
        (sum, p) =>
          sum +
          (typeof p.product?.price === "number" && typeof p.quantity === "number"
            ? p.product.price * p.quantity
            : 0),
        0
      )
      : 0;
    if (salesByDay[dateStr]) {
      salesByDay[dateStr] += total;
    } else {
      salesByDay[dateStr] = total;
    }
  });

  const salesData = Object.entries(salesByDay)
    .map(([date, total]) => ({
      date,
      total,
    }))
    .sort((a, b) => {
      // Transformă datele din string în Date pentru sortare corectă
      const [dayA, monthA, yearA] = a.date.split('.').map(Number);
      const [dayB, monthB, yearB] = b.date.split('.').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA - dateB;
    });
    const filteredOrders = processedOrders.filter(order =>
      order.products.some(p =>
        p.product?.name?.toLowerCase().includes(search.toLowerCase())
      ) ||
      order.id?.toString().toLowerCase().includes(search.toLowerCase())
    );
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid item xs={2}>
        <Sidebar back={true} />
      </Grid>
      <Grid item xs={9} sx={{ padding: 3 }}>
        <Paper elevation={7} sx={{ padding: 3 }}>
          {/* Graficul vânzărilor */}
          <h3>Grafic vânzări</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" name="Vânzări (RON)" />
            </LineChart>
          </ResponsiveContainer>
          {/* Lista comenzilor */}
          <input
            type="text"
            placeholder="Caută produs sau nr.comanda..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginBottom: 16, padding: 8, width: "100%" }}
          />
          <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
            <OrderList orders={filteredOrders} />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default History;
