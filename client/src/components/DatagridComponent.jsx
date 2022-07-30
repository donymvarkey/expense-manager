import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { categories, months } from "../data";

const columns = [
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 110,
    flex: 1,
  },
  {
    field: "month",
    headerName: "Month",
    width: 160,
  },
];

export default function DatagridComponent({ expenses }) {
  const [rows, setRows] = useState(expenses);
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const filterRowsByMonth = () => {
    month
      ? setRows(expenses.filter((expense) => expense.month === month))
      : setRows(expenses);
  };

  const filterRowsByCategory = () => {
    category
      ? setRows(expenses.filter((expense) => expense.category === category))
      : setRows(expenses);
  };

  const removeFilters = () => {
    setMonth("");
    setCategory("");
    setRows(expenses);
  };

  useEffect(() => {
    setRows(expenses);
  }, [expenses]);

  useEffect(() => {
    filterRowsByMonth();
  }, [month]);

  useEffect(() => {
    filterRowsByCategory();
  }, [category]);

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 1, mt: 1 }}>
        Expenses
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Month"
          variant="outlined"
          select
          size="small"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          sx={{
            width: 150,
          }}
        >
          {months.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          label="Category"
          variant="outlined"
          select
          size="small"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            ml: 1,
            width: 150,
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          onClick={removeFilters}
          sx={{ ml: 1, "&:hover": { color: "#fd151b" } }}
        >
          <Delete />
        </IconButton>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={10}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
