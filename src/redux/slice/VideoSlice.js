import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./baseurl";


export const VideoUpload = createAsyncThunk(
  "uploadvideo",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/create/upload-video", data)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)


const initialState = {
  loading: false,
  error: null
}

export const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(VideoUpload.pending, (state) => {
        state.loading = true
      })
      .addCase(VideoUpload.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(VideoUpload.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default videoSlice.reducer