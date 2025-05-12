import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CircleDollarSign, DollarSign, Hash } from "lucide-react";
import Image from "next/image";

interface IItemInfo {
  item: Item;
  sales: Sale[];
}

const ItemInfo = ({ item, sales }: IItemInfo) => {
  const { imageURL, itemName, itemNumber, description, unitPrice } = item;
  const itemImageLocal = `http://localhost/imsa/data/item_images/${imageURL}`;

  let totalSales = 0;

  sales.forEach((sale) => (totalSales += sale.quantity * unitPrice));

  return (
    // <div className="grid lg:grid-cols-3">
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex-1/6">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={imageURL.startsWith("http") ? imageURL : itemImageLocal}
            className="object-cover w-full h-full rounded-md lg:rounded-2xl"
            fill
            alt={item.itemName}
          />
        </AspectRatio>
      </div>

      <div className="flex-2">
        <div className="text-2xl font-bold lg:text-4xl">{itemName}</div>
        <div>{item.status}</div>

        <div className="mt-2">
          {description ? description : "Item has no description."}
        </div>
      </div>

      {/* Basic sale information */}
      <div className="grid gap-2 mt-6 lg:mt-0 flex-2">
        <div className="bg-primary rounded-md p-3 grid gap-2">
          <div className="text-sm font-medium flex gap-1 items-center">
            <CircleDollarSign size={20} />
            Total sales
          </div>
          <div className="text-3xl font-bold flex gap-2">₱ {totalSales}</div>
        </div>
        <div className="bg-primary/50 rounded-md p-3 grid gap-2">
          <div className="text-sm font-medium flex gap-1 items-center">
            <DollarSign size={20} />
            Price
          </div>
          <div className="text-3xl font-bold flex gap-2">₱ {unitPrice}</div>
        </div>
        <div className="bg-primary/25 rounded-md p-3 grid gap-2">
          <div className="text-sm font-medium flex gap-1 items-center">
            <Hash />
            Item number
          </div>
          <div className="text-3xl font-bold flex gap-2"># {itemNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
