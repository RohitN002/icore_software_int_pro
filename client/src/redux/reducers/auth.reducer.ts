import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AuthState {
  user: { email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData
      );
      toast.success("Signup successful!");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      toast.success("Login successful!");
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      toast.info("Logged out successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { email: action.payload.email };
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { email: action.payload.email };
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
