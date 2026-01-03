import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/AuthSlice";
import channelReducer from "./slice/ChannelSlice";
import  videoRedicer  from "./slice/VideoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer,
    video: videoRedicer
    ,
  }
})