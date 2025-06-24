import {
  Card,
  CardContent,
  SxProps,
  Typography,
  CardMedia,
} from "@mui/material";
interface Props {
  sx?: SxProps;
  title: string;
  onClick?: () => any;
  images?: any;
}

const CardCategories = ({ sx, title, images, onClick }: Props) => {
  return (
    <Card sx={sx} elevation={5} onClick={onClick}>
      <CardMedia
        image={images}
        title={title}
        height="210"
        component="img"
        sx={{ objectFit: "contain", justifyContent: "center", }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={sx}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CardCategories;
