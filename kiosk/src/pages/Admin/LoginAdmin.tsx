import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { classes } from "../styles";
import React, { useState, useEffect } from "react";

const LoginAdmin = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [realPassword, setRealPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/admin-password.txt")
            .then(res => res.text())
            .then(text => {
                setRealPassword(text.trim());
            })
            .catch(() => setRealPassword(""));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.trim() === realPassword) {
            setError("");
            navigate("/admin");
        } else {
            setError("Parola incorecta");
        }
    };

    return (
        <Grid container sx={classes.grid} direction="column" alignItems="center" justifyContent="center">
            <form
                style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}
                onSubmit={handleSubmit}
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 100 }}>
                    <span style={{ fontWeight: "bold", fontSize: 40, textAlign: "center" }}>
                        LOGARE ADMIN
                    </span>
                </div>
                <FormControl variant="outlined" required>
                    <InputLabel htmlFor="password-input">Parola</InputLabel>
                    <OutlinedInput
                        id="password-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Parola"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label="Parola"
                        endAdornment={
                            <InputAdornment position="end" sx={{ mr: 1 }}>
                                <IconButton
                                    aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
                                    onClick={() => setShowPassword((show) => !show)}
                                    edge="end"
                                    tabIndex={-1}
                                    sx={{ paddingRight: 0, marginRight: 1 }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </IconButton>
                            </InputAdornment>
                        }
                        sx={{ paddingRight: 0, fontSize: 16, marginBottom: 3, borderRadius: 1 }}
                    />
                </FormControl>
                {error && <span style={{ color: "red", fontSize: 14 }}>{error}</span>}
                <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={!password}
                    sx={{
                        fontWeight: "bold",
                        fontSize: 16,
                        borderRadius: 2,
                        textTransform: "none",
                        boxShadow: "none"
                    }}
                >
                    Login
                </Button>
            </form>
        </Grid>
    );
};

export default LoginAdmin;