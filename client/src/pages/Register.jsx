import React from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
      <Paper elevation={6} sx={{ p: 2 }}>
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold" }}
          variant="h4"
          gutterBottom
        >
          Register
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }} gap={1.5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="First Name"
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Last Name"
                type="text"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField fullWidth label="Email" type="email" variant="outlined" />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
          />
          <Button variant="contained" color="success">
            Register
          </Button>
          <Typography sx={{ textAlign: "right" }}>
            Already a User?{" "}
            <Link to="/login">
              <Button>Login Here</Button>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
