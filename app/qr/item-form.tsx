"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { TrashIcon } from "lucide-react";
import QrDialog from "../components/qr-dialog";

const formSchema = z.object({
  itemNumber: z.string().min(1, {
    message: "Item must have item number",
  }),
  itemName: z.string().min(3, {
    message: "Item must have item name",
  }),
  discount: z.number().min(1, {
    message: "Item must have discount at least 1",
  }),
  stock: z.number().min(1, {
    message: "Item must have stock at least 1",
  }),
  unitPrice: z.number().min(1, {
    message: "Item must have price",
  }),
  imageURL: z.string().min(3, {
    message: "Item must have its image",
  }),
  description: z.string().optional(),
});

interface IItem {
  itemNumber: string;
  itemName: string;
  discount: number;
  stock: number;
  unitPrice: number;
  imageURL: string;
  description?: string | undefined;
  // description: string;
}

const ItemForm = () => {
  const [items, setItems] = useState<IItem[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      itemNumber: "",
      discount: 0,
      stock: 0,
      unitPrice: 0,
      imageURL: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setItems((prev) => [...prev, values]);

    form.reset();
  };

  const itemInData = {
    data: items,
    revent: true,
    type: "in",
    customerID: null,
  };

  console.log(itemInData);

  return (
    <div className="grid lg:grid-cols-2 lg:gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-2 flex-grow">
            {/* Item number */}
            <FormField
              control={form.control}
              name="itemNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Item number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Item name */}
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            {/* discount */}
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Discount"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Stock"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* unitPrice */}
            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Unit price"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(+e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* imageURL */}
          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Item Image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item description</FormLabel>
                <FormControl>
                  <Input placeholder="Item description (Optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" className="lg:none">
              {items.length}
              View queue
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      {/* lg:max-h-[calc(100vh-32px)] */}
      <div className="grid max-h-[calc(100vh-32px)] mt-4 lg:mt-0">
        <div className="overflow-y-scroll grid gap-2 grid-cols-1 auto-rows-min">
          {items.map((item, id) => (
            <div key={id} className="flex gap-2 p-2 rounded-md bg-purple-100">
              <div className="w-[70px] h-[70px]">
                <Image
                  src={item.imageURL}
                  alt={item.itemName}
                  width={70}
                  height={70}
                  className="rounded-sm"
                />
              </div>

              <div className="flex justify-between flex-grow">
                <div className="grid">
                  <Label>{item.itemName}</Label>
                  <Label>{item.itemNumber}</Label>
                </div>

                <div>
                  <Button
                    onClick={() => {
                      setItems((prev) =>
                        prev.filter(
                          (_item) => _item.itemName !== item.itemName,
                        ),
                      );
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {/* <ItemCard /> */}
        </div>
        {/* <Button className="mt-4">Generate QR Code</Button> */}
        {items.length !== 0 ? <QrDialog data={itemInData} /> : null}
      </div>
    </div>
  );
};

// const x = {
//   data: [
//     {
//       itemNumber: 20,
//       itemName: "Item 1",
//       discount: 0.0,
//       stock: 10,
//       unitPrice: 100,
//       imageURL: "alsdkjfhasdklf",
//       description: "kljahsdfkjh",
//     },
//     {
//       itemNumber: 23,
//       itemName: "Michael Gatmaitan",
//       discount: 0.0,
//       stock: 1000,
//       unitPrice: 320,
//       imageURL: "imageURL hehe",
//       description: "descrtiption gang gang",
//     },
//     {
//       itemNumber: 9,
//       itemName: "more",
//       discount: 1.0,
//       stock: 1,
//       unitPrice: 1,
//       imageURL: "moremoremore",
//       description: "hahahaha",
//     },
//     {
//       itemNumber: 232332,
//       itemName: "asdjfklsdkj",
//       discount: 69.0,
//       stock: 420,
//       unitPrice: 69,
//       imageURL: "imageimgae",
//       description: "descedesc",
//     },
//   ],
//   revent: true,
//   type: "in",
// };

export default ItemForm;
