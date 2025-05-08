import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <div className=" grid gap-2 rounded-md border-purple-50 border-4 p-2">
      <div className="grid items-center w-full">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={`http://localhost/imsa/data/item_images/${item.imageURL}`}
            alt={item.itemName}
            fill
            className="object-fit w-full h-full"
          />
        </AspectRatio>
      </div>
      <div>{item.itemName}</div>
    </div>
  );
};

export default ItemCard;
