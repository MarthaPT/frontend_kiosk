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
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: [58, 200 + cartItems.length * 8], // chitanță îngustă, lungime dinamică
  });

  // Antet farmacie
  let y = 8;
  doc.setFontSize(10);
  doc.text("S.C. HELP FARM MDS", 4, y);
  y += 5;
  doc.setFontSize(8);
  doc.text("B-DUL UNIRII BL.B9G1 PARTER", 4, y);
  y += 4;
  doc.text("BUZAU, JUD. BUZAU", 4, y);
  y += 4;
  doc.text("C.F. RO 17759408", 4, y);
  y += 4;
  doc.text('FARMACIA CATENA', 4, y);
  y += 4;
  doc.text("VA MULTUMIM!", 4, y);

  // Linie separatoare
  y += 4;
  doc.setLineWidth(0.2);
  doc.line(2, y, 56, y);
  y += 3;

    // Tabel produse
  doc.setFontSize(8);
  doc.text("Cant    Produs                Pret        Total", 2, y);
  y += 4;

  let totalReducere = 0;
  cartItems.forEach((item, idx) => {
    // Cantitate și denumire
    const prodLine = `${item.quantity} x ${item.name}`;
    // Scrie produsul pe mai multe linii dacă e prea lung
    const maxProdWidth = 28; // lățime maximă pentru denumire (mm)
    const prodLines = doc.splitTextToSize(prodLine, maxProdWidth);

    // Prima linie: cantitate + produs, preț și total pe aceeași linie
    doc.text(prodLines[0], 2, y);
    doc.text(item.price.toFixed(2), 38, y, { align: "right" });
    doc.text((item.price * item.quantity).toFixed(2), 54, y, { align: "right" });

    y += 4;

    // Liniile suplimentare (dacă există), doar denumirea produsului
    for (let i = 1; i < prodLines.length; i++) {
      doc.text(prodLines[i], 8, y); // indentare la dreapta pentru restul liniei
      y += 4;
    }

    // Reducere dacă există
    if (item.discount && item.discount > 0) {
      doc.setTextColor(120, 120, 120);
      doc.text("REDUCERE", 4, y);
      doc.setTextColor(0, 0, 0);
      doc.text(`-${item.discount.toFixed(2)}`, 38, y, { align: "right" });
      totalReducere += item.discount;
      y += 4;
    }
  });

  // Linie separatoare
  doc.line(2, y, 56, y);
  y += 3;

  // Operator și economie
  doc.setFontSize(8);
  doc.text(`Operator: Chiosc Digital`, 2, y);
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.text("ECONOMIE DE:", 2, y);
  doc.setFont("helvetica", "normal");
  doc.text(totalReducere.toFixed(2) + " lei", 38, y, { align: "right" });
  y += 4;

  // Totaluri
  doc.setFontSize(8);
  doc.text(`Total întreg: ${(totalPrice + totalReducere).toFixed(2)}`, 2, y);
  y += 4;
  doc.text(`Total reducere: ${totalReducere.toFixed(2)}`, 2, y);
  y += 4;
  doc.text(`TOTAL: ${totalPrice.toFixed(2)} lei`, 2, y);
  y += 4;

// Linie separatoare
  doc.line(2, y, 56, y);
  y += 3;

// TVA pe cote
  // Dacă ai produse cu TVA diferit, setează-le pe item.tva sau similar!
  let tva9 = 0;
  let tva24 = 0;
  cartItems.forEach((item) => {
    // Exemplu: item.tva = 0.09 sau 0.24 (sau default 0.09)
    const tva = item.tva ?? 0.09;
    const valoare = item.price * item.quantity;
    const tvaVal = valoare * tva / (1 + tva);
    if (tva === 0.09) tva9 += tvaVal;
    else if (tva === 0.24) tva24 += tvaVal;
  });

  // Afișare TVA pe cote
  doc.text(`C  9%:`, 2, y);
  doc.text(tva9.toFixed(2), 54, y, { align: "right" });
  y += 4;
  doc.text(`D 24%:`, 2, y);
  doc.text(tva24.toFixed(2), 54, y, { align: "right" });
  y += 4;
  doc.setFont("helvetica", "bold");
  doc.text(`TVA TOT.`, 2, y);
  doc.text((tva9 + tva24).toFixed(2), 54, y, { align: "right" });
  doc.setFont("helvetica", "normal");
  y += 4;
  // Linie separatoare
  doc.line(2, y, 56, y);
  y += 5;

  // === SECTIUNE NOUA: Order ID evidențiat ===
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`COMANDA NR: ${serie}`, 2, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  // Linie separatoare sub Order ID
  doc.line(2, y, 56, y);
  y += 3;

  // Data și oră
  const data = new Date();
  const dataStr = data
    .toLocaleString("ro-RO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(",", "");
  doc.text(dataStr, 2, y);

  // Footer
  y += 6;
  doc.setFontSize(7);
  doc.text("Va multumim pentru cumparaturi!", 2, y);

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
