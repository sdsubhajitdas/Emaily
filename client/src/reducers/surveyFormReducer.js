import { createSlice } from "@reduxjs/toolkit";

const surveyFormSlice = createSlice({
  name: "surveyForm",
  initialState: {
    value: {
      title: "",
      subject: "",
      body: "",
      recipients: "",
    },
  },
  reducers: {
    setFormValues: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFormValues } = surveyFormSlice.actions;
export default surveyFormSlice.reducer;
