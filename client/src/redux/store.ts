import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./reducers/auth.reducer";
import userReducer from "./reducers/user.reducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
