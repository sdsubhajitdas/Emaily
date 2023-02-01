import { createSlice } from "@reduxjs/toolkit";

const surveySlice = createSlice({
  name: "survey",
  initialState: {
    value: null,
  },
  reducers: {
    setSurvey: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSurvey } = surveySlice.actions;
export default surveySlice.reducer;
