import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    isSaved: false,
    error: null,
  },
  reducers: {
    saveExpenseStart: (state) => {
      state.isSaved = true;
    },
    saveExpenseSuccess: (state, action) => {
      state.isSaved = false;
      state.error = null;
    },
    saveExpenseFailure: (state, action) => {
      state.isSaved = false;
      state.error = action.payload.response.data;
    },
  },
});

export const { saveExpenseStart, saveExpenseSuccess, saveExpenseFailure } =
  expenseSlice.actions;
export default expenseSlice.reducer;
