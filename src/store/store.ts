import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
