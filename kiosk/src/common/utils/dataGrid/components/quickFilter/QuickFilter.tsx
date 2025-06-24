import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { classes } from './styles';

export const QuickFilter = () => {
  const { t } = useTranslation();

  return (
    <GridToolbarQuickFilter
      debounceMs={400}
      key='quick-filter'
      sx={classes.quickSearch}
      placeholder={`${t('search')}...`}
      quickFilterParser={(searchInput) =>
        searchInput
          .split(',')
          .map((value) => value.trim())
          .filter((value) => value !== '')
      }
      quickFilterFormatter={(quickFilterValues) => quickFilterValues.join(', ')}
    />
  );
};
