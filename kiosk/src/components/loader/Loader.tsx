import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { classes } from "./styles";

const Loader = () => {
  return (
    <Box sx={classes.loaderStyle}>
      <CircularProgress size={150} />
    </Box>
  );
};

export default Loader;
