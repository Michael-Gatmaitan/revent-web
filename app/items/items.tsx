"use client";
import { useEffect } from "react";
import { selectWholeData, setAsOut } from "@/lib/features/orderSlice";
import ItemCard from "../components/item-card";
import { useAppSelector, useAppDispatch } from "@/lib/hook";
import OutDialog from "../components/out-dialog";

const Items = ({
  items,
  selectMode,
}: {
  items: Item[];
  selectMode?: boolean;
}) => {
  const alldata = useAppSelector(selectWholeData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAsOut());
  }, [dispatch]);

  return (
    <>
      <div>
        {alldata.data.map((item) => (
          <div key={item.productID}>
            <span>{item.itemName}</span>
            <span>{item.selectedQuantity}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
        {items.map((item) => (
          <ItemCard key={item.productID} item={item} selectMode={selectMode} />
        ))}
      </div>


      <OutDialog />
    </>
  );
};

export default Items;
