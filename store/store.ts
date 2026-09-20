import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import searchSlice from "./SearchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // kalau nanti ada slice lain, tambahin di sini: user: userReducer, dst
    paramsSearch: searchSlice,
  },
});

// Ini buat TypeScript ngerti bentuk state global kamu
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
