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
    <Card sx={{
      width: 220,
      height: 320,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#fff",
      border: "2px solid #4caf50", // chenar verde permanent
      borderRadius: 2,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      cursor: "pointer",
    }}
    elevation={5}
    onClick={onClick}>
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
