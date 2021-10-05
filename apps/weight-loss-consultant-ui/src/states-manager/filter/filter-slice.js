import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    saveObjectFilter: '',
  },
  reducers: {
    saveObjectFilter: (state, action) => {
      return {
        ...state,
        ObjectFilter: action.payload,
      };
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
