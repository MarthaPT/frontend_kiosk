import { getDatagridActions } from "@/common/utils/dataGrid/actions/getDatagridAction";
import { renderDataGridCellExpand } from "@/common/utils/dataGrid/helpers";
import FormInputFile from "@/components/react-hook-form-elements/FormInputFile";
import FormSelect from "@/components/react-hook-form-elements/FormSelect";
import { BasicRenderOption, CheckboxOption } from "@/components/react-hook-form-elements/formSelect/RenderOption";
import GridCheckboxInput from "@/components/react-hook-form-elements/GridCheckboxInput";
import GridFormInputText from "@/components/react-hook-form-elements/GridFormInputText";
import { useCategories } from "@/resources/adminCategories";
import { Typography } from "@mui/material";
import { GridColDef, GridRowModes} from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const fetchCastedCategories = () => {
  const { categories: categories } = useCategories({
    onError: () => {
      enqueueSnackbar("Cannot fetch categories"), { variant: "error" };
    },
  });
  return categories.map((categorie) => {
    return {
      id: categorie.id,
      name: categorie.name,
    };
  });
};

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

const GridDropdown = ({ field, id, multiple }) => {
  const { control } = useFormContext();
  const name = `${id}.${field}`;
  const categories = fetchCastedCategories();
  return (
    <FormSelect
      options={categories}
      label=""
      name={name}
      multiple={multiple}
      key={name}
      control={control}
      disableCloseOnSelect={multiple}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) =>
        multiple ? (
          <CheckboxOption
            props={props}
            option={option.name}
            selected={selected}
          />
        ) : (
          <BasicRenderOption
            props={props}
            value={option?.name}
            key={option.id}
          />
        )
      }
    />
  );
};

const renderDropdownCell = (params) => {
  const { field, id } = params;

  return <GridDropdown field={field} id={id} multiple={false} />;
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
      headerName: "Name",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderEditCell: renderTextfieldCell,
      renderCell: renderDataGridCellExpand,
    },
    {
      field: "producer",
      headerName: "Producer",
      flex: 1,
      minWidth: 320,
      editable: true,
      renderEditCell: renderTextfieldCell,
      renderCell: renderDataGridCellExpand,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderEditCell: renderTextfieldCell,
      renderCell: renderDataGridCellExpand,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderEditCell: renderTextfieldCell,
      renderCell: renderDataGridCellExpand,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderEditCell: renderTextfieldCell,
      renderCell: renderDataGridCellExpand,
    },
    {
      field: "category_name",
      headerName: "Category",
      flex: 1,
      minWidth: 120,
      editable: true,
      renderEditCell: renderDropdownCell,
      renderCell: renderDataGridCellExpand,
    },
    // {
    //   field: "subcategory",
    //   headerName: "Subcategory",
    //   flex: 1,
    //   editable: true,
    //   minWidth: 100,
    //   renderEditCell: renderTextfieldCell,
    //   renderCell: renderDataGridCellExpand,
    // },
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      editable: true,
      minWidth: 150,
      renderEditCell: (params) => {
        const { id, field } = params;
        return <GridFileInput id={id} field={field} />;
      },
      renderCell: (params) => {
        const imageUrl = params.row.image_url;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Product"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              maxHeight: "100%",
            }}
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No Image
          </Typography>
        );
      },
    },
    {
      field: "is_top_product",
      headerName: "Top Produs",
      flex: 1,
      editable: true,
      type: "boolean",
      minWidth: 100,
      renderEditCell: renderCheckboxCell,
      // renderCell: renderDataGridCellExpand,
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