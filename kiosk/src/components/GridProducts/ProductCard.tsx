import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
  CardActions,
} from "@mui/material";

export type Props = {
  product: any;
  onClick?: () => void;
  addToCart?: any; // Add the prop here for addToCart
};

const AVAILABILITY = ["In stoc", "Indisponibil"];

export const ProductCard = ({ product, onClick, addToCart }: Props) => {
  return (
    <Card
      sx={{
        width: 220, // Fixed width for all cards
        height: 400, // Ensure consistent card height for all cards
        display: "flex",
        flexDirection: "column", // Stack content vertically
        justifyContent: "space-between", // Distribute content evenly
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#fff", // fundal alb pentru contrast
        border: "1.5px solid #bdbdbd", // chenar vizibil gri
        borderRadius: 2, // colțuri rotunjite
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)", // umbră discretă
        "&:hover": {
          border: "2px solid #4caf50", // chenar verde la hover
            "& .product-title": {
              color: "red",
              textDecoration: "underline",
          },
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.image_url}
        alt={product.title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent sx={{ flexGrow: 1, p: 0.5 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            transition: "color 0.3s ease",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit the title to 2 lines
            minHeight: 65,
          }}
          className="product-title"
        >
          {product.name}
        </Typography>

        <Divider sx={{ my: 5 }} />
        <Typography variant="h5" color="error">
          {product.price} Lei
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 0.5, width: "100%" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#4caf50", color: "white", width: "100%" }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card's onClick
            addToCart(product); // Pass the product to add to cart
          }}
          disabled={product.stock <= 0} // Disable button if stock is less than or equal to 0
        >
          Adaugă în coș
        </Button>
      </CardActions>
      <Typography variant="body2" color="green">
        {product.stock > 0 ? AVAILABILITY[0] : AVAILABILITY[1]}
      </Typography>
    </Card>
  );
};
