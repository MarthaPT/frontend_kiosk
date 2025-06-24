import { Button, Grid } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// This type defines a set of common MIME types using a union type. we can add or remove types as needed, depending on the specific requirements of the application
type AcceptableFileTypes =
  | "image/*"
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "application/pdf"
  | "video/*"
  | "video/mp4"
  | "audio/*"
  | "audio/mpeg"
  | "text/plain"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type Props<T extends FieldValues> = {
  name: keyof T;
  control: Control<T>;
  required?: boolean;
  defaultSelectedFile?: File;
  rules?: RegisterOptions;
  accept?: AcceptableFileTypes;
};

export default function FormInputFile<T extends FieldValues>({
  control,
  defaultSelectedFile,
  name,
  accept,
}: Props<T>) {
  const { t } = useTranslation();
  const { setValue, trigger } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(
    defaultSelectedFile || null
  );

  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control as Control<FieldValues>}
        render={({ field }) => (
          <Grid
            container
            alignItems="center"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Grid item>
              <span>{selectedFile ? selectedFile.name : t("")}</span>
            </Grid>
            <Grid item>
              <Button variant="outlined" component="label">
                {t("browse")}
                <input
                  type="file"
                  hidden
                  accept={accept}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      field.onChange(file);
                      setValue("file", file);
                      setSelectedFile(file);
                      trigger("file");
                    }
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        )}
      />
    </>
  );
}
