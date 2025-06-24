import { Box, Paper, Popper, Typography } from "@mui/material";
import { memo, useRef, useState } from "react";

import { classes } from "./styles";

export interface GridCellExpandProps {
  value: string;
  width: number;
}

export const GridCellExpand = memo((props: GridCellExpandProps) => {
  const { width, value } = props;

  const wrapper = useRef<HTMLDivElement | null>(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showFullCell, setShowFullCell] = useState<boolean>(false);
  const [showPopper, setShowPopper] = useState<boolean>(false);

  const isOverflown = (element: Element): boolean =>
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth;
  const handleMouseEnter = () => {
    if (cellValue.current && cellDiv.current) {
      const isCurrentlyOverflown = isOverflown(cellValue.current);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    }
  };

  return (
    <Box
      ref={wrapper}
      sx={classes.wrapper}
      width={width}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowFullCell(false)}
    >
      <Box ref={cellDiv} sx={classes.cellDiv} width={width} />
      <Box ref={cellValue} sx={classes.cellValue}>
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          sx={{ width }}
        >
          <Paper elevation={0}>
            <Typography variant="body2" sx={classes.text}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});
