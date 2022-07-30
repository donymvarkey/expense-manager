import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { InputAdornment } from "@mui/material";
import SaveIcon from "@mui/icons-material/SaveRounded";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { categories, months } from "../data";
import { userRequest } from "../requestMethods";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ allExpenses }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveExpense = async () => {
    const res = await userRequest.post("/expenses/", {
      amount,
      category,
      month,
      description,
    });

    allExpenses();
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        color="success"
      >
        Add Expense
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            width: 600,
          },
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Add New Expense
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="input-with-icon-textfield"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          <Grid mt={1} mb={1.5} container spacing={1}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                id="outlined-basic"
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                select
              >
                {categories.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="Month"
                variant="outlined"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                select
              >
                {months.map((option) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <TextField
            id="input-with-icon-textfield"
            label="Description"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<SaveIcon />}
            autoFocus
            onClick={handleSaveExpense}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
