import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { GridActionsCellItem } from "@mui/x-data-grid";

export const LoadingCellItem = () => {
  const { t } = useTranslation();

  return (
    <GridActionsCellItem
      icon={<CircularProgress size={20} />}
      label={t("loading")}
    />
  );
};
