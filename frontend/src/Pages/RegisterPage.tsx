import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/authService";

/*
  Register page component
  Sends new user data to backend and stores JWT token
*/
function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await register(firstName, lastName, email, password);

      localStorage.setItem("token", data.token);

      alert("Registration successful!");

      // Redirect new user to vacations page
      navigate("/vacations");
    } catch (error: any) {
      alert(error.response?.data || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            fullWidth
            required
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            label="Last Name"
            fullWidth
            required
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            inputProps={{ minLength: 4 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;