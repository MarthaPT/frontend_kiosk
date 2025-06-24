import { SxPropsElementsInterface } from "@/common/interfaces/mui";

export const datagridStyles: SxPropsElementsInterface = {
  paperContent: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100%",
    width: "100%",
  },
  circularLoader: {
    margin: "auto",
  },
  toolbarContainer: {},
  grid: {
    width: "100%",
    flexGrow: "1",
    border: "none",
    "& .MuiDataGrid-columnHeader": {
      "&:focus": {
        outline: "none",
      },
      "&:focus-within": {
        outline: "none",
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        padding: "0px",
      },
    },
    "& .MuiDataGrid-iconButtonContainer": {
      paddingRight: "6px",
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      justifyContent: "center",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },
    "& .MuiDataGrid-panel": {
      display: "flex",
    },
    "& .MuiDataGrid-overlayWrapper": {
      minHeight: "30% !important",
    },
  },
  gridTextField: {
    "&::placeholder": {
      color: "error.light",
      opacity: 1,
      maxWidth: "100%",
    },
    padding: "10px",
    textOverflow: "ellipsis",
  },
  gridDatepickerField: {
    width: "100%",
    "& .MuiTextField-root": {
      marginBottom: "0",
      marginTop: "0",
    },
    "& .MuiInputBase-root": {
      paddingTop: "11px",
    },
  },
  updateMessageContainer: {
    display: "flex",
    marginRight: "20px",
    marginLeft: "auto",
  },
  updateMessage: {
    marginLeft: "10px",
  },
  cardHeader: {
    display: "flex",
    backgroundColor: "primary.main",
    padding: "6px 9px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  },
  cardTypographyWrapper: {
    display: "flex",
    alignItems: "center",
  },
  cardTypography: {
    color: "primary.contrastText",
    fontSize: "16px",
  },
  suggestionFormContainer: {
    flexDirection: "column",
    padding: "8px 24px 24px",
  },
};
