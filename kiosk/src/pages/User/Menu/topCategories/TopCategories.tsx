import CardCategories from "@/components/Card/Card";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/common/utils/urlCleaner";
import { useCategories } from "@/resources/adminCategories";
import Loader from "@/components/loader/Loader";
import { enqueueSnackbar } from "notistack";

const TopCategories = () => {
  const navigate = useNavigate();
  const { categories, isError, loading } = useCategories({
    onError: () => loading,
  });
  const handleClick = (id) => {
    const slug = slugify(id);
    navigate(`/${slug}`);
  };

  if (loading) {
    return <Loader />;
  }

  // If there is an error, show an error message
  if (isError) {
    enqueueSnackbar("Eroare intrari", { variant: "error" });
  }

  return (
    <Grid
      container
      spacing={6}
      justifyContent="center"
      alignItems="center"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      {categories
      .filter((item) => item.is_top_category)
      .map((item) => (
        <Grid
        item
        xs={12}
        sm={6}
        md={3}
        key={item.id}
        display="flex"
        justifyContent="center"
        >
        <CardCategories
          title={item.name}
          images={item.image_url}
          onClick={() => handleClick(item.name)}
          sx={{
          cursor: "pointer",
          ":hover": { color: "red", textDecoration: "underline" },
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          }}
        />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCategories;
