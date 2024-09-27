import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "../features/tasks/tasksApi";
import darkModeReducer from './Slices/darkMode/darkModeSlice.js';

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    darkMode: darkModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(tasksApi.middleware),
});
