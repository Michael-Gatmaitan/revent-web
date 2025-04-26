import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { UpdateItemDialog } from "../items/edit-item-dialog";
import Delete
import DeleteItemDialog from "../items/delete-item-dialog";

const ItemCard = ({ item }: { item: Item }) => {
  const itemImageLocal = `http://localhost/imsa/data/item_images/${item.imageURL}`;
  return (
    <Card className="p-4">
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

        <div className="flex gap-2 mt-4">
          {/* <Button className="flex-2/4">Edit</Button> */}
          <UpdateItemDialog item={item} />
          <DeleteItemDialog item={item}/>

          {/* <Button variant="destructive"> */}
          {/*   <TrashIcon /> */}
          {/* </Button> */}
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
