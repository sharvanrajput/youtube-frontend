import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./baseurl";

export const createYoutubeChannel = createAsyncThunk(
  "createchannel",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/channel/create", formData)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

export const UpdateuserChannel = createAsyncThunk(
  "updatechannel",
  async (formData, thunkAPI) => {
    try {
      const res = await api.patch("/channel/update", formData)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const initialState = {
  channelData: null,
  loading: false,
  error: null
}

const channelSlice = createSlice({
  name: "channel",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createYoutubeChannel.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createYoutubeChannel.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(createYoutubeChannel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(UpdateuserChannel.pending, (state, action) => {
        state.loading = true
      })
      .addCase(UpdateuserChannel.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(UpdateuserChannel.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default channelSlice.reducer