import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { value: null },
  reducers: {
    setAuth: (state, action) => {
      state.value = action.payload || false;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
