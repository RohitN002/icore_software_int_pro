import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstane";
import axios from "axios";
import { toast } from "react-toastify";
import { User } from "../../types";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null | any;
}

export const uploadUsers = createAsyncThunk(
  "users/uploadUsers",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/api/users/upload-users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Users uploaded successfully!");
      return response.data.message;
    } catch (error: any) {
      toast.error(error.response?.data || "Upload failed");
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get(`/users/`);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }: any) => {
    const response = await axiosInstance.put(`/users/${id}`, data);
    toast.success("User updated successfully!");
    return response.data;
  }
);

export const exportUsers = createAsyncThunk("users/exportUsers", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/export-users",
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.xlsx");
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Users exported successfully!");
    return "Success";
  } catch (error) {
    toast.error("Failed to export users");
    throw error;
  }
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id }: { id: string }) => {
    await axiosInstance.delete(`/users/${id}`);
    toast.success("User deleted successfully!");
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
        toast.error(state.error);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(exportUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(exportUsers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(exportUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadUsers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
