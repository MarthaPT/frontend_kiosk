import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarProps,
} from "@mui/x-data-grid";
import { Box, Button, Grid, LinearProgress } from "@mui/material";
import { QuickFilter } from "./quickFilter/QuickFilter"; 
import { CustomStack } from "./customStack/CustomStack"; 
import { datagridStyles } from "@/styles/styles";

interface AdministrationToolbarProps extends GridToolbarProps {
  onCreate?: () => void;
  buttonLabel?: string;
}

export const AdministrationToolbar: React.FC<AdministrationToolbarProps> = ({
  onCreate,
  buttonLabel,
  ...other
}) => {
  return (
    <GridToolbarContainer sx={datagridStyles.toolbarContainer} {...other}>
      <Grid container>
        <Grid item xs={12} sm="auto">
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
        </Grid>
        <Grid item flexGrow={1}>
          <QuickFilter />
        </Grid>
        <Grid item xs={12} sm="auto">
          {onCreate && (
            <Button
              color="primary"
              variant="contained"
              onClick={onCreate}
              size="small"
            >
              {buttonLabel || 'Create'}
            </Button>
          )}
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
};

export const administrationToolbar = {
  toolbar: AdministrationToolbar,
  loadingOverlay: LinearProgress,
  noRowsOverlay: CustomStack,
  noResultsOverlay: CustomStack,
};

interface SuggestionsToolbarProps extends GridToolbarProps {
  onCreate?: () => void;
  buttonLabel?: string;
  title?: string;
}

const SuggestionsToolbar: React.FC<SuggestionsToolbarProps> = ({
  onCreate,
  buttonLabel,
  title,
  ...other
}) => {
  return (
    <GridToolbarContainer sx={datagridStyles.cardHeader} {...other}>
      <Grid container>
        <Grid item flexGrow={1} sx={datagridStyles.cardTypographyWrapper}>
          <Box component="span" sx={datagridStyles.cardTypography}>
            {title}
          </Box>
        </Grid>
        <Grid item xs={12} sm="auto">
          {onCreate && (
            <Button
              color="primary"
              variant="contained"
              onClick={onCreate}
              size="small"
            >
              {buttonLabel || 'Create'}
            </Button>
          )}
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
};

export default SuggestionsToolbar;
