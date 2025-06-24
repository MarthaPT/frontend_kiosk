import { Paper, Grid } from "@mui/material";
import { useDatagridData } from "./useDataGrigData";
import { DataGrid } from "@mui/x-data-grid";
import { datagridStyles } from "@/styles/styles";
import { administrationToolbar } from "@/common/utils/dataGrid/components/AdministrationToolbar";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useSnackbar } from "notistack";
import Sidebar from "../Dashboard/SideBar";
import { CategoryIn } from "@/resources/adminCategories";

const Categories = () => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<CategoryIn>({ defaultValues: {}, mode: "all" });
  const { data, createRow } = useDatagridData({
    onFetchError: () => {
      enqueueSnackbar("Eroare intrariii", { variant: "error" });
    },
    onCreateError: () => {
      enqueueSnackbar("Eroare Creare Categorie", { variant: "error" });
    },
    onCreateSuccess: () => {
      enqueueSnackbar("Succes", { variant: "success" });
    },
    onUpdateError: () => {
      enqueueSnackbar("Eroare Update Categorie", { variant: "error" });
    },
    onUpdateSuccess: () => {
      enqueueSnackbar("Success Update Categorie", { variant: "success" });
    },
    onDeleteError: () => {
      enqueueSnackbar("Eroare Stergere Categorie", { variant: "error" });
    },
    onDeleteSuccess: () => {
      enqueueSnackbar("Success Stergere Categorie", { variant: "success" });
    },
    formMethods: methods,
  });
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={4}
        lg={1.5} // Sidebar takes more or less space based on open state
        sx={{
          transition: "width 0.3s ease", // Smooth transition effect
          overflow: "hidden", // Avoid overflow when sidebar is collapsed
        }}
      >
        <Sidebar back />
      </Grid>

      {/* DataGrid Content */}
      <Grid item xs={8} lg={10} sx={{ flexGrow: 1, overflow: "auto" }}>
        <Paper sx={datagridStyles.paperContent}>
          <FormProvider {...methods}>
            <DataGrid
              {...data}
              pagination
              sx={datagridStyles.grid}
              editMode="row"
              // @ts-ignore
              slots={administrationToolbar}
              slotProps={{
                toolbar: { onCreate: createRow },
              }}
              disableRowSelectionOnClick
            />
            <DevTool control={methods.control} />
          </FormProvider>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Categories;
