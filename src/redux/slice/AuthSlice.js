import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./baseurl";

export const register = createAsyncThunk(
  "register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/user/register", data)
      return res.data.user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)
export const logout = createAsyncThunk(
  "logout",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/user/logout")
      return res.data.user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)
export const me = createAsyncThunk(
  "mydata",
  async (_, thunkAPI) => {
    try {
      const res = await api.post("/user/me")
      return res.data.user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)
export const login = createAsyncThunk(
  "login",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/user/login", data)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)
export const GoogleLogin = createAsyncThunk(
  "Goglelogin",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/user/googleauth", data)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data)
    }
  }
)

const initialState = {
  userData: null,
  loading: false,
  error: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state, action) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // register
      .addCase(GoogleLogin.pending, (state, action) => {
        state.loading = true
      })
      .addCase(GoogleLogin.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(GoogleLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // my data
      .addCase(me.pending, (state, action) => {
        state.loading = true
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false
        state.userData = action.payload
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // login 
      .addCase(login.pending, (state, action) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // logout 
      .addCase(logout.pending, (state, action) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false
        state.userData = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }

})

export default userSlice.reducer