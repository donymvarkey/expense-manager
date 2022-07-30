import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/api";
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, navigate, { email, password });
  };

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Paper elevation={6} sx={{ p: 2 }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold" }}
          variant="h4"
          gutterBottom
        >
          Login
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Typography sx={{ textAlign: "right" }}>
            New User?{" "}
            <Link to="/register">
              <Button>Register Here</Button>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
