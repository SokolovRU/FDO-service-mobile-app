import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "reduxjs-toolkit-persist";

import { profileReducer } from "./profile";
import { navigationReducer } from "./navState";
import { infoUserReducer } from "./infoUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducers = combineReducers({
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const reducersQ = combineReducers({
  persistedReducer: persistedReducer,
  navigationReducer: navigationReducer,
  infoUserReducer: infoUserReducer,
});

export const store = configureStore({
  reducer: { persistedReducer, navigationReducer, infoUserReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducersQ>;
