import { Box, Container, Grid, Typography, Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React, { useRef, useState, useEffect } from "react";

import TopCategories from "./topCategories/TopCategories";
import UserSidebar from "./sideBar/UserSidebar";
import CarouselProducts from "./Carousel/Carousel";
import SearchBar from "./SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import { CartProvider } from "../Cart/CartContex";
import { useParams } from "react-router-dom";

const SCROLLBAR_WIDTH = 30;

const UserMenu = () => {
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);

  // Scrollbar custom pentru zona de produse
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(40);

  const updateThumb = () => {
    const el = contentRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const ratio = clientHeight / scrollHeight;
    const height = Math.max(ratio * (clientHeight - 60), 40);
    const top = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - height - 60) + 30;
    setThumbHeight(height);
    setThumbTop(isNaN(top) ? 30 : top);
  };

  useEffect(() => {
    updateThumb();
    const el = contentRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);
    return () => {
      el.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  const handleScroll = (direction: "up" | "down") => {
    if (contentRef.current) {
      const scrollAmount = 300;
      contentRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Scrollbar custom pentru coș
  const cartRef = useRef<HTMLDivElement>(null);
  const [cartThumbTop, setCartThumbTop] = useState(0);
  const [cartThumbHeight, setCartThumbHeight] = useState(40);

  const updateCartThumb = () => {
    const el = cartRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const ratio = clientHeight / scrollHeight;
    const height = Math.max(ratio * (clientHeight - 60), 40);
    const top = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - height - 60) + 30;
    setCartThumbHeight(height);
    setCartThumbTop(isNaN(top) ? 30 : top);
  };

  useEffect(() => {
    updateCartThumb();
    const el = cartRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateCartThumb);
    window.addEventListener("resize", updateCartThumb);
    return () => {
      el.removeEventListener("scroll", updateCartThumb);
      window.removeEventListener("resize", updateCartThumb);
    };
  }, []);

  const handleCartScroll = (direction: "up" | "down") => {
    if (cartRef.current) {
      const scrollAmount = 300;
      cartRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", height: "100%" }}>
      <CartProvider>
        <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
          <Grid container spacing={2} sx={{ height: "100vh" }}>
            {/* Left Side - User Sidebar */}
            <Grid item xs={1}>
              <UserSidebar />
            </Grid>
            {/* Middle - SearchBar, TopCategories, CarouselProducts */}
            <Grid
              item
              xs={8.2}
              ref={contentRef}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: 0,
                overflowY: "auto",
                maxHeight: "100vh",
                position: "relative",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {/* Floating SearchBar */}
              <Box
                sx={{
                  width: "100%",
                  position: "sticky",
                  top: 0,
                  zIndex: 2,
                  backgroundColor: "background.paper",
                  boxShadow: 1,
                  pb: 1,
                }}
              >
                <SearchBar />
              </Box>
              <Box
              sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              marginTop: 1,
              marginBottom: 3,
              width: "100%",
              }}
            >
              <TopCategories />
            </Box>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Top Produse
              </Typography>
              <Box sx={{ width: "80%" }}>
                <CarouselProducts />
              </Box>
            </Grid>
            {/* Scrollbar custom pentru zona de produse */}
            <Box
              sx={{
                position: "absolute",
                top: "1vh",
                left: "calc(75% + 8px)", // 75% pentru xs={1}+xs={8} din 12, +8px pentru spacing
                height: "98vh",
                width: `${SCROLLBAR_WIDTH}px`,
                background: "#e0e0e0",
                zIndex: 2000,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "16px",
                boxShadow: 2,
                justifyContent: "space-between",
                py: 1,
                borderLeft: "1px solid #bdbdbd",
              }}
            >
              {/* Buton sus */}
              <Button
                variant="text"
                sx={{
                  minWidth: SCROLLBAR_WIDTH,
                  minHeight: 28,
                  borderRadius: "15px",
                  background: "transparent",
                  boxShadow: "none",
                  mt: 0.5,
                  p: 0,
                  color: "#222",
                  "&:hover": { background: "#f0f0f0" },
                }}
                onClick={() => handleScroll("up")}
              >
                <ArrowUpwardIcon fontSize="small" />
              </Button>
              {/* Thumb */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "12px",
                  borderRadius: "8px",
                  background: "#444",
                  opacity: 0.8,
                  top: `${thumbTop}px`,
                  height: `${thumbHeight}px`,
                  transition: "top 0.1s, height 0.1s",
                }}
              />
              {/* Buton jos */}
              <Button
                variant="text"
                sx={{
                  minWidth: SCROLLBAR_WIDTH,
                  minHeight: 28,
                  borderRadius: "8px",
                  background: "transparent",
                  boxShadow: "none",
                  mb: 0.5,
                  p: 0,
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: "#222",
                  "&:hover": { background: "#f0f0f0" },
                }}
                onClick={() => handleScroll("down")}
              >
                <ArrowDownwardIcon fontSize="small" />
              </Button>
            </Box>
            {/* Right Side - Cart */}
            <Grid
              item
              xs={2}
              sx={{
                borderLeft: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                position: "relative",
              }}
            >
              {/* Container scrollabil pentru coș */}
              <Box
                id="cart-scrollable"
                ref={cartRef}
                sx={{
                  overflowY: "auto",
                  maxHeight: "100vh",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                  flex: 1,
                  height: "100vh",
                  position: "fixed",
                }}
              >
                <Cart />
                {/* Scrollbar custom pentru coș - copil absolut al containerului scrollabil */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "100%",
                    width: "15px",
                    background: "#fff",
                    zIndex: 2000,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "14px",
                    boxShadow: 2,
                    justifyContent: "space-between",
                    pt: "6px",
                    pb: "6px",
                  }}
                >
                  {/* Buton sus */}
                  <Button
                    variant="text"
                    sx={{
                      minWidth: "28px",
                      minHeight: "28px",
                      borderRadius: "15px",
                      background: "transparent",
                      boxShadow: "none",
                      mt: 0.5,
                      p: 0,
                      color: "#222",
                      "&:hover": { background: "#f0f0f0" },
                    }}
                    onClick={() => handleCartScroll("up")}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                  </Button>
                  {/* Thumb */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "12px",
                      borderRadius: "8px",
                      background: "#444",
                      opacity: 0.8,
                      top: `${cartThumbTop}px`,
                      height: `${cartThumbHeight}px`,
                      transition: "top 0.1s, height 0.1s",
                    }}
                  />
                  {/* Buton jos */}
                    <Button
                    variant="text"
                    sx={{
                      minWidth: "28px",
                      minHeight: "28px",
                      borderRadius: "15px",
                      background: "transparent",
                      boxShadow: "none",
                      mb: 0.5,
                      p: 0,
                      color: "#222",
                      "&:hover": { background: "#f0f0f0" },
                    }}
                    onClick={() => handleCartScroll("down")}
                    >
                    <ArrowDownwardIcon fontSize="small" />
                    </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CartProvider>
    </Container>
  );
};

export default UserMenu;