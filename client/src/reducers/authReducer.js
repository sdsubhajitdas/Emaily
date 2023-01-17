import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { value: null },
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload || false;
    },
    handlePaymentToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuth, handlePaymentToken } = authSlice.actions;
export default authSlice.reducer;
