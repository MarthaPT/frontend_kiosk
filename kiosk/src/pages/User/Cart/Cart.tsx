import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { OrdersService } from "@/resources/orders";
import { RemoveCircleOutline } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import { useCart } from "./CartContex"; // Import useCart hook
import { useState } from "react";
import CartSummaryModal from "@/components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { clearCart, setZeroQuantity, decreaseQuantity, increaseQuantity } from "@/redux/cart/cartSlices";

import jsPDF from "jspdf";

function genereazaChitanta(cartItems, totalPrice, serie) {
  const doc = new jsPDF();

  // Antet
  doc.setFontSize(18);
  doc.text("FARMA", 10, 15);
  doc.setFontSize(14);
  doc.text("CHITANTA FISCALA", 10, 25);

  // Dată și serie
  const data = new Date();
  const dataStr = data.toLocaleString("ro-RO");
  doc.setFontSize(12);
  doc.text(`Serie: ${serie}`, 150, 15);
  doc.text(`Data: ${dataStr}`, 150, 22);

  // Linie de tabel
  let y = 35;
  doc.setFontSize(12);
  doc.text("Nr.", 10, y);
  doc.text("Produs", 25, y);
  doc.text("Cant.", 100, y);
  doc.text("Pret", 120, y);
  doc.text("Total", 150, y);
  y += 7;
  doc.line(10, y, 200, y);
  y += 5;

  // Produse
  cartItems.forEach((item, idx) => {
    doc.text(`${idx + 1}`, 12, y);

    // Spargem numele produsului în linii de max 25 caractere
    const maxNameLength = 30;
    const nameLines: string[] = [];
    for (let i = 0; i < item.name.length; i += maxNameLength) {
      nameLines.push(item.name.slice(i, i + maxNameLength));
    }

    // Scriem fiecare linie a numelui
    nameLines.forEach((line, lineIdx) => {
      doc.text(line, 30, y + lineIdx * 5);
    });

    // Scriem restul informațiilor pe prima linie
    doc.text(`${item.quantity}`, 102, y);
    doc.text(`${item.price.toFixed(2)} RON`, 120, y);
    doc.text(`${(item.price * item.quantity).toFixed(2)} RON`, 150, y);

    // Creștem y cu 5 pentru fiecare linie suplimentară, plus spațiu între produse
    y += 5 * nameLines.length + 2;
  });

  // Total general
  y += 5;
  doc.setFontSize(13);
  doc.text(`TOTAL: ${totalPrice.toFixed(2)} RON`, 120, y);

  // Semnătură
  y += 20;
  doc.setFontSize(12);
  doc.text("Semnatura vanzator:", 10, y);
  doc.text("__________________", 60, y);

  // Mulțumire
  y += 15;
  doc.setFontSize(11);
  doc.text("Va multumim pentru cumparaturi!", 10, y);

  // Salvează PDF
  doc.save(`chitanta_${serie}.pdf`);
}

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false); // For cart summary modal
  const [isSaleCompletedModalOpen, setSaleCompletedModalOpen] = useState(false); // For sale completed modal

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirm = async () => {
    try {
      // Loop through cartItems and create an order for each item
      const orderData = {
        products: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };
      // @ts-ignore
      const response = await OrdersService.createOrder(orderData);

      const orderSerie = response.id?.toString() || "fara_serie";

      // Generate receipt after order creation
      genereazaChitanta(cartItems, totalPrice, orderSerie);

      // Clear the cart, close modal, and show sale confirmation
      dispatch(clearCart());  // Clear the cart
      setModalOpen(false); // Close the cart summary modal
      setSaleCompletedModalOpen(true); // Open the sale completed modal
    } catch (error) {
      console.error("Failed to create order", error);
      // Show a visual error modal for insufficient stock or other errors
      setModalOpen(false);
      setSaleCompletedModalOpen(false);
      // Show a full-screen modal with error message
      const errorBox = document.createElement("div");
      errorBox.style.position = "fixed";
      errorBox.style.top = "0";
      errorBox.style.left = "0";
      errorBox.style.width = "100vw";
      errorBox.style.height = "100vh";
      errorBox.style.background = "rgba(255,0,0,0.85)";
      errorBox.style.display = "flex";
      errorBox.style.flexDirection = "column";
      errorBox.style.alignItems = "center";
      errorBox.style.justifyContent = "center";
      errorBox.style.zIndex = "9999";
      errorBox.innerHTML = `
        <div style="background: white; padding: 32px 48px; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); text-align: center;">
          <h2 style="color: #d32f2f; margin-bottom: 16px;">Eroare la procesarea comenzii</h2>
          <p style="font-size: 1.2rem; color: #333; margin-bottom: 24px;">
        Stoc insuficient pentru unul sau mai multe produse din coș.<br/>
        Vă rugăm să verificați cantitățile și să încercați din nou.
          </p>
          <button id="closeErrorModal" style="background: #d32f2f; color: white; border: none; border-radius: 8px; padding: 12px 32px; font-size: 1rem; cursor: pointer;">
        Închide
          </button>
        </div>
      `;
      document.body.appendChild(errorBox);
      document.getElementById("closeErrorModal")?.addEventListener("click", () => {
        document.body.removeChild(errorBox);
      });
    }
  };

  return (
    <Box sx={{ width: 400, padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2, marginTop: 2 }}>
        Coș de cumpărături
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Coșul este gol</Typography>
      ) : (
        cartItems.map((item) => (
          <Card
            key={item.id}
            sx={{
              marginBottom: 2,
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 150, objectFit: "contain" }}
                image={item.image_url}
                alt={item.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "green", fontSize: 20 }}
                >
                  {item.price} Lei
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 1 }}
                >
                  {/* Decrease Quantity Button */}
                  <IconButton
                    size="small"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    <RemoveCircleOutline />
                  </IconButton>

                  <Typography
                    sx={{
                      marginLeft: 1,
                      marginRight: 1,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {item.quantity}
                  </Typography>

                    {/* Increase Quantity Button */}
                    <IconButton
                    size="small"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                    <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                      {/* Spacer to push remove button to the right */}
                      <Box sx={{ flex: 1 }} />
                      {/* Remove Item (Set Quantity to Zero) */}
                      <IconButton
                      size="small"
                      color="error"
                      onClick={() => dispatch(setZeroQuantity(item.id))}
                      aria-label="Remove item"
                      >
                      <span style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1 }}>×</span>
                      </IconButton>
                </Box>
              </CardContent>
            </Box>
          </Card>
        ))
      )}
      {cartItems.length !== 0 && (
        <Typography>Total: {totalPrice.toFixed(2)} Lei</Typography>
      )}
      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button
          variant="contained"
          sx={{
        backgroundColor: "green",
        color: "white",
        borderRadius: "20px",
        flex: 1,
        "&:hover": {
          backgroundColor: "darkgreen",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
          }}
          onClick={() => setModalOpen(true)} // Open the cart summary modal
          disabled={cartItems.length === 0} // Disable if cart is empty
        >
          Platește coșul
          <AddShoppingCartIcon sx={{ marginLeft: 1 }} />
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{
        borderRadius: "20px",
        flex: 1,
        fontWeight: "bold",
        borderWidth: 2,
        borderColor: "#d32f2f",
        "&:hover": {
          backgroundColor: "#ffeaea",
          borderColor: "#b71c1c",
        },
          }}
          onClick={() => dispatch(clearCart())}
          disabled={cartItems.length === 0}
        >
          Golește coșul
        </Button>
      </Box>

      {/* Cart Summary Modal */}
      <CartSummaryModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        cartItem={cartItems}
        totalPrice={totalPrice}
        onConfirm={handleConfirm}
      />

      {/* Sale Completed Modal */}
      <Modal
        open={isSaleCompletedModalOpen}
        onClose={() => setSaleCompletedModalOpen(false)}
        aria-labelledby="sale-completed-title"
        aria-describedby="sale-completed-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            id="sale-completed-title"
            variant="h6"
            sx={{ marginBottom: 2 }}
          >
            Vânzare efectuată
          </Typography>
          <Button
            variant="contained"
            onClick={() => setSaleCompletedModalOpen(false)}
          >
            OK
          </Button>
          
        </Box>
      </Modal>
    </Box>
  );
};

export default Cart;
