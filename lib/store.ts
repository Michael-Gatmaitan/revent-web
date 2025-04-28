import { configureStore } from "@reduxjs/toolkit";
import ItemReducer from "./features/orderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      itemReducer: ItemReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types of store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
