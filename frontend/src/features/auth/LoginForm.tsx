import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { textFieldStyles } from "./styles/textFieldStyles";

import { Box, Button, TextField, Grid, Link } from "@mui/material";
import { AuthPageShell } from "./components/AuthPageShell";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:8000/api/token-auth/", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/app", { replace: true });
    } else {
      setError(data.non_field_errors?.[0] || "Login Failed.");
    }
  };

  return (
    <AuthPageShell title="Log In">
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required fullWidth label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              {...textFieldStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required fullWidth type="password" label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...textFieldStyles}
            />
          </Grid>
        </Grid>

        {error && (
          <Box sx={{ color: "red", mt: 1, fontSize: 14 }}>{error}</Box>
        )}

        <Button
          fullWidth type="submit" variant="contained"
          sx={{
            mt: 4, mb: 2,
            bgcolor: "rgba(243, 227, 8, 1)",
            color: "rgb(49, 62, 70)",
            "&:hover": { bgcolor: "rgba(180, 160, 0, 0.6)" },
          }}
        >
          Log In
        </Button>

        <Grid container justifyContent="flex-start">
          <Grid item>
            <Link component={RouterLink} to="/auth/signup" sx={{ color: "rgba(243, 227, 8, 1)" }}>
              Don't have an account?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthPageShell>
  );
};
