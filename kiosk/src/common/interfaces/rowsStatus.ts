export interface RowStatusInterface {
  saveDisabled: boolean;
  deleteDisabled: boolean;
}
export interface RowsStatusInterface {
  [x: string | number]: RowStatusInterface;
}
