"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { UpdateItemDialog } from "../items/edit-item-dialog";
// import Delete
import DeleteItemDialog from "../items/delete-item-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  addItem,
  addQuantityToItem,
  removeItem,
  selectItemData,
} from "@/lib/features/orderSlice";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ItemCard = ({
  item,
  selectMode,
}: {
  item: Item;
  selectMode?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const itemImageLocal = `http://localhost/imsa/data/item_images/${item.imageURL}`;
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  // const [selected, setSelected] = useState(false);

  const alldata = useAppSelector(selectItemData);
  const _selected =
    alldata.filter((data) => data.productID === item.productID).length !== 0;

  useEffect(() => {
    if (!_selected) setSelectedQuantity(0);
  }, [_selected]);

  const handleAddItem = (isSelected: boolean) => {
    console.log(item, isSelected);
    setSelectedQuantity(1);

    if (!isSelected) {
      // Remove item
      console.log("REMOVING ITEM`");
      dispatch(removeItem(item.productID));
    } else {
      const { productID, itemName, stock, imageURL, unitPrice } = item;
      const data = {
        productID,
        itemName,
        stock,
        imageURL,
        unitPrice,
        isChecked: isSelected,
        selectedQuantity: 1,
      };
      dispatch(addItem(data));
    }

    console.log(alldata);
  };

  const handleAddQuantityToItem = () => {
    setSelectedQuantity((prev) => prev + 1);
    console.log(selectedQuantity);
    dispatch(
      addQuantityToItem({
        productID: item.productID,
        quantity: selectedQuantity + 1,
      }),
    );
  };

  const handleRemoveQuantityToItem = () => {
    setSelectedQuantity((prev) => prev - 1);
    if (selectedQuantity - 1 === 0) {
      dispatch(removeItem(item.productID));
    } else {
      dispatch(
        addQuantityToItem({
          productID: item.productID,
          quantity: selectedQuantity - 1,
        }),
      );
    }
  };

  // const [qr, setQR] = useState<string | null>(null);

  // const displayQR = () => {
  //   console.log(wholeData);
  // };

  return (
    <Card className="p-4">
      {selectMode ? (
        <div className="flex justify-between">
          <Checkbox
            checked={_selected}
            onCheckedChange={handleAddItem}
            disabled={item.stock <= 0}
          />
          {item.stock <= 0 ? (
            <Badge variant="destructive">Out of stock</Badge>
          ) : null}
        </div>
      ) : null}

      <AspectRatio ratio={1 / 1}>
        <Image
          src={
            item.imageURL.startsWith("http") ? item.imageURL : itemImageLocal
          }
          alt={item.itemName}
          className="object-cover w-full h-full rounded-md"
          fill
        />
      </AspectRatio>

      <div className="mt-8">
        <div className="flex w-full justify-between">
          <div className="grid gap-2">
            <div className="font-bold text-xl">{item.itemName}</div>
            <div>P{item.unitPrice}</div>
          </div>

          <div className="grid gap-2 text-right">
            <div>{item.stock}pcs.</div>
            <div>{item.status}</div>
          </div>
        </div>

        {selectMode ? (
          <div className="flex gap-2 mt-8 items-center">
            <Button
              onClick={handleRemoveQuantityToItem}
              disabled={selectedQuantity <= 0 || !_selected}
            >
              <MinusIcon />
            </Button>
            <div>{selectedQuantity}</div>
            <Button
              onClick={handleAddQuantityToItem}
              disabled={
                selectedQuantity === item.stock || !_selected || item.stock <= 0
              }
            >
              <PlusIcon />
            </Button>
            {/* <Button onClick={displayQR}>Process</Button> */}
          </div>
        ) : (
          <div className="flex gap-2 mt-4">
            <UpdateItemDialog item={item} />
            <DeleteItemDialog item={item} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ItemCard;
