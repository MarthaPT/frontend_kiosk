import { SxPropsElementsInterface } from "@/common/interfaces/mui";

export const classes: SxPropsElementsInterface = {
    inputLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      fontWeight: 900,
      color: 'text.primary',
      whiteSpace: 'normal',
    },
    paper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      border: '1px dashed #ccc',
      mt: '8px',
    },
    icon: { mr: 2, color: 'primary.main' },
    wrapper: { display: 'flex', alignItems: 'center' },
  };