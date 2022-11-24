import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  navigation: "loading",
};

const chatSlice = createSlice({
  name: "navigationState",
  initialState,
  reducers: {
    changeNavState: (state, action) => {
      state.navigation = action.payload;
    },
  },
});

export const navigationActions = chatSlice.actions;
export const navigationReducer = chatSlice.reducer;
