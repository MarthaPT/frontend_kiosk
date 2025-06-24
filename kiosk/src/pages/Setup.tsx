import { useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react";
import { User } from "lucide-react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { classes } from "./styles";

const Setup = () => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <Grid container sx={classes.grid} gap={20}>
        <Button
          onClick={() => handleNavigation("admin")}
          variant="contained"
          color="primary"
          startIcon={<UserCog size={52} height={62} width={92} />}
          size="large"
        >
          Admin
        </Button>

        <Button
          onClick={() => handleNavigation("user")}
          variant="contained"
          color="primary"
          startIcon={<User size={52} height={62} width={92} />}
          size="large"
        >
          User
        </Button>

    </Grid>
  );
};

export default Setup;
