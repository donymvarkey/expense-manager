import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.response.data;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginFailure, loginSuccess, logoutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
