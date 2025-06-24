import { SxPropsElementsInterface } from '@/common/interfaces/mui';

export const DEFAULT_CARD_WIDTH: string = '530px';

export const classes: SxPropsElementsInterface = {
  card: {
    width: '100%',
    minWidth: `${DEFAULT_CARD_WIDTH}`,
  },
  cardHeader: {
    display: 'flex',
    backgroundColor: 'primary.main',
    padding: '10px',
  },
  cardTypography: {
    color: 'primary.contrastText',
  },
};
