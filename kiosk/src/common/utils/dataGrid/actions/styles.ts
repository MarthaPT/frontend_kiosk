import { SxPropsElementsInterface } from '@/common/interfaces/mui';

export const classes: SxPropsElementsInterface = {
  dialogContainer: {
    '& div[role="dialog"]': {
      maxWidth: '500px',
      position: 'relative',
    },
  },
  dialogActionsContainer: {
    padding: '20px',
  },
};
