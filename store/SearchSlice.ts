import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ParamsSearch = {
  params: string;
};

const initialState: ParamsSearch = {
  params: "",
};

const searchSlice = createSlice({
  name: "paramsSearch",
  initialState,
  reducers: {
    addParams: (state, action: PayloadAction<string>) => {
      state.params += action.payload;
    },
  },
});

export const { addParams } = searchSlice.actions;
export default searchSlice.reducer;
