import { Outlet } from "react-router-dom";
import { Grid } from '@mui/material';
import Sidebar from "@/pages/Admin/Dashboard/SideBar";

const Layout = () => {
  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Sidebar */}
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      
      {/* Main Content */}
      <Grid item xs={10} sx={{ padding: 2 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;