import { useTranslation } from "react-i18next";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";

export const ActionCellItem = ({
  label,
  onClick,
  icon: Icon,
  color,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <GridActionsCellItem
      icon={
        <Tooltip title={t(label)}>
          <Icon />
        </Tooltip>
      }
      label={t(label)}
      color={color}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
