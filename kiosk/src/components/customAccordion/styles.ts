import { SxPropsElementsInterface } from '@/common/interfaces/mui';

export const classes: SxPropsElementsInterface = {
  panelSummary: {
    flexDirection: 'row-reverse',
    '.MuiSvgIcon-root': {
      height: '20px',
      borderRadius: '2px',
      backgroundColor: 'primary.main',
      gap: '10px',
      margin: '10px',
    },
    '.MuiAccordionSummary-content': {
      lineHeight: '30px',
      marginRight: '10px',
      letterSpacing: '1px',
      fontWeight: 900,
    },
  },
};