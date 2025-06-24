import { HTMLAttributes } from "react";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props<T> {
  props: HTMLAttributes<HTMLLIElement>;
  value: T;
}

export const BasicRenderOption = ({ props, value }: Props<string>) => {
  return (
    <Box component="li" {...props}>
      <Typography>{value}</Typography>
    </Box>
  );
};

export const CheckboxOption = ({ props, option, selected }) => {
  return (
    <Grid {...props}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
      />
      {option}
    </Grid>
  );
};
