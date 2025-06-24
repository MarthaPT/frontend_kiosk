import { useState, useMemo, useCallback } from "react";
import {
  GridRowModesModel,
  GridRowModes,
  DataGridProps,
  GridRowId,
  useGridApiRef,
} from "@mui/x-data-grid";
import { useProducts, ProductsInterface } from "@/resources/adminProduct"; // Import custom hook and service
import { useColumns } from "./useColumns";
import { RowsStatusInterface } from "@/common/interfaces/rowsStatus";
import { trimObjectStrings } from "@/common/utils/objectUtils";
import { SimpleFunction } from "@/common/interfaces/GeneralFunctionTypes";

export const EMPTY_PRODUCT_ROW_ID: number = 0;
const FIELD_TO_FOCUS = "name";
export const EMPTY_PRODUCT_ROW: ProductsInterface = Object.freeze({
  id: EMPTY_PRODUCT_ROW_ID,
  name: "",
  price: 0,
  producer: "",
  description: "",
  stock: 0,
  category: "",
  subcategory: "",
  image_url: "",
  is_top_product: false,
});

interface DatagridDataInterface {
  data: DataGridProps;
  createRow: SimpleFunction;
}

export const useDatagridData = ({
  onFetchError,
  onCreateError,
  onCreateSuccess,
  onUpdateError,
  onUpdateSuccess,
  onDeleteError,
  onDeleteSuccess,
  formMethods,
}): DatagridDataInterface => {
  const {
    products: rows,
    loading,
    create,
    deleteOne,
    update,
    mutate,
  } = useProducts({ onError: onFetchError });
  const { getValues, unregister, reset } = formMethods;
  const apiRef = useGridApiRef();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [rowsStatus, setRowsStatus] = useState<RowsStatusInterface>({});
  const [createInProgress, setCreateInProgress] = useState<boolean>(false);
  const [newRowIndex, setNewRowIndex] = useState<number>(0);
  const editableRows = useMemo(() => {
    if (!createInProgress) {
      return rows;
    }
    const updatedRows = [...rows];
    updatedRows.splice(newRowIndex, 0, EMPTY_PRODUCT_ROW);
    return updatedRows;
  }, [rows, createInProgress, newRowIndex]);

  const columns = useColumns({
    rowsStatus,
    rowModesModel,
    onSave: handleSave,
    onCancel: handleCancel,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  function handleSave(id) {
    updateRowStatus({ id, saveDisabled: true });
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
    const lineData = getValues(id.toString());
    if (id === EMPTY_PRODUCT_ROW_ID) {
      handleRequestCreate(lineData, id);
    } else {
      handleRequestUpdate(lineData, id);
    }
  }

  function handleCancel(id: GridRowId) {
    unregister(id.toString());
    setRowModesModel({
      ...rowModesModel,
      [id]: {
        mode: GridRowModes.View,
        ignoreModifications: true,
      },
    });
    if (id === EMPTY_PRODUCT_ROW_ID) {
      setCreateInProgress(false);
    }
  }

  function handleEdit(row: ProductsInterface) {
    const { id, ...rowData } = row;
    reset((formValues) => ({
      ...formValues,
      [id]: rowData,
    }));
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  }

  async function handleDelete(id: number) {
    updateRowStatus({ id, deleteDisabled: true });
    try {
      await deleteOne(id);
      mutate((current) => current?.filter((el) => el.id !== id));
      onDeleteSuccess();
    } catch {
      onDeleteError();
    } finally {
      updateRowStatus({ id, deleteDisabled: false });
    }
  }

  const handleCreateEmptyRow = useCallback(() => {
    const { page, pageSize } = apiRef.current.state.pagination.paginationModel;
    const { id, ...newRow } = EMPTY_PRODUCT_ROW;
    setCreateInProgress(true);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: {
        mode: GridRowModes.Edit,
      },
    }));
    setNewRowIndex(page * pageSize);
    reset((formValues) => ({
      ...formValues,
      [id]: newRow,
    }));
    apiRef.current.setCellFocus(id, FIELD_TO_FOCUS);
    apiRef.current.scrollToIndexes({
      rowIndex: id,
    });
  }, []);

  function updateRowStatus({ id, ...rest }) {
    setRowsStatus((prevRowStatus) => ({
      ...prevRowStatus,
      [id]: { ...prevRowStatus[id], ...rest },
    }));
  }

  async function handleRequestCreate(data: ProductsInterface, id: number) {
    // Ensure price and stock are numbers
    const apiData = {
      ...trimObjectStrings(data),
      price: Number(data.price),
      stock: Number(data.stock),
      image: data.image,
    };
  
    console.log("Data being sent to create product:", apiData); // Log the data to verify if everything is correct
  
    try {
      const response = await create(apiData);
      if (response) {
        mutate((current) => {
          if (!current) return [];
          return [...current, response];
        });
      }
      onCreateSuccess();
    } catch (error) {
      console.error("Error creating product:", error); // Log any error that occurs during product creation
      onCreateError();
    } finally {
      setCreateInProgress(false);
      updateRowStatus({ id, saveDisabled: false });
    }
  }

  async function handleRequestUpdate(data: ProductsInterface, id: number) {
    const apiData = {
      ...trimObjectStrings(data),
      image: data.image, // Include the image file
    };

    console.log(apiData);
    try {
      const response = await update(id, apiData);
      if (response) {
        mutate((current) => {
          return current?.map((element) => {
            if (element.id === id) {
              return response;
            }
            return element;
          });
        });
        onUpdateSuccess();
      }
    } catch {
      onUpdateError();
    } finally {
      updateRowStatus({ id, saveDisabled: false });
    }
  }

  const handleEditableCells = ({ id }) => {
    if (rowsStatus[id]?.saveDisabled || rowsStatus[id]?.deleteDisabled) {
      return false;
    }
    return true;
  };

  return {
    data: {
      rows: editableRows,
      columns,
      loading,
      rowModesModel,
      apiRef,
      isCellEditable: handleEditableCells,
    },
    createRow: handleCreateEmptyRow,
  };
};
