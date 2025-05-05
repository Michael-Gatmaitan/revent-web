import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ItemData {
  productID: number;
  itemName: string;
  stock: number;
  imageURL: string;
  unitPrice: number;
  isChecked: boolean;
  selectedQuantity: number;
}

interface InitItems {
  data: ItemData[];
  revent: boolean;
  type: "" | "in" | "out";
  customerID: number | null;
}

const initialState = {
  data: [],
  revent: true,
  type: "",
  customerID: null,
} satisfies InitItems as InitItems;

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    // setters
    resetData(state: InitItems) {
      state.data = [];
      state.customerID = null;
    },
    setAsIn(state: InitItems) {
      console.log(`${state} state set as in`);
    },
    setAsOut(state: InitItems) {
      state.type = "out";
      console.log(`${state} state set as out`);
    },
    setCustomerID(state: InitItems, action: PayloadAction<number>) {
      state.customerID = action.payload;
      console.log(`${state.customerID}: customerID has been set`);
    },
    addItem(state: InitItems, action: PayloadAction<ItemData>) {
      state.data.push(action.payload);
      console.log("New item added");
    },
    removeItem(state: InitItems, action: PayloadAction<number>) {
      state.data = state.data.filter(
        (item) => item.productID !== action.payload,
      );
      console.log("Item removed");
    },
    addQuantityToItem(
      state: InitItems,
      action: PayloadAction<{ productID: number; quantity: number }>,
    ) {
      const { productID, quantity } = action.payload;
      const index = state.data.findIndex(
        (item) => item.productID === productID,
      );
      state.data[index].selectedQuantity = quantity;
      console.log("quantity handled");
    },
  },
});

export const selectItemData = (state: RootState) => state.itemReducer.data;
export const selectWholeData = (state: RootState) => state.itemReducer;
export const selectSelectedCustomerID = (state: RootState) =>
  state.itemReducer.customerID;

export const {
  addItem,
  removeItem,
  addQuantityToItem,
  setAsIn,
  setAsOut,
  setCustomerID,
  resetData,
} = itemSlice.actions;
export default itemSlice.reducer;
