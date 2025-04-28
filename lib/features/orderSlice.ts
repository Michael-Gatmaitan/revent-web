import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// const temp = {
//   data: [
//     {
//       productID: 49,
//       itemName: "Hiking Bag",
//       stock: 6,
//       imageURL: "1526297640_hiking bag.jpg",
//       unitPrice: 1200,
//       isChecked: true,
//       selectedQuantity: 4,
//     },
//   ],
//   revent: true,
//   type: "out",
//   customerID: 41,
// };

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
    setAsIn(state: InitItems) {
      state = {
        data: [],
        revent: true,
        type: "in",
        customerID: null,
      };
      console.log(`${state} state set as in`);
    },
    setAsOut(state: InitItems) {
      state = {
        data: [],
        revent: true,
        type: "out",
        customerID: null,
      };

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
export const selectWhoteData = (state: RootState) => state.itemReducer;

export const { addItem, removeItem, addQuantityToItem } = itemSlice.actions;
export default itemSlice.reducer;
