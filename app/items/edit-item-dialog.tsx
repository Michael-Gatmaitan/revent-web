"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import createApolloClient from "@/lib/apollo-client";
import { UPDATE_ITEM } from "@/lib/gql";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const UpdateItemDialog = ({ item }: { item: Item }) => {
  const router = useRouter();
  const [itemNameText, setItemNameText] = useState(item.itemName);
  const [imageURLText, setImageURLText] = useState(item.imageURL);
  const [discountVal, setDiscountVal] = useState(item.discount);
  const [unitPriceVal, setUnitPriceVal] = useState(item.unitPrice);

  const handleUpdateItem = async () => {
    try {
      const client = createApolloClient();
      const { data } = await client.mutate({
        mutation: UPDATE_ITEM,
        variables: {
          productID: item.productID,
          itemName: itemNameText,
          discount: discountVal,
          unitPrice: unitPriceVal,
          imageURL: imageURLText,
        },
      });

      const { message, success } = data.updateItem;

      if (success) {
        toast(message, {
          description: "Item updated successfully",
        });
      }

      router.refresh();
    } catch (err) {
      console.log(err);
      toast("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex-2/4">Edit Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&lsquo;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={item.itemName}
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setItemNameText(e.currentTarget.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Image URL
            </Label>
            <Input
              id="username"
              defaultValue={item.imageURL}
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setImageURLText(e.currentTarget.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Unit price
            </Label>
            <Input
              id="username"
              defaultValue={item.unitPrice}
              className="col-span-3"
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUnitPriceVal(parseInt(e.currentTarget.value));
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Discount
            </Label>
            <Input
              id="username"
              defaultValue={item.discount}
              className="col-span-3"
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setDiscountVal(parseInt(e.currentTarget.value));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleUpdateItem}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
