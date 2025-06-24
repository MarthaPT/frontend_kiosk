import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const ProductCard = ({ product, quantity }) => {
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: 3,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {product.image_url && (
        <CardMedia
          component="img"
          image={product.image_url}
          alt={product.name}
          sx={{
            height: 200,
            width: "100%",
            objectFit: "cover",
            borderRadius: "16px 16px 0 0",
            marginBottom: 2,
          }}
        />
      )}
      <CardContent
        sx={{
          textAlign: "center",
          flex: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          {product.name}
        </Typography>
        {quantity !== undefined && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: "bold" }}
          >
            {quantity} {quantity > 1 ? 'cantitatii' : 'cantitate'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
