import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import bgImage from "@/assets/images/pharmacy-bg.jpg";

const StartUser = () => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    navigate(`/${id}`);
  };
  return (
    <div
      style={{
      minHeight: "100vh",
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain", // schimbat din "cover" in "contain"
      backgroundPosition: "center",
      backgroundColor: "#fff", // optional: adauga o culoare de fundal pentru zonele goale
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => handleNavigation("user")}
        style={{
          padding: "1.5rem 3rem",
          fontSize: "1.5rem",
          fontWeight: 900,
          borderRadius: "2rem",
          backgroundColor: "#a7cbb7",
          color: "#255c36",
          boxShadow: "0 8px 32px 0 rgba(2, 2, 2, 0.3), 0 0 40px 10px #fff8 inset",
          backdropFilter: "blur(2px)",
          position: "relative",
          zIndex: 2,
          border: "4px solid #255c36",
          transition: "transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s",
          transform: "translateY(-10px)",
          animation: "float 2s ease-in-out infinite",
        }}
      >
        Începe comanda
      </Button>
      <style>
        {`
          @keyframes float {
        0% { transform: translateY(-10px); }
        50% { transform: translateY(-25px); }
        100% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default StartUser;
  