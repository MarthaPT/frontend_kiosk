import { SxPropsElementsInterface } from "@/common/interfaces/mui";

export const classes: SxPropsElementsInterface = {
  drawer: {
    "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
    },
    width: 240,
  },
  grid: {
    direction: 'column',
    display: 'flex',
    marginTop: 10,
  }
};
