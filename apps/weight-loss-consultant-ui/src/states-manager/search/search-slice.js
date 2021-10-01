import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    textSearch: "",
  },
  reducers: {
    saveTextSearch: (state, action) => {
      return {
        ...state,
        textSearch: action.payload,
      };
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
