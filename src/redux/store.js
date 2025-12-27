import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/AuthSlice";
import channelReducer from "./slice/ChannelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer
  }
})