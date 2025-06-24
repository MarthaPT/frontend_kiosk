import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  // Include other properties if needed
}

interface CartSummaryModalProps {
  open: boolean;
  onClose: () => void;
  cartItem: CartItem[];
  totalPrice: number;
  onConfirm: () => void;
}

const CartSummaryModal: React.FC<CartSummaryModalProps> = ({
  open,
  onClose,
  cartItem,
  totalPrice,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="cart-summary-title"
      aria-describedby="cart-summary-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="cart-summary-title"
          variant="h6"
          sx={{ marginBottom: 2 }}
        >
          Rezumat Coș
        </Typography>
        {cartItem.map((item) => (
          <Box key={item.id} sx={{ marginBottom: 1 }}>
             <img src={item.image_url} style={{ width: 160, height: 160, objectFit: 'contain'}}/>
            <Typography variant="body1">
              {item.name} x {item.quantity} -{" "}
              {(item.price * item.quantity).toFixed(2)} Lei
            </Typography>
          </Box>
        ))}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total: {totalPrice.toFixed(2)} Lei
        </Typography>
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={onConfirm}>
          Achitat
        </Button>
      </Box>
    </Modal>
  );
};

export default CartSummaryModal;
