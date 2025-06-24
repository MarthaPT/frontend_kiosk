import {
    Autocomplete,
    AutocompleteProps,
    Grid,
    TextField,
    TextFieldVariants,
  } from '@mui/material';
  import {
    Controller,
    Control,
    FieldValues,
    RegisterOptions,
    Path,
  } from 'react-hook-form';
  import { useEffect, useState } from 'react';
  import { useTranslation } from 'react-i18next';
  import {
    ARRAY_VALIDATION_RULE,
    DEFAULT_VALIDATION_RULE,
  } from '@/constants/rules';
  
  export type Props<T extends FieldValues, K> = {
    name: Path<T>;
    control: Control<T>;
    variant?: TextFieldVariants;
    rules?: RegisterOptions;
    gridWidth?: string;
    readOnly?: boolean;
    label?: string;
    multiple?: boolean;
    required?: boolean;
    startAdornment?: JSX.Element;
    inDataGrid?: boolean;
    xs?: number;
  } & Omit<AutocompleteProps<K, boolean, false, false>, 'renderInput'>;
  
  export default function FormSelect<T extends FieldValues, K>({
    name,
    control,
    label = '',
    options,
    multiple = false,
    rules = multiple ? ARRAY_VALIDATION_RULE : DEFAULT_VALIDATION_RULE,
    readOnly,
    required = true,
    defaultValue,
    variant = 'outlined',
    gridWidth = '100%',
    startAdornment,
    onChange: handleChange,
    inDataGrid = false,
    xs,
    ...autocompleteProps
  }: Props<T, K>) {
    const { t } = useTranslation();
  
    return (
      <Grid item width={gridWidth} xs={xs}>
        <Controller
          name={name}
          control={control as Control<FieldValues>}
          rules={required ? rules : { validate: () => true }}
          render={({
            field: { onChange, value, ref },
            fieldState: { error, isDirty },
          }) => {
            const [isTouched, setIsTouched] = useState(false);
            useEffect(() => {
              if (isDirty) setIsTouched(true);
            }, [isDirty]);
  
            return (
              <Autocomplete
                {...autocompleteProps}
                options={options}
                fullWidth
                multiple={multiple}
                value={multiple ? value ?? [] : value ?? null}
                noOptionsText={t('noOptions')}
                onChange={(_, selectedItem, reason, details) => {
                  if (handleChange) {
                    handleChange(_, selectedItem as any, reason, details as any);
                  }
                  onChange(selectedItem);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant={variant}
                    label={label}
                    error={inDataGrid ? isTouched && !!error : !!error}
                    required={required}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: multiple ? (
                        <>
                          {startAdornment}
                          {params.InputProps.startAdornment}
                        </>
                      ) : (
                        startAdornment
                      ),
                    }}
                    inputRef={ref}
                  />
                )}
              />
            );
          }}
        />
      </Grid>
    );
  }