import { SxPropsElementsInterface } from "@/common/interfaces/mui";

export const classes: SxPropsElementsInterface = {
  wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cellDiv: {
    height: "100%",
    display: "block",
    position: "absolute",
    top: "0px",
    whiteSpace: "nowrap",
  },
  cellValue: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  text: {
    padding: "8px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
};
