import {
  Drawer,
  MenuItem,
  Typography,
  SxProps,
  useMediaQuery,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface SidebarProps {
  width?: number;
  children?: React.ReactNode;
  sx?: SxProps | any;
  back?: boolean;
}

const Sidebar = ({ children,  back }: SidebarProps) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(
    "(max-width: 1024px) and (max-height: 1366px)"
  );
  const [open, setOpen] = useState(!isSmallScreen);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (id: string) => {
    const routes: { [key: string]: string } = {
      products: "/products",
      categories: "/categories",
      history: "/history",
    };

    if (routes[id]) {
      navigate(routes[id]);
    } else {
      console.warn(`Unknown navigation target: ${id}`);
    }

    // Close the drawer if on a small screen
    if (isSmallScreen) {
      toggleDrawer();
    }
  };

  const handleBackClick = () => {
    const id = null;
    if (id !== "admin") {
      navigate("/admin");
    }
  };

  return (
    <>
      {/* Add a Menu button for small screens to open the Drawer */}
      {isSmallScreen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          sx={{ position: "fixed", top: 16, left: 16 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"} // Change Drawer variant based on screen size
        open={open}
        onClose={toggleDrawer} // Handle close for temporary drawer
        sx={{
          width: open ? 200 : 60, // Sidebar width (200px when open, 60px when closed)
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? 200 : 60,
            boxSizing: "border-box",
            transition: "width 0.3s ease", // Smooth transition when resizing
          },
        }}
      >
        {!children ? (
          <>
            {back && (
              <Button onClick={handleBackClick}>
                <ArrowBackIcon />
              </Button>
            )}
            <MenuItem
              id="products"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onClick={() => handleClick("products")}
            >
              <Typography variant="body1">Products</Typography>
            </MenuItem>
            <MenuItem
              id="categories"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onClick={() => handleClick("categories")}
            >
              <Typography variant="body1">Categories</Typography>
            </MenuItem>
            <MenuItem
              id="history"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onClick={() => handleClick("history")}
            >
              <Typography variant="body1">History</Typography>
            </MenuItem>
          </>
        ) : (
          children
        )}
      </Drawer>
    </>
  );
};

export default Sidebar;
