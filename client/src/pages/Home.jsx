import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import ButtonAppBar from "../components/Appbar";
import DatagridComponent from "../components/DatagridComponent";
import DialogComponent from "../components/DialogComponent";
import { userRequest } from "../requestMethods";

const Home = ({ currentUser }) => {
  const [expenses, setExpenses] = useState([]);
  const getAllExpenses = async () => {
    const data = await userRequest.get("/expenses/");
    setExpenses(data.data.data);
  };

  useEffect(() => {
    getAllExpenses();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <ButtonAppBar currentUser={currentUser} />
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Add new Expense
          </Typography>
          <DialogComponent allExpenses={getAllExpenses} />
        </Paper>
      </Box>

      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 2, height: "auto" }} component="div">
          <DatagridComponent expenses={expenses} />
        </Paper>
      </Box>
    </div>
  );
};

export default Home;
