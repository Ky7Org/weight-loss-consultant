import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authentication/authentication-slice';
import searchReducer from './search/search-slice';
import filterReducer from './filter/filter-slice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    search: searchReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
