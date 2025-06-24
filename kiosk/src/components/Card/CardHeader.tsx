import { Box, Typography } from '@mui/material';
import { classes } from './styles';

interface Props {
    title: string;
    startIcon?: JSX.Element;
  }

  const CardHeader = ({ title, startIcon }: Props) => {
    return (
      <Box sx={classes.cardHeader}>
        {startIcon}
        <Typography sx={classes.cardTypography}>{title}</Typography>
      </Box>
    );
  };
  
  export default CardHeader;
  