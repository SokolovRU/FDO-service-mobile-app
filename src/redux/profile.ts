import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserInit = {
  login: string;
  password: string;
};


const initialState_1: UserInit = {
  login: "",
  password: "",
};

function getWithExpiry(key: string) {
  let itemStr: string | null = null;
  AsyncStorage.getItem(key).then((res) => {
    itemStr = res;
  });
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    AsyncStorage.removeItem(key);
    return null;
  }
  return item;
}

const init = getWithExpiry("profile");
const profile = init !== null ? init : initialState_1;
const initialState: UserInit = initialState_1;

const chatSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    connectedApi: (state, action) => {
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
    disconnectedApi: (state) => {
      state = initialState_1
    },
  },
});

export const profileActions = chatSlice.actions;
export const profileReducer = chatSlice.reducer;
