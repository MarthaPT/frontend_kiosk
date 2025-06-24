import { Checkbox, CheckboxProps, Grid } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { generalStyles } from '@/styles/generalStyles'; 

export type Props<T extends FieldValues> = {
  name: keyof T;
  control: Control<T>;
  gridWidth?: string;
} & CheckboxProps;

export default function GridCheckboxInput<T extends FieldValues>({
  name,
  control,
  gridWidth = '100%',
  ...checkboxProps
}: Props<T>) {
  return (
    <Grid item width={gridWidth} sx={generalStyles.flexCenter}>
      <Controller
        name={name as Path<T>}
        control={control as Control<FieldValues>}
        render={({ field: { onChange, value } }) => (
          <Checkbox checked={value} onChange={onChange} {...checkboxProps} />
        )}
      />
    </Grid>
  );
}
