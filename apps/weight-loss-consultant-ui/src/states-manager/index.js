import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authentication/authentication-slice';
import searchReducer from './search/search-slice';
const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    search: searchReducer,
  },
});

export default store;
