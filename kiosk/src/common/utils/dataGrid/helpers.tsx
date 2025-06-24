import { GridCellExpand } from '@/components/gridCellExpand.tsx/GridCellExpand';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const renderDataGridCellExpand = (params: GridRenderCellParams) => {
  const { value, colDef } = params;
  return <GridCellExpand value={value} width={colDef.computedWidth} />;
};
