import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { classes } from "./styles";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
}

const ConfirmDeletePrompt = ({ onConfirm, onCancel, open }: Props) => {
  const { t } = useTranslation();

  return (
    <Dialog
      sx={classes.dialogContainer}
      fullWidth
      open={open}
      PaperProps={{
        elevation: 0,
      }}
    >
      <DialogContent>
        <Typography fontSize="20px">{t("Esti sigur de stergere?")}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t("cancel")}</Button>
        <Button
          variant="contained"
          onClick={() => {
            onCancel();
            onConfirm();
          }}
        >
          {t("confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeletePrompt;
