import { getDatagridActions } from "@/common/utils/dataGrid/actions/getDatagridAction";
import { renderDataGridCellExpand } from "@/common/utils/dataGrid/helpers";
import FormInputFile from "@/components/react-hook-form-elements/FormInputFile";
import GridCheckboxInput from "@/components/react-hook-form-elements/GridCheckboxInput";
import GridFormInputText from "@/components/react-hook-form-elements/GridFormInputText";
import { Box, Typography } from "@mui/material";
import { GridColDef, GridRowModes } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const GridTextField = ({ field, id }) => {
  const { control, trigger } = useFormContext();
  const name = `${id}.${field}`;

  useEffect(() => {
    trigger();
  }, []);

  return <GridFormInputText name={name} key={name} control={control} />;
};

const renderTextfieldCell = (params) => {
  const { field, id } = params;

  return <GridTextField field={field} id={id} />;
};

export const GridFileInput = ({ field, id }) => {
  const { control, trigger } = useFormContext();
  const name = `${id}.${field}`;

  useEffect(() => {
    // Optionally trigger validation when the component mounts
    trigger(name);
  }, [name, trigger]);

  return <FormInputFile name={name} control={control} accept="image/*" />;
};

const GridCheckbox = ({ field, id }) => {
  const { control } = useFormContext();
  const name = `${id}.${field}`;

  return <GridCheckboxInput name={name} key={name} control={control} />;
};

const renderCheckboxCell = (params) => {
  const { field, id } = params;

  return <GridCheckbox field={field} id={id} />;
};

export const useColumns = ({
  rowsStatus,
  rowModesModel,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}): GridColDef[] => {
  const columns = [
    {
      field: "name",
      headerName: "Nume",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderEditCell: renderTextfieldCell,
      renderCell: renderDataGridCellExpand,
    },
    {
      field: "description",
      headerName: "Descriere",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderEditCell: renderTextfieldCell,
      renderCell: renderDataGridCellExpand,
    },
    {
      field: "image",
      headerName: "Imagine",
      flex: 1,
      editable: true,
      minWidth: 150,
      renderEditCell: (params) => {
        const { id, field } = params;
        return <GridFileInput id={id} field={field} />;
      },
      renderCell: (params) => {
        const imageUrl = params.row.image_url;
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Product"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  textAlign: "center",
                }}
              >
                No Image
              </Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "is_top_category",
      headerName: "Categorie de Top",
      flex: 1,
      editable: true,
      type: "boolean",
      minWidth: 100,
      renderEditCell: renderCheckboxCell,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "actions",
      width: 100,
      getActions: (props) => {
        const { id, row } = props;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        return getDatagridActions({
          row,
          rowStatus: rowsStatus[id],
          isInEditMode,
          onSave,
          onCancel,
          onEdit,
          onDelete,
        });
      },
    },
  ];

  return columns as GridColDef[];
};
