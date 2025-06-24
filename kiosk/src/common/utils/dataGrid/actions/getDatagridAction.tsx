import { GridRowModel } from "@mui/x-data-grid";
import { Save, Cancel, Edit, Delete } from "@mui/icons-material";
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { isEqual } from "lodash";
import { trimObjectStrings } from "../../objectUtils";
import { useState } from "react";
import { LoadingCellItem } from "./LoadingCell"; 
import { ActionCellItem } from "./ActionCell"; 
import {
  RowsStatusInterface,
  RowStatusInterface,
} from '../../../interfaces/rowsStatus'
import ConfirmDeletePrompt from "./ConfirmDeletePrompt";

export interface DatagridActions {
  row: GridRowModel;
  rowStatus: RowsStatusInterface;
  isInEditMode: boolean;
  isReadOnly?: boolean;
  isNotDeletable?: boolean;
  onSave: (id: number) => void;
  onCancel: (id: number) => void;
  onEdit: (row: GridRowModel) => void;
  onDelete: (id: number) => void;
}

const DEFAULT_ROW_STATUS: RowStatusInterface = {
  saveDisabled: false,
  deleteDisabled: false,
};

const DeleteActionCellItem = ({ loading, onClick, icon }) => {
  if (loading) {
    return <LoadingCellItem />;
  }

  return (
    <ActionCellItem
      label="delete"
      icon={icon}
      color="secondary"
      onClick={onClick}
      disabled={loading}
    />
  );
};

const SaveActionCellItem = ({ row, loading, onClick, icon }) => {
  const { id, ...rowData } = row;
  const { control } = useFormContext();
  const { errors } = useFormState({ control });
  const currentState = useWatch({ name: id.toString() });
  const hasErrors = Boolean(errors[id]);

  const isDuplicate = (() => {
    if (currentState) {
      return isEqual(
        trimObjectStrings(currentState),
        trimObjectStrings(rowData)
      );
    }
    return false;
  })();

  if (loading) {
    return <LoadingCellItem />;
  }

  return (
    <ActionCellItem
      label="save"
      icon={icon}
      color="primary"
      onClick={onClick}
      disabled={loading || hasErrors || isDuplicate}
    />
  );
};

export const getDatagridActions = ({
  row,
  rowStatus,
  isInEditMode = false,
  isReadOnly = false,
  isNotDeletable = false,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: DatagridActions) => {
  const { saveDisabled, deleteDisabled } = rowStatus || DEFAULT_ROW_STATUS;
  const { id } = row;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const editProps = {
    onClick: () => (deleteDisabled ? null : onEdit(row)),
    color: deleteDisabled ? "" : "primary",
  };

  if (isInEditMode || saveDisabled) {
    const cancelLoadingProps = {
      onClick: () => (saveDisabled ? null : onCancel(id)),
      color: saveDisabled ? "" : "secondary",
    };

    return [
      <SaveActionCellItem
        row={row}
        loading={saveDisabled}
        onClick={() => onSave(id)} // to track
        icon={Save}
      />,
      <ActionCellItem
        label="cancel"
        icon={Cancel}
        {...cancelLoadingProps}
        disabled={false}
      />,
    ];
  }
  return [
    <>
      {!isReadOnly && (
        <ActionCellItem
          label="edit"
          icon={Edit}
          {...editProps}
          disabled={false}
        />
      )}
      {!isNotDeletable && (
        <DeleteActionCellItem
          loading={deleteDisabled}
          onClick={() => setOpenDeleteModal(true)}
          icon={Delete}
        />
      )}
      <ConfirmDeletePrompt
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={() => onDelete(id)}
        open={openDeleteModal}
      />
    </>,
  ];
};
