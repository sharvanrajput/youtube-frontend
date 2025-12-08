import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/AuthSlice";

export const store = configureStore({
  reducer: {
    user: userReducer
  }
})