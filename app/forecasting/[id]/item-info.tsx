import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";

interface IItemInfo {
  item: Item;
  sales: Sale[];
}

const ItemInfo = ({ item, sales }: IItemInfo) => {
  return (
    <div className="grid lg:grid-cols-3">
      <div className="w-full lg:grid-flow-col-dense">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={`http://localhost/imsa/data/item_images/${item.imageURL}`}
            className="object-cover w-full h-full rounded-md"
            fill
            alt={item.itemName}
          />
        </AspectRatio>
      </div>

      <div>
        <div className="text-2xl font-bold">{item.itemName}</div>
        <div>{item.status}</div>

        <div className="mt-2">
          {item.description ? item.description : "Item has no description."}
        </div>
      </div>

      {/* Basic sale information */}
      <div className="grid gap-2 mt-6 lg:mt-0">
        <div className="bg-primary rounded-md p-3 grid gap-2">
          <div className="text-sm font-medium flex gap-1 items-center">
            <CircleDollarSign size={20} />
            Total sales
          </div>
          <div className="text-3xl font-bold flex gap-2">
            ₱ {sales.length * item.unitPrice}
          </div>
        </div>
        <div className="bg-primary/50 rounded-md p-3 grid gap-2">
          <div className="text-sm font-medium flex gap-1 items-center">
            <CircleDollarSign size={20} />
            Forecasted revenue
          </div>
          <div className="text-3xl font-bold flex gap-2">
            ₱ {sales.length * item.unitPrice}
          </div>
        </div>
        <div className="bg-primary/25 rounded-md p-3 grid gap-2">
          <div className="text-sm font-medium flex gap-1 items-center">
            <CircleDollarSign size={20} />
            Recommended stock
          </div>
          <div className="text-3xl font-bold flex gap-2">80 pcs.</div>
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
