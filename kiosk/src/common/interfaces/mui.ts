import { CSSProperties } from '@mui/material/styles/createMixins';
import { SystemStyleObject, Theme } from '@mui/system';

export interface SxPropsElementsInterface {
  [key: string]:
    | CSSProperties
    | SystemStyleObject<Theme>
    | ((theme: Theme) => {
        [key: string]: CSSProperties | SystemStyleObject<Theme>;
      });
}
