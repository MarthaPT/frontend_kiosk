import {
  Grid,
  TextField,
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { datagridStyles } from "@/styles/styles"; 

export type Props<T extends FieldValues> = {
  name: keyof T;
  control: Control<T>;
  variant?: TextFieldVariants;
  rules?: RegisterOptions;
  label?: string;
  gridWidth?: string;
  readOnly?: boolean;
} & TextFieldProps;

const getProperMaxLength = (name: string) => {
  if (name.includes("title")) return 63;
  return null;
};

export default function GridFormInputText<T extends FieldValues>({
  name,
  control,
  // rules = {
  //   ...STRING_VALIDATION_RULE,
  //   maxLength: getProperMaxLength(name) as number | undefined,
  // },
  variant = "standard",
  gridWidth = "100%",
  readOnly,
  ...textFieldProps
}: Props<T>) {
  const { t } = useTranslation();

  return (
    <Grid item width={gridWidth}>
      <Controller
        name={name as Path<T>}
        control={control as Control<FieldValues>}
        // rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error, isTouched },
        }) => (
          <TextField
            autoComplete="off"
            helperText={null}
            error={!!error && isTouched}
            placeholder={!!error && isTouched ? t("emptyWarning") : ""}
            onChange={onChange}
            value={value}
            label=""
            variant={variant}
            inputRef={ref}
            inputProps={{
              sx: datagridStyles.gridTextField,
              readOnly,
              maxLength: getProperMaxLength(name),
            }}
            InputLabelProps={{ shrink: false }}
            onBlur={onBlur}
            fullWidth
            {...textFieldProps}
          />
        )}
      />
    </Grid>
  );
}
