import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUsers, registerUsers } from "../Services/Auth";

export const loginUsersAsync = createAsyncThunk(
  "users/login",
  async (formData) => {
    const data = await loginUsers(formData);
    return data;
  }
);

export const regUsersAsync = createAsyncThunk(
  "users/register",
  async (formData) => {
    const data = await registerUsers(formData);
    return data;
  }
);
export const logOutUsersAsync = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("loginEmail");
  localStorage.removeItem("token");
  return {};
});

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    status: "idle",
    items: [],
    userEmail: localStorage.getItem("loginEmail") ?? null,
    token: localStorage.getItem("token") ?? null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUsersAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.userEmail = action.payload.user.email;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("loginEmail", action.payload.user.email);
    });
    builder.addCase(regUsersAsync.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.userEmail = localStorage.getItem("loginEmail");
    });
    builder.addCase(logOutUsersAsync.fulfilled, (state) => {
      state.items = [];
      state.userEmail = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    });
  },
});

export default AuthSlice.reducer;
