import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { User } from "../../types";
import axiosInstance from "../../utils/axiosInstane";

// const API_URL = "http://localhost:5000/api/users"; // Update with backend URL

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get(`/users/`);
  return response.data;
});

// Update User
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }: any) => {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id }: { id: string }) => {
    await axiosInstance.delete(`/users/${id}`);
    return id;
  }
);

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch users";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user: any) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user: any) => user._id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;
