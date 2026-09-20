import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItems = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  size: string | null;
};

type CartState = {
  items: CartItems[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItems>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload,
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
