import Sidebar from "@/pages/Admin/Dashboard/SideBar";
import { Button, Grid, MenuItem, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { slugify } from "@/common/utils/urlCleaner";
import { useCategories } from "@/resources/adminCategories";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "@/components/loader/Loader";
import { useSnackbar } from "notistack";

const UserSidebar = () => {
  const location = useLocation();
  const isUserPage = location.pathname === "/user";
  const { categories, isError, loading } = useCategories({
    onError: () => loading,
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = (id) => {
    const slug = slugify(id);
    navigate(`/${slug}`);
  };

  const handleBackClick = () => {
    navigate('/user');
  };

  if (loading) {
    return <Loader />;
  }

  // If there is an error, show an error message
  if (isError) {
    enqueueSnackbar("Eroare intrari", { variant: "error" });
  }

  return (
    <Grid container sx={{ width: 160 }}>
      <Sidebar back={!isUserPage}>
        {!isUserPage && (
          <Button onClick={handleBackClick}>
            <ArrowBackIcon />
          </Button>
        )}

        {categories
          .filter((item) => !item.is_top_category)
          .map((item) => (
            <MenuItem
              key={item.id}
              sx={{ marginTop: 6, display: "flex", justifyContent: "center" }}
              onClick={() => handleClick(item.name)}
            >
              <Typography variant="h6">{item.name}</Typography>
            </MenuItem>
          ))}
      </Sidebar>
    </Grid>
  );
};

export default UserSidebar;
