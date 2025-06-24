import { Routes, Route } from "react-router-dom";
import "./global.css";
import { mainRoutes } from "./common/routes/mainRoutes";
import { Grid } from "@mui/material";
// import { CartProvider } from "./pages/User/Cart/CartContex";
import { Provider } from 'react-redux';
import store from "./redux/store/store";

const App = () => {
  return (
    <Grid style={{ height: "100vh"}}>
    <Provider store={store}>
        <Routes>
          {mainRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Provider>
    </Grid>
  );
};

export default App;
