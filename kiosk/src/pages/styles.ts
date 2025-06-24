import { SxPropsElementsInterface } from "@/common/interfaces/mui";

export const classes: SxPropsElementsInterface = {
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "row", // or 'column' if you want the buttons stacked vertically
    marginTop: 0, // remove or set to 0 to ensure full centering
    marginLeft:'34px'
  },
};
